import {
  chain,
  externalSchematic,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NodeDependencyType } from '@schematics/angular/utility/dependencies';
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
  SPARTACUS_SCHEMATICS,
} from '../libs-constants';
import {
  featureFeatureModuleMapping,
  featureRootModuleMapping,
  featureSchematicConfigMapping,
  getKeyByMappingValue,
  getKeyByMappingValueOrThrow,
  getSchematicsConfigByFeatureOrThrow,
  libraryFeatureMapping,
} from '../schematics-config-mappings';
import { crossFeatureInstallationOrder } from './graph-utils';
import {
  collectDynamicImports,
  findDynamicImport,
  getDynamicImportImportPath,
  getImportDeclaration,
  importExists,
  isImportedFrom,
  isImportedFromSpartacusCoreLib,
  isImportedFromSpartacusLibs,
  isRelative,
} from './import-utils';
import {
  addLibraryFeature,
  calculateCrossFeatureSort,
  checkAppStructure,
  dependencyExists,
  LibraryOptions,
  Module,
  SchematicConfig,
} from './lib-utils';
import { getModulePropertyInitializer, Import } from './new-module-utils';
import { readPackageJson } from './package-utils';
import { createProgram, saveAndFormat } from './program';
import { getProjectTsConfigPaths } from './project-tsconfig-paths';
import { spartacusFeaturesModulePath } from './test-utils';

export interface FeatureModuleImports {
  importPath: string;
  moduleNode: Expression | Identifier;
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
  unrecognized?: string[];
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
   * Unrecognized module imports.
   */
  unrecognized?: string[];
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
  return (_tree: Tree, context: SchematicContext): Rule => {
    if (options.debug) {
      let message = `\n******************************\n`;
      message += `Cross feature sorting order:\n`;
      message += crossFeatureInstallationOrder.join(', ');
      message += `\n******************************\n`;
      context.logger.info(message);
    }

    const rules: Rule[] = [];
    for (const feature of features) {
      const schematicsConfiguration =
        featureSchematicConfigMapping.get(feature);
      if (!schematicsConfiguration) {
        throw new SchematicsException(
          `[internal] No feature config found for ${feature}. ` +
            `Please check if  the schematics config is added to projects/schematics/src/shared/schematics-config-mappings.ts`
        );
      }

      // TODO:#schematics - fix the interactivity for the CDS / ASM, etc.
      const libraryOptions =
        schematicsConfiguration.customConfig?.(options).options ?? options;

      rules.push(addLibraryFeature(libraryOptions, schematicsConfiguration));

      const wrappers = analyzeWrappers(schematicsConfiguration, libraryOptions);
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
  schematicsConfiguration: SchematicConfig,
  options: OPTIONS
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
    const wrapperOptions: SpartacusWrapperOptions = {
      scope: options.scope,
      interactive: options.interactive,
      project: options.project,
      markerModuleName,
      featureModuleName,
      debug: options.debug,
    };

    const analysis: WrapperAnalysisResult = {
      markerModuleName,
      wrapperOptions,
    };
    result.push(analysis);
  }

  return result;
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
  const unrecognized: string[] = [];
  for (const element of elements) {
    const analysis = analyzeModule(element);
    if (analysis.unrecognized?.length) {
      unrecognized.push(element.print());
      continue;
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
    unrecognized,
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
    return { unrecognized: [element.print()] };
  }

  const importDeclaration = getImportDeclaration(moduleIdentifier);
  if (!importDeclaration) {
    return { unrecognized: [element.print()] };
  }

  const importPath = importDeclaration.getModuleSpecifierValue();
  if (!isImportedFromSpartacusLibs(importPath)) {
    if (!isRelative(importPath)) {
      /**
       * An import from a 3rd part lib,
       * e.g. from `@ngrx/store`.
       *
       * Or, it could be a custom TS path mapping,
       * (https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
       */
      return { unrecognized: [element.print()] };
    }

    const localFeatureModule = importDeclaration.getModuleSpecifierSourceFile();
    if (!localFeatureModule) {
      return { unrecognized: [element.print()] };
    }

    const featureAnalysis = analyzeFeature(localFeatureModule);
    if (featureAnalysis.unrecognized?.length) {
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

  return { unrecognized: [element.print()] };
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
  featureConfig: SchematicConfig
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
        if (analysis.unrecognized?.length) {
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
      context.logger.info(`✅ Ordering Spartacus feature modules complete.`);
    }
  };
}

/**
 * Analyzes the customers' application.
 * It check for presence of Spartacus features,
 * if they're configured or present in package.json.
 *
 * It also checks if imports could be ordered in
 * spartacus-features.module and wrapper modules.
 */
export function analyzeApplication<OPTIONS extends LibraryOptions>(
  options: OPTIONS,
  allFeatures: string[]
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const spartacusFeatureModuleExists = checkAppStructure(
      tree,
      options.project
    );
    /**
     * Mutates the options, and sets the internal properties
     * for later usage in other rules.
     */
    options.internal = {
      ...options.internal,
      dirtyInstallation: spartacusFeatureModuleExists,
    };

    const dependentFeaturesMessage = createDependentFeaturesLog(
      options,
      allFeatures
    );
    if (dependentFeaturesMessage) {
      context.logger.info(dependentFeaturesMessage);
    }

    // fresh installation
    if (!options.internal?.dirtyInstallation) {
      return noop();
    }

    if (options.debug) {
      context.logger.info(`⌛️ Analyzing installed features...`);
    }

    const basePath = process.cwd();
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    const packageJson = readPackageJson(tree);
    for (const tsconfigPath of buildPaths) {
      const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

      const dependentFeaturesMessage = checkDependentFeatures(
        options,
        allFeatures,
        appSourceFiles,
        packageJson
      );
      if (dependentFeaturesMessage) {
        context.logger.warn(dependentFeaturesMessage);
        throw new SchematicsException();
      }

      const messages = analyzeInstalledFeatures(appSourceFiles);
      for (const message of messages) {
        context.logger.warn(message);
      }
    }

    if (options.debug) {
      context.logger.info(`✅ Analysis of installed features complete.`);
    }
  };
}

/**
 * Analyzes the features in the Spartacus feature module,
 * and checks if there are unrecognized features.
 */
function analyzeInstalledFeatures(appSourceFiles: SourceFile[]): string[] {
  for (const sourceFile of appSourceFiles) {
    if (!sourceFile.getFilePath().includes(spartacusFeaturesModulePath)) {
      continue;
    }

    const messages: string[] = [];

    const analysis = analyzeFeature(sourceFile);
    for (const unrecognized of analysis.unrecognized ?? []) {
      messages.push(
        generateUnrecognizedFeatureMessage(
          sourceFile.getFilePath(),
          unrecognized
        )
      );
    }

    const featureModules = (analysis.features ?? []).map((f) => f.element);
    const messagesForLocalFeatures =
      checkLocallyImportedFeatures(featureModules);
    messages.push(...messagesForLocalFeatures);

    if (messages.length) {
      const orderMessage =
        `Please make sure to order the features in the NgModule's 'imports' array ` +
        `according to the following feature order:\n` +
        crossFeatureInstallationOrder.join(', ') +
        `\n\n`;
      messages.push(orderMessage);
    }
    return messages;
  }

  throw new SchematicsException(`Could not find Spartacus features module.`);
}

function generateUnrecognizedFeatureMessage(
  path: string,
  name: string
): string {
  return (
    `Cannot order features in ${path}, ` +
    `due to an unrecognized feature: ${name}.`
  );
}

/**
 * Checks the dependent features of the wanted features.
 * If the dependent features are not properly configured,
 * it returns a message, and stops the analysis.
 */
function checkDependentFeatures<OPTIONS extends LibraryOptions>(
  options: OPTIONS,
  allFeatures: string[],
  appSourceFiles: SourceFile[],
  packageJson: any
): string | undefined {
  const wantedFeatures = options.features ?? [];
  const dependentFeatures = allFeatures.filter(
    (feature) => !wantedFeatures.includes(feature)
  );

  for (const dependentFeature of dependentFeatures) {
    const schematicsConfig =
      getSchematicsConfigByFeatureOrThrow(dependentFeature);
    const featureModule = findFeatureModule(schematicsConfig, appSourceFiles);
    if (!!featureModule) {
      continue;
    }

    const libraryInstalled = dependencyExists(
      {
        name: getKeyByMappingValueOrThrow(
          libraryFeatureMapping,
          dependentFeature
        ),
        type: NodeDependencyType.Default,
        version: '*',
      },
      packageJson
    );
    /**
     * if library is not installed, we can safely assume
     * that the feature is not installed and install it.
     */
    if (!libraryInstalled) {
      continue;
    }

    let wantedFeatureModules: Module[] = [];
    for (const wantedFeature of wantedFeatures) {
      wantedFeatureModules = wantedFeatureModules.concat(
        getSchematicsConfigByFeatureOrThrow(wantedFeature).featureModule
      );
    }

    const featureModules = ([] as Module[])
      .concat(schematicsConfig.featureModule)
      .map((m) => m.name);
    let message = `'${wantedFeatureModules.map((m) => m.name).join(',')}' `;
    message +=
      wantedFeatureModules.length > 1 ? `modules require ` : `module requires `;
    message += `the '${featureModules.join(',')}', but `;
    message += featureModules.length > 1 ? `they ` : `it `;
    message += `cannot be found.`;
    message += `\nPlease make sure to manually configure '${wantedFeatures.join(
      ','
    )}' `;
    message += wantedFeatures.length > 1 ? `features ` : `feature `;
    message += `by following this guide:\n`;
    message += `TODO:#schematics - docs link`;

    return message;
  }

  return undefined;
}

/**
 * Searches through all the source files,
 * and looks for the either the static or
 * dynamic imports of the feature module.
 */
function findFeatureModule(
  schematicsConfig: SchematicConfig,
  appSourceFiles: SourceFile[]
): SourceFile | undefined {
  const moduleConfigs = ([] as Module[]).concat(schematicsConfig.featureModule);
  for (const sourceFile of appSourceFiles) {
    for (const moduleConfig of moduleConfigs) {
      if (isStaticallyImported(sourceFile, moduleConfig)) {
        return sourceFile;
      }

      if (isDynamicallyImported(sourceFile, moduleConfig)) {
        return sourceFile;
      }
    }
  }

  return undefined;
}

function isStaticallyImported(
  sourceFile: SourceFile,
  moduleConfig: Module
): boolean {
  if (!importExists(sourceFile, moduleConfig.importPath, moduleConfig.name)) {
    false;
  }

  const elements =
    getModulePropertyInitializer(sourceFile, 'imports', false)?.getElements() ??
    [];
  for (const element of elements) {
    if (element.getText().includes(moduleConfig.name)) {
      return true;
    }
  }

  return false;
}

function isDynamicallyImported(
  sourceFile: SourceFile,
  moduleConfig: Module
): boolean {
  return !!findDynamicImport(sourceFile, {
    moduleSpecifier: moduleConfig.importPath,
    namedImports: [moduleConfig.name],
  });
}

/**
 * Checks if the local features contain any unrecognized module imports.
 */
function checkLocallyImportedFeatures(elements: Expression[]): string[] {
  const messages: string[] = [];
  for (const element of elements) {
    const moduleIdentifier = getModuleIdentifier(element);
    if (!moduleIdentifier) {
      return [];
    }

    const sourceFile =
      getImportDeclaration(moduleIdentifier)?.getModuleSpecifierSourceFile();
    if (!sourceFile) {
      return [];
    }

    const relativeDynamicImports = collectDynamicImports(sourceFile).filter(
      (di) => isRelative(getDynamicImportImportPath(di) ?? '')
    );

    for (const dynamicImport of relativeDynamicImports) {
      const wrapperSource =
        getDynamicallyImportedLocalSourceFile(dynamicImport);
      if (!wrapperSource) {
        continue;
      }

      const analysis = analyzeFeature(wrapperSource);
      if (analysis.unrecognized?.length) {
        for (const unrecognized of analysis.unrecognized) {
          messages.push(
            generateUnrecognizedFeatureMessage(
              wrapperSource.getFilePath(),
              unrecognized
            )
          );
        }
      }
    }
  }

  return messages;
}

/**
 * Peeks into the given dynamic import,
 * and returns referenced local source file.
 */
export function getDynamicallyImportedLocalSourceFile(
  dynamicImport: ArrowFunction
): SourceFile | undefined {
  const importPath = getDynamicImportImportPath(dynamicImport) ?? '';
  if (!isRelative(importPath)) {
    return;
  }

  const wrapperModuleFileName = `${importPath.split('/').pop()}.ts`;
  return dynamicImport
    .getSourceFile()
    .getProject()
    .getSourceFile((s) => s.getFilePath().endsWith(wrapperModuleFileName));
}

function createDependentFeaturesLog(
  options: SpartacusOptions,
  features: string[]
): string | undefined {
  const selectedFeatures = options.features ?? [];
  const notSelectedFeatures = features.filter(
    (feature) => !selectedFeatures.includes(feature)
  );

  if (!notSelectedFeatures.length) {
    return;
  }

  let message = `\n`;
  if (options.internal?.dirtyInstallation) {
    message += `🔎 Checking `;
  } else {
    message += `⚙️ Configuring `;
  }
  message += `the dependent features of ${selectedFeatures.join(
    ', '
  )}: ${notSelectedFeatures.join(', ')}\n`;

  return message;
}
