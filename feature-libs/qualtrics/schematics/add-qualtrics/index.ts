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
  CLI_QUALTRICS_FEATURE,
  createDependencies,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusQualtricsOptions,
  QUALTRICS_EMBEDDED_FEEDBACK_SCSS_FILE_NAME,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_QUALTRICS,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
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
      shouldAddFeature(CLI_QUALTRICS_FEATURE, options.features)
        ? addQualtricsFeature(options)
        : noop(),

      addQualtricsPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addQualtricsPackageJsonDependencies(packageJson: any): Rule {
  const dependencies = createDependencies(peerDependencies);

  return addPackageJsonDependencies(dependencies, packageJson);
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
