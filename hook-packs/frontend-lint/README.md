# Frontend Lint & Test Hook Pack

Automatically runs frontend linters and tests when Claude Code finishes a task. Catches lint errors and test failures immediately, so Claude can fix them in the same session.

## What It Does

When Claude finishes a turn (`Stop` event), the hook:

1. Checks if any staged or recently modified frontend files (`.ts`, `.tsx`, `.js`, `.jsx`, `.css`, `.vue`, `.svelte`) were touched.
2. If yes, runs **ESLint** and **Prettier** checks on the changed files.
3. Runs your **frontend test suite** (via `npm test` / `npx vitest run` / `npx jest --bail`).

If any linter or test fails, the output is fed back to Claude as context so it can address the issues.

## Installation

Add the following hook to your project's `.claude/settings.json`:

```json
{
  "hooks": [
    {
      "event": "Stop",
      "command": "bash ./hooks/frontend-lint.sh"
    }
  ]
}
```

Then copy the hook script into your project:

```bash
mkdir -p hooks
cp frontend-lint.sh /path/to/project/hooks/frontend-lint.sh
chmod +x /path/to/project/hooks/frontend-lint.sh
```

If you already have a `hooks` array in your settings, merge this entry into it.

## Hook Script

Create `hooks/frontend-lint.sh` in your project root with the following content:

```bash
#!/usr/bin/env bash
set -euo pipefail

# Navigate to project root
cd "${CLAUDE_PROJECT_DIR:-.}"

# Find recently modified frontend files (last 5 minutes)
CHANGED_FILES=$(find . -name node_modules -prune -o \
  \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' \
     -o -name '*.css' -o -name '*.vue' -o -name '*.svelte' \) \
  -mmin -5 -print 2>/dev/null || true)

# Also check git staged/unstaged changes
GIT_FILES=$(git diff --name-only --diff-filter=ACMR HEAD 2>/dev/null | \
  grep -E '\.(ts|tsx|js|jsx|css|vue|svelte)$' || true)

ALL_FILES=$(echo -e "${CHANGED_FILES}\n${GIT_FILES}" | sort -u | grep -v '^$' || true)

if [ -z "$ALL_FILES" ]; then
  exit 0
fi

echo "--- Frontend Lint: checking $(echo "$ALL_FILES" | wc -l | tr -d ' ') file(s) ---"

ERRORS=""

# Run ESLint on changed files
if [ -f node_modules/.bin/eslint ]; then
  echo "$ALL_FILES" | grep -E '\.(ts|tsx|js|jsx|vue|svelte)$' | \
    xargs npx eslint --no-error-on-unmatched-pattern 2>&1 || ERRORS="${ERRORS}\nESLint failed."
fi

# Run Prettier check on changed files
if [ -f node_modules/.bin/prettier ]; then
  echo "$ALL_FILES" | xargs npx prettier --check 2>&1 || ERRORS="${ERRORS}\nPrettier check failed."
fi

# Run tests
if [ -f node_modules/.bin/vitest ]; then
  npx vitest run --bail 1 2>&1 || ERRORS="${ERRORS}\nVitest tests failed."
elif [ -f node_modules/.bin/jest ]; then
  npx jest --bail 2>&1 || ERRORS="${ERRORS}\nJest tests failed."
elif grep -q '"test"' package.json 2>/dev/null; then
  npm test 2>&1 || ERRORS="${ERRORS}\nTests failed."
fi

if [ -n "$ERRORS" ]; then
  echo ""
  echo "--- Frontend issues found ---"
  echo -e "$ERRORS"
  exit 1
fi

echo "--- Frontend Lint: all checks passed ---"
```

## Customization

### Skip tests, only lint

Remove the test runner section from the script if you only want linting:

```bash
# Delete or comment out the "Run tests" block
```

### Change the time window for detecting changes

The `find -mmin -5` flag checks files modified in the last 5 minutes. Adjust the number as needed:

```bash
# Last 2 minutes
find . ... -mmin -2 -print
```

### Add Stylelint for CSS

Add a Stylelint block to the script:

```bash
if [ -f node_modules/.bin/stylelint ]; then
  echo "$ALL_FILES" | grep -E '\.css$' | \
    xargs npx stylelint 2>&1 || ERRORS="${ERRORS}\nStylelint failed."
fi
```

### Monorepo support

If your frontend lives in a subdirectory (e.g., `frontend/`), adjust the `cd` command:

```bash
cd "${CLAUDE_PROJECT_DIR:-.}/frontend"
```

## Requirements

- **ESLint** and/or **Prettier** installed as project dependencies
- A test runner (**Vitest**, **Jest**, or an `npm test` script) for the test checks
- **Git** for detecting changed files
