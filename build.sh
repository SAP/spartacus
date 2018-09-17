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

echo "Validating that the storefrontlib does not import itself."
results=$(grep -rl --include "*.ts" "from 'storefrontlib'" projects/storefrontlib || true)
if [[ -z "$results" ]]; then
    echo "Success: storefrontlib does not seem to import itself."
else
    echo "ERROR: Detected occurrence(s) where storefronlib imports itself in these files:"
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
echo "Validating code formatting (using prettier)"
./node_modules/.bin/prettier --config ./.prettierrc --list-different "projects/**/*{.ts,.js,.json,.scss}" 2>&1 |  tee prettier.log
results=$(tail -1 prettier.log | grep projects || true)
if [[ -z "$results" ]]; then
    echo "Success: Codebase has been prettified correctly"
    rm prettier.log
else
    echo "ERROR: Codebase not prettified. Aborting pipeline. Please format your code"
    rm prettier.log
    exit 1
fi

validatestyles

echo "-----"
echo "Running unit tests and code coverage for core lib"
exec 5>&1
output=$(ng test storefrontlib --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "-----"
echo "Building SPA core lib"
ng build storefrontlib --prod
echo "-----"
echo "Building SPA app"
ng build storefrontapp --prod
echo "-----"
echo "Running end to end tests"
yarn e2e:ci
echo "-----"
echo "Spartacus Pipeline completed"
