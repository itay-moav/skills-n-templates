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
