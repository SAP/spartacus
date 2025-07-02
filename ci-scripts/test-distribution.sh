#!/usr/bin/env bash

source "$(dirname "$0")/test-distribution.config.sh"

distribute_tests() {
    local test_pattern="$1"
    local container="$2"
    local total_containers="$3"
    local base_path="$4"

    local all_files=($(find "$base_path" -name "$test_pattern" | sort))
    local total_files=${#all_files[@]}

    if [[ $total_files -eq 0 ]]; then
        echo ""
        return
    fi

    local selected_files=()
    for ((i=0; i<total_files; i++)); do
        if [[ $((i % total_containers)) -eq $((container - 1)) ]]; then
            local relative_path="${all_files[i]#projects/storefrontapp-e2e-cypress/}"
            selected_files+=("$relative_path")
        fi
    done

    if [[ ${#selected_files[@]} -eq 0 ]]; then
        echo ""
        return
    fi

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
