/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  ArrayLiteralExpression,
  ArrowFunction,
  CallExpression,
  SyntaxKind,
} from 'ts-morph';
import {
  featureFeatureModuleMapping,
  getKeyByMappingValueOrThrow,
  getSchematicsConfigByFeatureOrThrow,
} from '../shared/schematics-config-mappings';
import { normalizeObject, removeProperty } from '../shared/utils/config-utils';
import {
  findFeatureModule,
  getModuleConfig,
} from '../shared/utils/feature-utils';
import {
  findDynamicImport,
  getDynamicImportCallExpression,
  getDynamicImportPropertyAccess,
  staticImportExists,
} from '../shared/utils/import-utils';
import {
  createSpartacusFeatureFileName,
  createSpartacusFeatureFolderPath,
  createSpartacusWrapperModuleFileName,
} from '../shared/utils/lib-utils';
import {
  debugLogRule,
  formatFeatureComplete,
  formatFeatureStart,
} from '../shared/utils/logger-utils';
import {
  addModuleImport,
  ensureModuleExists,
  getModulePropertyInitializer,
} from '../shared/utils/new-module-utils';
import { createProgram, saveAndFormat } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import { Schema as SpartacusWrapperOptions } from './schema';

/**
 * If the wrapper module already exists for
 * the given `options.markerModuleName`, it
 * sets it path to the `options` object.
 */
function checkWrapperModuleExists(options: SpartacusWrapperOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const feature = getKeyByMappingValueOrThrow(
      featureFeatureModuleMapping,
      options.markerModuleName
    );
    if (options.debug) {
      context.logger.info(
        formatFeatureStart(
          feature,
          `checking the wrapper module path for ${options.markerModuleName} ...`
        )
      );
    }

    const featureConfig = getSchematicsConfigByFeatureOrThrow(feature);
    const moduleConfig = getModuleConfig(
      options.markerModuleName,
      featureConfig
    );
    if (!moduleConfig) {
      return noop();
    }

    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const sourceFile of appSourceFiles) {
        // check if the wrapper module already exists
        if (
          staticImportExists(
            sourceFile,
            moduleConfig.importPath,
            moduleConfig.name
          )
        ) {
          options.internal = {
            ...options.internal,
            wrapperModulePath: sourceFile.getFilePath(),
          };

          if (options.debug) {
            context.logger.info(
              formatFeatureStart(
                feature,
                `found '${
                  options.markerModuleName
                }' in the existing wrapper module: ${sourceFile.getFilePath()} .`
              )
            );
          }
          return noop();
        }
      }
    }

    if (options.debug) {
      context.logger.info(
        formatFeatureStart(
          feature,
          `wrapper module not found, will create a new one.`
        )
      );
    }
  };
}

/**
 * Creates the wrapper module using the feature config
 * for the given module name.
 */
function createWrapperModule(options: SpartacusWrapperOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    /**
     * if the wrapper module path is set, it means
     * the wrapper module already exists.
     */
    if (options.internal?.wrapperModulePath) {
      return noop();
    }

    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    const feature = getKeyByMappingValueOrThrow(
      featureFeatureModuleMapping,
      options.markerModuleName
    );
    if (options.debug) {
      context.logger.info(
        formatFeatureStart(
          feature,
          `creating wrapper module for ${options.markerModuleName} ...`
        )
      );
    }
    const featureConfig = getSchematicsConfigByFeatureOrThrow(feature);
    const moduleConfig = getModuleConfig(
      options.markerModuleName,
      featureConfig
    );
    if (!moduleConfig) {
      return noop();
    }

    const path = createSpartacusFeatureFolderPath(featureConfig.folderName);
    const name = createSpartacusWrapperModuleFileName(options.markerModuleName);
    const wrapperModulePath = `${path}/${name}`;
    /**
     * Mutates the options by setting
     * the wrapperModulePath for the next rules.
     */
    options.internal = {
      ...options.internal,
      wrapperModulePath,
    };

    const rules: Rule[] = [];
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      const featureModule = findFeatureModule(
        featureConfig.featureModule,
        appSourceFiles
      );
      if (!featureModule) {
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
           * which does not "see" the newly created TS file if it is not
           * referenced anywhere.
           */
          module: featureModule.getBaseNameWithoutExtension(),
        })
      );
    }

    rules.push(
      debugLogRule(
        formatFeatureComplete(
          feature,
          `wrapper module created for ${options.markerModuleName} in ${wrapperModulePath} .`
        ),
        options.debug
      )
    );
    return chain(rules);
  };
}

/**
 * Changes the dynamic import to point to the wrapper module.
 * E.g. instead of:
 * `import('@spartacus/user/profile').then((m) => m.UserProfileModule),`
 * it will be changed to:
 * `import('./profile-wrapper.module').then((m) => m.ProfileWrapperModule),`
 *
 * It also removes the temporary static import to the wrapper
 * module from the ngModule's array.
 */
function updateFeatureModule(options: SpartacusWrapperOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    const feature = getKeyByMappingValueOrThrow(
      featureFeatureModuleMapping,
      options.markerModuleName
    );
    if (options.debug) {
      context.logger.info(
        formatFeatureStart(
          feature,
          `updating feature module for '${options.markerModuleName}' ...`
        )
      );
    }
    const featureConfig = getSchematicsConfigByFeatureOrThrow(feature);
    const featureModuleConfig = getModuleConfig(
      options.markerModuleName,
      featureConfig
    );
    if (!featureModuleConfig) {
      return noop();
    }

    const rules: Rule[] = [];
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      const featureModule = findFeatureModule(
        featureConfig.featureModule,
        appSourceFiles
      );
      if (!featureModule) {
        continue;
      }

      const dynamicImport = findDynamicImport(featureModule, {
        moduleSpecifier: featureModuleConfig.importPath,
        namedImports: [featureModuleConfig.name],
      });
      if (!dynamicImport) {
        continue;
      }

      for (const wrapperModule of appSourceFiles) {
        if (
          !wrapperModule
            .getFilePath()
            .includes(options.internal?.wrapperModulePath ?? '')
        ) {
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
        removeNgImportWrapperElements(ngImports, wrapperModuleClassName);

        saveAndFormat(featureModule);
        break;
      }
    }

    rules.push(
      debugLogRule(
        formatFeatureComplete(
          feature,
          `feature module updated for '${options.markerModuleName}' .`
        ),
        options.debug
      )
    );
    return chain(rules);
  };

  function removeNgImportWrapperElements(
    ngImports: ArrayLiteralExpression,
    wrapperModuleClassName: string
  ) {
    for (const element of ngImports.getElements()) {
      if (element.getText() === wrapperModuleClassName) {
        ngImports.removeElement(element);
        break;
      }
    }
  }
}

/**
 * Removes the dynamic imports pointing to the given
 * `options.featureModuleName` from the feature module.
 */
function removeLibraryDynamicImport(options: SpartacusWrapperOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    const feature = getKeyByMappingValueOrThrow(
      featureFeatureModuleMapping,
      options.featureModuleName
    );
    const featureConfig = getSchematicsConfigByFeatureOrThrow(feature);
    const featureModuleConfig = getModuleConfig(
      options.featureModuleName,
      featureConfig
    );
    if (!featureModuleConfig) {
      return noop();
    }

    const path = createSpartacusFeatureFolderPath(featureConfig.folderName);
    const name = createSpartacusFeatureFileName(featureConfig.moduleName);
    const featureModulePath = `${path}/${name}`;

    if (options.debug) {
      context.logger.info(
        formatFeatureStart(
          feature,
          `removing dynamic import in '${featureModulePath}' for '${options.featureModuleName}' ...`
        )
      );
    }

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const featureModule of appSourceFiles) {
        if (!featureModule.getFilePath().includes(featureModulePath)) {
          continue;
        }

        const spartacusProvider = findDynamicImport(featureModule, {
          moduleSpecifier: featureModuleConfig.importPath,
          namedImports: [featureModuleConfig.name],
        })?.getFirstAncestorByKind(SyntaxKind.CallExpression);
        if (!spartacusProvider) {
          continue;
        }

        cleanupConfig(spartacusProvider);

        saveAndFormat(featureModule);
        break;
      }
    }

    if (options.debug) {
      context.logger.info(
        formatFeatureComplete(
          feature,
          `dynamic import removed in '${featureModulePath}' for '${options.featureModuleName}' .`
        )
      );
    }
  };
}

/**
 * Takes the given spartacus provider, and removes the
 * 'module' configuration property from it.
 * If the are no other properties left, the whole
 * spartacus provider is removed.
 */
export function cleanupConfig(spartacusProvider: CallExpression): void {
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

/**
 * Statically imports the given module.
 */
function updateWrapperModule(
  options: SpartacusWrapperOptions,
  moduleName: string
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    const feature = getKeyByMappingValueOrThrow(
      featureFeatureModuleMapping,
      moduleName
    );
    const featureConfig = getSchematicsConfigByFeatureOrThrow(feature);
    const featureModuleConfig = getModuleConfig(moduleName, featureConfig);
    if (!featureModuleConfig) {
      return noop();
    }

    const wrapperModulePath = options.internal?.wrapperModulePath ?? '';
    if (options.debug) {
      context.logger.info(
        formatFeatureStart(
          feature,
          `importing the '${moduleName}' to the wrapper module ${wrapperModulePath} ...`
        )
      );
    }

    const rules: Rule[] = [];
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const wrapperModule of appSourceFiles) {
        if (!wrapperModule.getFilePath().includes(wrapperModulePath)) {
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

    rules.push(
      debugLogRule(
        formatFeatureComplete(
          feature,
          `imported the '${moduleName}' to the wrapper module ${options.internal?.wrapperModulePath} .`
        ),
        options.debug
      )
    );
    return chain(rules);
  };
}

/**
 * Generates wrapper modules for the given
 * Spartacus feature module.
 */
export function generateWrapperModule(options: SpartacusWrapperOptions): Rule {
  return (_tree: Tree, _context: SchematicContext): Rule => {
    return chain([
      checkWrapperModuleExists(options),

      createWrapperModule(options),

      updateFeatureModule(options),
      removeLibraryDynamicImport(options),

      updateWrapperModule(options, options.markerModuleName),
      updateWrapperModule(options, options.featureModuleName),
    ]);
  };
}
