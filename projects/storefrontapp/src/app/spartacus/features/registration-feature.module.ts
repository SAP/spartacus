/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  organizationUserRegistrationTranslationChunksConfig,
  organizationUserRegistrationTranslations,
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
            import('@spartacus/organization/user-registration').then(
              (m) => m.OrganizationUserRegistrationModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: organizationUserRegistrationTranslations,
        chunks: organizationUserRegistrationTranslationChunksConfig,
      },
    }),
  ],
})
export class OrganizationUserRegistrationFeatureModule {}
