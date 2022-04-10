import {
  chain,
  noop,
  Rule,
  schematic,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import {
  ArrowFunction,
  CallExpression,
  Expression,
  Identifier,
  Node,
  SourceFile,
  ts as tsMorph,
} from 'ts-morph';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import { Schema as SpartacusWrapperOptions } from '../../wrapper-module/schema';
import { ANGULAR_CORE } from '../constants';
import {
  SPARTACUS_FEATURES_MODULE,
  SPARTACUS_FEATURES_NG_MODULE,
} from '../libs-constants';
import {
  featureFeatureModuleMapping,
  featureRootModuleMapping,
  featureSchematicConfigMapping,
  getKeyByMappingValue,
} from '../updateable-constants';
import {
  crossFeatureInstallationOrder,
  crossLibraryInstallationOrder,
} from './graph-utils';
import {
  collectDynamicImports,
  findImport,
  getDynamicImportImportPath,
  getDynamicImportPropertyAccess,
  getImportDeclaration,
  isImportedFrom,
  isImportedFromSpartacusCoreLib,
  isImportedFromSpartacusLibs,
  isRelative,
} from './import-utils';
import {
  addLibraryFeature,
  calculateSort,
  FeatureConfig,
  LibraryOptions,
  Module,
} from './lib-utils';
import { getModulePropertyInitializer } from './new-module-utils';
import { createProgram } from './program';
import { getProjectTsConfigPaths } from './project-tsconfig-paths';

export interface FeatureModuleImports {
  importPath: string;
  moduleNode: Expression | Identifier;
}
/**
 * Represents the result of the `collectInstalledModules` function,
 * and contains all features imported in the `spartacus-features.module.ts` file.
 */
export interface SpartacusFeatureModule {
  /**
   * All imports in the in SpartacusFeaturesModule,
   * including their import paths and module nodes.
   */
  spartacusFeaturesModuleImports: FeatureModuleImports[];
  /**
   * Warnings produced while looking for feature modules.
   */
  warnings: string[];
}

/**
 * Override the pre-defined configurations for the given feature
 */
export interface FeatureConfigurationOverrides<T = LibraryOptions> {
  /**
   * If specified, overrides the pre-defined schematics configuration.
   * Usually used when customConfig needs to be provided.
   */
  schematics?: FeatureConfig;
  /**
   * If specified, overrides the pre-defined schematics options.
   */
  options?: T;
}

// TODO:#schematics - [at the end] move some of the methods from lib-utils?

/**
 * Configures feature modules for the given array of features.
 *
 * Optionally, an override can be provided for the default
 * schematics options and/or feature-schematics configuration.
 */
export function addFeatures<T extends LibraryOptions>(
  options: SpartacusOptions,
  features: string[],
  configurationOverrides?: Record<string, FeatureConfigurationOverrides<T>>
): Rule {
  return (_tree: Tree, _context: SchematicContext): Rule => {
    const genericLibraryOptions: LibraryOptions = {
      project: options.project,
      lazy: options.lazy,
      debug: options.debug,
      interactive: options.interactive,
    };

    const rules: Rule[] = [];
    for (const feature of features) {
      const schematicsConfiguration =
        featureSchematicConfigMapping.get(feature);
      if (!schematicsConfiguration) {
        throw new SchematicsException(
          `No feature config found for ${feature}. Please check if you added the schematics config to the projects/schematics/src/shared/updateable-constants.ts`
        );
      }

      const config =
        configurationOverrides?.[feature]?.schematics ??
        schematicsConfiguration;
      const libraryOptions =
        configurationOverrides?.[feature]?.options ?? genericLibraryOptions;

      rules.push(addLibraryFeature(libraryOptions, config));
      rules.push(handleWrapperModule(libraryOptions, config));
    }
    return chain(rules);
  };
}

function handleWrapperModule<OPTIONS extends LibraryOptions>(
  options: OPTIONS,
  featureConfig: FeatureConfig
): Rule {
  if (!featureConfig.wrappers) {
    return noop();
  }

  const rules: Rule[] = [];
  for (const markerModuleName in featureConfig.wrappers) {
    if (!featureConfig.wrappers.hasOwnProperty(markerModuleName)) {
      continue;
    }

    const featureModuleName = featureConfig.wrappers[markerModuleName];
    const wrapperOptions: SpartacusWrapperOptions = {
      scope: options.scope,
      interactive: options.interactive,
      project: options.project,
      markerModuleName,
      featureModuleName,
    };

    rules.push(schematic('wrapper-module', wrapperOptions));
  }

  return chain(rules);
}

/**
 * If exists, it returns the spartacus-features.module.ts' source.
 * Otherwise, it returns undefined.
 */
export function getSpartacusFeaturesModule(
  tree: Tree,
  basePath: string,
  tsconfigPath: string
): SourceFile | undefined {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

  for (const sourceFile of appSourceFiles) {
    if (
      sourceFile
        .getFilePath()
        .includes(`${SPARTACUS_FEATURES_MODULE}.module.ts`)
    ) {
      if (getSpartacusFeaturesNgModuleDecorator(sourceFile)) {
        return sourceFile;
      }
    }
  }
  return undefined;
}

/**
 * Returns the NgModule decorator, if exists.
 */
function getSpartacusFeaturesNgModuleDecorator(
  sourceFile: SourceFile
): CallExpression | undefined {
  let spartacusFeaturesModule: CallExpression | undefined;

  function visitor(node: Node) {
    if (Node.isCallExpression(node)) {
      const expression = node.getExpression();
      if (
        Node.isIdentifier(expression) &&
        expression.getText() === 'NgModule' &&
        isImportedFrom(expression, ANGULAR_CORE)
      ) {
        const classDeclaration = node.getFirstAncestorByKind(
          tsMorph.SyntaxKind.ClassDeclaration
        );
        if (classDeclaration) {
          const identifier = classDeclaration.getNameNode();
          if (
            identifier &&
            identifier.getText() === SPARTACUS_FEATURES_NG_MODULE
          ) {
            spartacusFeaturesModule = node;
          }
        }
      }
    }

    node.forEachChild(visitor);
  }

  sourceFile.forEachChild(visitor);
  return spartacusFeaturesModule;
}

export interface FeatureAnalysisResult {
  unrecognized?: boolean;
  core?: Expression[];
  features?: { element: Expression; feature: string }[];
}
export function analyzeFeature(sourceFile: SourceFile): FeatureAnalysisResult {
  const elements =
    getModulePropertyInitializer(sourceFile, 'imports', false)?.getElements() ??
    [];

  const core: Expression[] = [];
  const features: { element: Expression; feature: string }[] = [];
  for (const element of elements) {
    const analysis = analyzeModule(element);
    if (analysis.unrecognized) {
      // TODO: #schematics - throw exception?
      // TODO: #schematics - print warning for the customers
      console.error(
        'element not recognized as a spartacus feature:',
        element.print()
      );
      return {
        unrecognized: true,
      };
    }

    if (analysis.core) {
      core.push(element);
      continue;
    }

    if (analysis.feature) {
      features.push({ element, feature: analysis.feature });
      continue;
    }
  }

  return {
    core,
    features,
  };
}

interface AnalysisResult {
  core?: boolean;
  unrecognized?: boolean;
  feature?: string;
}
function analyzeModule(element: Expression): AnalysisResult {
  const moduleIdentifier = getModuleIdentifier(element);
  if (!moduleIdentifier) {
    return { unrecognized: true };
  }

  const importDeclaration = getImportDeclaration(moduleIdentifier);
  if (!importDeclaration) {
    return { unrecognized: true };
  }

  const importPath = importDeclaration.getModuleSpecifierValue();
  if (!isImportedFromSpartacusLibs(importPath)) {
    if (isRelative(importPath)) {
      const localFeatureModule =
        importDeclaration.getModuleSpecifierSourceFile();
      if (!localFeatureModule) {
        return { unrecognized: true };
      }

      const featureAnalysis = analyzeFeature(localFeatureModule);
      if (featureAnalysis.unrecognized) {
        return { unrecognized: true };
      }

      if (
        !featureAnalysis.features ||
        // the feature-module doesn't affect anything, so we can treat is a "core" feature
        featureAnalysis.features.length === 0
      ) {
        return { core: true };
      }

      const features = featureAnalysis.features.sort((feature1, feature2) =>
        calculateSort(
          feature1.feature,
          feature2.feature,
          crossFeatureInstallationOrder
        )
      );
      /**
       * the first feature is used as the label for.
       * the whole feature module.
       * Imagine the UserFeatureModule for example:
       * it has both Profile and Account features in it.
       * Therefore, to be on the safe side, we label the
       * feature module as the first feature.
       */
      const feature = features[0].feature;
      return { feature };
    }

    // an import from a 3rd party lib, or a custom TS path mapping (https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
    return { unrecognized: true };
  }

  if (isImportedFromSpartacusCoreLib(importPath)) {
    return { core: true };
  }

  const feature =
    // try to recognize the feature by feature modules
    getKeyByMappingValue(
      featureFeatureModuleMapping,
      moduleIdentifier.getText()
    ) ??
    // try to recognize the feature by root feature modules
    getKeyByMappingValue(featureRootModuleMapping, moduleIdentifier.getText());
  if (feature) {
    return { feature };
  }

  return { unrecognized: true };
}

// TODO:#schematics - test
// TODO:#schematics - comment
export function orderFeatures(analysisResult: FeatureAnalysisResult): string[] {
  const features = (analysisResult.features ?? [])
    .sort((featureAnalysis1, featureAnalysis2) =>
      calculateSort(
        featureAnalysis1.feature,
        featureAnalysis2.feature,
        crossFeatureInstallationOrder
      )
    )
    .map((analysis) => analysis.element);

  return (analysisResult.core ?? []).concat(features).map((element) =>
    // TODO:#schematics - test anon.forRoot()
    element.getText()
  );
}

// TODO:#schematics - move somewhere else
// TODO:#schematics - test
// TODO:#schematics - comment
export function orderInstalledFeatures<T extends LibraryOptions>(
  options: T
): Rule {
  return (tree: Tree, context: SchematicContext): void => {
    let message = `Ordering the installed Spartacus features...`;
    if (options.debug) {
      // TODO:#schematics - switch to `crossFeatureInstallationOrder`
      message = `Sorting the installed Spartacus features according to the dependency graph: ${crossLibraryInstallationOrder.join(
        ', '
      )}`;
    }
    context.logger.info(message);

    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
    for (const tsconfigPath of buildPaths) {
      const spartacusFeaturesModule = getSpartacusFeaturesModule(
        tree,
        basePath,
        tsconfigPath
      );
      if (!spartacusFeaturesModule) {
        continue;
      }

      const collectedModules = collectInstalledModules(spartacusFeaturesModule);
      if (!collectedModules) {
        continue;
      }

      // TODO:#schematics - uncomment
      // const spartacusCoreModules = collectedModules.spartacusCoreModules.map(
      //   (spartacusCoreModule) => spartacusCoreModule.getText()
      // );
      // const featureModules = collectedModules.featureModules
      //   .sort((moduleA, moduleB) =>
      //     calculateSort(
      //       moduleA.spartacusLibrary,
      //       moduleB.spartacusLibrary,
      //       // TODO:#schematics - switch to sorting using the `crossFeatureInstallationOrder`
      //       crossLibraryInstallationOrder
      //     )
      //   )
      //   .map((featureModule) => featureModule.moduleNode.getText());
      // const unrecognizedModules = collectedModules.unrecognizedModules.map(
      //   (unrecognizedModule) => unrecognizedModule.getText()
      // );

      // const moduleImportsProperty = getModulePropertyInitializer(
      //   spartacusFeaturesModule,
      //   'imports',
      //   false
      // );
      // if (!moduleImportsProperty) {
      //   continue;
      // }

      // if (collectedModules.warnings.length) {
      //   context.logger.warn(
      //     'The following modules were not recognized due to various reasons:'
      //   );
      //   for (const warning of collectedModules.warnings) {
      //     context.logger.warn(warning);
      //   }
      // }

      // const orderedModules: string[] = spartacusCoreModules
      //   .concat(featureModules)
      //   .concat(unrecognizedModules);
      // moduleImportsProperty.replaceWithText(`[${orderedModules.join(',\n')}]`);
      // saveAndFormat(spartacusFeaturesModule);
    }
  };
}

interface CollectingResult {
  coreModules: (Expression | Identifier)[];
  featureModules: {
    moduleImport: Expression | Identifier;
    moduleConfig: Module;
    isWrapper: boolean;
  }[];
  unrecognizedModules: (Expression | Identifier)[];
  warnings: string[];
}
/**
 * Collects the installed modules in the
 * given source file.
 */
// TODO:#schematics - test
export function collectInstalledModules(
  spartacusFeaturesModule: SourceFile
): CollectingResult | undefined {
  const initializer = getModulePropertyInitializer(
    spartacusFeaturesModule,
    'imports',
    false
  );
  if (!initializer) {
    return undefined;
  }

  const warnings: string[] = [];
  const coreModules: (Expression | Identifier)[] = [];
  const featureModules: {
    moduleImport: Expression | Identifier;
    moduleConfig: Module;
    isWrapper: boolean;
  }[] = [];
  const unrecognizedModules: (Expression | Identifier)[] = [];

  for (const element of initializer.getElements()) {
    const moduleIdentifier = getModuleIdentifier(element);
    if (!moduleIdentifier) {
      warnings.push(
        `Skipping ${element.print()} as it is not recognized as a module.`
      );
      continue;
    }

    const importDeclaration = getImportDeclaration(moduleIdentifier);
    if (!importDeclaration) {
      warnings.push(
        `Skipping ${element.print()} as there is no import found for it.`
      );
      continue;
    }

    const importPath = importDeclaration.getModuleSpecifierValue();
    if (isImportedFromSpartacusLibs(importPath)) {
      coreModules.push(element);
      continue;
    }

    // TODO:#schematics - test if an import is from e.g. `@ngrx/core` or any non-spartacus lib
    const localImportModule = importDeclaration.getModuleSpecifierSourceFile();
    if (!localImportModule) {
      warnings.push(`Module from ${importPath} not recognized.`);
      unrecognizedModules.push(element);
      continue;
    }

    /**
     * Algo
     *
     * 1. call function `collectNgImports` _just_ collects the ngimports without analyzing them
     * 2. iterate through the collected imports and call `analyzeModule` on each one
     * 3. the `analyzeModule` will analyze the given ngmodule import and determine if the given module is:
     *  - imported from a Spartacus core library --> check if the import is from the core Spartacus scopes.
     *  - a Spartacus library module import --> e.g. `@spartacus/checkout/base` will map to CLI_CHECKOUT_BASE_FEATURE.
     *  - imported from a local Spartacus feature module --> needs further analysis. Call a separate function `analyzeLocalSpartacusModule`. We expect to find only root module imports here.
     *      1. The separate function will collect the ngModule imports by calling `collectNgImports`.
     *      2. It will iterate through them, and check the if the import is _not_ from a Spartacus library.
     *      3. If it is not from a Spartacus library, return as unrecognized. We do this because we expect to find only root module imports in the local Spartacus feature module.
     *      4. use the root <-> feature mapping in order to recognize the local Spartacus file.
     *      5. if there's no mapping, return as unrecognized.
     *      6. use the graph to order all the root modules, and label the local Spartacus feature module _as the first feature found in the ordered array_. Why? Think about the user-feature.module.ts -> it has both User Account and User Profile configs. It should be labeled as the User Account feature, as it might affect the correct order of the features later on
     *  - unrecognized --> can be an import from a 3rd party library, internal customer's library, or the local Spartacus feature was not recognized.
     * 4. If there's only one unrecognized module, we will abort the main loop, and print a nice message for the client by saying they need to import the following modules manually, and in the correct order
     * 5. if there are no unrecognized modules, sort them according to the feature graph
     */

    // for (const schematicsConfig of SCHEMATICS_CONFIGS) {
    // TODO:#schematics - attempt to recognize the feature module
    // const recognizedFeatureModule = recognizeFeatureModule(
    //   localImportModule,
    //   schematicsConfig.featureModule
    // );
    // if (!recognizedFeatureModule) {
    //   unrecognizedModules.push(element);
    //   continue;
    // }

    // featureModules.push({
    //   ...recognizedFeatureModule,
    //   moduleImport: element,
    // });
    // }

    // const potentialFeatureModule =
    //   importDeclaration.getModuleSpecifierSourceFile();
    // if (!potentialFeatureModule) {
    //   warnings.push(
    //     `Skipping ${element.print()} as there is no file found for ${importDeclaration.print()}.`
    //   );
    //   continue;
    // }

    // const spartacusLibrary = recognizeFeatureModule(potentialFeatureModule);
    // if (spartacusLibrary) {
    //   featureModules.push({ spartacusLibrary, moduleNode: element });
    // } else {
    //   unrecognizedModules.push(element);
    // }
  }

  return {
    coreModules,
    featureModules,
    unrecognizedModules,
    warnings,
  };
}

/**
 * Analyzes both ts' imports and ngModule's imports.
 * If a match is found, it returns the found config.
 */
// function analyzeWrapperModule(
//   featureModule: SourceFile,
//   featureModuleConfig: Module | Module[]
// ): Module | undefined {
//   const importSearchResult = searchImports(featureModule, featureModuleConfig);
//   if (!importSearchResult) {
//     return undefined;
//   }

//   const ngModuleImports =
//     getModulePropertyInitializer(
//       featureModule,
//       'imports',
//       false
//     )?.getElements() ?? [];
//   for (const ngModuleImport of ngModuleImports) {
//     if (ngModuleImport.getText() === importSearchResult.name) {
//       return importSearchResult;
//     }
//   }

//   return undefined;
// }

// TODO:#schematics - move up somewhere
export interface DynamicImport {
  importPath: string;
  importModule: string;
  isRelative: boolean;
}
/**
 * Analyzes the dynamic imports of the given module.
 * If both dynamic import's import path and module name
 * are found in the given config, it returns the config.
 */
// TODO:#schematics - not needed?
// TODO:#schematics - test
export function findDynamicImport(
  sourceFile: SourceFile,
  importPathToFind: string,
  moduleNameToFind: string
): ArrowFunction | undefined {
  const collectedDynamicImports = collectDynamicImports(sourceFile);

  for (const dynamicImport of collectedDynamicImports) {
    const importPath = getDynamicImportImportPath(dynamicImport) ?? '';
    if (isRelative(importPath)) {
      if (!importPath.includes(importPathToFind)) {
        continue;
      }
    } else {
      if (importPath !== importPathToFind) {
        continue;
      }
    }

    const importModule =
      getDynamicImportPropertyAccess(dynamicImport)
        ?.getLastChildByKind(tsMorph.SyntaxKind.Identifier)
        ?.getText() ?? '';
    if (importModule === moduleNameToFind) {
      return dynamicImport;
    }
  }

  return undefined;
}

// TODO:#schematics - test
// TODO:#schematics - comment
export function getModuleConfig(
  featureModuleName: string,
  featureConfig: FeatureConfig
): Module | undefined {
  const featureModuleConfigs = ([] as Module[]).concat(
    featureConfig.featureModule
  );
  for (const featureModuleConfig of featureModuleConfigs) {
    if (featureModuleConfig.name === featureModuleName) {
      return featureModuleConfig;
    }
  }

  return undefined;
}

export function isWrapperModule(
  sourceFile: SourceFile,
  featureModuleName: string,
  featureConfig: FeatureConfig
): boolean {
  const moduleConfig = getModuleConfig(featureModuleName, featureConfig);
  if (!moduleConfig) {
    return false;
  }

  return findImport(sourceFile, moduleConfig.importPath, moduleConfig.name);
}

// TODO:#schematics - test
export function isFeatureModule(
  sourceFile: SourceFile,
  featureModuleName: string,
  featureConfig: FeatureConfig
): boolean {
  const moduleConfig = getModuleConfig(featureModuleName, featureConfig);
  if (!moduleConfig) {
    return false;
  }

  return !!findDynamicImport(
    sourceFile,
    moduleConfig.importPath,
    moduleConfig.name
  );
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
