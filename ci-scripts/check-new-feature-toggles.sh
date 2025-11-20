#!/bin/bash

# Detect newly added feature toggles in the current commit

set -e

# Configuration
TOGGLES_FILE="projects/core/src/features-config/feature-toggles/config/feature-toggles.ts"

echo "🔍 Checking for newly added feature toggles..."
echo "================================================="

# Function to extract feature toggles from a file content
extract_toggles_from_content() {
    local content="$1"
    
    # Find the start of defaultFeatureToggles object
    local start_line=$(echo "$content" | grep -n "export const defaultFeatureToggles" | cut -d: -f1)
    if [[ -z "$start_line" ]]; then
        echo ""
        return
    fi
    
    # Find the closing brace (end of the object)
    local end_line=$(echo "$content" | tail -n +$start_line | grep -n "^};" | head -1 | cut -d: -f1)
    if [[ -z "$end_line" ]]; then
        echo ""
        return
    fi
    
    # Calculate actual line numbers
    end_line=$((start_line + end_line - 1))
    
    # Extract toggles between the braces
    echo "$content" | sed -n "$((start_line + 1)),$((end_line - 1))p" | \
        grep -E "^\s*[a-zA-Z].*:\s*(true|false)" | \
        sed 's/^[[:space:]]*//' | \
        sed 's/[[:space:]]*:[[:space:]]*.*$//' | \
        sort
}

# Get the base commit for comparison (always compare against previous commit)
BASE_COMMIT="HEAD~1"
CURRENT_COMMIT="HEAD"
echo "📊 Comparing against previous commit: $BASE_COMMIT"

# Check if the feature toggles file was modified
if ! git diff --name-only "$BASE_COMMIT" "$CURRENT_COMMIT" | grep -q "$TOGGLES_FILE"; then
    echo "✅ Feature toggles file was not modified in this commit"
    exit 0
fi

echo "📝 Feature toggles file was modified, checking for new toggles..."

# Get toggles from base commit
echo "🔍 Extracting toggles from base commit..."
base_content=$(git show "$BASE_COMMIT:$TOGGLES_FILE" 2>/dev/null || echo "")
if [[ -z "$base_content" ]]; then
    echo "⚠️  Could not get base version of feature toggles file"
    base_toggles=""
else
    base_toggles=$(extract_toggles_from_content "$base_content")
fi

# Get toggles from current commit
echo "🔍 Extracting toggles from current commit..."
if [[ ! -f "$TOGGLES_FILE" ]]; then
    echo "❌ Feature toggles file not found: $TOGGLES_FILE"
    exit 1
fi

current_content=$(cat "$TOGGLES_FILE")
current_toggles=$(extract_toggles_from_content "$current_content")

# Find new toggles
echo "🆕 Identifying new toggles..."
new_toggles=""
while read -r toggle; do
    if [[ -n "$toggle" ]] && ! echo "$base_toggles" | grep -q "^$toggle$"; then
        if [[ -z "$new_toggles" ]]; then
            new_toggles="$toggle"
        else
            new_toggles="$new_toggles"$'\n'"$toggle"
        fi
    fi
done <<< "$current_toggles"

if [[ -z "$new_toggles" ]]; then
    echo "✅ No new feature toggles detected"
    echo "new_toggles_found=false" >> $GITHUB_OUTPUT
    exit 0
fi

# Count new toggles
new_toggle_count=$(echo -e "$new_toggles" | wc -l | tr -d ' ')

echo "🚨 Found $new_toggle_count new feature toggle(s):"
echo -e "$new_toggles" | sed 's/^/  - /'
echo ""

# Export results for GitHub Actions
echo "new_toggles_found=true" >> $GITHUB_OUTPUT
echo "new_toggle_count=$new_toggle_count" >> $GITHUB_OUTPUT

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

echo "new_toggles_list<<EOF" >> $GITHUB_OUTPUT
echo -e "$new_toggles_formatted" >> $GITHUB_OUTPUT
echo "EOF" >> $GITHUB_OUTPUT

# Also create a comma-separated list
new_toggles_csv=$(echo -e "$new_toggles" | tr '\n' ',' | sed 's/,$//')
echo "new_toggles_csv=$new_toggles_csv" >> $GITHUB_OUTPUT

echo "💡 New feature toggles have been added!"
echo "   Please ensure they are properly documented for customers."
echo ""

# Exit with success - we only notify, don't fail the build
exit 0