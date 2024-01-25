/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as common from './common';

/**
 * This script generates moved api elements schematics code.
 *
 * Input: Breaking change data returned by readBreakingChangeFile().  Likely is is ./data/X_0/breaking-change.json.  The folder depends on the major version config.`
 * Output: A file whose path is in OUTPUT_FILE_PATH const.  The file is a ts file that contains migration data ready to be imported by the schematics.
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
