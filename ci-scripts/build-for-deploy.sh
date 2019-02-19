#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"
echo "Building SPA libs"
yarn build:core:lib

echo "-----"
echo "Building SPA app"
ng build storefrontapp -c=ci --base-href "https://sap.github.io/cloud-commerce-spartacus-storefront/"

echo "-----"
echo "generating docs"
yarn doc:generate
mv documentation dist/storefrontapp/docs

