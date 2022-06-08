import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import {
  dpTranslationChunksConfig,
  dpTranslations,
} from '@spartacus/digital-payments/assets';

@NgModule({
  providers: [
    provideConfig(<I18nConfig>{
      i18n: {
        resources: dpTranslations,
        chunks: dpTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class DigitalPaymentsFeatureModule {}
