#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"
echo "Building SPA app"
ng build storefrontapp -c=ci --base-href "https://sap.github.io/cloud-commerce-spartacus-storefront/"
