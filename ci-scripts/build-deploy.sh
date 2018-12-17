#!/usr/bin/env bash
set -e
set -o pipefail

BRANCH=`git branch | grep \* | cut -d ' ' -f2`
echo "Building from current branch: $BRANCH"

if [[ $BRANCH != 'develop' ]]; then
  echo "This step only executes on develop branch"
  exit
fi

echo "Building SPA core lib"
yarn build:core:lib
echo "-----"
echo "Building SPA app"
ng build storefrontapp -c=ci --base-href "https://sap.github.io/cloud-commerce-spartacus-storefront/"
echo "-----"
