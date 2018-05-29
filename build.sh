#!/bin/bash
set -e


echo "Validating yarn.lock integrity"
DEFAULT_REGISTRY_URL="https://registry.yarnpkg.com"
DEFAULT_REGISTRY_OCCURENCES=$(grep -c "${DEFAULT_REGISTRY_URL}" yarn.lock)
if [ $DEFAULT_REGISTRY_OCCURENCES \> 0 ];
then 
    echo "ERROR: yarn file is corrupt. Found [${DEFAULT_REGISTRY_URL}] ${DEFAULT_REGISTRY_OCCURENCES} time(s).";
    echo "The dependency urls should all point to the hybris Artifactory.";
    exit 1
else
    echo "yarn file is valid.";
fi;

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
ng test storefrontapp --watch=false --code-coverage --browsers=ChromeHeadless
echo "-----"
echo "Spartacus Pipeline completed"
