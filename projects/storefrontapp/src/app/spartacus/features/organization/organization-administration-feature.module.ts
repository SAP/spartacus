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
import { environment } from '../../../../environments/environment';
import { ManageUsersModule } from '@spartacus/cdc/manage-users';

const extensions: Type<any>[] = [];
if (environment.cdc) {
  extensions.push(ManageUsersModule);
}
@NgModule({
  declarations: [],
  imports: [AdministrationRootModule, ...extensions],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORGANIZATION_ADMINISTRATION_FEATURE]: {
          module: () =>
            import('./organization-administration-wrapper.module').then(
              (m) => m.AdministrationWrapperModule
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
