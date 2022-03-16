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
  CLI_PRODUCT_BULK_PRICING_FEATURE,
  CLI_PRODUCT_IMAGE_ZOOM_FEATURE,
  CLI_PRODUCT_VARIANTS_FEATURE,
  configureB2bFeatures,
  LibraryOptions as SpartacusProductOptions,
  PRODUCT_BULK_PRICING_SCHEMATICS_CONFIG,
  PRODUCT_IMAGE_ZOOM_SCHEMATICS_CONFIG,
  PRODUCT_VARIANTS_SCHEMATICS_CONFIG,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addSpartacusProduct(options: SpartacusProductOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_PRODUCT_BULK_PRICING_FEATURE, options.features)
        ? chain([
            addBulkPricingFeature(options),
            configureB2bFeatures(options, packageJson),
          ])
        : noop(),

      shouldAddFeature(CLI_PRODUCT_IMAGE_ZOOM_FEATURE, options.features)
        ? addImageZoom(options)
        : noop(),

      shouldAddFeature(CLI_PRODUCT_VARIANTS_FEATURE, options.features)
        ? addVariantsFeature(options)
        : noop(),
    ]);
  };
}

export function addBulkPricingFeature(options: SpartacusProductOptions): Rule {
  return addLibraryFeature(options, PRODUCT_BULK_PRICING_SCHEMATICS_CONFIG);
}

export function addImageZoom(options: SpartacusProductOptions): Rule {
  return addLibraryFeature(options, PRODUCT_IMAGE_ZOOM_SCHEMATICS_CONFIG);
}

export function addVariantsFeature(options: SpartacusProductOptions): Rule {
  return addLibraryFeature(options, PRODUCT_VARIANTS_SCHEMATICS_CONFIG);
}
