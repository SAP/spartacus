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
  validateSpartacusInstallation,
} from '@spartacus/schematics';
<<<<<<< HEAD
import {
  CLI_BULK_PRICING_FEATURE,
  CLI_VARIANTS_FEATURE,
  CLI_VARIANTS_MULTIDIMENSIONAL_FEATURE,
} from '../constants';
import { addVariantsMultiDimensionalFeature } from '../add-variants-multidimensional';
=======
import { peerDependencies } from '../../package.json';
>>>>>>> origin/develop
import { addBulkPricingFeature } from '../add-bulk-pricing';
import { addVariantsFeature } from '../add-product-variants';

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

<<<<<<< HEAD
      shouldAddFeature(CLI_VARIANTS_MULTIDIMENSIONAL_FEATURE, options.features)
        ? addVariantsMultiDimensionalFeature(options)
        : noop(),
=======
      addProductPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
>>>>>>> origin/develop
    ]);
  };
}

function addProductPackageJsonDependencies(packageJson: any): Rule {
  const dependencies = createDependencies(peerDependencies);

  return addPackageJsonDependencies(dependencies, packageJson);
}
