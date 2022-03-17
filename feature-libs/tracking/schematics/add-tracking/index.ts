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
  TRACKING_AEP_SCHEMATICS_CONFIG,
  TRACKING_GTM_SCHEMATICS_CONFIG,
  TRACKING_PERSONALIZATION_SCHEMATICS_CONFIG,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

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
    // Just import the feature module
    { ...options, lazy: false },
    TRACKING_GTM_SCHEMATICS_CONFIG
  );
}

function addAep(options: SpartacusTrackingOptions): Rule {
  return addLibraryFeature(
    // Just import the feature module
    { ...options, lazy: false },
    TRACKING_AEP_SCHEMATICS_CONFIG
  );
}

function addPersonalizationFeature(options: SpartacusTrackingOptions): Rule {
  return addLibraryFeature(options, TRACKING_PERSONALIZATION_SCHEMATICS_CONFIG);
}
