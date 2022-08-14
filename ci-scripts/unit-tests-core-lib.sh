#!/usr/bin/env bash
set -o pipefail

# -azure argument used by azure hyperspace pipeline
if [[ $1 == '-azure' ]]; then
    target=""
else
    set -e
    exec 5>&1
    target=" | tee /dev/fd/5"
fi

echo "-----"

echo "Running unit tests and code coverage for core"

output=$(eval "ng test core --watch=false --sourceMap --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for storefrontlib"

output=$(eval "ng test storefrontlib --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for cart library"

output=$(eval "ng test cart --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for cart library"

output=$(eval "yarn --cwd feature-libs/cart run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for order library"

output=$(eval "ng test order --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for order library"

output=$(eval "yarn --cwd feature-libs/order run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for setup"

output=$(eval "ng test setup --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for user"

output=$(eval "ng test user --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for user library"

output=$(eval "yarn --cwd feature-libs/user run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for checkout"

output=$(eval "ng test checkout --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for checkout library"

output=$(eval "yarn --cwd feature-libs/checkout run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for product library"

output=$(eval "ng test product --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for product library"

output=$(eval "yarn --cwd feature-libs/product run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for organization library"

output=$(eval "ng test organization --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for organization library"

output=$(eval "yarn --cwd feature-libs/organization run test:schematics --coverage=true"$target)

echo "Running unit tests and code coverage for smartedit library"

output=$(eval "ng test smartedit --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless"$target)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for smartedit library"

output=$(eval "yarn --cwd feature-libs/smartedit run test:schematics --coverage=true"$target)