#!/usr/bin/env bash
set -e

BRANCH=develop
if [ "$1" != "" ] ; then
  BRANCH=$1
fi

DIR=self

if [ "$2" != "" ] ; then
  DIR=$2
fi

npm i -g @microsoft/api-extractor

if [ "$DIR" != "self" ] ; then
  CLONE_DIR="$DIR-branch-clone"
  rm -rf $CLONE_DIR
  git clone --single-branch --branch $BRANCH https://github.com/SAP/spartacus.git $CLONE_DIR --depth 1
  cd $CLONE_DIR
fi


# Install dependencies and build lib
yarn
yarn build:core:lib:cds

# Directory for reports
rm -rf etc
mkdir etc

CONFIG_PATH="./../.github/api-extractor-action/api-extractor.json"
if [ "$DIR" = "self" ] ; then
  CONFIG_PATH="./.github/api-extractor-action/api-extractor.json"
fi

# @spartacus/assets
cp "$CONFIG_PATH" ./dist/assets/api-extractor.json
(
  cd ./dist/assets && \
  api-extractor run --local --verbose
)

# @spartacus/core
# Disabled because of the issue with `import * as ` https://github.com/microsoft/rushstack/issues/1029
#
# cp "$CONFIG_PATH" ./dist/core/api-extractor.json
# (
#   cd ./dist/core && \
#   api-extractor run --local --verbose
# )

# @spartacus/storefront
cp "$CONFIG_PATH" ./dist/storefrontlib/api-extractor.json
(
  cd ./dist/storefrontlib && \
  api-extractor run --local --verbose
)

# @spartacus/cds
cp "$CONFIG_PATH" ./dist/cds/api-extractor.json
(
  cd ./dist/cds && \
  api-extractor run --local --verbose
)

# @spartacus/organization
cp "$CONFIG_PATH" ./dist/organization/api-extractor.json
(
  cd ./dist/organization && \
  api-extractor run --local --verbose
)

# @spartacus/product
cp "$CONFIG_PATH" ./dist/product/api-extractor.json
(
  cd ./dist/product && \
  api-extractor run --local --verbose
)

# @spartacus/setup
cp "$CONFIG_PATH" ./dist/setup/api-extractor.json
(
  cd ./dist/setup && \
  api-extractor run --local --verbose
)

# @spartacus/cdc
# Disabled because of the issue with `import` https://github.com/microsoft/rushstack/issues/1029

# cp "$CONFIG_PATH" ./dist/cdc/api-extractor.json
# (
#   cd ./dist/cdc && \
#   api-extractor run --local --verbose
# )
