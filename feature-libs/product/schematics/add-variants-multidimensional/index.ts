import { Rule } from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  LibraryOptions as SpartacusVariantsMultiDimensionalOptions,
  SPARTACUS_PRODUCT,
} from '@spartacus/schematics';

import {
  VARIANTS_MULTIDIMENSIONAL_FEATURE_NAME,
  VARIANTS_MULTIDIMENSIONAL_MODULE,
  VARIANTS_MULTIDIMENSIONAL_ROOT_MODULE,
  SPARTACUS_VARIANTS_MULTIDIMENSIONAL,
  SPARTACUS_VARIANTS_MULTIDIMENSIONAL_ROOT,
  SPARTACUS_VARIANTS_MULTIDIMENSIONAL_ASSETS,
  VARIANTS_MULTIDIMENSIONAL_TRANSLATION_CHUNKS_CONFIG,
  VARIANTS_MULTIDIMENSIONAL_TRANSLATIONS,
  PRODUCT_FOLDER_NAME,
  PRODUCT_SCSS_FILE_NAME,
} from './../constants';

export function addVariantsMultiDimensionalFeature(
  options: SpartacusVariantsMultiDimensionalOptions
): Rule {
  return addLibraryFeature(options, {
    folderName: PRODUCT_FOLDER_NAME,
    name: VARIANTS_MULTIDIMENSIONAL_FEATURE_NAME,
    featureModule: {
      name: VARIANTS_MULTIDIMENSIONAL_MODULE,
      importPath: SPARTACUS_VARIANTS_MULTIDIMENSIONAL,
    },
    rootModule: {
      name: VARIANTS_MULTIDIMENSIONAL_ROOT_MODULE,
      importPath: SPARTACUS_VARIANTS_MULTIDIMENSIONAL_ROOT,
    },
    i18n: {
      resources: VARIANTS_MULTIDIMENSIONAL_TRANSLATIONS,
      chunks: VARIANTS_MULTIDIMENSIONAL_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_VARIANTS_MULTIDIMENSIONAL_ASSETS,
    },
    styles: {
      scssFileName: PRODUCT_SCSS_FILE_NAME,
      importStyle: SPARTACUS_PRODUCT,
    },
  });
}
