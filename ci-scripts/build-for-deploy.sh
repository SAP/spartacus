#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"
echo "Building SPA libs"
yarn build:core:lib:cds

echo "-----"
echo "Building SPA app"
cross-env SPARTACUS_BASE_URL=https://api.c39j2-walkersde1-d4-public.model-t.cc.commerce.ondemand.com ng build storefrontapp
