import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusQualtricsOptions,
  QUALTRICS_EMBEDDED_FEEDBACK_SCSS_FILE_NAME,
  readPackageJson,
  SPARTACUS_QUALTRICS,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import {
  QUALTRICS_FEATURE_NAME,
  QUALTRICS_FOLDER_NAME,
  QUALTRICS_MODULE,
  QUALTRICS_ROOT_MODULE,
  SPARTACUS_QUALTRICS_ROOT,
} from '../constants';

export function addQualtricsFeatures(options: SpartacusQualtricsOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addQualtricsFeature(options),
      installPackageJsonDependencies(),
    ]);
  };
}

function addQualtricsFeature(options: SpartacusQualtricsOptions): Rule {
  return addLibraryFeature(options, {
    folderName: QUALTRICS_FOLDER_NAME,
    name: QUALTRICS_FEATURE_NAME,
    featureModule: {
      name: QUALTRICS_MODULE,
      importPath: SPARTACUS_QUALTRICS,
    },
    rootModule: {
      name: QUALTRICS_ROOT_MODULE,
      importPath: SPARTACUS_QUALTRICS_ROOT,
    },
    styles: {
      scssFileName: QUALTRICS_EMBEDDED_FEEDBACK_SCSS_FILE_NAME,
      importStyle: SPARTACUS_QUALTRICS,
    },
  });
}
