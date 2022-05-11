#!/usr/bin/env bash
set -e
set -o pipefail

RUN_E2E=false
CONTEXT_TAGS=""
GITHUB_BASE_REF='develop'

if [ ! -z "$GITHUB_BASE_REF" ]; then
    FILES=`git diff --name-only origin/$GITHUB_BASE_REF`

    for file in $FILES; do
        echo "$file"
        case "$file" in
        *.md | docs/** | tools/** | *.spec.ts | **/schematics/** )
            ;;
        * )
            # if anything other than `*.md | docs/** | tools/** | *.spec.ts | **/schematics/**` are found, then we should run e2es
            RUN_E2E=true
            ;;
        esac
    done
fi

echo "$CONTEXT_TAGS"