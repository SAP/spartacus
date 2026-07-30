#!/usr/bin/env bash
set -e
set -o pipefail

VITEST_MIGRATED_FOLDERS=core
EXCLUDE_APPLICATIONS=storefrontapp,ssr-tests
EXCLUDE_JEST=storefrontstyles,schematics,setup,$VITEST_MIGRATED_FOLDERS

echo "-----"

function run_vitest_migrated_folders {
    echo "Running VITEST unit tests for migrated libraries"
    npx nx run-many --target=test --projects="$VITEST_MIGRATED_FOLDERS"
}

function run_affected_unit_tests {
    echo "Running JASMINE unit tests and code coverage for AFFECTED libraries"
    npx nx affected --target=test --exclude="$EXCLUDE_APPLICATIONS,$EXCLUDE_JEST" -- --no-watch --source-map --code-coverage --browsers ChromeHeadless

    echo "Running JEST (mostly schematics) unit tests and code coverage for AFFECTED libraries"
    npx nx affected --target=test-jest --exclude="$EXCLUDE_APPLICATIONS" -- --coverage --runInBand

    run_vitest_migrated_folders
}

function run_all_unit_tests {
    if [[ -n "$UNIT_TEST_GROUP_PROJECTS" ]]; then
        echo "🔀 Running only selected projects: $UNIT_TEST_GROUP_PROJECTS"

        echo "Running JASMINE unit tests for selected projects"
        npx nx run-many --target=test --projects="$UNIT_TEST_GROUP_PROJECTS" --exclude="$EXCLUDE_APPLICATIONS,$EXCLUDE_JEST" -- --no-watch --source-map --code-coverage --browsers ChromeHeadless

        echo "Running JEST unit tests for selected projects"
        npx nx run-many --target=test-jest --projects="$UNIT_TEST_GROUP_PROJECTS" --exclude="$EXCLUDE_APPLICATIONS" -- --coverage --runInBand
    else
        echo "Running ALL JASMINE unit tests"
        npx nx run-many --all --target=test --exclude="$EXCLUDE_APPLICATIONS,$EXCLUDE_JEST" -- --no-watch --source-map --code-coverage --browsers ChromeHeadless

        echo "Running ALL JEST unit tests"
        npx nx run-many --all --target=test-jest --exclude="$EXCLUDE_APPLICATIONS" -- --coverage --runInBand
    fi

    run_vitest_migrated_folders
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
