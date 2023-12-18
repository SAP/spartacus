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

if [ "$SUITE" == ":ccv2" ]; then
    export SPA_ENV='ccv2,b2c'
fi

if [ "$SUITE" == ":ccv2-b2b" ]; then
    export SPA_ENV='ccv2,b2b'
fi

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
    echo "ERROR: Spartacus production build failed. Check the import statements. 'Warning: Can't resolve all parameters for ...' found in the build log."
    rm build.log
    exit 1
fi
echo '-----'
echo "Building Spartacus storefrontapp"
npm run build

if [[ "${SSR}" = true ]]; then
    echo "Building Spartacus storefrontapp (SSR PROD mode)"
    npm run build:ssr:ci

    echo "Starting Spartacus storefrontapp in SSR mode"
    (npm run serve:ssr:ci &)

    echo '-----'
    echo "Running SSR Cypress smoke test"

    npm run e2e:run:ci:ssr
else
    npm run start:pwa &

    echo '-----'
    echo "Running Cypress end to end tests"

    if [ "${GITHUB_EVENT_NAME}" == "pull_request" ]; then
      if [[ "${GITHUB_HEAD_REF}" == epic/* ]]; then
        npm run e2e:run:ci"${SUITE}"
      else 
        npm run e2e:run:ci:core"${SUITE}"
      fi
    else
        npm run e2e:run:ci"${SUITE}"
    fi
fi
