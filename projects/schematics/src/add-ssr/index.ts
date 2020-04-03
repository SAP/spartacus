import { experimental, strings } from '@angular-devkit/core';
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
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { appendHtmlElementToHead } from '@angular/cdk/schematics';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import {
  getIndexHtmlPath,
  getPathResultsForFile, getTsSourceFile,
} from '../shared/utils/file-utils';
import {
  addImport,
  addToModuleImportsAndCommitChanges,
} from '../shared/utils/module-file-utils';
import { getAngularVersion } from '../shared/utils/package-utils';
import { getProjectFromWorkspace } from '../shared/utils/workspace-utils';
import { isImported } from "@schematics/angular/utility/ast-utils";
import { ANGULAR_PLATFORM_BROWSER } from "../shared/constants";

function addPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const angularVersion = getAngularVersion(tree);
    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: angularVersion || '~9.0.3',
        name: '@angular/platform-server',
      },
      {
        type: NodeDependencyType.Default,
        version: '^9.0.1',
        name: '@nguniversal/express-engine',
      },
      {
        type: NodeDependencyType.Dev,
        version: '^6.0.4',
        name: 'ts-loader',
      },
    ];

    dependencies.forEach((dependency) => {
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
    addToModuleImportsAndCommitChanges(
      tree,
      appServerModulePath,
      `ServerTransferStateModule`
    );
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

function modifyAppModuleFile(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const appModulePath = getPathResultsForFile(
      tree,
      'app.module.ts',
      '/src'
    )[0];

    if (!appModulePath) {
      throw new SchematicsException(`Project file "app.module.ts" not found.`);
    }

    const moduleSource = getTsSourceFile(tree, appModulePath);
    if (
      !isImported(moduleSource, 'BrowserTransferStateModule', ANGULAR_PLATFORM_BROWSER)
    ) {
      addImport(
        tree,
        appModulePath,
        'BrowserTransferStateModule',
        ANGULAR_PLATFORM_BROWSER
      );
      addToModuleImportsAndCommitChanges(
        tree,
        appModulePath,
        `BrowserTransferStateModule`
      );

    }
    context.logger.log('info', `✅️ Modified app.module.ts file.`);
    return tree;
  };
}

export function addSSR(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const project = getProjectFromWorkspace(tree, options);
    const template = provideServerFile(options);

    return chain([
      addPackageJsonDependencies(),
      externalSchematic('@nguniversal/express-engine', 'ng-add', {
        clientProject: options.project,
      }),
      modifyAppServerModuleFile(),
      modifyIndexHtmlFile(project, options),
      branchAndMerge(
        chain([mergeWith(template, MergeStrategy.Overwrite)]),
        MergeStrategy.Overwrite
      ),
      modifyAppModuleFile(),
      installPackageJsonDependencies(),
    ])(tree, context);
  };
}
