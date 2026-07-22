/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  NodePackageInstallTask,
  RunSchematicTask,
} from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getPrefixedSpartacusSchematicsVersion } from '../shared/utils/package-utils';
import { AiTool, Schema as SpartacusOptions } from './schema';

const SUPPORTED_TOOLS: readonly AiTool[] = ['claude', 'agents'];

const SKILLS_PACKAGE = '@spartacus/skills';

/**
 * Adds `@spartacus/skills` as a dev dependency; the copy into the project runs
 * post-install in {@link scheduleAiContext}.
 */
export function addAiContext(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): void => {
    const targets = normalize(options.aiTools);
    if (targets.length === 0) {
      if (options.debug) {
        context.logger.info(`ℹ️  Skipping AI context — no aiTools selected.`);
      }
      return;
    }

    addPackageJsonDependency(tree, {
      type: NodeDependencyType.Dev,
      name: SKILLS_PACKAGE,
      version: getPrefixedSpartacusSchematicsVersion(),
      overwrite: false,
    });

    if (options.debug) {
      context.logger.info(`✅️ Added '${SKILLS_PACKAGE}' into devDependencies`);
    }
  };
}

/**
 * Runs the `ai-context` copy schematic only after the install task, so
 * `@spartacus/skills` is present in `node_modules`.
 */
export function scheduleAiContext(options: SpartacusOptions): Rule {
  return (_tree: Tree, context: SchematicContext): void => {
    const targets = normalize(options.aiTools);
    if (targets.length === 0) {
      return;
    }

    const installTaskId = context.addTask(new NodePackageInstallTask());

    context.addTask(
      new RunSchematicTask('ai-context', {
        aiTools: targets,
        debug: options.debug,
      }),
      [installTaskId]
    );

    context.logger.info(
      `ℹ️  Spartacus AI skills (${SKILLS_PACKAGE}) will be copied into your project after install. ` +
        `Re-run 'ng generate @spartacus/schematics:ai-context' anytime to refresh them after updating the package.`
    );
  };
}

function normalize(input: SpartacusOptions['aiTools']): AiTool[] {
  if (!input || input.length === 0) {
    return [];
  }
  const seen = new Set<AiTool>();
  for (const value of input) {
    if (SUPPORTED_TOOLS.includes(value)) {
      seen.add(value);
    }
  }
  return SUPPORTED_TOOLS.filter((tool) => seen.has(tool));
}
