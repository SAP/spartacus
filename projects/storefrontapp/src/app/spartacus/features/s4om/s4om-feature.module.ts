import { NgModule } from '@angular/core';
import { I18nConfig, provideConfig } from '@spartacus/core';
import {
  s4omTranslationChunksConfig,
  s4omTranslations
} from '@spartacus/s4om/assets';
import { S4omRootModule } from '@spartacus/s4om/root';

@NgModule({
  imports: [S4omRootModule],
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
export class S4OMFeatureModule { }
