#!/usr/bin/env bash
set -e
set -o pipefail

FILES=$(git diff --name-only origin/develop)

OUTPUT_CONCLUSION=
export OUTPUT_CONCLUSION_TEST=
# echo $FILES

for file in $FILES; do
    echo $file

    case "$file" in
    *.md | docs/** | tools/** | *.spec.ts )
        OUTPUT_CONCLUSION='something'
        OUTPUT_CONCLUSION_TEST='something-test'
        ;;
    * )
        #  set github actions for output to skip e2es. output will be used in the job with if outputs.skipe2e is true
        ;;
    esac
done