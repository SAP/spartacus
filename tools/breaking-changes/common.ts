/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs';
import stringifyObject from 'stringify-object';

// shared configs

export const NEW_MAJOR_VERSION = '2211'; // Increment this number to match the current release for which the script is used.
export const BREAKING_CHANGES_FILE_PATH = `data/${NEW_MAJOR_VERSION}_0/breaking-changes.json`;
export const MAJOR_VERSION_DOC_HOME = `../../docs/migration/${NEW_MAJOR_VERSION}_0`;
export const API_ELEMENT_MIGRATION_COMMENTS_FILE_PATH = `${MAJOR_VERSION_DOC_HOME}/migration-comments-api-elements.json`;
export const MEMBERS_MIGRATION_COMMENTS_FILE_PATH = `${MAJOR_VERSION_DOC_HOME}/migration-comments-members.json`;
export const RENAMED_API_LOOKUP_FILE_PATH = `${MAJOR_VERSION_DOC_HOME}/renamed-api-mappings.json`;
export const MIGRATION_SCHEMATICS_HOME = `../../projects/schematics/src/migrations/${NEW_MAJOR_VERSION}_0`;
export const SCHEMATICS_COMMENT_PREFIX = '// TODO:Spartacus -';

// Shared Functions
export function readAndParseDataFile(filePath: string): any {
  const parsedData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  console.log(`Read: ${filePath}, ${parsedData.length} entries`);
  return parsedData;
}

export function readBreakingChangeFile(): any {
  return readAndParseDataFile(BREAKING_CHANGES_FILE_PATH);
}

export function readApiElementMigrationCommentsFile(): any {
  return readAndParseDataFile(API_ELEMENT_MIGRATION_COMMENTS_FILE_PATH);
}

export function readMemberMigrationCommentsFile(): any {
  return readAndParseDataFile(MEMBERS_MIGRATION_COMMENTS_FILE_PATH);
}

export function readRenamedApiLookupFile(): any {
  return readAndParseDataFile(RENAMED_API_LOOKUP_FILE_PATH);
}

export function findApiElementMigrationComment(
  apiElement: any,
  deletedApiCommentData: any[]
): string {
  const apiCommentEntry = deletedApiCommentData.find((entry) => {
    return (
      entry.apiElementName === apiElement.name &&
      entry.entryPoint === apiElement.entryPoint
    );
  });
  return apiCommentEntry?.migrationComment || '';
}

export function findMemberMigrationComment(
  apiElement: any,
  memberName: string,
  deletedMemberCommentData: any[]
): string {
  const memberCommentEntry = deletedMemberCommentData.find((entry) => {
    return (
      entry.apiElementName === apiElement.name &&
      entry.entryPoint === apiElement.entryPoint &&
      entry.memberName === memberName
    );
  });
  return memberCommentEntry?.migrationComment || '';
}

export function findRenamedApiLookup(
  apiElement: any,
  renamedApiLookupData: any[]
): any {
  const renamedApiLookupEntry = renamedApiLookupData.find((entry) => {
    return (
      entry.apiElementName === apiElement.name &&
      entry.entryPoint === apiElement.entryPoint
    );
  });
  return renamedApiLookupEntry;
}

function findElementInApi(
  apiData: Array<any>,
  apiElementName: string,
  entryPoint: string
): any {
  return apiData.find((apiDataElement) => {
    return (
      apiDataElement.name === apiElementName &&
      apiDataElement.entryPoint === entryPoint
    );
  });
}

export function findRenamedElementInApi(
  newApiData: any,
  renamedApiLookupData: any,
  oldApiElement: any
) {
  const renamedApiMapping = findRenamedApiLookup(
    oldApiElement,
    renamedApiLookupData
  );

  if (!renamedApiMapping) return undefined;

  const newEntryPoint =
    renamedApiMapping.newEntryPoint || renamedApiMapping.entryPoint;

  const renamedElement = findElementInApi(
    newApiData,
    renamedApiMapping.newApiElementName,
    newEntryPoint
  );

  return renamedElement;
}

export function printStats(breakingChangeElements: any[]) {
  console.log(
    `${breakingChangeElements.length} api elements with breaking changes`
  );

  const globalBreakingChangeList = breakingChangeElements
    .map((element) => element.breakingChanges)
    .flat();
  console.log(`${globalBreakingChangeList.length} individual breaking changes`);

  printStatsForBreakingChangeList(globalBreakingChangeList);
}

export function printStatsForBreakingChangeList(
  globalBreakingChangeList: any
): void {
  const groupByCategory = globalBreakingChangeList.reduce((group, element) => {
    const { change } = element;
    group[change] = group[change] ?? [];
    group[change].push(element);
    return group;
  }, {});
  Object.keys(groupByCategory)
    .sort()
    .forEach((key) => {
      console.log(`${key}: ${groupByCategory[key].length}`);
    });
}

export function isMember(kind: string): boolean {
  const memberKinds = [
    'Constructor',
    'IndexSignature',
    'MethodSignature',
    'Method',
    'PropertySignature',
    'Property',
  ];
  return memberKinds.includes(kind);
}

export function isTopLevelApi(kind: string): boolean {
  const apiKinds = [
    'Namespace',
    'Interface',
    'Class',
    'Enum',
    'TypeAlias',
    'Variable',
    'Function',
  ];
  return apiKinds.includes(kind);
}

export function unEscapePackageName(packageName: string) {
  return packageName.replace(/_/g, '/');
}

export function escapePackageName(packageName: string) {
  return packageName.replace(/\//g, '_').replace(/\_/, '/');
}

export function getSignatureDoc(
  functonElement: any,
  multiLine: boolean = true
): string {
  const lineEnding = getLineEnding(multiLine);
  const parameterDoc = getParameterDoc(functonElement, multiLine);
  const doc = `${lineEnding}${functonElement.name}(${parameterDoc})${
    functonElement.returnType ? ': ' + functonElement.returnType : ''
  }${lineEnding}`;

  return doc;
}

export function getParameterDoc(
  functonElement: any,
  multiLine: boolean = true
): string {
  const lineEnding = getLineEnding(multiLine);
  if (functonElement.parameters?.length) {
    let parameterDoc = lineEnding;
    functonElement.parameters.forEach((parameter: any, index: number) => {
      parameterDoc += `  ${parameter.name}${parameter.isOptional ? '?' : ''}: ${
        parameter.type
      }${
        index + 1 >= functonElement.parameters.length ? '' : ','
      }${lineEnding}`;
    });
    return parameterDoc;
  } else {
    return '';
  }
}

function getLineEnding(multiLine: boolean = true) {
  return multiLine ? '\n' : '';
}

export function getElementCategory(apiElement: any): string {
  if (isTopLevelApi(apiElement.kind)) {
    return 'TOP_LEVEL_API';
  }
  if (isMember(apiElement.kind)) {
    return 'MEMBER';
  }
  throw new Error(
    `Unknown api element category for element "${apiElement.name}" with kind ${apiElement.kind}}`
  );
}

export function isElementRenamed(apiElement: any): boolean {
  const breakingChangeEntry = getTopLevelBreakingChangeEntry(
    apiElement,
    'RENAMED'
  );
  return !!breakingChangeEntry;
}

export function isElementMoved(apiElement: any): boolean {
  const breakingChangeEntry = getTopLevelBreakingChangeEntry(
    apiElement,
    'MOVED'
  );
  return !!breakingChangeEntry;
}

export function isElementDeleted(apiElement: any): boolean {
  const breakingChangeEntry = getTopLevelBreakingChangeEntry(
    apiElement,
    'DELETED'
  );
  return !!breakingChangeEntry;
}

export function getTopLevelBreakingChangeEntry(
  apiElement: any,
  changeType: string
): any {
  const breakingChangeEntry = getAllTopLevelBreakingChanges(apiElement).find(
    (breakingChange: any) => breakingChange.changeType === changeType
  );

  return breakingChangeEntry;
}

export function getAllTopLevelBreakingChanges(apiElement: any): any[] {
  return apiElement.breakingChanges.filter((breakingChange: any) =>
    isTopLevelApi(breakingChange.changeKind)
  );
}

export function writeSchematicsDataOutput(
  outputFilePath: string,
  templateFilePath: string,
  outputData: any
): void {
  const templateHeader = fs.readFileSync(templateFilePath, 'utf-8');
  const outputDataString = stringifyObject(outputData);
  const outputFileContent = templateHeader + outputDataString + ';\n';
  createFoldersForFilePath(outputFilePath);
  fs.writeFileSync(outputFilePath, outputFileContent);
}

export function createFoldersForFilePath(filePath: string) {
  const folderPath = filePath.substring(0, filePath.lastIndexOf('/'));
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

export function getMemberStateDoc(member: any): string {
  switch (member.kind) {
    case 'Constructor':
    case 'IndexSignature':
    case 'MethodSignature':
    case 'Method': {
      return getSignatureDoc(member);
    }
    case 'PropertySignature':
    case 'Property': {
      return `${member.name}: ${member.type}`;
    }
    default: {
      throw Error(
        `Unsupported member kind [${member.kind}] for member name [${member.name}] for doc generation`
      );
    }
  }
}

export function getTopLevelApiStateDoc(apiElement: any): string {
  switch (apiElement.kind) {
    case 'Enum': {
      return getEnumStateDoc(apiElement);
    }
    case 'TypeAlias': {
      return getTypeAliasStateDoc(apiElement);
    }
    case 'Variable': {
      return `${apiElement.name}: ${apiElement.type}`;
    }
    case 'Function': {
      return getSignatureDoc(apiElement);
    }
    case 'Namespace': {
      return '';
    }
    default: {
      throw Error(
        `Can't generate state doc for element kind ${apiElement.kind}.  Element name:[${apiElement.name}] `
      );
    }
  }
}

function getEnumStateDoc(apiElement): string {
  return apiElement.members.join(',\n');
}

function getTypeAliasStateDoc(apiElement): string {
  return apiElement.members.join(',\n');
}

export function generateTopLevelApiDeletedComment(oldApiElement: any): string {
  return `${oldApiElement.kind} ${
    oldApiElement.namespace ? oldApiElement.namespace + '.' : ''
  }${
    oldApiElement.name
  } has been removed and is no longer part of the public API.`;
}

export function generateMemberDeletedComment(breakingChange: any): string {
  return `// TODO:Spartacus - ${breakingChange.old.kind} '${breakingChange.old.name}' was removed from ${breakingChange.topLevelApiElementKind} '${breakingChange.topLevelApiElementName}'.`;
}
