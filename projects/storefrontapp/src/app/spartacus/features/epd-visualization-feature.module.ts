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
        'https://epd-acc-eu20-consumer.epdacc.cfapps.eu20.hana.ondemand.com',
    },

    ui5: {
      bootstrapUrl:
        'https://sapui5.hana.ondemand.com/1.97.0/resources/sap-ui-core.js',
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
