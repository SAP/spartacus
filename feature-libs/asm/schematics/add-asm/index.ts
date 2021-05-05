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
  CLI_ASM_FEATURE,
  LibraryOptions as SpartacusAsmOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_ASM,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  ASM_FEATURE_NAME,
  ASM_FOLDER_NAME,
  ASM_MODULE,
  ASM_ROOT_MODULE,
  ASM_TRANSLATIONS,
  ASM_TRANSLATION_CHUNKS_CONFIG,
  SPARTACUS_ASM_ASSETS,
  SPARTACUS_ASM_ROOT,
} from '../constants';

export function addAsmFeatures(options: SpartacusAsmOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      shouldAddFeature(CLI_ASM_FEATURE, options.features)
        ? addAsmFeature(options)
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

function addAsmFeature(options: SpartacusAsmOptions): Rule {
  return addLibraryFeature(options, {
    folderName: ASM_FOLDER_NAME,
    name: ASM_FEATURE_NAME,
    featureModule: {
      name: ASM_MODULE,
      importPath: SPARTACUS_ASM,
    },
    rootModule: {
      name: ASM_ROOT_MODULE,
      importPath: SPARTACUS_ASM_ROOT,
    },
    i18n: {
      resources: ASM_TRANSLATIONS,
      chunks: ASM_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_ASM_ASSETS,
    },
  });
}
