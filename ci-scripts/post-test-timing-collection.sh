#!/usr/bin/env bash

source "$(dirname "$0")/timing-collector.sh"

collect_and_update_timings() {
    local results_dir="${1:-results}"

    echo "Collecting timing data from test results in $results_dir"

    if [[ ! -d "$results_dir" ]]; then
        echo "Results directory $results_dir not found, skipping timing collection"
        return 0
    fi

    local timing_pairs=$(extract_cypress_timings "$results_dir")

    if [[ -n "$timing_pairs" ]]; then
        echo "Found timing data for tests:"
        echo "$timing_pairs" | while IFS=':' read test_file duration; do
            echo "  $test_file: ${duration}s"
        done

        update_timing_database "$timing_pairs"

        echo "Timing database updated successfully"
    else
        echo "No timing data found in results"
    fi
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    collect_and_update_timings "$@"
fi
