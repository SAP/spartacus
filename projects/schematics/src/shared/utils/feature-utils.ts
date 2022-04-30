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
} from '../schematics-config-mappings';
import { crossFeatureInstallationOrder } from './graph-utils';
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
  checkAppStructure,
  FeatureConfig,
  LibraryOptions,
  Module,
} from './lib-utils';
import { getModulePropertyInitializer, Import } from './new-module-utils';
import { createProgram, saveAndFormat } from './program';
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
 * Custom schematics configuration providers.
 */
export interface AdditionalProviders {
  import: Import[];
  content: string;
}

/**
 * Additional schematics configurations / overrides.
 */
export interface AdditionalFeatureConfiguration<T = LibraryOptions> {
  /**
   * If specified, provides the specified configuration.
   */
  providers?: AdditionalProviders | AdditionalProviders[];
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
  empty?: boolean | Expression[];
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
/**
 * Analysis result of wrapper module configuration.
 */
interface WrapperAnalysisResult {
  /**
   * Marker name.
   */
  markerModuleName: string;
  /**
   * Options.
   */
  wrapperOptions: SpartacusWrapperOptions;
}

/**
 * Configures feature modules for the given array of features.
 *
 * Optionally, an override can be provided for the default
 * schematics options and/or feature-schematics configuration.
 */
export function addFeatures<OPTIONS extends LibraryOptions>(
  options: OPTIONS,
  features: string[]
): Rule {
  return (tree: Tree, context: SchematicContext): Rule => {
    const spartacusFeatureModuleExists = checkAppStructure(
      tree,
      options.project
    );
    options = {
      ...options,
      internal: {
        ...options.internal,
        dirtyInstallation: spartacusFeatureModuleExists,
      },
    };

    if (options.debug) {
      let message = `\n******************************\n`;
      message += `Cross feature sorting order:\n`;
      message += crossFeatureInstallationOrder.join(', ');
      message += `\n******************************\n`;
      context.logger.info(message);
    }

    const rules: Rule[] = [];
    const allWrapperSchematics: WrapperAnalysisResult[] = [];
    for (const feature of features) {
      const schematicsConfiguration =
        featureSchematicConfigMapping.get(feature);
      if (!schematicsConfiguration) {
        throw new SchematicsException(
          `No feature config found for ${feature}. Please check if you added the schematics config to the projects/schematics/src/shared/schematics-config-mappings.ts`
        );
      }

      // TODO:#schematics - fix the interactivity for the CDS / ASM, etc.
      const libraryOptions =
        schematicsConfiguration.customConfig?.(options).options ?? options;

      rules.push(addLibraryFeature(libraryOptions, schematicsConfiguration));

      const wrappers = analyzeWrappers(
        schematicsConfiguration,
        libraryOptions,
        allWrapperSchematics
      );
      for (const { wrapperOptions } of wrappers) {
        rules.push(
          externalSchematic(
            SPARTACUS_SCHEMATICS,
            'wrapper-module',
            wrapperOptions
          )
        );
      }
    }

    if (options.internal?.dirtyInstallation) {
      rules.push(orderInstalledFeatures(options));
    }

    return chain(rules);
  };
}

/**
 * Analyzes the given schematics configuration for the wrapper modules.
 * It builds the options for the wrapper schematic run,
 * including the execution sequence.
 */
function analyzeWrappers<OPTIONS extends LibraryOptions>(
  schematicsConfiguration: FeatureConfig,
  options: OPTIONS,
  allWrappers: WrapperAnalysisResult[]
): WrapperAnalysisResult[] {
  if (!schematicsConfiguration.wrappers) {
    return [];
  }

  const result: WrapperAnalysisResult[] = [];
  for (const markerModuleName in schematicsConfiguration.wrappers) {
    if (!schematicsConfiguration.wrappers.hasOwnProperty(markerModuleName)) {
      continue;
    }

    const featureModuleName =
      schematicsConfiguration.wrappers[markerModuleName];
    const sequence = calculateWrapperExecutionSequence(
      allWrappers,
      markerModuleName
    );
    const wrapperOptions: SpartacusWrapperOptions = {
      scope: options.scope,
      interactive: options.interactive,
      project: options.project,
      markerModuleName,
      featureModuleName,
      debug: options.debug,
      internal: {
        sequence,
      },
    };

    const analysis: WrapperAnalysisResult = {
      markerModuleName,
      wrapperOptions,
    };
    result.push(analysis);
  }

  allWrappers.push(...result);
  return result;
}

/**
 * Calculates the execution sequence for the given wrapper module.
 */
function calculateWrapperExecutionSequence(
  allPreviousWrappers: WrapperAnalysisResult[],
  markerModuleName: string
): number {
  let count = 1;
  for (const collectedWrapper of allPreviousWrappers) {
    if (collectedWrapper.markerModuleName === markerModuleName) {
      count++;
    }
  }

  return count;
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

  if (elements.length === 0) {
    return {
      empty: true,
    };
  }

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
    empty,
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

    const isEmpty = Array.isArray(featureAnalysis.empty)
      ? featureAnalysis.empty.length !== 0
      : featureAnalysis.empty;
    if (isEmpty) {
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
    .concat(Array.isArray(analysisResult.empty) ? analysisResult.empty : [])
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

function orderInstalledFeatures(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (options.debug) {
      context.logger.info(`⌛️ Ordering Spartacus feature modules...`);
    }

    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      for (const spartacusFeaturesModule of appSourceFiles) {
        if (
          !spartacusFeaturesModule
            .getFilePath()
            .includes(`${SPARTACUS_FEATURES_MODULE}.module.ts`)
        ) {
          continue;
        }

        const analysis = analyzeFeature(spartacusFeaturesModule);
        if (analysis.unrecognized) {
          context.logger.warn(
            `Cannot order features in ${spartacusFeaturesModule.getFilePath()}, due to an unrecognized feature: ${
              analysis.unrecognized
            }`
          );
          context.logger.warn(
            `Please make sure to order the features in the NgModule's 'imports' array according to the following feature order:\n${crossFeatureInstallationOrder.join(
              ', '
            )}\n\n`
          );
          return noop();
        }

        const ordered = orderFeatures(analysis);
        getModulePropertyInitializer(
          spartacusFeaturesModule,
          'imports',
          false
        )?.replaceWithText(`[${ordered.join(',\n')}]`);

        saveAndFormat(spartacusFeaturesModule);
        break;
      }
    }

    if (options.debug) {
      context.logger.info(`✅ Ordering Spartacus feature modules...`);
    }
  };
}
