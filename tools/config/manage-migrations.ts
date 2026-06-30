/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Ensures that `migrations.json` always contains a feature-toggles migration
 * entry for the current `PUBLISHING_VERSION`.
 *
 * During a release, the workflow sets a new `PUBLISHING_VERSION` in `const.ts`
 * and then runs `npm run config:update`. This module detects that the new
 * version has no migration entry yet and appends one automatically, so that
 * customers running `ng update` will have their outdated feature toggles
 * commented out when upgrading to the new version.
 *
 * - check mode (`npm run config:check`): reports an error if the entry is missing.
 * - fix mode  (`npm run config:update`): appends the entry to `migrations.json`.
 */

import { readFileSync, writeFileSync } from 'fs';
import { chalk } from '../chalk';
import { PUBLISHING_VERSION } from './const';

const MIGRATIONS_JSON_PATH =
  'core-libs/schematics/src/migrations/migrations.json';

const MIGRATION_KEY = `00-migration-v${PUBLISHING_VERSION.replace(/\.\d+$/, '').replace(/\./g, '_')}-update-feature-toggles`;
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

  const schematics: Record<string, unknown> = migrationsJson.schematics;

  const alreadyExists = Object.values(schematics).some(
    (entry: any) =>
      entry.version === PUBLISHING_VERSION &&
      entry.factory === MIGRATION_ENTRY.factory
  );

  if (alreadyExists) {
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
    console.log(`
${chalk.gray(`--- ${file} ${`-`.repeat(Math.max(0, minLength - file.length - 1))}`)}
${chalk.red(` ✖  Missing feature-toggles migration entry for version ${PUBLISHING_VERSION}`)}

${chalk.blue(` i  Run 'npm run manage-migrations' to add it automatically.`)}
${chalk.gray(`----${`-`.repeat(Math.max(file.length, minLength))}`)}
`);
    process.exitCode = 1;
    return;
  }

  schematics[MIGRATION_KEY] = MIGRATION_ENTRY;
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
