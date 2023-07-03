/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { EPD_VISUALIZATION_CONFIG } from '../../constants';
import {
  EPD_VISUALIZATION_FEATURE_NAME,
  SPARTACUS_EPD_VISUALIZATION,
  SPARTACUS_EPD_VISUALIZATION_ASSETS,
  SPARTACUS_EPD_VISUALIZATION_ROOT,
} from '../../libs-constants';
import { AdditionalFeatureConfiguration } from '../../utils/feature-utils';
import { LibraryOptions, SchematicConfig } from '../../utils/lib-utils';

export interface SpartacusEpdVisualizationOptions extends LibraryOptions {
  baseUrl?: string;
}

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

export const EPD_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: EPD_VISUALIZATION_FEATURE_NAME,
    mainScope: SPARTACUS_EPD_VISUALIZATION,
  },
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
  customConfig: buildCdsConfig,
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

function buildCdsConfig(
  options: SpartacusEpdVisualizationOptions
): AdditionalFeatureConfiguration<SpartacusEpdVisualizationOptions> {
  return {
    providers: {
      import: [
        {
          moduleSpecifier: SPARTACUS_EPD_VISUALIZATION_ROOT,
          namedImports: [EPD_VISUALIZATION_CONFIG],
        },
      ],
      content: `<${EPD_VISUALIZATION_CONFIG}>{
        epdVisualization: {
          ui5: {
            bootstrapUrl: "https://sapui5.hana.ondemand.com/1.108.14/resources/sap-ui-core.js"
          },

          apis: {
            baseUrl: "${options.baseUrl || 'PLACEHOLDER_BASE_URL'}"
          }
        }
      }`,
    },
  };
}
