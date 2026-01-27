/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';
import { unEscapePackageName } from './common';
/**
 * This script combines all the json api files produced by MS Api Extractor in one file with a
 * flat list of of api elelments.
 *
 * Input: A Spartacus source home/base folder, like './src/old'.  This script will parse the `temp` folder
 * produced by MS Api Extractor.
 * Output: A file, `public-api.json`, contains a flat list of of api elelments. The file is created in the folder passed as a param, like like './src/old/public-api.json'.
 *
 */

/**
 * -----------
 * Main logic
 * -----------
 */

const spartacusHomeDir = process.argv[2];
console.log(`Parsing public API for libs in ${spartacusHomeDir}/temp.`);

const tempDir = path.resolve(spartacusHomeDir, 'temp');
const pattern = `${tempDir}/**/*.api.json`;
console.log(`Looking for files with pattern: ${pattern}`);
const files = globSync(pattern);
console.log(`Found ${files.length} api.json files.`);
const publicApiData: any[] = [];
files.forEach((file) => {
  publicApiData.push(...parseFile(file));
});

parseParameterImportPaths(publicApiData);

const outputFilePath = `${spartacusHomeDir}/public-api.json`;
console.log(`Write ${publicApiData.length} api elements to ${outputFilePath}.`);

fs.writeFileSync(outputFilePath, JSON.stringify(publicApiData));

/**
 * -----------
 * Functions
 * -----------
 */

export function parseFile(filePath: string): any[] {
  const inputFileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const entryPoint = inputFileData.members[0];
  console.log(
    `Read ${filePath}, ${inputFileData.name}, ${entryPoint.members.length} api elements.`
  );
  return parseElementGroup(entryPoint.members, inputFileData.name);
}

function parseElementGroup(
  members: any[],
  entryPointName: string,
  namespace?: string
) {
  const entryPointElements: any[] = [];

  members.forEach((member: any) => {
    if (member.kind === 'Namespace') {
      entryPointElements.push(
        parseElement(member, entryPointName, member.name)
      );
      entryPointElements.push(
        ...parseElementGroup(member.members, entryPointName, member.name)
      );
    } else {
      entryPointElements.push(parseElement(member, entryPointName, namespace));
    }
  });
  return entryPointElements;
}

function parseElement(
  rawElement: any,
  entryPointName: string,
  namespace?: string
) {
  const parsedElement: any = {};
  parsedElement.entryPoint = unEscapePackageName(entryPointName);
  parsedElement.kind = rawElement.kind;
  parsedElement.name = rawElement.name;
  if (rawElement.kind !== 'Namespace') {
    parsedElement.namespace = namespace;
  }

  switch (parsedElement.kind) {
    case 'Class':
    case 'Interface': {
      parsedElement.members = parseMembers(rawElement);
      break;
    }
    case 'Variable': {
      parsedElement.type = getParamType(
        rawElement.variableTypeTokenRange,
        rawElement.excerptTokens
      );

      break;
    }
    case 'TypeAlias': {
      parsedElement.members = getTypeAliases(rawElement);
      break;
    }
    case 'Function': {
      parsedElement.parameters = parseMethodParameters(rawElement);
      parsedElement.returnType = getParamType(
        rawElement.returnTypeTokenRange,
        rawElement.excerptTokens
      );
      break;
    }
    case 'Namespace': {
      // No additional parsing needed.
      break;
    }
    case 'Enum': {
      parsedElement.members = getEnumMembers(rawElement);
      break;
    }
    default: {
      throw Error(
        `Unsupported parsing for api element kind ${parsedElement.kind}.`
      );
    }
  }
  return parsedElement;
}

function parseMembers(rawElement: any) {
  const parsedMembers: any[] = [];
  rawElement.members.forEach((rawMember: any) => {
    if (rawMember?.name?.startsWith('ɵ')) {
      return;
    }
    const parsedMember: any = {};
    parsedMember.kind = rawMember.kind;
    parsedMember.name = rawMember.name;
    if (rawMember?.overloadIndex) {
      parsedMember.overloadIndex = rawMember.overloadIndex;
    }
    switch (rawMember.kind) {
      case 'Constructor': {
        parsedMember.name = `constructor`;
        parsedMember.parameters = parseMethodParameters(rawMember);
        break;
      }
      case 'IndexSignature':
      case 'MethodSignature':
      case 'Method': {
        parsedMember.parameters = parseMethodParameters(rawMember);
        parsedMember.returnType = getParamType(
          rawMember.returnTypeTokenRange,
          rawMember.excerptTokens
        );
        break;
      }
      case 'PropertySignature':
      case 'Property': {
        parsedMember.type = getParamType(
          rawMember.propertyTypeTokenRange,
          rawMember.excerptTokens
        );
        break;
      }
      default: {
        throw Error(
          `Unsupported member kind ${rawMember.kind} in ${rawElement.name}`
        );
      }
    }
    parsedMembers.push(parsedMember);
  });
  if (rawElement.kind === 'Class') {
    handleDefaultConstructor(parsedMembers);
  }
  return parsedMembers;
}

function parseMethodParameters(method: any): any[] {
  const parsedParams: any[] = [];
  method.parameters.forEach((rawParam: any) => {
    const parsedParam: any = {};
    parsedParam.name = rawParam.parameterName;

    // If type information is directly available (from bundled types extractor), use it
    if (rawParam.type !== undefined && rawParam.type !== '') {
      parsedParam.type = rawParam.type;
      parsedParam.canonicalReference = rawParam.canonicalReference || '';
      parsedParam.shortType = rawParam.shortType || '';
      parsedParam.importPath = rawParam.importPath || '';
      parsedParam.isOptional = rawParam.isOptional || false;
    } else {
      // Otherwise, extract from excerptTokens (standard API Extractor format)
      parsedParam.type = getParamType(
        rawParam.parameterTypeTokenRange,
        method.excerptTokens
      );
      parsedParam.isOptional = isParamDeclaredOptional(
        rawParam.parameterTypeTokenRange,
        method.excerptTokens
      );
      const typeToken = getTypeReferenceToken(
        rawParam.parameterTypeTokenRange,
        method.excerptTokens
      );
      // This if condition filters out anonymous types
      // like `payload: { userid: string, cart: Cart }`
      if (parsedParam.type?.startsWith(typeToken.text)) {
        parsedParam.canonicalReference = typeToken.canonicalReference ?? '';
        parsedParam.shortType = typeToken.text ?? '';
      } else {
        parsedParam.canonicalReference = '';
        parsedParam.shortType = '';
      }
      parsedParam.importPath = ''; // Initialize importPath (will be filled by setParamsImportPath later)
    }

    parsedParams.push(parsedParam);
  });
  return parsedParams;
}

function getParamType(tokenRange: any, tokens: any[]): string {
  const startIndex: number = tokenRange?.startIndex ?? -1;
  const endIndex: number = tokenRange?.endIndex ?? -1;

  // Validate token range
  if (!tokenRange || startIndex < 0 || endIndex < 0) {
    return '';
  }

  if (startIndex >= endIndex) {
    return '';
  }

  if (!tokens || tokens.length === 0 || endIndex > tokens.length) {
    return '';
  }

  const rawType = tokens
    .slice(startIndex, endIndex)
    .map((token) => token.text)
    .join('')
    .trim(); // Remove leading and trailing whitespace

  // Normalize the type by removing TypeScript-generated suffixes like $1, $2
  return normalizeTypeString(rawType);
}

/**
 * Normalize a type string by removing TypeScript-generated suffixes like $1, $2, etc.
 */
function normalizeTypeString(typeString: string): string {
  // Remove $1, $2, etc. suffixes from type names
  return typeString.replace(/([A-Za-z_][A-Za-z0-9_]*)\$\d+/g, '$1');
}

function isParamDeclaredOptional(typeTokenRange: any, tokens: any[]): boolean {
  const typeStartIndex: number = typeTokenRange.startIndex;
  if (typeStartIndex <= 0) {
    return false;
  }
  const declaration = tokens[typeStartIndex - 1];
  return declaration.kind === 'Content' && declaration.text.includes(`?:`);
}

function getTypeReferenceToken(tokenRange: any, tokens: any[]): any {
  const startIndex: number = tokenRange.startIndex;
  const endIndex: number = tokenRange.endIndex;
  return (
    tokens
      .slice(startIndex, endIndex)
      .find((token) => token.kind === 'Reference') ?? {}
  );
}

function getTypeAliases(rawElement: any): any {
  if (!rawElement.excerptTokens || !rawElement.typeTokenRange) {
    return [];
  }

  const startIndex = rawElement.typeTokenRange.startIndex;
  const endIndex = rawElement.typeTokenRange.endIndex;

  // Validate range
  if (startIndex < 0 || endIndex < 0 || startIndex >= endIndex) {
    return [];
  }

  const tokens = rawElement.excerptTokens.slice(startIndex, endIndex);

  // Join tokens into a single string, then normalize
  const fullTypeString = tokens
    .map((token: any) => token.text)
    .join('')
    .trim();

  // Normalize the type string
  const normalized = normalizeTypeString(fullTypeString);

  // Return as array with single normalized string
  // (matches expected format for type alias comparison)
  return [normalized];
}

function getEnumMembers(rawElement: any): any {
  return rawElement.members.map((member: any) => member.name);
}

function parseParameterImportPaths(publicApiData): void {
  publicApiData.forEach((apiElement: any) => {
    if (apiElement.parameters?.length > 0) {
      setParamsImportPath(apiElement.parameters, publicApiData);
    }
    apiElement.members?.forEach((member: any) => {
      if (member.parameters?.length > 0) {
        setParamsImportPath(member.parameters, publicApiData);
      }
    });
  });
}

function setParamsImportPath(parameters: any[], apiData: any[]) {
  parameters.forEach((param: any, index: number) => {
    if (param.canonicalReference.startsWith('@spartacus')) {
      // lookup
      const kind = extractKindFromCanonical(param.canonicalReference); // class, interface, etc
      const importPath = lookupImportPath(param.shortType, kind, apiData);
      if (!importPath) {
        console.log(
          `Warning: "${param.shortType}" is referenced in the public API, but does not seem to be part of the public API.`
        );
      }
      parameters[index].importPath = importPath;
    } else {
      // parse
      const importPath = param.canonicalReference.substring(
        0,
        param.canonicalReference.indexOf('!')
      );
      parameters[index].importPath = unEscapePackageName(importPath);
    }
  });
}

export function extractKindFromCanonical(canonicalReference): string {
  return canonicalReference.substring(canonicalReference.lastIndexOf(':') + 1);
}

export function lookupImportPath(
  elementName: string,
  kind: string,
  apiData: any[]
): string {
  let lookupName = elementName;
  let namespace;
  if (elementName.includes('.')) {
    namespace = elementName.substring(0, elementName.indexOf('.'));
    lookupName = elementName.substring(elementName.indexOf('.') + 1);
  }
  const element = apiData.find((element: any) => {
    return (
      element.name === lookupName &&
      // When the ekind it type, it could match at least TypeAlias or Enum
      // So we don't try to match the kind when the value is 'type'
      (kind.toLowerCase() === 'type'
        ? true
        : element.kind.toLowerCase() === kind.toLowerCase()) &&
      (namespace ? element.namespace === namespace : true)
    );
  });
  if (element) {
    return element.entryPoint;
  } else {
    return '';
  }
}

function handleDefaultConstructor(members: any): void {
  if (!members.some((member) => member.kind === 'Constructor')) {
    members.push(createDefaultConstructor());
  }
}

function createDefaultConstructor(): any {
  return {
    name: 'constructor',
    kind: 'Constructor',
    overloadIndex: 1,
    parameters: [],
  };
}
