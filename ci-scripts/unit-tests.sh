#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"

echo "Running unit tests and code coverage for cds"

ng test cds --no-watch --source-map --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for CDS library"

yarn --cwd integration-libs/cds run test:schematics --coverage

echo "Running unit tests and code coverage for product-configurator library"

ng test product-configurator --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for product-configurator library"

yarn --cwd feature-libs/product-configurator run test:schematics --coverage

echo "Running unit tests and code coverage for CDC"

ng test cdc --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for cdc library"

yarn --cwd integration-libs/cdc run test:schematics --coverage

echo "Running unit tests and code coverage for Digital-Payments"

ng test digital-payments --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for Digital-Payments library"

yarn --cwd integration-libs/digital-payments run test:schematics --coverage

echo "Running unit tests and code coverage for EPD Visualization"

ng test epd-visualization --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for EPD Visualization library"

yarn --cwd integration-libs/epd-visualization run test:schematics --coverage

echo "Running unit tests and code coverage for storefinder library"

ng test storefinder --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for storefinder library"

yarn --cwd feature-libs/storefinder run test:schematics --coverage

echo "Running unit tests and code coverage for qualtrics library"

ng test qualtrics --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for qualtrics library"

yarn --cwd feature-libs/qualtrics run test:schematics --coverage

echo "Running unit tests and code coverage for asm library"

ng test asm --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for asm library"

yarn --cwd feature-libs/asm run test:schematics --coverage

echo "Running unit tests and code coverage for tracking"

ng test tracking --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for tracking library"

yarn --cwd feature-libs/tracking run test:schematics --coverage

echo "Running unit tests and code coverage for schematics library"

yarn --cwd projects/schematics run test --runInBand --coverage
