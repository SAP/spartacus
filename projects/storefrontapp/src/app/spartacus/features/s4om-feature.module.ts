import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import { S4omModule } from '@spartacus/s4om';
import {
  s4omTranslationChunksConfig,
  s4omTranslations,
} from '@spartacus/s4om/assets';

@NgModule({
  imports: [S4omModule],
  providers: [
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
