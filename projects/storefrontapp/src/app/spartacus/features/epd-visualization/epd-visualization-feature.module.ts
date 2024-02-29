/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  epdVisualizationTranslationChunksConfig,
  epdVisualizationTranslations,
} from '@spartacus/epd-visualization/assets';
import {
  EpdVisualizationConfig,
  EpdVisualizationRootModule,
  EPD_VISUALIZATION_FEATURE,
} from '@spartacus/epd-visualization/root';

const epdVisualizationConfig: EpdVisualizationConfig = {
  epdVisualization: {
    apis: {
      baseUrl:
        'https://epd-acc-eu20-consumer.visualization.eu20.acc.epd.dev.sap',
    },

    ui5: {
      bootstrapUrl: 'https://ui5.sap.com/1.108/resources/sap-ui-core.js',
    },
  },
};

@NgModule({
  imports: [EpdVisualizationRootModule],
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: epdVisualizationTranslations,
        chunks: epdVisualizationTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),

    provideConfig(epdVisualizationConfig),

    provideConfig(<CmsConfig>{
      featureModules: {
        [EPD_VISUALIZATION_FEATURE]: {
          module: () =>
            import('@spartacus/epd-visualization').then(
              (m) => m.EpdVisualizationModule
            ),
        },
      },
    }),
  ],
})
export class EpdVisualizationFeatureModule {}
