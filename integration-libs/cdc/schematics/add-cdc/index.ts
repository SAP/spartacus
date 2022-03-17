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
  CDC_SCHEMATICS_CONFIG,
  CLI_CDC_FEATURE,
  LibraryOptions as SpartacusCdcOptions,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addCdcFeature(options: SpartacusCdcOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_CDC_FEATURE, options.features)
        ? addCdc(options)
        : noop(),
    ]);
  };
}

function addCdc(options: SpartacusCdcOptions): Rule {
  return addLibraryFeature(options, CDC_SCHEMATICS_CONFIG);
}
