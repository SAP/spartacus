/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Ensures that `migrations.json` always contains a feature-toggles migration
 * entry for the current minor release line (e.g. 221121.13).
 *
 * During a release, the workflow sets a new `PUBLISHING_VERSION` in `const.ts`
 * and then runs `npm run manage-migrations`. This module:
 *
 * - Creates the entry if it does not exist yet for this minor.
 * - Updates the `version` field in-place if the entry exists but belongs to a
 *   different patch/pre-release of the same minor
 *   (e.g. stored 221121.13.0, current is 221121.13.1).
 * - No-ops if the entry already matches the current version exactly.
 */

import { readFileSync, writeFileSync } from 'fs';
import { chalk } from '../chalk';
import { PUBLISHING_VERSION } from './const';

const MIGRATIONS_JSON_PATH =
  'core-libs/schematics/src/migrations/migrations.json';

const [major, minor] = PUBLISHING_VERSION.split('.');
const MIGRATION_KEY = `00-migration-v${major}_${minor}-update-feature-toggles`;
const MIGRATION_ENTRY = {
  version: PUBLISHING_VERSION,
  factory: '../shared/utils/update-feature-toggles#migrate',
  description:
    'Update feature toggles: comment out removed toggles with [REMOVED]',
};

export type ProgramOptions = { fix: boolean | undefined };

export function manageMigrations(options: ProgramOptions): void {
  console.log('\nChecking migrations.json...');

  const migrationsJson = JSON.parse(
    readFileSync(MIGRATIONS_JSON_PATH, 'utf-8')
  );

  const schematics: Record<string, any> = migrationsJson.schematics;
  const existingEntry = schematics[MIGRATION_KEY];

  // No-op: entry exists and version already matches
  if (existingEntry?.version === PUBLISHING_VERSION) {
    console.log(
      chalk.green(
        ` ✔  migrations.json already has a feature-toggles entry for ${PUBLISHING_VERSION}`
      )
    );
    return;
  }

  if (!options.fix) {
    const minLength = 76;
    const file = MIGRATIONS_JSON_PATH;
    const message = existingEntry
      ? `feature-toggles entry for minor ${MIGRATION_KEY} has version ${existingEntry.version}, expected ${PUBLISHING_VERSION}`
      : `Missing feature-toggles migration entry for version ${PUBLISHING_VERSION}`;
    console.log(`
${chalk.gray(`--- ${file} ${`-`.repeat(Math.max(0, minLength - file.length - 1))}`)}
${chalk.red(` ✖  ${message}`)}

${chalk.blue(` i  Run 'npm run manage-migrations' to fix it automatically.`)}
${chalk.gray(`----${`-`.repeat(Math.max(file.length, minLength))}`)}
`);
    process.exitCode = 1;
    return;
  }

  // Update version in-place if entry exists for this minor, otherwise create it
  if (existingEntry) {
    console.log(
      chalk.yellow(
        ` ↻  Updating feature-toggles entry from ${existingEntry.version} to ${PUBLISHING_VERSION}`
      )
    );
    existingEntry.version = PUBLISHING_VERSION;
  } else {
    schematics[MIGRATION_KEY] = MIGRATION_ENTRY;
  }

  writeFileSync(
    MIGRATIONS_JSON_PATH,
    JSON.stringify(migrationsJson, null, 2) + '\n',
    'utf-8'
  );
  console.log(chalk.green(` ✔  File \`${chalk.bold(MIGRATIONS_JSON_PATH)}\` updated`));
}

// Run directly: ts-node tools/config/manage-migrations.ts [--fix]
if (require.main === module) {
  const fix = process.argv.includes('--fix');
  manageMigrations({ fix });
}
