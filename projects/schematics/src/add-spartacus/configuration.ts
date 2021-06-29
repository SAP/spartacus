import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { SourceFile } from 'ts-morph';
import {
  FEATURES_CONFIG,
  I18N_CONFIG,
  OCC_CONFIG,
  PROVIDE_CONFIG_FUNCTION,
  SITE_CONTEXT_CONFIG,
  SPARTACUS_ASSETS,
  SPARTACUS_CONFIGURATION_MODULE,
  SPARTACUS_CORE,
  SPARTACUS_STOREFRONTLIB,
} from '../shared/constants';
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
    contextConfig += `\nbaseSite: [${baseSites}],`;
  }

  if (options.urlParameters) {
    const urlParameters = parseCSV(options.urlParameters);
    contextConfig += `\nurlParameters: [${urlParameters}]`;
  }

  contextConfig += `},`;

  return `provideConfig(<${SITE_CONTEXT_CONFIG}>{${contextConfig}})`;
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
        namedImports: [PROVIDE_CONFIG_FUNCTION, OCC_CONFIG],
      },
    ],
    content: backendConfig,
  });

  const siteContextConfig = createSiteContextConfig(options);
  addModuleProvider(sourceFile, {
    import: [
      {
        moduleSpecifier: SPARTACUS_CORE,
        namedImports: [PROVIDE_CONFIG_FUNCTION, SITE_CONTEXT_CONFIG],
      },
    ],
    content: siteContextConfig,
  });

  const i18nConfig = createI18NConfiguration();
  addModuleProvider(sourceFile, {
    import: [
      {
        moduleSpecifier: SPARTACUS_CORE,
        namedImports: [PROVIDE_CONFIG_FUNCTION, I18N_CONFIG],
      },
      {
        moduleSpecifier: SPARTACUS_ASSETS,
        namedImports: ['translations', 'translationChunksConfig'],
      },
    ],
    content: i18nConfig,
  });

  const featureLevelConfig = createFeatureLevelConfiguration(options);
  addModuleProvider(sourceFile, {
    import: [
      {
        moduleSpecifier: SPARTACUS_CORE,
        namedImports: [PROVIDE_CONFIG_FUNCTION, FEATURES_CONFIG],
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
  return `provideConfig(<${OCC_CONFIG}>{
    backend: {
      occ: {${options.useMetaTags ? '' : baseUrlPart}${occPrefixPart}
      }
    },
  })`;
}

function createI18NConfiguration(): string {
  return `provideConfig(<${I18N_CONFIG}>{
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
  return `provideConfig(<${FEATURES_CONFIG}>{${featureLevelConfig}})`;
}
