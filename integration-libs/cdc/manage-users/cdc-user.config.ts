/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* copied from core module and changed component names and paths */
import { AuthGuard, CmsConfig } from '@spartacus/core';
import {
  ItemService,
  ListService,
  UserApproverListComponent,
  UserAssignedApproverListComponent,
  UserAssignedPermissionListComponent,
  UserAssignedUserGroupListComponent,
  UserChangePasswordFormComponent,
  UserItemService,
  UserListService,
  UserPermissionListComponent,
  UserUserGroupListComponent,
} from '@spartacus/organization/administration/components';
import { AdminGuard } from '@spartacus/organization/administration/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { UserRoutePageMetaResolver } from '../../../feature-libs/organization/administration/components/user/services/user-route-page-meta.resolver';
import { CdcUserDetailsComponent } from './disable-edit/cdc-user-details.component';
import { CdcListComponent } from './manage-users-button/cdc-list.component';

export const cdcUserCmsConfig: CmsConfig = {
  cmsComponents: {
    ManageUsersListComponent: {
      component: CdcListComponent,
      providers: [
        {
          provide: ListService,
          useExisting: UserListService,
        },
        {
          provide: ItemService,
          useExisting: UserItemService,
        },
      ],
      childRoutes: {
        parent: {
          data: {
            cxPageMeta: {
              breadcrumb: 'orgUser.breadcrumbs.list',
              resolver: UserRoutePageMetaResolver,
            },
          },
        },
        children: [
          {
            path: `:${ROUTE_PARAMS.userCode}`,
            component: CdcUserDetailsComponent,
            data: {
              cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.details' },
            },
            children: [
              {
                path: `change-password`,
                component: UserChangePasswordFormComponent,
              },
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
      guards: [AuthGuard, AdminGuard],
    },
  },
};
