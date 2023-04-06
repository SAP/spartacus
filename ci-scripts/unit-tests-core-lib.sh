#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"

echo "Running unit tests and code coverage for core lib"

ng test core --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running unit tests and code coverage for storefront lib"

ng test storefrontlib --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running unit tests and code coverage for cart lib"

ng test cart --source-map --no-watch --code-coverage --browsers ChromeHeadless
npm --prefix feature-libs/cart run test:schematics -- --coverage

echo "Running unit tests and code coverage for checkout lib"

ng test checkout --source-map --no-watch --code-coverage --browsers ChromeHeadless
npm --prefix feature-libs/checkout run test:schematics -- --coverage
