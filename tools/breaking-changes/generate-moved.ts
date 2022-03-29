import * as fs from 'fs';
import stringifyObject from 'stringify-object';

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

const breakingChangesFile = process.argv[2];

const breakingChangesData = JSON.parse(
  fs.readFileSync(breakingChangesFile, 'utf-8')
);

console.log(
  `Read: ${breakingChangesFile}, ${breakingChangesData.length} entries`
);

const movedApiSchematics = [];
breakingChangesData
  .filter((apiElement: any) => apiElement.isMoved && !apiElement.namespace)
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
  if (!!apiElement.newName) {
    schematicsData.newNode = apiElement.newName;
  }
  if (!!apiElement.newEntryPoint) {
    schematicsData.newImportPath = apiElement.newEntryPoint;
  }
  return schematicsData;
}
