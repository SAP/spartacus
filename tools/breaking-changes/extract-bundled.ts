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
      const element = extractApiElement(node, packageName);
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

function extractApiElement(node: ts.Node, packageName: string): any {
  const name = getDeclarationName(node);
  if (!name) return null;

  let kind = 'Unknown';
  let members: any[] = [];
  let excerptTokens: any[] = [];
  let parameters: any[] = [];

  if (ts.isClassDeclaration(node)) {
    kind = 'Class';
    members = getMembers(node, packageName);
    excerptTokens = generateExcerptTokens(node);
  } else if (ts.isInterfaceDeclaration(node)) {
    kind = 'Interface';
    members = getMembers(node, packageName);
    excerptTokens = generateExcerptTokens(node);
  } else if (ts.isFunctionDeclaration(node)) {
    kind = 'Function';
    excerptTokens = generateExcerptTokens(node);
    parameters = getFunctionParameters(node, excerptTokens, packageName);
  } else if (ts.isTypeAliasDeclaration(node)) {
    kind = 'TypeAlias';
    excerptTokens = generateExcerptTokens(node);
  } else if (ts.isEnumDeclaration(node)) {
    kind = 'Enum';
    members = getEnumMembers(node);
    excerptTokens = generateExcerptTokens(node);
  } else if (ts.isVariableStatement(node)) {
    kind = 'Variable';
    excerptTokens = generateExcerptTokens(node);
  } else if (ts.isExportDeclaration(node)) {
    // Skip re-exports
    return null;
  }

  const element: any = {
    kind,
    canonicalReference: `${packageName}!${name}:${kind.toLowerCase()}`,
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
    element.returnTypeTokenRange = findTokenRange(excerptTokens, 'return');
  }

  // Add variableTypeTokenRange for variables
  if (kind === 'Variable') {
    element.variableTypeTokenRange = findTokenRange(excerptTokens, 'type');
  }

  // Add typeTokenRange for TypeAlias
  if (kind === 'TypeAlias') {
    element.typeTokenRange = findTokenRange(excerptTokens, 'type');
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

function getMembers(node: ts.Node, packageName: string): any[] {
  const members: any[] = [];

  if (ts.isClassDeclaration(node) || ts.isInterfaceDeclaration(node)) {
    node.members?.forEach(member => {
      const memberName = getMemberName(member);
      if (memberName && !memberName.startsWith('ɵ')) {
        const excerptTokens = generateExcerptTokens(member);

        const memberData: any = {
          kind: getMemberKind(member),
          name: memberName,
          canonicalReference: memberName,
          excerptTokens
        };

        // Always add parameters for methods and constructors (even if empty)
        if (ts.isMethodDeclaration(member) ||
            ts.isMethodSignature(member) ||
            ts.isConstructorDeclaration(member)) {
          memberData.parameters = getMethodParameters(member, excerptTokens, packageName);
          // Methods also need returnTypeTokenRange
          if (ts.isMethodDeclaration(member) || ts.isMethodSignature(member)) {
            memberData.returnTypeTokenRange = findTokenRange(excerptTokens, 'return');
          }
        }

        // Properties need propertyTypeTokenRange
        if (ts.isPropertyDeclaration(member) || ts.isPropertySignature(member)) {
          memberData.propertyTypeTokenRange = findTokenRange(excerptTokens, 'type');
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

function getFunctionParameters(node: ts.FunctionDeclaration, excerptTokens: any[], packageName: string): any[] {
  if (!node.parameters) return [];

  return node.parameters.map((param, index) => {
    const paramName = param.name.getText();
    const paramTypeRange = findParamTypeRange(excerptTokens, paramName, index);

    return {
      parameterName: paramName,
      parameterTypeTokenRange: paramTypeRange
    };
  });
}

function getMethodParameters(node: ts.MethodDeclaration | ts.MethodSignature | ts.ConstructorDeclaration, excerptTokens: any[], packageName: string): any[] {
  if (!node.parameters) return [];

  return node.parameters.map((param, index) => {
    const paramName = param.name.getText();
    const paramTypeRange = findParamTypeRange(excerptTokens, paramName, index);

    // Extract type information from parameter
    const typeInfo = extractTypeInfo(param, packageName);

    return {
      parameterName: paramName,
      parameterTypeTokenRange: paramTypeRange,
      isOptional: !!param.questionToken,
      ...typeInfo
    };
  });
}

/**
 * Extract type information from a parameter or node with a type annotation.
 */
function extractTypeInfo(param: ts.ParameterDeclaration, packageName: string): {
  type: string;
  canonicalReference: string;
  shortType: string;
  importPath: string;
} {
  if (!param.type) {
    return {
      type: '',
      canonicalReference: '',
      shortType: '',
      importPath: ''
    };
  }

  const fullType = param.type.getText();

  // Extract the main type name (before generics or unions)
  const mainType = extractMainType(fullType);

  // Determine import path based on type
  const importInfo = determineImportPath(mainType, packageName);

  return {
    type: fullType,
    canonicalReference: importInfo.canonicalReference,
    shortType: mainType,
    importPath: importInfo.importPath
  };
}

/**
 * Determine the import path and canonical reference for a type.
 * Returns both the canonical reference (for lookups) and import path (for code generation).
 */
function determineImportPath(typeName: string, packageName: string): {
  canonicalReference: string;
  importPath: string;
} {
  if (!typeName) {
    return { canonicalReference: '', importPath: '' };
  }

  // Angular types
  if (typeName === 'HttpClient' || typeName === 'HttpHeaders' || typeName === 'HttpResponse' || typeName === 'HttpParams') {
    return {
      canonicalReference: `@angular/common!${typeName}:class`,
      importPath: '@angular/common'
    };
  }

  if (typeName === 'Location') {
    return {
      canonicalReference: `@angular/common!${typeName}:class`,
      importPath: '@angular/common'
    };
  }

  if (typeName === 'Router' || typeName === 'ActivatedRoute') {
    return {
      canonicalReference: `@angular/router!${typeName}:class`,
      importPath: '@angular/router'
    };
  }

  if (typeName === 'NavigationExtras') {
    return {
      canonicalReference: `@angular/router!${typeName}:interface`,
      importPath: '@angular/router'
    };
  }

  if (typeName.startsWith('Form') || typeName.startsWith('UntypedForm')) {
    return {
      canonicalReference: `@angular/forms!${typeName}:class`,
      importPath: '@angular/forms'
    };
  }

  // Common Angular core types
  const angularCoreTypes = ['ChangeDetectorRef', 'ElementRef', 'Injector', 'Renderer2', 'ViewContainerRef', 'TemplateRef', 'ComponentRef'];
  if (angularCoreTypes.includes(typeName)) {
    return {
      canonicalReference: `@angular/core!${typeName}:class`,
      importPath: '@angular/core'
    };
  }

  // RxJS types
  if (typeName === 'Observable' || typeName === 'Subject' || typeName === 'BehaviorSubject' || typeName === 'ReplaySubject') {
    return {
      canonicalReference: `rxjs!${typeName}:class`,
      importPath: 'rxjs'
    };
  }

  // NgRx types
  if (typeName === 'Store') {
    return {
      canonicalReference: `@ngrx/store!${typeName}:class`,
      importPath: '@ngrx/store'
    };
  }

  // For Spartacus types, assume they come from the same package
  // Use the package name to construct canonical reference
  return {
    canonicalReference: `${packageName}!${typeName}:class`,
    importPath: packageName
  };
}

/**
 * Extract the main type name from a complex type string.
 */
function extractMainType(typeString: string): string {
  // Remove whitespace
  const cleanType = typeString.trim();

  // Handle union types - take the first type
  if (cleanType.includes('|')) {
    const firstType = cleanType.split('|')[0].trim();
    return extractMainType(firstType);
  }

  // Handle generics - extract base type
  const genericMatch = cleanType.match(/^([A-Za-z_$][A-Za-z0-9_$]*)</);
  if (genericMatch) {
    return normalizeTypeName(genericMatch[1]);
  }

  // Handle simple types
  const simpleMatch = cleanType.match(/^([A-Za-z_$][A-Za-z0-9_$]*)/);
  if (simpleMatch) {
    return normalizeTypeName(simpleMatch[1]);
  }

  return '';
}

/**
 * Normalize type names by removing TypeScript-generated suffixes like $1, $2, etc.
 * These suffixes are added by TypeScript when there are naming conflicts.
 */
function normalizeTypeName(typeName: string): string {
  // Remove suffixes like $1, $2, etc.
  return typeName.replace(/\$\d+$/, '');
}

/**
 * Generate excerpt tokens from a TypeScript node.
 * This creates a token list similar to what API Extractor generates.
 */
function generateExcerptTokens(node: ts.Node): any[] {
  const tokens: any[] = [];
  const sourceFile = node.getSourceFile();

  // Get the full text of the node
  const fullText = node.getText(sourceFile);

  // Use TypeScript's scanner to tokenize
  const scanner = ts.createScanner(
    ts.ScriptTarget.Latest,
    false,
    ts.LanguageVariant.Standard,
    fullText
  );

  while (scanner.scan() !== ts.SyntaxKind.EndOfFileToken) {
    const tokenText = scanner.getTokenText();
    const tokenKind = scanner.getToken();
    const tokenPos = scanner.getTokenPos();

    // Skip empty tokens
    if (!tokenText) {
      continue;
    }

    // Determine if this is a reference (type identifier) or content
    // This is a simplified heuristic - in real API Extractor this is more sophisticated
    const isTypeReference = tokenKind === ts.SyntaxKind.Identifier && isLikelyTypeReference(fullText, tokenPos, tokenText);

    tokens.push({
      kind: isTypeReference ? 'Reference' : 'Content',
      text: tokenText,
      canonicalReference: isTypeReference ? `${tokenText}:type` : undefined
    });
  }

  return tokens;
}

/**
 * Heuristic to determine if an identifier is likely a type reference.
 */
function isLikelyTypeReference(fullText: string, tokenPos: number, tokenText: string): boolean {
  // Check what comes before the identifier
  const before = fullText.substring(Math.max(0, tokenPos - 20), tokenPos).trim();

  // Type references typically appear after: :, <, extends, implements, |, &, typeof
  if (before.endsWith(':') ||
      before.endsWith('<') ||
      before.endsWith('extends') ||
      before.endsWith('implements') ||
      before.endsWith('|') ||
      before.endsWith('&') ||
      before.endsWith('typeof')) {
    return true;
  }

  // Also check if the identifier starts with an uppercase letter (common for types)
  // But exclude keywords
  const keywords = ['constructor', 'function', 'class', 'interface', 'type', 'enum'];
  return !keywords.includes(tokenText.toLowerCase()) && /^[A-Z]/.test(tokenText);
}

/**
 * Find the token range for a specific parameter type in the excerpt tokens.
 */
function findParamTypeRange(tokens: any[], paramName: string, paramIndex: number): any {
  // Find the parameter name in tokens
  let paramNameIndex = -1;
  let foundCount = 0;

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].text === paramName && tokens[i].kind === 'Content') {
      if (foundCount === paramIndex) {
        paramNameIndex = i;
        break;
      }
      foundCount++;
    }
  }

  if (paramNameIndex === -1) {
    return { startIndex: 0, endIndex: 0 };
  }

  // Find the colon after parameter name
  let colonIndex = paramNameIndex + 1;
  while (colonIndex < tokens.length && tokens[colonIndex].text.trim() !== ':') {
    colonIndex++;
  }

  if (colonIndex >= tokens.length) {
    return { startIndex: 0, endIndex: 0 };
  }

  // Start of type is after the colon
  const startIndex = colonIndex + 1;

  // Find end of type (before comma, closing paren, or =)
  let endIndex = startIndex;
  let depth = 0;

  while (endIndex < tokens.length) {
    const text = tokens[endIndex].text;

    if (text === '<' || text === '(' || text === '[') {
      depth++;
    } else if (text === '>' || text === ')' || text === ']') {
      depth--;
    } else if (depth === 0 && (text === ',' || text === ')' || text === '=' || text === ';')) {
      break;
    }

    endIndex++;
  }

  return { startIndex, endIndex };
}

/**
 * Find token range for return type or property type.
 */
function findTokenRange(tokens: any[], rangeType: 'return' | 'type'): any {
  if (rangeType === 'return') {
    // Find ':' after closing ')' for return type
    let parenDepth = 0;
    let foundClosingParen = false;

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].text === '(') parenDepth++;
      if (tokens[i].text === ')') {
        parenDepth--;
        if (parenDepth === 0) foundClosingParen = true;
      }

      if (foundClosingParen && tokens[i].text === ':') {
        // Return type starts after this colon
        const startIndex = i + 1;
        let endIndex = startIndex;

        // Find end (before => or ; or {)
        while (endIndex < tokens.length) {
          const text = tokens[endIndex].text;
          if (text === '=>' || text === ';' || text === '{') {
            break;
          }
          endIndex++;
        }

        return { startIndex, endIndex };
      }
    }
  } else if (rangeType === 'type') {
    // Find ':' for property/variable type
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].text === ':') {
        const startIndex = i + 1;
        let endIndex = startIndex;

        // Find end (before = or ;)
        while (endIndex < tokens.length) {
          const text = tokens[endIndex].text;
          if (text === '=' || text === ';') {
            break;
          }
          endIndex++;
        }

        return { startIndex, endIndex };
      }
    }
  }

  return { startIndex: 0, endIndex: 0 };
}
