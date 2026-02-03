#!/bin/bash

# Checks feature toggles based on their first appearance in a customer release

set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Source common functions and constants
source "$SCRIPT_DIR/lib/feature-toggles-common.sh"

# Additional configuration specific to this script
RELEASE_TRACKING_FILE="tools/config/const.ts"
OVERRIDES_FILE="tools/config/feature-toggle-dates-overrides.json"

# Calculate date thresholds
SIX_MONTHS_AGO=$(get_months_ago_timestamp 6)
TWELVE_MONTHS_AGO=$(get_months_ago_timestamp 12)

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


toggle_overrides=$(load_overrides)

# Extract current toggles
echo "📊 Analyzing current feature toggles..."

# Extract toggles from both files using common functions
regular_toggles=$(extract_regular_toggles_from_file "$REGULAR_TOGGLES_FILE")
ssr_toggles=$(extract_ssr_toggles_from_file "$SSR_TOGGLES_FILE")

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
