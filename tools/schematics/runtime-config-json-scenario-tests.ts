/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * End-to-end scenario tests for CXSPA-12541 runtime config via /config.json.
 *
 * Usage:
 *   ts-node ./tools/schematics/runtime-config-json-scenario-tests.ts \
 *     --scenario all \
 *     --out-dir ~/Desktop/cx-test \
 *     --app-name myapp
 *
 * Flags:
 *   --scenario  A|B|C|all   Which scenario(s) to run (required)
 *   --out-dir   <path>       Directory to create apps in (required)
 *   --app-name  <name>       Base name for generated apps (required)
 *   --no-git                 Skip git init and commits in generated apps
 *
 * Scenarios:
 *   A  - Fresh install WITH config.json (New Hosting / CCV2): verifies opt-in wiring works
 *   B  - Fresh install WITHOUT config.json (ModelT): verifies opt-out leaves app clean
 *   C  - Existing app npm-updated to branch: verifies no unwanted wiring is introduced
 *
 * Each generated app gets a git repo with one commit per generation step so you
 * can inspect exactly what each schematic changed (git log / git show in the app dir).
 * Pass --no-git to skip this behavior.
 *
 * Prerequisites:
 *   1. Build all libs (first time or after source changes):
 *        npm run build:libs
 *   2. Build schematics and publish all packages to Verdaccio (keeps Verdaccio running):
 *        npx ts-node ./tools/schematics/testing --command "build core-libs/schematics"
 *      Note: do NOT use --command publish — it skips the schematics build and publishes
 *      uncompiled TypeScript, causing "no ng add actions" errors in the scenarios.
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { chalk } from '../chalk';

// ─── Constants ───────────────────────────────────────────────────────────────

const VERDACCIO_REGISTRY = 'http://localhost:4873/';
const PUBLIC_REGISTRY = 'https://registry.npmjs.org/';
const ANGULAR_CLI_VERSION = '21';
const DEFAULT_BASE_URL =
  'https://spartacus-demo.eastus.cloudapp.azure.com:8443';
const DEFAULT_BASE_SITE = 'electronics-spa';

// ─── Argument parsing ─────────────────────────────────────────────────────────

type Scenario = 'A' | 'B' | 'C' | 'all';

interface Args {
  scenario: Scenario;
  outDir: string;
  appName: string;
  noGit: boolean;
}

function parseArgs(): Args {
  const argv = process.argv.slice(2);
  const get = (flag: string): string | undefined => {
    const i = argv.indexOf(flag);
    return i !== -1 ? argv[i + 1] : undefined;
  };

  const scenario = get('--scenario');
  const outDir = get('--out-dir');
  const appName = get('--app-name');
  const noGit = argv.includes('--no-git');

  const validScenarios: Scenario[] = ['A', 'B', 'C', 'all'];

  if (!scenario || !outDir || !appName) {
    console.error(
      chalk.red(
        `\n❌ Missing required flags. Usage:\n\n` +
          `  ts-node ./tools/schematics/runtime-config-json-scenario-tests.ts \\\n` +
          `    --scenario A|B|C|all \\\n` +
          `    --out-dir ~/Desktop/cx-test \\\n` +
          `    --app-name myapp\n` +
          `\n  Optional: --no-git  (skip git init and commits in generated apps)\n`
      )
    );
    process.exit(1);
  }

  if (!validScenarios.includes(scenario as Scenario)) {
    console.error(
      chalk.red(
        `\n❌ Invalid --scenario "${scenario}". Must be one of: A, B, C, all\n`
      )
    );
    process.exit(1);
  }

  return {
    scenario: scenario as Scenario,
    outDir: outDir.replace(/^~/, os.homedir()),
    appName,
    noGit,
  };
}

// ─── Step runner ──────────────────────────────────────────────────────────────

interface ScenarioStats {
  passed: number;
  failed: number;
  errors: string[];
}

let currentStats: ScenarioStats = { passed: 0, failed: 0, errors: [] };

function step(label: string, fn: () => void): void {
  process.stdout.write(`  ${chalk.blue('▶')} ${label} ... `);
  try {
    fn();
    process.stdout.write(`${chalk.green('✅')}\n`);
    currentStats.passed++;
  } catch (e: any) {
    process.stdout.write(`${chalk.red('❌')}\n`);
    const message = e?.message ?? String(e);
    console.error(chalk.red(`     ${message.split('\n')[0]}`));
    currentStats.failed++;
    currentStats.errors.push(`${label}: ${message.split('\n')[0]}`);
  }
}

function resetStats(): ScenarioStats {
  currentStats = { passed: 0, failed: 0, errors: [] };
  return currentStats;
}

// ─── Shell helpers ────────────────────────────────────────────────────────────

function run(cmd: string, cwd?: string): void {
  execSync(cmd, { stdio: 'inherit', cwd });
}

function runSilent(cmd: string, cwd?: string): string {
  return execSync(cmd, { stdio: 'pipe', cwd }).toString().trim();
}

// ─── File assertion helpers ───────────────────────────────────────────────────

function assertFileExists(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Expected file to exist: ${filePath}`);
  }
}

function assertFileAbsent(filePath: string): void {
  if (fs.existsSync(filePath)) {
    throw new Error(`Expected file to be absent: ${filePath}`);
  }
}

function assertFileContains(filePath: string, text: string): void {
  assertFileExists(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  if (!content.includes(text)) {
    throw new Error(
      `Expected "${text}" in ${path.basename(filePath)} but it was not found`
    );
  }
}

function assertFileNotContains(filePath: string, text: string): void {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes(text)) {
    throw new Error(
      `Expected "${text}" to be absent from ${path.basename(filePath)} but it was found`
    );
  }
}

// ─── Git helpers ─────────────────────────────────────────────────────────────

let useGit = true; // set false when --no-git flag is passed

function gitInit(appDir: string): void {
  if (!useGit) return;
  run('git init', appDir);
  run('git config user.email "scenario-test@spartacus.local"', appDir);
  run('git config user.name "Scenario Test"', appDir);
}

function gitCommit(appDir: string, message: string): void {
  if (!useGit) return;
  run('git add -A', appDir);
  // Skip if nothing staged
  try {
    run(`git commit -m "${message}"`, appDir);
  } catch {
    // nothing to commit — step had no file changes (e.g. pure assertions)
  }
}

// ─── App creation ─────────────────────────────────────────────────────────────

function createApp(appDir: string, appName: string, registry?: string): void {
  const parentDir = path.dirname(appDir);
  fs.mkdirSync(parentDir, { recursive: true });

  const registryPrefix = registry ? `npm_config_registry=${registry} ` : '';

  run(
    `${registryPrefix}npx @angular/cli@${ANGULAR_CLI_VERSION} new ${appName}` +
      ` --standalone` +
      ` --skip-git` +
      ` --style scss` +
      ` --ssr false` +
      ` --file-name-style-guide=2016` +
      ` --skip-install` +
      ` --defaults`,
    parentDir
  );

  run(`npm install --legacy-peer-deps`, appDir);

  // Initialize git so each generation step is a traceable commit
  gitInit(appDir);
  gitCommit(appDir, 'chore: initial Angular app scaffold');
}

// ─── Scenario A ───────────────────────────────────────────────────────────────

function runScenarioA(outDir: string, baseName: string): ScenarioStats {
  const stats = resetStats();
  const appName = `${baseName}-scenario-a`;
  const appDir = path.join(outDir, appName);

  console.log(chalk.bold(`\n${'─'.repeat(60)}`));
  console.log(chalk.bold(`  Scenario A — Fresh install WITH config.json`));
  console.log(chalk.bold(`  App: ${appDir}`));
  console.log(chalk.bold(`${'─'.repeat(60)}\n`));

  step('Create Angular app', () => createApp(appDir, appName));

  step('Scaffold Spartacus with --runtime-config and --ssr', () => {
    run(
      `npx ng add @spartacus/schematics` +
        ` --skip-confirmation` +
        ` --baseUrl ${DEFAULT_BASE_URL}` +
        ` --baseSite ${DEFAULT_BASE_SITE}` +
        ` --runtime-config` +
        ` --ssr`,
      appDir
    );
    gitCommit(appDir, 'feat: scaffold Spartacus with runtime-config and SSR');
  });

  step('config.json created at project root', () =>
    assertFileExists(path.join(appDir, 'config.json'))
  );

  step('proxy.conf.json created at project root', () =>
    assertFileExists(path.join(appDir, 'proxy.conf.json'))
  );

  step('angular.json wired with proxyConfig', () =>
    assertFileContains(path.join(appDir, 'angular.json'), 'proxyConfig')
  );

  step('main.ts wrapped with getRuntimeEnvironment', () =>
    assertFileContains(
      path.join(appDir, 'src', 'main.ts'),
      'getRuntimeEnvironment'
    )
  );

  step('app.config.ts has provideRuntimeOccConfig', () =>
    assertFileContains(
      path.join(appDir, 'src', 'app', 'app.config.ts'),
      'provideRuntimeOccConfig'
    )
  );

  step('app.config.ts: provideRuntimeOccConfig is after importProvidersFrom (order matters)', () => {
    const appConfigPath = path.join(appDir, 'src', 'app', 'app.config.ts');
    const content = fs.readFileSync(appConfigPath, 'utf-8');
    // Both tokens include the opening paren so they match only call sites, not import
    // identifiers — comparing positions in the full file is unambiguous and robust to
    // providers with nested arrays (which would truncate a regex-based extraction).
    const importPos = content.indexOf('importProvidersFrom(');
    const providePos = content.indexOf('provideRuntimeOccConfig(');
    if (importPos === -1) {
      throw new Error('importProvidersFrom( not found in app.config.ts — expected a Spartacus app with AppModule');
    }
    if (providePos === -1) {
      throw new Error('provideRuntimeOccConfig( not found in app.config.ts — runtime config wiring missing');
    }
    if (providePos <= importPos) {
      throw new Error(
        'provideRuntimeOccConfig() must appear after importProvidersFrom() — ' +
          'MetaTagConfigModule (loaded via importProvidersFrom) sets the OCC URL from index.html; ' +
          'provideRuntimeOccConfig must be last to override it with the /config.json value'
      );
    }
  });

  // Explicit existence check first — a missing server.ts surfaces as a clear failure
  // rather than a confusing "file does not contain..." error from the steps below
  step('server.ts created by addSSR', () =>
    assertFileExists(path.join(appDir, 'src', 'server.ts'))
  );

  // The following steps verify all transformations that updateServerTs applies.
  // updateServerTs degrades silently (skips without throwing on any AST mismatch), so
  // asserting only imports is not enough — the catch-all and provider checks are the key
  // regression guards that distinguish "wiring applied" from "only imports added".
  step(
    'server.ts imports getServerRuntimeEnvironment and RUNTIME_ENVIRONMENT',
    () => {
      assertFileContains(
        path.join(appDir, 'src', 'server.ts'),
        'getServerRuntimeEnvironment'
      );
      assertFileContains(
        path.join(appDir, 'src', 'server.ts'),
        'RUNTIME_ENVIRONMENT'
      );
    }
  );

  step('server.ts app() has no runtimeEnvironment param (per-request pattern)', () =>
    assertFileNotContains(
      path.join(appDir, 'src', 'server.ts'),
      'runtimeEnvironment: ServerRuntimeEnvironment'
    )
  );

  step('server.ts registers RUNTIME_ENVIRONMENT provider in res.render (not engine-level)', () => {
    assertFileContains(
      path.join(appDir, 'src', 'server.ts'),
      'provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnvironment'
    );
    // Must NOT be in ngExpressEngine options — engine-level would override per-request value
    assertFileNotContains(
      path.join(appDir, 'src', 'server.ts'),
      'ngExpressEngine({ bootstrap, providers'
    );
  });

  step('server.ts catch-all is async and awaits getServerRuntimeEnvironment per-request', () => {
    // Check for key parts — formatter may split across lines so avoid full single-line assertion
    assertFileContains(
      path.join(appDir, 'src', 'server.ts'),
      'await getServerRuntimeEnvironment'
    );
    assertFileContains(
      path.join(appDir, 'src', 'server.ts'),
      `process.env['CONFIG_URL']`
    );
    // Catch-all callback must be async — fetch is inside it, not in run()
    assertFileContains(
      path.join(appDir, 'src', 'server.ts'),
      'async (req, res)'
    );
  });

  step('server.ts run() is NOT async and app() takes no arguments', () => {
    assertFileNotContains(
      path.join(appDir, 'src', 'server.ts'),
      'async function run'
    );
    assertFileNotContains(
      path.join(appDir, 'src', 'server.ts'),
      'app(runtimeEnvironment)'
    );
  });

  step('server.ts has /config.json proxy route before catch-all', () =>
    assertFileContains(
      path.join(appDir, 'src', 'server.ts'),
      `server.get('/config.json'`
    )
  );

  step('app.config.server.ts has provideEnvironmentServer()', () =>
    assertFileContains(
      path.join(appDir, 'src', 'app', 'app.config.server.ts'),
      'provideEnvironmentServer'
    )
  );

  // ng build verifies the browser bundle compiles; it does NOT validate SSR runtime
  // wiring — updateServerTs can silently skip and the build still passes
  step('ng build succeeds', () => run('npx ng build', appDir));

  return stats;
}

// ─── Scenario B ───────────────────────────────────────────────────────────────

function runScenarioB(outDir: string, baseName: string): ScenarioStats {
  const stats = resetStats();
  const appName = `${baseName}-scenario-b`;
  const appDir = path.join(outDir, appName);

  console.log(chalk.bold(`\n${'─'.repeat(60)}`));
  console.log(chalk.bold(`  Scenario B — Fresh install WITHOUT config.json`));
  console.log(chalk.bold(`  App: ${appDir}`));
  console.log(chalk.bold(`${'─'.repeat(60)}\n`));

  step('Create Angular app', () => createApp(appDir, appName));

  step('Scaffold Spartacus without --runtime-config', () => {
    run(
      `npx ng add @spartacus/schematics` +
        ` --skip-confirmation` +
        ` --baseUrl ${DEFAULT_BASE_URL}` +
        ` --baseSite ${DEFAULT_BASE_SITE}`,
      appDir
    );
    gitCommit(appDir, 'feat: scaffold Spartacus (no runtime-config)');
  });

  step('config.json NOT created', () =>
    assertFileAbsent(path.join(appDir, 'config.json'))
  );

  step('proxy.conf.json NOT created', () =>
    assertFileAbsent(path.join(appDir, 'proxy.conf.json'))
  );

  step('angular.json has no proxyConfig', () =>
    assertFileNotContains(path.join(appDir, 'angular.json'), 'proxyConfig')
  );

  step('main.ts has no getRuntimeEnvironment', () =>
    assertFileNotContains(
      path.join(appDir, 'src', 'main.ts'),
      'getRuntimeEnvironment'
    )
  );

  step('app.config.ts has no provideRuntimeOccConfig', () =>
    assertFileNotContains(
      path.join(appDir, 'src', 'app', 'app.config.ts'),
      'provideRuntimeOccConfig'
    )
  );

  // SSR wiring now flows through addSSR — assert server.ts was not unexpectedly created
  step('server.ts NOT created (no --ssr)', () =>
    assertFileAbsent(path.join(appDir, 'src', 'server.ts'))
  );

  step('ng build succeeds', () => run('npx ng build', appDir));

  return stats;
}

// ─── Scenario C ───────────────────────────────────────────────────────────────

function runScenarioC(outDir: string, baseName: string): ScenarioStats {
  const stats = resetStats();
  const appName = `${baseName}-scenario-c`;
  const appDir = path.join(outDir, appName);

  console.log(chalk.bold(`\n${'─'.repeat(60)}`));
  console.log(chalk.bold(`  Scenario C — Existing app npm-updated to branch`));
  console.log(chalk.bold(`  App: ${appDir}`));
  console.log(chalk.bold(`${'─'.repeat(60)}\n`));

  step('Create Angular app (public registry)', () => {
    createApp(appDir, appName, PUBLIC_REGISTRY);
    // createApp already commits "initial Angular app scaffold"
  });

  step('Scaffold Spartacus from public registry (no runtime-config)', () => {
    // Use --registry to override the global @spartacus:registry scope pointing to Verdaccio.
    // The inline env-var prefix (npm_config_@spartacus:registry=...) does not work because
    // '@' and ':' are not valid shell identifier characters.
    run(
      `npx ng add @spartacus/schematics` +
        ` --registry ${PUBLIC_REGISTRY}` +
        ` --skip-confirmation` +
        ` --baseUrl ${DEFAULT_BASE_URL}` +
        ` --baseSite ${DEFAULT_BASE_SITE}` +
        ` --defaults`,
      appDir
    );
    gitCommit(
      appDir,
      'feat: scaffold Spartacus from public registry (baseline)'
    );
  });

  step('ng build succeeds with released Spartacus (baseline)', () =>
    run('npx ng build', appDir)
  );

  let branchVersion: string;

  step('Detect branch version from Verdaccio', () => {
    branchVersion = runSilent(
      `npm view @spartacus/core --registry ${VERDACCIO_REGISTRY} version`
    );
    console.log(chalk.gray(`     → branch version: ${branchVersion}`));
  });

  step('Point app to Verdaccio registry', () => {
    run(`npm config set @spartacus:registry ${VERDACCIO_REGISTRY}`, appDir);
  });

  step('Update @spartacus/* packages to branch version', () => {
    run(
      `npm install` +
        ` @spartacus/core@${branchVersion}` +
        ` @spartacus/setup@${branchVersion}` +
        ` @spartacus/storefront@${branchVersion}` +
        ` @spartacus/schematics@${branchVersion}` +
        ` --registry ${VERDACCIO_REGISTRY}` +
        ` --legacy-peer-deps`,
      appDir
    );
    gitCommit(
      appDir,
      `chore: update @spartacus/* to branch version ${branchVersion}`
    );
  });

  step('ng build succeeds after update', () => run('npx ng build', appDir));

  step('config.json NOT introduced by update', () =>
    assertFileAbsent(path.join(appDir, 'config.json'))
  );

  step('proxy.conf.json NOT introduced by update', () =>
    assertFileAbsent(path.join(appDir, 'proxy.conf.json'))
  );

  step('main.ts unchanged — no getRuntimeEnvironment', () =>
    assertFileNotContains(
      path.join(appDir, 'src', 'main.ts'),
      'getRuntimeEnvironment'
    )
  );

  step('app.config.ts unchanged — no provideRuntimeOccConfig', () =>
    assertFileNotContains(
      path.join(appDir, 'src', 'app', 'app.config.ts'),
      'provideRuntimeOccConfig'
    )
  );

  // SSR wiring now flows through addSSR — assert a plain package update did not
  // unexpectedly trigger server.ts creation
  step('server.ts NOT created (no --ssr)', () =>
    assertFileAbsent(path.join(appDir, 'src', 'server.ts'))
  );

  return stats;
}

// ─── Preflight check ─────────────────────────────────────────────────────────

function checkVerdaccio(): void {
  console.log(chalk.gray(`\n  Checking Verdaccio at ${VERDACCIO_REGISTRY}...`));

  // 1. Verdaccio must be reachable
  try {
    execSync(
      `node -e "
const http = require('http');
http.get('${VERDACCIO_REGISTRY}', r => { r.resume(); process.exit(0); })
  .on('error', () => process.exit(1));
"`,
      { stdio: 'pipe' }
    );
  } catch {
    console.error(
      chalk.red(
        `\n❌ Verdaccio is not running at ${VERDACCIO_REGISTRY}.\n` +
          `   Start it first:\n\n` +
          `   npx ts-node ./tools/schematics/testing --command publish\n`
      )
    );
    process.exit(1);
  }

  // 2. @spartacus/schematics must be published (not just Verdaccio booted)
  try {
    const result = execSync(
      `npm view @spartacus/schematics --registry ${VERDACCIO_REGISTRY} version`,
      { stdio: 'pipe' }
    )
      .toString()
      .trim();
    console.log(
      chalk.gray(`  ✅ @spartacus/schematics@${result} found in Verdaccio`)
    );
  } catch {
    console.error(
      chalk.red(
        `\n❌ @spartacus/schematics is not published to ${VERDACCIO_REGISTRY}.\n` +
          `   Verdaccio is running but packages are missing — run:\n\n` +
          `   npx ts-node ./tools/schematics/testing --command publish\n`
      )
    );
    process.exit(1);
  }
}

// ─── Summary table ────────────────────────────────────────────────────────────

interface ScenarioResult {
  name: string;
  stats: ScenarioStats;
}

function printSummary(results: ScenarioResult[]): void {
  const sep = '─'.repeat(48);
  console.log(`\n${chalk.bold(sep)}`);
  console.log(chalk.bold('  Test Summary'));
  console.log(chalk.bold(sep));

  const colName = 12;
  const colSteps = 10;
  const colResult = 8;

  const header =
    `  ${'Scenario'.padEnd(colName)}` +
    `${'Steps'.padEnd(colSteps)}` +
    `Result`;
  console.log(chalk.bold(header));
  console.log(`  ${'─'.repeat(colName + colSteps + colResult)}`);

  let allPassed = true;
  for (const { name, stats } of results) {
    const total = stats.passed + stats.failed;
    const stepsStr = `${stats.passed}/${total}`.padEnd(colSteps);
    const icon =
      stats.failed === 0 ? chalk.green('✅ PASS') : chalk.red('❌ FAIL');
    console.log(`  ${name.padEnd(colName)}${stepsStr}${icon}`);
    if (stats.failed > 0) {
      allPassed = false;
      stats.errors.forEach((e) => console.log(chalk.red(`    • ${e}`)));
    }
  }

  console.log(`\n${chalk.bold(sep)}`);
  if (allPassed) {
    console.log(
      chalk.green(`  ✅ All ${results.length} scenario(s) passed.\n`)
    );
  } else {
    const failed = results.filter((r) => r.stats.failed > 0).length;
    console.log(
      chalk.red(`  ❌ ${failed}/${results.length} scenario(s) failed.\n`)
    );
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const { scenario, outDir, appName, noGit } = parseArgs();
  useGit = !noGit;

  console.log(chalk.bold(`\n${'═'.repeat(60)}`));
  console.log(chalk.bold(`  CXSPA-12541 Scenario Tests`));
  console.log(chalk.bold(`${'═'.repeat(60)}`));
  console.log(chalk.gray(`  Scenario : ${scenario}`));
  console.log(chalk.gray(`  Out dir  : ${outDir}`));
  console.log(chalk.gray(`  App name : ${appName}`));
  console.log(
    chalk.gray(
      `  Git      : ${useGit ? 'enabled (commits per step)' : 'disabled (--no-git)'}`
    )
  );

  checkVerdaccio();

  const results: ScenarioResult[] = [];

  if (scenario === 'A' || scenario === 'all') {
    const stats = runScenarioA(outDir, appName);
    results.push({ name: 'A (CSR+SSR)', stats });
  }

  if (scenario === 'B' || scenario === 'all') {
    const stats = runScenarioB(outDir, appName);
    results.push({ name: 'B (opt-out)', stats });
  }

  if (scenario === 'C' || scenario === 'all') {
    const stats = runScenarioC(outDir, appName);
    results.push({ name: 'C (update)', stats });
  }

  printSummary(results);

  const allPassed = results.every((r) => r.stats.failed === 0);
  process.exit(allPassed ? 0 : 1);
}

main().catch((e) => {
  console.error(chalk.red(`\n❌ Unexpected error: ${e?.message ?? e}`));
  process.exit(1);
});
