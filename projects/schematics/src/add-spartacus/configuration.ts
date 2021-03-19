import { Rule, SchematicsException, Tree } from '@angular-devkit/schematics';
import { SourceFile } from 'ts-morph';
import {
  PROVIDE_CONFIG_FUNCTION,
  SPARTACUS_ASSETS,
  SPARTACUS_CONFIGURATION_MODULE,
  SPARTACUS_CORE,
  SPARTACUS_SETUP,
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
      if (options.configuration === 'b2c') {
        addB2cConfiguration(sourceFile, options);
      } else {
        addB2bConfiguration(sourceFile, options);
      }

      saveAndFormat(sourceFile);

      break;
    }
  }
}

function addB2cConfiguration(
  sourceFile: SourceFile,
  options: SpartacusOptions
): void {
  addCommonConfiguration(sourceFile, options);
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

  const config = createStorefrontConfig(options);
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
    content: `provideConfig(${config})`,
  });
}

function addB2bConfiguration(
  sourceFile: SourceFile,
  options: SpartacusOptions
): void {
  addCommonConfiguration(sourceFile, options);

  addModuleProvider(sourceFile, {
    import: [
      {
        moduleSpecifier: SPARTACUS_CORE,
        namedImports: [PROVIDE_CONFIG_FUNCTION],
      },
      {
        moduleSpecifier: SPARTACUS_SETUP,
        namedImports: ['defaultB2bOccConfig'],
      },
    ],
    content: `provideConfig(defaultB2bOccConfig)`,
  });
  addModuleProvider(sourceFile, {
    import: [
      {
        moduleSpecifier: SPARTACUS_CORE,
        namedImports: [PROVIDE_CONFIG_FUNCTION],
      },
      {
        moduleSpecifier: SPARTACUS_SETUP,
        namedImports: ['defaultB2bCheckoutConfig'],
      },
    ],
    content: `provideConfig(defaultB2bCheckoutConfig)`,
  });
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
    context += `\nbaseSite: [${baseSites}]`;
  }

  context += `},`;

  return context;
}

/**
 * Creates a spartacus config based on the provided `options`.
 * @param options
 */
function createStorefrontConfig(options: SpartacusOptions): string {
  const baseUrlPart = `\n          baseUrl: '${options.baseUrl}',`;
  const context = prepareSiteContextConfig(options);

  const occPrefixPart = options.occPrefix
    ? `prefix: '${options.occPrefix}'`
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
