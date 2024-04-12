import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { SourceFile } from 'ts-morph';
import {
  PROVIDE_FEATURE_TOGGLES_FUNCTION,
  SPARTACUS_CORE,
  SPARTACUS_FEATURES_NG_MODULE,
  addModuleProvider,
  getProjectTsConfigPaths,
  getSpartacusFeaturesModule,
  saveAndFormat,
} from '../shared';
import { Schema as SpartacusOptions } from './schema';

export function addFeatureToggles(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Adding Feature Toggles...`);
    }

    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    if (!buildPaths.length) {
      throw new SchematicsException(
        `Could not find any tsconfig file. Can't find ${SPARTACUS_FEATURES_NG_MODULE}.`
      );
    }

    const basePath = process.cwd();
    for (const tsconfigPath of buildPaths) {
      const spartacusFeaturesModule = getSpartacusFeaturesModule(
        tree,
        basePath,
        tsconfigPath
      );
      if (spartacusFeaturesModule) {
        _addFeatureToggles(spartacusFeaturesModule);
        break;
      }
    }

    if (options.debug) {
      context.logger.info(`✅ Feature Toggles added.`);
    }
    return tree;
  };
}
/**
 * Creates and adds a spartacus feature toggles with all of them enabled.
 */
function _addFeatureToggles(sourceFile: SourceFile): void {
  const featureTogglesProvider = createFeatureTogglesProvider();
  addModuleProvider(sourceFile, {
    import: [
      {
        moduleSpecifier: SPARTACUS_CORE,
        namedImports: [PROVIDE_FEATURE_TOGGLES_FUNCTION],
      },
    ],
    content: featureTogglesProvider,
  });

  saveAndFormat(sourceFile);
}

/**
 * Returns a provider for all existing feature toggles with value `true`.
 */
function createFeatureTogglesProvider(): string {
  const { defaultFeatureToggles } = require('../feature-toggles.copy');

  //for each key in `defaultFeatureToggles` map it to a key with value true
  const featureTogglesAllEnabled: Record<string, boolean> = Object.keys(
    defaultFeatureToggles
  ).reduce((acc, key) => ({ ...acc, [key]: true }), {});
  const featureTogglesString = JSON.stringify(
    featureTogglesAllEnabled,
    null,
    2
  );
  return `provideFeatureToggles(${featureTogglesString})`;
}
