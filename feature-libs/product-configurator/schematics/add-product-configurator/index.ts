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
  CLI_PRODUCT_CONFIGURATOR_CPQ_FEATURE,
  CLI_PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE,
  CLI_PRODUCT_CONFIGURATOR_VC_FEATURE,
  configureB2bFeatures,
  LibraryOptions as SpartacusProductConfiguratorOptions,
  PRODUCT_CONFIGURATOR_CPQ_SCHEMATICS_CONFIG,
  PRODUCT_CONFIGURATOR_RULEBASED_CPQ_SCHEMATICS_CONFIG,
  PRODUCT_CONFIGURATOR_RULEBASED_SCHEMATICS_CONFIG,
  PRODUCT_CONFIGURATOR_TEXTFIELD_SCHEMATICS_CONFIG,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addProductConfiguratorFeatures(
  options: SpartacusProductConfiguratorOptions
): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_PRODUCT_CONFIGURATOR_VC_FEATURE, options.features) ||
      shouldAddFeature(CLI_PRODUCT_CONFIGURATOR_CPQ_FEATURE, options.features)
        ? addProductConfiguratorRulebasedFeature(options)
        : noop(),

      shouldAddFeature(CLI_PRODUCT_CONFIGURATOR_CPQ_FEATURE, options.features)
        ? chain([
            addCpqRulebasedRootModule(options),
            configureB2bFeatures(options, packageJson),
          ])
        : noop(),

      shouldAddFeature(
        CLI_PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE,
        options.features
      )
        ? addProductConfiguratorTextfieldFeature(options)
        : noop(),
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
  const config = shouldAddFeature(
    CLI_PRODUCT_CONFIGURATOR_CPQ_FEATURE,
    options.features
  )
    ? PRODUCT_CONFIGURATOR_RULEBASED_CPQ_SCHEMATICS_CONFIG
    : PRODUCT_CONFIGURATOR_RULEBASED_SCHEMATICS_CONFIG;

  return addLibraryFeature(options, config);
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
  return addLibraryFeature(options, PRODUCT_CONFIGURATOR_CPQ_SCHEMATICS_CONFIG);
}

function addProductConfiguratorTextfieldFeature(
  options: SpartacusProductConfiguratorOptions
): Rule {
  return addLibraryFeature(
    options,
    PRODUCT_CONFIGURATOR_TEXTFIELD_SCHEMATICS_CONFIG
  );
}
