#!/usr/bin/env bash
set -e
set -o pipefail

EXCLUDE_APPLICATIONS=storefrontapp
EXCLUDE_JEST=storefrontstyles,schematics,setup

echo "-----"

function run_affected_unit_tests {
    echo "Running JASMINE unit tests and code coverage for AFFECTED libraries"
    npx nx affected --target=test --exclude="$EXCLUDE_APPLICATIONS,$EXCLUDE_JEST" -- --no-watch --source-map --code-coverage --browsers ChromeHeadless

    echo "Running JEST (mostly schematics) unit tests and code coverage for AFFECTED libraries"
    npx nx affected --target=test-jest --exclude="$EXCLUDE_APPLICATIONS" -- --coverage --runInBand
}

function run_all_unit_tests {
    echo "Running JASMINE unit tests and code coverage for ALL libraries"
    npx nx run-many --all --target=test --exclude="$EXCLUDE_APPLICATIONS,$EXCLUDE_JEST" -- --no-watch --source-map --code-coverage --browsers ChromeHeadless

    echo "Running JEST (mostly schematics) unit tests and code coverage for ALL libraries"
    npx nx run-many --all --target=test-jest --exclude="$EXCLUDE_APPLICATIONS" -- --coverage --runInBand
}

if [ "${GITHUB_EVENT_NAME}" == "pull_request" ]; then
    if [[ "${GITHUB_HEAD_REF}" == epic/* ]]; then
        run_all_unit_tests
    else 
        run_affected_unit_tests
    fi
else
    run_all_unit_tests
fi
