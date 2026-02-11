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

run_tests_for_suite() {
  local suite="$1"
  local scope="$2"

  if [ "$suite" == ":a11y" ]; then
    # Source a11y functions when needed
    source "$(dirname "$0")/e2e-a11y-helpers.sh"
    run_dual_a11y_tests
  elif [ "$scope" == "core" ]; then
    npm run e2e:run:ci:core"${suite}"
  else
    npm run e2e:run:ci"${suite}"
  fi
}

run_asm_tests() {
   npm run e2e:run:ci:jdk21:asm
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

if [ "$SUITE" == ":a11y" ]; then
    export SPA_ENV='ci,b2c'
fi

if [ "$SKIP_BUILD" == "true" ]; then
    echo "⏩ Skipping build as requested with --skip-build"
    # Still need to ensure dependencies are installed for Cypress
    (cd projects/storefrontapp-e2e-cypress && npm ci)
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

    echo '-----'
    echo "📦 Building Spartacus storefrontapp"
    npm run build:csr
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
    if [ "$SKIP_BUILD" == "true" ]; then
        echo "⏩ Skipping SSR build as requested with --skip-build, using pre-built SSR app"
    else
        echo "Building Spartacus storefrontapp (SSR PROD mode)"
        npm run build:ssr:ci
    fi

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
    npm run start:pwa &

    echo '-----'
    echo "Running ASM JDK21 Cypress end to end tests"
    run_asm_tests
fi
