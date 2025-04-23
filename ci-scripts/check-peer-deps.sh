#!/bin/bash

BASE_BRANCH=${1:-develop}

echo "🔍 Checking for changes in peerDependencies compared to $BASE_BRANCH..."

git fetch origin "$BASE_BRANCH:$BASE_BRANCH"

changed_files=$(git diff --name-only "$BASE_BRANCH" HEAD -- '**/package.json')

if [ -z "$changed_files" ]; then
    echo "✅ No package.json files changed."
    exit 0
fi

echo "📦 Changed package.json files:"
echo "$changed_files"

result_file="peer-deps-result.txt"

failed=0

for file in $changed_files; do
    echo ""
    echo "🔧 Checking file: $file"

    git show "$BASE_BRANCH":"$file" 2>/dev/null | awk '/"peerDependencies": ?{/,/}/' >/tmp/base-peer-deps.txt
    awk '/"peerDependencies": ?{/,/}/' "$file" >/tmp/current-peer-deps.txt

    diff_output=$(diff -u /tmp/base-peer-deps.txt /tmp/current-peer-deps.txt || true)

    changed_lines=$(echo "$diff_output" | grep -E '^[-+]' | grep -vE '^[-+]{3}')

    if [ -n "$changed_lines" ]; then
        echo "❌ peerDependencies changed in $file"
        echo "$changed_lines"

        {
            echo "❌ peerDependencies changed in $file"
            echo "$changed_lines"
            echo ""
        } >>"$result_file"

        failed=1
    else
        echo "✔️ No change in peerDependencies in $file"
    fi
done

rm -f /tmp/base-peer-deps.txt /tmp/current-peer-deps.txt

echo ""
if [ $failed -eq 1 ]; then
    echo "❌ Breaking change detected: peerDependencies modified."
    exit 1
else
    echo "✅ No peerDependencies changes found across all files."
    exit 0
fi
