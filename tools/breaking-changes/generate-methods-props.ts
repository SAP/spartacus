import * as fs from 'fs';
import stringifyObject from 'stringify-object';
const { execSync } = require('child_process');

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

const breakingChangesFile = process.argv[2];

const breakingChangesData = JSON.parse(
  fs.readFileSync(breakingChangesFile, 'utf-8')
);

console.log(
  `Read: ${breakingChangesFile}, ${breakingChangesData.length} entries`
);

let ticketCount = 0;

const deletedMemberSchematics = [];

const deletedMembers = getDeletedMembers(breakingChangesData);

deletedMembers.forEach((breakingChange: any) => {
  deletedMemberSchematics.push(getSchematicsData(breakingChange));
});

console.log(`Generated ${deletedMemberSchematics.length} entries.`);
fs.writeFileSync(
  `generate-methods-props.out.ts`,
  stringifyObject(deletedMemberSchematics)
);

/**
 * -----------
 * Functions
 * -----------
 */

function getSchematicsData(breakingChange: any): any {
  const schematicsData: any = {};
  schematicsData.class = breakingChange.apiElementName;
  schematicsData.importPath = breakingChange.entryPoint;
  schematicsData.deprecatedNode = breakingChange.deletedMember.name;
  schematicsData.comment = `${breakingChange.deletedComment} ${breakingChange.migrationComment}`;
  return schematicsData;
}

function getDeletedMembers(breakingChangesData: any) {
  return breakingChangesData
    .map((apiElement: any) => apiElement.breakingChanges)
    .flat()
    .filter((breakingChange: any) => breakingChange.isDeletedMember);
}
