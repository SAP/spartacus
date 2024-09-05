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

import {
  costCenterCmsConfig,
  costCenterTableConfigFactory,
} from './cost-center.config';

import { CostCenterFormModule } from './form/cost-center-form.module';

@NgModule({
  imports: [
    SharedOrganizationModule,
    CostCenterFormModule,
],
  providers: [
    provideDefaultConfig(costCenterCmsConfig),
    provideDefaultConfigFactory(costCenterTableConfigFactory),
  ],
})
export class CostCenterComponentsModule {}
