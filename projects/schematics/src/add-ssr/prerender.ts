/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  ProjectType,
  WorkspaceTargets,
} from '@schematics/angular/utility/workspace-models';
import {
  getDefaultProjectNameFromWorkspace,
  getWorkspace,
} from '../shared/utils/workspace-utils';

const mainPrerenderPath = `./src/main.prerender`;
const prerenderPath = `./prerender`;
const tsConfigPrerenderJsonPath = `./tsconfig.prerender.json`;

function providePrerenderFile(): Rule {
  const prerenderTsPath = `${prerenderPath}.ts`;
  const content = `import 'zone.js/node';
export * from '${mainPrerenderPath}';`;
  return (tree: Tree, _context: SchematicContext) => {
    tree.create(prerenderTsPath, content);
  };
}

function providePrerenderTsConfig(): Rule {
  const content = `{
    "extends": "./tsconfig.server.json",
    "compilerOptions": {
      "outDir": "./out-tsc/prerender",
    },
    "files": [
      "${mainPrerenderPath}.ts",
      "${prerenderPath}.ts",
    ]
  }
  `;
  return (tree: Tree) => {
    tree.create(tsConfigPrerenderJsonPath, content);
  };
}

function provideMainPrerender(): Rule {
  const mainPrerenderTs = `${mainPrerenderPath}.ts`;
  const content = `import { enableProdMode } from '@angular/core';
  import { environment } from './environments/environment';
  
  if (environment.production) {
    enableProdMode();
  }
  export { renderModule, renderModuleFactory } from '@angular/platform-server';
  export { AppServerModule } from './app/app.prerender';  
  `;
  return (tree: Tree) => {
    tree.create(mainPrerenderTs, content);
  };
}

function provideAppPrerenderModule(): Rule {
  const appPrerenderModule = './src/app/app.prerender.ts';
  const content = `import { NgModule } from '@angular/core';
  import { getPrerenderProviders } from '@spartacus/setup/prerender';
  import { AppComponent } from './app.component';
  import { AppServerModule as OriginalAppServerModule } from './app.server.module';
  
  @NgModule({
    imports: [OriginalAppServerModule],
    providers: [...getPrerenderProviders({
      requestOrigin:
      process.env['PRERENDER_DOMAIN'] ??
      \`http://localhost:\${process.env['PORT'] || 4200}\`
    })],
    // Since the bootstrapped component is not inherited from your
    // imported AppModule, it needs to be repeated here.
    bootstrap: [AppComponent],
  })
  // NOTE: DO NOT RENAME. ngUniversal expects this module to be named and exported as exactly 'AppServerModule'.
  export class AppServerModule {}`;
  return (tree: Tree) => {
    tree.create(appPrerenderModule, content);
  };
}

function createPrerenderSsrArchitect(
  projectName: string
): WorkspaceTargets<ProjectType.Application> {
  return {
    'prerender-ssr': {
      builder: '@angular-devkit/build-angular:server',
      options: {
        outputPath: `dist/${projectName}/prerender`,
        main: `${prerenderPath}.ts`,
        tsConfig: tsConfigPrerenderJsonPath,
      },
      configurations: {
        development: {
          sourceMap: true,
          optimization: false,
        },
        production: {
          outputHashing: 'media',
          fileReplacements: [
            {
              replace: 'src/environments/environment.ts',
              with: 'src/environments/environment.prod.ts',
            },
          ],
          sourceMap: false,
          optimization: true,
        },
      },
      defaultConfiguration: 'production',
    },
  };
}

function updateAngularJson(): Rule {
  return (tree: Tree): Tree => {
    const { path, workspace: angularJson } = getWorkspace(tree);
    const projectName = getDefaultProjectNameFromWorkspace(tree);

    const project = angularJson.projects[projectName];
    const architect = project.architect;
    const prerender = architect?.['prerender'] ?? {};
    const configurations = prerender.configurations ?? {};
    const productionConfiguration = configurations.production ?? {};
    let productionServerTarget =
      productionConfiguration.serverTarget ??
      `${projectName}:server:production`;
    productionServerTarget = productionServerTarget.replace(
      'server',
      'prerender-ssr'
    );
    const developmentConfiguration = configurations?.development ?? {};
    let developmentServerTarget =
      developmentConfiguration.serverTarget ??
      `${projectName}:server:development`;
    developmentServerTarget = developmentServerTarget.replace(
      'server',
      'prerender-ssr'
    );

    const updatedAngularJson = {
      ...angularJson,
      projects: {
        ...angularJson.projects,
        [projectName]: {
          ...project,
          architect: {
            ...architect,
            ...createPrerenderSsrArchitect(projectName),
            prerender: {
              ...prerender,
              configurations: {
                ...configurations,
                production: {
                  ...productionConfiguration,
                  serverTarget: productionServerTarget,
                },
                development: {
                  ...developmentConfiguration,
                  serverTarget: developmentServerTarget,
                },
              },
            },
          },
        },
      },
    };

    tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));

    return tree;
  };
}

export function addPrerendering(): Rule {
  return (_tree: Tree) => {
    return chain([
      providePrerenderFile(),
      providePrerenderTsConfig(),
      provideMainPrerender(),
      provideAppPrerenderModule(),
      updateAngularJson(),
    ]);
  };
}
