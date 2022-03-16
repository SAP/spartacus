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
  CART_BASE_SCHEMATICS_CONFIG,
  CART_IMPORT_EXPORT_SCHEMATICS_CONFIG,
  CART_QUICK_ORDER_SCHEMATICS_CONFIG,
  CART_SAVED_CART_SCHEMATICS_CONFIG,
  CART_WISHLIST_SCHEMATICS_CONFIG,
  CLI_CART_BASE_FEATURE,
  CLI_CART_IMPORT_EXPORT_FEATURE,
  CLI_CART_QUICK_ORDER_FEATURE,
  CLI_CART_SAVED_CART_FEATURE,
  CLI_CART_WISHLIST_FEATURE,
  LibraryOptions as SpartacusCartOptions,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addCartFeatures(options: SpartacusCartOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_CART_BASE_FEATURE, options.features)
        ? addCartBaseFeature(options)
        : noop(),

      shouldAddFeature(CLI_CART_IMPORT_EXPORT_FEATURE, options.features)
        ? addCartImportExportFeature(options)
        : noop(),

      shouldAddFeature(CLI_CART_WISHLIST_FEATURE, options.features)
        ? addWishListFeature(options)
        : noop(),

      shouldAddFeature(CLI_CART_QUICK_ORDER_FEATURE, options.features)
        ? addQuickOrderFeature(options)
        : noop(),

      shouldAddFeature(CLI_CART_SAVED_CART_FEATURE, options.features)
        ? addSavedCartFeature(options)
        : noop(),
    ]);
  };
}

function addCartBaseFeature(options: SpartacusCartOptions): Rule {
  return addLibraryFeature(options, CART_BASE_SCHEMATICS_CONFIG);
}

function addCartImportExportFeature(options: SpartacusCartOptions): Rule {
  return addLibraryFeature(options, CART_IMPORT_EXPORT_SCHEMATICS_CONFIG);
}

function addQuickOrderFeature(options: SpartacusCartOptions): Rule {
  return addLibraryFeature(options, CART_QUICK_ORDER_SCHEMATICS_CONFIG);
}

function addWishListFeature(options: SpartacusCartOptions): Rule {
  return addLibraryFeature(options, CART_WISHLIST_SCHEMATICS_CONFIG);
}

function addSavedCartFeature(options: SpartacusCartOptions): Rule {
  return addLibraryFeature(options, CART_SAVED_CART_SCHEMATICS_CONFIG);
}
