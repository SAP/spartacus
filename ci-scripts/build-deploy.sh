#!/usr/bin/env bash
set -e
set -o pipefail

echo "Building from current branch: $TRAVIS_BRANCH"

if [[ $TRAVIS_BRANCH != 'develop' ]]; then
  echo "This step only executes on develop branch"
  exit
fi

echo "Building SPA core lib"
yarn build:core:lib
echo "-----"
echo "Building SPA app"
ng build storefrontapp -c=ci --base-href "https://sap.github.io/cloud-commerce-spartacus-storefront/"
echo "-----"
