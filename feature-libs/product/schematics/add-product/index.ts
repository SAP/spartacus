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
  addPackageJsonDependencies,
  getSpartacusSchematicsVersion,
  addLibraryStyles,
} from '@spartacus/schematics';
import { addVariantsFeatures } from '../add-variants';
import {
  CLI_BULK_PRICING_FEATURE,
  SPARTACUS_PRODUCT,
  CLI_VARIANTS_FEATURE,
  PRODUCT_SCSS_FILE_NAME,
} from '../constants';
import { addBulkPricingFeatures } from '../add-bulk-pricing';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';

export function addSpartacusProduct(options: SpartacusProductOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(options.features, CLI_BULK_PRICING_FEATURE)
        ? addBulkPricingFeatures(options)
        : noop(),

      shouldAddFeature(options.features, CLI_VARIANTS_FEATURE)
        ? addVariantsFeatures(options)
        : noop(),
      addProductStylesFile(),
      addProductPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addProductPackageJsonDependencies(packageJson: any): Rule {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const dependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_PRODUCT,
    },
  ];
  return addPackageJsonDependencies(dependencies, packageJson);
}

function addProductStylesFile(): Rule {
  return addLibraryStyles({
    scssFileName: PRODUCT_SCSS_FILE_NAME,
    importStyle: SPARTACUS_PRODUCT,
  });
}
