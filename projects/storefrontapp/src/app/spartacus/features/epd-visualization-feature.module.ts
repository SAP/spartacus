import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import {
  EpdVisualizationConfig,
  EpdVisualizationModule,
  epdVisualizationTranslationChunksConfig,
  epdVisualizationTranslations,
} from '@spartacus/epd-visualization';
@NgModule({
  imports: [EpdVisualizationModule],
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: epdVisualizationTranslations,
        chunks: epdVisualizationTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),

    provideConfig(<EpdVisualizationConfig>{
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
          'https://sapui5.hana.ondemand.com/1.96.0/resources/sap-ui-core.js',
      },

      visualPicking: {
        productReferenceType: 'SPAREPART',
      },
    }),
  ],
})
export class EpdVisualizationFeatureModule {}
