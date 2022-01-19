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
        '--traffic' | '-t' )
            SPLIT=true
            shift
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


# if traffic flag, sed change ip address of .env-cmdrc, cypress.ci.json and cypress.ci.b2b, etc. 
# Pending verification with b2b
if [[ "${SPLIT}" = true ]]; then
    echo "Swtiching to different load balancer"
    
    CYPRESS_JSON="projects/storefrontapp-e2e-cypress/cypress.json"
    CYPRESS_CI_JSON="projects/storefrontapp-e2e-cypress/cypress.ci.json"
    CYPRESS_CI_B2B_JSON="projects/storefrontapp-e2e-cypress/cypress.ci.b2b.json"
    sed 's/20.83.184.244/20.83.178.185/' .env-cmdrc > .tmp && mv .tmp .env-cmdrc || true
    sed 's/20.83.184.244/20.83.178.185/' ${CYPRESS_JSON} > tmp0.json && mv tmp0.json ${CYPRESS_JSON} || true
    sed 's/20.83.184.244/20.83.178.185/' ${CYPRESS_CI_JSON}  > tmp1.json && mv tmp1.json ${CYPRESS_CI_JSON} || true
    sed 's/20.83.184.244/20.83.178.185/' ${CYPRESS_CI_B2B_JSON}  > tmp2.json && mv tmp2.json ${CYPRESS_CI_B2B_JSON} || true

    sleep 10
fi

echo '-----'
echo "Building Spartacus libraries"

yarn install

(cd projects/storefrontapp-e2e-cypress && yarn install)

yarn build:libs 2>&1 | tee build.log

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
yarn build

if [[ "${SSR}" = true ]]; then
    echo "Building Spartacus storefrontapp (SSR PROD mode)"
    yarn build:ssr:ci

    echo "Starting Spartacus storefrontapp in SSR mode"
    (yarn serve:ssr:ci &)

    echo '-----'
    echo "Running SSR Cypress smoke test"

    yarn e2e:run:ci:ssr
else
    yarn start:pwa &

    echo '-----'
    echo "Running Cypress end to end tests"

    # if [ "${TRAVIS_PULL_REQUEST}" == "false" ]; then
        yarn e2e:run:ci"${SUITE}"
    #else
    #    yarn e2e:run:ci:core"${SUITE}"
    #fi
fi
