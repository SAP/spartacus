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

const PROXY_CONF_CONTENT = JSON.stringify(
  {
    '/config.json': {
      target: 'http://localhost:4222',
      secure: false,
      logLevel: 'warn',
    },
  },
  null,
  2
);

export function addProxyConf(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(
        `⌛️ Adding proxy.conf.json and wiring proxyConfig...`
      );
    }

    const { path, workspace: angularJson } = getWorkspace(tree);
    const projectName =
      options.project ?? getDefaultProjectNameFromWorkspace(tree);
    const project = angularJson.projects[projectName];

    if (!project) {
      context.logger.warn(
        `⚠️ Could not find project "${projectName}" in angular.json — skipping proxy.conf.json setup.`
      );
      return tree;
    }

    if (!tree.exists('/proxy.conf.json')) {
      tree.create('/proxy.conf.json', PROXY_CONF_CONTENT + '\n');
    }

    const architect = (project as any).architect;
    const serve = architect?.serve;
    const serveOptions = serve?.options ?? {};

    if (serveOptions.proxyConfig) {
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
            serve: {
              ...serve,
              options: {
                ...serveOptions,
                proxyConfig: 'proxy.conf.json',
              },
            },
          },
        },
      },
    };

    tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));

    if (options.debug) {
      context.logger.info(`✅ Added proxy.conf.json and wired proxyConfig`);
    }
    return tree;
  };
}
