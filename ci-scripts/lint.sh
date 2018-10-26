#!/usr/bin/env bash
set -e
set -o pipefail

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
