#!/usr/bin/env bash
set -e

export SPA_ENV='lighthouse'

npm install -g @lhci/cli@0.8.x

echo " --> Building Spartacus libraries"
yarn build:libs
yarn build
yarn build:ssr

echo "--> Running lighthouse score on CI"
lhci autorun
