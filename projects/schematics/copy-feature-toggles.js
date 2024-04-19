const fs = require('fs');

/**
 * This script copies the feature-toggles.ts file from the Spartacus core project to schematics project.
 * 
 * Usage:
 * `node copy-feature-toggles.ts copy`
 */

const SOURCE =
  '../../projects/core/src/features-config/feature-toggles/config/feature-toggles.ts';
const DESTINATION = './src/feature-toggles.copied-from-core-lib.ts';

const action = process.argv[2];

if (action === 'copy') {
  fs.copyFileSync(SOURCE, DESTINATION);
}
