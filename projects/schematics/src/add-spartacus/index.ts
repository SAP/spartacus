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
  getProjectStyleFile,
} from '@angular/cdk/schematics';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { getProjectTargets } from '@schematics/angular/utility/project-targets';
import { Schema as SpartacusOptions } from './schema';
import { addImport, importModule } from '../shared/utils/module-file-utils';
import { getIndexHtmlPath } from '../shared/utils/file-utils';
import { getProjectFromWorkspace } from '../shared/utils/workspace-utils';
import { getAngularVersion } from '../shared/utils/package-utils';

function addPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const spartacusVersion = '^1.1.0';
    const ngrxVersion = '^8.3.0';
    const angularVersion = getAngularVersion(tree);

    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: spartacusVersion,
        name: '@spartacus/core',
      },
      {
        type: NodeDependencyType.Default,
        version: spartacusVersion,
        name: '@spartacus/storefront',
      },
      {
        type: NodeDependencyType.Default,
        version: spartacusVersion,
        name: '@spartacus/assets',
      },
      {
        type: NodeDependencyType.Default,
        version: spartacusVersion,
        name: '@spartacus/styles',
      },

      {
        type: NodeDependencyType.Default,
        version: '^4.1.0',
        name: '@ng-bootstrap/ng-bootstrap',
      },
      {
        type: NodeDependencyType.Default,
        version: '^2.13.2',
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
      { type: NodeDependencyType.Default, version: '^15.0.6', name: 'i18next' },
      {
        type: NodeDependencyType.Default,
        version: '^2.0.1',
        name: 'i18next-xhr-backend',
      },
      {
        type: NodeDependencyType.Default,
        version: angularVersion || '~8.2.5',
        name: '@angular/service-worker',
      },
      {
        type: NodeDependencyType.Default,
        version: '^8.0.0',
        name: 'ngx-infinite-scroll',
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

function getStorefrontConfig(options: SpartacusOptions): string {
  const baseUrlPart = `baseUrl: '${options.baseUrl}',`;
  return `{
      backend: {
        occ: {${options.useMetaTags ? '' : baseUrlPart}
          prefix: '/rest/v2/'
        }
      },
      context: {
        baseSite: ['${options.baseSite}']
      },
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en'
      },
      features: {
        level: '${options.featureLevel}'
      }
    }`;
}

function updateAppModule(options: SpartacusOptions): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.logger.debug('Updating main module');

    // find app module
    const projectTargets = getProjectTargets(host, options.project);

    if (!projectTargets.build) {
      throw new SchematicsException(`Project target "build" not found.`);
    }

    const mainPath = projectTargets.build.options.main;
    const modulePath = getAppModulePath(host, mainPath);
    context.logger.debug(`main module path: ${modulePath}`);

    // add imports
    addImport(host, modulePath, 'translations', '@spartacus/assets');
    addImport(host, modulePath, 'translationChunksConfig', '@spartacus/assets');
    addImport(host, modulePath, 'B2cStorefrontModule', '@spartacus/storefront');

    importModule(
      host,
      modulePath,
      `B2cStorefrontModule.withConfig(${getStorefrontConfig(options)})`
    );

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

    metaTags.forEach(metaTag => {
      appendHtmlElementToHead(host, projectIndexHtmlPath, metaTag);
    });

    return host;
  };
}

export function addSpartacus(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const possibleProjectFiles = ['/angular.json', '/.angular.json'];
    const project = getProjectFromWorkspace(
      tree,
      options,
      possibleProjectFiles
    );

    return chain([
      addPackageJsonDependencies(),
      updateAppModule(options),
      installStyles(project),
      updateMainComponent(project, options),
      options.useMetaTags ? updateIndexFile(project, options) : noop(),
      installPackageJsonDependencies(),
    ])(tree, context);
  };
}
