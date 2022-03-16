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
  CLI_ORGANIZATION_ADMINISTRATION_FEATURE,
  CLI_ORGANIZATION_ORDER_APPROVAL_FEATURE,
  configureB2bFeatures,
  LibraryOptions as SpartacusOrganizationOptions,
  ORGANIZATION_ADMINISTRATION_SCHEMATICS_CONFIG,
  ORGANIZATION_ORDER_APPROVAL_SCHEMATICS_CONFIG,
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

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(
        CLI_ORGANIZATION_ADMINISTRATION_FEATURE,
        options.features
      )
        ? chain([
            addAdministrationFeature(options),
            configureB2bFeatures(options, packageJson),
          ])
        : noop(),

      shouldAddFeature(
        CLI_ORGANIZATION_ORDER_APPROVAL_FEATURE,
        options.features
      )
        ? chain([
            addOrderApprovalsFeature(options),
            configureB2bFeatures(options, packageJson),
          ])
        : noop(),
    ]);
  };
}

function addAdministrationFeature(options: SpartacusOrganizationOptions): Rule {
  return addLibraryFeature(
    options,
    ORGANIZATION_ADMINISTRATION_SCHEMATICS_CONFIG
  );
}

function addOrderApprovalsFeature(options: SpartacusOrganizationOptions): Rule {
  return addLibraryFeature(
    options,
    ORGANIZATION_ORDER_APPROVAL_SCHEMATICS_CONFIG
  );
}
