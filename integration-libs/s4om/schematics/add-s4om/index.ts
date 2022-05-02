import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  addPackageJsonDependenciesForLibrary, CLI_S4OM_FEATURE, LibraryOptions as S4OMOptions,
  readPackageJson,
  S4OM_MODULE,
  shouldAddFeature, SPARTACUS_S4OM,
  validateSpartacusInstallation
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  S4OM_FOLDER_NAME,
  S4OM_MODULE_NAME,
  S4OM_TRANSLATIONS,
  S4OM_TRANSLATION_CHUNKS_CONFIG, SPARTACUS_S4OM_ASSETS
} from '../constants';

export function addS4OMFeature(
  options: S4OMOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_S4OM_FEATURE, options.features)
        ? addS4OM(options)
        : noop(),
    ]);
  };
}

function addS4OM(options: S4OMOptions): Rule {
  return addLibraryFeature(options, {
    folderName: S4OM_FOLDER_NAME,
    moduleName: S4OM_MODULE_NAME,
    featureModule: {
      name: S4OM_MODULE,
      importPath: SPARTACUS_S4OM,
    },
    i18n: {
      resources: S4OM_TRANSLATIONS,
      chunks: S4OM_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_S4OM_ASSETS,
    },
    dependencyManagement: {
      featureName: CLI_S4OM_FEATURE,
      featureDependencies: {},
    },
  });
}
