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
  LibraryOptions as SpartacusAsmOptions,
  readPackageJson,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addAsmFeatures(options: SpartacusAsmOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const features = analyzeCrossFeatureDependencies(
      options.features as string[]
    );

    return chain([
      addFeatures(options, features),
      addPackageJsonDependenciesForLibrary(peerDependencies, options),
    ]);
  };
}
