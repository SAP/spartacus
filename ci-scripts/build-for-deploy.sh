#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"
echo "Building SPA libs"
yarn build:core:lib:cds

echo "-----"
echo "Building SPA app"
cross-env SPARTACUS_BASE_URL=https://spartacus-training.eastus.cloudapp.azure.com ng build storefrontapp
