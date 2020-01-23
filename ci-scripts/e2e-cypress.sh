#!/usr/bin/env bash
set -e
set -o pipefail

SUITE=$1

yarn
(cd projects/storefrontapp-e2e-cypress && yarn)

echo '-----'
echo 'Building Spartacus libraries'
yarn build:core:lib && yarn build 2>&1 | tee build.log
results=$(grep "Warning: Can't resolve all parameters for" build.log || true)
if [[ -z "$results" ]]; then
    echo "Success: prod build is fine."
    rm build.log
else
    echo "ERROR: check the import statements. 'Warning: Can't resolve all parameters for' found in the build log."
    rm build.log
    exit 1
fi

echo '-----'
echo "Running Cypress end to end tests $SUITE"
if [[ $SUITE == 'regression' ]]; then
    yarn e2e:cy:start-run-all-ci
else
    yarn e2e:cy:start-run-ci
fi
