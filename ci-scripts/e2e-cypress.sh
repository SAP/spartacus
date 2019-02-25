#!/usr/bin/env bash
set -e
set -o pipefail

echo '-----'
echo 'Building Spartacus libraries'
yarn build:core:lib

echo '-----'
echo 'Running Cypress end to end tests'
yarn e2e:cy:start-run-ci
