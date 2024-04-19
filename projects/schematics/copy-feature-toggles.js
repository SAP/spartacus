/**
 * This script copies the feature-toggles.ts file from the Spartacus core project to schematics project.
*/

const fs = require('fs');
const SOURCE =
  '../../projects/core/src/features-config/feature-toggles/config/feature-toggles.ts';
const DESTINATION = './src/feature-toggles.copied-from-core-lib.ts';

fs.copyFileSync(SOURCE, DESTINATION);
