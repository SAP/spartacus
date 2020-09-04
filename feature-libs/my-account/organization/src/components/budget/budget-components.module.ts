import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  budgetCmsConfig,
  budgetRoutingConfig,
  budgetTableConfigFactory,
} from './budget.config';

@NgModule({
  imports: [],
  providers: [
    provideDefaultConfig(budgetRoutingConfig),
    provideDefaultConfig(budgetCmsConfig),
    provideDefaultConfigFactory(budgetTableConfigFactory),
  ],
})
export class BudgetComponentsModule {}
