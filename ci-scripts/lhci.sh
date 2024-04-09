#!/usr/bin/env bash
set -e

export SPA_ENV='lighthouse'
export NODE_OPTIONS=--dns-result-order=ipv4first

npm install -g @lhci/cli@0.8.x

echo " --> Building Spartacus libraries"
npm run build:libs
npm run build
npm run build:ssr

echo "--> Running lighthouse score on CI"
lhci autorun
