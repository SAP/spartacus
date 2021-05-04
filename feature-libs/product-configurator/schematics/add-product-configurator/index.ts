import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  addPackageJsonDependenciesForLibrary,
  CLI_PRODUCT_CONFIGURATOR_FEATURE,
  configureB2bFeatures,
  LibraryOptions as SpartacusProductConfiguratorOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_PRODUCT_CONFIGURATOR,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  CLI_CPQ_FEATURE,
  CLI_TEXTFIELD_FEATURE,
  PRODUCT_CONFIGURATOR_FOLDER_NAME,
  PRODUCT_CONFIGURATOR_RULEBASED_CPQ_MODULE,
  PRODUCT_CONFIGURATOR_RULEBASED_CPQ_ROOT_MODULE,
  PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_NAME_CONSTANT,
  PRODUCT_CONFIGURATOR_RULEBASED_MODULE,
  PRODUCT_CONFIGURATOR_RULEBASED_ROOT_MODULE,
  PRODUCT_CONFIGURATOR_SCSS_FILE_NAME,
  PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME_CONSTANT,
  PRODUCT_CONFIGURATOR_TEXTFIELD_MODULE,
  PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT_MODULE,
  PRODUCT_CONFIGURATOR_TRANSLATIONS,
  PRODUCT_CONFIGURATOR_TRANSLATION_CHUNKS_CONFIG,
  SPARTACUS_PRODUCT_CONFIGURATOR_ASSETS,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_CPQ,
  SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT,
  SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD,
  SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT,
} from '../constants';

export function addProductConfiguratorFeatures(
  options: SpartacusProductConfiguratorOptions
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addProductConfiguratorRulebasedFeature(options),

      shouldAddFeature(CLI_CPQ_FEATURE, options.features)
        ? addCpqRulebasedRootModule(options)
        : noop(),

      shouldAddFeature(CLI_CPQ_FEATURE, options.features)
        ? configureB2bFeatures(options, packageJson)
        : noop(),

      shouldAddFeature(CLI_TEXTFIELD_FEATURE, options.features)
        ? addProductConfiguratorTextfieldFeature(options)
        : noop(),

      addPackageJsonDependenciesForLibrary({
        packageJson,
        context,
        libraryPeerDependencies: peerDependencies,
        options,
      }),
    ]);
  };
}

/**
 * Called with or without CPQ enabled, and uses a different
 * application module for CPQ
 * @param options Schematics options
 * @returns
 */
function addProductConfiguratorRulebasedFeature(
  options: SpartacusProductConfiguratorOptions
): Rule {
  let moduleName: string;
  let moduleImportPath: string;

  if (shouldAddFeature(CLI_CPQ_FEATURE, options.features)) {
    moduleName = PRODUCT_CONFIGURATOR_RULEBASED_CPQ_MODULE;
    moduleImportPath = SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_CPQ;
  } else {
    moduleName = PRODUCT_CONFIGURATOR_RULEBASED_MODULE;
    moduleImportPath = SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED;
  }

  return addLibraryFeature(options, {
    folderName: PRODUCT_CONFIGURATOR_FOLDER_NAME,
    moduleName: CLI_PRODUCT_CONFIGURATOR_FEATURE,
    featureModule: {
      name: moduleName,
      importPath: moduleImportPath,
    },
    rootModule: {
      name: PRODUCT_CONFIGURATOR_RULEBASED_ROOT_MODULE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT,
      namedImports: [PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: PRODUCT_CONFIGURATOR_TRANSLATIONS,
      chunks: PRODUCT_CONFIGURATOR_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_ASSETS,
    },
    styles: {
      scssFileName: PRODUCT_CONFIGURATOR_SCSS_FILE_NAME,
      importStyle: SPARTACUS_PRODUCT_CONFIGURATOR,
    },
  });
}
/**
 * Needed to set the CPQ specific root module that
 * enforces early login and must not be active for
 * other configurators
 * @param options Schematics options
 * @returns
 */
function addCpqRulebasedRootModule(
  options: SpartacusProductConfiguratorOptions
): Rule {
  return addLibraryFeature(options, {
    folderName: PRODUCT_CONFIGURATOR_FOLDER_NAME,
    moduleName: CLI_PRODUCT_CONFIGURATOR_FEATURE,
    featureModule: {
      name: PRODUCT_CONFIGURATOR_RULEBASED_CPQ_MODULE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_CPQ,
    },
    rootModule: {
      name: PRODUCT_CONFIGURATOR_RULEBASED_CPQ_ROOT_MODULE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED_ROOT,
      namedImports: [PRODUCT_CONFIGURATOR_RULEBASED_FEATURE_NAME_CONSTANT],
    },
  });
}

function addProductConfiguratorTextfieldFeature(
  options: SpartacusProductConfiguratorOptions
): Rule {
  return addLibraryFeature(options, {
    folderName: PRODUCT_CONFIGURATOR_FOLDER_NAME,
    moduleName: CLI_PRODUCT_CONFIGURATOR_FEATURE,
    featureModule: {
      name: PRODUCT_CONFIGURATOR_TEXTFIELD_MODULE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD,
    },
    rootModule: {
      name: PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT_MODULE,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT,
      namedImports: [PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: PRODUCT_CONFIGURATOR_TRANSLATIONS,
      chunks: PRODUCT_CONFIGURATOR_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_PRODUCT_CONFIGURATOR_ASSETS,
    },
    styles: {
      scssFileName: PRODUCT_CONFIGURATOR_SCSS_FILE_NAME,
      importStyle: SPARTACUS_PRODUCT_CONFIGURATOR,
    },
  });
}
