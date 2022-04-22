#!/usr/bin/env bash
set -e
set -o pipefail

FILES=$(git diff --name-only develop)

RUN_E2E=false

for file in $FILES; do

    case "$file" in
    *.md | docs/** | tools/** | *.spec.ts | **/schematics/** )
        ;;
    * )
        echo "test here $file"
        # if anything other than `*.md | docs/** | tools/** | *.spec.ts` are found, then we should e2es
        RUN_E2E=true
        ;;
    esac
done