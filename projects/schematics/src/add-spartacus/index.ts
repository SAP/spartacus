import { experimental, JsonParseMode, parseJson } from '@angular-devkit/core';
import { italic, red } from '@angular-devkit/core/src/terminal';
import {
  chain,
  ExecutionOptions,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { branch } from '@angular-devkit/schematics/src/tree/static';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  appendHtmlElementToHead,
  getProjectStyleFile,
  getProjectTargetOptions,
} from '@angular/cdk/schematics';
import {
  addSymbolToNgModuleMetadata,
  insertImport,
  isImported,
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { getProjectTargets } from '@schematics/angular/utility/project-targets';
import { of } from 'rxjs';
import * as ts from 'typescript';
import { Schema as SpartacusOptions } from './schema';

function getWorkspace(
  host: Tree
): { path: string; workspace: experimental.workspace.WorkspaceSchema } {
  const possibleFiles = ['/angular.json', '/.angular.json'];
  const path = possibleFiles.filter(filePath => host.exists(filePath))[0];

  if (!path) {
    throw new SchematicsException(`Could not find Angular`);
  }

  const configBuffer = host.read(path);
  if (configBuffer === null) {
    throw new SchematicsException(`Could not find (${path})`);
  }
  const content = configBuffer.toString();

  return {
    path,
    workspace: (parseJson(
      content,
      JsonParseMode.Loose
    ) as {}) as experimental.workspace.WorkspaceSchema,
  };
}

const defaultAppComponentTemplate = `<!--The content below is only a placeholder and can be replaced.-->
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
</div>
<h2>Here are some links to help you start: </h2>
<ul>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
  </li>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://angular.io/cli">CLI Documentation</a></h2>
  </li>
  <li>
    <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
  </li>
</ul>

`;

function addPackageJsonDependencies(): Rule {
  const spartacusVersion = '~1.0.0';
  const ngrxVersion = '^8.0.0';

  return (tree: Tree, context: SchematicContext) => {
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

function getTsSourceFile(host: Tree, path: string): ts.SourceFile {
  const buffer = host.read(path);
  if (!buffer) {
    throw new SchematicsException(`Could not read file (${path}).`);
  }
  const content = buffer.toString();
  const source = ts.createSourceFile(
    path,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  return source;
}

function addImport(
  host: Tree,
  modulePath: string,
  importText: string,
  importPath: string
) {
  const moduleSource = getTsSourceFile(host, modulePath) as any;
  if (!isImported(moduleSource, importText, importPath)) {
    const change = insertImport(
      moduleSource,
      modulePath,
      importText,
      importPath
    );
    if (change) {
      const recorder = host.beginUpdate(modulePath);
      recorder.insertLeft(
        (change as InsertChange).pos,
        (change as InsertChange).toAdd
      );
      host.commitUpdate(recorder);
    }
  }
}

function importModule(host: Tree, modulePath: string, importText: string) {
  const moduleSource = getTsSourceFile(host, modulePath);
  const metadataChanges = addSymbolToNgModuleMetadata(
    moduleSource,
    modulePath,
    'imports',
    importText
  );
  if (metadataChanges) {
    const recorder = host.beginUpdate(modulePath);
    metadataChanges.forEach((change: InsertChange) => {
      recorder.insertRight(change.pos, change.toAdd);
    });
    host.commitUpdate(recorder);
  }
}

function getStorefrontConfig(options: SpartacusOptions): string {
  const baseUrl = options.baseUrl || 'https://localhost:9002';
  const baseUrlPart = `
          baseUrl: '${baseUrl}',`;
  const baseSite = options.baseSite || 'electronics';
  return `{
      backend: {
        occ: {${options.useMetaTags ? '' : baseUrlPart}
          prefix: '/rest/v2/'
        }
      },
      authentication: {
        client_id: 'mobile_android',
        client_secret: 'secret'
      },
      context: {
        baseSite: ['${baseSite}']
      },
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en'
      }
    }`;
}

function getLineFromTSFile(
  host: Tree,
  modulePath: string,
  position: number
): [number, number] {
  const tsFile = getTsSourceFile(host, modulePath);

  const lac = tsFile.getLineAndCharacterOfPosition(position);
  const lineStart = tsFile.getPositionOfLineAndCharacter(lac.line, 0);
  const nextLineStart = tsFile.getPositionOfLineAndCharacter(lac.line + 1, 0);

  return [lineStart, nextLineStart - lineStart];
}

function removeServiceWorkerSetup(host: Tree, modulePath: string) {
  const buffer = host.read(modulePath);

  if (!buffer) {
    return;
  }

  let fileContent = buffer.toString();

  const serviceWorkerImport = `import { ServiceWorkerModule } from '@angular/service-worker';`;
  const serviceWorkerModuleImport = `ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })`;
  if (!fileContent.includes(serviceWorkerModuleImport)) {
    return;
  }
  if (!fileContent.includes(serviceWorkerImport)) {
    return;
  }

  const recorder = host.beginUpdate(modulePath);

  recorder.remove(
    ...getLineFromTSFile(
      host,
      modulePath,
      fileContent.indexOf(serviceWorkerImport)
    )
  );

  recorder.remove(
    ...getLineFromTSFile(
      host,
      modulePath,
      fileContent.indexOf(serviceWorkerModuleImport)
    )
  );

  host.commitUpdate(recorder);

  // clean up environment import
  fileContent = (host.read(modulePath) || {}).toString();

  const environmentImport = `import { environment } from '../environments/environment';`;
  if (fileContent.includes(environmentImport)) {
    const importPos =
      fileContent.indexOf(environmentImport) + environmentImport.length;

    // check if it's not needed
    if (
      !fileContent.includes('environment', importPos + environmentImport.length)
    ) {
      const envRecorder = host.beginUpdate(modulePath);
      envRecorder.remove(...getLineFromTSFile(host, modulePath, importPos));
      host.commitUpdate(envRecorder);
    }
  }
}

function updateAppModule(options: any): Rule {
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
    addImport(
      host,
      modulePath,
      'defaultCmsContentConfig',
      '@spartacus/storefront'
    );
    addImport(host, modulePath, 'ConfigModule', '@spartacus/core');

    importModule(
      host,
      modulePath,
      `B2cStorefrontModule.withConfig(${getStorefrontConfig(options)})`
    );
    importModule(
      host,
      modulePath,
      `ConfigModule.withConfigFactory(defaultCmsContentConfig)`
    );

    removeServiceWorkerSetup(host, modulePath);

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
  project: experimental.workspace.WorkspaceProject
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

    const newLineRegEx = /(?:\\[rn]|[\r\n]+)+/g;
    if (
      htmlContent.replace(newLineRegEx, '') ===
      defaultAppComponentTemplate.replace(newLineRegEx, '')
    ) {
      recorder.remove(0, htmlContent.length);
      recorder.insertLeft(0, insertion);
    } else {
      recorder.insertLeft(htmlContent.length, insertion);
    }

    host.commitUpdate(recorder);

    return host;
  };
}

export function getIndexHtmlPath(
  project: experimental.workspace.WorkspaceProject
): string {
  const buildOptions = getProjectTargetOptions(project, 'build');

  if (!buildOptions.index) {
    throw new SchematicsException('"index.html" file not found.');
  }

  return buildOptions.index;
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

/**
 * We have to use our custom function because pwa schematics is currently private
 * so it's not possible to reuse it via standard externalSchematics
 */
function privateExternalSchematic<OptionT extends object>(
  collectionName: string,
  schematicName: string,
  options: OptionT,
  executionOptions?: Partial<ExecutionOptions>
): Rule {
  return (input: Tree, context: SchematicContext) => {
    const collection = context.engine.createCollection(collectionName);
    const schematic = collection.createSchematic(schematicName, true);
    return schematic.call(
      options,
      of(branch(input)),
      context,
      executionOptions
    );
  };
}

export function addSpartacus(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const { workspace } = getWorkspace(tree);

    if (!options.project) {
      throw new SchematicsException('Option "project" is required.');
    }

    const project = workspace.projects[options.project];
    if (!project) {
      throw new SchematicsException(
        `Project is not defined in this workspace.`
      );
    }

    if (project.projectType !== 'application') {
      throw new SchematicsException(
        `Spartacus requires a project type of "application".`
      );
    }

    return chain([
      addPackageJsonDependencies(),
      privateExternalSchematic('@angular/pwa', 'ng-add', {
        project: options.project,
      }),
      updateAppModule(options),
      installStyles(project),
      updateMainComponent(project),
      options.useMetaTags ? updateIndexFile(project, options) : noop(),
      installPackageJsonDependencies(),
    ])(tree, context);
  };
}
