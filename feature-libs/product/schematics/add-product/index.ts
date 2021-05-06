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
import { addBulkPricingFeature } from '../add-bulk-pricing';
import { addVariantsFeature } from '../add-product-variants';
import { CLI_BULK_PRICING_FEATURE, CLI_VARIANTS_FEATURE } from '../constants';

export function addSpartacusProduct(options: SpartacusProductOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(CLI_BULK_PRICING_FEATURE, options.features)
        ? addBulkPricingFeature(options)
        : noop(),

      shouldAddFeature(CLI_VARIANTS_FEATURE, options.features)
        ? addVariantsFeature(options)
        : noop(),
    ]);
  };
}
