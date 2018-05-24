#!/bin/bash

check_error() {
  if [ "$?" != "0" ]; then
    echo "${1:-"Unknown Error"}" 1>&2
    exit 1
  fi
}

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
check_error "Building the storefrontlib failed. Aborting"
echo "-----"
echo "Running unit tests and checking code coverage for core lib"
ng test storefrontlib --watch=false --code-coverage --browsers=ChromeHeadless
check_error "Tests for storefrontlib failed. Aborting"
echo "-----"
echo "Building SPA app"
ng build storefrontapp
check_error "Building the storefrontapp failed. Aborting"
echo "-----"
echo "Running unit tests and checking code coverage for storefront app"
ng test storefrontapp --watch=false --code-coverage --browsers=ChromeHeadless
check_error "Tests for storefrontapp failed. Aborting"
echo "-----"
echo "Spartacus Pipeline completed"
