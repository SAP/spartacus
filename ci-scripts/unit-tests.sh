#!/usr/bin/env bash
set -e
set -o pipefail

EXCLUDE_APPLICATIONS=storefrontapp,ssr-tests
EXCLUDE_JASMINE=storefrontstyles,schematics,setup,core
EXCLUDE_JEST=storefrontstyles,schematics,setup

echo "-----"

function run_affected_unit_tests {
    echo "Running VITEST unit tests and code coverage for core"
    npx nx run core:test -- --coverage

    echo "Running JASMINE unit tests and code coverage for AFFECTED libraries"
    npx nx affected --target=test --exclude="$EXCLUDE_APPLICATIONS,$EXCLUDE_JASMINE" -- --no-watch --source-map --code-coverage --browsers ChromeHeadless

    echo "Running JEST (mostly schematics) unit tests and code coverage for AFFECTED libraries"
    npx nx affected --target=test-jest --exclude="$EXCLUDE_APPLICATIONS" -- --coverage --runInBand
}

function run_all_unit_tests {
    if [[ -n "$UNIT_TEST_GROUP_PROJECTS" ]]; then
        echo "🔀 Running only selected projects: $UNIT_TEST_GROUP_PROJECTS"

        echo "Running VITEST unit tests and code coverage for core"
        npx nx run core:test -- --coverage

        echo "Running JASMINE unit tests for selected projects"
        npx nx run-many --target=test --projects="$UNIT_TEST_GROUP_PROJECTS" --exclude="$EXCLUDE_APPLICATIONS,$EXCLUDE_JASMINE" -- --no-watch --source-map --code-coverage --browsers ChromeHeadless

        echo "Running JEST unit tests for selected projects"
        npx nx run-many --target=test-jest --projects="$UNIT_TEST_GROUP_PROJECTS" --exclude="$EXCLUDE_APPLICATIONS" -- --coverage --runInBand
    else
        echo "Running VITEST unit tests and code coverage for core"
        npx nx run core:test -- --coverage

        echo "Running ALL JASMINE unit tests"
        npx nx run-many --all --target=test --exclude="$EXCLUDE_APPLICATIONS,$EXCLUDE_JASMINE" -- --no-watch --source-map --code-coverage --browsers ChromeHeadless

        echo "Running ALL JEST unit tests"
        npx nx run-many --all --target=test-jest --exclude="$EXCLUDE_APPLICATIONS" -- --coverage --runInBand
    fi
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
