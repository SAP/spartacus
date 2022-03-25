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
  CLI_ORGANIZATION_ADMINISTRATION_FEATURE,
  CLI_ORGANIZATION_ORDER_APPROVAL_FEATURE,
  configureB2bFeatures,
  LibraryOptions as SpartacusOrganizationOptions,
  readPackageJson,
  shouldAddFeature,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addSpartacusOrganization(
  options: SpartacusOrganizationOptions
): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const features = analyzeCrossFeatureDependencies(
      options.features as string[]
    );

    return chain([
      addFeatures(options, features),

      shouldAddB2b(options)
        ? configureB2bFeatures(options, packageJson)
        : noop(),

      addPackageJsonDependenciesForLibrary(peerDependencies, options),
    ]);
  };
}

function shouldAddB2b(options: SpartacusOrganizationOptions): boolean {
  return (
    shouldAddFeature(
      CLI_ORGANIZATION_ADMINISTRATION_FEATURE,
      options.features
    ) ||
    shouldAddFeature(CLI_ORGANIZATION_ORDER_APPROVAL_FEATURE, options.features)
  );
}
