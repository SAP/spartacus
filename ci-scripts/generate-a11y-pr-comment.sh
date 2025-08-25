#!/usr/bin/env bash
set -e

ARTIFACTS_DIR="a11y-failure-artifacts"
COUNT_FILE="$ARTIFACTS_DIR/count.txt"
COMMENT_FILE="pr-comment.md"

if [ ! -f "$COUNT_FILE" ]; then
    echo "No screenshot count found. Skipping PR comment generation."
    exit 0
fi

screenshot_count=$(cat "$COUNT_FILE")

if [ "$screenshot_count" -eq 0 ]; then
    echo "No screenshots found, skipping comment generation"
    exit 0
fi

# Generate simple PR comment
container="${GITHUB_MATRIX_CONTAINER:-unknown}"
run_id="${GITHUB_RUN_ID:-unknown}"
commit_sha="${GITHUB_SHA:-unknown}"
commit_sha="${commit_sha:0:7}"

cat > "$COMMENT_FILE" << EOF
## A11Y Test Failures - Container $container

$screenshot_count accessibility test(s) failed in this PR.

**Download screenshots:** [a11y-failure-artifacts-container-$container](https://github.com/${GITHUB_REPOSITORY:-SAP/spartacus}/actions/runs/$run_id/artifacts)

**Helpful links:**
- [A11Y guidelines](https://wiki.one.int.sap/wiki/display/spar/Spartacus+Accessibility+Feature+Compliance)

_Commit $commit_sha • Container $container_
EOF

echo "PR comment generated successfully"
