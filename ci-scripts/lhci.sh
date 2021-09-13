#!/usr/bin/env bash
set -e

echo " --> Building Spartacus libraries"
yarn build:libs
yarn build
yarn build:ssr:ci

echo "--> Running lighthouse score on CI"
lhci autorun
