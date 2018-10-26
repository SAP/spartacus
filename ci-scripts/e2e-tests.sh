#!/usr/bin/env bash
set -e
set -o pipefail

function validatestyles {
    echo "-----"
    echo "Validating styles app"
    pushd projects/storefrontstyles
    yarn
    yarn sass
    rm -rf temp-scss
    popd
}

validatestyles

echo "Updating dependencies"
yarn
echo "-----"
echo "Building SPA core lib"
yarn build:core:lib
echo "-----"
echo "Building SPA app"
yarn build
echo "-----"
echo "Running end to end tests"
yarn e2e:ci
echo "-----"
echo "Spartacus Pipeline completed"
