/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  getWorkspace,
  getDefaultProjectNameFromWorkspace,
  createSassSilenceDeprecations,
} from '../../../shared/utils/workspace-utils';

export function migrate(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const { path, workspace: angularJson } = getWorkspace(tree);
    const projectName = getDefaultProjectNameFromWorkspace(tree);
    const project = angularJson.projects[projectName];
    const architect = project.architect;

    const buildOptions = architect?.build?.options as any;
    const buildStylePreprocessorOptions = buildOptions.stylePreprocessorOptions;
    buildOptions.stylePreprocessorOptions = {
      ...buildStylePreprocessorOptions,
      ...createSassSilenceDeprecations(context, buildStylePreprocessorOptions),
    };

    const JSON_INDENT = 2;

    tree.overwrite(path, JSON.stringify(angularJson, null, JSON_INDENT));
  };
}
