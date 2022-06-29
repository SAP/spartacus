import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  s4omTranslationChunksConfig,
  s4omTranslations,
} from '@spartacus/s4om/assets';
import { S4omRootModule, S4OM_FEATURE } from 'integration-libs/s4om/root';

@NgModule({
  imports: [S4omRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [S4OM_FEATURE]: {
          module: () => import('@spartacus/s4om').then((m) => m.S4omModule),
        },
      },
    }),
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
