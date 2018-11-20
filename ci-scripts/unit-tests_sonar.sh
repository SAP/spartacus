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

echo "Running SonarCloud scan"
sonar-scanner \
-Dsonar.projectKey=sap_cloud-commerce-spartacus-storefront \
-Dsonar.organization=sap \
-Dsonar.sources=projects/storefrontlib,projects/core,projects/storefrontstyles,projects/storefrontapp-e2e \
-Dsonar.tests=projects/storefrontlib,projects/core,projects/storefrontstyles,projects/storefrontapp-e2e \
-Dsonar.host.url=https://sonarcloud.io \
-Dsonar.login=$SONAR_TOKEN \
-Dsonar.cfamily.build-wrapper-output.bypass=true
