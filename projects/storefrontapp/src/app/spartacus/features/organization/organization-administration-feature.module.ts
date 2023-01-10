/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  organizationTranslationChunksConfig,
  organizationTranslations,
} from '@spartacus/organization/administration/assets';
import {
  AdministrationRootModule,
  ORGANIZATION_ADMINISTRATION_FEATURE,
} from '@spartacus/organization/administration/root';
import { CdcUserDetailsModule } from 'integration-libs/cdc/manage-users/disable-edit/cdc-user-details.module';
import { CdcListModule } from 'integration-libs/cdc/manage-users/manage-users-button/cdc-list.module';
import { environment } from 'projects/storefrontapp/src/environments/environment';

const extensions: Type<any>[] = [];
if (environment.cdc) {
  extensions.push(CdcUserDetailsModule);
  extensions.push(CdcListModule);
}
@NgModule({
  declarations: [],
  imports: [AdministrationRootModule, ...extensions],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORGANIZATION_ADMINISTRATION_FEATURE]: {
          module: () =>
            import('@spartacus/organization/administration').then(
              (m) => m.AdministrationModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: organizationTranslations,
        chunks: organizationTranslationChunksConfig,
      },
    }),
  ],
})
export class AdministrationFeatureModule {}
