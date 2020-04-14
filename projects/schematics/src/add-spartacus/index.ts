import { experimental } from '@angular-devkit/core';
import { italic, red } from '@angular-devkit/core/src/terminal';
import {
  chain,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  appendHtmlElementToHead,
  findNodes,
  getProjectStyleFile,
  getSourceNodes,
} from '@angular/cdk/schematics';
import {
  getEnvironmentExportName,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { getProjectTargets } from '@schematics/angular/utility/project-targets';
import * as ts from 'typescript';
import {
  ANGULAR_LOCALIZE,
  B2C_STOREFRONT_MODULE,
  DEFAULT_ENVIRONMENT_NAME,
  SPARTACUS_ASSETS,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
  SPARTACUS_STYLES,
} from '../shared/constants';
import {
  commitChanges,
  getIndexHtmlPath,
  getTsSourceFile,
} from '../shared/utils/file-utils';
import {
  addImport,
  addToModuleImportsAndCommitChanges,
} from '../shared/utils/module-file-utils';
import {
  getAngularVersion,
  getSpartacusCurrentFeatureLevel,
  getSpartacusSchematicsVersion,
} from '../shared/utils/package-utils';
import { getProjectFromWorkspace } from '../shared/utils/workspace-utils';
import { Schema as SpartacusOptions } from './schema';

const DEFAULT_ENVIRONMENT_PATHS = {
  replace: '/src/environments/environment.ts',
  with: '/src/environments/environment.prod.ts',
};

function addPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
    const ngrxVersion = '~9.0.0';
    const angularVersion = getAngularVersion(tree);

    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: spartacusVersion,
        name: SPARTACUS_CORE,
      },
      {
        type: NodeDependencyType.Default,
        version: spartacusVersion,
        name: SPARTACUS_STOREFRONTLIB,
      },
      {
        type: NodeDependencyType.Default,
        version: spartacusVersion,
        name: SPARTACUS_ASSETS,
      },
      {
        type: NodeDependencyType.Default,
        version: spartacusVersion,
        name: SPARTACUS_STYLES,
      },

      {
        type: NodeDependencyType.Default,
        version: '^6.0.0',
        name: '@ng-bootstrap/ng-bootstrap',
      },
      {
        type: NodeDependencyType.Default,
        version: '^4.0.0',
        name: '@ng-select/ng-select',
      },

      {
        type: NodeDependencyType.Default,
        version: ngrxVersion,
        name: '@ngrx/store',
      },
      {
        type: NodeDependencyType.Default,
        version: ngrxVersion,
        name: '@ngrx/effects',
      },
      {
        type: NodeDependencyType.Default,
        version: ngrxVersion,
        name: '@ngrx/router-store',
      },

      {
        type: NodeDependencyType.Default,
        version: '^4.2.1',
        name: 'bootstrap',
      },
      { type: NodeDependencyType.Default, version: '^19.3.4', name: 'i18next' },
      {
        type: NodeDependencyType.Default,
        version: '^3.2.2',
        name: 'i18next-xhr-backend',
      },
      {
        type: NodeDependencyType.Default,
        version: angularVersion,
        name: '@angular/service-worker',
      },
      {
        type: NodeDependencyType.Default,
        version: angularVersion,
        name: ANGULAR_LOCALIZE,
      },
      {
        type: NodeDependencyType.Default,
        version: '^8.0.0',
        name: 'ngx-infinite-scroll',
      },
    ];

    dependencies.forEach((dependency) => {
      addPackageJsonDependency(tree, dependency);
      context.logger.info(
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

function updateEnvironment(
  project: experimental.workspace.WorkspaceProject,
  options: SpartacusOptions
): Rule {
  return (host: Tree, _context: SchematicContext) => {
    const fileReplacements =
      project.architect?.build?.configurations?.production
        ?.fileReplacements[0] || DEFAULT_ENVIRONMENT_PATHS;
    const devEnvironmentPath = fileReplacements.replace;
    const prodEnvironmentPath = fileReplacements.with;

    const devChange = appendOccPrefixToEnv(host, devEnvironmentPath, options);
    const prodChange = appendOccPrefixToEnv(host, prodEnvironmentPath, options);
    commitChanges(host, devEnvironmentPath, [devChange]);
    commitChanges(host, prodEnvironmentPath, [prodChange]);

    return host;
  };
}

function appendOccPrefixToEnv(
  tree: Tree,
  path: string,
  options: SpartacusOptions
): Change {
  const appModulePath = getMainAppModulePath(tree, options);
  const appModuleSource = getTsSourceFile(tree, appModulePath);
  const envName =
    getEnvironmentExportName(appModuleSource) || DEFAULT_ENVIRONMENT_NAME;

  const source = getTsSourceFile(tree, path);
  const allNodes = getSourceNodes(source);

  const lastPropertyInfo = allNodes
    .filter((n) => n.kind === ts.SyntaxKind.VariableDeclaration)
    .filter((n) => {
      const environmentObject = n
        .getChildren()
        .filter(
          (identifier) =>
            identifier.kind === ts.SyntaxKind.Identifier &&
            identifier.getText() === envName
        );
      return environmentObject.length !== 0;
    })
    .map(
      (variableDeclarationNode) =>
        variableDeclarationNode
          .getChildren()
          .filter((n) => n.kind === ts.SyntaxKind.ObjectLiteralExpression)[0]
    )
    .map((objectLiteralExpressionNode) => {
      const properties = findNodes(
        objectLiteralExpressionNode,
        ts.SyntaxKind.PropertyAssignment
      );
      const commas = findNodes(
        objectLiteralExpressionNode,
        ts.SyntaxKind.CommaToken
      );

      // return the last one
      const lastProperty = properties[properties.length - 1];
      const trailingComma = commas.length === properties.length;

      return {
        lastProperty,
        trailingComma,
      };
    })[0];

  let position = lastPropertyInfo.lastProperty.end;
  if (lastPropertyInfo.trailingComma) {
    position += 1;
  }
  const toAdd = `${
    !lastPropertyInfo.trailingComma ? ',' : ''
  }\n  occPrefix: '/occ/v2/',`;

  return new InsertChange(path, position, toAdd);
}

function getStorefrontConfig(
  options: SpartacusOptions,
  environmentImportName: string
): string {
  const baseUrlPart = `\n          baseUrl: '${options.baseUrl}',`;
  const contextContent = !options.baseSite
    ? ''
    : `
      context: {
        baseSite: ['${options.baseSite}']
      },`;
  return `{
      backend: {
        occ: {${options.useMetaTags ? '' : baseUrlPart}
          prefix: ${environmentImportName}.occPrefix
        }
      },${contextContent}
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en'
      },
      features: {
        level: '${options.featureLevel || getSpartacusCurrentFeatureLevel()}'
      }
    }`;
}

function getMainAppModulePath(host: Tree, options: SpartacusOptions): string {
  // find app module
  const projectTargets = getProjectTargets(host, options.project);

  if (!projectTargets.build) {
    throw new SchematicsException(`Project target "build" not found.`);
  }

  const mainPath = projectTargets.build.options.main;
  return getAppModulePath(host, mainPath);
}

function updateAppModule(options: SpartacusOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.logger.debug('Updating main module');

    const modulePath = getMainAppModulePath(host, options);
    context.logger.debug(`main module path: ${modulePath}`);
    const moduleSource = getTsSourceFile(host, modulePath);
    if (
      !isImported(moduleSource, B2C_STOREFRONT_MODULE, SPARTACUS_STOREFRONTLIB)
    ) {
      // add imports
      addImport(host, modulePath, 'translations', SPARTACUS_ASSETS);
      addImport(host, modulePath, 'translationChunksConfig', SPARTACUS_ASSETS);
      addImport(
        host,
        modulePath,
        B2C_STOREFRONT_MODULE,
        SPARTACUS_STOREFRONTLIB
      );

      const environmentImportName = getEnvironmentExportName(moduleSource);
      if (!environmentImportName) {
        addImport(
          host,
          modulePath,
          DEFAULT_ENVIRONMENT_NAME,
          '../environments/environment'
        );
      }

      addToModuleImportsAndCommitChanges(
        host,
        modulePath,
        `${B2C_STOREFRONT_MODULE}.withConfig(${getStorefrontConfig(
          options,
          environmentImportName || DEFAULT_ENVIRONMENT_NAME
        )})`
      );
    }

    return host;
  };
}

function installStyles(project: experimental.workspace.WorkspaceProject): Rule {
  return (host: Tree) => {
    const styleFilePath = getProjectStyleFile(project);

    if (!styleFilePath) {
      console.warn(
        red(`Could not find the default style file for this project.`)
      );
      console.warn(red(`Please consider manually setting up spartacus styles`));
      return;
    }

    if (styleFilePath.split('.').pop() !== 'scss') {
      console.warn(
        red(`Could not find the default SCSS style file for this project. `)
      );
      console.warn(
        red(
          `Please make sure your project is configured with SCSS and consider manually setting up spartacus styles.`
        )
      );
      return;
    }

    const buffer = host.read(styleFilePath);

    if (!buffer) {
      console.warn(
        red(
          `Could not read the default style file within the project ` +
            `(${italic(styleFilePath)})`
        )
      );
      console.warn(red(`Please consider manually importing spartacus styles.`));
      return;
    }

    const htmlContent = buffer.toString();
    const insertion = '\n' + `@import '~@spartacus/styles/index';\n`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(styleFilePath);

    recorder.insertLeft(htmlContent.length, insertion);
    host.commitUpdate(recorder);
  };
}

function updateMainComponent(
  project: experimental.workspace.WorkspaceProject,
  options: SpartacusOptions
): Rule {
  return (host: Tree, _context: SchematicContext) => {
    const filePath = project.sourceRoot + '/app/app.component.html';
    const buffer = host.read(filePath);

    if (!buffer) {
      console.warn(red(`Could not read app.component.html file.`));
      return;
    }

    const htmlContent = buffer.toString();
    const insertion = '\n' + `<cx-storefront></cx-storefront>\n`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(filePath);

    if (options && options.overwriteAppComponent) {
      recorder.remove(0, htmlContent.length);
      recorder.insertLeft(0, insertion);
    } else {
      recorder.insertLeft(htmlContent.length, insertion);
    }

    host.commitUpdate(recorder);

    return host;
  };
}

function updateIndexFile(
  project: experimental.workspace.WorkspaceProject,
  options: SpartacusOptions
): Rule {
  return (host: Tree) => {
    const projectIndexHtmlPath = getIndexHtmlPath(project);
    const baseUrl = options.baseUrl || 'OCC_BACKEND_BASE_URL_VALUE';

    const metaTags = [
      `<meta name="occ-backend-base-url" content="${baseUrl}" />`,
      `<meta name="media-backend-base-url" content="MEDIA_BACKEND_BASE_URL_VALUE" />`,
    ];

    metaTags.forEach((metaTag) => {
      appendHtmlElementToHead(host, projectIndexHtmlPath, metaTag);
    });

    return host;
  };
}

export function addSpartacus(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const project = getProjectFromWorkspace(tree, options);

    return chain([
      addPackageJsonDependencies(),
      updateEnvironment(project, options),
      updateAppModule(options),
      installStyles(project),
      updateMainComponent(project, options),
      options.useMetaTags ? updateIndexFile(project, options) : noop(),
      installPackageJsonDependencies(),
    ])(tree, context);
  };
}
