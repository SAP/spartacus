#!/bin/zsh
#
# test-schematics-upgrade.sh
#
# Automates end-to-end testing of Spartacus schematics upgrade:
#   1. Create a fresh Angular app
#   2. Configure .npmrc for @spartacus registry
#   3. Install previous Spartacus release (FROM_VERSION)
#   4. Verify the app builds/starts
#   5. Run ng update to the new version (TO_VERSION)
#      - optionally from a different registry (e.g. local Verdaccio)
#   6. Verify the app builds/starts after upgrade
#
# Prerequisites:
#   - Node 22+, npm 10+
#   - FROM_REGISTRY + FROM_REGISTRY_TOKEN set (or present in ~/.npmrc)
#
# Usage:
#   chmod +x test-schematics-upgrade.sh
#
#   # Explicit registries (recommended):
#   FROM_REGISTRY=https://73554900100900004337.dev.npmsrv.base.repositories.cloud.sap/ \
#   FROM_REGISTRY_TOKEN=<base64-token> \
#   TO_REGISTRY=http://localhost:4873/ \
#   TO_VERSION=221121.10.0-3 \
#     ./test-schematics-upgrade.sh
#
#   # Minimal — reads @spartacus:registry & token from ~/.npmrc for FROM,
#   #           uses same registry for TO:
#   ./test-schematics-upgrade.sh
#
# Environment variables:
#   ANGULAR_VERSION      - Angular CLI version to scaffold with (default: 21.1.0)
#   FROM_VERSION         - Spartacus version to install first (default: 221121.7.0)
#   TO_VERSION           - Spartacus version to upgrade to (default: 221121.9.0)
#   FROM_REGISTRY        - registry that hosts FROM_VERSION
#                           (default: read @spartacus:registry from ~/.npmrc)
#   FROM_REGISTRY_TOKEN  - auth token for FROM_REGISTRY
#                           (default: read matching _auth / _authToken from ~/.npmrc)
#   TO_REGISTRY          - registry that hosts TO_VERSION (default: same as FROM_REGISTRY)
#                           Useful for local Verdaccio: http://localhost:4873/
#   TO_REGISTRY_TOKEN    - auth token for TO_REGISTRY (default: none — Verdaccio often
#                           needs no auth for reads)
#   BASE_URL             - OCC backend URL (default: https://40.76.109.9:9002)
#   APP_NAME             - name of the test app (default: spartacus-fresh)
#   WORK_DIR             - directory to create the app in (default: ~/Desktop)
#   SKIP_START_CHECK     - set to "true" to skip ng serve verification (default: false)
#   SERVE_TIMEOUT        - seconds to wait for ng serve to compile (default: 120)
#

set -e

# --- Configuration ---
ANGULAR_VERSION="${ANGULAR_VERSION:-21.1.0}"
FROM_VERSION="${FROM_VERSION:-221121.7.0}"
TO_VERSION="${TO_VERSION:-221121.9.0}"
TO_REGISTRY="${TO_REGISTRY:-}"
TO_REGISTRY_TOKEN="${TO_REGISTRY_TOKEN:-}"
BASE_URL="${BASE_URL:-https://40.76.109.9:9002}"
APP_NAME="${APP_NAME:-spartacus-fresh}"
WORK_DIR="${WORK_DIR:-$HOME/Desktop}"
SKIP_START_CHECK="${SKIP_START_CHECK:-false}"
SERVE_TIMEOUT="${SERVE_TIMEOUT:-120}"
APP_DIR="${WORK_DIR}/${APP_NAME}"
SERVE_PORT=4200

# --- Auto-detect FROM_REGISTRY from ~/.npmrc if not provided ---
if [[ -z "${FROM_REGISTRY:-}" && -f "$HOME/.npmrc" ]]; then
  FROM_REGISTRY=$(grep '^@spartacus:registry=' "$HOME/.npmrc" 2>/dev/null | head -1 | sed 's/^@spartacus:registry=//')
fi
FROM_REGISTRY="${FROM_REGISTRY:-}"

if [[ -z "${FROM_REGISTRY_TOKEN:-}" && -n "$FROM_REGISTRY" && -f "$HOME/.npmrc" ]]; then
  # Try to extract _auth or _authToken for the FROM_REGISTRY host from ~/.npmrc
  # Strip protocol for matching: //host/path/:_auth=...
  local_host=$(echo "$FROM_REGISTRY" | sed 's|^https\?://||')
  FROM_REGISTRY_TOKEN=$(grep "^//${local_host}" "$HOME/.npmrc" 2>/dev/null | head -1 | sed 's/^.*:_auth=//' | sed 's/^.*:_authToken=//')
  unset local_host
fi
FROM_REGISTRY_TOKEN="${FROM_REGISTRY_TOKEN:-}"

# Default TO_REGISTRY to FROM_REGISTRY if not set
if [[ -z "$TO_REGISTRY" ]]; then
  TO_REGISTRY="$FROM_REGISTRY"
  TO_REGISTRY_TOKEN="${TO_REGISTRY_TOKEN:-$FROM_REGISTRY_TOKEN}"
fi

# All available Spartacus features (from schema.json enum)
ALL_FEATURES=(
  "ASM"
  "ASM-Customer-360"
  "Import-Export"
  "Saved-Cart"
  "Quick-Order"
  "CDC"
  "CDC-B2B"
  "CDP"
  "CDS"
  "Cart"
  "WishList"
  "Checkout"
  "Checkout-B2B"
  "Checkout-Scheduled-Replenishment"
  "Order"
  "Order-Document-Flow"
  "OPPS"
  "Digital-Payments"
  "OPF-Checkout"
  "Punchout"
  "Customer-Ticketing"
  "Administration"
  "Order-Approval"
  "Organization-User-Registration"
  "Unit-Order"
  "Account-Summary"
  "Bulk-Pricing"
  "Image-Zoom"
  "Future-Stock"
  "PDF-Invoices"
  "Product-Variants"
  "Product-Multi-Dimensional-Selector"
  "Product-Multi-Dimensional-List"
  "VC-Configurator"
  "Textfield-Configurator"
  "CPQ-Configurator"
  "Qualtrics"
  "Requested-Delivery-Date"
  "Estimated-Delivery-Date"
  "S4HANA-Order-Management"
  "cpq-quote"
  "s4-service"
  "Subscription-Billing"
  "OMF"
  "SmartEdit"
  "Store-Finder"
  "Personalization"
  "Segment-Refs"
  "TMS-GTM"
  "TMS-AEPL"
  "Pickup-In-Store"
  "User-Account"
  "User-Profile"
  "Quote"
)

# --- Colors ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log_step()  { echo "\n${CYAN}━━━ $1 ━━━${NC}\n"; }
log_ok()    { echo "${GREEN}✅ $1${NC}"; }
log_warn()  { echo "${YELLOW}⚠️  $1${NC}"; }
log_fail()  { echo "${RED}❌ $1${NC}"; }

# Safe git commit — won't fail under set -e when working tree is clean
git_commit() {
  local msg="$1"
  git add -A
  if git diff --cached --quiet 2>/dev/null; then
    log_warn "Nothing to commit: ${msg}"
  else
    git commit -m "${msg}" --no-verify
    log_ok "Committed: ${msg}"
  fi
}

# Write a project .npmrc that points @spartacus at the given registry.
# Usage: write_npmrc <registry-url> [auth-token]
write_npmrc() {
  local registry="$1"
  local token="${2:-}"
  local host
  host=$(echo "$registry" | sed 's|^https\?://||')

  {
    echo "@spartacus:registry=${registry}"
    if [[ -n "$token" ]]; then
      echo "//${host}:_auth=${token}"
    fi
  } > .npmrc

  echo "  .npmrc → @spartacus:registry=${registry}"
}

cleanup() {
  if [[ -n "$SERVE_PID" ]]; then
    kill "$SERVE_PID" 2>/dev/null || true
    wait "$SERVE_PID" 2>/dev/null || true
    unset SERVE_PID
  fi
}
trap cleanup EXIT

verify_app_starts() {
  local label="$1"

  if [[ "$SKIP_START_CHECK" == "true" ]]; then
    log_warn "Skipping start check for: ${label}"
    return 0
  fi

  log_step "Verifying app starts: ${label}"

  local serve_log="${APP_DIR}/serve-${label}.log"
  npx ng serve --port="${SERVE_PORT}" > "${serve_log}" 2>&1 &
  SERVE_PID=$!

  local elapsed=0
  while [[ $elapsed -lt $SERVE_TIMEOUT ]]; do
    sleep 5
    elapsed=$((elapsed + 5))

    if ! kill -0 "$SERVE_PID" 2>/dev/null; then
      log_fail "ng serve exited unexpectedly (${label})"
      cat "${serve_log}"
      return 1
    fi

    if grep -q "Compiled successfully\|Application bundle generation complete" "${serve_log}" 2>/dev/null; then
      log_ok "App compiled successfully (${label})"
      kill "$SERVE_PID" 2>/dev/null || true
      wait "$SERVE_PID" 2>/dev/null || true
      unset SERVE_PID
      return 0
    fi

    if grep -q "Error:" "${serve_log}" 2>/dev/null; then
      if grep -v "feature.toggle\|featureToggle\|FeatureToggle" "${serve_log}" | grep -q "Error:"; then
        log_fail "Compilation errors found (${label})"
        cat "${serve_log}"
        kill "$SERVE_PID" 2>/dev/null || true
        wait "$SERVE_PID" 2>/dev/null || true
        unset SERVE_PID
        return 1
      fi
    fi

    echo "  ⏳ Waiting for compilation... (${elapsed}s/${SERVE_TIMEOUT}s)"
  done

  log_fail "ng serve timed out after ${SERVE_TIMEOUT}s (${label})"
  cat "${serve_log}"
  kill "$SERVE_PID" 2>/dev/null || true
  wait "$SERVE_PID" 2>/dev/null || true
  unset SERVE_PID
  return 1
}

# =====================================================
# Print configuration
# =====================================================
log_step "Configuration"
echo "  ANGULAR_VERSION:  ${ANGULAR_VERSION}"
echo "  FROM_VERSION:     ${FROM_VERSION}"
echo "  FROM_REGISTRY:    ${FROM_REGISTRY:-(not set — will fail)}"
echo "  TO_VERSION:       ${TO_VERSION}"
echo "  TO_REGISTRY:      ${TO_REGISTRY:-(same as FROM)}"
echo "  BASE_URL:         ${BASE_URL}"
echo "  APP_DIR:          ${APP_DIR}"
echo "  SKIP_START_CHECK: ${SKIP_START_CHECK}"

# =====================================================
# STEP 0: Pre-flight checks
# =====================================================
log_step "Pre-flight checks"

if ! command -v node &> /dev/null; then
  log_fail "node not found. Install Node 22+."
  exit 1
fi
log_ok "node $(node --version)"

if ! command -v npm &> /dev/null; then
  log_fail "npm not found."
  exit 1
fi
log_ok "npm $(npm --version)"

# Verify ~/.npmrc exists (optional — used for auto-detection)
if [[ -f "$HOME/.npmrc" ]]; then
  log_ok "~/.npmrc found"
else
  log_warn "~/.npmrc not found — relying on FROM_REGISTRY / TO_REGISTRY env vars"
fi

# Verify FROM_REGISTRY is set
if [[ -z "$FROM_REGISTRY" ]]; then
  log_fail "FROM_REGISTRY not set and could not be auto-detected from ~/.npmrc."
  echo "  Set FROM_REGISTRY=<url> and FROM_REGISTRY_TOKEN=<token>."
  exit 1
fi
log_ok "FROM_REGISTRY: ${FROM_REGISTRY}"

# Clean up previous test app
if [[ -d "${APP_DIR}" ]]; then
  log_warn "Removing existing ${APP_DIR}"
  rm -rf "${APP_DIR}"
fi

# =====================================================
# STEP 1: Create fresh Angular app
# =====================================================
log_step "Step 1: Creating fresh Angular ${ANGULAR_VERSION} app"

cd "${WORK_DIR}"
NG_CLI_ANALYTICS=false npx "@angular/cli@${ANGULAR_VERSION}" new "${APP_NAME}" \
  --style=scss \
  --ssr=false \
  --zoneless=false \
  --file-name-style-guide=2016 \
  --defaults

cd "${APP_DIR}"
log_ok "Angular app created at ${APP_DIR}"

# Initialise git early so we can commit at every step
# (ng new already does git init + commit, so this may be a no-op)
git_commit "chore: scaffold Angular ${ANGULAR_VERSION} app"

# =====================================================
# STEP 2: Configure .npmrc for FROM_REGISTRY
# =====================================================
log_step "Step 2: Configuring .npmrc → FROM_REGISTRY"

write_npmrc "$FROM_REGISTRY" "$FROM_REGISTRY_TOKEN"
log_ok ".npmrc configured for ${FROM_REGISTRY}"

git_commit "chore: add .npmrc (FROM_REGISTRY)"

# =====================================================
# STEP 3: Install previous Spartacus release
# =====================================================
log_step "Step 3: Installing Spartacus ${FROM_VERSION}"

npm install --save-dev "@spartacus/schematics@${FROM_VERSION}"

git_commit "chore: npm install @spartacus/schematics@${FROM_VERSION}"

npx ng add "@spartacus/schematics@${FROM_VERSION}" \
  --base-url="${BASE_URL}" \
  --features ${ALL_FEATURES[@]} \
  --skip-confirmation

log_ok "Spartacus ${FROM_VERSION} installed"

echo "\nInstalled @spartacus packages:"
grep '"@spartacus/' package.json | head -30

git_commit "chore: ng add Spartacus ${FROM_VERSION} (all features)"

# =====================================================
# STEP 4: Verify app works with previous version
# =====================================================
log_step "Step 4: Building app with Spartacus ${FROM_VERSION}"

npx ng build 2>&1 || {
  log_fail "Build failed with Spartacus ${FROM_VERSION}"
  exit 1
}
log_ok "Build succeeded with Spartacus ${FROM_VERSION}"

verify_app_starts "before-upgrade"

git_commit "chore: verified build with Spartacus ${FROM_VERSION}"

# =====================================================
# STEP 5: Run ng update to new version
# =====================================================
log_step "Step 5: Upgrading to Spartacus ${TO_VERSION}"

# If TO_REGISTRY differs from FROM_REGISTRY, switch .npmrc for the upgrade
SWITCHED_REGISTRY=false
if [[ "$TO_REGISTRY" != "$FROM_REGISTRY" ]]; then
  log_warn "Switching @spartacus:registry → ${TO_REGISTRY} for upgrade"

  # Save FROM_REGISTRY details so we can restore later (don't create untracked files
  # that would make git dirty — ng update requires a clean working tree)
  SAVED_FROM_REGISTRY="$FROM_REGISTRY"
  SAVED_FROM_REGISTRY_TOKEN="$FROM_REGISTRY_TOKEN"
  SWITCHED_REGISTRY=true

  # Verify TO_VERSION is available on the target registry
  ENCODED_PKG=$(echo "@spartacus/schematics" | sed 's/@/%40/g; s/\//%2f/g')
  if curl -sf "${TO_REGISTRY}${ENCODED_PKG}" | python3 -c "
import sys,json
d=json.load(sys.stdin)
sys.exit(0 if '${TO_VERSION}' in d.get('versions',{}) else 1)
" 2>/dev/null; then
    log_ok "@spartacus/schematics@${TO_VERSION} found on ${TO_REGISTRY}"
  else
    log_fail "@spartacus/schematics@${TO_VERSION} NOT found on ${TO_REGISTRY}"
    echo "  Publish packages to the registry first."
    exit 1
  fi

  write_npmrc "$TO_REGISTRY" "$TO_REGISTRY_TOKEN"

  git_commit "chore: switch .npmrc to TO_REGISTRY (${TO_REGISTRY})"
fi

# NOTE: Do NOT pre-install @spartacus/schematics before ng update.
# If schematics is already at TO_VERSION, ng update sees "nothing to update"
# and skips the packageGroup bump of all @spartacus/* libraries.
# Let ng update handle the schematics install AND the packageGroup bump together.

# ng update requires a perfectly clean working tree.
# Ensure there are no leftover untracked/modified files.
# Add a .gitignore for build artifacts and logs that might appear.
{
  echo "*.log"
  echo "/dist"
} >> .gitignore
git_commit "chore: update .gitignore before ng update"

echo "\n--- git status before ng update ---"
git status --short

echo "\n--- package.json BEFORE ng update ---"
grep '"@spartacus/' package.json | head -40

npx ng update "@spartacus/schematics@${TO_VERSION}" --force --allow-dirty 2>&1 | tee ng-update.log

# Commit whatever ng update changed
git_commit "chore: ng update @spartacus/schematics@${TO_VERSION}"

echo "\n--- package.json AFTER ng update ---"
grep '"@spartacus/' package.json | head -40

# Show what ng update actually changed
echo "\n--- git diff from ng update ---"
git --no-pager diff HEAD~1 -- package.json || true

# Restore FROM_REGISTRY .npmrc if we switched registries
if [[ "$SWITCHED_REGISTRY" == "true" ]]; then
  write_npmrc "$SAVED_FROM_REGISTRY" "$SAVED_FROM_REGISTRY_TOKEN"
  git_commit "chore: restore .npmrc to FROM_REGISTRY after upgrade"
  log_ok "Restored .npmrc to FROM_REGISTRY"
fi

log_ok "ng update completed"

# Verify all @spartacus packages were actually bumped
MISMATCHED_EARLY=$(grep '"@spartacus/' package.json | grep -v "~${TO_VERSION}\|\"${TO_VERSION}" | grep -v "schematics" || true)
if [[ -n "$MISMATCHED_EARLY" ]]; then
  log_warn "Some @spartacus packages were NOT bumped by ng update:"
  echo "$MISMATCHED_EARLY"
  echo ""
  log_warn "ng update log:"
  cat ng-update.log
fi

# =====================================================
# STEP 6: Verify app works after upgrade
# =====================================================
log_step "Step 6: Building app with Spartacus ${TO_VERSION}"

# Run npm install to ensure node_modules match updated package.json
npm install 2>&1 || true

git_commit "chore: npm install after upgrade to ${TO_VERSION}"

npx ng build 2>&1 || {
  log_fail "Build failed after upgrade to Spartacus ${TO_VERSION}"
  exit 1
}
log_ok "Build succeeded with Spartacus ${TO_VERSION}"

verify_app_starts "after-upgrade"

git_commit "chore: verified build with Spartacus ${TO_VERSION}"

# =====================================================
# Summary
# =====================================================
log_step "Summary"

echo "  App location:      ${APP_DIR}"
echo "  Angular version:   ${ANGULAR_VERSION}"
echo "  From version:      ${FROM_VERSION}"
echo "  From registry:     ${FROM_REGISTRY}"
echo "  To version:        ${TO_VERSION}"
echo "  To registry:       ${TO_REGISTRY}"
echo ""

# Check all @spartacus packages are on target version
MISMATCHED=$(grep '"@spartacus/' package.json | grep -v "~${TO_VERSION}\|\"${TO_VERSION}" | grep -v "schematics" || true)
if [[ -n "$MISMATCHED" ]]; then
  log_warn "Some @spartacus packages are NOT on ${TO_VERSION}:"
  echo "$MISMATCHED"
else
  log_ok "All @spartacus packages bumped to ${TO_VERSION}"
fi

echo "\n--- Git log (all steps) ---"
git --no-pager log --oneline

log_ok "Upgrade test completed successfully! 🎉"

