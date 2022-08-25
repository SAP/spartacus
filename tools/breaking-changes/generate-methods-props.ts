import * as common from './common';
import { getSignatureDoc, printStatsForBreakingChangeList } from './common';

/**
 * This script generates methods and properties schematics code.
 *
 * Input: A breaking changes file, likely `./data/breaking-changes.json`
 * Output: A file, `generate-methods-props.out.ts`, that contains code paste over in the migration schematics code.
 *
 */

/**
 * -----------
 * Main logic
 * -----------
 */
const OUTPUT_FILE_PATH = `${common.MIGRATION_SCHEMATICS_HOME}/methods-and-properties-deprecations/data/generated-methods-and-properties.migration.ts`;
const OUTPUT_FILE_TEMPLATE_PATH = `generate-methods-props.out.template`;

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
    return `${breakingChange.deletedComment} ${breakingChange.migrationComment}`;
  }
  if (breakingChange.changeKind.startsWith('Method')) {
    return `The '${
      breakingChange.changeElementName
    }' method's signature changed to: '${getSignatureDoc(
      breakingChange.new,
      false
    )}'`;
  }
  if (breakingChange.changeKind.startsWith('Property')) {
    return `The type of property '${sanitizePropertyDoc(
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
