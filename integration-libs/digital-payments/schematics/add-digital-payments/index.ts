import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addFeatures,
  addPackageJsonDependenciesForLibrary,
  analyzeCrossFeatureDependencies,
  LibraryOptions as SpartacusDigitalPaymentsOptions,
  readPackageJson,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addDigitalPaymentsFeature(
  options: SpartacusDigitalPaymentsOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const features = analyzeCrossFeatureDependencies(options.features ?? []);

    return chain([
      addFeatures(options, features),
      addPackageJsonDependenciesForLibrary(peerDependencies, options),
    ]);
  };
}
