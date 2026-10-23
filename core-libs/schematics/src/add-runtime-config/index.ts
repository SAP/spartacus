/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  chain,
  mergeWith,
  move,
  noop,
  url,
} from '@angular-devkit/schematics';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { getDefaultProjectNameFromWorkspace } from '../shared/utils/workspace-utils';
import { addConfigJsonAsset } from './add-config-json-asset';
import { updateAppConfig } from './update-app-config';
import { updateMainTs } from './update-main-ts';
import { updateServerTs } from './update-server-ts';

function createConfigJsonFile(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Rule | void => {
    const projectName = getDefaultProjectNameFromWorkspace(tree);
    const project = (tree.readJson('/angular.json') as any)?.projects?.[
      projectName
    ];
    const sourceRoot: string = project?.sourceRoot ?? 'src';
    const configJsonPath = `${sourceRoot}/config.json`;

    if (tree.exists(configJsonPath)) {
      if (options.debug) {
        context.logger.info(
          `⏭️ Skipping config.json creation — file already exists at ${configJsonPath}`
        );
      }
      return;
    }

    return mergeWith(apply(url('./files'), [move(sourceRoot)]));
  };
}

export function addRuntimeConfig(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!options.runtimeConfig) {
      return noop()(tree, context);
    }

    if (options.debug) {
      context.logger.info(`⌛️ Adding runtime config support...`);
    }

    return chain([
      updateMainTs(options),
      updateAppConfig(options),
      options.ssr ? updateServerTs(options) : noop(),
      addConfigJsonAsset(options),
      createConfigJsonFile(options),
    ])(tree, context);
  };
}
