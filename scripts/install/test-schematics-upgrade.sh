#!/bin/zsh
#
# test-schematics-upgrade.sh
#
# Automates end-to-end testing of Spartacus schematics upgrade:
#   1. Create a fresh Angular app
#   2. Configure .npmrc with registry + auth token
#   3. Install previous Spartacus release
#   4. Verify the app builds/starts
#   5. Run ng update to the new version
#   6. Verify the app builds/starts after upgrade
# Prerequisites:
#   - Node 22+, npm 10+
#   - Auth token provided via one of (in priority order):
#       a) NPM_AUTH env var (base64-encoded _auth)
#       b) NPM_TOKEN env var (CI convention, used by config.sh)
#       c) ~/.npmrc containing a /:_auth= line (auto-detected)
#
# Usage:
#   chmod +x test-schematics-upgrade.sh
#
#   # Minimal — auto-detects token from ~/.npmrc or NPM_TOKEN:
#   ./test-schematics-upgrade.sh
#
#   # Explicit token:
#   NPM_AUTH=<base64-token> ./test-schematics-upgrade.sh
#
#   # CI style (matches config.sh variables):
#   NPM_TOKEN=<base64-token> NPM_URL=https://my-registry/ ./test-schematics-upgrade.sh
#
# Environment variables:
#   NPM_AUTH          - base64-encoded auth for the npm registry (_auth value)
#   NPM_TOKEN         - (alternative) same as NPM_AUTH; CI convention from config.sh
#   NPM_URL           - (alternative) same as REGISTRY_URL; CI convention from config.sh
#   REGISTRY_URL      - registry URL for @spartacus packages (default: https://73554900100900004337.dev.npmsrv.base.repositories.cloud.sap/)
#   ANGULAR_VERSION   - Angular CLI version to scaffold with (default: 21.1.0)
#   FROM_VERSION      - Spartacus version to install first (default: 221121.7.0)
#   TO_VERSION        - Spartacus version to upgrade to (default: 221121.9.0)
#   BASE_URL          - OCC backend URL (default: https://40.76.109.9:9002)
#   APP_NAME          - name of the test app (default: spartacus-fresh)
#   WORK_DIR          - directory to create the app in (default: /tmp)
#   SKIP_START_CHECK  - set to "true" to skip ng serve verification (default: false)
#   SERVE_TIMEOUT     - seconds to wait for ng serve to compile (default: 120)
#

set -e

# --- Resolve auth token ---
# Priority: NPM_AUTH env > NPM_TOKEN env (CI convention from config.sh) > ~/.npmrc auto-detect
if [[ -z "$NPM_AUTH" ]]; then
  if [[ -n "$NPM_TOKEN" ]]; then
    NPM_AUTH="$NPM_TOKEN"
    echo "ℹ️  NPM_AUTH resolved from NPM_TOKEN (CI config.sh convention)"
  elif [[ -f "$HOME/.npmrc" ]]; then
    EXTRACTED_AUTH=$(grep -E '/:_auth=' "$HOME/.npmrc" | head -1 | sed 's/.*:_auth=//')
    if [[ -n "$EXTRACTED_AUTH" ]]; then
      NPM_AUTH="$EXTRACTED_AUTH"
      echo "ℹ️  NPM_AUTH auto-detected from ~/.npmrc"
    fi
  fi
fi

if [[ -z "$NPM_AUTH" ]]; then
  echo "❌ Auth token is required. Provide it via one of:"
  echo "   1) export NPM_AUTH=<base64-encoded-auth>"
  echo "   2) export NPM_TOKEN=<base64-encoded-auth>  (CI convention, used by config.sh)"
  echo "   3) Have a ~/.npmrc with a /:_auth= line (auto-detected)"
  echo ""
  echo "   ./test-schematics-upgrade.sh"
  exit 1
fi

# --- Configuration ---
# REGISTRY_URL also falls back to NPM_URL (CI convention from config.sh)
REGISTRY_URL="${REGISTRY_URL:-${NPM_URL:-https://73554900100900004337.dev.npmsrv.base.repositories.cloud.sap/}}"
ANGULAR_VERSION="${ANGULAR_VERSION:-21.1.0}"
FROM_VERSION="${FROM_VERSION:-221121.7.0}"
TO_VERSION="${TO_VERSION:-221121.9.0}"
BASE_URL="${BASE_URL:-https://40.76.109.9:9002}"
APP_NAME="${APP_NAME:-spartacus-fresh}"
WORK_DIR="${WORK_DIR:-/tmp}"
SKIP_START_CHECK="${SKIP_START_CHECK:-false}"
SERVE_TIMEOUT="${SERVE_TIMEOUT:-120}"
APP_DIR="${WORK_DIR}/${APP_NAME}"
SERVE_PORT=4200

# Derive registry host for .npmrc auth line (strip protocol)
REGISTRY_HOST=$(echo "${REGISTRY_URL}" | sed -E 's|https?://||')

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
      cleanup
      return 0
    fi

    if grep -q "Error:" "${serve_log}" 2>/dev/null; then
      if grep -v "feature.toggle\|featureToggle\|FeatureToggle" "${serve_log}" | grep -q "Error:"; then
        log_fail "Compilation errors found (${label})"
        cat "${serve_log}"
        cleanup
        return 1
      fi
    fi

    echo "  ⏳ Waiting for compilation... (${elapsed}s/${SERVE_TIMEOUT}s)"
  done

  log_fail "ng serve timed out after ${SERVE_TIMEOUT}s (${label})"
  cat "${serve_log}"
  cleanup
  return 1
}

# =====================================================
# Print configuration
# =====================================================
log_step "Configuration"
echo "  ANGULAR_VERSION:  ${ANGULAR_VERSION}"
echo "  FROM_VERSION:     ${FROM_VERSION}"
echo "  TO_VERSION:       ${TO_VERSION}"
echo "  REGISTRY_URL:     ${REGISTRY_URL}"
echo "  NPM_AUTH:         ${NPM_AUTH:0:6}****"
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

# =====================================================
# STEP 2: Configure npm registry (global + project .npmrc)
# =====================================================
log_step "Step 2: Configuring .npmrc"

# Write project-level .npmrc (npm install / ng update read this)
cat > .npmrc << EOF
@spartacus:registry=${REGISTRY_URL}
//${REGISTRY_HOST}/:_auth=${NPM_AUTH}
EOF

log_ok ".npmrc created"
echo "  @spartacus:registry=${REGISTRY_URL}"
echo "  //${REGISTRY_HOST}/:_auth=****"

# =====================================================
# STEP 3: Install previous Spartacus release
# =====================================================
log_step "Step 3: Installing Spartacus ${FROM_VERSION}"

# All available Spartacus features (from schema.json enum)
ALL_FEATURES=(\
  "ASM" \
  "ASM-Customer-360" \
  "Import-Export" \
  "Saved-Cart" \
  "Quick-Order" \
  "CDC" \
  "CDC-B2B" \
  "CDP" \
  "CDS" \
  "Cart" \
  "WishList" \
  "Checkout" \
  "Checkout-B2B" \
  "Checkout-Scheduled-Replenishment" \
  "Order" \
  "Order-Document-Flow" \
  "OPPS" \
  "Digital-Payments" \
  "OPF-Checkout" \
  "Punchout" \
  "Customer-Ticketing" \
  "Administration" \
  "Order-Approval" \
  "Organization-User-Registration" \
  "Unit-Order" \
  "Account-Summary" \
  "Bulk-Pricing" \
  "Image-Zoom" \
  "Future-Stock" \
  "PDF-Invoices" \
  "Product-Variants" \
  "Product-Multi-Dimensional-Selector" \
  "Product-Multi-Dimensional-List" \
  "VC-Configurator" \
  "Textfield-Configurator" \
  "CPQ-Configurator" \
  "Qualtrics" \
  "Requested-Delivery-Date" \
  "Estimated-Delivery-Date" \
  "S4HANA-Order-Management" \
  "cpq-quote" \
  "s4-service" \
  "Subscription-Billing" \
  "OMF" \
  "SmartEdit" \
  "Store-Finder" \
  "Personalization" \
  "Segment-Refs" \
  "TMS-GTM" \
  "TMS-AEPL" \
  "Pickup-In-Store" \
  "User-Account" \
  "User-Profile" \
  "Quote" \
)

# Install the schematics package first via npm (respects .npmrc _auth),
# then run ng add which detects it's already installed and just runs schematics.
npm install --save-dev "@spartacus/schematics@${FROM_VERSION}"
npx ng add "@spartacus/schematics@${FROM_VERSION}" \
  --base-url="${BASE_URL}" \
  --features ${ALL_FEATURES[@]} \
  --skip-confirmation

log_ok "Spartacus ${FROM_VERSION} installed"

echo "\nInstalled @spartacus packages:"
grep '"@spartacus/' package.json | head -20

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

# Commit so ng update has a clean working tree
git add -A
git commit -m "chore: install Spartacus ${FROM_VERSION}" --no-verify

# =====================================================
# STEP 5: Run ng update to new version
# =====================================================
log_step "Step 5: Upgrading to Spartacus ${TO_VERSION}"

# Pre-install the new schematics via npm (respects .npmrc _auth),
# then ng update will use the already-fetched package.
npm install --save-dev "@spartacus/schematics@${TO_VERSION}"
npx ng update "@spartacus/schematics@${TO_VERSION}"

log_ok "ng update completed"

echo "\nUpdated @spartacus packages:"
grep '"@spartacus/' package.json | head -40

# =====================================================
# STEP 6: Verify app works after upgrade
# =====================================================
log_step "Step 6: Building app with Spartacus ${TO_VERSION}"

npx ng build 2>&1 || {
  log_fail "Build failed after upgrade to Spartacus ${TO_VERSION}"
  exit 1
}
log_ok "Build succeeded with Spartacus ${TO_VERSION}"

verify_app_starts "after-upgrade"

# =====================================================
# Summary
# =====================================================
log_step "Summary"

echo "  App location:      ${APP_DIR}"
echo "  Angular version:   ${ANGULAR_VERSION}"
echo "  From version:      ${FROM_VERSION}"
echo "  To version:        ${TO_VERSION}"
echo "  Registry:          ${REGISTRY_URL}"
echo ""

# Check all @spartacus packages are on target version
MISMATCHED=$(grep '"@spartacus/' package.json | grep -v "~${TO_VERSION}\|\"${TO_VERSION}" | grep -v "schematics" || true)
if [[ -n "$MISMATCHED" ]]; then
  log_warn "Some @spartacus packages are NOT on ${TO_VERSION}:"
  echo "$MISMATCHED"
else
  log_ok "All @spartacus packages bumped to ${TO_VERSION}"
fi

log_ok "Upgrade test completed successfully! 🎉"

