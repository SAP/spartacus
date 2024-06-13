/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  FeatureConfigService,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { SharedOrganizationModule } from '../shared/shared-organization.module';
import { UserGroupDetailsModule } from './details/user-group-details.module';
import { UserGroupFormModule } from './form/user-group-form.module';
import { UserGroupPermissionModule } from './permissions/user-group-permission-list.module';
import {
  userGroupCmsConfig,
  userGroupTableConfigFactory,
} from './user-group.config';
import { UserGroupUserModule } from './users/user-group-user-list.module';

@NgModule({
  imports: [
    SharedOrganizationModule,
    UserGroupDetailsModule,
    UserGroupFormModule,
    UserGroupPermissionModule,
    UserGroupUserModule,
  ],
  providers: [
    provideDefaultConfig(userGroupCmsConfig),
    provideDefaultConfigFactory(userGroupTableConfigFactory, [
      FeatureConfigService,
    ]),
  ],
})
export class UserGroupComponentsModule {}
