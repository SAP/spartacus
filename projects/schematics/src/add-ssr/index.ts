/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { strings } from '@angular-devkit/core';
import {
  apply,
  branchAndMerge,
  chain,
  externalSchematic,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  Source,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { insertImport } from '@schematics/angular/utility/ast-utils';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import collectedDependencies from '../dependencies.json';
import { NGUNIVERSAL_EXPRESS_ENGINE } from '../shared/constants';
import { SPARTACUS_SETUP } from '../shared/libs-constants';
import {
  commitChanges,
  getIndexHtmlPath,
  getPathResultsForFile,
  getTsSourceFile,
} from '../shared/utils/file-utils';
import { appendHtmlElementToHead } from '../shared/utils/html-utils';
import {
  addPackageJsonDependencies,
  installPackageJsonDependencies,
} from '../shared/utils/lib-utils';
import { addToModuleProviders } from '../shared/utils/module-file-utils';
import {
  getPrefixedSpartacusSchematicsVersion,
  readPackageJson,
} from '../shared/utils/package-utils';

const DEPENDENCY_NAMES: string[] = [
  '@angular/platform-server',
  NGUNIVERSAL_EXPRESS_ENGINE,
  'ts-loader',
];

export function modifyAppServerModuleFile(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const appServerModulePath = getPathResultsForFile(
      tree,
      'app.server.module.ts',
      '/src'
    )[0];

    if (!appServerModulePath) {
      throw new SchematicsException(
        `Project file "app.server.module.ts" not found.`
      );
    }

    const importChange = insertImport(
      getTsSourceFile(tree, appServerModulePath),
      appServerModulePath,
      `provideServer`,
      `@spartacus/setup/ssr`,
      false
    );
    const providerChanges = addToModuleProviders(
      tree,
      appServerModulePath,
      `
     ...provideServer({
        serverRequestOrigin: process.env['SERVER_REQUEST_ORIGIN'],
      }),`
    );
    const changes = [importChange, ...providerChanges];
    commitChanges(tree, appServerModulePath, changes);

    context.logger.log('info', `✅️ Modified app.server.module.ts file.`);
    return tree;
  };
}

function modifyIndexHtmlFile(options: SpartacusOptions): Rule {
  return (tree: Tree) => {
    const buffer = tree.read('src/index.html');
    if (buffer) {
      const indexContent = buffer.toString();
      if (!indexContent.includes('<meta name="occ-backend-base-url"')) {
        const projectIndexHtmlPath = getIndexHtmlPath(tree);
        const baseUrl = options.baseUrl || 'OCC_BACKEND_BASE_URL_VALUE';
        const metaTags = [
          `<meta name="occ-backend-base-url" content="${baseUrl}" />`,
        ];

        metaTags.forEach((metaTag) => {
          appendHtmlElementToHead(tree, projectIndexHtmlPath, metaTag);
        });
      }
    }
    return tree;
  };
}

function provideServerFile(options: SpartacusOptions): Source {
  return apply(url('./files'), [
    template({
      ...strings,
      ...(options as object),
      typescriptExt: 'ts',
      browserDistDirectory: `dist/${options.project}/browser`,
    }),
    move('.'),
  ]);
}

function prepareDependencies(): NodeDependency[] {
  const spartacusVersion = getPrefixedSpartacusSchematicsVersion();

  const spartacusDependencies: NodeDependency[] = [];
  spartacusDependencies.push({
    type: NodeDependencyType.Default,
    version: spartacusVersion,
    name: SPARTACUS_SETUP,
  });

  const thirdPartyDependencies: NodeDependency[] = [];
  for (const dependencyName of DEPENDENCY_NAMES) {
    thirdPartyDependencies.push({
      type: NodeDependencyType.Default,
      version: (collectedDependencies.storefrontapp as Record<string, string>)[
        dependencyName
      ],
      name: dependencyName,
    });
  }

  return spartacusDependencies.concat(thirdPartyDependencies);
}

export function addSSR(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const serverTemplate = provideServerFile(options);
    const packageJson = readPackageJson(tree);

    return chain([
      addPackageJsonDependencies(prepareDependencies(), packageJson),
      externalSchematic(NGUNIVERSAL_EXPRESS_ENGINE, 'ng-add', {
        project: options.project,
      }),
      modifyAppServerModuleFile(),
      modifyIndexHtmlFile(options),
      branchAndMerge(
        chain([mergeWith(serverTemplate, MergeStrategy.Overwrite)]),
        MergeStrategy.Overwrite
      ),
      installPackageJsonDependencies(),
    ])(tree, context);
  };
}
