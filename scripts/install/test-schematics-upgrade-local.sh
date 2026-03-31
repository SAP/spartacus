#!/bin/zsh
#
# test-schematics-upgrade-local.sh
#
# Same as test-schematics-upgrade.sh, but uses a local Verdaccio registry
# instead of a remote npm registry. Builds Spartacus libs from source,
# publishes them to Verdaccio, then runs the upgrade test.
#
# Flow:
#   1. Start local Verdaccio
#   2. Build Spartacus libs from the current worktree
#   3. Publish built packages to Verdaccio
#   4. Create a fresh Angular app
#   5. Install previous Spartacus release (from Verdaccio or upstream)
#   6. Verify the app builds/starts
#   7. Run ng update to the new version (from Verdaccio)
#   8. Verify the app builds/starts after upgrade
#   9. Stop Verdaccio
#
# Prerequisites:
#   - Node 22+, npm 10+
#   - Verdaccio installed globally (npm i -g verdaccio@5) or locally
#   - npm-cli-login installed globally (npm i -g npm-cli-login)
#
# Usage:
#   chmod +x test-schematics-upgrade-local.sh
#
#   # Minimal (uses defaults — assumes you're in the spartacus repo root):
#   ./scripts/install/test-schematics-upgrade-local.sh
#
#   # Custom versions:
#   FROM_VERSION=221121.7.0 \
#   TO_VERSION=221121.9.0 \
#   ./scripts/install/test-schematics-upgrade-local.sh
#
#   # Skip build (reuse previously published packages in Verdaccio):
#   SKIP_BUILD=true ./scripts/install/test-schematics-upgrade-local.sh
#
# Environment variables:
#   ANGULAR_VERSION     - Angular CLI version to scaffold with (default: 21.1.0)
#   FROM_VERSION        - Spartacus version to install first (default: 221121.7.0)
#   TO_VERSION          - Spartacus version to upgrade to (default: 221121.9.0)
#   BASE_URL            - OCC backend URL (default: https://40.76.109.9:9002)
#   APP_NAME            - name of the test app (default: spartacus-fresh)
#   WORK_DIR            - directory to create the app in (default: /tmp)
#   SPARTACUS_DIR       - path to the Spartacus repo root (default: auto-detected)
#   VERDACCIO_PORT      - Verdaccio port (default: 4873)
#   VERDACCIO_CONFIG    - path to Verdaccio config.yaml (default: <SPARTACUS_DIR>/scripts/install/config.yaml)
#   SKIP_BUILD          - set to "true" to skip building/publishing (reuse existing Verdaccio storage) (default: false)
#   SKIP_START_CHECK    - set to "true" to skip ng serve verification (default: false)
#   SERVE_TIMEOUT       - seconds to wait for ng serve to compile (default: 120)
#

set -e

# --- Auto-detect Spartacus repo root ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SPARTACUS_DIR="${SPARTACUS_DIR:-$(cd "${SCRIPT_DIR}/../.." && pwd)}"

if [[ ! -f "${SPARTACUS_DIR}/package.json" ]]; then
  echo "❌ Cannot find Spartacus repo root at ${SPARTACUS_DIR}"
  echo "   Set SPARTACUS_DIR=/path/to/spartacus"
  exit 1
fi

# --- Configuration ---
ANGULAR_VERSION="${ANGULAR_VERSION:-21.1.0}"
FROM_VERSION="${FROM_VERSION:-221121.7.0}"
TO_VERSION="${TO_VERSION:-221121.9.0}"
BASE_URL="${BASE_URL:-https://40.76.109.9:9002}"
APP_NAME="${APP_NAME:-spartacus-fresh}"
WORK_DIR="${WORK_DIR:-/tmp}"
SKIP_BUILD="${SKIP_BUILD:-false}"
SKIP_START_CHECK="${SKIP_START_CHECK:-false}"
SERVE_TIMEOUT="${SERVE_TIMEOUT:-120}"
VERDACCIO_PORT="${VERDACCIO_PORT:-4873}"
VERDACCIO_CONFIG="${VERDACCIO_CONFIG:-${SCRIPT_DIR}/config.yaml}"
VERDACCIO_URL="http://localhost:${VERDACCIO_PORT}/"
APP_DIR="${WORK_DIR}/${APP_NAME}"
SERVE_PORT=4200

# Packages to publish (dist path : source path)
SPARTACUS_PROJECTS=(
  "dist/core"
  "dist/storefrontlib"
  "dist/assets"
  "dist/checkout"
  "dist/product"
  "dist/setup"
  "dist/cart"
  "dist/order"
  "dist/asm"
  "dist/user"
  "dist/organization"
  "dist/storefinder"
  "dist/tracking"
  "dist/qualtrics"
  "dist/quote"
  "dist/smartedit"
  "dist/customer-ticketing"
  "dist/subscription-billing"
  "dist/cds"
  "dist/cdc"
  "dist/cdp"
  "dist/opps"
  "dist/epd-visualization"
  "dist/opf"
  "dist/punchout"
  "dist/product-configurator"
  "dist/product-multi-dimensional"
  "dist/pickup-in-store"
  "dist/pdf-invoices"
  "dist/estimated-delivery-date"
  "dist/requested-delivery-date"
  "dist/s4om"
  "dist/omf"
  "dist/cpq-quote"
  "dist/segment-refs"
  "dist/s4-service"
  "dist/digital-payments"
  "projects/storefrontstyles"
  "projects/schematics"
)

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

# --- Cleanup ---
VERDACCIO_PID=""

cleanup() {
  # Kill ng serve if running
  if [[ -n "$SERVE_PID" ]]; then
    kill "$SERVE_PID" 2>/dev/null || true
    wait "$SERVE_PID" 2>/dev/null || true
    unset SERVE_PID
  fi
  # Kill Verdaccio if we started it
  if [[ -n "$VERDACCIO_PID" ]]; then
    echo "\nStopping Verdaccio (PID: ${VERDACCIO_PID})..."
    kill "$VERDACCIO_PID" 2>/dev/null || true
    wait "$VERDACCIO_PID" 2>/dev/null || true
    unset VERDACCIO_PID
  fi
  # Restore npm @spartacus registry to default
  npm config delete @spartacus:registry 2>/dev/null || true
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

wait_for_verdaccio() {
  local max_wait=30
  local elapsed=0
  echo "  Waiting for Verdaccio to be ready on port ${VERDACCIO_PORT}..."
  while [[ $elapsed -lt $max_wait ]]; do
    if curl -s "http://localhost:${VERDACCIO_PORT}/" > /dev/null 2>&1; then
      return 0
    fi
    sleep 2
    elapsed=$((elapsed + 2))
  done
  log_fail "Verdaccio did not start within ${max_wait}s"
  return 1
}

# =====================================================
# Print configuration
# =====================================================
log_step "Configuration"
echo "  SPARTACUS_DIR:    ${SPARTACUS_DIR}"
echo "  ANGULAR_VERSION:  ${ANGULAR_VERSION}"
echo "  FROM_VERSION:     ${FROM_VERSION}"
echo "  TO_VERSION:       ${TO_VERSION}"
echo "  VERDACCIO_URL:    ${VERDACCIO_URL}"
echo "  VERDACCIO_CONFIG: ${VERDACCIO_CONFIG}"
echo "  BASE_URL:         ${BASE_URL}"
echo "  APP_DIR:          ${APP_DIR}"
echo "  SKIP_BUILD:       ${SKIP_BUILD}"
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

if ! command -v verdaccio &> /dev/null; then
  log_warn "verdaccio not found globally. Installing..."
  npm i -g verdaccio@5
fi
log_ok "verdaccio $(verdaccio --version 2>/dev/null || echo 'installed')"

if ! command -v npm-cli-login &> /dev/null; then
  log_warn "npm-cli-login not found globally. Installing..."
  npm i -g npm-cli-login
fi
log_ok "npm-cli-login installed"

# Clean up previous test app
if [[ -d "${APP_DIR}" ]]; then
  log_warn "Removing existing ${APP_DIR}"
  rm -rf "${APP_DIR}"
fi

# =====================================================
# STEP 1: Start Verdaccio
# =====================================================
log_step "Step 1: Starting local Verdaccio"

# Kill any existing Verdaccio on the same port
EXISTING_PID=$(lsof -nP -i4TCP:${VERDACCIO_PORT} 2>/dev/null | grep LISTEN | tr -s ' ' | cut -d ' ' -f 2 || true)
if [[ -n "${EXISTING_PID}" ]]; then
  log_warn "Verdaccio already running on port ${VERDACCIO_PORT} (PID: ${EXISTING_PID}). Killing it."
  kill "${EXISTING_PID}" 2>/dev/null || true
  sleep 2
fi

verdaccio --config "${VERDACCIO_CONFIG}" --listen "${VERDACCIO_PORT}" &
VERDACCIO_PID=$!
echo "  Verdaccio PID: ${VERDACCIO_PID}"

wait_for_verdaccio || exit 1
log_ok "Verdaccio running at ${VERDACCIO_URL}"

# Login to Verdaccio
npm-cli-login -u verdaccio-user -p 1234abcd -e verdaccio-user@spartacus.com -r "${VERDACCIO_URL}"
log_ok "Logged in to Verdaccio"

# Point npm @spartacus scope to local Verdaccio
npm config set @spartacus:registry "${VERDACCIO_URL}"
log_ok "@spartacus:registry → ${VERDACCIO_URL}"

# =====================================================
# STEP 2: Build & publish Spartacus libs (optional)
# =====================================================
if [[ "$SKIP_BUILD" == "true" ]]; then
  log_step "Step 2: Skipping build (SKIP_BUILD=true)"
  log_warn "Assuming packages are already published to Verdaccio"
else
  log_step "Step 2: Building and publishing Spartacus libs"

  cd "${SPARTACUS_DIR}"

  echo "  Installing dependencies..."
  npm install

  echo "  Building all libs..."
  npm run build:libs

  echo "  Publishing packages to Verdaccio..."
  local_publish_count=0
  for project_path in ${SPARTACUS_PROJECTS[@]}; do
    local pkg_dir="${SPARTACUS_DIR}/${project_path}"
    if [[ -d "${pkg_dir}" && -f "${pkg_dir}/package.json" ]]; then
      local pkg_name=$(node -p "require('${pkg_dir}/package.json').name" 2>/dev/null || echo "unknown")
      local pkg_version=$(node -p "require('${pkg_dir}/package.json').version" 2>/dev/null || echo "unknown")
      echo "  📦 Publishing ${pkg_name}@${pkg_version} from ${project_path}"
      (cd "${pkg_dir}" && npm publish --registry="${VERDACCIO_URL}" --no-git-tag-version 2>&1) || {
        log_warn "Failed to publish ${project_path} (may already exist)"
      }
      local_publish_count=$((local_publish_count + 1))
    else
      log_warn "Skipping ${project_path} (not found or no package.json)"
    fi
  done

  log_ok "Published ${local_publish_count} packages to Verdaccio"
fi

# =====================================================
# STEP 3: Create fresh Angular app
# =====================================================
log_step "Step 3: Creating fresh Angular ${ANGULAR_VERSION} app"

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
# STEP 4: Configure .npmrc to point to Verdaccio
# =====================================================
log_step "Step 4: Configuring .npmrc for Verdaccio"

cat > .npmrc << EOF
@spartacus:registry=${VERDACCIO_URL}
EOF

log_ok ".npmrc created"
echo "  @spartacus:registry=${VERDACCIO_URL}"

# =====================================================
# STEP 5: Install previous Spartacus release
# =====================================================
log_step "Step 5: Installing Spartacus ${FROM_VERSION}"

npm install --save-dev "@spartacus/schematics@${FROM_VERSION}"
npx ng add "@spartacus/schematics@${FROM_VERSION}" \
  --base-url="${BASE_URL}" \
  --features ${ALL_FEATURES[@]} \
  --skip-confirmation

log_ok "Spartacus ${FROM_VERSION} installed"

echo "\nInstalled @spartacus packages:"
grep '"@spartacus/' package.json | head -30

# =====================================================
# STEP 6: Verify app works with previous version
# =====================================================
log_step "Step 6: Building app with Spartacus ${FROM_VERSION}"

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
# STEP 7: Run ng update to new version
# =====================================================
log_step "Step 7: Upgrading to Spartacus ${TO_VERSION}"

npm install --save-dev "@spartacus/schematics@${TO_VERSION}"
npx ng update "@spartacus/schematics@${TO_VERSION}"

log_ok "ng update completed"

echo "\nUpdated @spartacus packages:"
grep '"@spartacus/' package.json | head -40

# =====================================================
# STEP 8: Verify app works after upgrade
# =====================================================
log_step "Step 8: Building app with Spartacus ${TO_VERSION}"

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
echo "  Spartacus source:  ${SPARTACUS_DIR}"
echo "  Angular version:   ${ANGULAR_VERSION}"
echo "  From version:      ${FROM_VERSION}"
echo "  To version:        ${TO_VERSION}"
echo "  Verdaccio:         ${VERDACCIO_URL}"
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

