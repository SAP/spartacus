import {
  SPARTACUS_EPD_VISUALIZATION,
  SPARTACUS_EPD_VISUALIZATION_ASSETS,
  SPARTACUS_EPD_VISUALIZATION_ROOT,
} from '../../libs-constants';
import { FeatureConfig } from '../../utils/lib-utils';

export const EPD_VISUALIZATION_FOLDER_NAME = 'epd-visualization';
export const EPD_VISUALIZATION_MODULE_NAME = 'EpdVisualization';
export const EPD_SCSS_FILE_NAME = 'epd-visualization.scss';

export const EPD_VISUALIZATION_FEATURE_NAME_CONSTANT =
  'EPD_VISUALIZATION_FEATURE';
export const EPD_VISUALIZATION_MODULE = 'EpdVisualizationModule';
export const EPD_VISUALIZATION_ROOT_MODULE = 'EpdVisualizationRootModule';
export const EPD_VISUALIZATION_TRANSLATIONS = 'epdVisualizationTranslations';
export const EPD_VISUALIZATION_TRANSLATION_CHUNKS_CONFIG =
  'epdVisualizationTranslationChunksConfig';

export const EPD_SCHEMATICS_CONFIG: FeatureConfig = {
  library: SPARTACUS_EPD_VISUALIZATION,
  folderName: EPD_VISUALIZATION_FOLDER_NAME,
  moduleName: EPD_VISUALIZATION_MODULE_NAME,
  featureModule: {
    name: EPD_VISUALIZATION_MODULE,
    importPath: SPARTACUS_EPD_VISUALIZATION,
  },
  rootModule: {
    name: EPD_VISUALIZATION_ROOT_MODULE,
    importPath: SPARTACUS_EPD_VISUALIZATION_ROOT,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_EPD_VISUALIZATION_ROOT,
    namedImports: [EPD_VISUALIZATION_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: EPD_VISUALIZATION_TRANSLATIONS,
    chunks: EPD_VISUALIZATION_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_EPD_VISUALIZATION_ASSETS,
  },
  styles: {
    scssFileName: EPD_SCSS_FILE_NAME,
    importStyle: SPARTACUS_EPD_VISUALIZATION,
  },
};
