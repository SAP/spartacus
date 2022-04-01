import {
  chain,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { ArrowFunction, Node, SourceFile } from 'ts-morph';
import {
  featureFeatureModuleMapping,
  featureSchematicConfigMapping,
  getKeyByMappingValueOrThrow,
} from '../shared/updateable-constants';
import {
  findDynamicImport,
  getModuleConfig,
  isFeatureModule,
  isWrapperModule,
} from '../shared/utils/feature-utils';
import {
  getDynamicImportCallExpression,
  getDynamicImportPropertyAccess,
} from '../shared/utils/import-utils';
import {
  createSpartacusFeatureFolderPath,
  createSpartacusWrapperModuleFileName,
  FeatureConfig,
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

function createWrapperModule(
  options: SpartacusWrapperOptions,
  featureConfig: FeatureConfig
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    const path = createSpartacusFeatureFolderPath(featureConfig.folderName);
    const name = createSpartacusWrapperModuleFileName(featureConfig.moduleName);

    const rules: Rule[] = [];
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const sourceFile of appSourceFiles) {
        if (
          isWrapperModule(sourceFile, options.featureModuleName, featureConfig)
        ) {
          // nothing to do if the wrapper module already exists
          return noop();
        }

        if (
          !isFeatureModule(sourceFile, options.featureModuleName, featureConfig)
        ) {
          continue;
        }
        rules.push(
          ensureModuleExists({
            path,
            name,
            project: options.project,
            /**
             * Only temporarily import the wrapper module to the feature module.
             * Will be removed once we start updating the wrapper module.
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

function updateWrapperModule(
  options: SpartacusWrapperOptions,
  featureConfig: FeatureConfig
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    const featureModuleConfig = getModuleConfig(
      options.featureModuleName,
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

        // TODO:#schematics - order?
        addModuleImport(wrapperModule, {
          import: {
            moduleSpecifier: featureModuleConfig.importPath,
            namedImports: [featureModuleConfig.name],
          },
          content: featureModuleConfig.name,
        });
        saveAndFormat(wrapperModule);
      }
    }

    return chain(rules);
  };
}

function updateFeatureModule(
  options: SpartacusWrapperOptions,
  featureConfig: FeatureConfig
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    const featureModuleConfig = getModuleConfig(
      options.featureModuleName,
      featureConfig
    );
    if (!featureModuleConfig) {
      // TODO:#schematics - how to handle it?
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
      }
    }

    return chain(rules);
  };
}

function findFeatureModule(wrapperModule: SourceFile): SourceFile | undefined {
  const referenceSymbols = wrapperModule.getClasses()[0].findReferences();
  for (const referenceSymbol of referenceSymbols) {
    for (const reference of referenceSymbol.getReferences()) {
      const node = reference.getNode();
      const parent = node.getParentOrThrow();
      if (!Node.isArrayLiteralExpression(parent)) {
        continue;
      }

      return parent.getSourceFile();
    }
  }

  return undefined;
}

function updateDynamicImportPath(
  dynamicImport: ArrowFunction,
  path: string
): void {
  getDynamicImportCallExpression(dynamicImport)
    ?.removeArgument(0)
    ?.insertArgument(0, `'${path}'`);
}

function updateDynamicImportModuleName(
  dynamicImport: ArrowFunction,
  wrapperModuleName: string
): void {
  getDynamicImportPropertyAccess(dynamicImport)?.replaceWithText(
    `m.${wrapperModuleName}`
  );
}

/**
 * TODO:#schematics - test
 * 1. multiple dynamic imports in one file
 * 2. mixed dynamic imports to local and node_modules files
 * 3. Run e.g DP and expect all previous extensions to be added to the wrapper module
 */

/**
 * Generates wrapper modules for the given
 * Spartacus feature module.
 */
export function generateWrapperModule(options: SpartacusWrapperOptions): Rule {
  return (_tree: Tree, _context: SchematicContext): Rule => {
    const feature = getKeyByMappingValueOrThrow(
      featureFeatureModuleMapping,
      options.featureModuleName
    );
    const featureConfig = featureSchematicConfigMapping.get(feature);
    if (!featureConfig) {
      throw new SchematicsException(
        `Config not found for the given feature '${feature}'`
      );
    }

    return chain([
      createWrapperModule(options, featureConfig),
      updateWrapperModule(options, featureConfig),
      updateFeatureModule(options, featureConfig),
    ]);
  };
}

// TODO:#schematics - algo
// pull the schematics config associated with the given feature module name
// iterate through the collected feature modules
// check for imports of the given feature module
// if found, make sure it's actually imported in the ngmodule's imports[]
// if not found, fall back to checking the dynamic imports import in providers array
// if the dynamic import is found, check the import path
// ---
// if found in the dynamic import --> tear it down and create a wrapper module
// if found in the ngmodule's imports[] --> we need to check if it's not already a wrapper module.
// we can do that by checking for the Module's references, and check if there's a reference to the module using a dynamic import.
// if yes, we found a wrapper module, and we can just import the given module name to it
// and sort its imports[].
// if there isn't a dynamic import reference, what are we working with? An eagerly loaded feature?
