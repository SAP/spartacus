import * as fs from 'fs';
import stringifyObject from 'stringify-object';
import * as common from './common';

/**
 * This script generates moved api elements schematics code.
 *
 * Input: A breaking changes file, likely `./data/breaking-changes.json`
 * Output: A file, `generate-moved.out.ts`, that contains code paste over in the migration schematics code.
 *
 */

/**
 * -----------
 * Main logic
 * -----------
 */

const breakingChangesData = common.readBreakingChangeFile();
const movedApiSchematics = [];
breakingChangesData
  .filter((apiElement: any) => !apiElement.namespace) // schematics doesn't support namespaces
  .filter(
    (apiElement: any) =>
      common.isElementMoved(apiElement) || common.isElementRenamed(apiElement)
  )
  .forEach((apiElement: any) => {
    movedApiSchematics.push(getSchematicsData(apiElement));
  });
console.log(`Generated ${movedApiSchematics.length} entries.`);
fs.writeFileSync(`generate-moved.out.ts`, stringifyObject(movedApiSchematics));

/**
 * -----------
 * Functions
 * -----------
 */

function getSchematicsData(apiElement: any): any {
  const schematicsData: any = {};
  schematicsData.previousNode = apiElement.name;
  schematicsData.previousImportPath = apiElement.entryPoint;
  if (common.isElementRenamed(apiElement)) {
    schematicsData.newNode = apiElement.newApiElement.name;
  }
  if (common.isElementMoved(apiElement)) {
    schematicsData.newImportPath = apiElement.newApiElement.entryPoint;
  }
  return schematicsData;
}
