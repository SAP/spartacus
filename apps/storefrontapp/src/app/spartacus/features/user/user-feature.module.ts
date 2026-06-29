import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  userAccountTranslationChunksConfig,
  userAccountTranslationsEn,
} from '@spartacus/user/account/assets';
import { USER_ACCOUNT_FEATURE, UserAccountRootModule } from '@spartacus/user/account/root';
import {
  userProfileTranslationChunksConfig,
  userProfileTranslationsEn,
} from '@spartacus/user/profile/assets';
import { USER_PROFILE_FEATURE, UserProfileRootModule } from '@spartacus/user/profile/root';

@NgModule({
  declarations: [],
  imports: [UserAccountRootModule, UserProfileRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [USER_ACCOUNT_FEATURE]: {
          module: () => import('@spartacus/user/account').then((m) => m.UserAccountModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: userAccountTranslationsEn },
        chunks: userAccountTranslationChunksConfig,
      },
    }),
    provideConfig(<CmsConfig>{
      featureModules: {
        [USER_PROFILE_FEATURE]: {
          module: () => import('@spartacus/user/profile').then((m) => m.UserProfileModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: userProfileTranslationsEn },
        chunks: userProfileTranslationChunksConfig,
      },
    }),
  ],
})
export class UserFeatureModule {}
