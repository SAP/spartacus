#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"

echo "Running unit tests and code coverage for cds"

ng test cds --watch=false --sourceMap --code-coverage --browsers=ChromeHeadless

echo "Running schematics unit tests and code coverage for CDS library"

yarn --cwd integration-libs/cds run test:schematics --coverage=true

echo "Running unit tests and code coverage for product-configurator library"

ng test product-configurator --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless

echo "Running schematics unit tests and code coverage for product-configurator library"

yarn --cwd feature-libs/product-configurator run test:schematics --coverage=true

echo "Running unit tests and code coverage for CDC"

ng test cdc --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless

echo "Running schematics unit tests and code coverage for cdc library"

yarn --cwd integration-libs/cdc run test:schematics --coverage=true

echo "Running unit tests and code coverage for Digital-Payments"

ng test digital-payments --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless

echo "Running schematics unit tests and code coverage for Digital-Payments library"

yarn --cwd integration-libs/digital-payments run test:schematics --coverage=true

echo "Running unit tests and code coverage for EPD Visualization"

ng test epd-visualization --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless

echo "Running schematics unit tests and code coverage for EPD Visualization library"

yarn --cwd integration-libs/epd-visualization run test:schematics --coverage=true

echo "Running unit tests and code coverage for storefinder library"

ng test storefinder --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless

echo "Running schematics unit tests and code coverage for storefinder library"

yarn --cwd feature-libs/storefinder run test:schematics --coverage=true

echo "Running unit tests and code coverage for qualtrics library"

ng test qualtrics --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless

echo "Running schematics unit tests and code coverage for qualtrics library"

yarn --cwd feature-libs/qualtrics run test:schematics --coverage=true

echo "Running unit tests and code coverage for asm library"

ng test asm --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless

echo "Running schematics unit tests and code coverage for asm library"

yarn --cwd feature-libs/asm run test:schematics --coverage=true

echo "Running unit tests and code coverage for tracking"

ng test tracking --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless

echo "Running schematics unit tests and code coverage for tracking library"

yarn --cwd feature-libs/tracking run test:schematics --coverage=true

echo "Running unit tests and code coverage for pickup-in-store library"
exec 5>&1
output=$(ng test pickup-in-store --source-map --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for pickup-in-store library"
exec 5>&1
output=$(yarn --cwd feature-libs/pickup-in-store run test:schematics --coverage=true | tee /dev/fd/5)

echo "Running unit tests and code coverage for schematics library"

yarn --cwd projects/schematics run test --runInBand --coverage=true
