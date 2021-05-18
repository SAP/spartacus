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
  CLI_QUALTRICS_FEATURE,
  LibraryOptions as SpartacusQualtricsOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_QUALTRICS,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  QUALTRICS_EMBEDDED_FEEDBACK_SCSS_FILE_NAME,
  QUALTRICS_FEATURE_NAME_CONSTANT,
  QUALTRICS_FOLDER_NAME,
  QUALTRICS_MODULE,
  QUALTRICS_MODULE_NAME,
  QUALTRICS_ROOT_MODULE,
  SPARTACUS_QUALTRICS_ROOT,
} from '../constants';

export function addQualtricsFeatures(options: SpartacusQualtricsOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_QUALTRICS_FEATURE, options.features)
        ? addQualtricsFeature(options)
        : noop(),
    ]);
  };
}

function addQualtricsFeature(options: SpartacusQualtricsOptions): Rule {
  return addLibraryFeature(options, {
    folderName: QUALTRICS_FOLDER_NAME,
    moduleName: QUALTRICS_MODULE_NAME,
    featureModule: {
      name: QUALTRICS_MODULE,
      importPath: SPARTACUS_QUALTRICS,
    },
    rootModule: {
      name: QUALTRICS_ROOT_MODULE,
      importPath: SPARTACUS_QUALTRICS_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_QUALTRICS_ROOT,
      namedImports: [QUALTRICS_FEATURE_NAME_CONSTANT],
    },
    styles: {
      scssFileName: QUALTRICS_EMBEDDED_FEEDBACK_SCSS_FILE_NAME,
      importStyle: SPARTACUS_QUALTRICS,
    },
  });
}
