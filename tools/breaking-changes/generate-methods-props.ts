import * as fs from 'fs';
import stringifyObject from 'stringify-object';
import { printStatsForBreakingChangeList } from './common';

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

const updatedMemberSchematics = [];

const updatedMembers = getUpdatedMembers(breakingChangesData);
console.log(`Found ${updatedMembers.length} updated members.`);
printStatsForBreakingChangeList(updatedMembers);

updatedMembers.forEach((breakingChange: any) => {
  updatedMemberSchematics.push(getSchematicsData(breakingChange));
});

console.log(`Generated ${updatedMemberSchematics.length} entries.`);
fs.writeFileSync(
  `generate-methods-props.out.ts`,
  stringifyObject(updatedMemberSchematics)
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
  schematicsData.deprecatedNode = breakingChange.changeElementName;
  schematicsData.comment = getSchematicsComment(breakingChange);
  return schematicsData;
}

function getSchematicsComment(breakingChange: any): string {
  if (breakingChange.changeType === 'DELETED') {
    return `${breakingChange.deletedComment} ${breakingChange.migrationComment}`;
  }
  if (breakingChange.changeKind.startsWith('Method')) {
    // TODO: Update the compare process to provide the member's info in the breaking change.
    // When the method info is available, we probably want to generate the signature instead of formatting the doc.
    return `The '${
      breakingChange.changeElementName
    }' method's signature changed to: '${normalizeFunctionSignatureDoc(
      breakingChange.currentStateDoc
    )}'`;
  }
  if (breakingChange.changeKind.startsWith('Property')) {
    return `The type of property '${normalizePropertyDoc(
      breakingChange.previousStateDoc
    )}' changed to: '${normalizePropertyDoc(breakingChange.currentStateDoc)}' `;
  }
  throw new Error(
    `Unsupported breaking change ${breakingChange.change}:${breakingChange.changeElementName}`
  );
}

function getUpdatedMembers(breakingChangesData: any) {
  return breakingChangesData
    .filter((apiElement: any) => apiElement.kind === 'Class')
    .map((apiElement: any) => {
      return apiElement.breakingChanges.map((breakingChange) => {
        //TODO: Update the compare process to bake this info in each breaking change in breaking-changes.json.
        return {
          ...breakingChange,
          apiElementName: apiElement.name,
          entryPoint: apiElement.entryPoint,
        };
      });
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

function normalizeFunctionSignatureDoc(doc: string): string {
  return normalizeNewLinesForFunction(doc).replace(/\s+/g, ' ').trim();
}

function normalizeNewLinesForFunction(doc: string) {
  doc = doc.slice(1).slice(0, -1); // Remove first and last chars.  They are \n.
  doc = doc.replace(/\(\n/, '('); // Remove \n next to the opening parenthesis.
  doc = doc.replace(/\n\)/, ' )'); // Remove \n next to the closing parenthesis.
  return doc.replace(/\n/g, ','); // The rest of the \n are between params.  Replace with `,`
}

function normalizePropertyDoc(doc: string): string {
  doc = doc.replace(/\n/g, ''); // remove newline chars.
  doc = doc.replace(/\s+/g, ' ').trim(); // remove multiple consecutive spaces
  return doc;
}
