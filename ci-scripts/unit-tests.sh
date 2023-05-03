#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"


echo "Running unit tests and code coverage for qualtrics library"

ng test qualtrics --source-map --no-watch --code-coverage --browsers ChromeHeadless

echo "Running schematics unit tests and code coverage for qualtrics library"

npm --prefix feature-libs/qualtrics run test:schematics -- --coverage

