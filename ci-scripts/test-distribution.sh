#!/usr/bin/env bash

#
# Test Distribution Strategy for Parallel CI Execution
#
# This script implements a round-robin test distribution algorithm that automatically
# divides test files across multiple CI containers to enable parallel execution.
#
# ALGORITHM:
# 1. Discovers all test files matching the specified pattern in the target directory
# 2. Sorts files alphabetically for consistent distribution across runs
# 3. Uses modulo arithmetic (file_index % total_containers) to assign files to containers
# 4. Each container gets every Nth file where N = total_containers
#
# BENEFITS:
# - Automatic load balancing - no manual test assignment required
# - Deterministic distribution - same files always go to same container
# - Graceful handling of uneven test counts across containers
# - Easy to scale - just increase container count in CI matrix
#
# EXAMPLE: 4 containers, 10 test files
# Container 1: files 0, 4, 8    (files where index % 4 == 0)
# Container 2: files 1, 5, 9    (files where index % 4 == 1)
# Container 3: files 2, 6       (files where index % 4 == 2)
# Container 4: files 3, 7       (files where index % 4 == 3)
#

source "$(dirname "$0")/test-distribution.config.sh"

distribute_tests() {
    local test_pattern="$1"
    local container="$2"
    local total_containers="$3"
    local base_path="$4"

    # Find all test files matching the pattern and sort for consistent ordering
    # Sorting ensures the same files are always assigned to the same container
    local all_files=($(find "$base_path" -name "$test_pattern" | sort))
    local total_files=${#all_files[@]}

    # Return empty if no test files found in this directory
    if [[ $total_files -eq 0 ]]; then
        echo ""
        return
    fi

    # Apply round-robin distribution using modulo arithmetic
    # Each container gets files where (file_index % total_containers) == (container - 1)
    local selected_files=()
    for ((i=0; i<total_files; i++)); do
        if [[ $((i % total_containers)) -eq $((container - 1)) ]]; then
            local relative_path="${all_files[i]#projects/storefrontapp-e2e-cypress/}"
            selected_files+=("$relative_path")
        fi
    done

    # Return empty if no files assigned to this container
    if [[ ${#selected_files[@]} -eq 0 ]]; then
        echo ""
        return
    fi

    # Build comma-separated spec pattern for Cypress
    # Format: "file1.cy.ts,file2.cy.ts,file3.cy.ts"
    local spec_pattern=""
    for file in "${selected_files[@]}"; do
        if [[ -n "$spec_pattern" ]]; then
            spec_pattern="$spec_pattern,$file"
        else
            spec_pattern="$file"
        fi
    done

    echo "$spec_pattern"
}
