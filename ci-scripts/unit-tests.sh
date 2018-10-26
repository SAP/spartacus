#!/usr/bin/env bash
set -e
set -o pipefail

echo "Updating dependencies"
yarn
echo "-----"

echo "-----"
echo "Running unit tests and code coverage for core lib"
exec 5>&1
output=$(ng test storefrontlib --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
