const fs = require('fs');

/**
 * This script copies the feature-toggles.ts file from the Spartacus core project to schematics project.
 * This script can also delete the copied file.
 * 
 * Usage:
 * - Copy the file: `node clone-feature-toggles.ts copy`
 * - Delete the file: `node clone-feature-toggles.ts remove`
 */

const SOURCE =
  '../../projects/core/src/features-config/feature-toggles/config/feature-toggles.ts';
const DESTINATION = './src/feature-toggles.copy.ts';

const action = process.argv[2];

if (action === 'copy') {
  fs.copyFileSync(SOURCE, DESTINATION);
} else if (action === 'remove') {
  fs.rmSync(DESTINATION);
}
