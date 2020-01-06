#!/usr/bin/env bash
set -e
set -o pipefail

SUITE=$1

yarn
(cd projects/storefrontapp-e2e-cypress && yarn)

echo '-----'
echo 'Building Spartacus libraries'
yarn build:core:lib:cds && yarn build:cds 2>&1 | tee build.log
results=$(grep "Warning: Can't resolve all parameters for" build.log || true)
if [[ -z "$results" ]]; then
    echo "Success: Spartacus production build was successful."
    rm build.log
else
    echo "ERROR: Spartacus production build failed. Check the import statements. 'Warning: Can't resolve all parameters for ...' found in the build log."
    rm build.log
    exit 1
fi

echo '-----'
echo "Running Cypress end to end tests $SUITE"
if [[ $SUITE == 'regression' ]]; then
    # TODO: will fix once cds is out the door (conclusion we had on Friday is to make everything in one)
    yarn e2e:cy:cds:start-run-ci
else
    # TODO: will fix once cds is out the door (conclusion we had on Friday is to make everything in one)
    # Upcoming task to separate them before schematics
    # This is just a hotfix for everything being together
    yarn e2e:cy:cds:start-run-smoke-ci
fi
