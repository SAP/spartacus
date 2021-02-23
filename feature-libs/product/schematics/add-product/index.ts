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
} from '@spartacus/schematics';
import { CLI_VARIANTS_FEATURE, SPARTACUS_PRODUCT } from '../constants';

import { addVariantsFeatures } from '../add-variants';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';

export function addSpartacusProduct(options: SpartacusProductOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(options.features, CLI_VARIANTS_FEATURE)
        ? addVariantsFeatures(options)
        : noop(),
      addVariantsPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addVariantsPackageJsonDependencies(packageJson: any): Rule {
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
