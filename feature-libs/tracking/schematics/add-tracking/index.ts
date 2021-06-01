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
  CLI_TRACKING_PERSONALIZATION_FEATURE,
  CLI_TRACKING_TMS_AEP_FEATURE,
  CLI_TRACKING_TMS_GTM_FEATURE,
  LibraryOptions as SpartacusTrackingOptions,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  PERSONALIZATION_FEATURE_NAME_CONSTANT,
  PERSONALIZATION_MODULE,
  PERSONALIZATION_MODULE_NAME,
  PERSONALIZATION_ROOT_MODULE,
  SPARTACUS_PERSONALIZATION,
  SPARTACUS_PERSONALIZATION_ROOT,
  SPARTACUS_TMS_AEP,
  SPARTACUS_TMS_CORE,
  SPARTACUS_TMS_GTM,
  TMS_AEP_MODULE,
  TMS_BASE_MODULE,
  TMS_CONFIG,
  TMS_GTM_MODULE,
  TMS_MODULE_NAME,
  TRACKING_FOLDER_NAME,
} from '../constants';

export function addTrackingFeatures(options: SpartacusTrackingOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_TRACKING_TMS_GTM_FEATURE, options.features)
        ? addGtm(options)
        : noop(),

      shouldAddFeature(CLI_TRACKING_TMS_AEP_FEATURE, options.features)
        ? addAep(options)
        : noop(),

      shouldAddFeature(CLI_TRACKING_PERSONALIZATION_FEATURE, options.features)
        ? addPersonalizationFeature(options)
        : noop(),
    ]);
  };
}

function addGtm(options: SpartacusTrackingOptions): Rule {
  return addLibraryFeature(
    { ...options, lazy: false }, // To add feature module in imports (not lazy)
    {
      folderName: TRACKING_FOLDER_NAME,
      moduleName: TMS_MODULE_NAME,
      rootModule: {
        importPath: SPARTACUS_TMS_CORE,
        name: TMS_BASE_MODULE,
        content: `${TMS_BASE_MODULE}.forRoot()`,
      },
      featureModule: {
        importPath: SPARTACUS_TMS_GTM,
        name: TMS_GTM_MODULE,
      },
      customConfig: {
        import: [
          {
            moduleSpecifier: SPARTACUS_TMS_GTM,
            namedImports: [TMS_GTM_MODULE],
          },
          { moduleSpecifier: SPARTACUS_TMS_CORE, namedImports: [TMS_CONFIG] },
        ],
        content: `<${TMS_CONFIG}>{
          tagManager: {
            gtm: {
              events: [],
            },
          },
        }`,
      },
    }
  );
}

function addAep(options: SpartacusTrackingOptions): Rule {
  return addLibraryFeature(
    { ...options, lazy: false }, // To add feature module in imports (not lazy)
    {
      folderName: TRACKING_FOLDER_NAME,
      moduleName: TMS_MODULE_NAME,
      rootModule: {
        importPath: SPARTACUS_TMS_CORE,
        name: TMS_BASE_MODULE,
        content: `${TMS_BASE_MODULE}.forRoot()`,
      },
      featureModule: {
        importPath: SPARTACUS_TMS_AEP,
        name: TMS_AEP_MODULE,
      },
      customConfig: {
        import: [
          {
            moduleSpecifier: SPARTACUS_TMS_AEP,
            namedImports: [TMS_AEP_MODULE],
          },
          { moduleSpecifier: SPARTACUS_TMS_CORE, namedImports: [TMS_CONFIG] },
        ],
        content: `<${TMS_CONFIG}>{
          tagManager: {
            aep: {
              events: [],
            },
          },
        }`,
      },
    }
  );
}

function addPersonalizationFeature(options: SpartacusTrackingOptions): Rule {
  return addLibraryFeature(options, {
    folderName: TRACKING_FOLDER_NAME,
    moduleName: PERSONALIZATION_MODULE_NAME,
    featureModule: {
      name: PERSONALIZATION_MODULE,
      importPath: SPARTACUS_PERSONALIZATION,
    },
    rootModule: {
      name: PERSONALIZATION_ROOT_MODULE,
      importPath: SPARTACUS_PERSONALIZATION_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_PERSONALIZATION_ROOT,
      namedImports: [PERSONALIZATION_FEATURE_NAME_CONSTANT],
    },
  });
}
