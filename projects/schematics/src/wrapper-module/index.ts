import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  ArrowFunction,
  CallExpression,
  Node,
  SourceFile,
  SyntaxKind,
} from 'ts-morph';
import {
  featureFeatureModuleMapping,
  getKeyByMappingValueOrThrow,
  getSchematicsConfigByFeatureOrThrow,
} from '../shared/updateable-constants';
import { normalizeObject, removeProperty } from '../shared/utils/config-utils';
import {
  analyzeFeature,
  findDynamicImport,
  getModuleConfig,
  isFeatureModule,
  isWrapperModule,
  orderFeatures,
} from '../shared/utils/feature-utils';
import {
  getDynamicImportCallExpression,
  getDynamicImportPropertyAccess,
} from '../shared/utils/import-utils';
import {
  createSpartacusFeatureFileName,
  createSpartacusFeatureFolderPath,
  createSpartacusWrapperModuleFileName,
} from '../shared/utils/lib-utils';
import {
  addModuleImport,
  ensureModuleExists,
  getModulePropertyInitializer,
} from '../shared/utils/new-module-utils';
import { createProgram, saveAndFormat } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import { Schema as SpartacusWrapperOptions } from './schema';

// TODO:#schematics - update tsmorph to v14

/**
 * Creates the wrapper module using the feature config
 * for the given module name.
 * It skips the creation if the wrapper module exists.
 */
function createWrapperModule(options: {
  project: string;
  moduleName: string;
}): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    const feature = getKeyByMappingValueOrThrow(
      featureFeatureModuleMapping,
      options.moduleName
    );
    const featureConfig = getSchematicsConfigByFeatureOrThrow(feature);

    const path = createSpartacusFeatureFolderPath(featureConfig.folderName);
    const name = createSpartacusWrapperModuleFileName(featureConfig.moduleName);

    const rules: Rule[] = [];
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const sourceFile of appSourceFiles) {
        if (isWrapperModule(sourceFile, options.moduleName, featureConfig)) {
          // no need to create the wrapper module if it already exists
          return noop();
        }

        if (!isFeatureModule(sourceFile, options.moduleName, featureConfig)) {
          continue;
        }
        rules.push(
          ensureModuleExists({
            path,
            name,
            project: options.project,
            /**
             * Only temporarily import the wrapper module to the feature module.
             * The import will be removed in updateFeatureModule().
             *
             * This is a workaround for a weird behavior of the ts-morph library,
             * which does not "see" the newly created module if it is not
             * referenced anywhere.
             */
            module: sourceFile.getBaseNameWithoutExtension(),
          })
        );
        break;
      }
    }

    return chain(rules);
  };
}

/**
 * Statically imports the given feature modules.
 */
function updateWrapperModule(options: {
  project: string;
  moduleName: string;
  markerFeatureModulePath: string;
}): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    const feature = getKeyByMappingValueOrThrow(
      featureFeatureModuleMapping,
      options.moduleName
    );
    const featureConfig = getSchematicsConfigByFeatureOrThrow(feature);
    const featureModuleConfig = getModuleConfig(
      options.moduleName,
      featureConfig
    );
    if (!featureModuleConfig) {
      // TODO:#schematics - do what?
      return noop();
    }

    const rules: Rule[] = [];
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const wrapperModule of appSourceFiles) {
        if (
          !wrapperModule.getFilePath().includes(options.markerFeatureModulePath)
        ) {
          continue;
        }

        addModuleImport(wrapperModule, {
          import: {
            moduleSpecifier: featureModuleConfig.importPath,
            namedImports: [featureModuleConfig.name],
          },
          content: featureModuleConfig.name,
        });

        saveAndFormat(wrapperModule);
        break;
      }
    }

    return chain(rules);
  };
}

/**
 * Updates the feature module to point to the
 * created wrapper module.
 * It also removes the temporary static import to
 * the wrapper module from the ngModule's array.
 */
function updateFeatureModule(options: {
  project: string;
  moduleName: string;
}): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    const feature = getKeyByMappingValueOrThrow(
      featureFeatureModuleMapping,
      options.moduleName
    );
    const featureConfig = getSchematicsConfigByFeatureOrThrow(feature);
    const featureModuleConfig = getModuleConfig(
      options.moduleName,
      featureConfig
    );
    if (!featureModuleConfig) {
      // TODO:#schematics - do what?
      return noop();
    }

    const path = createSpartacusFeatureFolderPath(featureConfig.folderName);
    const name = createSpartacusWrapperModuleFileName(featureConfig.moduleName);

    const rules: Rule[] = [];
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const wrapperModule of appSourceFiles) {
        if (!wrapperModule.getFilePath().includes(`${path}/${name}`)) {
          continue;
        }

        const featureModule = findFeatureModule(wrapperModule);
        if (!featureModule) {
          // TODO:#schematics - how to handle it?
          continue;
        }

        const dynamicImport = findDynamicImport(
          featureModule,
          featureModuleConfig.importPath,
          featureModuleConfig.name
        );
        if (!dynamicImport) {
          // TODO:#schematics - how to handle it?
          continue;
        }

        const wrapperModuleClassName =
          wrapperModule.getClasses()[0].getName() ?? '';
        updateDynamicImportPath(
          dynamicImport,
          featureModule.getRelativePathAsModuleSpecifierTo(
            wrapperModule.getFilePath()
          )
        );
        updateDynamicImportModuleName(dynamicImport, wrapperModuleClassName);

        // remove the dummy import
        const ngImports = getModulePropertyInitializer(
          featureModule,
          'imports',
          false
        );
        if (!ngImports) {
          continue;
        }
        for (const element of ngImports.getElements()) {
          if (element.getText() === wrapperModuleClassName) {
            ngImports.removeElement(element);
            break;
          }
        }

        saveAndFormat(featureModule);
        break;
      }
    }

    return chain(rules);
  };
}

/**
 * Searches for the feature module by looking in ngModule's
 * imports' reference for the given wrapper module.
 */
function findFeatureModule(wrapperModule: SourceFile): SourceFile | undefined {
  const referenceSymbols = wrapperModule.getClasses()[0].findReferences();
  for (const referenceSymbol of referenceSymbols) {
    for (const reference of referenceSymbol.getReferences()) {
      const parent = reference.getNode().getParentOrThrow();
      if (Node.isArrayLiteralExpression(parent)) {
        return parent.getSourceFile();
      }
    }
  }

  return undefined;
}

/**
 * Removes the dynamic imports pointing to the given
 * `moduleName` from the feature module.
 */
function removeLibraryDynamicImport(options: {
  project: string;
  moduleName: string;
}): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    const feature = getKeyByMappingValueOrThrow(
      featureFeatureModuleMapping,
      options.moduleName
    );
    const featureConfig = getSchematicsConfigByFeatureOrThrow(feature);
    const featureModuleConfig = getModuleConfig(
      options.moduleName,
      featureConfig
    );
    if (!featureModuleConfig) {
      // TODO:#schematics - do what?
      return noop();
    }

    const path = createSpartacusFeatureFolderPath(featureConfig.folderName);
    const name = createSpartacusFeatureFileName(featureConfig.moduleName);

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const featureModule of appSourceFiles) {
        if (!featureModule.getFilePath().includes(`${path}/${name}`)) {
          continue;
        }

        const spartacusProvider = findDynamicImport(
          featureModule,
          featureModuleConfig.importPath,
          featureModuleConfig.name
        )?.getFirstAncestorByKind(SyntaxKind.CallExpression);
        if (!spartacusProvider) {
          continue;
        }

        cleanupConfig(spartacusProvider);

        saveAndFormat(featureModule);
        break;
      }
    }
  };
}

/**
 * Takes the given spartacus provider, and removes the
 * 'module' configuration property from it.
 * If the are no other properties left, the whole
 * spartacus provider is removed.
 */
function cleanupConfig(spartacusProvider: CallExpression): void {
  const objectLiteral = spartacusProvider.getFirstDescendantByKind(
    SyntaxKind.ObjectLiteralExpression
  );
  if (!objectLiteral) {
    return;
  }

  removeProperty(objectLiteral, 'module');
  if (normalizeObject(objectLiteral.getText()) === '{}') {
    spartacusProvider
      .getParentIfKindOrThrow(SyntaxKind.ArrayLiteralExpression)
      .removeElement(spartacusProvider);
  }
}

/**
 * Replaces the given dynamic import's path.
 * E.g. for the given `() => import('@spartacus/checkout/base')`
 * it replaces it with the given path: `() => import('./checkout-wrapper.module')`.
 */
function updateDynamicImportPath(
  dynamicImport: ArrowFunction,
  path: string
): void {
  getDynamicImportCallExpression(dynamicImport)
    ?.removeArgument(0)
    ?.insertArgument(0, `'${path}'`);
}

/**
 * Replaces the given dynamic import's module name.
 * E.g. for the given `(m) => m.CheckoutModule`
 * it replaces it with the given module name: `(m) => m.CheckoutWrapperModule`.
 */
function updateDynamicImportModuleName(
  dynamicImport: ArrowFunction,
  wrapperModuleName: string
): void {
  getDynamicImportPropertyAccess(dynamicImport)?.replaceWithText(
    `m.${wrapperModuleName}`
  );
}

function orderWrapperFeatures(options: {
  project: string;
  markerFeatureModulePath: string;
}): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const wrapperModule of appSourceFiles) {
        if (
          !wrapperModule.getFilePath().includes(options.markerFeatureModulePath)
        ) {
          continue;
        }

        const analysis = analyzeFeature(wrapperModule);
        if (analysis.unrecognized) {
          // TODO:#schematics - do what?
          console.error('??? ', analysis);
        }

        const ordered = orderFeatures(analysis);
        getModulePropertyInitializer(
          wrapperModule,
          'imports',
          false
        )?.replaceWithText(`[${ordered.join(',\n')}]`);

        saveAndFormat(wrapperModule);
        break;
      }
    }
  };
}

/**
 * Generates wrapper modules for the given
 * Spartacus feature module.
 */
export function generateWrapperModule(options: SpartacusWrapperOptions): Rule {
  return (_tree: Tree, _context: SchematicContext): Rule => {
    const markerFeatureConfig = getSchematicsConfigByFeatureOrThrow(
      getKeyByMappingValueOrThrow(
        featureFeatureModuleMapping,
        options.markerModuleName
      )
    );
    const folderPath = createSpartacusFeatureFolderPath(
      markerFeatureConfig.folderName
    );
    const fileName = createSpartacusWrapperModuleFileName(
      markerFeatureConfig.moduleName
    );
    const markerFeatureModulePath = `${folderPath}/${fileName}`;

    return chain([
      createWrapperModule({
        project: options.project,
        moduleName: options.markerModuleName,
      }),

      updateWrapperModule({
        project: options.project,
        moduleName: options.markerModuleName,
        markerFeatureModulePath,
      }),
      updateWrapperModule({
        project: options.project,
        moduleName: options.featureModuleName,
        markerFeatureModulePath,
      }),

      updateFeatureModule({
        project: options.project,
        moduleName: options.markerModuleName,
      }),
      removeLibraryDynamicImport({
        project: options.project,
        moduleName: options.featureModuleName,
      }),

      orderWrapperFeatures({
        project: options.project,
        markerFeatureModulePath,
      }),
    ]);
  };
}
