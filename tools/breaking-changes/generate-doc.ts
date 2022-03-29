import * as fs from 'fs';
import { isMember, isTopLevelApi } from './common';

/**
 * This script generates thee breaking changes markdown doc.
 *
 * Input: A breaking changes file, likely `./data/breaking-changes.json`
 * Output: A file, `generate-doc.out.md`, that contains the markdown doc to be copied in the release docs.
 *
 */

/**
 * -----------
 * Main logic
 * -----------
 */

const MD_CODEBLOCK = '\n```\n';

const breakingChangesFile = process.argv[2];

const breakingChangesData = JSON.parse(
  fs.readFileSync(breakingChangesFile, 'utf-8')
);

console.log(
  `Read: ${breakingChangesFile}, ${breakingChangesData.length} entries`
);

const breakingChangeDoc = [];
breakingChangesData.forEach((apiElement: any) => {
  breakingChangeDoc.push(getBreakingChangeDoc(apiElement));
});
console.log(`Generated ${breakingChangeDoc.length} entries.`);
fs.writeFileSync(`generate-doc.out.md`, breakingChangeDoc.join(''));

/**
 * -----------
 * Functions
 * -----------
 */

function getBreakingChangeDoc(apiElement: any): string {
  let doc = getDocHeader(apiElement);
  if (apiElement.isDeleted) {
    doc += getDeletdDoc(apiElement) + '\n';
  } else if (apiElement.isMoved) {
    doc += getMovedDoc(apiElement) + '\n';
  }
  doc += getChangedDoc(apiElement);

  doc += getMembersDoc(apiElement);

  return doc;
}

function getDocHeader(apiElement: any): string {
  return `


# ${apiElement.kind} ${getFullName(apiElement)} 
## ${apiElement.entryPoint}

`;
}

function getFullName(apiElement: any): string {
  if (apiElement.namespace) {
    return `${apiElement.namespace}.${apiElement.name}`;
  } else {
    return apiElement.name;
  }
}

function isRenamed(apiElement: any): boolean {
  return !!apiElement.newName;
}
function hasNewNamespace(apiElement: any): boolean {
  return !!apiElement.newNamespace;
}

function hasNewEntryPoint(apiElement: any): boolean {
  return !!apiElement.newEntryPoint;
}

function getDeletdDoc(apiElement: any): string {
  return `
${apiElement.deletedComment}
${apiElement.migrationComment}`;
}

function getMovedDoc(apiElement: any): string {
  let movedDoc = '';
  if (hasNewEntryPoint(apiElement)) {
    movedDoc = movedDoc + `moved to ${apiElement.newEntryPoint}\n`;
  }
  if (hasNewNamespace(apiElement)) {
    movedDoc = movedDoc + `moved to namespace ${apiElement.newNamespace}\n`;
  }
  if (isRenamed(apiElement)) {
    movedDoc = movedDoc + `renamed to ${apiElement.newName}\n`;
  }
  return movedDoc;
}

function getMembersDoc(apiElement: any): string {
  let doc = '';

  const memberBreakingChanges = apiElement.breakingChanges.filter(
    (breakingChange: any) => isMember(breakingChange.changeKind)
  );

  if (memberBreakingChanges && memberBreakingChanges?.length > 0) {
    memberBreakingChanges.forEach((memberBreakingChange: any) => {
      switch (memberBreakingChange.changeType) {
        case 'CHANGED': {
          doc += `\n### ${memberBreakingChange.changeKind}${
            memberBreakingChange.changeKind === 'Constructor'
              ? ''
              : ' ' + memberBreakingChange.changeElementName
          } changed.\n`;
          doc += `

Previous version: 
${MD_CODEBLOCK}${memberBreakingChange.previousStateDoc}${MD_CODEBLOCK}

Current version: 
${MD_CODEBLOCK}${memberBreakingChange.currentStateDoc}${MD_CODEBLOCK}
`;

          break;
        }
        case 'DELETED': {
          doc += `\n### ${memberBreakingChange.deletedMember.kind} ${memberBreakingChange.deletedMember.name} is removed.\n`;
          doc += `\n${memberBreakingChange.migrationComment}\n`;
          break;
        }
        default: {
          throw Error(
            `Unsupported change type: ${memberBreakingChange.changeType}.`
          );
        }
      }
    });
  }
  return doc;
}

function getChangedDoc(apiElement: any): string {
  let doc = '';

  const breakingChange = apiElement.breakingChanges.find(
    (breakingChange: any) =>
      isTopLevelApi(breakingChange.changeKind) &&
      breakingChange.changeType === 'CHANGED'
  );

  if (breakingChange) {
    doc += `
${apiElement.kind} ${apiElement.name} changed.

Previous version: 
${MD_CODEBLOCK}${breakingChange.previousStateDoc}${MD_CODEBLOCK}

Current version: 
${MD_CODEBLOCK}${breakingChange.currentStateDoc}${MD_CODEBLOCK}
`;
  }

  return doc;
}
