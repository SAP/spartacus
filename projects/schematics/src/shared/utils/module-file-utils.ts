import { normalize, relative } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  addSymbolToNgModuleMetadata,
  findNodes,
  getDecoratorMetadata,
  insertImport,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import {
  Change,
  InsertChange,
  NoopChange,
} from '@schematics/angular/utility/change';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import ts from 'typescript';
import { ANGULAR_CORE } from '../constants';
import {
  commitChanges,
  getMetadataProperty,
  getTsSourceFile,
  InsertDirection,
} from './file-utils';
import { getProjectTargets } from './workspace-utils';

export function stripTsFromImport(importPath: string): string {
  if (!importPath.endsWith('.ts')) {
    return importPath;
  }

  return importPath.slice(0, importPath.length - 3);
}

export function addImport(
  host: Tree,
  filePath: string,
  importText: string,
  importPath: string
): void {
  const moduleSource = getTsSourceFile(host, filePath);
  if (!isImported(moduleSource, importText, importPath)) {
    const change = insertImport(moduleSource, filePath, importText, importPath);
    commitChanges(host, filePath, [change], InsertDirection.LEFT);
  }
}

export function createImportChange(
  host: Tree,
  filePath: string,
  importText: string,
  importPath: string
): Change {
  const source = getTsSourceFile(host, filePath);
  if (isImported(source, importText, importPath)) {
    return new NoopChange();
  }
  return insertImport(source, filePath, importText, importPath);
}

export function addToModuleImports(
  host: Tree,
  modulePath: string,
  importText: string,
  moduleSource?: ts.SourceFile
): InsertChange[] {
  return addToMetadata(host, modulePath, importText, 'imports', moduleSource);
}

export function addToModuleDeclarations(
  host: Tree,
  modulePath: string,
  declarations: string,
  moduleSource?: ts.SourceFile
): InsertChange[] {
  return addToMetadata(
    host,
    modulePath,
    declarations,
    'declarations',
    moduleSource
  );
}

export function addToModuleExports(
  host: Tree,
  modulePath: string,
  exportsText: string,
  moduleSource?: ts.SourceFile
): InsertChange[] {
  return addToMetadata(host, modulePath, exportsText, 'exports', moduleSource);
}

export function addToModuleProviders(
  host: Tree,
  modulePath: string,
  importText: string,
  moduleSource?: ts.SourceFile
): InsertChange[] {
  return addToMetadata(host, modulePath, importText, 'providers', moduleSource);
}

export function addToMetadata(
  host: Tree,
  modulePath: string,
  text: string,
  metadataType: 'imports' | 'declarations' | 'exports' | 'providers',
  moduleSource?: ts.SourceFile
): InsertChange[] {
  moduleSource = moduleSource || getTsSourceFile(host, modulePath);
  return addSymbolToNgModuleMetadata(
    moduleSource,
    modulePath,
    metadataType,
    text
  ) as InsertChange[];
}

export function addToModuleImportsAndCommitChanges(
  host: Tree,
  modulePath: string,
  importText: string
): void {
  const metadataChanges = addToModuleImports(host, modulePath, importText);
  commitChanges(host, modulePath, metadataChanges, InsertDirection.RIGHT);
}

// as this is copied from angular source, no need to test it
/**
 * Build a relative path from one file path to another file path.
 */
export function buildRelativePath(from: string, to: string): string {
  from = normalize(from);
  to = normalize(to);

  // Convert to arrays.
  const fromParts = from.split('/');
  const toParts = to.split('/');

  // Remove file names (preserving destination)
  fromParts.pop();
  const toFileName = toParts.pop();

  const relativePath = relative(
    normalize(fromParts.join('/') || '/'),
    normalize(toParts.join('/') || '/')
  );
  let pathPrefix = '';

  // Set the path prefix for same dir or child dir, parent dir starts with `..`
  if (!relativePath) {
    pathPrefix = '.';
  } else if (!relativePath.startsWith('.')) {
    pathPrefix = `./`;
  }
  if (pathPrefix && !pathPrefix.endsWith('/')) {
    pathPrefix += '/';
  }

  return pathPrefix + (relativePath ? relativePath + '/' : '') + toFileName;
}

export function getTemplateInfo(source: ts.SourceFile):
  | {
      templateUrl?: string;
      inlineTemplateContent?: string;
      inlineTemplateStart?: number;
    }
  | undefined {
  const fileUrlResult = getTemplateUrlOrInlineTemplate(source, 'templateUrl');
  if (fileUrlResult) {
    return { templateUrl: fileUrlResult.contentOrUrl };
  }

  // if the 'templateUrl' is not specified, check for the inline template
  const inlineTemplateResult = getTemplateUrlOrInlineTemplate(
    source,
    'template'
  );
  if (inlineTemplateResult) {
    return {
      inlineTemplateContent: inlineTemplateResult.contentOrUrl,
      inlineTemplateStart: inlineTemplateResult.start,
    };
  }

  return undefined;
}

function getTemplateUrlOrInlineTemplate(
  source: ts.SourceFile,
  templateOrTemplateUrl: 'template' | 'templateUrl'
): { contentOrUrl: string; start?: number } | undefined {
  const decorator = getDecoratorMetadata(source, 'Component', ANGULAR_CORE)[0];
  if (!decorator) {
    return undefined;
  }

  const templateMetadata = getMetadataProperty(
    decorator,
    templateOrTemplateUrl
  );
  if (!templateMetadata) {
    return undefined;
  }

  let stringNode: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral;
  stringNode = stringNode = findNodes(
    templateMetadata,
    ts.SyntaxKind.NoSubstitutionTemplateLiteral
  )[0] as ts.NoSubstitutionTemplateLiteral;
  if (!stringNode) {
    // fallback to single/double quotes
    stringNode = findNodes(
      templateMetadata,
      ts.SyntaxKind.StringLiteral
    )[0] as ts.StringLiteral;
  }

  if (!stringNode) {
    return undefined;
  }

  const result = stringNode.text.trim();
  if (templateOrTemplateUrl === 'templateUrl') {
    const url = result.replace('./', '');
    return { contentOrUrl: url };
  }

  return {
    contentOrUrl: result,
    start: stringNode.getStart() + 1,
  };
}

export function getAppModule(host: Tree, project: string): string {
  const projectTargets = getProjectTargets(host, project);

  if (!projectTargets.build) {
    throw new SchematicsException(`Project target "build" not found.`);
  }

  const mainPath = projectTargets.build.options.main;
  return getAppModulePath(host, mainPath);
}
