import {
  SPARTACUS_ASM,
  SPARTACUS_ASM_ASSETS,
  SPARTACUS_ASM_ROOT,
} from '../libs-constants';
import { FeatureConfig } from '../utils/lib-utils';

export const ASM_FOLDER_NAME = 'asm';
// TODO:#schematics - rename to `ASM_FEATURE_MODULE_NAME`
export const ASM_MODULE_NAME = 'Asm';

export const ASM_FEATURE_NAME_CONSTANT = 'ASM_FEATURE';
export const ASM_MODULE = 'AsmModule';
export const ASM_ROOT_MODULE = 'AsmRootModule';
export const ASM_TRANSLATIONS = 'asmTranslations';
export const ASM_TRANSLATION_CHUNKS_CONFIG = 'asmTranslationChunksConfig';

export const ASM_SCHEMATICS_CONFIG: FeatureConfig = {
  folderName: ASM_FOLDER_NAME,
  moduleName: ASM_MODULE_NAME,
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
};
