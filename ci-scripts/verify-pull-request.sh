#!/usr/bin/env bash
set -e
set -o pipefail

FILES=$(git diff --name-only develop...${GITHUB_HEAD_REF})

# echo $FILES

for file in $FILES; do
    echo $file

    case "$file" in
    *.md | docs/** | tools/** )
        echo "ignored files $file"
        # fail the github action or exit but comment for now
        ;;
    * )
        # do nothing or set output for github actions
        ;;
    esac
done