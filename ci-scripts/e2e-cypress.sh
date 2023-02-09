#!/usr/bin/env bash
set -e
set -o pipefail

POSITIONAL=()

readonly help_display="Usage: $0 [ command_options ] [ param ]

    command options:
        --suite, -s                             e2e suite to run (b2c, b2b, cds, flaky). Default: b2c
        --environment, --env                    [ 2005 | 2011 | ccv2]. Default: 2005
        --help, -h                              show help
        --ssr                                   Run ssr smoke test
"

while [ "${1:0:1}" == "-" ]
do
    case "$1" in
        '--suite' | '-s' )
            SUITE=":$2"
            shift
            shift
            ;;
        '--environment' | '--env' )
            CI_ENV=":$2"
            shift
            shift
            ;;
        '--ssr' )
            SSR=true
            shift
            ;;
        '--help' | '-h' )
            echo "$help_display"
            exit 0
            ;;
        * )
            POSITIONAL+=("$1")
            shift

            echo "Error: unknown option: ${POSITIONAL}"
            exit 1
            ;;
    esac
done

set -- "${POSITIONAL[@]}"

if [[ "${SSR}" = true ]]; then
    echo "Building Spartacus storefrontapp (SSR PROD mode)"
    echo "Starting Spartacus storefrontapp in SSR mode"
    echo '-----'
    echo "Running SSR Cypress smoke test"

else

    echo '-----'
    echo "Running Cypress end to end tests"
    if [ "${GITHUB_EVENT_NAME}" == "pull_request" ]; then
        echo "running core e2es yarn e2e:run:ci:core${SUITE}"
    else
        echo "running regression e2es e2e:run:ci${SUITE}"
    fi

fi

