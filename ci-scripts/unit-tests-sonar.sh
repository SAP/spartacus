#!/usr/bin/env bash
set -e
set -o pipefail

echo "Running unit tests for schematics"
cd projects/schematics
yarn
yarn test && yarn test && yarn test && yarn test && yarn test

