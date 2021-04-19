import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { SourceFile } from 'ts-morph';
import {
  PROVIDE_CONFIG_FUNCTION,
  SPARTACUS_ASSETS,
  SPARTACUS_CONFIGURATION_MODULE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../shared/constants';
import { getB2bConfiguration } from '../shared/utils/config-utils';
import { addModuleProvider } from '../shared/utils/new-module-utils';
import { getSpartacusCurrentFeatureLevel } from '../shared/utils/package-utils';
import { createProgram, saveAndFormat } from '../shared/utils/program';
import { getProjectTsConfigPaths } from '../shared/utils/project-tsconfig-paths';
import { parseCSV } from '../shared/utils/transform-utils';
import { Schema as SpartacusOptions } from './schema';

export function addSpartacusConfiguration(options: SpartacusOptions): Rule {
  return (tree: Tree): Tree => {
    const { buildPaths } = getProjectTsConfigPaths(tree, options.project);

    if (!buildPaths.length) {
      throw new SchematicsException(
        'Could not find any tsconfig file. Cannot configure SpartacusConfigurationModule.'
      );
    }

    const basePath = process.cwd();
    for (const tsconfigPath of buildPaths) {
      addConfiguration(tree, tsconfigPath, basePath, options);
    }
    return tree;
  };
}

function addConfiguration(
  tree: Tree,
  tsconfigPath: string,
  basePath: string,
  options: SpartacusOptions
): void {
  const { appSourceFiles } = createProgram(tree, basePath, tsconfigPath);

  for (const sourceFile of appSourceFiles) {
    if (
      sourceFile
        .getFilePath()
        .includes(`${SPARTACUS_CONFIGURATION_MODULE}.module.ts`)
    ) {
      addCommonConfiguration(sourceFile, options);
      if (options.configuration === 'b2b') {
        getB2bConfiguration().forEach((b2bProvider) =>
          addModuleProvider(sourceFile, b2bProvider)
        );
      }

      saveAndFormat(sourceFile);

      break;
    }
  }
}

function addCommonConfiguration(
  sourceFile: SourceFile,
  options: SpartacusOptions
): void {
  addModuleProvider(sourceFile, {
    import: [
      {
        moduleSpecifier: SPARTACUS_CORE,
        namedImports: [PROVIDE_CONFIG_FUNCTION],
      },
      {
        moduleSpecifier: SPARTACUS_STOREFRONTLIB,
        namedImports: ['layoutConfig'],
      },
    ],
    content: `provideConfig(layoutConfig)`,
  });
  addModuleProvider(sourceFile, {
    import: [
      {
        moduleSpecifier: SPARTACUS_CORE,
        namedImports: [PROVIDE_CONFIG_FUNCTION],
      },
      {
        moduleSpecifier: SPARTACUS_STOREFRONTLIB,
        namedImports: ['mediaConfig'],
      },
    ],
    content: `provideConfig(mediaConfig)`,
  });
  addModuleProvider(sourceFile, {
    import: {
      moduleSpecifier: SPARTACUS_STOREFRONTLIB,
      namedImports: ['defaultCmsContentProviders'],
    },
    content: `...defaultCmsContentProviders`,
  });

  addStorefrontConfig(sourceFile, options);
}

function createSiteContextConfig(options: SpartacusOptions): string {
  const currency = parseCSV(options.currency, ['USD']).toUpperCase();
  const language = parseCSV(options.language, ['en']).toLowerCase();
  let contextConfig = `
      context: {
        currency: [${currency}],
        language: [${language}],`;

  if (options.baseSite) {
    const baseSites = parseCSV(options.baseSite);
    contextConfig += `\nbaseSite: [${baseSites}]`;
  }

  contextConfig += `},`;

  return `provideConfig({${contextConfig}})`;
}

/**
 * Creates and adds a spartacus config based on the provided `options`.
 * @param options
 */
function addStorefrontConfig(
  sourceFile: SourceFile,
  options: SpartacusOptions
): void {
  const backendConfig = createBackendConfiguration(options);
  addModuleProvider(sourceFile, {
    import: [
      {
        moduleSpecifier: SPARTACUS_CORE,
        namedImports: [PROVIDE_CONFIG_FUNCTION],
      },
    ],
    content: backendConfig,
  });

  const siteContextConfig = createSiteContextConfig(options);
  addModuleProvider(sourceFile, {
    import: [
      {
        moduleSpecifier: SPARTACUS_CORE,
        namedImports: [PROVIDE_CONFIG_FUNCTION],
      },
    ],
    content: siteContextConfig,
  });

  const i18nConfig = createI18NConfiguration();
  addModuleProvider(sourceFile, {
    import: [
      {
        moduleSpecifier: SPARTACUS_CORE,
        namedImports: [PROVIDE_CONFIG_FUNCTION],
      },
      {
        moduleSpecifier: SPARTACUS_ASSETS,
        namedImports: ['translations'],
      },
      {
        moduleSpecifier: SPARTACUS_ASSETS,
        namedImports: ['translationChunksConfig'],
      },
    ],
    content: i18nConfig,
  });

  const featureLevelConfig = createFeatureLevelConfiguration(options);
  addModuleProvider(sourceFile, {
    import: [
      {
        moduleSpecifier: SPARTACUS_CORE,
        namedImports: [PROVIDE_CONFIG_FUNCTION],
      },
    ],
    content: featureLevelConfig,
  });
}

function createBackendConfiguration(options: SpartacusOptions): string {
  const baseUrlPart = `\n          baseUrl: '${options.baseUrl}',`;
  const occPrefixPart = options.occPrefix
    ? `prefix: '${options.occPrefix}'`
    : '';
  return `provideConfig({
    backend: {
      occ: {${options.useMetaTags ? '' : baseUrlPart}${occPrefixPart}
      }
    },
  })`;
}

function createI18NConfiguration(): string {
  return `provideConfig({
  i18n: {
    resources: translations,
    chunks: translationChunksConfig,
    fallbackLang: 'en'
  },
})`;
}

function createFeatureLevelConfiguration(options: SpartacusOptions): string {
  const featureLevelConfig = `
  features: {
    level: '${options.featureLevel || getSpartacusCurrentFeatureLevel()}'
  }`;
  return `provideConfig({${featureLevelConfig}})`;
}
