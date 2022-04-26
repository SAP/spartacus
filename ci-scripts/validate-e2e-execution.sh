#!/usr/bin/env bash
set -e
set -o pipefail

RUN_E2E=false

if [ ! -z "$GITHUB_BASE_REF" ]; then
    FILES=`git diff --name-only origin/$GITHUB_BASE_REF`

    echo $GITHUB_BASE_REF

    for file in $FILES; do

        case "$file" in
        *.md | docs/** | tools/** | *.spec.ts | **/schematics/** )
            echo "found file $file"
            ;;
        * )
            echo "test here $file"
            # if anything other than `*.md | docs/** | tools/** | *.spec.ts` are found, then we should e2es
            RUN_E2E=true
            ;;
        esac
    done
fi
