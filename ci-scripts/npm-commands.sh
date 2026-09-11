#!/usr/bin/env bash
set -e
set -o pipefail

# Centralized npm commands wrapper script
# This script provides bash function wrappers for npm scripts to avoid
# having to change automation scripts in multiple places when npm script names change.

# Build commands
build_libs() {
    npm run build:libs
}

build_libs_ci() {
    local parallel="${NX_BUILD_PARALLEL:-3}"

    echo "▶ Validating translation JSON files"
    npx ts-node ./scripts/i18n/validate-translations-json-files.ts

    echo "▶ Compiling schematics for all libraries (tsc, into source tree)"
    npm --prefix core-libs/schematics run build
    local dirs
    dirs=$(node -e '
      const fs=require("fs");
      for (const base of ["feature-libs","integration-libs"]) {
        for (const name of fs.readdirSync(base)) {
          const p=`${base}/${name}/package.json`;
          if (fs.existsSync(p) && (JSON.parse(fs.readFileSync(p)).scripts||{})["build:schematics"]) {
            console.log(`${base}/${name}`);
          }
        }
      }
    ')
    echo "$dirs" | xargs -P "$parallel" -I {} npm --prefix {} run build:schematics

    echo "▶ Building Angular libraries via nx run-many (parallel=$parallel, cache-aware)"
    npx nx run-many --target=build --configuration=production --parallel="$parallel" \
        --exclude=storefrontapp,storefrontapp-e2e-cypress

    echo "▶ Building assets lib"
    npm run build:assets
    return 0
}

build_csr() {
    npm run build:csr
}

build_ssr() {
    npm run build:ssr:ci
}

build_ssr_local_http() {
    npm run build:ssr:local-http-backend
}

# Test commands
test_ssr() {
    npm run test:ssr:ci --verbose
}

# Usage function
show_usage() {
    echo "Usage: source ci-scripts/npm-commands.sh"
    echo ""
    echo "Available functions:"
    echo "  build_libs                  - Build Spartacus libraries"
    echo "  build_libs_ci               - Build Spartacus libraries (CI: nx graph + cache)"
    echo "  build_csr                   - Build CSR application"
    echo "  build_ssr                   - Build SSR application for CI"
    echo "  build_ssr_local_http        - Build SSR with local HTTP backend"
    echo "  test_ssr                    - Run SSR tests"
    echo ""
}

# If script is executed directly (not sourced), show usage
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    show_usage
fi
