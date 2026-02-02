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
import { unEscapePackageName } from './common';

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
  // Extract package name by reading package.json from the dist folder
  // This ensures we get the REAL package name (e.g., @spartacus/storefront)
  // instead of the folder name (e.g., storefrontlib)

  const fileName = path.basename(filePath, '.d.ts');

  // Skip public_api.d.ts files as they are re-exports
  if (fileName === 'public_api') {
    return '@spartacus/unknown';
  }

  // Get the directory containing the types folder
  // Walk up from types folder to find package.json
  // Example: /path/to/dist/cart/types/spartacus-cart-base.d.ts
  //          → Check: /path/to/dist/cart/base/package.json (no name field)
  //          → Check: /path/to/dist/cart/package.json (has name)
  //          → Extract sub-path from filename: spartacus-cart-base → base

  let currentDir = path.dirname(filePath); // .../types

  // Go up from types folder
  if (path.basename(currentDir) === 'types') {
    currentDir = path.dirname(currentDir); // .../cart or .../cart/root
  }

  // Try to find package.json with name field
  let packageName: string | null = null;
  let searchDir = currentDir;

  for (let i = 0; i < 3; i++) {
    const packageJsonPath = path.join(searchDir, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

        if (packageJson.name) {
          packageName = packageJson.name;

          // Package names in bundled format are escaped (e.g., spartacus_core)
          // We need to unescape them to get real npm names (@spartacus/core)
          packageName = unEscapePackageName(packageName);

          // unEscapePackageName converts spartacus_core → spartacus/core
          // But we need @spartacus/core, so add @ prefix if missing
          if (packageName.startsWith('spartacus/') && !packageName.startsWith('@')) {
            packageName = '@' + packageName;
          }

          break;
        }
      } catch (error: any) {
        console.warn(`Could not parse package.json at ${packageJsonPath}: ${error.message}`);
      }
    }

    // Go up one directory
    const parentDir = path.dirname(searchDir);
    if (parentDir === searchDir || !searchDir.includes('/dist/')) {
      break; // Reached root or went above dist folder
    }
    searchDir = parentDir;
  }

  if (!packageName) {
    console.warn(`Could not find package.json with name for: ${filePath}`);
    return '@spartacus/unknown';
  }

  // Now extract sub-entry point from filename if applicable
  // Example: spartacus-cart-base.d.ts → base is the sub-entry
  // Example: spartacus-cart-base-components.d.ts → base/components
  // Example: spartacus-cart.d.ts → no sub-entry (main package)

  // Remove 'spartacus-' prefix from filename
  if (fileName.startsWith('spartacus-')) {
    const withoutPrefix = fileName.substring('spartacus-'.length);

    // Extract the base package name from the found packageName
    // @spartacus/cart → cart
    const basePackage = packageName.replace('@spartacus/', '');

    // Check if filename has more than just the base package
    // spartacus-cart.d.ts → withoutPrefix = 'cart' → matches base, no sub-entry
    // spartacus-cart-base.d.ts → withoutPrefix = 'cart-base' → has sub-entry 'base'
    // spartacus-cart-base-components.d.ts → withoutPrefix = 'cart-base-components' → 'base/components'

    if (withoutPrefix === basePackage) {
      // Main package file
      return packageName;
    }

    // Has sub-entry - extract it
    if (withoutPrefix.startsWith(basePackage + '-')) {
      const subPath = withoutPrefix.substring(basePackage.length + 1);
      // Convert hyphens to slashes for sub-paths
      // 'base-components' → 'base/components'
      // 'base-components-add-to-cart' → 'base/components/add-to-cart'
      const subPathWithSlashes = subPath.replace(/-/g, '/');
      return `${packageName}/${subPathWithSlashes}`;
    }
  }

  // Fallback
  return packageName;
}

function escapePackageName(packageName: string): string {
  // Remove @ and replace ALL slashes with underscores
  // @spartacus/subscription-billing → spartacus_subscription-billing
  // @spartacus/organization/account-summary → spartacus_organization_account-summary
  return packageName.replace('@', '').replace(/\//g, '_');
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

  // Escape the package name for storage (will be unescaped by parse.ts)
  // This matches the format used by the old extract.ts
  // Example: @spartacus/subscription-billing/root → @spartacus/subscription-billing_root
  const escapedPackageName = packageName.replace(/\//g, '_').replace(/_/, '/');

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
    name: escapedPackageName,
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

  // Add typeTokenRange for TypeAlias (uses '=' separator, not ':')
  if (kind === 'TypeAlias') {
    let typeRange = findTokenRange(excerptTokens, 'typealias');

    // Fallback: if '=' not found, try to extract everything after the type name
    if (typeRange.startIndex === 0 && typeRange.endIndex === 0 && excerptTokens.length > 0) {
      // Find the type name in tokens
      const nameIndex = excerptTokens.findIndex((t: any) => t.text === name);
      if (nameIndex >= 0 && nameIndex < excerptTokens.length - 1) {
        // Use everything after the name as the type
        typeRange = { startIndex: nameIndex + 1, endIndex: excerptTokens.length };
      }
    }

    element.typeTokenRange = typeRange;
  }

  return element;
}

function getDeclarationName(node: ts.Node): string | null {
  let name: string | null = null;

  if (ts.isClassDeclaration(node) ||
      ts.isInterfaceDeclaration(node) ||
      ts.isFunctionDeclaration(node) ||
      ts.isTypeAliasDeclaration(node) ||
      ts.isEnumDeclaration(node)) {
    name = node.name?.getText() ?? null;
  } else if (ts.isVariableStatement(node)) {
    const declaration = node.declarationList.declarations[0];
    name = declaration?.name?.getText() ?? null;
  } else if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
    name = `export * from ${node.moduleSpecifier.getText()}`;
  }

  // Normalize name by removing TypeScript-generated suffixes like $1, $2, etc.
  // These are added during bundling when there are naming conflicts
  // Example: ICON_TYPE$1 → ICON_TYPE, User$2 → User
  if (name) {
    name = name.replace(/\$\d+$/, '');
  }

  return name;
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

        // Properties need propertyTypeTokenRange only if they have an explicit type annotation
        if (ts.isPropertyDeclaration(member) || ts.isPropertySignature(member)) {
          // Check if property has explicit type annotation in AST
          // For properties without explicit type (e.g., readonly RELEVANCE = ':relevance'),
          // TypeScript infers the type from the initializer, and we shouldn't extract a type range
          if (member.type) {
            memberData.propertyTypeTokenRange = findTokenRange(excerptTokens, 'type');
          } else {
            // No explicit type - set empty range
            memberData.propertyTypeTokenRange = { startIndex: 0, endIndex: 0 };
          }
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
        let memberName = member.name.getText();
        // Normalize name by removing TypeScript-generated suffixes like $1, $2
        memberName = memberName.replace(/\$\d+$/, '');
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
    const name = member.name?.getText() ?? null;
    // Normalize name by removing TypeScript-generated suffixes like $1, $2
    return name ? name.replace(/\$\d+$/, '') : null;
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

    // Extract type information from parameter (same as for methods)
    const typeInfo = extractTypeInfo(param, packageName);

    return {
      parameterName: paramName,
      parameterTypeTokenRange: paramTypeRange,
      isOptional: !!param.questionToken,
      ...typeInfo
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
  let fullType = '';

  // First try to get the explicit type annotation
  if (param.type) {
    const rawFullType = param.type.getText();
    fullType = normalizeTypeString(rawFullType);
  } else if (param.initializer) {
    // If no explicit type but has a default value, infer the type
    // For example: startIndex = 0 -> number
    const initializerText = param.initializer.getText();

    // Simple type inference based on initializer
    if (/^\d+$/.test(initializerText)) {
      fullType = 'number';
    } else if (initializerText === 'true' || initializerText === 'false') {
      fullType = 'boolean';
    } else if (initializerText.startsWith("'") || initializerText.startsWith('"') || initializerText.startsWith('`')) {
      fullType = 'string';
    } else if (initializerText === 'null') {
      fullType = 'null';
    } else if (initializerText === 'undefined') {
      fullType = 'undefined';
    } else {
      // For more complex initializers, try to extract type from the expression
      // This is a best-effort approach
      fullType = 'any';
    }
  }

  if (!fullType) {
    return {
      type: '',
      canonicalReference: '',
      shortType: '',
      importPath: ''
    };
  }

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
 * Normalize a type string by removing TypeScript-generated suffixes like $1, $2, etc.
 * and trailing semicolons (formatting differences).
 */
function normalizeTypeString(typeString: string): string {
  // Remove $1, $2, etc. suffixes from type names
  let normalized = typeString.replace(/([A-Za-z_][A-Za-z0-9_]*)\$\d+/g, '$1');

  // Remove trailing semicolons (formatting differences)
  normalized = normalized.replace(/;+\s*$/, '');

  return normalized;
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

  // Get the full text of the node and normalize it
  const fullText = normalizeTypeString(node.getText(sourceFile));

  // Instead of using scanner which tokenizes too granularly,
  // we'll create meaningful tokens based on the text structure

  // For simple cases, create a single content token
  // This prevents the issue of having every character/keyword as a separate token

  // Check if this is a type-related node (TypeAlias, Variable, Property, Method, etc.)
  if (ts.isTypeAliasDeclaration(node) ||
      ts.isPropertyDeclaration(node) ||
      ts.isPropertySignature(node) ||
      ts.isMethodDeclaration(node) ||
      ts.isMethodSignature(node) ||
      ts.isFunctionDeclaration(node) ||
      ts.isConstructorDeclaration(node) ||
      ts.isVariableStatement(node)) {

    // For these nodes, we'll parse more carefully to identify type references
    return generateStructuredTokens(fullText);
  }

  // For other nodes, create a single token with the full text
  tokens.push({
    kind: 'Content',
    text: fullText
  });

  return tokens;
}

/**
 * Generate structured tokens that properly identify type references.
 * This function tokenizes the text more carefully to preserve important characters
 * like : = ; that are needed by findTokenRange().
 *
 * IMPROVED: Instead of tokenizing every single character, we now parse more intelligently
 * to keep type annotations intact and avoid fragmenting them.
 */
function generateStructuredTokens(text: string): any[] {
  const tokens: any[] = [];
  let i = 0;

  while (i < text.length) {
    const char = text[i];
    const nextChar = i + 1 < text.length ? text[i + 1] : '';

    // Check for string literals (single or double quotes)
    if (char === "'" || char === '"' || char === '`') {
      const quoteChar = char;
      let stringLiteral = char;
      i++;

      // Consume entire string literal, handling escape sequences
      while (i < text.length) {
        if (text[i] === '\\' && i + 1 < text.length) {
          // Escape sequence - include both backslash and next char
          stringLiteral += text[i] + text[i + 1];
          i += 2;
        } else if (text[i] === quoteChar) {
          // End of string literal
          stringLiteral += text[i];
          i++;
          break;
        } else {
          stringLiteral += text[i];
          i++;
        }
      }

      tokens.push({ kind: 'Content', text: stringLiteral });
      continue;
    }

    // Check for => (arrow function)
    if (char === '=' && nextChar === '>') {
      tokens.push({ kind: 'Content', text: '=>' });
      i += 2;
      continue;
    }

    // Check for special single characters that are important for parsing
    if ('=;,():'.includes(char)) {
      tokens.push({ kind: 'Content', text: char });
      i++;
      continue;
    }

    // For angle brackets, track depth to preserve full generic types
    if (char === '<') {
      let genericType = '<';
      let depth = 1;
      i++;
      while (i < text.length && depth > 0) {
        if (text[i] === '<') depth++;
        if (text[i] === '>') depth--;
        genericType += text[i];
        i++;
      }
      // Normalize $1, $2, etc. suffixes inside generic types
      genericType = normalizeTypeString(genericType);
      tokens.push({ kind: 'Content', text: genericType });
      continue;
    }

    // Skip '>' if standalone (already handled in generic parsing)
    if (char === '>') {
      tokens.push({ kind: 'Content', text: '>' });
      i++;
      continue;
    }

    // Check for whitespace - preserve as single token
    if (/\s/.test(char)) {
      let whitespace = '';
      while (i < text.length && /\s/.test(text[i])) {
        whitespace += text[i];
        i++;
      }
      tokens.push({ kind: 'Content', text: whitespace });
      continue;
    }

    // Check for brackets/braces - track depth to preserve object/array types
    if (char === '[' || char === '{') {
      const openChar = char;
      const closeChar = char === '[' ? ']' : '}';
      let complexType = char;
      let depth = 1;
      i++;
      while (i < text.length && depth > 0) {
        if (text[i] === openChar) depth++;
        if (text[i] === closeChar) depth--;
        complexType += text[i];
        i++;
      }
      // Normalize $1, $2, etc. suffixes inside complex types
      complexType = normalizeTypeString(complexType);
      tokens.push({ kind: 'Content', text: complexType });
      continue;
    }

    // Check for | (union types) and & (intersection types)
    if (char === '|' || char === '&') {
      tokens.push({ kind: 'Content', text: char });
      i++;
      continue;
    }

    // Check for identifiers (type names, keywords, etc.)
    // Handle full qualified names like "Observable<T>" or "Promise<void>"
    if (/[A-Za-z_$]/.test(char)) {
      let identifier = '';
      while (i < text.length && /[A-Za-z0-9_$]/.test(text[i])) {
        identifier += text[i];
        i++;
      }

      // Normalize identifier to remove $1, $2, etc. suffixes
      const normalizedIdentifier = normalizeTypeName(identifier);

      // Check if this is a type reference (starts with uppercase or is a known type)
      const isTypeKeyword = ['void', 'any', 'unknown', 'never', 'string', 'number', 'boolean', 'null', 'undefined'].includes(normalizedIdentifier);
      const isUpperCase = /^[A-Z]/.test(normalizedIdentifier);

      if (isUpperCase && !isTypeKeyword) {
        // Uppercase identifier - likely a type reference
        tokens.push({
          kind: 'Reference',
          text: normalizedIdentifier,
          canonicalReference: `${normalizedIdentifier}:type`
        });
      } else {
        // Lowercase identifier or type keyword
        tokens.push({ kind: 'Content', text: normalizedIdentifier });
      }
      continue;
    }

    // Any other character - add as content
    tokens.push({ kind: 'Content', text: char });
    i++;
  }

  // If no tokens were generated, create a single content token
  if (tokens.length === 0) {
    tokens.push({
      kind: 'Content',
      text: text
    });
  }

  return tokens;
}

/**
 * Find the token range for a specific parameter type in the excerpt tokens.
 * IMPROVED: Better handling of generic types that are now kept as single tokens (e.g., "<T>", "{...}")
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

  // Find the colon after parameter name (could be '?' followed by ':' for optional params)
  let colonIndex = paramNameIndex + 1;
  while (colonIndex < tokens.length) {
    const text = tokens[colonIndex].text;
    if (text === ':') {
      break;
    }
    // Handle optional parameter marker '?'
    if (text === '?') {
      colonIndex++;
      // After '?', look for ':'
      while (colonIndex < tokens.length && tokens[colonIndex].text.trim() === '') {
        colonIndex++;
      }
      if (colonIndex < tokens.length && tokens[colonIndex].text === ':') {
        break;
      }
    }
    colonIndex++;
  }

  if (colonIndex >= tokens.length || tokens[colonIndex].text !== ':') {
    return { startIndex: 0, endIndex: 0 };
  }

  // Start of type is after the colon (skip whitespace)
  let startIndex = colonIndex + 1;
  while (startIndex < tokens.length && tokens[startIndex].text.trim() === '') {
    startIndex++;
  }

  if (startIndex >= tokens.length) {
    return { startIndex: 0, endIndex: 0 };
  }

  // Find end of type (before comma, closing paren, or = at depth 0)
  // Note: With improved tokenization, generics like "<T>" are single tokens,
  // so we don't need to track depth for them - they're atomic
  let endIndex = startIndex;
  let depth = 0;

  while (endIndex < tokens.length) {
    const text = tokens[endIndex].text;

    // Generic types like "<...>" are now single tokens, so check if it starts with '<'
    if (text.startsWith('<') && text.endsWith('>')) {
      // This is a complete generic type token, just include it
      endIndex++;
      continue;
    }

    // Object/array types like "{...}" or "[...]" are now single tokens
    if ((text.startsWith('{') && text.endsWith('}')) ||
        (text.startsWith('[') && text.endsWith(']'))) {
      endIndex++;
      continue;
    }

    // Track depth for any remaining nested structures
    if (text === '(' || text === '<' || text === '[' || text === '{') {
      depth++;
    } else if (text === ')' || text === '>' || text === ']' || text === '}') {
      depth--;
      // Don't break on closing paren at depth 0 - it's the method's closing paren
      if (depth < 0) break;
    } else if (depth === 0 && (text === ',' || text === ')' || text === '=' || text === ';')) {
      break;
    }

    endIndex++;
  }

  return { startIndex, endIndex };
}

/**
 * Find token range for return type or property type.
 * IMPROVED: Better handling of complete generic/object/array types that are now single tokens
 */
function findTokenRange(tokens: any[], rangeType: 'return' | 'type' | 'typealias'): any {
  if (rangeType === 'typealias') {
    // For TypeAlias, find '=' (not ':')
    // Syntax: type MyType = string | number
    for (let i = 0; i < tokens.length; i++) {
      const tokenText = tokens[i].text;

      if (tokenText === '=' || tokenText.includes('=')) {
        let startIndex = i + 1;

        // Skip whitespace tokens
        while (startIndex < tokens.length && tokens[startIndex].text.trim() === '') {
          startIndex++;
        }

        let endIndex = startIndex;
        let depth = 0;

        // Find end (before ; at depth 0)
        while (endIndex < tokens.length) {
          const text = tokens[endIndex].text;

          // Complete generic/object/array types are single tokens now
          if ((text.startsWith('<') && text.endsWith('>')) ||
              (text.startsWith('{') && text.endsWith('}')) ||
              (text.startsWith('[') && text.endsWith(']'))) {
            endIndex++;
            continue;
          }

          // Track nesting depth for remaining cases
          if (text === '<' || text === '(' || text === '[' || text === '{') {
            depth++;
          } else if (text === '>' || text === ')' || text === ']' || text === '}') {
            depth--;
          } else if (depth === 0 && (text === ';' || text.includes(';'))) {
            break;
          }

          endIndex++;
        }

        return { startIndex, endIndex };
      }
    }
  } else if (rangeType === 'return') {
    // Find ':' after closing ')' for return type
    let parenDepth = 0;
    let foundClosingParen = false;

    for (let i = 0; i < tokens.length; i++) {
      const tokenText = tokens[i].text;

      if (tokenText === '(' || tokenText.includes('(')) parenDepth++;
      if (tokenText === ')' || tokenText.includes(')')) {
        parenDepth--;
        if (parenDepth === 0) foundClosingParen = true;
      }

      if (foundClosingParen && (tokenText === ':' || tokenText.includes(':'))) {
        // Return type starts after this colon
        let startIndex = i + 1;

        // Skip whitespace tokens
        while (startIndex < tokens.length && tokens[startIndex].text.trim() === '') {
          startIndex++;
        }

        let endIndex = startIndex;
        let depth = 0;

        // Find end (before ; or { at depth 0)
        // Note: arrow function types like "() => ReturnType" should be included entirely
        while (endIndex < tokens.length) {
          const text = tokens[endIndex].text;

          // Complete generic/object/array types are single tokens now
          if ((text.startsWith('<') && text.endsWith('>')) ||
              (text.startsWith('{') && text.endsWith('}')) ||
              (text.startsWith('[') && text.endsWith(']'))) {
            endIndex++;
            continue;
          }

          // Track nesting depth for remaining cases
          if (text === '<' || text === '(' || text === '[' || text === '{') {
            depth++;
          } else if (text === '>' || text === ')' || text === ']' || text === '}') {
            depth--;
          } else if (text === '=>' || text.includes('=>')) {
            // Arrow operator - this is part of arrow function type, continue
            endIndex++;
            continue;
          } else if (depth === 0 && (text === ';' || text === '{' || text.includes(';') || text.includes('{'))) {
            // End of return type
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
      const tokenText = tokens[i].text;

      if (tokenText === ':' || tokenText.includes(':')) {
        let startIndex = i + 1;

        // Skip whitespace tokens
        while (startIndex < tokens.length && tokens[startIndex].text.trim() === '') {
          startIndex++;
        }

        let endIndex = startIndex;
        let depth = 0;
        let insideArrowFunction = false; // Track if we're parsing arrow function type

        // Find end (before = or ; at depth 0)
        while (endIndex < tokens.length) {
          const text = tokens[endIndex].text;

          // Complete generic/object/array types are single tokens now
          if ((text.startsWith('<') && text.endsWith('>')) ||
              (text.startsWith('{') && text.endsWith('}')) ||
              (text.startsWith('[') && text.endsWith(']'))) {
            endIndex++;
            continue;
          }

          // Track nesting depth for remaining cases
          if (text === '<' || text === '(' || text === '[' || text === '{') {
            depth++;
          } else if (text === '>' || text === ')' || text === ']' || text === '}') {
            depth--;
          } else if (depth === 0 && (text === '=>' || text.includes('=>'))) {
            // We found arrow function operator at depth 0, continue to get return type
            insideArrowFunction = true;
          } else if (depth === 0 && !insideArrowFunction && (text === '=' || text.includes('='))) {
            // Assignment operator (not arrow function) - stop here
            break;
          } else if (depth === 0 && (text === ';' || text.includes(';'))) {
            // Semicolon at depth 0 - always stop
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
