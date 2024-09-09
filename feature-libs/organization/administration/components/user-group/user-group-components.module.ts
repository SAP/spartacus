/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { SharedOrganizationModule } from '../shared/shared-organization.module';

import { UserGroupFormModule } from './form/user-group-form.module';

import {
  userGroupCmsConfig,
  userGroupTableConfigFactory,
} from './user-group.config';


@NgModule({
  imports: [
    SharedOrganizationModule,
    UserGroupFormModule,
],
  providers: [
    provideDefaultConfig(userGroupCmsConfig),
    provideDefaultConfigFactory(userGroupTableConfigFactory),
  ],
})
export class UserGroupComponentsModule {}
