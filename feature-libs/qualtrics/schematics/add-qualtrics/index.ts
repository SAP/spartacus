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
  LibraryOptions as SpartacusQualtricsOptions,
  readPackageJson,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addQualtricsFeatures(options: SpartacusQualtricsOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const features = analyzeCrossFeatureDependencies(options.features ?? []);

    return chain([
      addFeatures(options, features),
      addPackageJsonDependenciesForLibrary(peerDependencies, options),
    ]);
  };
}
