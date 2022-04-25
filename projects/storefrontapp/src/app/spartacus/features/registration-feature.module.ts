import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  orgUserRegistrationTranslationChunksConfig,
  orgUserRegistrationTranslations,
} from '@spartacus/organization/user-registration/assets';
import {
  UserRegistrationRootModule,
  ORGANIZATION_USER_REGISTRATION_FEATURE,
} from '@spartacus/organization/user-registration/root';

@NgModule({
  imports: [UserRegistrationRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORGANIZATION_USER_REGISTRATION_FEATURE]: {
          module: () =>
            import('@spartacus/organization/user-registration').then(
              (m) => m.OrgUserRegistrationModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: orgUserRegistrationTranslations,
        chunks: orgUserRegistrationTranslationChunksConfig,
      },
    }),
  ],
})
export class RegistrationFeatureModule {}
