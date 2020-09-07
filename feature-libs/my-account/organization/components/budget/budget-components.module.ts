import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { SharedOrganizationModule } from '../shared/shared-organization.module';
import {
  budgetCmsConfig,
  budgetRoutingConfig,
  budgetTableConfigFactory,
} from './budget.config';

@NgModule({
  imports: [SharedOrganizationModule],
  providers: [
    provideDefaultConfig(budgetRoutingConfig),
    provideDefaultConfig(budgetCmsConfig),
    provideDefaultConfigFactory(budgetTableConfigFactory),
  ],
})
export class BudgetComponentsModule {}
