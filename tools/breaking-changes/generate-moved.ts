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

const OUTPUT_FILE_PATH = `${common.MIGRATION_SCHEMATICS_HOME}/rename-symbol/data/generated-rename-symbols.migration.ts`;
const OUTPUT_FILE_TEMPLATE_PATH = `generate-moved.out.template`;

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
common.writeSchematicsDataOutput(
  OUTPUT_FILE_PATH,
  OUTPUT_FILE_TEMPLATE_PATH,
  movedApiSchematics
);

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
