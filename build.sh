#!/bin/bash
set -e

echo "Starting pipeline for Spartacus project"
echo "-----"
echo "Updating dependencies"
yarn
echo "-----"
echo "Validating code linting"
ng lint
echo "-----"
echo "Building SPA core lib"
ng build storefrontlib
echo "-----"
echo "Running unit tests and checking code coverage for core lib"
ng test storefrontlib --watch=false --code-coverage --browsers=ChromeHeadless
echo "-----"
echo "Building SPA app"
ng build storefrontapp
echo "-----"
echo "Running unit tests and checking code coverage for storefront app"
ng test storefrontapp --watch=false --code-coverage --browsers=ChromeHeadless
echo "-----"
echo "Spartacus Pipeline completed"
