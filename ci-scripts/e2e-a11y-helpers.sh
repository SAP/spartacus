#!/usr/bin/env bash

#
# Spartacus E2E Accessibility Test Distribution Helper
#
# This script implements parallel a11y test execution by distributing test files
# across multiple CI containers using the test-distribution.sh strategy.
#
# Usage:
# - Set GITHUB_MATRIX_CONTAINER and GITHUB_MATRIX_TOTAL for parallel execution
#

source "$(dirname "$0")/test-distribution.sh"

# Display accessibility documentation link when tests fail
display_a11y_docs_link() {
    echo ""
    echo -e "\033[31m⚠️  Accessibility tests failed\033[0m"
    echo -e "\033[33mℹ️  For guidance on resolving issues, see:\033[0m"
    echo -e "\033[36m🔗 https://wiki.one.int.sap/wiki/display/spar/Spartacus+Accessibility+Feature+Compliance\033[0m"
    echo ""
}

# Wrapper function that runs a11y tests and displays helpful docs on failure
run_a11y_tests_with_docs_on_failure() {
    local test_command="$1"

    if npm run "$test_command"; then
        return 0
    else
        display_a11y_docs_link
        return 1
    fi
}

should_use_recording() {
    [[ "${ENABLE_A11Y_RECORDING:-false}" == "true" ]]
}

# Clean shutdown of PWA application
stop_pwa_app() {
    pkill -f "http-server" || true
    sleep 5
}

# Build and start PWA application with specified environment configuration
build_and_start_pwa() {
    export SPA_ENV="$1"
    npm run build:csr  
    npm run start:pwa &
    sleep 10
}

# Get the distributed test file pattern for a specific container
get_a11y_spec_pattern() {
    local test_type="$1"
    local container="$2"
    local total_containers="${3:-2}"

    case "$test_type" in
        "b2c")
            distribute_tests "$A11Y_TEST_PATTERN" "$container" "$total_containers" "$A11Y_B2C_PATH"
            ;;
        "b2b")
            distribute_tests "$A11Y_TEST_PATTERN" "$container" "$total_containers" "$A11Y_B2B_PATH"
            ;;
        *)
            echo ""
            ;;
    esac
}

# Execute accessibility tests for a specific container in the test matrix
run_a11y_container_tests() {
    local container="$1"
    local total_containers="${2:-2}"

    if should_use_recording; then
        echo "Running A11Y tests with Cypress Dashboard recording"
        
        if ! run_a11y_tests_with_docs_on_failure "e2e:run:ci:a11y:record"; then
            return 1
        fi

        stop_pwa_app
        build_and_start_pwa "ci,b2b"
        
        if ! run_a11y_tests_with_docs_on_failure "e2e:run:ci:a11y:b2b:record"; then
            return 1
        fi
    else
        echo "Running A11Y tests: Container $container/$total_containers"

        # Check if this container has any tests assigned
        local b2c_spec=$(get_a11y_spec_pattern "b2c" "$container" "$total_containers")
        local b2b_spec=$(get_a11y_spec_pattern "b2b" "$container" "$total_containers")

        if [[ -z "$b2c_spec" && -z "$b2b_spec" ]]; then
            echo "No tests assigned to container $container - skipping execution"
            return 0
        fi

        # Run B2C accessibility tests if assigned to this container
        if [[ -n "$b2c_spec" ]]; then
            export CYPRESS_SPEC_OVERRIDE="$b2c_spec"
            
            if ! run_a11y_tests_with_docs_on_failure "e2e:run:ci:a11y"; then
                return 1
            fi
        fi

        # Run B2B accessibility tests if assigned to this container
        if [[ -n "$b2b_spec" ]]; then
            stop_pwa_app
            build_and_start_pwa "ci,b2b"
            export CYPRESS_SPEC_OVERRIDE="$b2b_spec"

            if ! run_a11y_tests_with_docs_on_failure "e2e:run:ci:a11y:b2b"; then
                return 1
            fi
        fi
    fi

    return 0
}

# Main entry point for accessibility test execution
run_dual_a11y_tests() {
    local container="${GITHUB_MATRIX_CONTAINER}"
    local total_containers="${GITHUB_MATRIX_TOTAL:-2}"

    if [[ -z "$container" ]]; then
        echo "Error: GITHUB_MATRIX_CONTAINER must be set for parallel execution"
        return 1
    fi

    run_a11y_container_tests "$container" "$total_containers"
}
