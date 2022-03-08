import { dasherize } from '@angular-devkit/core/src/utils/strings';
import {
  externalSchematic,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { getDecoratorMetadata } from '@schematics/angular/utility/ast-utils';
import {
  ArrayLiteralExpression,
  CallExpression,
  Expression,
  Identifier,
  Node,
  SourceFile,
  ts as tsMorph,
} from 'ts-morph';
import { ANGULAR_CORE, ANGULAR_SCHEMATICS } from '../constants';
import {
  packageFeatureConfigMapping,
  SPARTACUS_FEATURES_MODULE,
} from '../feature-libs-constants';
import { getSpartacusProviders, normalizeConfiguration } from './config-utils';
import { getTsSourceFile } from './file-utils';
import {
  getImportDeclaration,
  isImportedFrom,
  isImportedFromSpartacusLibs,
} from './import-utils';
import { installationOrder, LibraryOptions } from './lib-utils';
import { createProgram } from './program';
import { getProjectTsConfigPaths } from './project-tsconfig-paths';
import { getSourceRoot } from './workspace-utils';

export interface Import {
  moduleSpecifier: string;
  namedImports: string[];
}

export function ensureModuleExists(options: {
  name: string;
  path: string;
  module: string;
  project: string;
}): Rule {
  return (host: Tree): Rule => {
    const modulePath = `${getSourceRoot(host, { project: options.project })}/${
      options.path
    }`;
    const filePath = `${modulePath}/${dasherize(options.name)}.module.ts`;
    if (host.exists(filePath)) {
      const module = getTsSourceFile(host, filePath);
      const metadata = getDecoratorMetadata(
        module,
        'NgModule',
        ANGULAR_CORE
      )[0];

      if (metadata) {
        return noop();
      }
    }
    return externalSchematic(ANGULAR_SCHEMATICS, 'module', {
      name: dasherize(options.name),
      flat: true,
      commonModule: false,
      path: modulePath,
      module: options.module,
    });
  };
}

export function addModuleImport(
  sourceFile: SourceFile,
  insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
  },
  createIfMissing = true
): Expression | undefined {
  return addToModuleInternal(
    sourceFile,
    'imports',
    insertOptions,
    createIfMissing
  );
}

export function addModuleExport(
  sourceFile: SourceFile,
  insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
  },
  createIfMissing = true
): Expression | undefined {
  return addToModuleInternal(
    sourceFile,
    'exports',
    insertOptions,
    createIfMissing
  );
}

export function addModuleDeclaration(
  sourceFile: SourceFile,
  insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
  },
  createIfMissing = true
): Expression | undefined {
  return addToModuleInternal(
    sourceFile,
    'declarations',
    insertOptions,
    createIfMissing
  );
}

export function addModuleProvider(
  sourceFile: SourceFile,
  insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
  },
  createIfMissing = true
): Expression | undefined {
  return addToModuleInternal(
    sourceFile,
    'providers',
    insertOptions,
    createIfMissing
  );
}

function addToModuleInternal(
  sourceFile: SourceFile,
  propertyName: 'imports' | 'exports' | 'declarations' | 'providers',
  insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
  },
  createIfMissing = true
): Expression | undefined {
  const module = getModule(sourceFile);
  if (!module) {
    return undefined;
  }

  const arg = module.getArguments()[0];
  if (!Node.isObjectLiteralExpression(arg)) {
    return undefined;
  }

  let createdNode: Expression | undefined;
  if (!arg.getProperty(propertyName) && createIfMissing) {
    arg.addPropertyAssignment({
      name: propertyName,
      initializer: '[]',
    });
  }

  const property = arg.getProperty(propertyName);
  if (!property || !Node.isPropertyAssignment(property)) {
    return undefined;
  }

  const initializer = property.getInitializerIfKind(
    tsMorph.SyntaxKind.ArrayLiteralExpression
  );
  if (!initializer) {
    return undefined;
  }

  if (isDuplication(initializer, propertyName, insertOptions.content)) {
    return undefined;
  }

  const imports = ([] as Import[]).concat(insertOptions.import);
  imports.forEach((specifiedImport) =>
    sourceFile.addImportDeclaration({
      moduleSpecifier: specifiedImport.moduleSpecifier,
      namedImports: specifiedImport.namedImports,
    })
  );

  if (insertOptions.order || insertOptions.order === 0) {
    initializer.insertElement(insertOptions.order, insertOptions.content);
  } else {
    createdNode = initializer.addElement(insertOptions.content);
  }

  return createdNode;
}

function isDuplication(
  initializer: ArrayLiteralExpression,
  propertyName: 'imports' | 'exports' | 'declarations' | 'providers',
  content: string
): boolean {
  if (propertyName === 'providers') {
    const normalizedContent = normalizeConfiguration(content);
    const configs = getSpartacusProviders(initializer.getSourceFile());
    for (const config of configs) {
      const normalizedConfig = normalizeConfiguration(config);
      if (normalizedContent === normalizedConfig) {
        return true;
      }
    }

    return false;
  }

  return isTypeTokenDuplicate(initializer, content);
}

function isTypeTokenDuplicate(
  initializer: ArrayLiteralExpression,
  typeToken: string
): boolean {
  typeToken = normalizeTypeToken(typeToken);

  for (const element of initializer.getElements()) {
    const elementText = normalizeTypeToken(element.getText());
    if (elementText === typeToken) {
      return true;
    }
  }

  return false;
}

export function getModule(sourceFile: SourceFile): CallExpression | undefined {
  let moduleNode: CallExpression | undefined;

  function visitor(node: Node) {
    if (Node.isCallExpression(node)) {
      const expression = node.getExpression();
      if (
        Node.isIdentifier(expression) &&
        expression.getText() === 'NgModule' &&
        isImportedFrom(expression, ANGULAR_CORE)
      ) {
        moduleNode = node;
      }
    }

    node.forEachChild(visitor);
  }

  sourceFile.forEachChild(visitor);
  return moduleNode;
}

const COMMENT_REG_EXP = /\/\/.+/gm;
function normalizeTypeToken(token: string): string {
  let newToken = token;

  newToken = newToken.replace(COMMENT_REG_EXP, '');
  newToken = newToken.trim();
  // strip down the trailing comma
  if (newToken.charAt(newToken.length - 1) === ',') {
    newToken = newToken.substring(0, newToken.length - 1);
  }

  return newToken;
}

export function collectInstalledFeatures<T extends LibraryOptions>(
  options: T
): Rule {
  return (tree: Tree, _context: SchematicContext): void => {
    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const sourceFile of appSourceFiles) {
        if (
          sourceFile
            .getFilePath()
            .includes(`${SPARTACUS_FEATURES_MODULE}.module.ts`)
        ) {
          const featureModuleNames = collectInstalledFeatureModules(sourceFile);
          console.log('collected: ', featureModuleNames.join('\n'));
          break;
        }
      }

      // for (const featureModule of collectInstalledFeatureModules(
      //   appSourceFiles
      // )) {
      //   featureModuleNames = featureModuleNames.concat(
      //     collectModuleNames(featureModule)
      //   );
      // // }

      // const dependencies: Record<string, string> =
      //   readPackageJson(tree).dependencies;
      // const spartacusLibs = getSpartacusPackages(dependencies).filter(
      //   (spartacusPackage) =>
      //     !CORE_SPARTACUS_SCOPES.some((skipPackage) =>
      //       spartacusPackage.startsWith(skipPackage)
      //     )
      // );
      // console.log('spa libs: ', spartacusLibs.join('\n'));

      console.log('\n\n\n', 'options:', options, '\n\n\n');

      console.log('installationOrder', installationOrder);

      // resolveGraphDependencies(, resolved);
      // 1. get feature module name
      // 2. check it against the config
      // 3. if it matches, pull the lib from the config

      // figure out which feature module belongs to which spartacus library
      //    use the feature's configs to re-create the root import?
      //    OR: collect all @spartacus imports, filter out core imports, normalize the rest (remove everything after the second '/' (including it))
      // call the graph to get the proper installation order

      // sort the feature modules according to the graph's result.
      //    if multiple features are mapped to the same spartacus package,
      //    preserve their order.
      //    otherwise, sort according to the graph's result
    }
  };
}

// function collectModuleNames(featureModule: SourceFile): string[] {
//   return featureModule
//     .getClasses()
//     .map((className) => className.getName() ?? '')
//     .filter((className) => !!className);
// }

// function collectFeatureLibImports(featureModule: SourceFile): string[] {
//   const libImports = collectImportScopes(featureModule)
//     .filter(
//       (scope) =>
//         !CORE_SPARTACUS_SCOPES.some((skipScope) => scope.startsWith(skipScope))
//     )
//     .filter((scope) => scope.startsWith(SPARTACUS_SCOPE))
//     .map((scope) => normalizeScope(scope));
//   // remove duplicates
//   return Array.from(new Set(libImports));
// }

// function normalizeScope(scope: string): string {
//   return scope.split('/').slice(0, 2).join('/');
// }

// function insert(
//   libFeatureModules: Map<string, string[]>,
//   libImports: string[],
//   featureModuleNames: string[]
// ): void {
//   for (const libImport of libImports) {
//     if (!libFeatureModules.has(libImport)) {
//       libFeatureModules.set(libImport, []);
//     }

//     const existingFeatureModuleNames = libFeatureModules.get(libImport) ?? [];
//     libFeatureModules.set(
//       libImport,
//       existingFeatureModuleNames.concat(featureModuleNames)
//     );
//   }
// }

// TODO:#schematics - use elsewhere. Search for 'getInitializerIfKind'
function getModuleImportsInitializer(
  source: SourceFile
): ArrayLiteralExpression | undefined {
  const module = getModule(source);
  if (!module) {
    console.warn(`No 'NgModule' decorator found in '${source.getFilePath()}'`);
    return undefined;
  }

  const arg = module.getArguments()[0];
  if (!arg || !Node.isObjectLiteralExpression(arg)) {
    return undefined;
  }

  const property = arg.getProperty('imports');
  if (!property || !Node.isPropertyAssignment(property)) {
    return undefined;
  }

  return property.getInitializerIfKind(
    tsMorph.SyntaxKind.ArrayLiteralExpression
  );
}

function collectInstalledFeatureModules(
  spartacusFeaturesModule: SourceFile
): string[] {
  const initializer = getModuleImportsInitializer(spartacusFeaturesModule);
  if (!initializer) {
    return [];
  }

  const spartacusCoreModules: Identifier[] = [];
  const featureModules: { spartacusLibrary: string; module: Identifier }[] = [];
  const unrecognizedModules: Identifier[] = [];

  for (const element of initializer.getElements()) {
    // let module: Identifier | undefined;
    // if (Node.isIdentifier(element)) {
    //   module = element;
    // } else if (Node.isCallExpression(element)) {
    //   const propertyAccessExpression = element.getFirstChild();
    //   if (Node.isPropertyAccessExpression(propertyAccessExpression)) {
    //     const firstIdentifier = propertyAccessExpression.getFirstChild();
    //     if (Node.isIdentifier(firstIdentifier)) {
    //       module = firstIdentifier;
    //     }
    //   }
    // }

    const module = getModuleIdentifier(element);
    if (!module) {
      // TODO:#schematics - change to context.logger.warning
      console.error(`${element.print()} not recognized as a module.`);
      continue;
    }

    const importDeclaration = getImportDeclaration(module);
    if (!importDeclaration) {
      // TODO:#schematics - change to context.logger.warning
      console.error(`No import found for ${module.print()}.`);
      continue;
    }

    const importPath = importDeclaration.getModuleSpecifierValue();
    if (isImportedFromSpartacusLibs(importPath)) {
      spartacusCoreModules.push(module);
      continue;
    }

    const potentialFeatureModule =
      importDeclaration.getModuleSpecifierSourceFile();
    if (!potentialFeatureModule) {
      // TODO:#schematics - change to context.logger.warning
      console.error(
        `No file found for ${module.print()} under ${importPath}.ts`
      );
      continue;
    }

    const spartacusLibrary = recognizeFeatureModule(potentialFeatureModule);
    if (spartacusLibrary) {
      featureModules.push({ spartacusLibrary, module });
    } else {
      unrecognizedModules.push(module);
    }
  }

  console.warn('SPA CORE modules: ');
  console.log(spartacusCoreModules.map((x) => x.getText()).join('\n'));
  console.warn('FEATURE modules: ');
  console.log(featureModules.map((x) => x.module.getText()).join('\n'));
  console.warn('UNRECOGNIZED modules: ');
  console.log(unrecognizedModules.map((x) => x.getText()).join('\n'));

  // check the imports:
  // if imported from CORE_SPA_SCOPES - preserve the order as is. Maybe push it to a "coreSpaImports"
  // if imported from a local file - check it:
  // 1.navigate to the file
  // 2.determine if there's a Spartacus root / main module imported in the module
  // 2.1 if so, it should be ordered
  // 2.2 if not, it's a custom feature module, and should go at the end of the final import list

  return initializer.getElements().map((element) => element.getText());
}

function getModuleIdentifier(element: Node): Identifier | undefined {
  if (Node.isIdentifier(element)) {
    return element;
  }

  if (Node.isCallExpression(element)) {
    const propertyAccessExpression = element.getFirstChild();
    if (Node.isPropertyAccessExpression(propertyAccessExpression)) {
      const firstIdentifier = propertyAccessExpression.getFirstChild();
      if (Node.isIdentifier(firstIdentifier)) {
        return firstIdentifier;
      }
    }
  }

  return undefined;
}

function recognizeFeatureModule(featureModule: SourceFile): string | undefined {
  const initializer = getModuleImportsInitializer(featureModule);
  if (!initializer) {
    return undefined;
  }

  for (const element of initializer.getElements()) {
    const module = getModuleIdentifier(element);
    if (!module) {
      // TODO:#schematics - change to context.logger.warning
      console.error(`${element.print()} not recognized as a module.`);
      continue;
    }

    const spartacusLibrary = getSpartacusLibraryByModuleImports(
      module.getText()
    );
    if (spartacusLibrary) {
      return spartacusLibrary;
    }
  }

  return undefined;
}

function getSpartacusLibraryByModuleImports(
  moduleName: string
): string | undefined {
  for (const spartacusLibrary of Object.keys(packageFeatureConfigMapping)) {
    if (packageFeatureConfigMapping[spartacusLibrary].includes(moduleName)) {
      return spartacusLibrary;
    }
  }

  return undefined;
}
