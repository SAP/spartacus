import { chain, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getProjectTargets } from '@schematics/angular/utility/project-targets';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { addSymbolToNgModuleMetadata, insertImport, isImported } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import * as ts from 'typescript';
import { Schema as SpartacusOptions } from './schema';
import { experimental, JsonParseMode, parseJson } from '@angular-devkit/core';
import { appendHtmlElementToHead, getProjectStyleFile, getProjectTargetOptions } from '@angular/cdk/schematics';
import { italic, red } from '@angular-devkit/core/src/terminal';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';

function getWorkspace(
  host: Tree,
): { path: string, workspace: experimental.workspace.WorkspaceSchema } {
  const possibleFiles = [ '/angular.json', '/.angular.json' ];
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
    workspace: parseJson(
      content,
      JsonParseMode.Loose,
    ) as {} as experimental.workspace.WorkspaceSchema,
  };
}


function addPackageJsonDependencies(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        version: '~1.0.0',
        name: '@spartacus/core',
      },
      {
        type: NodeDependencyType.Default,
        version: '~1.0.0',
        name: '@spartacus/storefront',
      },
      {
        type: NodeDependencyType.Default,
        version: '~1.0.0',
        name: '@spartacus/assets',
      },
      {
        type: NodeDependencyType.Default,
        version: '~1.0.0',
        name: '@spartacus/styles',
      },

      {
        type: NodeDependencyType.Default,
        version: '^0.800.0',
        name: '@angular/pwa',
      },
      {
        type: NodeDependencyType.Default,
        version: '^8.0.0',
        name: '@angular/service-worker',
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
        version: '^8.0.0',
        name: '@ngrx/store',
      },
      {
        type: NodeDependencyType.Default,
        version: '^8.0.0',
        name: '@ngrx/effects',
      },
      {
        type: NodeDependencyType.Default,
        version: '^8.0.0',
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
  const baseSite = options.baseSite || 'electronics';
  return `{
      backend: {
        occ: {
          baseUrl: '${baseUrl}',
            prefix: '/rest/v2/',
            legacy: false
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

function updateAppModule(options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.logger.debug('Updating appmodule');

    // find app module
    const projectTargets = getProjectTargets(host, options.project);

    if (!projectTargets.build) {
      throw new SchematicsException(`Project target "build" not found.`);
    }

    const mainPath = projectTargets.build.options.main;
    const modulePath = getAppModulePath(host, mainPath);
    context.logger.debug(`module path: ${modulePath}`);

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

    // const project = getProjectFromWorkspace(workspace, options.project);

    // addModuleImportToRootModule(host, `B2cStorefrontModule.withConfig(${getStorefrontConfig()})`,
    //   '@spartacus/storefront', project);
    // addModuleImportToRootModule(
    //   host,
    //   `ConfigModule.withConfigFactory(defaultCmsContentConfig)`,
    //   '@spartacus/core',
    //   project
    // );

    return host;
  };
}

function installStyles(project: WorkspaceProject): Rule {
  return (host: Tree) => {
    const styleFilePath = getProjectStyleFile(project);

    if (!styleFilePath) {
      console.warn(red(`Could not find the default style file for this project.`));
      console.warn(red(`Please consider manually setting up spartacus styles`));
      return;
    }

    if (styleFilePath.split('.').pop() !== 'scss') {
      console.warn(red(`Could not find the default SCSS style file for this project. `));
      console.warn(red(`Please make sure your project is configured with SCSS and consider manually setting up spartacus styles.`));
      return;
    }

    const buffer = host.read(styleFilePath);

    if (!buffer) {
      console.warn(red(`Could not read the default style file within the project ` +
        `(${italic(styleFilePath)})`));
      console.warn(red(`Please consider manually setting up the Robot font.`));
      return;
    }

    const htmlContent = buffer.toString();
    const insertion = '\n' +
      `@import "~@spartacus/styles/index";\n`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(styleFilePath);

    recorder.insertLeft(htmlContent.length, insertion);
    host.commitUpdate(recorder);
  };
}

function updateMainComponent(): Rule {
  return (host: Tree, _context: SchematicContext) => {

    return host;
  }
}

export function getIndexHtmlPath(project: WorkspaceProject): string {
  const buildOptions = getProjectTargetOptions(project, 'build');

  if (!buildOptions.index) {
    throw new SchematicsException('No project "index.html" file could be found.');
  }

  return buildOptions.index;
}


function updateIndexFile(project: WorkspaceProject): Rule {
  return (host: Tree) => {

    const projectIndexHtmlPath = getIndexHtmlPath(project);

    console.log('updateing file', projectIndexHtmlPath);

    const metaTags = [
      '<meta name="occ-backend-base-url" content="OCC_BACKEND_BASE_URL_VALUE" />',
      '<meta name="media-backend-base-url" content="MEDIA_BACKEND_BASE_URL_VALUE" />',
    ];

    metaTags.forEach(metaTag => {
      appendHtmlElementToHead(host, projectIndexHtmlPath, metaTag);
    });

    return host;



    // const buffer = host.read(path);
    // if (buffer === null) {
    //   throw new SchematicsException(`Could not read index file: ${path}`);
    // }
    //
    // const rewriter = new RewritingStream();

    // let needsNoScript = true;
    // rewriter.on('startTag', (startTag: { tagName: string }) => {
    //   if (startTag.tagName === 'noscript') {
    //     needsNoScript = false;
    //   }
    //
    //   rewriter.emitStartTag(startTag);
    // });
    //
    // rewriter.on('endTag', (endTag: { tagName: string }) => {
    //   if (endTag.tagName === 'head') {
    //     rewriter.emitRaw('  <link rel="manifest" href="manifest.json">\n');
    //     rewriter.emitRaw('  <meta name="theme-color" content="#1976d2">\n');
    //   } else if (endTag.tagName === 'body' && needsNoScript) {
    //     rewriter.emitRaw(
    //       '  <noscript>Please enable JavaScript to continue using this application.</noscript>\n',
    //     );
    //   }
    //
    //   rewriter.emitEndTag(endTag);
    // });

    // return new Observable<Tree>(obs => {
    //   const input = new Readable({
    //     encoding: 'utf8',
    //     read(): void {
    //       this.push(buffer);
    //       this.push(null);
    //     },
    //   });
    //
    //   const chunks: Array<Buffer> = [];
    //   const output = new Writable({
    //     write(chunk: string | Buffer, encoding: string, callback: Function): void {
    //       chunks.push(typeof chunk === 'string' ? Buffer.from(chunk, encoding) : chunk);
    //       callback();
    //     },
    //     final(callback: (error?: Error) => void): void {
    //       const full = Buffer.concat(chunks);
    //       host.overwrite(path, full.toString());
    //       callback();
    //       obs.next(host);
    //       obs.complete();
    //     },
    //   });
    //
    //   input.pipe(rewriter).pipe(output);
    // });
    return host;
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

    // Find all the relevant targets for the project
    // const projectTargets = project.targets || project.architect;
    // if (!projectTargets || Object.keys(projectTargets).length === 0) {
    //   throw new SchematicsException(`Targets are not defined for this project.`);
    // }
    //
    // const buildTargets = [];
    // const testTargets = [];
    // for (const targetName in projectTargets) {
    //   const target = projectTargets[targetName];
    //   if (!target) {
    //     continue;
    //   }
    //
    //   if (target.builder === '@angular-devkit/build-angular:browser') {
    //     buildTargets.push(target);
    //   } else if (target.builder === '@angular-devkit/build-angular:karma') {
    //     testTargets.push(target);
    //   }
    // }
    //
    // // Find all index.html files in build targets
    // const indexFiles = new Set<string>();
    // for (const target of buildTargets) {
    //   if (target.options && target.options.index) {
    //     indexFiles.add(target.options.index);
    //   }
    //
    //   if (!target.configurations) {
    //     continue;
    //   }
    //   for (const configName in target.configurations) {
    //     const configuration = target.configurations[configName];
    //     if (configuration && configuration.index) {
    //       indexFiles.add(configuration.index);
    //     }
    //   }
    // }

    return chain([
      addPackageJsonDependencies(options),
      installPackageJsonDependencies(),
      updateAppModule(options),
      installStyles(project as WorkspaceProject),
      updateMainComponent(),
      updateIndexFile(project as WorkspaceProject),
      // ...[...indexFiles].map(path => updateIndexFile(path)),
    ])(tree, context);

    return tree;
  };
}
