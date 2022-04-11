import {
  chain,
  externalSchematic,
  noop,
  Rule,
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
import { crossFeatureInstallationOrder } from './graph-utils';
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

    rules.push(
      externalSchematic(
        '@spartacus/schematics',
        'wrapper-module',
        wrapperOptions
      )
    );
    // rules.push(schematic('wrapper-module', wrapperOptions));
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
