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
  featureSchematicConfigMapping,
  getKeyByMappingValueOrThrow,
  getSchematicsConfigByFeatureOrThrow,
  libraryFeatureMapping,
} from '../schematics-config-mappings';
import { crossFeatureInstallationOrder } from './graph-utils';
import {
  findDynamicImport,
  getDynamicImportImportPath,
  importExists,
  isImportedFrom,
  isRelative,
} from './import-utils';
import {
  addLibraryFeature,
  checkAppStructure,
  dependencyExists,
  LibraryOptions,
  Module,
  SchematicConfig,
} from './lib-utils';
import { getModulePropertyInitializer, Import } from './new-module-utils';
import { readPackageJson } from './package-utils';
import { createProgram } from './program';
import { getProjectTsConfigPaths } from './project-tsconfig-paths';

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
    }

    if (options.debug) {
      context.logger.info(`✅ Analysis of installed features complete.`);
    }
  };
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
    const featureModule = findFeatureModule(
      schematicsConfig.featureModule,
      appSourceFiles
    );
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
     * if library is not installed, we can assume
     * the feature is not installed. Therefore, we can
     * safely proceed the analysis, and eventually
     * install if all other requirements are met.
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
 * Searches through feature modules,
 * and looks for either the static or
 * dynamic imports.
 */
export function findFeatureModule(
  moduleConfig: Module | Module[],
  appSourceFiles: SourceFile[]
): SourceFile | undefined {
  const moduleConfigs = ([] as Module[]).concat(moduleConfig);
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
    const moduleName = element.getText().split('.').pop() ?? '';

    if (moduleName === moduleConfig.name) {
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
