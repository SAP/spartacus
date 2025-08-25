#!/usr/bin/env bash
set -e

COMMENT_FILE="pr-comment.md"
ARTIFACTS_PATTERN="a11y-screenshots-container-${GITHUB_MATRIX_CONTAINER:-unknown}"

if [ ! -d "$ARTIFACTS_PATTERN" ]; then
    echo "No screenshot artifacts found. Skipping PR comment generation."
    exit 0
fi

# Count unique specs by counting directories
spec_count=$(find "$ARTIFACTS_PATTERN" -mindepth 1 -maxdepth 1 -type d | wc -l)

if [ "$spec_count" -eq 0 ]; then
    echo "No failed specs found, skipping comment generation"
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
