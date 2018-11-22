#!/usr/bin/env bash
set -e
set -o pipefail

./unit_tests.sh

echo "Running SonarCloud scan"
sonar-scanner \
-Dsonar.projectKey=sap_cloud-commerce-spartacus-storefront \
-Dsonar.organization=sap \
-Dsonar.sources=projects/storefrontlib,projects/core,projects/storefrontstyles,projects/storefrontapp-e2e \
-Dsonar.tests=projects/storefrontlib,projects/core,projects/storefrontstyles,projects/storefrontapp-e2e \
-Dsonar.host.url=https://sonarcloud.io \
-Dsonar.login=$SONAR_TOKEN \
-Dsonar.cfamily.build-wrapper-output.bypass=true
