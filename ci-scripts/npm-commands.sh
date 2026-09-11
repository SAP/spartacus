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

# CI-optimized libs build. Produces the SAME dist/ as `npm run build:libs` but
# lets Nx schedule the Angular library builds via the project graph (parallel,
# and cache-aware when .nx/cache is restored across runs) instead of the
# hand-ordered `concurrently` sequence in package.json.
#
# Order matters and is preserved:
#   1. Validate i18n JSON (same prerequisite as build:libs).
#   2. Compile every lib's schematics (tsc) INTO THE SOURCE TREE. ng-packagr
#      (the nx `build` target) copies schematics/** into dist during the build,
#      so schematics MUST be compiled before `nx build` runs. This step is NOT
#      an nx target, hence the explicit sweep.
#   3. Build all Angular libs via nx run-many (graph order, --parallel, cache).
#   4. Build the standalone assets lib (no nx build target).
#
# NOTE: package.json `build:libs` is left untouched — it is still used locally
# and by any external pipeline. This wrapper is CI-only.
build_libs_ci() {
    local parallel="${NX_BUILD_PARALLEL:-3}"

    echo "▶ Validating translation JSON files"
    npx ts-node ./scripts/i18n/validate-translations-json-files.ts

    echo "▶ Compiling schematics for all libraries (tsc, into source tree)"
    # core-libs/schematics first (other libs' schematics may depend on it), then
    # every feature/integration lib that defines a build:schematics script.
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
    # Exclude the storefront apps — those are built separately by build_csr/build_ssr.
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
