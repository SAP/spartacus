/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '../../shared/utils/workspace-utils';
import { printErrorWithDocsForMigrated_6_8_To_2211_19 } from '../fallback-advice-to-follow-docs';

/**
 * Updates the Angular configuration related to SSR for new Angular v17 standards.
 *
 * 1. In the section `architect > build > options` it adds 3 new options with values:
 *    `"server": "src/main.server.ts"`,
 *    `"prerender": false`,
 *     `"ssr": { "entry": "server.ts" }`
 *
 * 2. In the section `architect > build > configurations` it adds a new property with object value
 *    `"noSsr": { "ssr": false, "prerender": false }`
 *
 * 3. In the section `architect > serve > configurations` it adds the ending `,noSsr` (with the preceding comma)
 *    at the end of the string values in subsections
 *    `... > production > buildTarget` and
 *    `... > development > buildTarget`
 *
 * 4. It removes the whole 3 sections `architect > server`, `architect > serve-ssr` and `architect > prerender`
 *    (because their responsibilities are now handled just by the single new Angular `application` builder)
 */
export function updateAngularJsonForSsr(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('\n⏳ Updating angular.json for SSR...');

    const { workspace, path } = getWorkspace(tree);
    const [firstProjectKey] = Object.keys(workspace.projects);
    const project = workspace.projects[firstProjectKey];

    if (!project) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        'No project found for SSR migration',
        context
      );
      return;
    }

    if (!project.architect?.build) {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        'No build target found in project configuration',
        context
      );
      return;
    }

    context.logger.info(
      '  ↳ Updating build target with SSR options: "server: "src/main.server.ts", "prerender": false, "ssr": { "entry": "server.ts" }'
    );
    project.architect.build = {
      ...project.architect.build,
      options: {
        ...project.architect.build.options,
        server: 'src/main.server.ts',
        prerender: false,
        ssr: { entry: 'server.ts' },
      } as any,
      configurations: {
        ...project.architect.build.configurations,
        noSsr: { ssr: false, prerender: false },
      } as any,
    };

    context.logger.info('  ↳ Updating "outputPath" if it ends with /browser');
    const buildOptions = project.architect?.build?.options as any;
    if (
      typeof buildOptions.outputPath === 'string' &&
      buildOptions.outputPath.endsWith('/browser')
    ) {
      buildOptions.outputPath = buildOptions.outputPath.replace(
        /\/browser$/,
        ''
      );
    } else {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        'Could not update "outputPath" in angular.json',
        context
      );
      return;
    }

    context.logger.info('  ↳ Updating "serve" configurations with `,noSsr`');
    const serveConfigs = project.architect?.serve?.configurations;
    if (serveConfigs) {
      project.architect.serve = {
        ...project.architect.serve,
        configurations: {
          ...serveConfigs,
          production: {
            ...serveConfigs.production,
            buildTarget: `${serveConfigs.production?.buildTarget},noSsr`,
          },
          development: {
            ...serveConfigs.development,
            buildTarget: `${serveConfigs.development?.buildTarget},noSsr`,
          },
        },
      } as any;
    } else {
      printErrorWithDocsForMigrated_6_8_To_2211_19(
        'Could not update "serve" configurations in angular.json',
        context
      );
      return;
    }

    context.logger.info(
      '  ↳ Removing obsolete "architect" targets: "server", "serve-ssr", "prerender"'
    );
    delete project.architect?.server;
    delete project.architect?.['serve-ssr'];
    delete project.architect?.prerender;

    const JSON_INDENT = 2;
    tree.overwrite(path, JSON.stringify(workspace, null, JSON_INDENT));
    context.logger.info('✅ Updated angular.json for SSR');
  };
}
