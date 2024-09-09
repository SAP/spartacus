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
import { budgetCmsConfig, budgetTableConfigFactory } from './budget.config';


import { BudgetFormModule } from './form/budget-form.module';

@NgModule({
  imports: [
    SharedOrganizationModule,
    BudgetFormModule,
],
  providers: [
    provideDefaultConfig(budgetCmsConfig),
    provideDefaultConfigFactory(budgetTableConfigFactory),
  ],
})
export class BudgetComponentsModule {}
