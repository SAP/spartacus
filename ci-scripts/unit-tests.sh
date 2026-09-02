#!/usr/bin/env bash
set -e
set -o pipefail

EXCLUDE_APPLICATIONS=storefrontapp,ssr-tests
JEST_PROJECTS=storefrontstyles,schematics,setup

# TEST_RUNNER selects which test runner this job is responsible for:
#   karma  -> Jasmine/Karma (+ Jest schematics)
#   vitest -> Vitest-migrated libraries
#   ""     -> run everything (local / legacy single-job behaviour)
TEST_RUNNER="${TEST_RUNNER:-}"

echo "-----"

# Print, one per line, the projects a group is about to run so the CI log makes
# the split obvious at a glance. $1 = runner label, $2 = comma-separated projects.
function log_selected_projects {
    local runner="$1"
    local projects="$2"
    local count
    count=$(echo "$projects" | tr ',' '\n' | grep -c .)
    echo "=================================================="
    echo "[$runner] Group will run $count project(s):"
    echo "$projects" | tr ',' '\n' | sed 's/^/  - /'
    echo "=================================================="
}

function run_karma_group_tests {
    if [[ -n "$UNIT_TEST_GROUP_PROJECTS" ]]; then
        echo "🔀 Running only selected projects: $UNIT_TEST_GROUP_PROJECTS"
        log_selected_projects "KARMA/JEST" "$UNIT_TEST_GROUP_PROJECTS"

        echo "Running JASMINE unit tests for selected projects"
        npx nx run-many --target=test --projects="$UNIT_TEST_GROUP_PROJECTS" --exclude="$EXCLUDE_APPLICATIONS,$JEST_PROJECTS" -- --no-watch --source-map --code-coverage --browsers ChromeHeadless

        echo "Running JEST unit tests for selected projects"
        npx nx run-many --target=test-jest --projects="$UNIT_TEST_GROUP_PROJECTS" --exclude="$EXCLUDE_APPLICATIONS" -- --coverage --runInBand
    else
        echo "Running ALL JASMINE unit tests"
        npx nx run-many --all --target=test --exclude="$EXCLUDE_APPLICATIONS,$JEST_PROJECTS" -- --no-watch --source-map --code-coverage --browsers ChromeHeadless

        echo "Running ALL JEST unit tests"
        npx nx run-many --all --target=test-jest --exclude="$EXCLUDE_APPLICATIONS" -- --coverage --runInBand
    fi
    return 0
}

function run_vitest_group_tests {
    if [[ -n "$UNIT_TEST_GROUP_PROJECTS" ]]; then
        echo "Running VITEST unit tests for selected projects: $UNIT_TEST_GROUP_PROJECTS"
        log_selected_projects "VITEST" "$UNIT_TEST_GROUP_PROJECTS"
        npx nx run-many --target=test-vitest --projects="$UNIT_TEST_GROUP_PROJECTS"
    else
        echo "Running ALL VITEST unit tests for migrated libraries"
        npx nx run-many --all --target=test-vitest
    fi
    return 0
}

function run_vitest_affected_tests {
    echo "Running VITEST unit tests for affected migrated libraries"
    npx nx affected --target=test-vitest
    return 0
}

function run_affected_unit_tests {
    echo "Running JASMINE unit tests and code coverage for AFFECTED libraries"
    npx nx affected --target=test --exclude="$EXCLUDE_APPLICATIONS,$JEST_PROJECTS" -- --no-watch --source-map --code-coverage --browsers ChromeHeadless

    echo "Running JEST (mostly schematics) unit tests and code coverage for AFFECTED libraries"
    npx nx affected --target=test-jest --exclude="$EXCLUDE_APPLICATIONS" -- --coverage --runInBand

    run_vitest_affected_tests
}

# Dispatch by the runner this job owns. Empty TEST_RUNNER runs everything so the
# script still works when invoked outside the split matrices.
function run_all_unit_tests {
    case "$TEST_RUNNER" in
        karma)
            run_karma_group_tests
            ;;
        vitest)
            run_vitest_group_tests
            ;;
        *)
            run_karma_group_tests
            run_vitest_group_tests
            ;;
    esac
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
