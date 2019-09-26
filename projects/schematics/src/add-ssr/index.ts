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
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addImport, importModule } from '../shared/utils/module-file-utils';
import {
  getIndexHtmlPath,
  getPathResultsForFile,
} from '../shared/utils/file-utils';
import { appendHtmlElementToHead } from '@angular/cdk/schematics';
import { experimental, strings } from '@angular-devkit/core';
import { getProjectFromWorkspace } from '../shared/utils/workspace-utils';
import { getAngularVersion } from '../shared/utils/package-utils';

function addPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const angularVersion = getAngularVersion(tree);
    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: angularVersion || '~8.2.5',
        name: '@angular/platform-server',
      },
      {
        type: NodeDependencyType.Default,
        version: '^8.1.1',
        name: '@nguniversal/express-engine',
      },
      {
        type: NodeDependencyType.Dev,
        version: '^5.3.2',
        name: 'ts-loader',
      },
      {
        type: NodeDependencyType.Dev,
        version: '^3.3.2',
        name: 'webpack-cli',
      },
    ];

    dependencies.forEach(dependency => {
      addPackageJsonDependency(tree, dependency);
      context.logger.log(
        'info',
        `✅️ Added '${dependency.name}' into ${dependency.type}`
      );
    });

    return tree;
  };
}

function installPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);
    return tree;
  };
}

function addPackageJsonScripts(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const buffer = tree.read('package.json');

    if (buffer) {
      const packageJsonFileObject = JSON.parse(buffer.toString('utf-8'));

      packageJsonFileObject.scripts[
        'build:client-and-server-bundles'
      ] = `ng build --prod && ng run ${options.project}:server`;
      packageJsonFileObject.scripts['build:ssr'] =
        'npm run build:client-and-server-bundles && npm run compile:server';
      packageJsonFileObject.scripts['serve:ssr'] = 'node dist/server';

      tree.overwrite(
        'package.json',
        JSON.stringify(packageJsonFileObject, null, 2)
      );
      context.logger.log(
        'info',
        `✅️ Added build scripts to package.json file.`
      );
    }
    return tree;
  };
}

function addServerConfigInAngularJsonFile(options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const buffer = tree.read('angular.json');

    if (buffer) {
      const angularJsonFileObject = JSON.parse(buffer.toString('utf-8'));
      const projectArchitectObject =
        angularJsonFileObject.projects[options.project].architect;
      projectArchitectObject.build.options[
        'outputPath'
      ] = `dist/${options.project}`;
      projectArchitectObject['server'] = {
        builder: '@angular-devkit/build-angular:server',
        options: {
          outputPath: 'dist/server',
          main: 'src/main.server.ts',
          tsConfig: 'tsconfig.server.json',
        },
      };
      projectArchitectObject['server'] = {
        builder: '@angular-devkit/build-angular:server',
        options: {
          outputPath: `dist/${options.project}-server`,
          main: 'src/main.server.ts',
          tsConfig: 'tsconfig.server.json',
          fileReplacements: [
            {
              replace: 'src/environments/environment.ts',
              with: 'src/environments/environment.prod.ts',
            },
          ],
        },
      };

      tree.overwrite(
        'angular.json',
        JSON.stringify(angularJsonFileObject, null, 2)
      );
      context.logger.log(
        'info',
        `✅️ Modified build scripts in angular.json file.`
      );
    }
    return tree;
  };
}

function modifyTSConfigServerFile(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const buffer = tree.read('tsconfig.server.json');

    if (buffer) {
      const newTSConfigServerContent = {
        extends: './tsconfig.json',
        compilerOptions: {
          outDir: '../out-tsc/app',
          baseUrl: './',
          module: 'commonjs',
          types: [],
        },
        exclude: ['test.ts', 'e2e/src/app.e2e-spec.ts', '**/*.spec.ts'],
        angularCompilerOptions: {
          entryModule: 'src/app/app.server.module#AppServerModule',
        },
      };

      tree.overwrite(
        'tsconfig.server.json',
        JSON.stringify(newTSConfigServerContent, null, 2)
      );
      context.logger.log('info', `✅️ Modified tsconfig.server.json file.`);
    }
    return tree;
  };
}

function modifyAppServerModuleFile(): Rule {
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

    addImport(
      tree,
      appServerModulePath,
      'ServerTransferStateModule',
      '@angular/platform-server'
    );
    importModule(tree, appServerModulePath, `ServerTransferStateModule`);
    context.logger.log('info', `✅️ Modified app.server.module.ts file.`);
    return tree;
  };
}

function modifyIndexHtmlFile(
  project: experimental.workspace.WorkspaceProject,
  options: SpartacusOptions
): Rule {
  return (tree: Tree) => {
    const buffer = tree.read('src/index.html');
    if (buffer) {
      const indexContent = buffer.toString();
      if (!indexContent.includes('<meta name="occ-backend-base-url"')) {
        const projectIndexHtmlPath = getIndexHtmlPath(project);
        const baseUrl = options.baseUrl || 'OCC_BACKEND_BASE_URL_VALUE';
        const metaTags = [
          `<meta name="occ-backend-base-url" content="${baseUrl}" />`,
        ];

        metaTags.forEach(metaTag => {
          appendHtmlElementToHead(tree, projectIndexHtmlPath, metaTag);
        });
      }
    }
    return tree;
  };
}

function provideServerAndWebpackServerConfigs(
  options: SpartacusOptions
): Source {
  return apply(url('./files'), [
    template({
      ...strings,
      ...(options as object),
      typescriptExt: 'ts',
      appDistPath: `dist/${options.project}`,
      serverDistPath: `dist/${options.project}-server`,
    }),
    move('.'),
  ]);
}

export function addSSR(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const possibleProjectFiles = ['/angular.json', '/.angular.json'];
    const project = getProjectFromWorkspace(
      tree,
      options,
      possibleProjectFiles
    );
    const templates = provideServerAndWebpackServerConfigs(options);

    return chain([
      addPackageJsonDependencies(),
      externalSchematic('@nguniversal/express-engine', 'ng-add', {
        clientProject: options.project,
      }),
      addPackageJsonScripts(options),
      addServerConfigInAngularJsonFile(options),
      modifyTSConfigServerFile(),
      modifyAppServerModuleFile(),
      modifyIndexHtmlFile(project, options),
      branchAndMerge(
        chain([mergeWith(templates, MergeStrategy.Overwrite)]),
        MergeStrategy.Overwrite
      ),
      installPackageJsonDependencies(),
    ])(tree, context);
  };
}
