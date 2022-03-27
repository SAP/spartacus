import {
  chain,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { CallExpression, Node, SourceFile, ts as tsMorph } from 'ts-morph';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import { ANGULAR_CORE } from '../constants';
import {
  SPARTACUS_FEATURES_MODULE,
  SPARTACUS_FEATURES_NG_MODULE,
} from '../libs-constants';
import { featureSchematicConfigMapping } from '../updateable-constants';
import { isImportedFrom } from './import-utils';
import { addLibraryFeature, FeatureConfig, LibraryOptions } from './lib-utils';
import { createProgram } from './program';

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
    }
    return chain(rules);
  };
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
