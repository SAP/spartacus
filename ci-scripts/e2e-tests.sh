#!/usr/bin/env bash
set -e
set -o pipefail

echo "Running end to end tests"
yarn e2e:ci
echo "-----"
echo "Spartacus Pipeline completed"
