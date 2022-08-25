/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as common from './common';

/**
 * This script generates deleted api elements schematics code.
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
const OUTPUT_FILE_PATH = `${common.MIGRATION_SCHEMATICS_HOME}/removed-public-api-deprecations/data/generated-removed-public-api.migration.ts`;
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
  schematicsData.comment = `${common.generateTopLevelApiDeletedComment(
    apiElement
  )} ${breakingChangeEntry.migrationComment}`;
  return schematicsData;
}
