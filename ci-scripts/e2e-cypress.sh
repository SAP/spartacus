#!/usr/bin/env bash
set -e
set -o pipefail

SUITE=$1

yarn
(cd projects/storefrontapp-e2e-cypress && yarn)

echo '-----'
echo 'Building Spartacus libraries'
yarn build:core:lib

echo '-----'
echo "Running Cypress end to end tests $SUITE"
if [ $SUITE == 'regression' ]; then
    yarn e2e:cy:start-run-all-ci
else
    yarn e2e:cy:start-run-ci
fi
