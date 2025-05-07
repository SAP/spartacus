#!/bin/bash

# Origin is passed as an argument to the script, defaulting to 'develop' if not provided.
BASE_BRANCH=${1:-develop}

git fetch origin "$BASE_BRANCH:$BASE_BRANCH"

echo "🔍 Checking for changes in peerDependencies compared to $BASE_BRANCH..."

# Variable holds the list of changed package.json files
# between the current branch and the base branch.
changed_files=$(git diff --name-only "$BASE_BRANCH" HEAD -- '**/package.json')

# If no package.json files have changed, exit the script.
if [ -z "$changed_files" ]; then
    echo "✅ No package.json files changed."
    exit 0
fi

echo "📦 Changed package.json files:"
echo "$changed_files"

# Create a temporary file to store changed peerDependencies in diff format.
# This file is used to post PR comment later.
result_file="peer-deps-result.txt"

failed=0

for file in $changed_files; do
    echo ""
    echo "🔧 Checking file: $file"

    # Check if file exists on base branch; skip if it doesn't
    if ! git ls-tree -r "$BASE_BRANCH" --name-only | grep -qx "$file"; then
        echo "Skipping new file: $file (doesn't exist on $BASE_BRANCH)"
        continue
    fi

    git show "$BASE_BRANCH":"$file" 2>/dev/null | awk '/"peerDependencies": ?{/,/}/' >/tmp/base-peer-deps.txt
    awk '/"peerDependencies": ?{/,/}/' "$file" >/tmp/current-peer-deps.txt

    diff_output=$(diff -u /tmp/base-peer-deps.txt /tmp/current-peer-deps.txt || true)

    changed_lines=$(echo "$diff_output" | grep -E '^[-+]' | grep -vE '^[-+]{3}')

    if [ -z "$changed_lines" ]; then
        echo "✔️ No change in peerDependencies in $file"
        continue
    fi

    # Check if any change is related to non-Spartacus packages
    non_spartacus_change=$(echo "$changed_lines" | grep -vE '^[-+] *"@spartacus/')

    if [ -n "$non_spartacus_change" ]; then
        echo "❌ Invalid peerDependencies change in $file"
        echo "$non_spartacus_change"

        {
            echo "❌ Invalid peerDependencies change in $file"
            echo "$non_spartacus_change"
            echo ""
        } >>"$result_file"

        failed=1
    else
        echo "✔️ Only allowed changes (Spartacus packages) in $file"
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
