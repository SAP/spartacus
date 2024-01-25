/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
  RoutingConfig,
} from '@spartacus/core';
import { defaultBudgetRoutingConfig } from './config/default-budget-routing.config';
import { defaultCostCenterRoutingConfig } from './config/default-cost-center-routing.config';
import { defaultOrganizationLayoutConfig } from './config/default-organization-layout.config';
import { defaultPermissionRoutingConfig } from './config/default-permission-routing.config';
import { defaultUnitsRoutingConfig } from './config/default-units-routing.config';
import { defaultUserGroupRoutingConfig } from './config/default-user-group-routing.config';
import { defaultUserRoutingConfig } from './config/default-user-routing.config';
import { ORGANIZATION_ADMINISTRATION_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultOrganizationAdministrationComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [ORGANIZATION_ADMINISTRATION_FEATURE]: {
        cmsComponents: [
          'ManageBudgetsListComponent',
          'ManageCostCentersListComponent',
          'ManagePermissionsListComponent',
          'ManageUnitsListComponent',
          'ManageUsersListComponent',
          'ManageUserGroupsListComponent',
        ],
      },
    },
  };

  return config;
}

@NgModule({
  providers: [
    provideDefaultConfig(defaultOrganizationLayoutConfig),

    provideDefaultConfig(<RoutingConfig>{
      routing: { routes: { organization: { paths: ['organization'] } } },
    }),
    provideDefaultConfig(defaultBudgetRoutingConfig),
    provideDefaultConfig(defaultCostCenterRoutingConfig),
    provideDefaultConfig(defaultPermissionRoutingConfig),
    provideDefaultConfig(defaultUnitsRoutingConfig),
    provideDefaultConfig(defaultUserRoutingConfig),
    provideDefaultConfig(defaultUserGroupRoutingConfig),

    provideDefaultConfigFactory(
      defaultOrganizationAdministrationComponentsConfig
    ),
  ],
})
export class AdministrationRootModule {}
