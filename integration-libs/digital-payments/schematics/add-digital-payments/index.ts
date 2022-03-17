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
  CLI_DIGITAL_PAYMENTS_FEATURE,
  DIGITAL_PAYMENTS_SCHEMATICS_CONFIG,
  LibraryOptions as SpartacusDigitalPaymentsOptions,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addDigitalPaymentsFeature(
  options: SpartacusDigitalPaymentsOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_DIGITAL_PAYMENTS_FEATURE, options.features)
        ? addDigitalPayments(options)
        : noop(),
    ]);
  };
}

function addDigitalPayments(options: SpartacusDigitalPaymentsOptions): Rule {
  return addLibraryFeature(options, DIGITAL_PAYMENTS_SCHEMATICS_CONFIG);
}
