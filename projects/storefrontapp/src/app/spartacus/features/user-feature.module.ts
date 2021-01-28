import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { UserAccountRootModule } from '@spartacus/user/account/root';
import {
  userProfileTranslations,
  userTranslationChunksConfig,
} from '@spartacus/user/profile/assets';
import { UserProfileRootModule } from '@spartacus/user/profile/root';

@NgModule({
  declarations: [],
  imports: [UserAccountRootModule, UserProfileRootModule],
  providers: [
    provideConfig({
      featureModules: {
        userDetails: {
          module: () =>
            import('@spartacus/user/account').then((m) => m.UserAccountModule),
        },
        userProfile: {
          module: () =>
            import('@spartacus/user/profile').then((m) => m.UserProfileModule),
        },
      },
      i18n: {
        resources: userProfileTranslations,
        chunks: userTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class UserFeatureModule {}
