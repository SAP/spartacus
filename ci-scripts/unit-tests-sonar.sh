#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"
echo "Running unit tests and code coverage for core"
exec 5>&1
output=$(ng test core --watch=false --sourceMap --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests and code coverage for lib"
exec 5>&1
output=$(ng test storefrontlib --sourceMap --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

echo "Running unit tests for schematics"
exec 5>&1
output=$(cd projects/schematics && yarn && yarn test | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

if [[ $1 == '-h' ]]; then
    echo "Usage: $0 [sonar (to run sonar scan)]"
    exit 1
    elif [[ $1 == 'sonar' ]]; then

    echo "Running SonarCloud scan"
    sonar-scanner \
    -Dsonar.projectKey=sap_cloud-commerce-spartacus-storefront \
    -Dsonar.organization=sap \
    -Dsonar.sources=projects/storefrontlib,projects/core,projects/storefrontstyles,projects/storefrontapp-e2e-cypress,projects/schematics \
    -Dsonar.tests=projects/storefrontlib,projects/core,projects/storefrontstyles,projects/storefrontapp-e2e-cypress,projects/schematics \
    -Dsonar.host.url=https://sonarcloud.io \
    -Dsonar.login=$SONAR_TOKEN \
    -Dsonar.cfamily.build-wrapper-output.bypass=true
fi

