import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addPackageJsonDependencies,
  createDependencies,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusProductOptions,
  readPackageJson,
  shouldAddFeature,
  SKIP_SCOPES_FEATURES_LIBS,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import { addBulkPricingFeature } from '../add-bulk-pricing';
import { addVariantsFeature } from '../add-product-variants';
import { CLI_BULK_PRICING_FEATURE, CLI_VARIANTS_FEATURE } from '../constants';

export function addSpartacusProduct(options: SpartacusProductOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(CLI_BULK_PRICING_FEATURE, options.features)
        ? addBulkPricingFeature(options)
        : noop(),

      shouldAddFeature(CLI_VARIANTS_FEATURE, options.features)
        ? addVariantsFeature(options)
        : noop(),

      addProductPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addProductPackageJsonDependencies(packageJson: any): Rule {
  const dependencies = createDependencies(
    peerDependencies,
    SKIP_SCOPES_FEATURES_LIBS
  );

  return addPackageJsonDependencies(dependencies, packageJson);
}
