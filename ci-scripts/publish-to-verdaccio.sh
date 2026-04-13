#!/usr/bin/env bash

#
#  publish-to-verdaccio.sh
#
#  Start a local Verdaccio registry and publish all @spartacus packages to it.
#
#  This is a standalone bash alternative to the interactive TS tool
#  (tools/schematics/testing.ts) — designed for CI and scripted workflows.
#
#  Steps:
#    1. Start Verdaccio (local npm registry)
#    2. Build all libraries (unless --skip-build)
#    3. Publish @spartacus packages to Verdaccio
#
#  Usage:
#    ./ci-scripts/publish-to-verdaccio.sh [options]
#
#  Options:
#    --skip-build    Skip building libraries (use pre-built dist/)
#    --keep-running  Keep Verdaccio running after publishing (default: exit after publish)
#
#  Examples:
#    # Full build + publish:
#    ./ci-scripts/publish-to-verdaccio.sh
#
#    # Skip build (already ran npm run build:libs):
#    ./ci-scripts/publish-to-verdaccio.sh --skip-build
#
#    # Publish and keep Verdaccio running for manual testing:
#    ./ci-scripts/publish-to-verdaccio.sh --skip-build --keep-running
#

set -euo pipefail

# ─── Configuration ───
VERDACCIO_REGISTRY_URL="http://localhost:4873/"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
VERDACCIO_CONFIG="${REPO_ROOT}/scripts/install/config.yaml"
VERDACCIO_PID=""
ORIGINAL_REGISTRY_URL=""
SKIP_BUILD=false
KEEP_RUNNING=false

# ─── Parse arguments ───
for arg in "$@"; do
  case $arg in
    --skip-build)   SKIP_BUILD=true ;;
    --keep-running) KEEP_RUNNING=true ;;
    *)              printf "Unknown option: %s\n" "$arg" >&2; exit 1 ;;
  esac
done

# ─── Colors ───
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_header()  { printf "\n${GREEN}━━━ %s ━━━${NC}\n\n" "$1"; }
print_step()    { printf "${YELLOW}➜${NC} %s\n" "$1"; }
print_ok()      { printf "${GREEN}✅${NC} %s\n" "$1"; }
print_fail()    { printf "${RED}❌${NC} %s\n" "$1"; }

# ─── Cleanup ───
cleanup() {
  if [[ "$KEEP_RUNNING" == "true" && -n "$VERDACCIO_PID" ]]; then
    print_header "Verdaccio Left Running"
    print_step "PID: $VERDACCIO_PID"
    print_step "Registry: $VERDACCIO_REGISTRY_URL"
    print_step "To stop:  kill $VERDACCIO_PID"
    print_step "To use:   npm config set @spartacus:registry $VERDACCIO_REGISTRY_URL"
    return
  fi

  print_header "Cleanup"

  # Kill Verdaccio
  if [[ -n "$VERDACCIO_PID" ]]; then
    print_step "Stopping Verdaccio (PID: $VERDACCIO_PID)"
    kill "$VERDACCIO_PID" 2>/dev/null || true
    wait "$VERDACCIO_PID" 2>/dev/null || true
  fi

  # Restore original npm registry
  if [[ -n "$ORIGINAL_REGISTRY_URL" && "$ORIGINAL_REGISTRY_URL" != "undefined" ]]; then
    print_step "Restoring @spartacus:registry → $ORIGINAL_REGISTRY_URL"
    npm config set @spartacus:registry "$ORIGINAL_REGISTRY_URL"
  else
    print_step "Deleting @spartacus:registry from npm config"
    npm config delete @spartacus:registry 2>/dev/null || true
  fi

  # Clean Verdaccio storage
  print_step "Cleaning Verdaccio storage"
  rm -rf "${REPO_ROOT}/scripts/install/storage"

  print_ok "Cleanup completed"
}
trap cleanup EXIT

# ─── Step 1: Start Verdaccio ───
start_verdaccio() {
  print_header "Step 1: Starting Verdaccio"

  # Save original registry
  ORIGINAL_REGISTRY_URL=$(npm config get @spartacus:registry 2>/dev/null || echo "undefined")
  print_step "Original @spartacus:registry = $ORIGINAL_REGISTRY_URL"

  # Clean previous storage
  rm -rf "${REPO_ROOT}/scripts/install/storage"

  # Start Verdaccio in the background
  print_step "Starting Verdaccio with config: $VERDACCIO_CONFIG"
  npx verdaccio --config "$VERDACCIO_CONFIG" > /dev/null 2>&1 &
  VERDACCIO_PID=$!
  print_step "Verdaccio PID: $VERDACCIO_PID"

  # Wait for it to be ready
  print_step "Waiting for Verdaccio to be ready..."
  local max_attempts=30
  local attempt=0
  while [[ $attempt -lt $max_attempts ]]; do
    if curl -sf "${VERDACCIO_REGISTRY_URL}" > /dev/null 2>&1; then
      print_ok "Verdaccio is ready at $VERDACCIO_REGISTRY_URL"
      break
    fi
    attempt=$((attempt + 1))
    sleep 1
  done

  if [[ $attempt -eq $max_attempts ]]; then
    print_fail "Verdaccio failed to start after ${max_attempts}s"
    exit 1
  fi

  # Point npm at Verdaccio for @spartacus packages
  print_step "Setting @spartacus:registry → $VERDACCIO_REGISTRY_URL"
  npm config set @spartacus:registry "$VERDACCIO_REGISTRY_URL"

  print_ok "Verdaccio started"
}

# ─── Step 2: Build libraries ───
build_libraries() {
  if [[ "$SKIP_BUILD" == "true" ]]; then
    print_header "Step 2: Skipping Build (--skip-build)"

    if [[ ! -d "${REPO_ROOT}/dist" ]]; then
      print_fail "dist/ directory not found. Run 'npm run build:libs' first or remove --skip-build."
      exit 1
    fi
    print_ok "Using pre-built libraries from dist/"
    return
  fi

  print_header "Step 2: Building Libraries"

  cd "$REPO_ROOT"

  print_step "Building all libs (npm run build:libs)..."
  npm run build:libs

  print_step "Building schematics (npm run build:schematics)..."
  npm run build:schematics

  print_ok "All libraries built"
}

# ─── Step 3: Publish packages ───
publish_packages() {
  print_header "Step 3: Publishing @spartacus packages to Verdaccio"

  cd "$REPO_ROOT"

  # Collect all package.json files to publish
  # Same sources as tools/schematics/testing.ts → getPackageJsonFiles()
  local package_files=()

  # Source packages (not in dist/)
  package_files+=("projects/storefrontstyles/package.json")
  package_files+=("projects/schematics/package.json")

  # Built packages in dist/
  while IFS= read -r -d '' f; do
    package_files+=("$f")
  done < <(find dist -maxdepth 2 -name "package.json" -not -path "*/node_modules/*" -print0 2>/dev/null)

  local total=${#package_files[@]}
  if [[ $total -eq 0 ]]; then
    print_fail "No packages found to publish. Build first."
    exit 1
  fi

  print_step "Found $total packages to publish"

  local success=0
  local failed=0
  local failed_names=()

  for pkg in "${package_files[@]}"; do
    local dir
    dir=$(dirname "$pkg")
    local name
    name=$(node -p "require('./${pkg}').name" 2>/dev/null || echo "unknown")
    local version
    version=$(node -p "require('./${pkg}').version" 2>/dev/null || echo "0.0.0")

    # Only publish @spartacus packages
    if [[ "$name" != @spartacus/* ]]; then
      continue
    fi

    # Determine npm tag: prerelease → next, stable → latest
    local tag="latest"
    if [[ "$version" == *-* ]]; then
      tag="next"
    fi

    printf "  Publishing %-45s" "${name}@${version} (${tag})"

    if (cd "$dir" && npm publish --registry="$VERDACCIO_REGISTRY_URL" --tag="$tag" --no-git-tag-version 2>&1) > /dev/null; then
      printf " ${GREEN}✓${NC}\n"
      success=$((success + 1))
    else
      printf " ${RED}✗${NC}\n"
      failed=$((failed + 1))
      failed_names+=("$name")
    fi
  done

  echo ""
  print_step "Published $success packages, $failed failed"

  if [[ $failed -gt 0 ]]; then
    print_fail "Failed packages:"
    for name in "${failed_names[@]}"; do
      echo "  - $name"
    done
    exit 1
  fi

  if [[ $success -eq 0 ]]; then
    print_fail "No @spartacus packages were published."
    exit 1
  fi

  print_ok "All @spartacus packages published to Verdaccio"
}

# ─── Main ───
main() {
  print_header "Publish @spartacus to Verdaccio"

  # Must run from repo root
  if [[ ! -f "${REPO_ROOT}/nx.json" ]]; then
    print_fail "Cannot find nx.json. Run this script from the Spartacus repo."
    exit 1
  fi

  cd "$REPO_ROOT"

  start_verdaccio
  build_libraries
  publish_packages

  print_header "Done! All @spartacus packages published 🎉"
  printf "  Registry: %s\n" "$VERDACCIO_REGISTRY_URL"
  printf "  PID:      %s\n" "$VERDACCIO_PID"
  echo ""

  if [[ "$KEEP_RUNNING" == "true" ]]; then
    print_step "Verdaccio is still running (--keep-running)."
    print_step "Browse:   open $VERDACCIO_REGISTRY_URL"
    print_step "Install:  npm install @spartacus/core --registry=$VERDACCIO_REGISTRY_URL"
    print_step "Stop:     kill $VERDACCIO_PID"
    echo ""
    print_step "Press Ctrl+C to stop Verdaccio and exit."
    wait "$VERDACCIO_PID"
  fi
}

main "$@"
