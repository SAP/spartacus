import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  LibraryOptions as SpartacusProductOptions,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import {
  CLI_BULK_PRICING_FEATURE,
  CLI_VARIANTS_FEATURE,
  CLI_VARIANTS_MULTIDIMENSIONAL_FEATURE,
} from '../constants';
import { addVariantsMultiDimensionalFeature } from '../add-variants-multidimensional';
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

      shouldAddFeature(CLI_VARIANTS_MULTIDIMENSIONAL_FEATURE, options.features)
        ? addVariantsMultiDimensionalFeature(options)
        : noop(),
    ]);
  };
}
