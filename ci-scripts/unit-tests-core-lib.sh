#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"

echo "Running unit tests and code coverage for core"

ng test core --no-watch --source-map --code-coverage --browsers ChromeHeadless


echo "Running unit tests and code coverage for storefrontlib"

ng test storefrontlib --source-map --no-watch --code-coverage --browsers ChromeHeadless


echo "Running unit tests and code coverage for cart library"

ng test cart --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for cart library"

yarn --cwd feature-libs/cart run test:schematics --coverage

echo "Running unit tests and code coverage for order library"

ng test order --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for order library"

yarn --cwd feature-libs/order run test:schematics --coverage

echo "Running unit tests and code coverage for setup"

ng test setup --source-map --no-watch --code-coverage --browsers ChromeHeadless


echo "Running unit tests and code coverage for user"

ng test user --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for user library"

yarn --cwd feature-libs/user run test:schematics --coverage

echo "Running unit tests and code coverage for checkout"

ng test checkout --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for checkout library"

yarn --cwd feature-libs/checkout run test:schematics --coverage

echo "Running unit tests and code coverage for product library"

ng test product --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for product library"

yarn --cwd feature-libs/product run test:schematics --coverage

echo "Running unit tests and code coverage for organization library"

ng test organization --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for organization library"

yarn --cwd feature-libs/organization run test:schematics --coverage

echo "Running unit tests and code coverage for smartedit library"

ng test smartedit --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for smartedit library"

yarn --cwd feature-libs/smartedit run test:schematics --coverage

echo "Running unit tests for storefrontstyle"

yarn --cwd projects/storefrontstyles run test --runInBand
