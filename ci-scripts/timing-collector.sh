#!/usr/bin/env bash

TIMING_DB_PATH=".github/cache/test-timings.json"

create_timing_database() {
    mkdir -p "$(dirname "$TIMING_DB_PATH")"
    if [[ ! -f "$TIMING_DB_PATH" ]]; then
        echo '{}' > "$TIMING_DB_PATH"
    fi
}

extract_cypress_timings() {
    local junit_results_dir="$1"

    if [[ -d "$junit_results_dir" ]]; then
        for file in "$junit_results_dir"/*.xml; do
            if [[ -f "$file" ]]; then
                grep -o 'name="[^"]*\.a11y-e2e\.cy\.ts".*time="[0-9.]*"' "$file" | while read line; do
                    local test_file=$(echo "$line" | grep -o 'name="[^"]*\.a11y-e2e\.cy\.ts"' | cut -d'"' -f2)
                    local duration=$(echo "$line" | grep -o 'time="[0-9.]*"' | cut -d'"' -f2)
                    if [[ -n "$duration" && "$duration" != "0" && -n "$test_file" ]]; then
                        echo "$test_file:$duration"
                    fi
                done
            fi
        done
    fi
}

update_timing_database() {
    local timing_pairs="$1"
    create_timing_database

    if [[ -n "$timing_pairs" ]]; then
        echo "$timing_pairs" | while IFS=':' read test_file duration; do
            if [[ -n "$test_file" && -n "$duration" ]]; then
                echo "${test_file}=${duration}" >> "${TIMING_DB_PATH}.tmp"
            fi
        done

        if [[ -f "${TIMING_DB_PATH}.tmp" ]]; then
            sort -u "${TIMING_DB_PATH}.tmp" > "$TIMING_DB_PATH"
            rm -f "${TIMING_DB_PATH}.tmp"
            echo "Updated timing database"
        fi
    fi
}

get_test_timing() {
    local test_file="$1"
    local relative_path="${test_file#cypress/e2e/}"

    create_timing_database

    if [[ -f "$TIMING_DB_PATH" ]]; then
        local timing=$(grep "^${relative_path}=" "$TIMING_DB_PATH" 2>/dev/null | cut -d'=' -f2 | head -1)
        if [[ -n "$timing" ]]; then
            echo "$timing"
        else
            echo "0"
        fi
    else
        echo "0"
    fi
}

cleanup_timing_database() {
    if [[ -f "$TIMING_DB_PATH" ]]; then
        tail -n 100 "$TIMING_DB_PATH" > "${TIMING_DB_PATH}.tmp"
        mv "${TIMING_DB_PATH}.tmp" "$TIMING_DB_PATH"
    fi
}
