#!/bin/bash

echo "Starting pipeline for Spaccelerator project"
echo "Updating dependencies"
yarn
echo "-----"
echo "Dependencies updated. Building SPA"
ng build
echo "-----"
echo "Build complete. Checking code linting"
ng lint
echo "-----"
echo "Linting stage passed. Running unit tests and checking code coverage"
ng test storefrontapp --watch=false --code-coverage --browsers=ChromeHeadless
echo "-----"
echo "Test s successful. Pipeline completed"
