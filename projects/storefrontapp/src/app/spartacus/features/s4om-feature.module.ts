import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import {
  s4omTranslationChunksConfig,
  s4omTranslations,
} from 'integration-libs/s4om/assets/public_api';
import { S4omModule } from 'integration-libs/s4om/src/s4om.module';
@NgModule({
  imports: [S4omModule],
  providers: [
    // provideConfig(<CmsConfig>{ //TODO
    //   featureModules: {
    //       module: () =>
    //       import('@spartacus/s4om').then(
    //         (m) => m.S4omModule
    //       ),
    //   },
    // }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: s4omTranslations,
        chunks: s4omTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class S4OMFeatureModule {}
