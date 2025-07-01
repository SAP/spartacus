#!/usr/bin/env bash

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

run_dual_a11y_tests() {
    echo "Running A11Y tests with cypress-split distribution"

    if [[ -n "$SPLIT" ]]; then
        echo "cypress-split enabled: Container $((SPLIT_INDEX + 1))/$SPLIT"
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
