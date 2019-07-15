#!/usr/bin/env bash
set -e

# Install dependencies and build lib
yarn
yarn build:core:lib

rm -rf etc
mkdir etc

npm i -g @microsoft/api-extractor

# @spartacus/assets
cp ./scripts/api-extractor-configs/api-extractor-assets.json ./dist/assets/api-extractor.json
(
  cd ./dist/assets && \
  api-extractor run --local --verbose
)

# @spartacus/core
# Disabled because of the issue with `import * as `
#
# cp ./scripts/api-extractor-configs/api-extractor-core.json ./dist/core/api-extractor.json
# (
#   cd ./dist/core && \
#   api-extractor run --local --verbose
# )

# @spartacus/storefront
cp ./scripts/api-extractor-configs/api-extractor-storefrontlib.json ./dist/storefrontlib/api-extractor.json
(
  cd ./dist/storefrontlib && \
  api-extractor run --local --verbose
)
