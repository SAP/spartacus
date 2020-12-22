#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"

echo "Running unit tests and code coverage for cds"
exec 5>&1
output=$(yarn test cds --watch=false --sourceMap --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for Spartacus core"
exec 5>&1
output=$(yarn test core --watch=false --sourceMap --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for storefront library"
exec 5>&1
output=$(yarn test storefrontlib --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for CDC"
exec 5>&1
output=$(yarn test cdc --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for organization library"
exec 5>&1
output=$(yarn test organization --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for organization library"
exec 5>&1
output=$(yarn --cwd feature-libs/organization run test:schematics --coverage=true | tee /dev/fd/5)

echo "Running unit tests and code coverage for storefinder library"
exec 5>&1
output=$(ng test storefinder --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for storefinder library"
exec 5>&1
output=$(yarn --cwd feature-libs/storefinder run test:schematics --coverage=true | tee /dev/fd/5)

echo "Running unit tests and code coverage for setup"
exec 5>&1
output=$(yarn test setup --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for schematics library"
exec 5>&1
output=$(yarn --cwd projects/schematics run test --coverage=true | tee /dev/fd/5)

echo "Unit tests ran successfully!"
