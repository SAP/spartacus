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
  readPackageJson,
  SpartacusCdsOptions,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../../package.json';

export function addCdsFeature(options: SpartacusCdsOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
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
