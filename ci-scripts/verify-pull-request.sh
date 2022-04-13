#!/usr/bin/env bash
set -e
set -o pipefail

FILES=$(git diff --name-only origin/develop ${GITHUB_HEAD_REF} --)

# echo $FILES

for file in $FILES; do
    echo $file

    case "$file" in
    *.md | docs/** | tools/** | *.spec.ts )
        echo "ignored files $file"
        # do nothing
        ;;
    * )
        #  set github actions for output to skip e2es. output will be used in the job with if outputs.skipe2e is true
        ;;
    esac
done