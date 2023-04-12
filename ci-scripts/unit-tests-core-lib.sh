#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"

echo "Running unit tests and code coverage for core"

nx test core --no-watch --source-map --code-coverage --browsers ChromeHeadless

echo "Running unit tests and code coverage for storefrontlib"

nx test storefrontlib --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running unit tests and code coverage for cart library"

nx test cart --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for cart library"

npm --prefix feature-libs/cart run test:schematics -- --coverage

echo "Running unit tests and code coverage for order library"

nx test order --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for order library"

npm --prefix feature-libs/order run test:schematics -- --coverage

echo "Running unit tests and code coverage for setup library"

npm --prefix core-libs/setup run test --runInBand -- --coverage

echo "Running unit tests and code coverage for user"

nx test user --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for user library"

npm --prefix feature-libs/user run test:schematics -- --coverage

echo "Running unit tests and code coverage for checkout"

nx test checkout --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for checkout library"

npm --prefix feature-libs/checkout run test:schematics -- --coverage

echo "Running unit tests and code coverage for product library"

nx test product --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for product library"

npm --prefix feature-libs/product run test:schematics -- --coverage

echo "Running unit tests and code coverage for organization library"

nx test organization --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for organization library"

npm --prefix feature-libs/organization run test:schematics -- --coverage

echo "Running unit tests and code coverage for smartedit library"

nx test smartedit --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for smartedit library"

npm --prefix feature-libs/smartedit run test:schematics -- --coverage

echo "Running unit tests for storefrontstyle"

npm --prefix projects/storefrontstyles run test --runInBand
