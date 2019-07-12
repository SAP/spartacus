#!/usr/bin/env bash
set -e

BRANCH=develop
BRANCH=$1

npm i -g @microsoft/api-extractor

rm -rf target-branch-clone
git clone --single-branch --branch $BRANCH https://github.com/SAP/cloud-commerce-spartacus-storefront.git target-branch-clone --depth 1
cd target-branch-clone

# Install dependencies and build lib
yarn
yarn build:core:lib

# Directory for reports
mkdir etc

# @spartacus/assets
cp ./../api/api-extractor-assets.json ./dist/assets/api-extractor.json
(
  cd ./dist/assets && \
  api-extractor run --local --verbose
)

# @spartacus/core
# Disabled because of the issue with `import * as `
#
# cp ./../api/api-extractor-core.json ./dist/core/api-extractor.json
# (
#   cd ./dist/core && \
#   api-extractor run --local --verbose
# )

# @spartacus/storefront
cp ./../api/api-extractor-storefrontlib.json ./dist/storefrontlib/api-extractor.json
(
  cd ./dist/storefrontlib && \
  api-extractor run --local --verbose
)
