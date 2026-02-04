#!/bin/bash

# Checks feature toggles based on their first appearance in a customer release

set -e

# Configuration
# Files containing feature toggles
REGULAR_TOGGLES_FILE="projects/core/src/features-config/feature-toggles/config/feature-toggles.ts"
SSR_TOGGLES_FILE="core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts"
RELEASE_TRACKING_FILE="tools/config/const.ts"
OVERRIDES_FILE="tools/config/feature-toggle-dates-overrides.json"

if date -j -v-6m +%s >/dev/null 2>&1; then
    # macOS/BSD date
    SIX_MONTHS_AGO=$(date -j -v-6m +%s)
    TWELVE_MONTHS_AGO=$(date -j -v-12m +%s)
    # Helper function for formatting timestamps
    format_date() { date -r "$1"; }
else
    # GNU date (Linux)
    SIX_MONTHS_AGO=$(date -d '6 months ago' +%s)
    TWELVE_MONTHS_AGO=$(date -d '12 months ago' +%s)
    # Helper function for formatting timestamps
    format_date() { date -d "@$1"; }
fi

echo "🔍 Feature Toggle Check"
echo "========================================================="
echo "Current date: $(date)"
echo "6 months ago: $(format_date $SIX_MONTHS_AGO)"
echo "12 months ago: $(format_date $TWELVE_MONTHS_AGO)"
echo ""

# Get customer releases (excluding pre-releases)
echo "📦 Getting customer release history..."
customer_releases=$(git log --format="%H|%ct|%s" "$RELEASE_TRACKING_FILE" | \
                   grep "chore(release)" | \
                   awk -F'|' '$3 !~ /-[0-9]/ {print $1"|"$2}' | \
                   sort -t'|' -k2 -nr)

echo "Found $(echo "$customer_releases" | wc -l | tr -d ' ') customer releases"
echo ""

# Load overrides if file exists
load_overrides() {
    if [ -f "$OVERRIDES_FILE" ]; then
        echo "📋 Loading overrides from $OVERRIDES_FILE"
        cat "$OVERRIDES_FILE"
    else
        echo "{}"
    fi
}

# Get override date for a toggle (returns timestamp or empty if no override)
get_override_date() {
    local toggle_name="$1"
    local overrides_json="$2"
    
    # Extract override date for this toggle
    echo "$overrides_json" | grep -A 10 "\"$toggle_name\"" | \
    grep "policyStartDate" | \
    sed 's/.*"policyStartDate": *"\([^"]*\)".*/\1/' | \
    head -1
}

# Convert date string to timestamp
date_to_timestamp() {
    local date_str="$1"
    if [ -n "$date_str" ]; then
        if date -j -f "%Y-%m-%d" "$date_str" +%s >/dev/null 2>&1; then
            # macOS/BSD date
            date -j -f "%Y-%m-%d" "$date_str" +%s
        else
            # GNU date (Linux)
            date -d "$date_str" +%s
        fi
    fi
}

toggle_overrides=$(load_overrides)

# Extract current toggles
echo "📊 Analyzing current feature toggles..."

# Function to extract regular Spartacus feature toggles
# It looks for a code block:
# ```
# export const defaultFeatureToggles = ... {
#   ...
# }
# ```
# Returns multiple lines string, each line separating 3 values with colons:
# `regular:TOGGLE_NAME:TOGGLE_VALUE`
extract_regular_toggles() {
    local file="$1"
    # Extract feature toggles from defaultFeatureToggles object
    # Find the start of the object (line with "export const defaultFeatureToggles")
    local start_line=$(grep -n "export const defaultFeatureToggles" "$file" | cut -d: -f1)
    if [ -z "$start_line" ]; then
        echo "Error: Could not find defaultFeatureToggles object in $file" >&2
        return 1
    fi
    
    # Find the end of the object (closing brace followed by semicolon)
    local end_line=$(sed -n "${start_line},\$p" "$file" | grep -n "^};" | head -1 | cut -d: -f1)
    if [ -z "$end_line" ]; then
        echo "Error: Could not find end of defaultFeatureToggles object" >&2
        return 1
    fi
    
    # Calculate actual line number
    end_line=$((start_line + end_line - 1))
    
    # Extract the object content between the braces and prefix with source
    sed -n "$((start_line + 1)),$((end_line - 1))p" "$file" | \
        grep -E "^\s*[a-zA-Z].*:\s*(true|false)" | \
        sed 's/^[[:space:]]*//' | \
        sed 's/,.*$//' | \
        awk -F':' '{print "regular:" $1 ":" $2}'
}

# Function to extract ssr Spartacus feature toggles
# It looks for a code block:
# ```
# ssrFeatureToggles: {
#   ...
# },
# ```
# Returns multiple lines string, each line separating 3 values with colons:
# `ssr:TOGGLE_NAME:TOGGLE_VALUE`
extract_ssr_toggles() {
    local file="$1"
    # Extract feature toggles from ssrFeatureToggles object in defaultSsrOptimizationOptions
    # Find the start of ssrFeatureToggles
    local start_line=$(grep -n "ssrFeatureToggles: {" "$file" | cut -d: -f1)
    if [ -z "$start_line" ]; then
        echo "Error: Could not find ssrFeatureToggles object in $file" >&2
        return 1
    fi
    
    # Check if it's a single-line empty object: ssrFeatureToggles: {},
    local start_line_content=$(sed -n "${start_line}p" "$file")
    if echo "$start_line_content" | grep -q "ssrFeatureToggles: {},"; then
        # Empty object on single line - no toggles to extract, but valid
        return 0
    fi
    
    # Find the end of the ssrFeatureToggles object (closing brace)
    local end_line=$(sed -n "${start_line},\$p" "$file" | grep -n "^\s*}," | head -1 | cut -d: -f1)
    if [ -z "$end_line" ]; then
        echo "Error: Could not find end of ssrFeatureToggles object" >&2
        return 1
    fi
    
    # Calculate actual line number
    end_line=$((start_line + end_line - 1))
    
    # Extract the object content between the braces and prefix with source
    sed -n "$((start_line + 1)),$((end_line - 1))p" "$file" | \
        grep -E "^\s*[a-zA-Z].*:\s*(true|false)" | \
        sed 's/^[[:space:]]*//' | \
        sed 's/,.*$//' | \
        awk -F':' '{print "ssr:" $1 ":" $2}'
}

# Extract toggles from both files
regular_toggles=$(extract_regular_toggles "$REGULAR_TOGGLES_FILE")
ssr_toggles=$(extract_ssr_toggles "$SSR_TOGGLES_FILE")

# Combine all toggles
current_toggles=$(printf "%s\n%s" "$regular_toggles" "$ssr_toggles" | grep -v "^$")

regular_count=$(echo "$regular_toggles" | grep -c "^regular:" 2>/dev/null || echo 0)
ssr_count=$(echo "$ssr_toggles" | grep -c "^ssr:" 2>/dev/null || echo 0)
total_count=$((regular_count + ssr_count))

echo "Found $regular_count regular feature toggles and $ssr_count SSR feature toggles (total: $total_count)"
echo ""

# Arrays for results
declare -a TOGGLES_TO_REMOVE
declare -a TOGGLES_TO_ENABLE

# For each toggle, find when it was first released to customers
while IFS= read -r toggle_line; do
    if [[ -z "$toggle_line" ]]; then
        continue
    fi
    
    # Parse the line: source:name:value
    source_type=$(echo "$toggle_line" | cut -d':' -f1)
    toggle_name=$(echo "$toggle_line" | cut -d':' -f2)
    current_value=$(echo "$toggle_line" | cut -d':' -f3 | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')
    
    # Skip empty lines or invalid entries
    if [[ -z "$toggle_name" ]] || [[ "$toggle_name" =~ ^[[:space:]]*$ ]]; then
        continue
    fi
    
    # Determine which file to search in based on source
    if [[ "$source_type" == "regular" ]]; then
        toggle_file="$REGULAR_TOGGLES_FILE"
    elif [[ "$source_type" == "ssr" ]]; then
        toggle_file="$SSR_TOGGLES_FILE"
    else
        echo "  ⚠️ Unknown source type '$source_type' for toggle '$toggle_name'" 
        continue
    fi
    
    # Find first release containing this toggle
    first_release_timestamp=""
    first_release_date=""
    
    # Check for override first
    override_date=$(get_override_date "$toggle_name" "$toggle_overrides")
    if [[ -n "$override_date" ]]; then
        override_timestamp=$(date_to_timestamp "$override_date")
        if [[ -n "$override_timestamp" ]]; then
            first_release_timestamp="$override_timestamp"
            first_release_date=$(format_date "$override_timestamp")
            echo "  → Toggle '$toggle_name' ($source_type) has override date: $first_release_date"
        fi
    fi
    
    # If no override, check releases from oldest to newest to find first appearance
    if [[ -z "$first_release_timestamp" ]]; then
        found_in_oldest=false
        while IFS='|' read -r commit_hash timestamp; do
        if [[ -z "$commit_hash" ]]; then
            continue
        fi
        
        # Check if toggle exists in this release
        if git show "$commit_hash:$toggle_file" 2>/dev/null | grep -q "$toggle_name:"; then
            # Toggle exists in this release
            if [[ -z "$first_release_timestamp" ]]; then
                # This is the first release we found it in
                first_release_timestamp="$timestamp"
                first_release_date=$(format_date "$timestamp")
                
                # Check if this is the oldest release we have
                oldest_timestamp=$(echo "$customer_releases" | tail -1 | cut -d'|' -f2)
                if [[ "$timestamp" == "$oldest_timestamp" ]]; then
                    found_in_oldest=true
                fi
            fi
        fi
        done <<< "$(echo "$customer_releases" | sort -t'|' -k2 -n)"
    fi
    
    # If no override and toggle was found in oldest release, use git log -S for actual introduction date
    if [[ -z "$override_date" ]] && [[ "$found_in_oldest" == "true" ]]; then
        echo "  → Toggle '$toggle_name' ($source_type) exists in oldest release, using git log -S for actual introduction date"
        # Use git log -S to find when the toggle name was first introduced
        commit_hash=$(git log -S "$toggle_name" --format="%H" -- "$toggle_file" | tail -1)
        if [[ -n "$commit_hash" ]]; then
            first_release_timestamp=$(git show -s --format=%ct "$commit_hash" 2>/dev/null)
            first_release_date=$(format_date "$first_release_timestamp")
            echo "    → Git log -S result: $first_release_date (timestamp: $first_release_timestamp)"
        fi
    elif [[ -z "$override_date" ]] && [[ -n "$first_release_timestamp" ]]; then
        echo "  → Toggle '$toggle_name' ($source_type) first appeared in release: $first_release_date"
    elif [[ -z "$override_date" ]] && [[ -z "$first_release_timestamp" ]]; then
        echo "  → Toggle '$toggle_name' ($source_type) not found in any release - using git log -S"
        commit_hash=$(git log -S "$toggle_name" --format="%H" -- "$toggle_file" | tail -1)
        if [[ -n "$commit_hash" ]]; then
            first_release_timestamp=$(git show -s --format=%ct "$commit_hash" 2>/dev/null)
            first_release_date=$(format_date "$first_release_timestamp")
        fi
    fi
    
    # Categorize based on age
    if [[ $first_release_timestamp -lt $TWELVE_MONTHS_AGO ]]; then
        TOGGLES_TO_REMOVE+=("$toggle_name ($source_type)|$current_value|$first_release_date")
    elif [[ $first_release_timestamp -lt $SIX_MONTHS_AGO ]]; then
        # Only add to enable list if currently false
        if [[ "$current_value" == "false" ]]; then
            TOGGLES_TO_ENABLE+=("$toggle_name ($source_type)|$current_value|$first_release_date")
        fi
    fi
    
done <<< "$current_toggles"

# Display results
echo ""
echo "🗑️  TOGGLES TO REMOVE (Released >12 months ago):"
echo "================================================="
if [[ ${#TOGGLES_TO_REMOVE[@]} -eq 0 ]]; then
    echo "✅ No toggles need to be removed"
else
    printf "%-50s %-10s %-20s\n" "Toggle Name" "Current" "First Released"
    printf "%-50s %-10s %-20s\n" "-----------" "-------" "-------------"
    for toggle_info in "${TOGGLES_TO_REMOVE[@]}"; do
        IFS='|' read -r name value date <<< "$toggle_info"
        printf "%-50s %-10s %-20s\n" "$name" "$value" "$date"
    done
fi

echo ""
echo "⚡ TOGGLES TO ENABLE (Released 6-12 months ago, currently false):"
echo "================================================================="
if [[ ${#TOGGLES_TO_ENABLE[@]} -eq 0 ]]; then
    echo "✅ No toggles need to be enabled"
else
    printf "%-50s %-10s %-20s\n" "Toggle Name" "Current" "First Released"
    printf "%-50s %-10s %-20s\n" "-----------" "-------" "-------------"
    for toggle_info in "${TOGGLES_TO_ENABLE[@]}"; do
        IFS='|' read -r name value date <<< "$toggle_info"
        printf "%-50s %-10s %-20s\n" "$name" "$value" "$date"
    done
fi



# Summary
echo ""
echo "📋 SUMMARY:"
echo "==========="
echo "Toggles to remove: ${#TOGGLES_TO_REMOVE[@]}"
echo "Toggles to enable: ${#TOGGLES_TO_ENABLE[@]}"

# Generate actionable commands if needed
if [[ ${#TOGGLES_TO_REMOVE[@]} -gt 0 ]] || [[ ${#TOGGLES_TO_ENABLE[@]} -gt 0 ]]; then
    echo ""
    echo "🔧 SUGGESTED ACTIONS:"
    echo "===================="
    
    if [[ ${#TOGGLES_TO_ENABLE[@]} -gt 0 ]]; then
        echo "1. Enable these toggles (set to true):"
        for toggle_info in "${TOGGLES_TO_ENABLE[@]}"; do
            IFS='|' read -r name value date <<< "$toggle_info"
            echo "   - $name"
        done
        echo ""
    fi
    
    if [[ ${#TOGGLES_TO_REMOVE[@]} -gt 0 ]]; then
        echo "2. Remove these toggles entirely:"
        for toggle_info in "${TOGGLES_TO_REMOVE[@]}"; do
            IFS='|' read -r name value date <<< "$toggle_info"
            echo "   - $name (and related code)"
        done
        echo ""
    fi
    
    echo "💡 To apply changes, manually edit:"
    echo "   Regular Feature Toggles:"
    echo "      projects/core/src/features-config/feature-toggles/config/feature-toggles.ts"
    echo "   SSR Feature Toggles:"
    echo "      core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts"
fi

# Exit with error code if action is needed
if [[ ${#TOGGLES_TO_REMOVE[@]} -gt 0 ]] || [[ ${#TOGGLES_TO_ENABLE[@]} -gt 0 ]]; then
    exit 1
else
    echo "✅ All feature toggles are compliant!"
    exit 0
fi