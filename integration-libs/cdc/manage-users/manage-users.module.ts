/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CdcB2BUserService,
  CdcUserListService,
} from '@spartacus/cdc/manage-users';
import { UserListService } from '@spartacus/organization/administration/components';
import { B2BUserService } from '@spartacus/organization/administration/core';

@NgModule({
  providers: [
    { provide: B2BUserService, useClass: CdcB2BUserService },
    { provide: UserListService, useClass: CdcUserListService },
  ],
})
export class ManageUsersModule {}
