#!/bin/bash
set -e

DEV_SERVER='10\.27\.165\.187'

echo "Validating tsconfig.json integrity"
LOCAL_ENV_LIB_PATH="projects/storefrontlib/src/public_api"
LOCAL_ENV_LIB_PATH_OCCURENCES=$(grep -c "projects/storefrontlib/src/public_api" tsconfig.json || true)
if [ $LOCAL_ENV_LIB_PATH_OCCURENCES \> 0 ];
then
    echo "ERROR: tsconfig.json file is invalid. Found [${LOCAL_ENV_LIB_PATH}].";
    echo "The local env configuration should not be pushed to git."
    exit 1
else
    echo "tsconfig.json file is valid.";
fi;

echo "Validating yarn.lock integrity"
DEFAULT_REGISTRY_URL="https://registry.yarnpkg.com"
DEFAULT_REGISTRY_OCCURENCES=$(grep -c "${DEFAULT_REGISTRY_URL}" yarn.lock || true)
if [ $DEFAULT_REGISTRY_OCCURENCES \> 0 ];
then
    echo "ERROR: yarn file is corrupt. Found [${DEFAULT_REGISTRY_URL}] ${DEFAULT_REGISTRY_OCCURENCES} time(s).";
    echo "The dependency urls should all point to the hybris Artifactory.";
    exit 1
else
    echo "yarn.lock file is valid.";
fi;

echo "Validating that no 'fdescribe' occurrences are present in tests..."
results=$(grep -rl --include "*.spec.ts" fdescribe projects || true)
if [[ -z "$results" ]]; then
    echo "Success: No 'fdescribe' occurrences detected in tests."
else
    echo "ERROR: Detected 'fdescribe' occurrence(s) in these files:"
    echo "$results"
    exit 1
fi

echo "Starting pipeline for Spartacus project"
echo "-----"
echo "Updating dependencies"
yarn
echo "-----"
echo "Validating code linting"
ng lint
echo "-----"
echo "Building SPA core lib"
ng build storefrontlib
echo "-----"
echo "Running unit tests and checking code coverage for core lib"
ng test storefrontlib --watch=false --code-coverage --browsers=ChromeHeadless
echo "-----"
echo "Building SPA app"
ng build storefrontapp
echo "-----"
echo "Running unit tests and checking code coverage for storefront app"
ng test storefrontapp --watch=false --browsers=ChromeHeadless
echo "-----"
echo "Setting endpoint with the server to run end to end tests against"
sed -i -e "s=https://localhost=https://$DEV_SERVER=g" projects/storefrontapp/src/app/config.service.ts
echo "-----"
echo "Running end to end tests"
ng e2e --protractor-config=projects/storefrontapp-e2e/protractor.headless.conf.js
echo "-----"
echo "Spartacus Pipeline completed"
