import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  punchoutTranslationChunksConfig,
  punchoutTranslations,
} from '@spartacus/punchout/assets';
import { PunchoutRootModule, PUNCHOUT_FEATURE } from '@spartacus/punchout/root';

@NgModule({
  imports: [PunchoutRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [PUNCHOUT_FEATURE]: {
          module: () =>
            import('@spartacus/punchout').then((m) => m.PunchoutModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: punchoutTranslations,
        chunks: punchoutTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class PunchoutFeatureModule {}
