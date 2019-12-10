#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"
echo "Building SPA libs"
yarn build:core:lib

echo "-----"
echo "Building SPA app"
ng build storefrontapp -c=ci --base-href "https://storefront.c39j2-walkersde1-d4-public.model-t.cc.commerce.ondemand.com"
