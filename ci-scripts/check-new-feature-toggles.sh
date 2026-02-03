#!/bin/bash

# Detect newly added feature toggles in the current commit

set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Source common functions and constants
source "$SCRIPT_DIR/lib/feature-toggles-common.sh"

echo "🔍 Checking for newly added feature toggles..."
echo "================================================="


# Get the base commit for comparison (always compare against previous commit)
BASE_COMMIT="HEAD~1"
CURRENT_COMMIT="HEAD"
echo "📊 Comparing against previous commit: $BASE_COMMIT"

# Check if any toggle files were modified
regular_modified=false
ssr_modified=false

if git diff --name-only "$BASE_COMMIT" "$CURRENT_COMMIT" | grep -q "$REGULAR_TOGGLES_FILE"; then
    regular_modified=true
    echo "📝 Regular feature toggles file was modified"
fi

if git diff --name-only "$BASE_COMMIT" "$CURRENT_COMMIT" | grep -q "$SSR_TOGGLES_FILE"; then
    ssr_modified=true
    echo "📝 SSR feature toggles file was modified"
fi

if [[ "$regular_modified" == "false" ]] && [[ "$ssr_modified" == "false" ]]; then
    echo "✅ No feature toggles files were modified in this commit"
    exit 0
fi

echo ""

# Initialize arrays for new toggles
new_regular_toggles=""
new_ssr_toggles=""

# Check regular toggles if modified
if [[ "$regular_modified" == "true" ]]; then
    echo "🔍 Extracting regular toggles from base commit..."
    base_content=$(git show "$BASE_COMMIT:$REGULAR_TOGGLES_FILE" 2>/dev/null || echo "")
    if [[ -z "$base_content" ]]; then
        echo "⚠️  Could not get base version of regular feature toggles file"
        base_regular_toggles=""
    else
        base_regular_toggles=$(extract_regular_toggles_from_content "$base_content")
    fi

    echo "🔍 Extracting regular toggles from current commit..."
    if [[ ! -f "$REGULAR_TOGGLES_FILE" ]]; then
        echo "❌ Regular feature toggles file not found: $REGULAR_TOGGLES_FILE"
        exit 1
    fi

    current_content=$(cat "$REGULAR_TOGGLES_FILE")
    current_regular_toggles=$(extract_regular_toggles_from_content "$current_content")

    # Find new regular toggles
    while read -r toggle; do
        if [[ -n "$toggle" ]] && ! echo "$base_regular_toggles" | grep -q "^$toggle$"; then
            if [[ -z "$new_regular_toggles" ]]; then
                new_regular_toggles="$toggle"
            else
                new_regular_toggles="$new_regular_toggles"$'\n'"$toggle"
            fi
        fi
    done <<< "$current_regular_toggles"
fi

# Check SSR toggles if modified
if [[ "$ssr_modified" == "true" ]]; then
    echo "🔍 Extracting SSR toggles from base commit..."
    base_ssr_content=$(git show "$BASE_COMMIT:$SSR_TOGGLES_FILE" 2>/dev/null || echo "")
    if [[ -z "$base_ssr_content" ]]; then
        echo "⚠️  Could not get base version of SSR feature toggles file"
        base_ssr_toggles=""
    else
        base_ssr_toggles=$(extract_ssr_toggles_from_content "$base_ssr_content")
    fi

    echo "🔍 Extracting SSR toggles from current commit..."
    if [[ ! -f "$SSR_TOGGLES_FILE" ]]; then
        echo "❌ SSR feature toggles file not found: $SSR_TOGGLES_FILE"
        exit 1
    fi

    current_ssr_content=$(cat "$SSR_TOGGLES_FILE")
    current_ssr_toggles=$(extract_ssr_toggles_from_content "$current_ssr_content")

    # Find new SSR toggles
    while read -r toggle; do
        if [[ -n "$toggle" ]] && ! echo "$base_ssr_toggles" | grep -q "^$toggle$"; then
            if [[ -z "$new_ssr_toggles" ]]; then
                new_ssr_toggles="$toggle (ssr)"
            else
                new_ssr_toggles="$new_ssr_toggles"$'\n'"$toggle (ssr)"
            fi
        fi
    done <<< "$current_ssr_toggles"
fi

echo ""
echo "🆕 Identifying new toggles..."

# Combine all new toggles
new_toggles=""
if [[ -n "$new_regular_toggles" ]]; then
    new_toggles="$new_regular_toggles"
fi
if [[ -n "$new_ssr_toggles" ]]; then
    if [[ -z "$new_toggles" ]]; then
        new_toggles="$new_ssr_toggles"
    else
        new_toggles="$new_toggles"$'\n'"$new_ssr_toggles"
    fi
fi

if [[ -z "$new_toggles" ]]; then
    echo "✅ No new feature toggles detected"
    [[ -n "$GITHUB_OUTPUT" ]] && echo "new_toggles_found=false" >> $GITHUB_OUTPUT
    exit 0
fi

# Count new toggles
new_toggle_count=$(echo -e "$new_toggles" | wc -l | tr -d ' ')

echo "🚨 Found $new_toggle_count new feature toggle(s):"
echo -e "$new_toggles" | sed 's/^/  - /'
echo ""

# Export results for GitHub Actions (only if running in GitHub Actions)
if [[ -n "$GITHUB_OUTPUT" ]]; then
    echo "new_toggles_found=true" >> $GITHUB_OUTPUT
    echo "new_toggle_count=$new_toggle_count" >> $GITHUB_OUTPUT
fi

# Format toggle list for Slack (with bullet points and double line breaks)
new_toggles_formatted=""
while IFS= read -r toggle; do
    if [[ -n "$toggle" ]]; then
        if [[ -z "$new_toggles_formatted" ]]; then
            new_toggles_formatted="• $toggle"
        else
            new_toggles_formatted="$new_toggles_formatted\\n\\n• $toggle"
        fi
    fi
done <<< "$new_toggles"

if [[ -n "$GITHUB_OUTPUT" ]]; then
    echo "new_toggles_list<<EOF" >> $GITHUB_OUTPUT
    echo -e "$new_toggles_formatted" >> $GITHUB_OUTPUT
    echo "EOF" >> $GITHUB_OUTPUT

    # Also create a comma-separated list
    new_toggles_csv=$(echo -e "$new_toggles" | tr '\n' ',' | sed 's/,$//')
    echo "new_toggles_csv=$new_toggles_csv" >> $GITHUB_OUTPUT
fi

echo "💡 New feature toggles have been added!"
echo "   Please ensure they are properly documented for customers."
echo ""

# Exit with success - we only notify, don't fail the build
exit 0
