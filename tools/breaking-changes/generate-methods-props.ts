/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as common from './common';
import {
  getSignatureDoc,
  printStatsForBreakingChangeList,
  SCHEMATICS_COMMENT_PREFIX,
} from './common';

/**
 * This script generates methods and properties schematics code.
 *
 * Input: Breaking change data returned by readBreakingChangeFile().  Likely is is ./data/X_0/breaking-change.json.  The folder depends on the new version config.`
 * Output: A file whose path is in OUTPUT_FILE_PATH const.  The file is a ts file that contains migration data ready to be imported by the schematics.
 *
 */

/**
 * -----------
 * Main logic
 * -----------
 */
const OUTPUT_FILE_PATH = `${common.MIGRATION_SCHEMATICS_HOME}/methods-and-properties-deprecations/data/generated-methods-and-properties.migration.ts`;
const OUTPUT_FILE_TEMPLATE_PATH = `generate-methods-props.out.template`;

const memberMigrationCommentData = common.readMemberMigrationCommentsFile();
const breakingChangesData = common.readBreakingChangeFile();
let updatedMemberSchematics = [];

const updatedMembers = getUpdatedMembers(breakingChangesData);
console.log(`Found ${updatedMembers.length} updated members.`);
printStatsForBreakingChangeList(updatedMembers);

updatedMembers.forEach((breakingChange: any) => {
  updatedMemberSchematics.push(getSchematicsData(breakingChange));
});

console.log(`Generated ${updatedMemberSchematics.length} entries.`);
common.writeSchematicsDataOutput(
  OUTPUT_FILE_PATH,
  OUTPUT_FILE_TEMPLATE_PATH,
  updatedMemberSchematics
);

/**
 * -----------
 * Functions
 * -----------
 */

function getSchematicsData(breakingChange: any): any {
  const schematicsData: any = {};
  schematicsData.class = breakingChange.topLevelApiElementName;
  schematicsData.importPath = breakingChange.entryPoint;
  schematicsData.deprecatedNode = breakingChange.changeElementName;
  schematicsData.comment = getSchematicsComment(breakingChange);
  return schematicsData;
}

function getSchematicsComment(breakingChange: any): string {
  if (breakingChange.changeType === 'DELETED') {
    const migrationComment = common.findMemberMigrationComment(
      {
        name: breakingChange.topLevelApiElementName,
        entryPoint: breakingChange.entryPoint,
      },
      breakingChange.changeElementName,
      memberMigrationCommentData
    );

    return `${common.generateMemberDeletedComment(
      breakingChange
    )} ${migrationComment}`;
  }
  if (breakingChange.changeKind.startsWith('Method')) {
    return `${SCHEMATICS_COMMENT_PREFIX} The '${
      breakingChange.changeElementName
    }' method's signature changed to: '${getSignatureDoc(
      breakingChange.new,
      false
    )}'`;
  }
  if (breakingChange.changeKind.startsWith('Property')) {
    return `${SCHEMATICS_COMMENT_PREFIX} The type of property '${sanitizePropertyDoc(
      common.getMemberStateDoc(breakingChange.old)
    )}' changed to: '${sanitizePropertyDoc(
      common.getMemberStateDoc(breakingChange.new)
    )}' `;
  }
  throw new Error(
    `Unsupported breaking change ${breakingChange.change}:${breakingChange.changeElementName}`
  );
}

function getUpdatedMembers(breakingChangesData: any) {
  return breakingChangesData
    .filter((apiElement: any) => apiElement.kind === 'Class')
    .map((apiElement: any) => {
      return apiElement.breakingChanges;
    })
    .flat()
    .filter(
      (breakingChange: any) =>
        (breakingChange.changeType === 'DELETED' ||
          breakingChange.changeType === 'CHANGED') &&
        isMethodOrProperty(breakingChange.changeKind)
    );
}

function isMethodOrProperty(memberKind: string): boolean {
  return memberKind.startsWith('Method') || memberKind.startsWith('Property');
}

function sanitizePropertyDoc(doc: string): string {
  doc = doc.replace(/\n/g, ''); // remove newline chars.
  doc = doc.replace(/\s+/g, ' ').trim(); // remove multiple consecutive spaces
  return doc;
}
