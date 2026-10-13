#!/usr/bin/env bash
set -e

export SPA_ENV='lighthouse'
export NODE_OPTIONS=--dns-result-order=ipv4first

echo " --> Building Spartacus libraries"
source ci-scripts/npm-commands.sh
build_libs_ci
# `build:ssr` produces the full production build (browser + SSR server.mjs) that
# `serve:ssr` runs. A prior `npm run build` produced the same production output
# and was entirely overwritten here, so the app was being built twice.
npm run build:ssr

echo "--> Running lighthouse score on CI"
./node_modules/.bin/lhci autorun
