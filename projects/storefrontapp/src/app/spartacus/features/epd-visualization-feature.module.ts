import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';

import {
  EPD_VISUALIZATION_FEATURE,
  EpdVisualizationConfig,
  EpdVisualizationRootModule,
} from '@spartacus/epd-visualization/root';

import {
  epdVisualizationTranslationChunksConfig,
  epdVisualizationTranslations,
} from '@spartacus/epd-visualization/assets';

const epdVisualizationConfig: EpdVisualizationConfig = {
  epdVisualization: {
    apis: {
      baseUrl:
        'https://epd-acc-eu20-consumer.epdacc.cfapps.eu20.hana.ondemand.com',
    },

    usageIds: {
      folderUsageId: {
        name: 'CommerceCloud-Folder',
        keys: [
          {
            name: 'Function',
            value: 'Online',
          },
        ],
      },

      productUsageId: {
        name: 'CommerceCloud-SparePart',
        source: 'CommerceCloud',
        category: 'SpareParts',
        keyName: 'ProductCode',
      },
    },

    ui5: {
      bootstrapUrl:
        'https://sapui5.hana.ondemand.com/resources/sap-ui-core.js',
    },

    visualPicking: {
      productReferenceType: 'SPAREPART',
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
