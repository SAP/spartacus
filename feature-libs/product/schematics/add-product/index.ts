import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  installPackageJsonDependencies,
  LibraryOptions as SpartacusProductOptions,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { addBulkPricingFeature } from '../add-bulk-pricing';
import { addVariantsFeature } from '../add-variants';
import { CLI_BULK_PRICING_FEATURE, CLI_VARIANTS_FEATURE } from '../constants';

export function addSpartacusProduct(options: SpartacusProductOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(options.features, CLI_BULK_PRICING_FEATURE)
        ? addBulkPricingFeature(options)
        : noop(),

      shouldAddFeature(options.features, CLI_VARIANTS_FEATURE)
        ? addVariantsFeature(options)
        : noop(),
      installPackageJsonDependencies(),
    ]);
  };
}
