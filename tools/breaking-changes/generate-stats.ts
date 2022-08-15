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

const breakingChangesData = common.readBreakingChangeFile();

common.printStats(breakingChangesData);
