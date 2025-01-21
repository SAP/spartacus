/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  organizationUserRegistrationTranslationChunksConfig,
  organizationUserRegistrationTranslationsEn,
  organizationUserRegistrationTranslationsJa,
  organizationUserRegistrationTranslationsDe,
  organizationUserRegistrationTranslationsZh,
} from '@spartacus/organization/user-registration/assets';
import {
  OrganizationUserRegistrationRootModule,
  ORGANIZATION_USER_REGISTRATION_FEATURE,
} from '@spartacus/organization/user-registration/root';

@NgModule({
  imports: [OrganizationUserRegistrationRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORGANIZATION_USER_REGISTRATION_FEATURE]: {
          module: () =>
            import(
              './organization/organization-user-registration-wrapper.module'
            ).then((m) => m.OrganizationUserRegistrationWrapperModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: organizationUserRegistrationTranslationsEn,
          ja: organizationUserRegistrationTranslationsJa,
          de: organizationUserRegistrationTranslationsDe,
          zh: organizationUserRegistrationTranslationsZh,
        },
        chunks: organizationUserRegistrationTranslationChunksConfig,
      },
    }),
  ],
})
export class OrganizationUserRegistrationFeatureModule {}
