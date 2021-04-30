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
  CLI_STOREFINDER_FEATURE,
  createDependencies,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusStorefinderOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_STOREFINDER,
  STOREFINDER_MODULE,
  STORE_FINDER_SCSS_FILE_NAME,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  SPARTACUS_STOREFINDER_ASSETS,
  SPARTACUS_STOREFINDER_ROOT,
  STOREFINDER_FEATURE_CONSTANT,
  STOREFINDER_FEATURE_NAME,
  STOREFINDER_FOLDER_NAME,
  STOREFINDER_ROOT_MODULE,
  STOREFINDER_TRANSLATIONS,
  STOREFINDER_TRANSLATION_CHUNKS_CONFIG,
} from '../constants';

export function addStorefinderFeatures(
  options: SpartacusStorefinderOptions
): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(CLI_STOREFINDER_FEATURE, options.features)
        ? addStorefinderFeature(options)
        : noop(),

      addStorefinderPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addStorefinderPackageJsonDependencies(packageJson: any): Rule {
  const dependencies = createDependencies(peerDependencies);

  return addPackageJsonDependencies(dependencies, packageJson);
}

function addStorefinderFeature(options: SpartacusStorefinderOptions): Rule {
  return addLibraryFeature(options, {
    folderName: STOREFINDER_FOLDER_NAME,
    name: STOREFINDER_FEATURE_NAME,
    featureModule: {
      name: STOREFINDER_MODULE,
      importPath: SPARTACUS_STOREFINDER,
    },
    rootModule: {
      name: STOREFINDER_ROOT_MODULE,
      importPath: SPARTACUS_STOREFINDER_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_STOREFINDER_ROOT,
      namedImports: [STOREFINDER_FEATURE_CONSTANT],
    },
    i18n: {
      resources: STOREFINDER_TRANSLATIONS,
      chunks: STOREFINDER_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_STOREFINDER_ASSETS,
    },
    styles: {
      scssFileName: STORE_FINDER_SCSS_FILE_NAME,
      importStyle: SPARTACUS_STOREFINDER,
    },
  });
}
