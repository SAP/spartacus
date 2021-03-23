import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusAsmOptions,
  readPackageJson,
  SPARTACUS_ASM,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
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
  return (tree: Tree, _context: SchematicContext) => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([addAsmFeature(options), installPackageJsonDependencies()]);
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
