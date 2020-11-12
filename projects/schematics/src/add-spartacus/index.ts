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
import { isImported } from '@schematics/angular/utility/ast-utils';
import {
  addPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import {
  ANGULAR_LOCALIZE,
  B2C_STOREFRONT_MODULE,
  DEFAULT_NGRX_VERSION,
  PROVIDE_CONFIG_FUNCTION,
  SPARTACUS_ASSETS,
  SPARTACUS_CONFIGURATION_FILE_NAME,
  SPARTACUS_CONFIGURATION_FILE_PATH,
  SPARTACUS_CONFIGURATION_NAME,
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
  addToModuleImports,
  addToModuleProviders,
} from '../shared/utils/module-file-utils';
import {
  getAngularVersion,
  getSpartacusCurrentFeatureLevel,
  getSpartacusSchematicsVersion,
} from '../shared/utils/package-utils';
import { parseCSV } from '../shared/utils/transform-utils';
import {
  getProjectFromWorkspace,
  getProjectTargets,
} from '../shared/utils/workspace-utils';
import { Schema as SpartacusOptions } from './schema';

function addPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
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
        version: '^7.0.0',
        name: '@ng-bootstrap/ng-bootstrap',
      },
      {
        type: NodeDependencyType.Default,
        version: '^4.0.0',
        name: '@ng-select/ng-select',
      },

      {
        type: NodeDependencyType.Default,
        version: DEFAULT_NGRX_VERSION,
        name: '@ngrx/store',
      },
      {
        type: NodeDependencyType.Default,
        version: DEFAULT_NGRX_VERSION,
        name: '@ngrx/effects',
      },
      {
        type: NodeDependencyType.Default,
        version: DEFAULT_NGRX_VERSION,
        name: '@ngrx/router-store',
      },

      {
        type: NodeDependencyType.Default,
        version: '4.2.1',
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
      {
        type: NodeDependencyType.Default,
        version: '^10.0.0',
        name: 'angular-oauth2-oidc',
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

function prepareSiteContextConfig(options: SpartacusOptions): string {
  const currency = parseCSV(options.currency, ['USD']).toUpperCase();
  const language = parseCSV(options.language, ['en']).toLowerCase();
  let context = `
  context: {
    currency: [${currency}],
    language: [${language}],`;

  if (options.baseSite) {
    const baseSites = parseCSV(options.baseSite);
    context += `
    baseSite: [${baseSites}]`;
  }
  context += `
  },`;

  return context;
}

/**
 * Creates a spartacus config based on the provided `options`.
 * @param options
 */
function createStorefrontConfig(options: SpartacusOptions): string {
  const baseUrlPart = `\n      baseUrl: '${options.baseUrl}'`;
  const context = prepareSiteContextConfig(options);

  const occPrefixPart = options.occPrefix
    ? `,
      prefix: '${options.occPrefix}'`
    : '';

  return `{
  backend: {
    occ: {${options.useMetaTags ? '' : baseUrlPart}${occPrefixPart}
    }
  },${context}
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

function createConfiguration(options: SpartacusOptions): Rule {
  return (host: Tree, _context: SchematicContext) => {
    const configurationFile = `import { translationChunksConfig, translations } from '@spartacus/assets';
import { StorefrontConfig } from '@spartacus/storefront';
          
export const ${SPARTACUS_CONFIGURATION_NAME}: StorefrontConfig = ${createStorefrontConfig(
      options
    )};
`;
    host.create(SPARTACUS_CONFIGURATION_FILE_PATH, configurationFile);
  };
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
    const moduleSource = getTsSourceFile(host, modulePath);
    if (
      !isImported(moduleSource, B2C_STOREFRONT_MODULE, SPARTACUS_STOREFRONTLIB)
    ) {
      // add imports
      addImport(
        host,
        modulePath,
        B2C_STOREFRONT_MODULE,
        SPARTACUS_STOREFRONTLIB
      );
      addImport(host, modulePath, PROVIDE_CONFIG_FUNCTION, SPARTACUS_CORE);
      addImport(
        host,
        modulePath,
        SPARTACUS_CONFIGURATION_NAME,
        `./${SPARTACUS_CONFIGURATION_FILE_NAME}`
      );

      const moduleImportedChange = addToModuleImports(
        host,
        modulePath,
        `${B2C_STOREFRONT_MODULE}`
      );
      const configurationProvidedChange = addToModuleProviders(
        host,
        modulePath,
        `provideConfig(${SPARTACUS_CONFIGURATION_NAME})`
      );

      commitChanges(host, modulePath, [
        ...moduleImportedChange,
        ...configurationProvidedChange,
      ]);
    }

    return host;
  };
}

function installStyles(
  project: experimental.workspace.WorkspaceProject,
  options: SpartacusOptions
): Rule {
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
    const insertion =
      '\n' +
      `$styleVersion: ${
        options.featureLevel || getSpartacusCurrentFeatureLevel()
      };\n@import '~@spartacus/styles/index';\n`;

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
    const insertion = `<cx-storefront></cx-storefront>\n`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(filePath);

    if (options && options.overwriteAppComponent) {
      recorder.remove(0, htmlContent.length);
      recorder.insertLeft(0, insertion);
    } else {
      recorder.insertLeft(htmlContent.length, `\n${insertion}`);
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
      createConfiguration(options),
      updateAppModule(options),
      installStyles(project, options),
      updateMainComponent(project, options),
      options.useMetaTags ? updateIndexFile(project, options) : noop(),
      installPackageJsonDependencies(),
    ])(tree, context);
  };
}
