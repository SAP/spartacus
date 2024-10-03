/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs';
import * as common from './common';
import { isMember, isTopLevelApi } from './common';
/**
 * This script generates thee breaking changes markdown doc.
 *
 * Input: Breaking change data returned by readBreakingChangeFile().  Likely is is ./data/X_0/breaking-change.json.  The folder depends on the new version config.`
 * Output: A file whose path is in OUTPUT_FILE_PATH const.  The file is a md file that contains the markdown doc to be copied in the release docs.
 *
 */

/**
 * -----------
 * Main logic
 * -----------
 */
const OUTPUT_FILE_TEMPLATE_PATH = `generate-doc.out.template`;
const OUTPUT_FILE_PATH = `${common.NEW_VERSION_DOC_HOME}/generated-typescript-changes-doc.md`;
const MD_CODEBLOCK = '\n```\n';

const apiElementMigrationCommentData =
  common.readApiElementMigrationCommentsFile();
const memberMigrationCommentData = common.readMemberMigrationCommentsFile();
const breakingChangesData = common.readBreakingChangeFile();
const renamedApiLookupData = common.readRenamedApiLookupFile();

const breakingChangeDoc: any[] = [];
breakingChangesData.forEach((apiElement: any) => {
  breakingChangeDoc.push(getBreakingChangeDoc(apiElement));
});
console.log(`Generated ${breakingChangeDoc.length} entries.`);
writeTextDataOutput(
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
    doc += getDeletedDoc(apiElement) + '\n';
  }

  if (common.isElementMoved(apiElement)) {
    doc += getMovedDoc(apiElement) + '\n';
  }
  if (common.isElementRenamed(apiElement)) {
    doc += getRenamedDoc(apiElement) + '\n';
  }
  if (
    common.isElementMoved(apiElement) ||
    common.isElementRenamed(apiElement)
  ) {
    doc += getMovedOrRenamedComment(apiElement);
  }

  const migrationComment = common.findApiElementMigrationComment(
    apiElement,
    apiElementMigrationCommentData
  );
  if (!!migrationComment) {
    doc += migrationComment + '\n';
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
  return docHeader;
}

function getFullName(apiElement: any): string {
  if (apiElement.namespace) {
    return `${apiElement.namespace}.${apiElement.name}`;
  } else {
    return apiElement.name;
  }
}

function getDeletedDoc(apiElement: any): string {
  return `
${common.generateTopLevelApiDeletedComment(apiElement)}
`;
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

function getMovedOrRenamedComment(apiElement: any): string {
  const migrationComment = common.findApiElementMigrationComment(
    apiElement,
    renamedApiLookupData
  );
  if (!!migrationComment) {
    return `${migrationComment}\n`;
  } else {
    return '';
  }
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
      const memberMigrationComment = common.findMemberMigrationComment(
        apiElement,
        memberBreakingChange.changeElementName,
        memberMigrationCommentData
      );

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

          if (!!memberMigrationComment) {
            doc += `\n${memberMigrationComment}\n`;
          }
          break;
        }
        case 'DELETED': {
          doc += `\n### ${memberBreakingChange.old.kind} ${memberBreakingChange.old.name} is removed.\n`;
          doc += `\n${memberMigrationComment}\n`;
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
${MD_CODEBLOCK}${common.getTopLevelApiStateDoc(
      apiElement.newApiElement
    )}${MD_CODEBLOCK}
`;
  }

  return doc;
}

export function writeTextDataOutput(
  outputFilePath: string,
  templateFilePath: string,
  outputData: string
): void {
  let templateHeader = fs.readFileSync(templateFilePath, 'utf-8');
  templateHeader = addVersionNumber(templateHeader);
  const outputFileContent = templateHeader + outputData + '\n';
  common.createFoldersForFilePath(outputFilePath);
  fs.writeFileSync(outputFilePath, outputFileContent);
}

function addVersionNumber(template: string): string {
  const variable = new RegExp('\\${new_version}', 'g');
  let resolvedTemplate = template.replace(variable, common.NEW_VERSION);

  return resolvedTemplate;
}
