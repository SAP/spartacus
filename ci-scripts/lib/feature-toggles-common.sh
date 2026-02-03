#!/bin/bash

# Common functions and constants for feature toggles scripts
# This file should be sourced by other scripts, not executed directly.

# ============================================================================
# CONFIGURATION - Common file paths
# ============================================================================
REGULAR_TOGGLES_FILE="projects/core/src/features-config/feature-toggles/config/feature-toggles.ts"
SSR_TOGGLES_FILE="core-libs/setup/ssr/optimized-engine/ssr-optimization-options.ts"

# ============================================================================
# FUNCTIONS FOR EXTRACTING FEATURE TOGGLES
# ============================================================================

# Generic function to extract feature toggles from content (passed as string)
# Arguments:
#   $1 - content of the file as string
#   $2 - pattern to search for the start of the object (e.g., "export const defaultFeatureToggles")
#   $3 - pattern for the closing brace (e.g., "^};" or "^\s*},")
#   $4 - (optional) pattern for empty single-line object (e.g., "ssrFeatureToggles: {},")
# Output:
#   Multiple lines, each containing a toggle name (sorted)
_extract_toggles_from_content() {
    local content="$1"
    local start_pattern="$2"
    local end_pattern="$3"
    local empty_pattern="${4:-}"

    # Find the start of the object
    local start_line=$(echo "$content" | grep -n "$start_pattern" | cut -d: -f1)
    if [[ -z "$start_line" ]]; then
        echo ""
        return
    fi

    # Check if it's a single-line empty object (if pattern provided)
    if [[ -n "$empty_pattern" ]]; then
        local start_line_content=$(echo "$content" | sed -n "${start_line}p")
        if echo "$start_line_content" | grep -q "$empty_pattern"; then
            echo ""
            return
        fi
    fi

    # Find the closing brace (end of the object)
    local end_line=$(echo "$content" | tail -n +$start_line | grep -n "$end_pattern" | head -1 | cut -d: -f1)
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

# Generic function to extract feature toggles from a file path
# Arguments:
#   $1 - path to the file
#   $2 - type prefix (e.g., "regular" or "ssr")
#   $3 - pattern to search for the start of the object
#   $4 - pattern for the closing brace
#   $5 - (optional) pattern for empty single-line object
#   $6 - (optional) object name for error messages
# Output:
#   Multiple lines, each separating 3 values with colons: `TYPE:TOGGLE_NAME:TOGGLE_VALUE`
_extract_toggles_from_file() {
    local file="$1"
    local type_prefix="$2"
    local start_pattern="$3"
    local end_pattern="$4"
    local empty_pattern="${5:-}"
    local object_name="${6:-toggles object}"

    if [[ ! -f "$file" ]]; then
        echo "Error: File not found: $file" >&2
        return 1
    fi

    # Find the start of the object
    local start_line=$(grep -n "$start_pattern" "$file" | cut -d: -f1)
    if [[ -z "$start_line" ]]; then
        echo "Error: Could not find $object_name in $file" >&2
        return 1
    fi

    # Check if it's a single-line empty object (if pattern provided)
    if [[ -n "$empty_pattern" ]]; then
        local start_line_content=$(sed -n "${start_line}p" "$file")
        if echo "$start_line_content" | grep -q "$empty_pattern"; then
            # Empty object on single line - no toggles to extract, but valid
            return 0
        fi
    fi

    # Find the end of the object
    local end_line=$(sed -n "${start_line},\$p" "$file" | grep -n "$end_pattern" | head -1 | cut -d: -f1)
    if [[ -z "$end_line" ]]; then
        echo "Error: Could not find end of $object_name" >&2
        return 1
    fi

    # Calculate actual line number
    end_line=$((start_line + end_line - 1))

    # Extract the object content between the braces and prefix with type
    sed -n "$((start_line + 1)),$((end_line - 1))p" "$file" | \
        grep -E "^\s*[a-zA-Z].*:\s*(true|false)" | \
        sed 's/^[[:space:]]*//' | \
        sed 's/,.*$//' | \
        awk -F':' -v prefix="$type_prefix" '{print prefix ":" $1 ":" $2}'
}

# ============================================================================
# PUBLIC API - Convenience wrappers for specific toggle types
# ============================================================================

# Extract regular feature toggles from file content
# Arguments:
#   $1 - content of the file as string
# Output:
#   Multiple lines, each containing a toggle name (sorted)
extract_regular_toggles_from_content() {
    _extract_toggles_from_content "$1" "export const defaultFeatureToggles" "^};"
}

# Extract regular feature toggles from a file path
# Arguments:
#   $1 - path to the file
# Output:
#   Multiple lines, each separating 3 values with colons: `regular:TOGGLE_NAME:TOGGLE_VALUE`
extract_regular_toggles_from_file() {
    _extract_toggles_from_file "$1" "regular" "export const defaultFeatureToggles" "^};" "" "defaultFeatureToggles object"
}

# Extract SSR feature toggles from file content
# Arguments:
#   $1 - content of the file as string
# Output:
#   Multiple lines, each containing a toggle name (sorted)
extract_ssr_toggles_from_content() {
    _extract_toggles_from_content "$1" "ssrFeatureToggles: {" "^\s*}," "ssrFeatureToggles: {},"
}

# Extract SSR feature toggles from a file path
# Arguments:
#   $1 - path to the file
# Output:
#   Multiple lines, each separating 3 values with colons: `ssr:TOGGLE_NAME:TOGGLE_VALUE`
extract_ssr_toggles_from_file() {
    _extract_toggles_from_file "$1" "ssr" "ssrFeatureToggles: {" "^\s*}," "ssrFeatureToggles: {}," "ssrFeatureToggles object"
}

# ============================================================================
# DATE HELPER FUNCTIONS
# ============================================================================

# Helper function for formatting timestamps (cross-platform: macOS/Linux)
format_date() {
    local timestamp="$1"
    if date -r "$timestamp" >/dev/null 2>&1; then
        # macOS/BSD date
        date -r "$timestamp"
    else
        # GNU date (Linux)
        date -d "@$timestamp"
    fi
}

# Convert date string (YYYY-MM-DD) to timestamp (cross-platform: macOS/Linux)
date_to_timestamp() {
    local date_str="$1"
    if [[ -n "$date_str" ]]; then
        if date -j -f "%Y-%m-%d" "$date_str" +%s >/dev/null 2>&1; then
            # macOS/BSD date
            date -j -f "%Y-%m-%d" "$date_str" +%s
        else
            # GNU date (Linux)
            date -d "$date_str" +%s
        fi
    fi
}

# Get timestamp for N months ago (cross-platform: macOS/Linux)
get_months_ago_timestamp() {
    local months="$1"
    if date -j -v-${months}m +%s >/dev/null 2>&1; then
        # macOS/BSD date
        date -j -v-${months}m +%s
    else
        # GNU date (Linux)
        date -d "${months} months ago" +%s
    fi
}
