/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs';
import stringifyObject from 'stringify-object';

// shared configs

export const NEW_VERSION = '221121_7'; // Increment this number to match the current release for which the script is used.
export const BREAKING_CHANGES_FILE_PATH = `data/${NEW_VERSION}/breaking-changes.json`;
export const NEW_VERSION_DOC_HOME = `../../docs/migration/${NEW_VERSION}`;
export const API_ELEMENT_MIGRATION_COMMENTS_FILE_PATH = `${NEW_VERSION_DOC_HOME}/migration-comments-api-elements.json`;
export const MEMBERS_MIGRATION_COMMENTS_FILE_PATH = `${NEW_VERSION_DOC_HOME}/migration-comments-members.json`;
export const RENAMED_API_LOOKUP_FILE_PATH = `${NEW_VERSION_DOC_HOME}/renamed-api-mappings.json`;
export const MIGRATION_SCHEMATICS_HOME = `../../projects/schematics/src/migrations/${NEW_VERSION}`;
export const SCHEMATICS_COMMENT_PREFIX = '// TODO:Spartacus -';

/**
 * Normalize type for display in documentation.
 * Removes import() statements and namespace aliases to make types more readable.
 */
export function normalizeTypeForDisplay(type: string | undefined): string {
  if (!type) return '';

  let normalized = type;

  // Replace literal \n with actual newlines for regex to work
  normalized = normalized.replace(/\\n/g, '\n');

  // Remove JSDoc comments (/** ... */) including multi-line
  normalized = normalized.replace(/\/\*\*[\s\S]*?\*\//g, '');

  // Remove TypeScript-generated suffixes like $1, $2, etc.
  // These are added by TypeScript Compiler API during bundling when there are naming conflicts
  // Match pattern: Type$1, User$2, ICON_TYPE$1, etc.
  // Use word boundary to avoid matching valid identifiers that naturally contain $
  normalized = normalized.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\$\d+\b/g, '$1');

  // Remove import() statements: import("package"). → (empty)
  // Example: import("@angular/core").WritableSignal → WritableSignal
  normalized = normalized.replace(/import\s*\(\s*["'][^"']+["']\s*\)\s*\./g, '');

  // Remove namespace aliases: i0., rxjs., etc.
  // Match single lowercase/number identifiers followed by dot (common pattern for generated aliases)
  // Example: i0.WritableSignal → WritableSignal, rxjs.Observable → Observable
  normalized = normalized.replace(/\b[a-z]\d*\./g, '');

  // Remove common known package namespace prefixes
  normalized = normalized.replace(/\b(rxjs|core|common|forms|router|platform_browser)\./g, '');

  // Remove external library namespace aliases (express, qs, etc.)
  normalized = normalized.replace(/\b(express|qs|express_serve_static_core)\./g, '');

  // Remove ANY underscore-prefixed namespace aliases (more generic approach)
  // This catches: _angular_forms., _spartacus_*, _ngrx_*, _platform_browser., etc.
  // Pattern: underscore followed by word characters (letters, numbers, underscores) ending with dot
  normalized = normalized.replace(/\b_[a-z][a-z0-9_]*\./gi, '');

  // Remove dist namespace aliases: dist_cart_types_spartacus_*, etc.
  normalized = normalized.replace(/\bdist_[a-z_]+\./g, '');

  // Remove Spartacus internal namespace aliases: StateUtils., etc.
  normalized = normalized.replace(/\bStateUtils\./g, '');

  // Remove i18next namespace aliases: i18next_http_backend., node_modules_i18next., etc.
  normalized = normalized.replace(/\bi18next[a-z0-9_]*\./gi, '');

  // Remove node_modules namespace aliases: node_modules_i18next., node_modules_*, etc.
  normalized = normalized.replace(/\bnode_modules_[a-z0-9_]*\./gi, '');

  // Remove leading equals sign (artifact from type alias parsing)
  // Example: "= Omit<T, K>" → "Omit<T, K>"
  normalized = normalized.replace(/^=\s+/, '');

  // Remove trailing semicolons (formatting differences) - but only at the very end
  // This handles cases like `string` vs `string;` but preserves semicolons in complex types
  normalized = normalized.replace(/;+\s*$/, '');

  // Normalize whitespace - replace multiple spaces/newlines with single space
  normalized = normalized.replace(/\s+/g, ' ').trim();

  return normalized;
}

// Shared Functions
export function readAndParseDataFile(filePath: string): any {
  const parsedData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const length = Array.isArray(parsedData) ? parsedData.length : 'unknown';
  console.log(`Read: ${filePath}, ${length} entries`);
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
  const data = readAndParseDataFile(RENAMED_API_LOOKUP_FILE_PATH);
  // Ensure we always return an array, even if file is empty or undefined
  return Array.isArray(data) ? data : [];
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
    // Skip undefined or null elements silently
    if (!element || !element.change) {
      return group;
    }
    group[element.change] = group[element.change] ?? [];
    group[element.change].push(element);
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
  functionElement: any,
  multiLine: boolean = true
): string {
  const lineEnding = getLineEnding(multiLine);
  const parameterDoc = getParameterDoc(functionElement, multiLine);
  const returnType = functionElement.returnType
    ? ': ' + normalizeTypeForDisplay(functionElement.returnType)
    : '';
  const doc = `${lineEnding}${functionElement.name}(${parameterDoc})${returnType}${lineEnding}`;

  return doc;
}

export function getParameterDoc(
  functionElement: any,
  multiLine: boolean = true
): string {
  const lineEnding = getLineEnding(multiLine);
  if (functionElement.parameters?.length) {
    let parameterDoc = lineEnding;
    functionElement.parameters.forEach((parameter: any, index: number) => {
      const normalizedType = normalizeTypeForDisplay(parameter.type);
      parameterDoc += `  ${parameter.name}${parameter.isOptional ? '?' : ''}: ${normalizedType}${
        index + 1 >= functionElement.parameters.length ? '' : ','
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
  if (!apiElement || !Array.isArray(apiElement.breakingChanges)) {
    return [];
  }
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
      return `${member.name}: ${normalizeTypeForDisplay(member.type)}`;
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
      return `${apiElement.name}: ${normalizeTypeForDisplay(apiElement.type)}`;
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
  if (!apiElement.members || apiElement.members.length === 0) {
    return '';
  }

  // If members is an array with a single string (normalized type), return it
  if (apiElement.members.length === 1 && typeof apiElement.members[0] === 'string') {
    return apiElement.members[0];
  }

  // Otherwise join with commas (fallback for old format)
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
