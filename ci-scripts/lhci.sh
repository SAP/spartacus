#!/usr/bin/env bash
set -e

npm install -g @lhci/cli@0.8.x

export SPA_ENV='lighthouse'

echo " --> Building Spartacus libraries"
yarn build:libs
yarn build
yarn build:ssr

echo "--> Running lighthouse score on CI"
lhci autorun
