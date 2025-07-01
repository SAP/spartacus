#!/usr/bin/env bash

# Generic test distribution and load balancing utilities

# Source configuration
source "$(dirname "$0")/test-distribution.config.sh"

get_file_complexity() {
    local file_path="$1"

    if [[ ! -f "$file_path" ]]; then
        echo "1"
        return
    fi

    # Count test cases (it() blocks) and describe blocks
    local test_count=$(grep -c "it(" "$file_path" 2>/dev/null || echo "0")
    local describe_count=$(grep -c "describe(" "$file_path" 2>/dev/null || echo "0")
    local file_size=$(wc -l < "$file_path" 2>/dev/null || echo "0")

    # Configurable complexity score
    local complexity=$((
        test_count * COMPLEXITY_WEIGHT_IT_BLOCKS +
        describe_count * COMPLEXITY_WEIGHT_DESCRIBE_BLOCKS +
        file_size / COMPLEXITY_WEIGHT_FILE_SIZE_DIVISOR
    ))

    # Minimum complexity of 1
    echo $((complexity > 0 ? complexity : 1))
}

distribute_tests() {
    local test_pattern="$1"
    local container="$2"
    local total_containers="$3"
    local base_path="$4"
    local strategy="${5:-$TEST_DISTRIBUTION_STRATEGY}"

    case "$strategy" in
        "simple")
            distribute_tests_simple "$test_pattern" "$container" "$total_containers" "$base_path"
            ;;
        "complexity"|*)
            distribute_tests_by_complexity "$test_pattern" "$container" "$total_containers" "$base_path"
            ;;
    esac
}

distribute_tests_by_complexity() {
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

    # Calculate complexity for each file and create weighted distribution
    local file_complexities=()
    local total_complexity=0

    for file in "${all_files[@]}"; do
        local complexity=$(get_file_complexity "$file")
        file_complexities+=("$complexity")
        total_complexity=$((total_complexity + complexity))
    done

    # Assign files to containers using greedy algorithm
    local container_loads=()
    local container_files=()
    for ((i=0; i<total_containers; i++)); do
        container_loads[i]=0
        container_files[i]=""
    done

    # Sort files by complexity (descending) for better distribution
    local sorted_indices=()
    for ((i=0; i<total_files; i++)); do
        sorted_indices[i]=$i
    done

    # Simple bubble sort by complexity (descending)
    for ((i=0; i<total_files-1; i++)); do
        for ((j=0; j<total_files-i-1; j++)); do
            local idx1=${sorted_indices[j]}
            local idx2=${sorted_indices[j+1]}
            if [[ ${file_complexities[idx1]} -lt ${file_complexities[idx2]} ]]; then
                # Swap
                local temp=${sorted_indices[j]}
                sorted_indices[j]=${sorted_indices[j+1]}
                sorted_indices[j+1]=$temp
            fi
        done
    done

    # Assign files to containers (greedy: always assign to least loaded container)
    for ((i=0; i<total_files; i++)); do
        local file_idx=${sorted_indices[i]}
        local complexity=${file_complexities[file_idx]}

        # Find container with minimum load
        local min_container=0
        local min_load=${container_loads[0]}
        for ((c=1; c<total_containers; c++)); do
            if [[ ${container_loads[c]} -lt $min_load ]]; then
                min_container=$c
                min_load=${container_loads[c]}
            fi
        done

        # Assign file to least loaded container
        container_loads[min_container]=$((${container_loads[min_container]} + complexity))
        local relative_path="${all_files[file_idx]#projects/storefrontapp-e2e-cypress/}"
        if [[ -n "${container_files[min_container]}" ]]; then
            container_files[min_container]="${container_files[min_container]},$relative_path"
        else
            container_files[min_container]="$relative_path"
        fi
    done

    # Return files for requested container
    echo "${container_files[$((container - 1))]}"
}

distribute_tests_simple() {
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
