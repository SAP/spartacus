import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  addPackageJsonDependenciesForLibrary,
  ASM_SCHEMATICS_CONFIG,
  CLI_ASM_FEATURE,
  LibraryOptions as SpartacusAsmOptions,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addAsmFeatures(options: SpartacusAsmOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_ASM_FEATURE, options.features)
        ? addAsmFeature(options)
        : noop(),
    ]);
  };
}

function addAsmFeature(options: SpartacusAsmOptions): Rule {
  return addLibraryFeature(options, ASM_SCHEMATICS_CONFIG);
}
