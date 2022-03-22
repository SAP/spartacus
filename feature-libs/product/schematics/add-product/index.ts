import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addFeatures,
  addPackageJsonDependenciesForLibrary,
  analyzeCrossFeatureDependencies,
  CLI_PRODUCT_BULK_PRICING_FEATURE,
  configureB2bFeatures,
  LibraryOptions as SpartacusProductOptions,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addSpartacusProduct(options: SpartacusProductOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const features = analyzeCrossFeatureDependencies(options.features ?? []);

    return chain([
      addFeatures(options, features),

      shouldAddB2b(options)
        ? configureB2bFeatures(options, packageJson)
        : noop(),

      addPackageJsonDependenciesForLibrary(peerDependencies, options),
    ]);
  };
}

function shouldAddB2b(options: SpartacusProductOptions): boolean {
  return shouldAddFeature(CLI_PRODUCT_BULK_PRICING_FEATURE, options.features);
}
