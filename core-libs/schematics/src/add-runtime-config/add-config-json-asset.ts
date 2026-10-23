/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import {
  getDefaultProjectNameFromWorkspace,
  getWorkspace,
} from '../shared/utils/workspace-utils';

const CONFIG_JSON_ASSET = {
  glob: 'config.json',
  input: 'src',
  output: '/',
};

export function addConfigJsonAsset(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(`⌛️ Adding config.json asset to angular.json...`);
    }

    const { path, workspace: angularJson } = getWorkspace(tree);
    const projectName = getDefaultProjectNameFromWorkspace(tree);
    const project = angularJson.projects[projectName];
    const architect = project.architect;
    const build = architect?.build;
    const buildOptions = build?.options as any;

    const assets: any[] = Array.isArray(buildOptions?.assets)
      ? buildOptions.assets
      : [];

    const alreadyAdded = assets.some(
      (asset) =>
        typeof asset === 'object' &&
        asset.glob === CONFIG_JSON_ASSET.glob &&
        asset.input === CONFIG_JSON_ASSET.input &&
        asset.output === CONFIG_JSON_ASSET.output
    );

    if (alreadyAdded) {
      return tree;
    }

    const updatedAngularJson = {
      ...angularJson,
      projects: {
        ...angularJson.projects,
        [projectName]: {
          ...project,
          architect: {
            ...architect,
            build: {
              ...build,
              options: {
                ...buildOptions,
                assets: [...assets, CONFIG_JSON_ASSET],
              },
            },
          },
        },
      },
    };

    tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));

    if (options.debug) {
      context.logger.info(`✅ Added config.json asset to angular.json`);
    }
    return tree;
  };
}
