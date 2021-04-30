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
  CLI_ASM_FEATURE,
  createDependencies,
  installPackageJsonDependencies,
  LibraryOptions as SpartacusAsmOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_ASM,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  ASM_FEATURE_NAME,
  ASM_FEATURE_NAME_CONSTANT,
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

    return chain([
      shouldAddFeature(CLI_ASM_FEATURE, options.features)
        ? addAsmFeature(options)
        : noop(),

      addAsmPackageJsonDependencies(packageJson),
      installPackageJsonDependencies(),
    ]);
  };
}

function addAsmPackageJsonDependencies(packageJson: any): Rule {
  const dependencies = createDependencies(peerDependencies);
  return addPackageJsonDependencies(dependencies, packageJson);
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
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_ASM_ROOT,
      namedImports: [ASM_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: ASM_TRANSLATIONS,
      chunks: ASM_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_ASM_ASSETS,
    },
  });
}
