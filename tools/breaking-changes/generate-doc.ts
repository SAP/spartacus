/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as common from './common';
import { isMember, isTopLevelApi } from './common';
/**
 * This script generates thee breaking changes markdown doc.
 *
 * Input: Breaking change data returned by readBreakingChangeFile().  Likely is is ./data/X_0/breaking-change.json.  The folder depends on the major version config.`
 * Output: A file whose path is in OUTPUT_FILE_PATH const.  The file is a md file that contains the markdown doc to be copied in the release docs.
 *
 */

/**
 * -----------
 * Main logic
 * -----------
 */
const OUTPUT_FILE_TEMPLATE_PATH = `generate-doc.out.template`;
const OUTPUT_FILE_PATH = `${common.MAJOR_VERSION_DOC_HOME}/generated-typescript-changes-doc.md`;
const MD_CODEBLOCK = '\n```\n';

const breakingChangesData = common.readBreakingChangeFile();

const breakingChangeDoc = [];
breakingChangesData.forEach((apiElement: any) => {
  breakingChangeDoc.push(getBreakingChangeDoc(apiElement));
});
console.log(`Generated ${breakingChangeDoc.length} entries.`);
common.writeTextDataOutput(
  OUTPUT_FILE_PATH,
  OUTPUT_FILE_TEMPLATE_PATH,
  breakingChangeDoc.join('')
);

/**
 * -----------
 * Functions
 * -----------
 */

function getBreakingChangeDoc(apiElement: any): string {
  let doc = getDocHeader(apiElement);
  if (common.isElementDeleted(apiElement)) {
    doc += getDeletdDoc(apiElement) + '\n';
  }

  if (common.isElementMoved(apiElement)) {
    doc += getMovedDoc(apiElement) + '\n';
  }
  if (common.isElementRenamed(apiElement)) {
    doc += getRenamedDoc(apiElement) + '\n';
  }
  doc += getChangedDoc(apiElement);

  doc += getMembersDoc(apiElement);

  return doc;
}

function getDocHeader(apiElement: any): string {
  let docHeader = `


# ${apiElement.kind} ${getFullName(apiElement)} 
## ${apiElement.entryPoint}

`;

  if (!!apiElement.migrationComment) {
    docHeader += `
${apiElement.migrationComment}

`;
  }

  return docHeader;
}

function getFullName(apiElement: any): string {
  if (apiElement.namespace) {
    return `${apiElement.namespace}.${apiElement.name}`;
  } else {
    return apiElement.name;
  }
}

function getDeletdDoc(apiElement: any): string {
  const breakingChangeEntry = common.getTopLevelBreakingChangeEntry(
    apiElement,
    'DELETED'
  );

  return `
${common.generateTopLevelApiDeletedComment(apiElement)}
${breakingChangeEntry.migrationComment}`;
}

function getMovedDoc(apiElement: any): string {
  let movedDoc = '';
  if (!!apiElement.newApiElement.entryPoint) {
    movedDoc = movedDoc + `moved to ${apiElement.newApiElement.entryPoint}\n`;
  }
  if (!!apiElement.newApiElement.namespace) {
    movedDoc =
      movedDoc + `moved to namespace ${apiElement.newApiElement.namespace}\n`;
  }
  return movedDoc;
}
function getRenamedDoc(apiElement: any): string {
  let renamedDoc = '';
  if (common.isElementRenamed(apiElement)) {
    renamedDoc = `renamed to ${apiElement.newApiElement.name}\n`;
  }
  return renamedDoc;
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
${MD_CODEBLOCK}${common.getMemberStateDoc(
            memberBreakingChange.old
          )}${MD_CODEBLOCK}

Current version: 
${MD_CODEBLOCK}${common.getMemberStateDoc(
            memberBreakingChange.new
          )}${MD_CODEBLOCK}
`;
          if (!!memberBreakingChange.migrationComment) {
            doc += `\n${memberBreakingChange.migrationComment}\n`;
          }
          break;
        }
        case 'DELETED': {
          doc += `\n### ${memberBreakingChange.old.kind} ${memberBreakingChange.old.name} is removed.\n`;
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
${MD_CODEBLOCK}${common.getTopLevelApiStateDoc(apiElement)}${MD_CODEBLOCK}

Current version: 
${MD_CODEBLOCK}${common.getTopLevelApiStateDoc(apiElement.newApiElement)}${MD_CODEBLOCK}
`;
  }

  return doc;
}
