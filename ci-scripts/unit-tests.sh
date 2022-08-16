#!/usr/bin/env bash
set -o pipefail

# -azure argument used by azure hyperspace pipeline
if [[ $1 == '-release' ]]; then
    target=""   
else
    set -e
    exec 5>&1
    target=" | tee /dev/fd/5"
fi

echo "-----"

echo "Running unit tests and code coverage for cds"

output=$(eval "ng test cds --watch=false --sourceMap --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for CDS library"

output=$(eval "yarn --cwd integration-libs/cds run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for product-configurator library"

output=$(eval "ng test product-configurator --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for product-configurator library"

output=$(eval "yarn --cwd feature-libs/product-configurator run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for CDC"

output=$(eval "ng test cdc --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for cdc library"

output=$(eval "yarn --cwd integration-libs/cdc run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for Digital-Payments"

output=$(eval "ng test digital-payments --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for Digital-Payments library"

output=$(eval "yarn --cwd integration-libs/digital-payments run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for EPD Visualization"

output=$(eval "ng test epd-visualization --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for EPD Visualization library"

output=$(eval "yarn --cwd integration-libs/epd-visualization run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for storefinder library"

output=$(eval "ng test storefinder --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for storefinder library"

output=$(eval "yarn --cwd feature-libs/storefinder run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for qualtrics library"

output=$(eval "ng test qualtrics --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for qualtrics library"

output=$(eval "yarn --cwd feature-libs/qualtrics run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for asm library"

output=$(eval "ng test asm --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for asm library"

output=$(eval "yarn --cwd feature-libs/asm run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for tracking"

output=$(eval "ng test tracking --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for tracking library"

output=$(eval "yarn --cwd feature-libs/tracking run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for schematics library"

output=$(eval "yarn --cwd projects/schematics run test --runInBand --coverage=true"$target)
