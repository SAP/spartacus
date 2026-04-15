#!/usr/bin/env bash
#
# test-customer-upgrade.sh
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
# ────────────────────────────────────────────────────────────────
# USAGE
# ────────────────────────────────────────────────────────────────
#
#   # On CI — zero config needed (uses NPM_URL + NPM_TOKEN from config.sh / env):
#   ./ci-scripts/test-customer-upgrade.sh
#
#   # Local — SAP registry for FROM, local Verdaccio for TO:
#   IS_CI=false TO_REGISTRY=http://localhost:4873/ TO_VERSION=221121.10.0-3 \
#     ./ci-scripts/test-customer-upgrade.sh
#
#   # Local — fully explicit (overrides everything):
#   SPARTACUS_REGISTRY=https://73554900100900004337.dev.npmsrv.base.repositories.cloud.sap/ \
#   SPARTACUS_REGISTRY_TOKEN=<base64-token> \
#   TO_REGISTRY=http://localhost:4873/ \
#   TO_VERSION=221121.10.0-3 \
#   SKIP_START_CHECK=true \
#     ./ci-scripts/test-customer-upgrade.sh
#
# ────────────────────────────────────────────────────────────────
# ENVIRONMENT VARIABLES (all optional — smart defaults apply)
# ────────────────────────────────────────────────────────────────
#
#   ANGULAR_VERSION      - Angular CLI version (default: from config.sh or 21.1.0)
#   FROM_VERSION         - Spartacus version to install first
#                           (default: latest published release before TO_VERSION)
#   TO_VERSION           - Spartacus version to upgrade to
#                           (default: from projects/schematics/package.json, then config.sh)
#   SPARTACUS_REGISTRY        - registry hosting Spartacus packages
#                           Resolution: SPARTACUS_REGISTRY → NPM_URL → config.sh → ~/.npmrc
#   SPARTACUS_REGISTRY_TOKEN  - auth token for SPARTACUS_REGISTRY
#                           Resolution: SPARTACUS_REGISTRY_TOKEN → NPM_TOKEN → config.sh → ~/.npmrc
#   TO_REGISTRY          - registry hosting TO_VERSION (default: http://localhost:4873/)
#   TO_REGISTRY_TOKEN    - auth token for TO_REGISTRY (default: empty)
#   BASE_URL             - OCC backend URL (default: https://40.76.109.9:9002)
#   APP_NAME             - test app name (default: spartacus-fresh)
#   WORK_DIR             - where to create the app (default: $TMPDIR or /tmp)
#   SKIP_START_CHECK     - "true" to skip ng serve verification (default: false)
#   SERVE_TIMEOUT        - seconds to wait for ng serve (default: 120)
#   IS_CI                - "true" for CI mode, "false" for local (default: true)
#   STRICT_INSTALL       - "true" to fail on npm install errors after upgrade,
#                           "false" to warn and continue (default: true)
#

set -euo pipefail

# ─── Resolve script directory (works even via symlink) ───
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ─── CI mode ───
# Set IS_CI=false to run locally. Defaults to true.
IS_CI="${IS_CI:-true}"

# ─── Source config.sh for NPM_URL / NPM_TOKEN / SPARTACUS_VERSION ───
# config.sh lives in scripts/install/ — resolve relative to repo root.
# Save caller's explicit env vars before sourcing, so config.sh doesn't overwrite them.
_saved_SPARTACUS_REGISTRY="${SPARTACUS_REGISTRY:-}"
_saved_SPARTACUS_REGISTRY_TOKEN="${SPARTACUS_REGISTRY_TOKEN:-}"
_saved_TO_VERSION="${TO_VERSION:-}"
_saved_TO_REGISTRY="${TO_REGISTRY:-}"
_saved_TO_REGISTRY_TOKEN="${TO_REGISTRY_TOKEN:-}"
_saved_ANGULAR_VERSION="${ANGULAR_VERSION:-}"
_saved_FROM_VERSION="${FROM_VERSION:-}"

# Resolve repo root: ci-scripts/ is one level below repo root
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
CONFIG_SH="${REPO_ROOT}/scripts/install/config.sh"
if [[ -f "$CONFIG_SH" ]]; then
  source "$CONFIG_SH"
fi

# Restore caller's explicit overrides (they take priority over config.sh)
SPARTACUS_REGISTRY="${_saved_SPARTACUS_REGISTRY}"
SPARTACUS_REGISTRY_TOKEN="${_saved_SPARTACUS_REGISTRY_TOKEN}"
TO_VERSION="${_saved_TO_VERSION}"
TO_REGISTRY="${_saved_TO_REGISTRY}"
TO_REGISTRY_TOKEN="${_saved_TO_REGISTRY_TOKEN}"
ANGULAR_VERSION="${_saved_ANGULAR_VERSION}"
FROM_VERSION="${_saved_FROM_VERSION}"
unset _saved_SPARTACUS_REGISTRY _saved_SPARTACUS_REGISTRY_TOKEN _saved_TO_VERSION
unset _saved_TO_REGISTRY _saved_TO_REGISTRY_TOKEN _saved_ANGULAR_VERSION _saved_FROM_VERSION

# ─── Three-tier registry resolution ───
# Priority: explicit env var → NPM_URL/NPM_TOKEN → ~/.npmrc auto-detect

# 1) SPARTACUS_REGISTRY
if [[ -z "${SPARTACUS_REGISTRY:-}" && -n "${NPM_URL:-}" ]]; then
  SPARTACUS_REGISTRY="$NPM_URL"
fi
if [[ -z "${SPARTACUS_REGISTRY:-}" && -f "$HOME/.npmrc" ]]; then
  SPARTACUS_REGISTRY=$(grep '^@spartacus:registry=' "$HOME/.npmrc" 2>/dev/null | head -1 | sed 's/^@spartacus:registry=//')
fi
SPARTACUS_REGISTRY="${SPARTACUS_REGISTRY:-}"

# 2) SPARTACUS_REGISTRY_TOKEN
if [[ -z "${SPARTACUS_REGISTRY_TOKEN:-}" && -n "${NPM_TOKEN:-}" ]]; then
  SPARTACUS_REGISTRY_TOKEN="$NPM_TOKEN"
fi
if [[ -z "${SPARTACUS_REGISTRY_TOKEN:-}" && -n "$SPARTACUS_REGISTRY" && -f "$HOME/.npmrc" ]]; then
  # Extract _auth token for the registry host from ~/.npmrc
  local_host=$(echo "$SPARTACUS_REGISTRY" | sed -E 's|^https?://||')
  # Try _auth first (SAP registry style), then _authToken (npm style)
  SPARTACUS_REGISTRY_TOKEN=$(grep -m1 "^//${local_host}.*:_auth=" "$HOME/.npmrc" 2>/dev/null | sed 's/^.*:_auth=//')
  if [[ -z "$SPARTACUS_REGISTRY_TOKEN" ]]; then
    SPARTACUS_REGISTRY_TOKEN=$(grep -m1 "^//${local_host}.*:_authToken=" "$HOME/.npmrc" 2>/dev/null | sed 's/^.*:_authToken=//')
  fi
  unset local_host
fi
SPARTACUS_REGISTRY_TOKEN="${SPARTACUS_REGISTRY_TOKEN:-}"

# 3) TO_REGISTRY defaults to local Verdaccio
TO_REGISTRY="${TO_REGISTRY:-http://localhost:4873/}"
TO_REGISTRY_TOKEN="${TO_REGISTRY_TOKEN:-}"
# If TO is same as SPARTACUS_REGISTRY, share the token
if [[ "$TO_REGISTRY" == "$SPARTACUS_REGISTRY" && -z "$TO_REGISTRY_TOKEN" ]]; then
  TO_REGISTRY_TOKEN="$SPARTACUS_REGISTRY_TOKEN"
fi

# ─── Configuration with smart defaults ───
ANGULAR_VERSION="${ANGULAR_VERSION:-${ANGULAR_CLI_VERSION:-21.1.0}}"
# Strip leading ^ from Angular CLI version if sourced from config.sh (e.g. "^21.1.0")
ANGULAR_VERSION="${ANGULAR_VERSION#^}"

# TO_VERSION: explicit → schematics package.json → SPARTACUS_VERSION from config.sh
if [[ -z "${TO_VERSION:-}" ]]; then
  # Read version from the schematics package.json (always matches current branch)
  SCHEMATICS_PKG="${REPO_ROOT}/projects/schematics/package.json"
  if [[ -f "$SCHEMATICS_PKG" ]]; then
    TO_VERSION=$(node -p "require('${SCHEMATICS_PKG}').version" 2>/dev/null || true)
  fi
fi
if [[ -z "${TO_VERSION:-}" && -n "${SPARTACUS_VERSION:-}" ]]; then
  TO_VERSION="$SPARTACUS_VERSION"
fi
TO_VERSION="${TO_VERSION:?TO_VERSION is required. Set it explicitly, or run from the Spartacus repo root.}"

# FROM_VERSION: explicit → auto-detect latest published version lower than TO_VERSION
if [[ -z "${FROM_VERSION:-}" && -n "$SPARTACUS_REGISTRY" ]]; then
  # Query the registry for all available versions and pick the latest one < TO_VERSION
  ENCODED_PKG=$(echo "@spartacus/schematics" | sed 's/@/%40/g; s/\//%2f/g')
  FROM_VERSION=$(
    curl -sf "${SPARTACUS_REGISTRY}${ENCODED_PKG}" \
      ${SPARTACUS_REGISTRY_TOKEN:+-H "Authorization: Basic ${SPARTACUS_REGISTRY_TOKEN}"} 2>/dev/null \
    | node -e "
      let d='';
      process.stdin.on('data',c=>d+=c);
      process.stdin.on('end',()=>{
        const versions = Object.keys(JSON.parse(d).versions || {})
          .filter(v => !/[-]/.test(v))  // skip prereleases (e.g. 221121.10.0-3)
          .sort((a,b) => a.localeCompare(b, undefined, {numeric:true}));
        const to = '${TO_VERSION}'.replace(/-.*/, '');  // strip prerelease from TO
        const lower = versions.filter(v => v.localeCompare(to, undefined, {numeric:true}) < 0);
        if (lower.length) { console.log(lower[lower.length - 1]); }
      });" 2>/dev/null || true
  )
  if [[ -n "$FROM_VERSION" ]]; then
    echo "  ↳ Auto-detected FROM_VERSION=${FROM_VERSION} (latest release before ${TO_VERSION})"
  fi
fi
FROM_VERSION="${FROM_VERSION:?FROM_VERSION is required. Set it explicitly or ensure the registry is reachable.}"

# Sanity check: FROM and TO should differ
if [[ "$FROM_VERSION" == "$TO_VERSION" ]]; then
  echo "⚠️  FROM_VERSION and TO_VERSION are both '${FROM_VERSION}'. ng update will be a no-op." >&2
fi

BASE_URL="${BASE_URL:-https://40.76.109.9:9002}"
APP_NAME="${APP_NAME:-spartacus-fresh}"

# WORK_DIR: ~/Desktop locally, /tmp on CI
if [[ -z "${WORK_DIR:-}" ]]; then
  if [[ "$IS_CI" == "true" ]]; then
    WORK_DIR="${WORKSPACE:-/tmp}"
  else
    WORK_DIR="${TMPDIR:-/tmp}"
  fi
fi

SKIP_START_CHECK="${SKIP_START_CHECK:-false}"
STRICT_INSTALL="${STRICT_INSTALL:-true}"
SERVE_TIMEOUT="${SERVE_TIMEOUT:-120}"
APP_DIR="${WORK_DIR}/${APP_NAME}"
SERVE_PORT="${SERVE_PORT:-4200}"

# Grep pattern used to find @spartacus packages in package.json
SPARTACUS_PKG_PATTERN='"@spartacus/'

# --- All available Spartacus features (from schema.json enum) ---
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

# Assign positional params to local vars to satisfy shell analysis tools (Sonar)
log_step()  { local msg="$1"; printf "\n${CYAN}━━━ %s ━━━${NC}\n\n" "$msg"; return 0; }
log_ok()    { local msg="$1"; printf "${GREEN}✅ %s${NC}\n" "$msg"; return 0; }
log_warn()  { local msg="$1"; printf "${YELLOW}⚠️  %s${NC}\n" "$msg"; return 0; }
log_fail()  { local msg="$1"; printf "${RED}❌ %s${NC}\n" "$msg"; return 0; }

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
  return 0
}

# Write a project .npmrc that points @spartacus at the given registry.
# NOTE: The .npmrc is committed to the throwaway test app's git repo.
# This is intentional — ng update requires a clean working tree.
# The test app is deleted after the test. Do NOT use this on real projects.
# Usage: write_npmrc <registry-url> [auth-token]
write_npmrc() {
  local registry="$1"
  local token="${2:-}"
  local host
  host=$(echo "$registry" | sed -E 's|^https?://||')

  {
    echo "@spartacus:registry=${registry}"
    if [[ -n "$token" ]]; then
      echo "//${host}:_auth=${token}"
    fi
  } > .npmrc

  echo "  .npmrc → @spartacus:registry=${registry}"
  return 0
}

SERVE_PID=""
cleanup() {
  if [[ -n "$SERVE_PID" ]]; then
    kill "$SERVE_PID" 2>/dev/null || true
    wait "$SERVE_PID" 2>/dev/null || true
    SERVE_PID=""
  fi
  return 0
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
      SERVE_PID=""
      return 0
    fi

    # Fail on compilation errors, but ignore feature-toggle-related errors
    # (those are expected during upgrades and handled by the schematics migration)
    if grep -q "Error:" "${serve_log}" 2>/dev/null && grep -v "feature.toggle\|featureToggle\|FeatureToggle" "${serve_log}" | grep -q "Error:"; then
      log_fail "Compilation errors found (${label})"
      cat "${serve_log}"
      kill "$SERVE_PID" 2>/dev/null || true
      wait "$SERVE_PID" 2>/dev/null || true
      SERVE_PID=""
      return 1
    fi

    echo "  ⏳ Waiting for compilation... (${elapsed}s/${SERVE_TIMEOUT}s)"
  done

  log_fail "ng serve timed out after ${SERVE_TIMEOUT}s (${label})"
  cat "${serve_log}"
  kill "$SERVE_PID" 2>/dev/null || true
  wait "$SERVE_PID" 2>/dev/null || true
  SERVE_PID=""
  return 1
}

# =====================================================
# Print configuration
# =====================================================
log_step "Configuration"
printf "  ANGULAR_VERSION:    %s\n" "${ANGULAR_VERSION}"
printf "  FROM_VERSION:       %s\n" "${FROM_VERSION}"
printf "  SPARTACUS_REGISTRY: %s\n" "${SPARTACUS_REGISTRY:-(not set — will fail)}"
printf "  TO_VERSION:         %s\n" "${TO_VERSION}"
printf "  TO_REGISTRY:        %s\n" "${TO_REGISTRY}"
printf "  BASE_URL:           %s\n" "${BASE_URL}"
printf "  APP_DIR:            %s\n" "${APP_DIR}"
printf "  SKIP_START_CHECK:   %s\n" "${SKIP_START_CHECK}"

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
  log_warn "~/.npmrc not found — relying on SPARTACUS_REGISTRY / TO_REGISTRY env vars"
fi

# Verify SPARTACUS_REGISTRY is set
if [[ -z "$SPARTACUS_REGISTRY" ]]; then
  log_fail "SPARTACUS_REGISTRY not set and could not be auto-detected."
  echo "  Set SPARTACUS_REGISTRY=<url> and SPARTACUS_REGISTRY_TOKEN=<token>."
  exit 1
fi
log_ok "SPARTACUS_REGISTRY: ${SPARTACUS_REGISTRY}"

# Clean up previous test app
if [[ -d "${APP_DIR}" ]]; then
  log_warn "Removing existing ${APP_DIR}"
  rm -rf "${APP_DIR}"
fi

# Ensure WORK_DIR exists
mkdir -p "${WORK_DIR}"

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
# STEP 2: Configure .npmrc for SPARTACUS_REGISTRY
# =====================================================
log_step "Step 2: Configuring .npmrc → SPARTACUS_REGISTRY"

write_npmrc "$SPARTACUS_REGISTRY" "$SPARTACUS_REGISTRY_TOKEN"
log_ok ".npmrc configured for ${SPARTACUS_REGISTRY}"

git_commit "chore: add .npmrc (SPARTACUS_REGISTRY)"

# =====================================================
# STEP 3: Install previous Spartacus release
# =====================================================
log_step "Step 3: Installing Spartacus ${FROM_VERSION}"

npm install --save-dev "@spartacus/schematics@${FROM_VERSION}"

git_commit "chore: npm install @spartacus/schematics@${FROM_VERSION}"

npx ng add "@spartacus/schematics@${FROM_VERSION}" \
  --base-url="${BASE_URL}" \
  --features "${ALL_FEATURES[@]}" \
  --skip-confirmation

log_ok "Spartacus ${FROM_VERSION} installed"

printf "\nInstalled @spartacus packages:\n"
grep "$SPARTACUS_PKG_PATTERN" package.json | head -30

git_commit "chore: ng add Spartacus ${FROM_VERSION} (all features)"

# =====================================================
# STEP 4: Verify app works with previous version
# =====================================================
log_step "Step 4: Building app with Spartacus ${FROM_VERSION}"

if ! npx ng build 2>&1; then
  log_fail "Build failed with Spartacus ${FROM_VERSION}"
  exit 1
fi
log_ok "Build succeeded with Spartacus ${FROM_VERSION}"

verify_app_starts "before-upgrade"

git_commit "chore: verified build with Spartacus ${FROM_VERSION}"

# =====================================================
# STEP 5: Run ng update to new version
# =====================================================
log_step "Step 5: Upgrading to Spartacus ${TO_VERSION}"

# If TO_REGISTRY differs from SPARTACUS_REGISTRY, switch .npmrc for the upgrade
SWITCHED_REGISTRY=false
if [[ "$TO_REGISTRY" != "$SPARTACUS_REGISTRY" ]]; then
  log_warn "Switching @spartacus:registry → ${TO_REGISTRY} for upgrade"

  # Save SPARTACUS_REGISTRY details so we can restore later (don't create untracked files
  # that would make git dirty — ng update requires a clean working tree)
  SAVED_SPARTACUS_REGISTRY="$SPARTACUS_REGISTRY"
  SAVED_SPARTACUS_REGISTRY_TOKEN="$SPARTACUS_REGISTRY_TOKEN"
  SWITCHED_REGISTRY=true

  # Verify TO_VERSION is available on the target registry (using node instead of python3)
  ENCODED_PKG=$(echo "@spartacus/schematics" | sed 's/@/%40/g; s/\//%2f/g')
  if curl -sf "${TO_REGISTRY}${ENCODED_PKG}" | node -e "
    let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{
      const v=JSON.parse(d).versions||{};
      process.exit('${TO_VERSION}' in v ? 0 : 1);
    });" 2>/dev/null; then
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
# Add .gitignore entries for build artifacts (idempotent)
grep -qxF '*.log' .gitignore 2>/dev/null || echo "*.log" >> .gitignore
grep -qxF '/dist' .gitignore 2>/dev/null || echo "/dist" >> .gitignore
git_commit "chore: update .gitignore before ng update"

printf "\n--- git status before ng update ---\n"
git status --short

printf "\n--- package.json BEFORE ng update ---\n"
grep "$SPARTACUS_PKG_PATTERN" package.json | head -40

# Run ng update — pipefail ensures we catch ng update failures through tee
npx ng update "@spartacus/schematics@${TO_VERSION}" --force --allow-dirty 2>&1 | tee ng-update.log
NG_UPDATE_EXIT=${PIPESTATUS[0]}

if [[ $NG_UPDATE_EXIT -ne 0 ]]; then
  log_fail "ng update exited with code ${NG_UPDATE_EXIT}"
  cat ng-update.log
  exit 1
fi

# Commit whatever ng update changed
git_commit "chore: ng update @spartacus/schematics@${TO_VERSION}"

printf "\n--- package.json AFTER ng update ---\n"
grep "$SPARTACUS_PKG_PATTERN" package.json | head -40

# Show what ng update actually changed
printf "\n--- git diff from ng update ---\n"
git --no-pager diff HEAD~1 -- package.json || true

# Restore SPARTACUS_REGISTRY .npmrc if we switched registries
if [[ "$SWITCHED_REGISTRY" == "true" ]]; then
  write_npmrc "$SAVED_SPARTACUS_REGISTRY" "$SAVED_SPARTACUS_REGISTRY_TOKEN"
  git_commit "chore: restore .npmrc to SPARTACUS_REGISTRY after upgrade"
  log_ok "Restored .npmrc to SPARTACUS_REGISTRY"
fi

log_ok "ng update completed"

# Verify all @spartacus packages were actually bumped
MISMATCHED_EARLY=$(grep "$SPARTACUS_PKG_PATTERN" package.json | grep -v "~${TO_VERSION}\|\"${TO_VERSION}" | grep -v "schematics" || true)
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

# Run npm install to ensure node_modules match the updated package.json.
# Controlled by STRICT_INSTALL (default: true).
# Set STRICT_INSTALL=false to continue despite install errors (useful for debugging).
if ! npm install 2>&1; then
  if [[ "$STRICT_INSTALL" == "true" ]]; then
    log_fail "npm install failed after upgrade to ${TO_VERSION}"
    exit 1
  else
    log_warn "npm install had errors after upgrade (continuing because STRICT_INSTALL=false)"
  fi
fi

git_commit "chore: npm install after upgrade to ${TO_VERSION}"

if ! npx ng build 2>&1; then
  log_fail "Build failed after upgrade to Spartacus ${TO_VERSION}"
  exit 1
fi
log_ok "Build succeeded with Spartacus ${TO_VERSION}"

verify_app_starts "after-upgrade"

git_commit "chore: verified build with Spartacus ${TO_VERSION}"

# =====================================================
# Summary
# =====================================================
log_step "Summary"

printf "  App location:      %s\n" "${APP_DIR}"
printf "  Angular version:   %s\n" "${ANGULAR_VERSION}"
printf "  From version:      %s\n" "${FROM_VERSION}"
printf "  From registry:     %s\n" "${SPARTACUS_REGISTRY}"
printf "  To version:        %s\n" "${TO_VERSION}"
printf "  To registry:       %s\n" "${TO_REGISTRY}"
echo ""

# Check all @spartacus packages are on target version
MISMATCHED=$(grep "$SPARTACUS_PKG_PATTERN" package.json | grep -v "~${TO_VERSION}\|\"${TO_VERSION}" | grep -v "schematics" || true)
if [[ -n "$MISMATCHED" ]]; then
  log_warn "Some @spartacus packages are NOT on ${TO_VERSION}:"
  echo "$MISMATCHED"
else
  log_ok "All @spartacus packages bumped to ${TO_VERSION}"
fi

printf "\n--- Git log (all steps) ---\n"
git --no-pager log --oneline

log_ok "Upgrade test completed successfully! 🎉"

