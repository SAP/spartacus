#!/usr/bin/env bash

# E2E Accessibility test helpers

display_a11y_docs_link() {
    echo ""
    echo -e "\033[31m⚠️  Accessibility tests failed\033[0m"
    echo -e "\033[33mℹ️  For guidance on resolving issues, see:\033[0m"
    echo -e "\033[36m🔗 https://wiki.one.int.sap/wiki/display/spar/Spartacus+Accessibility+Feature+Compliance\033[0m"
    echo ""
}

run_a11y_tests_with_docs_on_failure() {
    local test_command="$1"

    if npm run "$test_command"; then
        return 0
    else
        display_a11y_docs_link
        return 1
    fi
}

stop_pwa_app() {
    pkill -f "http-server" || true
    sleep 5
}

build_and_start_pwa() {
    export SPA_ENV="$1"
    npm run build:csr
    npm run start:pwa &
    sleep 10
}

get_dynamic_spec_pattern() {
    local test_type="$1"
    local container="$2"
    local total_containers="${3:-2}"

    local base_path="projects/storefrontapp-e2e-cypress/cypress/e2e/a11y/$test_type"
    local all_files=($(find "$base_path" -name "*.a11y-e2e.cy.ts" | sort))
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

run_a11y_container_tests() {
    local container="$1"
    local total_containers="${2:-2}"

    echo "Running A11Y tests: Container $container/$total_containers"

    # Check if this container has any tests assigned
    local b2c_spec=$(get_dynamic_spec_pattern "b2c" "$container" "$total_containers")
    local b2b_spec=$(get_dynamic_spec_pattern "b2b" "$container" "$total_containers")

    if [[ -z "$b2c_spec" && -z "$b2b_spec" ]]; then
        echo "No tests assigned to container $container - skipping execution"
        return 0
    fi

    if [[ -n "$b2c_spec" ]]; then
        export CYPRESS_SPEC_OVERRIDE="$b2c_spec"

        if ! run_a11y_tests_with_docs_on_failure "e2e:run:ci:a11y"; then
            return 1
        fi
    fi

    stop_pwa_app

    if [[ -n "$b2b_spec" ]]; then
        build_and_start_pwa "ci,b2b"
        export CYPRESS_SPEC_OVERRIDE="$b2b_spec"

        if ! run_a11y_tests_with_docs_on_failure "e2e:run:ci:a11y:b2b"; then
            stop_pwa_app
            return 1
        fi
        stop_pwa_app
    fi

    return 0
}

run_dual_a11y_tests() {
    if [[ -n "$GITHUB_MATRIX_CONTAINER" ]]; then
        local total_containers="${GITHUB_MATRIX_TOTAL:-2}"
        run_a11y_container_tests "$GITHUB_MATRIX_CONTAINER" "$total_containers"
        return $?
    fi

    local b2c_result=0
    if ! run_a11y_tests_with_docs_on_failure "e2e:run:ci:a11y"; then
        b2c_result=1
    fi

    stop_pwa_app
    build_and_start_pwa "ci,b2b"

    local b2b_result=0
    if ! run_a11y_tests_with_docs_on_failure "e2e:run:ci:a11y:b2b"; then
        b2b_result=1
    fi

    stop_pwa_app

    if [[ $b2c_result -ne 0 ]] || [[ $b2b_result -ne 0 ]]; then
        echo "A11Y Tests Summary:"
        [[ $b2c_result -ne 0 ]] && echo "   - B2C a11y tests: FAILED"
        [[ $b2c_result -eq 0 ]] && echo "   - B2C a11y tests: PASSED"
        [[ $b2b_result -ne 0 ]] && echo "   - B2B a11y tests: FAILED"
        [[ $b2b_result -eq 0 ]] && echo "   - B2B a11y tests: PASSED"
        return 1
    fi

    return 0
}
