#!/usr/bin/env bash
set -e
set -o pipefail

echo "Building SPA core lib"
yarn build:core:lib
echo "-----"
echo "Building SPA app"
yarn build
echo "-----"
echo "Running end to end tests"
yarn e2e:ci --suite=smoke
echo "-----"
