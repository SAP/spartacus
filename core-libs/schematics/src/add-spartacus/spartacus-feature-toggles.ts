/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { SourceFile } from 'ts-morph';
import {
  FEATURE_TOGGLES_COPIED_FROM_CORE_LIB_PATH,
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
    let added = false;
    for (const tsconfigPath of buildPaths) {
      const spartacusFeaturesModule = getSpartacusFeaturesModule(
        tree,
        basePath,
        tsconfigPath
      );
      if (spartacusFeaturesModule) {
        _addFeatureToggles(spartacusFeaturesModule);
        added = true;
        break;
      }
    }

    if (options.debug) {
      if (added) {
        context.logger.info(`✅ Feature Toggles added.`);
      }
    }
    if (!added) {
      context.logger.warn(
        `⚠️  Could not find ${SPARTACUS_FEATURES_NG_MODULE} — Feature Toggles not added.`
      );
    }
    return tree;
  };
}
/**
 * Creates and adds spartacus feature toggles with all of them enabled.
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
  const defaultFeatureToggles = getDefaultFeatureToggles();

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

/**
 * Retrieves Spartacus core library's default feature toggles.
 *
 * Note: A TypeScript file is copied to the schematics project in a pre-build step,
 * from the core project, to prevent a runtime dependency on `@spartacus/core`.
 * This file is then compiled into JavaScript and included with the schematics
 * project's distribution, used at runtime.
 *
 * Due to the lazy nature of the NodeJS `require()` function, the TypeScript
 * file may not appear in the schematics project's source code.
 *
 * For more, see the script `copy-feature-toggles` in the schematics's `package.json`.
 */
function getDefaultFeatureToggles(): Record<string, boolean> {
  const { defaultFeatureToggles } = require(
    FEATURE_TOGGLES_COPIED_FROM_CORE_LIB_PATH
  );
  return defaultFeatureToggles;
}
