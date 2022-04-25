import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
// import { CHECKOUT_FEATURE } from '@spartacus/checkout/base/root'; //TODO
// import { SPARTACUS_S4OM } from '@spartacus/schematics'; //TODO
// import { S4omModule } from '../../../../../../integration-libs/s4om/src/s4om.module'; //TODO
import {
  s4omTranslationChunksConfig,
  s4omTranslations,
} from 'integration-libs/s4om/assets/public_api';
@NgModule({
  providers: [
    // provideConfig(<CmsConfig>{ //TODO
    //   featureModules: {
    //     [CHECKOUT_FEATURE]: {
    //       module: () =>
    //       import('@spartacus/s4om').then(
    //         (m) => m.S4omModule
    //       ),
    //     },
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
