/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Alternative extractor for bundled types using TypeScript Compiler API.
 *
 * This extractor is used when the standard API Extractor fails with declaration-merging
 * format (bundled types). It directly analyzes .d.ts files using TypeScript Compiler API
 * and generates JSON output compatible with parse.ts.
 *
 * Usage: ts-node extract-bundled.ts <spartacusHomeDir>
 * Example: ts-node extract-bundled.ts ../../src/new
 */

import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import { globSync } from 'glob';

const spartacusHomeDir = process.argv[2];
if (!spartacusHomeDir) {
  console.log('Usage: ts-node extract-bundled.ts <spartacusHomeDir>');
  console.log('Example: ts-node extract-bundled.ts ../../src/new');
  process.exit(1);
}

const distFolderPath = `${spartacusHomeDir}/dist`;
const tempFolder = `${spartacusHomeDir}/temp`;

if (!fs.existsSync(tempFolder)) {
  fs.mkdirSync(tempFolder, { recursive: true });
}

console.log(`Extract public API for bundled types in ${distFolderPath}.`);

// Find all bundled type files (types/*.d.ts pattern)
const bundledFiles = globSync(`${distFolderPath}/*/types/*.d.ts`, {
  ignore: ['**/node_modules/**', '**/public_api.d.ts']
});

console.log(`Found ${bundledFiles.length} bundled type files.`);

let successCount = 0;
let failCount = 0;

bundledFiles.forEach((filePath, index) => {
  if ((index + 1) % 10 === 0) {
    console.log(`Processing (${index + 1}/${bundledFiles.length}): ${filePath}`);
  }

  try {
    const packageName = getPackageNameFromPath(filePath);
    const apiData = extractApiFromBundledFile(filePath, packageName);

    // Write to temp folder
    const outputFileName = escapePackageName(packageName);
    const outputPath = `${tempFolder}/${outputFileName}.api.json`;

    fs.writeFileSync(outputPath, JSON.stringify(apiData, null, 2));
    successCount++;
  } catch (error: any) {
    console.error(`Failed to process ${filePath}: ${error.message}`);
    failCount++;
  }
});

console.log(`\n✓ Successfully processed ${successCount}/${bundledFiles.length} files`);
if (failCount > 0) {
  console.log(`⚠️  Failed to process ${failCount} file(s)`);
}

function getPackageNameFromPath(filePath: string): string {
  // Extract package name from .d.ts filename like: spartacus-organization-account-summary.d.ts
  // This gives us the full package name encoded in the filename
  const fileName = path.basename(filePath, '.d.ts');

  // Skip public_api.d.ts files as they are re-exports
  if (fileName === 'public_api') {
    return '@spartacus/unknown';
  }

  // Convert spartacus-core -> @spartacus/core
  // Convert spartacus-organization-account-summary -> @spartacus/organization_account-summary
  if (fileName.startsWith('spartacus-')) {
    const packagePath = fileName.substring('spartacus-'.length).replace(/-/g, '_');
    return `@spartacus/${packagePath}`;
  }

  return '@spartacus/unknown';
}

function escapePackageName(packageName: string): string {
  return packageName.replace('@', '').replace('/', '_');
}

function extractApiFromBundledFile(filePath: string, packageName: string): any {
  const sourceText = fs.readFileSync(filePath, 'utf-8');

  // Create a simple SourceFile
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );

  const apiElements: any[] = [];

  // Visit all top-level declarations
  // In bundled types, all declarations are part of the public API
  ts.forEachChild(sourceFile, (node) => {
    if (isPublicDeclaration(node)) {
      const element = extractApiElement(node);
      if (element) {
        apiElements.push(element);
      }
    }
  });

  return {
    metadata: {
      toolPackage: '@microsoft/api-extractor',
      toolVersion: 'custom-bundled-extractor',
      schemaVersion: 1011,
      oldestForwardsCompatibleVersion: 1001,
      tsdocConfig: {}
    },
    kind: 'Package',
    canonicalReference: `${packageName}!`,
    docComment: '',
    name: packageName,
    preserveMemberOrder: false,
    members: [
      {
        kind: 'EntryPoint',
        canonicalReference: `${packageName}!`,
        name: '',
        preserveMemberOrder: false,
        members: apiElements
      }
    ]
  };
}

function isPublicDeclaration(node: ts.Node): boolean {
  // In bundled .d.ts files, we want to capture:
  // - export declarations
  // - declare statements (declare const, declare class, etc.)
  // - top-level interfaces, classes, types, enums, functions

  // Skip import statements
  if (ts.isImportDeclaration(node) || ts.isImportEqualsDeclaration(node)) {
    return false;
  }

  // Skip module declarations (declare module)
  if (ts.isModuleDeclaration(node)) {
    return false;
  }

  // Accept export declarations
  if (ts.isExportDeclaration(node)) {
    return true;
  }

  // Accept declarations with export keyword
  const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined;
  if (modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) {
    return true;
  }

  // Accept declarations with declare keyword (declare const, declare class, etc.)
  if (modifiers?.some(m => m.kind === ts.SyntaxKind.DeclareKeyword)) {
    return true;
  }

  // Accept top-level type declarations even without modifiers
  return ts.isInterfaceDeclaration(node) ||
         ts.isTypeAliasDeclaration(node) ||
         ts.isEnumDeclaration(node) ||
         ts.isClassDeclaration(node) ||
         ts.isFunctionDeclaration(node);
}

function extractApiElement(node: ts.Node): any {
  const name = getDeclarationName(node);
  if (!name) return null;

  let kind = 'Unknown';
  let members: any[] = [];
  let excerptTokens: any[] = [];
  let parameters: any[] = [];

  if (ts.isClassDeclaration(node)) {
    kind = 'Class';
    members = getMembers(node);
  } else if (ts.isInterfaceDeclaration(node)) {
    kind = 'Interface';
    members = getMembers(node);
  } else if (ts.isFunctionDeclaration(node)) {
    kind = 'Function';
    excerptTokens = [{ kind: 'Content', text: name }];
    parameters = getFunctionParameters(node);
  } else if (ts.isTypeAliasDeclaration(node)) {
    kind = 'TypeAlias';
    excerptTokens = [{ kind: 'Content', text: name }];
  } else if (ts.isEnumDeclaration(node)) {
    kind = 'Enum';
    members = getEnumMembers(node);
  } else if (ts.isVariableStatement(node)) {
    kind = 'Variable';
    excerptTokens = [{ kind: 'Content', text: name }];
  } else if (ts.isExportDeclaration(node)) {
    // Skip re-exports
    return null;
  }

  const element: any = {
    kind,
    canonicalReference: `${name}:${kind.toLowerCase()}`,
    docComment: getDocComment(node),
    excerptTokens,
    name,
    releaseTag: 'Public'
  };

  // Always include members for Class and Interface (even if empty)
  if (kind === 'Class' || kind === 'Interface' || kind === 'Enum') {
    element.members = members;
  }

  // Always include parameters for functions, even if empty
  if (kind === 'Function') {
    element.parameters = parameters;
    element.returnTypeTokenRange = { startIndex: 0, endIndex: 0 };
  }

  // Add variableTypeTokenRange for variables
  if (kind === 'Variable') {
    element.variableTypeTokenRange = { startIndex: 0, endIndex: 0 };
  }

  // Add typeTokenRange for TypeAlias
  if (kind === 'TypeAlias') {
    element.typeTokenRange = { startIndex: 0, endIndex: 0 };
  }

  return element;
}

function getDeclarationName(node: ts.Node): string | null {
  if (ts.isClassDeclaration(node) ||
      ts.isInterfaceDeclaration(node) ||
      ts.isFunctionDeclaration(node) ||
      ts.isTypeAliasDeclaration(node) ||
      ts.isEnumDeclaration(node)) {
    return node.name?.getText() ?? null;
  }

  if (ts.isVariableStatement(node)) {
    const declaration = node.declarationList.declarations[0];
    return declaration?.name?.getText() ?? null;
  }

  if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
    return `export * from ${node.moduleSpecifier.getText()}`;
  }

  return null;
}

function getDocComment(node: ts.Node): string {
  const jsDoc = (node as any).jsDoc;
  if (jsDoc && jsDoc.length > 0) {
    const comment = jsDoc[0].comment;
    // Ensure we return a plain string, not a node reference
    return typeof comment === 'string' ? comment : '';
  }
  return '';
}

function getMembers(node: ts.Node): any[] {
  const members: any[] = [];

  if (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) {
    node.members?.forEach(member => {
      const memberName = getMemberName(member);
      if (memberName && !memberName.startsWith('ɵ')) {
        const memberData: any = {
          kind: getMemberKind(member),
          name: memberName,
          canonicalReference: memberName,
          excerptTokens: []
        };

        // Always add parameters for methods and constructors (even if empty)
        if (ts.isMethodDeclaration(member) ||
            ts.isMethodSignature(member) ||
            ts.isConstructorDeclaration(member)) {
          memberData.parameters = getMethodParameters(member);
          // Methods also need returnTypeTokenRange
          if (ts.isMethodDeclaration(member) || ts.isMethodSignature(member)) {
            memberData.returnTypeTokenRange = { startIndex: 0, endIndex: 0 };
          }
        }

        // Properties need propertyTypeTokenRange
        if (ts.isPropertyDeclaration(member) || ts.isPropertySignature(member)) {
          memberData.propertyTypeTokenRange = { startIndex: 0, endIndex: 0 };
        }

        members.push(memberData);
      }
    });
  }

  return members;
}

function getEnumMembers(node: ts.Node): any[] {
  const members: any[] = [];

  if (ts.isEnumDeclaration(node)) {
    node.members?.forEach(member => {
      if (ts.isEnumMember(member) && member.name) {
        const memberName = member.name.getText();
        members.push({
          kind: 'EnumMember',
          name: memberName,
          canonicalReference: memberName,
          excerptTokens: []
        });
      }
    });
  }

  return members;
}

function getMemberName(member: ts.Node): string | null {
  if (ts.isConstructorDeclaration(member)) {
    return 'constructor';
  }
  if (ts.isPropertyDeclaration(member) ||
      ts.isMethodDeclaration(member) ||
      ts.isPropertySignature(member) ||
      ts.isMethodSignature(member)) {
    return member.name?.getText() ?? null;
  }
  return null;
}

function getMemberKind(member: ts.Node): string {
  if (ts.isMethodDeclaration(member) || ts.isMethodSignature(member)) {
    return 'Method';
  }
  if (ts.isPropertyDeclaration(member) || ts.isPropertySignature(member)) {
    return 'Property';
  }
  if (ts.isConstructorDeclaration(member)) {
    return 'Constructor';
  }
  return 'Unknown';
}

function getFunctionParameters(node: ts.FunctionDeclaration): any[] {
  if (!node.parameters) return [];

  return node.parameters.map((param) => ({
    parameterName: param.name.getText(),
    parameterTypeTokenRange: {
      startIndex: 0,
      endIndex: 0
    }
  }));
}

function getMethodParameters(node: ts.MethodDeclaration | ts.MethodSignature | ts.ConstructorDeclaration): any[] {
  if (!node.parameters) return [];

  return node.parameters.map((param) => ({
    parameterName: param.name.getText(),
    parameterTypeTokenRange: {
      startIndex: 0,
      endIndex: 0
    }
  }));
}
