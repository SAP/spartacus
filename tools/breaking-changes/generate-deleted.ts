import * as fs from 'fs';
import stringifyObject from 'stringify-object';
import * as common from './common';

/**
 * This script generates deleted api elements schematics code.
 *
 * Input: A breaking changes file, likely `./data/breaking-changes.json`
 * Output: A file, `generate-deleted.out.ts`, that contains code paste over in the migration schematics code.
 *
 */

/**
 * -----------
 * Main logic
 * -----------
 */

const breakingChangesData = common.readBreakingChangeFile();

const deletedApiSchematics = [];
for (let index = 0; index < breakingChangesData.length; index++) {
  const apiElement = breakingChangesData[index];
  if (apiElement.isDeleted) {
    deletedApiSchematics.push(getSchematicsData(apiElement));
  }
}
console.log(`Generated ${deletedApiSchematics.length} entries.`);
fs.writeFileSync(
  `generate-deleted.out.ts`,
  stringifyObject(deletedApiSchematics)
);

/**
 * -----------
 * Functions
 * -----------
 */

function getSchematicsData(apiElement: any): any {
  const schematicsData: any = {};
  schematicsData.node = apiElement.name;
  schematicsData.importPath = apiElement.entryPoint;
  schematicsData.comment = `${apiElement.deletedComment} ${apiElement.migrationComment}`;
  return schematicsData;
}
