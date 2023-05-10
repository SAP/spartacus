#!/usr/bin/env bash
set -e
set -o pipefail

source ./ci-scripts/e2e-cypress-common.sh

POSITIONAL=()

readonly help_display="Usage: $0 [ command_options ] [ param ]

    command options:
        --suite, -s                             e2e suite to run (b2c, b2b, cds, flaky). Default: b2c
        --branch, -b                            The pr source branch.
        --help, -h                              show help
"

while [ "${1:0:1}" == "-" ]
do
    case "$1" in
        '--suite' | '-s' )
            SUITE=":$2"
            shift
            shift
            ;;
        '--branch' | '-b' )
            BRANCH="$2"
            shift
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

buildLibsAndStorefront

echo '-----'
echo "Start the Spartacus storefront"
npm run start:pwa &


SUITE_TYPE=":core"

if [[ "${BRANCH}" == epic/* ]]; then
  SUITE_TYPE=""
fi

echo '-----'
echo "Running Cypress end to end tests for branch [${BRANCH}]"
echo "Suite Type: [${SUITE_TYPE}] (":core" or empty which runs all tests)"
echo "Suite: [${SUITE}] (empty defaults to b2c) " 
npm run e2e:run:ci${SUITE_TYPE}${SUITE}
