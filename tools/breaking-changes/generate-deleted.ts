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
const OUTPUT_FILE_PATH = `${common.MIGRATION_SCHEMATICS_HOME}/removed-public-api-deprecations/data/removed-public-api.migration.ts`;
const OUTPUT_FILE_TEMPLATE_PATH = `generate-deleted.out.template`;

const breakingChangesData = common.readBreakingChangeFile();

const deletedApiSchematics = [];
for (let index = 0; index < breakingChangesData.length; index++) {
  const apiElement = breakingChangesData[index];
  if (common.isElementDeleted(apiElement)) {
    deletedApiSchematics.push(getSchematicsData(apiElement));
  }
}
console.log(`Generated ${deletedApiSchematics.length} entries.`);
common.writeSchematicsDataOutput(
  OUTPUT_FILE_PATH,
  OUTPUT_FILE_TEMPLATE_PATH,
  deletedApiSchematics
);

/**
 * -----------
 * Functions
 * -----------
 */

function getSchematicsData(apiElement: any): any {
  const breakingChangeEntry = common.getTopLevelBreakingChangeEntry(
    apiElement,
    'DELETED'
  );
  const schematicsData: any = {};
  schematicsData.node = apiElement.name;
  schematicsData.importPath = apiElement.entryPoint;
  schematicsData.comment = `${breakingChangeEntry.deletedComment} ${breakingChangeEntry.migrationComment}`;
  return schematicsData;
}
