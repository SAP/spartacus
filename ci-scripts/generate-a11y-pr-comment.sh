#!/usr/bin/env bash
set -e

COUNT_FILE="/tmp/spec_count.txt"
ARTIFACTS_DIR_FILE="/tmp/artifacts_dir.txt"
COMMENT_FILE="pr-comment.md"

if [ ! -f "$COUNT_FILE" ]; then
    echo "No screenshot count found. Skipping PR comment generation."
    exit 0
fi

spec_count=$(cat "$COUNT_FILE")
artifacts_dir=$(cat "$ARTIFACTS_DIR_FILE")

if [ "$spec_count" -eq 0 ]; then
    echo "No screenshots found, skipping comment generation"
    exit 0
fi

# Generate simple PR comment with placeholder for artifact URL
container="${GITHUB_MATRIX_CONTAINER:-unknown}"
commit_sha="${GITHUB_SHA:-unknown}"
commit_sha="${commit_sha:0:7}"

cat > "$COMMENT_FILE" << EOF
<!-- a11y-failure-container-$container -->
## A11Y Test Failures - Container $container

$spec_count accessibility test(s) failed in container $container.

**Download screenshots:** ARTIFACT_URL_PLACEHOLDER

**Helpful links:**
- [A11Y guidelines](https://wiki.one.int.sap/wiki/display/spar/Spartacus+Accessibility+Feature+Compliance)

Commit $commit_sha
EOF

echo "PR comment template generated (artifact URL will be updated after upload)"
