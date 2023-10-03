import { NgModule } from '@angular/core';
import { provideConfig, CmsConfig, I18nConfig } from '@spartacus/core';
import {
  myAccountViewTranslationChunksConfig,
  myAccountViewTranslations,
} from '@spartacus/myaccount-view/assets';
import {
  MyAccountViewRootModule,
  MYACCOUNT_VIEW_FEATURE,
} from '@spartacus/myaccount-view/root';

@NgModule({
  imports: [MyAccountViewRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [MYACCOUNT_VIEW_FEATURE]: {
          module: () =>
            import('@spartacus/myaccount-view').then(
              (m) => m.MyAccountViewModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: myAccountViewTranslations,
        chunks: myAccountViewTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class MyAccountViewFeatureModule {}
