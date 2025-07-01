#!/usr/bin/env bash

source "$(dirname "$0")/test-distribution.config.sh"
source "$(dirname "$0")/timing-collector.sh"

get_file_weight() {
    local file_path="$1"

    local timing=$(get_test_timing "$file_path")

    if [[ "$timing" != "0" && "$timing" != "" && "$timing" != "null" ]]; then
        local timing_int=$(echo "$timing" | sed 's/\.//' | sed 's/^0*//' | head -c 10)
        if [[ -z "$timing_int" || "$timing_int" = "" ]]; then
            timing_int=1
        fi
        if [[ "$timing_int" =~ ^[0-9]+$ ]] && [[ "$timing_int" -lt 100000 ]]; then
            echo "$timing_int"
        else
            echo "1"
        fi
    else
        echo "1"
    fi
}

has_sufficient_timing_data() {
    local base_path="$1"
    local test_pattern="$2"

    local all_files=($(find "$base_path" -name "$test_pattern" | sort))
    local total_files=${#all_files[@]}
    local files_with_timing=0

    for file in "${all_files[@]}"; do
        local timing=$(get_test_timing "$file")
        if [[ "$timing" != "0" && "$timing" != "" ]]; then
            files_with_timing=$((files_with_timing + 1))
        fi
    done

    local threshold=$((total_files * 70 / 100))
    [[ $files_with_timing -ge $threshold ]]
}

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

    if has_sufficient_timing_data "$base_path" "$test_pattern"; then
        echo "Using timing-based distribution for $total_files files" >&2

        local file_weights=()
        for file in "${all_files[@]}"; do
            local weight=$(get_file_weight "$file")
            file_weights+=("$weight")
        done

        local container_loads=()
        local container_files=()
        for ((i=0; i<total_containers; i++)); do
            container_loads[i]=0
            container_files[i]=""
        done

        local sorted_indices=()
        for ((i=0; i<total_files; i++)); do
            sorted_indices[i]=$i
        done

        for ((i=0; i<total_files-1; i++)); do
            for ((j=0; j<total_files-i-1; j++)); do
                local idx1=${sorted_indices[j]}
                local idx2=${sorted_indices[j+1]}
                if [[ ${file_weights[idx1]} -lt ${file_weights[idx2]} ]]; then
                    local temp=${sorted_indices[j]}
                    sorted_indices[j]=${sorted_indices[j+1]}
                    sorted_indices[j+1]=$temp
                fi
            done
        done

        for ((i=0; i<total_files; i++)); do
            local file_idx=${sorted_indices[i]}
            local weight=${file_weights[file_idx]}

            local min_container=0
            local min_load=${container_loads[0]}
            for ((c=1; c<total_containers; c++)); do
                if [[ ${container_loads[c]} -lt $min_load ]]; then
                    min_container=$c
                    min_load=${container_loads[c]}
                fi
            done

            container_loads[min_container]=$((${container_loads[min_container]} + weight))
            local relative_path="${all_files[file_idx]#projects/storefrontapp-e2e-cypress/}"
            if [[ -n "${container_files[min_container]}" ]]; then
                container_files[min_container]="${container_files[min_container]},$relative_path"
            else
                container_files[min_container]="$relative_path"
            fi
        done

        echo "Distribution summary:" >&2
        for ((i=0; i<total_containers; i++)); do
            echo "  Container $((i+1)): ${container_loads[i]} weight units" >&2
        done
    else
        echo "Using equal distribution for $total_files files" >&2

        local container_files=()
        for ((i=0; i<total_containers; i++)); do
            container_files[i]=""
        done

        for ((i=0; i<total_files; i++)); do
            local container_idx=$((i % total_containers))
            local relative_path="${all_files[i]#projects/storefrontapp-e2e-cypress/}"
            if [[ -n "${container_files[container_idx]}" ]]; then
                container_files[container_idx]="${container_files[container_idx]},$relative_path"
            else
                container_files[container_idx]="$relative_path"
            fi
        done
    fi

    echo "${container_files[$((container - 1))]}"
}
