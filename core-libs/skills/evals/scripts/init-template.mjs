#!/usr/bin/env node
// @ts-check
/**
 * Provision the eval templates by delegating to the repo's MAINTAINED
 * install script (`scripts/install/run.sh install_npm`) — the same tool used
 * for release testing. We do NOT re-implement `ng new` / `ng add` here; that
 * logic lives in one place and the install-script owners keep it working.
 *
 * Flow:
 *   1. Run the install script to build a fresh Spartacus CSR app into
 *      scripts/install/apps/csr/ (SSR + PWA skipped via empty ports).
 *   2. Copy that app → evals/template-bare/  (no .claude/)
 *   3. Copy that app → evals/template-skills/ and inject
 *      .claude/skills/spartacus-developer/ from core-libs/skills/skills/.
 *
 *   With --snapshot: instead of (2)+(3), copy the CURRENT template-skills to
 *   template-skills-baseline (for `--mode=compare`: snapshot the skill state
 *   BEFORE you edit it, then edit, then run compare). If no template-skills
 *   exists yet, it builds one first.
 *
 * Env overrides (all optional):
 *   SPARTACUS_VERSION   default: the `release` dist-tag pinned below
 *   NPM_URL, SAP_RBSCTOKEN   private SAP registry + token (required by install)
 *   SKILLS_SRC          override the skill source dir
 *   SKIP_INSTALL_SCRIPT  reuse an existing scripts/install/apps/csr/ (debug)
 *
 * Requires SAP_RBSCTOKEN in the env (same as release testing).
 */
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const EVALS = resolve(HERE, '..');
const SKILLS_LIB = resolve(EVALS, '..');            // core-libs/skills
const REPO = resolve(SKILLS_LIB, '..', '..');        // spartacus repo root
const INSTALL_DIR = join(REPO, 'scripts', 'install');

// The @spartacus/skills package version is the single source of truth for the
// version to build against; the install script's config.sh should match it.
const SKILLS_PKG_VERSION = (() => {
  try { return JSON.parse(readFileSync(join(SKILLS_LIB, 'package.json'), 'utf8')).version; }
  catch { return undefined; }
})();
// Override via SPARTACUS_VERSION; otherwise fall back to the skills package
// version so the template matches what ships.
const SPARTACUS_VERSION = process.env.SPARTACUS_VERSION ?? SKILLS_PKG_VERSION ?? '221121.15.1';

// Mirror scripts/install/run.sh EXACTLY: BASE_DIR defaults to
// ../../../spartacus-<version> (relative to scripts/install), apps are created
// under $BASE_DIR/apps, and the CSR app dir is "csr". The install script builds
// the app THERE — not under scripts/install/apps — so we must look in the same
// place. Honors a BASE_DIR override the same way run.sh does.
const BASE_DIR = resolve(
  INSTALL_DIR,
  process.env.BASE_DIR ?? `../../../spartacus-${SPARTACUS_VERSION}`,
);
const CSR_APP = join(BASE_DIR, 'apps', 'csr');

const BARE = join(EVALS, 'template-bare');
const SKILLS = join(EVALS, 'template-skills');
const BASELINE = join(EVALS, 'template-skills-baseline');

const SKILL_SRC =
  process.env.SKILLS_SRC ??
  join(SKILLS_LIB, 'skills', 'spartacus-developer');

const isSnapshot = process.argv.includes('--snapshot');

function log(msg) { console.log(msg); }

function assertToken() {
  if (!process.env.SAP_RBSCTOKEN && !process.env.NPM_TOKEN) {
    console.error('✗ SAP_RBSCTOKEN (or NPM_TOKEN) not set. @spartacus/* live on');
    console.error('  the private SAP registry. Export it and retry (same as');
    console.error('  release testing).');
    process.exit(1);
  }
}

/** Warn if the app's Spartacus version drifts from the skills package. */
function checkVersionDrift() {
  const skillsVer = SKILLS_PKG_VERSION;
  if (skillsVer && SPARTACUS_VERSION !== skillsVer) {
    log(`⚠ Spartacus version ${SPARTACUS_VERSION} differs from @spartacus/skills ${skillsVer}. Set SPARTACUS_VERSION to align if intended.`);
  }
}

/** Build a fresh CSR app via the maintained install script. */
function buildFreshApp() {
  if (process.env.SKIP_INSTALL_SCRIPT && existsSync(CSR_APP)) {
    log(`▸ Reusing existing ${CSR_APP} (SKIP_INSTALL_SCRIPT set)`);
    return;
  }
  log(`\n=== Building fresh Spartacus CSR app via scripts/install (v${SPARTACUS_VERSION}) ===`);
  log('    (this delegates to the maintained release-test install script; ~15 min)');
  execFileSync('bash', ['./run.sh', 'install_npm'], {
    cwd: INSTALL_DIR,
    stdio: 'inherit',
    env: {
      ...process.env,
      SPARTACUS_VERSION,
      // Only build the CSR app — skip SSR and PWA (empty ports disable them).
      SSR_PORT: '',
      SSR_PWA_PORT: '',
      // Ensure the token the install script reads is populated from SAP_RBSCTOKEN.
      NPM_TOKEN: process.env.NPM_TOKEN || process.env.SAP_RBSCTOKEN || '',
    },
  });
  if (!existsSync(CSR_APP)) {
    console.error(`✗ Install script finished but ${CSR_APP} not found.`);
    process.exit(1);
  }
}

function injectSkill(dest) {
  const skillDest = join(dest, '.claude', 'skills', 'spartacus-developer');
  if (!existsSync(SKILL_SRC)) {
    console.error(`✗ Skill source not found: ${SKILL_SRC}`);
    process.exit(1);
  }
  mkdirSync(dirname(skillDest), { recursive: true });
  cpSync(SKILL_SRC, skillDest, { recursive: true });
  if (!existsSync(join(skillDest, 'SKILL.md'))) {
    console.error('✗ SKILL.md missing after copy — injection failed.');
    process.exit(1);
  }
}

function buildTemplates() {
  for (const dir of [BARE, SKILLS]) {
    if (existsSync(dir)) { log(`→ removing existing ${dir}`); rmSync(dir, { recursive: true, force: true }); }
  }
  log(`→ copying CSR app → template-bare`);
  cpSync(CSR_APP, BARE, { recursive: true });
  log(`→ copying CSR app → template-skills + injecting skill`);
  cpSync(CSR_APP, SKILLS, { recursive: true });
  injectSkill(SKILLS);
  log('✓ template-bare + template-skills ready (differ only in .claude/skills/)');
}

function snapshot() {
  if (!existsSync(SKILLS)) {
    log('template-skills missing — building templates first, then snapshotting.');
    buildFreshApp();
    buildTemplates();
  }
  if (existsSync(BASELINE)) { rmSync(BASELINE, { recursive: true, force: true }); }
  log(`→ snapshotting current template-skills → template-skills-baseline`);
  cpSync(SKILLS, BASELINE, { recursive: true });
  // Re-inject the CURRENT skill into template-skills so, after you edit the
  // real skill and re-run init (without --snapshot), the two differ. For now
  // baseline == current; the delta appears once you edit the skill and
  // rebuild template-skills.
  log('✓ template-skills-baseline captured. Now edit the skill and run:');
  log('    npm run init-template            # rebuild template-skills with edits');
  log('    npm run eval:compare');
}

// --- main ---
assertToken();
checkVersionDrift();
if (isSnapshot) {
  snapshot();
} else {
  buildFreshApp();
  buildTemplates();
  log('\nNext: `npm run eval:smoke` (gate), then `npm run eval:impact`.');
}
