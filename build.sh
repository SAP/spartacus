#!/bin/bash

echo "Starting pipeline for Spaccelerator project"
echo "Updating dependencies"
yarn
echo "Building"
ng build
echo "Linting"
ng lint
echo "Testing"
ng test storefrontapp --watch=false --code-coverage --browsers=ChromeHeadless
echo "Pipeline completed"
