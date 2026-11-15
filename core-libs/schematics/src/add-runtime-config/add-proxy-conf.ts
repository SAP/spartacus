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

// Uses http-proxy-middleware's bypass function to read config.json from disk
// inline on every request — no backend process needed, no port 4222.
// path.resolve(__dirname, 'config.json') is mandatory: process.cwd() is the
// monorepo root when running via `nx serve`, while __dirname always resolves
// relative to proxy.conf.js itself (co-located with config.json).
const PROXY_CONF_CONTENT = `const path = require('path');
const fs = require('fs');
module.exports = {
  '/config.json': {
    // target is required by http-proxy-middleware but never contacted:
    // bypass() returns false, which signals "response already sent, skip proxy".
    target: 'http://localhost:4200',
    bypass(req, res) {
      try {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.end(fs.readFileSync(path.resolve(__dirname, 'config.json'), 'utf-8'));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('[proxy] Could not read config.json:', e.message);
        res.statusCode = 500;
        res.end('{}');
      }
      return false;
    },
  },
};
`;

export function addProxyConf(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext): Tree => {
    if (options.debug) {
      context.logger.info(
        `⌛️ Adding proxy.conf.js and wiring proxyConfig...`
      );
    }

    const { path, workspace: angularJson } = getWorkspace(tree);
    const projectName =
      options.project ?? getDefaultProjectNameFromWorkspace(tree);
    const project = angularJson.projects[projectName];

    if (!project) {
      context.logger.warn(
        `⚠️ Could not find project "${projectName}" in angular.json — skipping proxy.conf.js setup.`
      );
      return tree;
    }

    if (tree.exists('/proxy.conf.js') || tree.exists('/proxy.conf.json')) {
      context.logger.warn(
        `⚠️ proxy.conf.js or proxy.conf.json already exists — skipping creation to avoid overwriting existing proxy rules. Add the /config.json bypass entry manually.`
      );
    } else {
      tree.create('/proxy.conf.js', PROXY_CONF_CONTENT);
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
                proxyConfig: 'proxy.conf.js',
              },
            },
          },
        },
      },
    };

    tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));

    if (options.debug) {
      context.logger.info(`✅ Added proxy.conf.js and wired proxyConfig`);
    }
    return tree;
  };
}
