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
  CLI_SMARTEDIT_FEATURE,
  LibraryOptions as SpartacusSmartEditOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_SMARTEDIT,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  SMARTEDIT_FEATURE_NAME,
  SMARTEDIT_FOLDER_NAME,
  SMARTEDIT_MODULE,
  SMARTEDIT_ROOT_MODULE,
  SPARTACUS_SMARTEDIT_ASSETS,
  SPARTACUS_SMARTEDIT_ROOT,
} from '../constants';

export function addSmartEditFeatures(options: SpartacusSmartEditOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(CLI_SMARTEDIT_FEATURE, options.features)
        ? addSmartEditFeature(options)
        : noop(),

      addPackageJsonDependenciesForLibrary({
        packageJson,
        context,
        libraryPeerDependencies: peerDependencies,
        options,
      }),
    ]);
  };
}

function addSmartEditFeature(options: SpartacusSmartEditOptions): Rule {
  return addLibraryFeature(options, {
    folderName: SMARTEDIT_FOLDER_NAME,
    name: SMARTEDIT_FEATURE_NAME,
    featureModule: {
      name: SMARTEDIT_MODULE,
      importPath: SPARTACUS_SMARTEDIT,
    },
    rootModule: {
      name: SMARTEDIT_ROOT_MODULE,
      importPath: SPARTACUS_SMARTEDIT_ROOT,
    },
    assets: {
      input: SPARTACUS_SMARTEDIT_ASSETS,
      glob: '**/*',
    },
  });
}
