#!/usr/bin/env bash
# Runs unit tests for a given library (with our without Schematics)
set -e
set -o pipefail

echo "-----"

echo "Running unit tests and code coverage for order lib"

ng test order --source-map --no-watch --code-coverage --browsers ChromeHeadless
npm --prefix feature-libs/order run test:schematics -- --coverage

echo "Running unit tests and code coverage for user lib"

ng test user --source-map --no-watch --code-coverage --browsers ChromeHeadless
npm --prefix feature-libs/user run test:schematics -- --coverage

echo "Running unit tests and code coverage for product library"

ng test product --source-map --no-watch --code-coverage --browsers ChromeHeadless
npm --prefix feature-libs/product run test:schematics -- --coverage

echo "Running unit tests and code coverage for organization library"

ng test organization --source-map --no-watch --code-coverage --browsers ChromeHeadless
npm --prefix feature-libs/organization run test:schematics -- --coverage

echo "Running unit tests and code coverage for smartedit library"

ng test smartedit --source-map --no-watch --code-coverage --browsers ChromeHeadless
npm --prefix feature-libs/smartedit run test:schematics -- --coverage

echo "Running unit tests and code coverage for setup lib"

npm --prefix core-libs/setup run test --runInBand -- --coverage

echo "Running unit tests for storefrontstyles lib"

npm --prefix projects/storefrontstyles run test --runInBand
