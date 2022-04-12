import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  registrationTranslationChunksConfig,
  registratioTranslations,
} from '@spartacus/organization/registration/assets';
import {
  RegistrationRootModule,
  ORGANIZATION_USER_REGISTRATION_FEATURE,
} from '@spartacus/organization/registration/root';

@NgModule({
  imports: [RegistrationRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORGANIZATION_USER_REGISTRATION_FEATURE]: {
          module: () =>
            import('@spartacus/organization/registration').then(
              (m) => m.OrderApprovalModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: registratioTranslations,
        chunks: registrationTranslationChunksConfig,
      },
    }),
  ],
})
export class RegistrationFeatureModule {}
