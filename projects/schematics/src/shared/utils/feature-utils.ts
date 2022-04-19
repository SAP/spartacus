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
  SPARTACUS_SCHEMATICS,
} from '../libs-constants';
import {
  featureFeatureModuleMapping,
  featureRootModuleMapping,
  featureSchematicConfigMapping,
  getKeyByMappingValue,
} from '../updateable-constants';
import {
  getImportDeclaration,
  isImportedFrom,
  isImportedFromSpartacusCoreLib,
  isImportedFromSpartacusLibs,
  isRelative,
} from './import-utils';
import {
  addLibraryFeature,
  calculateCrossFeatureSort,
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

/**
 * Analysis result of feature modules.
 */
interface FeatureAnalysisResult {
  /**
   * Unrecognized features.
   */
  unrecognized?: string;
  /**
   * Features which don't have any imports.
   * These features don't affect the order,
   * and are sorted last.
   */
  empty?: Expression[];
  /**
   * Features from Spartacus core libs.
   */
  core?: Expression[];
  /**
   * Spartacus features.
   */
  features?: { element: Expression; feature: string }[];
}

/**
 * Analysis result of ng-modules.
 */
interface ModuleAnalysisResult {
  /**
   * Unrecognized feature.
   */
  unrecognized?: string;
  /**
   * Feature doesn't have any imports.
   */
  empty?: boolean;
  /**
   * Feature is from Spartacus core libs.
   */
  core?: boolean;
  /**
   * Spartacus feature.
   */
  feature?: string;
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
      // TODO:#schematics - fix the interactivity for the CDS / ASM, etc.
      interactive:
        options.interactive === undefined ? true : options.interactive,
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
      externalSchematic(SPARTACUS_SCHEMATICS, 'wrapper-module', wrapperOptions)
    );
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

/**
 * Analyzes the given module and returns the analysis result.
 */
export function analyzeFeature(sourceFile: SourceFile): FeatureAnalysisResult {
  const elements =
    getModulePropertyInitializer(sourceFile, 'imports', false)?.getElements() ??
    [];

  const empty: Expression[] = [];
  const core: Expression[] = [];
  const features: { element: Expression; feature: string }[] = [];
  for (const element of elements) {
    const analysis = analyzeModule(element);
    if (analysis.unrecognized) {
      return {
        unrecognized: element.print(),
      };
    }

    if (analysis.empty) {
      empty.push(element);
      continue;
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

/**
 * Analyzes the given ngModule, by checking its
 * imports and peeking into the referenced module
 * in case of a relative import.
 */
function analyzeModule(element: Expression): ModuleAnalysisResult {
  const moduleIdentifier = getModuleIdentifier(element);
  if (!moduleIdentifier) {
    return { unrecognized: element.print() };
  }

  const importDeclaration = getImportDeclaration(moduleIdentifier);
  if (!importDeclaration) {
    return { unrecognized: element.print() };
  }

  const importPath = importDeclaration.getModuleSpecifierValue();
  if (!isImportedFromSpartacusLibs(importPath)) {
    if (!isRelative(importPath)) {
      // an import from a 3rd party lib, or a custom TS path mapping (https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
      return { unrecognized: element.print() };
    }

    const localFeatureModule = importDeclaration.getModuleSpecifierSourceFile();
    if (!localFeatureModule) {
      return { unrecognized: element.print() };
    }

    const featureAnalysis = analyzeFeature(localFeatureModule);
    if (featureAnalysis.unrecognized) {
      return { unrecognized: featureAnalysis.unrecognized };
    }

    if (featureAnalysis.empty) {
      return { empty: true };
    }

    // the feature-module doesn't affect anything, so we can treat is a "core" feature
    if (!featureAnalysis.features || featureAnalysis.features.length === 0) {
      return { core: true };
    }

    const features = featureAnalysis.features.sort((feature1, feature2) =>
      calculateCrossFeatureSort(feature1.feature, feature2.feature)
    );
    /**
     * the first ordered feature is used as the
     * label for the whole feature module.
     * The reason is: imagine for example the UserFeatureModule,
     * which has both Profile and Account features in it.
     * To be on the safe side, we label the
     * feature module as the first feature, in cases there
     * are some custom feature modules which enhance it.
     */
    const feature = features[0].feature;
    return { feature };
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

  return { unrecognized: element.print() };
}

/**
 * Orders the given ng-imports by the cross-feature installation order.
 * First, the core features are ordered,
 * followed by the spartacus features.
 * Lastly, the empty features are ordered.
 */
export function orderFeatures(analysisResult: FeatureAnalysisResult): string[] {
  const features = (analysisResult.features ?? [])
    .sort((featureAnalysis1, featureAnalysis2) =>
      calculateCrossFeatureSort(
        featureAnalysis1.feature,
        featureAnalysis2.feature
      )
    )
    .map((analysis) => analysis.element);

  return (analysisResult.core ?? [])
    .concat(features)
    .concat(analysisResult.empty ?? [])
    .map((element) => element.getText());
}

/**
 * For the given feature module name,
 * returns the module configuration part
 * of the given schematics feature config
 */
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
