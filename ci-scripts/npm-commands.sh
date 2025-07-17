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

build_csr() {
    npm run build:csr
}

build_ssr() {
    npm run build:ssr:ci
}

build_ssr_local_http() {
    npm run build:ssr:local-http-backend
}

# Usage function
show_usage() {
    echo "Usage: source ci-scripts/npm-commands.sh"
    echo ""
    echo "Available functions:"
    echo "  build_libs                  - Build Spartacus libraries"
    echo "  build_csr                   - Build CSR application"
    echo "  build_ssr                   - Build SSR application for CI"
    echo "  build_ssr_local_http        - Build SSR with local HTTP backend"
    echo ""
}

# If script is executed directly (not sourced), show usage
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    show_usage
fi
