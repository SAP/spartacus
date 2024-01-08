/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
  SPARTACUS_SCHEMATICS,
} from '../libs-constants';
import {
  featureFeatureModuleMapping,
  featureSchematicConfigMapping,
  getKeyByMappingValueOrThrow,
  getSchematicsConfigByFeatureOrThrow,
} from '../schematics-config-mappings';
import { crossFeatureInstallationOrder } from './graph-utils';
import {
  findDynamicImport,
  getDynamicImportImportPath,
  isImportedFrom,
  isRelative,
  staticImportExists,
} from './import-utils';
import {
  addLibraryFeature,
  checkAppStructure,
  LibraryOptions,
  Module,
  SchematicConfig,
} from './lib-utils';
import { getModulePropertyInitializer, Import } from './new-module-utils';
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
      message += `Cross feature graph:\n`;
      message += crossFeatureInstallationOrder.join(', ');
      message += `\n******************************\n`;
      context.logger.info(message);
    }

    /**
     * In an existing Spartacus application, we don't want to
     * force-install the dependent features.
     */
    const featuresToInstall = options.internal?.existingSpartacusApplication
      ? options.features ?? []
      : features;

    const rules: Rule[] = [];
    for (const feature of featuresToInstall) {
      const schematicsConfiguration =
        featureSchematicConfigMapping.get(feature);
      if (!schematicsConfiguration) {
        throw new SchematicsException(
          `[Internal] No feature config found for ${feature}. ` +
            `Please check if the schematics config is added to projects/schematics/src/shared/schematics-config-mappings.ts`
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
  if (!schematicsConfiguration.importAfter?.length) {
    return [];
  }

  const result: WrapperAnalysisResult[] = [];
  for (const importAfterConfig of schematicsConfiguration.importAfter) {
    const wrapperOptions: SpartacusWrapperOptions = {
      scope: options.scope,
      interactive: options.interactive,
      project: options.project,
      markerModuleName: importAfterConfig.markerModuleName,
      featureModuleName: importAfterConfig.featureModuleName,
      debug: options.debug,
    };

    const analysis: WrapperAnalysisResult = {
      markerModuleName: importAfterConfig.markerModuleName,
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
 * It checks for presence of Spartacus features and
 * whether they're configured or present in package.json.
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
      existingSpartacusApplication: spartacusFeatureModuleExists,
    };

    if (!options.internal.existingSpartacusApplication) {
      const dependentFeaturesMessage = createDependentFeaturesLog(
        options,
        allFeatures
      );
      if (dependentFeaturesMessage) {
        context.logger.info(dependentFeaturesMessage);
      }

      return noop();
    }

    logDebugInfo(`⌛️ Analyzing application...`);

    for (const targetFeature of options.features ?? []) {
      const targetFeatureConfig =
        getSchematicsConfigByFeatureOrThrow(targetFeature);
      if (!targetFeatureConfig.importAfter?.length) {
        continue;
      }

      const wrappers = analyzeWrappers(targetFeatureConfig, options);
      for (const { wrapperOptions } of wrappers) {
        const markerFeature = getKeyByMappingValueOrThrow(
          featureFeatureModuleMapping,
          wrapperOptions.markerModuleName
        );

        const markerFeatureConfig =
          getSchematicsConfigByFeatureOrThrow(markerFeature);
        const markerModuleConfig = getModuleConfig(
          wrapperOptions.markerModuleName,
          markerFeatureConfig
        );
        if (
          !markerModuleConfig ||
          markerModuleExists(options, tree, markerModuleConfig)
        ) {
          continue;
        }

        const targetModuleName = wrapperOptions.featureModuleName;
        const targetFeature = getKeyByMappingValueOrThrow(
          featureFeatureModuleMapping,
          targetModuleName
        );
        const targetFeatureConfig =
          getSchematicsConfigByFeatureOrThrow(targetFeature);
        const targetModuleConfig = getModuleConfig(
          targetModuleName,
          targetFeatureConfig
        );

        let message = `Attempted to append '${targetModuleName}' module `;
        message += `from '${targetModuleConfig?.importPath}' after the `;
        message += `'${wrapperOptions.markerModuleName}' from '${markerModuleConfig.importPath}', `;
        message += `but could not find '${wrapperOptions.markerModuleName}'.`;
        message += `\n`;
        message += `Please make sure the '${markerFeature}' is installed by running:\n`;
        message += `> ng add @spartacus/schematics --features=${markerFeature}`;

        throw new SchematicsException(message);
      }
    }

    logDebugInfo(`✅  Application analysis complete.`);

    function logDebugInfo(message: string) {
      if (options.debug) {
        context.logger.info(message);
      }
    }
  };
}

function markerModuleExists<OPTIONS extends LibraryOptions>(
  options: OPTIONS,
  tree: Tree,
  markerModuleConfig: Module
): boolean {
  const basePath = process.cwd();
  const { buildPaths } = getProjectTsConfigPaths(tree, options.project);
  for (const tsconfigPath of buildPaths) {
    const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);
    if (findFeatureModule(markerModuleConfig, appSourceFiles)) {
      return true;
    }
  }

  return false;
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
  if (
    !staticImportExists(sourceFile, moduleConfig.importPath, moduleConfig.name)
  ) {
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

  return `\n⚙️ Configuring the dependent features of ${selectedFeatures.join(
    ', '
  )}: ${notSelectedFeatures.join(', ')}\n`;
}
