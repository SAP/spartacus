#!/usr/bin/env bash
set -e
set -o pipefail

FILES=$(git diff --name-only origin/develop)

RUN_E2E=

for file in $FILES; do

    case "$file" in
    *.md | docs/** | tools/** | *.spec.ts )
        echo ""
        ;;
    * )
        echo "here $file"
        # if anything other than `*.md | docs/** | tools/** | *.spec.ts` are found, then we need to run e2es
        RUN_E2E=
        ;;
    esac
done