#!/usr/bin/env bash

CACHE_KEY="test-timings-v1"
TIMING_DB_PATH=".github/cache/test-timings.json"

restore_timing_cache() {
    echo "Attempting to restore timing data from cache..."

    if [[ -f "$TIMING_DB_PATH" ]]; then
        local file_count=$(wc -l < "$TIMING_DB_PATH" 2>/dev/null || echo "0")
        echo "Found cached timing data with $file_count entries"
        return 0
    else
        echo "No cached timing data found, starting fresh"
        return 1
    fi
}

save_timing_cache() {
    if [[ -f "$TIMING_DB_PATH" ]]; then
        local file_count=$(wc -l < "$TIMING_DB_PATH" 2>/dev/null || echo "0")
        echo "Timing database ready for caching with $file_count entries"
    else
        echo "No timing database to cache"
    fi
}
