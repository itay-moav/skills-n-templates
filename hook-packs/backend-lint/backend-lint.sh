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
