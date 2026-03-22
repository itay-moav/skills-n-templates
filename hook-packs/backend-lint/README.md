# Backend Lint Hook Pack (Python)

Automatically runs Python linters -- **Black**, **isort**, and **flake8** -- when Claude Code finishes a task. Catches formatting and style issues immediately so they can be fixed in the same session.

## What It Does

When Claude finishes a turn (`Stop` event), the hook:

1. Checks if any Python files (`.py`) were recently modified or have uncommitted changes.
2. If yes, runs **Black** (formatter check), **isort** (import order check), and **flake8** (style/error linter) on the changed files.

If any check fails, the output is fed back to Claude as context so it can address the issues.

## Installation

Add the following hook to your project's `.claude/settings.json`:

```json
{
  "hooks": [
    {
      "event": "Stop",
      "command": "bash ./hooks/backend-lint.sh"
    }
  ]
}
```

Then copy the hook script into your project:

```bash
mkdir -p hooks
cp backend-lint.sh /path/to/project/hooks/backend-lint.sh
chmod +x /path/to/project/hooks/backend-lint.sh
```

If you already have a `hooks` array in your settings, merge this entry into it.

## Hook Script

Create `hooks/backend-lint.sh` in your project root with the following content:

```bash
#!/usr/bin/env bash
set -euo pipefail

cd "${CLAUDE_PROJECT_DIR:-.}"

# Find recently modified Python files (last 5 minutes)
CHANGED_FILES=$(find . -path ./.venv -prune -o -path ./venv -prune -o \
  -name '*.py' -mmin -5 -print 2>/dev/null || true)

# Also check git staged/unstaged changes
GIT_FILES=$(git diff --name-only --diff-filter=ACMR HEAD 2>/dev/null | \
  grep -E '\.py$' || true)

ALL_FILES=$(echo -e "${CHANGED_FILES}\n${GIT_FILES}" | sort -u | grep -v '^$' || true)

if [ -z "$ALL_FILES" ]; then
  exit 0
fi

echo "--- Backend Lint: checking $(echo "$ALL_FILES" | wc -l | tr -d ' ') Python file(s) ---"

ERRORS=""

# Run Black (check mode)
if command -v black &>/dev/null; then
  echo "$ALL_FILES" | xargs black --check --diff 2>&1 || ERRORS="${ERRORS}\nBlack formatting check failed."
fi

# Run isort (check mode)
if command -v isort &>/dev/null; then
  echo "$ALL_FILES" | xargs isort --check --diff 2>&1 || ERRORS="${ERRORS}\nisort import order check failed."
fi

# Run flake8
if command -v flake8 &>/dev/null; then
  echo "$ALL_FILES" | xargs flake8 2>&1 || ERRORS="${ERRORS}\nflake8 found issues."
fi

if [ -n "$ERRORS" ]; then
  echo ""
  echo "--- Backend issues found ---"
  echo -e "$ERRORS"
  exit 1
fi

echo "--- Backend Lint: all checks passed ---"
```

## Customization

### Use virtual environment tools

If your linters are installed in a `.venv`, update the commands to use the venv path:

```bash
VENV="${CLAUDE_PROJECT_DIR:-.}/.venv/bin"

if [ -f "$VENV/black" ]; then
  echo "$ALL_FILES" | xargs "$VENV/black" --check --diff 2>&1 || ...
fi
```

### Auto-fix instead of check-only

To have the linters fix issues automatically (rather than just reporting them):

```bash
# Black: remove --check --diff to auto-format
echo "$ALL_FILES" | xargs black 2>&1

# isort: remove --check --diff to auto-sort
echo "$ALL_FILES" | xargs isort 2>&1
```

### Add mypy type checking

```bash
if command -v mypy &>/dev/null; then
  echo "$ALL_FILES" | xargs mypy 2>&1 || ERRORS="${ERRORS}\nmypy type check failed."
fi
```

### Add ruff (modern alternative)

If you use **ruff** instead of (or alongside) flake8/isort/black:

```bash
if command -v ruff &>/dev/null; then
  echo "$ALL_FILES" | xargs ruff check 2>&1 || ERRORS="${ERRORS}\nruff found issues."
  echo "$ALL_FILES" | xargs ruff format --check 2>&1 || ERRORS="${ERRORS}\nruff format check failed."
fi
```

### Monorepo support

If your backend lives in a subdirectory (e.g., `backend/`), adjust the `cd` command:

```bash
cd "${CLAUDE_PROJECT_DIR:-.}/backend"
```

## Requirements

- **Black**, **isort**, and/or **flake8** installed (globally or in a virtualenv)
- **Git** for detecting changed files
