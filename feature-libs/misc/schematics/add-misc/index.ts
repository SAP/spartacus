import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import {
  addLibraryFeature,
  addPackageJsonDependencies,
  CLI_STOREFINDER_FEATURE,
  getAppModule,
  getSpartacusSchematicsVersion,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusMiscOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_MISC,
  SPARTACUS_STOREFINDER,
  SPARTACUS_STOREFINDER_ASSETS,
  SPARTACUS_STOREFINDER_ROOT,
  STOREFINDER_FEATURE_NAME,
  STOREFINDER_MODULE,
  STOREFINDER_ROOT_MODULE,
  STOREFINDER_TRANSLATIONS,
  STOREFINDER_TRANSLATION_CHUNKS_CONFIG,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { STOREFINDER_SCSS_FILE_NAME } from '../constants';

export function addMiscFeatures(options: SpartacusMiscOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const appModulePath = getAppModule(tree, options.project);

    return chain([
      shouldAddFeature(options.features, CLI_STOREFINDER_FEATURE)
        ? addStorefinderFeature(appModulePath, options)
        : noop(),
      addMiscPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addStorefinderFeature(
  appModulePath: string,
  options: SpartacusMiscOptions
): Rule {
  return addLibraryFeature(appModulePath, options, {
    name: STOREFINDER_FEATURE_NAME,
    featureModule: {
      name: STOREFINDER_MODULE,
      importPath: SPARTACUS_STOREFINDER,
    },
    rootModule: {
      name: STOREFINDER_ROOT_MODULE,
      importPath: SPARTACUS_STOREFINDER_ROOT,
    },
    i18n: {
      resources: STOREFINDER_TRANSLATIONS,
      chunks: STOREFINDER_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_STOREFINDER_ASSETS,
    },
    styles: {
      scssFileName: STOREFINDER_SCSS_FILE_NAME,
      importStyle: SPARTACUS_MISC,
    },
  });
}

function addMiscPackageJsonDependencies(packageJson: any): Rule {
  const spartacusVersion = `^${getSpartacusSchematicsVersion()}`;
  const dependencies: NodeDependency[] = [
    {
      type: NodeDependencyType.Default,
      version: spartacusVersion,
      name: SPARTACUS_MISC,
    },
  ];
  return addPackageJsonDependencies(dependencies, packageJson);
}
