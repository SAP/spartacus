# Testing Spartacus Schematics Upgrade

The `test-customer-upgrade.sh` script simulates a real customer upgrading Spartacus — it creates a fresh Angular app, installs an older Spartacus version, then runs `ng update` to upgrade to a newer version and verifies everything still builds.

## Prerequisites

- **Node 22+** and **npm 10+**
- Access to the SAP Spartacus npm registry (token in `~/.npmrc` or `scripts/install/config.sh`)
- **Verdaccio** (optional, for testing unpublished versions locally)

## Quick Start

### Run from the repo root

```bash
# Minimal — auto-detects everything:
#   TO_VERSION  → from projects/schematics/package.json
#   FROM_VERSION → latest published release before TO_VERSION
#   Registry    → from scripts/install/config.sh (NPM_URL)
IS_CI=false ./ci-scripts/test-customer-upgrade.sh
```

### Upgrade to a local Verdaccio build

For full Verdaccio setup and publishing instructions, see:
- [Schematics README → Developing schematics](../projects/schematics/README.md#developing-schematics)
- [Self-publishing Spartacus libraries](../docs/self-publishing-spartacus-libraries.md)

```bash
# 1. Start Verdaccio
verdaccio

# 2. Build and publish libs to Verdaccio
#    (see projects/schematics/README.md → "Publishing to verdaccio")

# 3. Run the upgrade test
IS_CI=false \
TO_REGISTRY=http://localhost:4873/ \
  ./ci-scripts/test-customer-upgrade.sh
```

### Fully explicit (all overrides)

```bash
IS_CI=false \
FROM_VERSION=221121.7.0 \
TO_VERSION=221121.10.0-3 \
SPARTACUS_REGISTRY=https://73554900100900004337.dev.npmsrv.base.repositories.cloud.sap/ \
TO_REGISTRY=http://localhost:4873/ \
SKIP_START_CHECK=true \
  ./ci-scripts/test-customer-upgrade.sh
```

## What the Script Does

| Step | Description |
|------|-------------|
| 1 | Creates a fresh Angular app (`ng new`) |
| 2 | Configures `.npmrc` to point `@spartacus` at the registry |
| 3 | Installs Spartacus `FROM_VERSION` with all features (`ng add @spartacus/schematics`) |
| 4 | Builds the app (`ng build`) and optionally starts it (`ng serve`) |
| 5 | Runs `ng update @spartacus/schematics@TO_VERSION` to upgrade |
| 6 | Builds and verifies the app again after upgrade |

Every step is committed to the test app's git repo so you can inspect what changed.

## Environment Variables

All optional — smart defaults apply.

| Variable | Default | Description |
|----------|---------|-------------|
| `IS_CI` | `true` | Set to `false` for local runs. Affects `WORK_DIR` default. |
| `FROM_VERSION` | *(auto-detected)* | Spartacus version to install first. Auto-detects the latest published release before `TO_VERSION`. |
| `TO_VERSION` | *(from package.json)* | Version to upgrade to. Reads from `projects/schematics/package.json`. |
| `SPARTACUS_REGISTRY` | *(from config.sh)* | Registry hosting Spartacus packages. Resolution: env var → `NPM_URL` → `~/.npmrc`. |
| `SPARTACUS_REGISTRY_TOKEN` | *(from config.sh)* | Auth token for the registry. Resolution: env var → `NPM_TOKEN` → `~/.npmrc`. |
| `TO_REGISTRY` | same as `SPARTACUS_REGISTRY` | Registry hosting `TO_VERSION`. Use `http://localhost:4873/` for local Verdaccio. |
| `TO_REGISTRY_TOKEN` | *(empty)* | Auth token for `TO_REGISTRY`. Verdaccio typically needs none. |
| `ANGULAR_VERSION` | `21.1.0` | Angular CLI version for `ng new`. |
| `BASE_URL` | `https://40.76.109.9:9002` | OCC backend URL passed to `ng add`. |
| `APP_NAME` | `spartacus-fresh` | Name of the generated test app. |
| `WORK_DIR` | `$TMPDIR` or `/tmp` | Directory where the test app is created. |
| `SKIP_START_CHECK` | `false` | Set to `true` to skip `ng serve` verification (faster). |
| `SERVE_TIMEOUT` | `120` | Seconds to wait for `ng serve` to compile. |
| `STRICT_INSTALL` | `true` | `true` = fail if `npm install` errors after upgrade. `false` = warn and continue (useful for debugging). |

## Inspecting Results

The test app is **not cleaned up** after the script finishes. You can inspect it:

```bash
cd /tmp/spartacus-fresh    # or wherever WORK_DIR/APP_NAME points

# See all steps
git log --oneline

# Check what ng update changed
git diff HEAD~2 -- package.json

# Check installed versions
grep '"@spartacus/' package.json
```

To clean up manually:

```bash
rm -rf /tmp/spartacus-fresh
```

## Troubleshooting

### `SPARTACUS_REGISTRY not set and could not be auto-detected`

The script needs a registry to fetch `@spartacus/*` packages. Either:
- Ensure `scripts/install/config.sh` has `NPM_URL` and `NPM_TOKEN` set, or
- Set them explicitly: `SPARTACUS_REGISTRY=... SPARTACUS_REGISTRY_TOKEN=...`, or
- Configure `~/.npmrc` with `@spartacus:registry=...` and the matching `_auth` token.

### `npm install failed after upgrade`

Peer dependency conflicts after `ng update`. Options:
- Run with `STRICT_INSTALL=false` to continue past the error and inspect
- Check the generated `package.json` for version mismatches
- Verify that all `@spartacus/*` packages were bumped (the script prints a diff)

### `@spartacus/schematics@X.Y.Z NOT found on registry`

The `TO_VERSION` hasn't been published to the target registry yet. If using Verdaccio:
1. Build the libs: `npm run build` (in the schematics project)
2. Publish: run `ts-node ./tools/schematics/testing.ts` and select "publish"
3. Verify: `curl -s http://localhost:4873/@spartacus%2fschematics | node -p "Object.keys(JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).versions)"`

### Feature toggle errors after upgrade

Expected. The migration schematics comment out outdated feature toggles with `// ✅` markers. The build may show TypeScript errors for toggles that were removed in the new version.

