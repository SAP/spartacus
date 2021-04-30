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


echo "Running unit tests and code coverage for core"
exec 5>&1
output=$(ng test core --watch=false --sourceMap --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for storefrontlib"
exec 5>&1
output=$(ng test storefrontlib --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for user"
exec 5>&1
output=$(ng test user --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for user library"
exec 5>&1
output=$(yarn --cwd feature-libs/user run test:schematics --coverage=true | tee /dev/fd/5)

echo "Running unit tests and code coverage for checkout"
exec 5>&1
output=$(ng test checkout --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for product library"
exec 5>&1
output=$(ng test product --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for product library"
exec 5>&1
output=$(yarn --cwd feature-libs/product run test:schematics --coverage=true | tee /dev/fd/5)

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

echo "Running unit tests and code coverage for organization library"
exec 5>&1
output=$(ng test organization --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for organization library"
exec 5>&1
output=$(yarn --cwd feature-libs/organization run test:schematics --coverage=true | tee /dev/fd/5)

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

echo "Running unit tests and code coverage for smartedit library"
exec 5>&1
output=$(ng test smartedit --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for smartedit library"
exec 5>&1
output=$(yarn --cwd feature-libs/smartedit run test:schematics --coverage=true | tee /dev/fd/5)

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

echo "Running unit tests and code coverage for cart library"
exec 5>&1
output=$(ng test cart --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi
echo "Running schematics unit tests and code coverage for cart library"
exec 5>&1
output=$(yarn --cwd feature-libs/cart run test:schematics --coverage=true | tee /dev/fd/5)

echo "Running unit tests and code coverage for setup"
exec 5>&1
output=$(ng test setup --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

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
