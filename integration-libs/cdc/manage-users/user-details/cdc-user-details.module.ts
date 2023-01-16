/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { CdcUserDetailsComponent } from './cdc-user-details.component';
import {
  CardModule,
  DisableInfoModule,
  ToggleStatusModule,
  UserApproverListComponent,
  UserAssignedApproverListComponent,
  UserAssignedPermissionListComponent,
  UserAssignedUserGroupListComponent,
  UserPermissionListComponent,
  UserUserGroupListComponent,
} from '@spartacus/organization/administration/components';
import { ItemExistsModule } from '../../../../feature-libs/organization/administration/components/shared/item-exists.module';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { CdcListComponent } from '../manage-users-list/cdc-list.component';

const cdcUserCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageUsersListComponent: {
      component: CdcListComponent,
      childRoutes: {
        children: [
          {
            path: `:${ROUTE_PARAMS.userCode}`,
            component: CdcUserDetailsComponent,
            data: {
              cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.details' },
            },
            children: [
              {
                path: 'user-groups',
                data: {
                  cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.userGroups' },
                },
                children: [
                  {
                    path: '',
                    component: UserAssignedUserGroupListComponent,
                  },
                  {
                    path: 'assign',
                    component: UserUserGroupListComponent,
                  },
                ],
              },
              {
                path: 'approvers',
                data: {
                  cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.approvers' },
                },
                children: [
                  {
                    path: '',
                    component: UserAssignedApproverListComponent,
                  },
                  {
                    path: 'assign',
                    component: UserApproverListComponent,
                  },
                ],
              },
              {
                path: 'purchase-limits',
                data: {
                  cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.permissions' },
                },
                children: [
                  {
                    path: '',
                    component: UserAssignedPermissionListComponent,
                  },
                  {
                    path: 'assign',
                    component: UserPermissionListComponent,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
};

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ToggleStatusModule,
    ItemExistsModule,
    DisableInfoModule,
    KeyboardFocusModule,
  ],
  providers: [provideDefaultConfig(cdcUserCmsConfig)],
  declarations: [CdcUserDetailsComponent],
  exports: [CdcUserDetailsComponent],
})
export class CdcUserDetailsModule {}
