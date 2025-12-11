#!/bin/bash

# Checks feature toggles based on their first appearance in a customer release

set -e

# Configuration
# File containing feature toggles
TOGGLES_FILE="projects/core/src/features-config/feature-toggles/config/feature-toggles.ts"
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

# Function to extract feature toggles and their line numbers
extract_toggles() {
    # Extract feature toggles from defaultFeatureToggles object
    # Find the start of the object (line with "export const defaultFeatureToggles")
    local start_line=$(grep -n "export const defaultFeatureToggles" "$TOGGLES_FILE" | cut -d: -f1)
    if [ -z "$start_line" ]; then
        echo "Error: Could not find defaultFeatureToggles object in $TOGGLES_FILE" >&2
        return 1
    fi
    
    # Find the end of the object (closing brace followed by semicolon)
    local end_line=$(sed -n "${start_line},\$p" "$TOGGLES_FILE" | grep -n "^};" | head -1 | cut -d: -f1)
    if [ -z "$end_line" ]; then
        echo "Error: Could not find end of defaultFeatureToggles object" >&2
        return 1
    fi
    
    # Calculate actual line number
    end_line=$((start_line + end_line - 1))
    
    # Extract the object content between the braces
    sed -n "$((start_line + 1)),$((end_line - 1))p" "$TOGGLES_FILE" | \
        grep -E "^\s*[a-zA-Z].*:\s*(true|false)" | \
        sed 's/^[[:space:]]*//' | \
        sed 's/[[:space:]]*:[[:space:]]*/:/' | \
        sed 's/,.*$//'
}

current_toggles=$(extract_toggles)
echo "Found $(echo "$current_toggles" | wc -l | tr -d ' ') feature toggles"
echo ""

# Arrays for results
declare -a TOGGLES_TO_REMOVE
declare -a TOGGLES_TO_ENABLE

# For each toggle, find when it was first released to customers
while IFS=: read -r toggle_name current_value; do
    if [[ -z "$toggle_name" ]]; then
        continue
    fi
    
    # Clean up toggle name and value
    toggle_name=$(echo "$toggle_name" | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')
    current_value=$(echo "$current_value" | sed 's/^[[:space:]]*//' | sed 's/[[:space:]]*$//')
    
    # Skip empty lines or invalid entries
    if [[ -z "$toggle_name" ]] || [[ "$toggle_name" =~ ^[[:space:]]*$ ]]; then
        continue
    fi
    
    # Get current value
    # We already have the current value from the parsing, no need to grep again
    
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
            echo "  → Toggle '$toggle_name' has override date: $first_release_date"
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
        if git show "$commit_hash:$TOGGLES_FILE" 2>/dev/null | grep -q "$toggle_name:"; then
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
    
    # If no override and toggle was found in oldest release, use git blame for actual introduction date
    if [[ -z "$override_date" ]] && [[ "$found_in_oldest" == "true" ]]; then
        echo "  → Toggle '$toggle_name' exists in oldest release, using git blame for actual introduction date"
        line_number=$(grep -n "$toggle_name:" "$TOGGLES_FILE" | head -1 | cut -d: -f1)
        if [[ -n "$line_number" ]]; then
            commit_hash=$(git blame -L "${line_number},${line_number}" "$TOGGLES_FILE" | awk '{print $1}')
            first_release_timestamp=$(git show -s --format=%ct "$commit_hash" 2>/dev/null)
            first_release_date=$(format_date "$first_release_timestamp")
            echo "    → Git blame result: $first_release_date (timestamp: $first_release_timestamp)"
        fi
    elif [[ -z "$override_date" ]] && [[ -n "$first_release_timestamp" ]]; then
        echo "  → Toggle '$toggle_name' first appeared in release: $first_release_date"
    elif [[ -z "$override_date" ]] && [[ -z "$first_release_timestamp" ]]; then
        echo "  → Toggle '$toggle_name' not found in any release - using git blame"
        line_number=$(grep -n "$toggle_name:" "$TOGGLES_FILE" | head -1 | cut -d: -f1)
        if [[ -n "$line_number" ]]; then
            commit_hash=$(git blame -L "${line_number},${line_number}" "$TOGGLES_FILE" | awk '{print $1}')
            first_release_timestamp=$(git show -s --format=%ct "$commit_hash" 2>/dev/null)
            first_release_date=$(format_date "$first_release_timestamp")
        fi
    fi
    
    # Categorize based on age
    if [[ $first_release_timestamp -lt $TWELVE_MONTHS_AGO ]]; then
        TOGGLES_TO_REMOVE+=("$toggle_name|$current_value|$first_release_date")
    elif [[ $first_release_timestamp -lt $SIX_MONTHS_AGO ]]; then
        # Only add to enable list if currently false
        if [[ "$current_value" == "false" ]]; then
            TOGGLES_TO_ENABLE+=("$toggle_name|$current_value|$first_release_date")
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
    echo "   projects/core/src/features-config/feature-toggles/config/feature-toggles.ts"
fi

# Exit with error code if action is needed
if [[ ${#TOGGLES_TO_REMOVE[@]} -gt 0 ]] || [[ ${#TOGGLES_TO_ENABLE[@]} -gt 0 ]]; then
    exit 1
else
    echo "✅ All feature toggles are compliant!"
    exit 0
fi