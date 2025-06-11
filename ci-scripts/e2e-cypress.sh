#!/usr/bin/env bash
set -e
set -o pipefail

POSITIONAL=()

readonly help_display="Usage: $0 [ command_options ] [ param ]

    command options:
        --suite, -s                             e2e suite to run (b2c, b2b, cds, flaky, a11y). Default: b2c
        --environment, --env                    [ 2005 | 2011 | ccv2]. Default: 2005
        --help, -h                              show help
        --ssr                                   Run ssr smoke test
        --skip-build                            Skip Spartacus build step
"

display_a11y_docs_link() {
    echo ""
    echo -e "\033[31m⚠️  Accessibility tests failed\033[0m"
    echo -e "\033[33mℹ️  For guidance on resolving issues, see:\033[0m"
    echo -e "\033[36m🔗 https://wiki.one.int.sap/wiki/display/spar/Spartacus+Accessibility+Feature+Compliance\033[0m"
    echo ""
}

# Function to run a11y tests and print documentation link if they fail
run_a11y_tests_with_docs_on_failure() {
    if npm run e2e:run:ci:a11y; then
        return 0
    else
        display_a11y_docs_link
        return 1
    fi
}

# Function to run a11y B2B tests and print documentation link if they fail
run_a11y_b2b_tests_with_docs_on_failure() {
    if npm run e2e:run:ci:a11y:b2b; then
        return 0
    else
        display_a11y_docs_link
        return 1
    fi
}

# Function to stop the running PWA app
stop_pwa_app() {
    echo "Stopping PWA application..."
    # Kill all node processes running http-server (PWA app)
    pkill -f "http-server" || true
    # Wait a bit for the process to fully stop
    sleep 5
}

# Function to build and start PWA app with specific SPA_ENV
build_and_start_pwa() {
    local spa_env="$1"
    local app_type="$2"

    echo "-----"
    echo "📦 Building Spartacus storefrontapp for ${app_type} (SPA_ENV=${spa_env})"

    # Set the SPA_ENV for this specific build
    export SPA_ENV="${spa_env}"

    # Build the CSR app with the specified environment
    npm run build:csr

    echo "🚀 Starting ${app_type} PWA application..."
    npm run start:pwa &

    # Wait for the app to start
    sleep 10
}

# Function to run both B2C and B2B a11y tests
run_dual_a11y_tests() {
    local test_context="$1"  # e.g., "pull requests", "push event", "full"

    echo "Running dual a11y tests (B2C + B2B) for ${test_context}"

    # First, run B2C a11y tests
    echo "=========================================="
    echo "🔵 Running B2C Accessibility Tests"
    echo "=========================================="

    build_and_start_pwa "ci,b2c" "B2C"

    local b2c_result=0
    if ! run_a11y_tests_with_docs_on_failure; then
        b2c_result=1
    fi

    stop_pwa_app

    # Then, run B2B a11y tests
    echo "=========================================="
    echo "🔶 Running B2B Accessibility Tests"
    echo "=========================================="

    build_and_start_pwa "ci,b2b" "B2B"

    local b2b_result=0
    if ! run_a11y_b2b_tests_with_docs_on_failure; then
        b2b_result=1
    fi

    stop_pwa_app

    # Check if either test suite failed
    if [[ $b2c_result -ne 0 ]] || [[ $b2b_result -ne 0 ]]; then
        echo "=========================================="
        echo "❌ A11Y Tests Summary:"
        [[ $b2c_result -ne 0 ]] && echo "   - B2C a11y tests: FAILED"
        [[ $b2c_result -eq 0 ]] && echo "   - B2C a11y tests: PASSED"
        [[ $b2b_result -ne 0 ]] && echo "   - B2B a11y tests: FAILED"
        [[ $b2b_result -eq 0 ]] && echo "   - B2B a11y tests: PASSED"
        echo "=========================================="
        return 1
    else
        echo "=========================================="
        echo "✅ All A11Y Tests Passed!"
        echo "   - B2C a11y tests: PASSED"
        echo "   - B2B a11y tests: PASSED"
        echo "=========================================="
        return 0
    fi
}

SKIP_BUILD=false

while [ "${1:0:1}" == "-" ]; do
    case "$1" in
    '--skip-build')
        SKIP_BUILD=true
        shift
        ;;
    '--suite' | '-s')
        SUITE=":$2"
        shift
        shift
        ;;
    '--environment' | '--env')
        CI_ENV=":$2"
        shift
        shift
        ;;
    '--ssr')
        SSR=true
        shift
        ;;
    '--help' | '-h')
        echo "$help_display"
        exit 0
        ;;
    *)
        POSITIONAL+=("$1")
        shift

        echo "Error: unknown option: ${POSITIONAL}"
        exit 1
        ;;
    esac
done

set -- "${POSITIONAL[@]}"

if [ "$SUITE" == ":ccv2" ]; then
    export SPA_ENV='ccv2,b2c'
fi

if [ "$SUITE" == ":ccv2-b2b" ]; then
    export SPA_ENV='ccv2,b2b'
fi

if [ "$SKIP_BUILD" == "true" ]; then
    echo "⏩ Skipping build as requested with --skip-build"
else
    echo '-----'
    echo "Building Spartacus libraries"

    export NODE_OPTIONS=--dns-result-order=ipv4first

    npm ci
    (cd projects/storefrontapp-e2e-cypress && npm ci)

    npm run build:libs 2>&1 | tee build.log

    results=$(grep "Warning: Can't resolve all parameters for" build.log || true)
    if [[ -z "${results}" ]]; then
        echo "Success: Spartacus production build was successful."
        rm build.log
    else
        echo "ERROR: Spartacus production build failed."
        echo "Check for 'Warning: Can't resolve all parameters for ...' in the build log."
        rm build.log
        exit 1
    fi

    # For a11y tests, we don't build the app here since we'll build it twice with different SPA_ENV
    if [[ "${SUITE}" != ":a11y" ]]; then
        echo '-----'
        echo "📦 Building Spartacus storefrontapp"
        npm run build:csr
    fi
fi

is_bot_commit() {
    LAST_COMMIT_AUTHOR=$(git log -1 --pretty=format:'%ae')

    echo "Last commit author: ${LAST_COMMIT_AUTHOR}"

    if [[ "${LAST_COMMIT_AUTHOR}" == *"dependabot[bot]@users.noreply.github.com" ]] ||
        [[ "${LAST_COMMIT_AUTHOR}" == *"renovate[bot]@users.noreply.github.com" ]]; then
        return 0
    else
        return 1
    fi
}

if [[ "${SSR}" = true ]]; then
    echo "Building Spartacus storefrontapp (SSR PROD mode)"
    npm run build:ssr:ci

    echo "Starting Spartacus storefrontapp in SSR mode"
    (npm run serve:ssr:ci &)

    echo '-----'
    echo "Running SSR Cypress smoke test"

    if [ "${GITHUB_EVENT_NAME}" == "pull_request" ]; then
        echo "Running Cypress end to end tests for pull request"

        if [[ "${GITHUB_HEAD_REF}" == epic/* ]]; then
            echo "Running Cypress end to end tests for pull request"

            npm run e2e:run:ci:ssr
        else
            echo "Running core Cypress end to end tests for pull requests"

            npm run e2e:run:ci:core:ssr
        fi
    elif [ "${GITHUB_EVENT_NAME}" == "push" ]; then
        echo "Running Cypress end-to-end tests for push event"

        if is_bot_commit; then
            echo "Commit was made by Renovate Bot or Dependabot. Running core Cypress end-to-end tests"
            npm run e2e:run:ci:core:ssr
        else
            echo "Running full Cypress end-to-end tests"
            npm run e2e:run:ci:ssr
        fi
    else
        echo "Running full Cypress end-to-end tests"
        npm run e2e:run:ci:ssr
    fi
else
    # Handle a11y tests specially to run both B2C and B2B
    if [[ "${SUITE}" == ":a11y" ]]; then
        echo '-----'
        echo "Running dual A11Y Cypress end to end tests (B2C + B2B)"

        if [ "${GITHUB_EVENT_NAME}" == "pull_request" ]; then
            if [[ "${GITHUB_HEAD_REF}" == epic/* ]]; then
                echo "Running full dual a11y Cypress end-to-end tests for epic branch"
                run_dual_a11y_tests "epic branch pull request"
            else
                echo "Running dual a11y Cypress end-to-end tests for pull requests"
                run_dual_a11y_tests "pull request"
            fi
        elif [ "${GITHUB_EVENT_NAME}" == "push" ]; then
            echo "Running dual a11y Cypress end-to-end tests for push event"

            if is_bot_commit; then
                echo "Commit was made by Renovate Bot or Dependabot. Running dual a11y Cypress end-to-end tests"
                run_dual_a11y_tests "bot commit push event"
            else
                echo "Running full dual a11y Cypress end-to-end tests"
                run_dual_a11y_tests "push event"
            fi
        else
            echo "Running full dual a11y Cypress end-to-end tests"
            run_dual_a11y_tests "default execution"
        fi
    else
        # Regular non-a11y tests - existing behavior
        npm run start:pwa &

        echo '-----'
        echo "Running Cypress end to end tests"

        if [ "${GITHUB_EVENT_NAME}" == "pull_request" ]; then
            echo "Running Cypress end-to-end tests for pull request"

            if [[ "${GITHUB_HEAD_REF}" == epic/* ]]; then
                echo "Running full Cypress end-to-end tests for epic branch"
                npm run e2e:run:ci"${SUITE}"
            else
                echo "Running core Cypress end-to-end tests for pull requests"
                npm run e2e:run:ci:core"${SUITE}"
            fi

        elif [ "${GITHUB_EVENT_NAME}" == "push" ]; then
            echo "Running Cypress end-to-end tests for push event"

            if is_bot_commit; then
                echo "Commit was made by Renovate Bot or Dependabot. Running core Cypress end-to-end tests"
                npm run e2e:run:ci:core"${SUITE}"
            else
                echo "Running full Cypress end-to-end tests"
                npm run e2e:run:ci"${SUITE}"
            fi
        else
            echo "Running full Cypress end-to-end tests"
            npm run e2e:run:ci"${SUITE}"
        fi
    fi
fi
