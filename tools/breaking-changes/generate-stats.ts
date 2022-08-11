import * as fs from 'fs';
import * as common from './common';

/**
 * This script generates stats from a breaking changes data sfile.
 *
 */

/**
 * -----------
 * Main logic
 * -----------
 */

const breakingChangesFile = process.argv[2];

const breakingChangesData = JSON.parse(
  fs.readFileSync(breakingChangesFile, 'utf-8')
);

common.printStats(breakingChangesData);
