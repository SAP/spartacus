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
echo "Running schematics unit tests and code coverage for CDS library"
exec 5>&1
output=$(yarn --cwd integration-libs/cds run test:schematics --coverage=true | tee /dev/fd/5)

echo "Running unit tests and code coverage for product-configurator library"
exec 5>&1
output=$(ng test product-configurator --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for product-configurator library"
exec 5>&1
output=$(yarn --cwd feature-libs/product-configurator run test:schematics --coverage=true | tee /dev/fd/5)

echo "Running unit tests and code coverage for CDC"
exec 5>&1
output=$(ng test cdc --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for cdc library"
exec 5>&1
output=$(yarn --cwd integration-libs/cdc run test:schematics --coverage=true | tee /dev/fd/5)

echo "Running unit tests and code coverage for Digital-Payments"
exec 5>&1
output=$(ng test digital-payments --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for Digital-Payments library"
exec 5>&1
output=$(yarn --cwd integration-libs/digital-payments run test:schematics --coverage=true | tee /dev/fd/5)

echo "Running unit tests and code coverage for EPD Visualization"
exec 5>&1
output=$(ng test epd-visualization --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for EPD Visualization library"
exec 5>&1
output=$(yarn --cwd integration-libs/epd-visualization run test:schematics --coverage=true | tee /dev/fd/5)

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

echo "Running unit tests and code coverage for qualtrics library"
exec 5>&1
output=$(ng test qualtrics --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for qualtrics library"
exec 5>&1
output=$(yarn --cwd feature-libs/qualtrics run test:schematics --coverage=true | tee /dev/fd/5)

echo "Running unit tests and code coverage for asm library"
exec 5>&1
output=$(ng test asm --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for asm library"
exec 5>&1
output=$(yarn --cwd feature-libs/asm run test:schematics --coverage=true | tee /dev/fd/5)

echo "Running unit tests and code coverage for tracking"
exec 5>&1
output=$(ng test tracking --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for tracking library"
exec 5>&1
output=$(yarn --cwd feature-libs/tracking run test:schematics --coverage=true | tee /dev/fd/5)

echo "Running unit tests and code coverage for schematics library"
exec 5>&1
output=$(yarn --cwd projects/schematics run test --runInBand --coverage=true | tee /dev/fd/5)

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
