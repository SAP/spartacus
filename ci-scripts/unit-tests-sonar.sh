#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"

echo "Running unit tests and code coverage for cds"
exec 5>&1
output=$(ng test cds --watch=false --sourceMap --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for core"
exec 5>&1
output=$(ng test core --watch=false --sourceMap --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for storefrontlib"
exec 5>&1
output=$(ng test storefrontlib --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for product library"
exec 5>&1
output=$(ng test product --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)

echo "Running unit tests and code coverage for CDC"
exec 5>&1
output=$(ng test cdc --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for organization library"
exec 5>&1
output=$(ng test organization --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for setup"
exec 5>&1
output=$(ng test setup --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests for schematics"
cd projects/schematics
yarn
yarn test
cd ../..
echo "Running unit tests for organization schematics"
cd feature-libs/organization
yarn
yarn test:schematics
cd ../../

if [[ $1 == '-h' ]]; then
    echo "Usage: $0 [sonar (to run sonar scan)]"
    exit 1
    elif [[ $1 == 'sonar' ]]; then

    echo "Running SonarCloud scan"
    sonar-scanner \
    -Dsonar.projectKey=sap_cloud-commerce-spartacus-storefront \
    -Dsonar.organization=sap \
    -Dsonar.host.url=https://sonarcloud.io \
    -Dsonar.login=$SONAR_TOKEN
fi

