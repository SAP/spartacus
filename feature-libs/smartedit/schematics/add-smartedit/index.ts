import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  addPackageJsonDependencies,
  CLI_SMARTEDIT_FEATURE,
  createDependencies,
  createSpartacusDependencies,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusSmartEditOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_SMARTEDIT,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  SMARTEDIT_FEATURE_NAME_CONSTANT,
  SMARTEDIT_FOLDER_NAME,
  SMARTEDIT_MODULE,
  SMARTEDIT_MODULE_NAME,
  SMARTEDIT_ROOT_MODULE,
  SPARTACUS_SMARTEDIT_ASSETS,
  SPARTACUS_SMARTEDIT_ROOT,
} from '../constants';

export function addSmartEditFeatures(options: SpartacusSmartEditOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(CLI_SMARTEDIT_FEATURE, options.features)
        ? addSmartEditFeature(options)
        : noop(),

      addSmarteditPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addSmarteditPackageJsonDependencies(packageJson: any): Rule {
  const spartacusLibraries = createSpartacusDependencies(peerDependencies);
  const thirdPartyDependencies = createDependencies(peerDependencies);
  const dependencies = spartacusLibraries.concat(thirdPartyDependencies);

  return addPackageJsonDependencies(dependencies, packageJson);
}

function addSmartEditFeature(options: SpartacusSmartEditOptions): Rule {
  return addLibraryFeature(options, {
    folderName: SMARTEDIT_FOLDER_NAME,
    moduleName: SMARTEDIT_MODULE_NAME,
    featureModule: {
      name: SMARTEDIT_MODULE,
      importPath: SPARTACUS_SMARTEDIT,
    },
    rootModule: {
      name: SMARTEDIT_ROOT_MODULE,
      importPath: SPARTACUS_SMARTEDIT_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_SMARTEDIT_ROOT,
      namedImports: [SMARTEDIT_FEATURE_NAME_CONSTANT],
    },
    assets: {
      input: SPARTACUS_SMARTEDIT_ASSETS,
      glob: '**/*',
    },
  });
}
