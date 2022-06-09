import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import { S4omModule } from '@spartacus/s4om';
import {
  s4omTranslationChunksConfig,
  s4omTranslations,
} from '@spartacus/s4om/assets';
import { S4OM_FEATURE } from 'integration-libs/s4om/root/feature-name';

@NgModule({
  imports: [S4omModule],
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
