#!/usr/bin/env bash
set -e

export SPA_ENV='lighthouse'
export NODE_OPTIONS=--dns-result-order=ipv4first

echo " --> Building Spartacus libraries"
source ci-scripts/npm-commands.sh
build_libs_ci
npm run build
npm run build:ssr

echo "--> Running lighthouse score on CI"
./node_modules/.bin/lhci autorun
