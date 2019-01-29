#!/usr/bin/env bash
set -e
set -o pipefail

cd projects/storefrontapp-e2e-cypress
yarn
cd ../..
yarn e2e:cypress:ci
