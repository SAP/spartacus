import { NgModule } from '@angular/core';
import { CostCenterComponentsModule } from './cost-center/cost-center-components.module';
import { UserGroupComponentsModule } from './user-group/user-group-components.module';
import { BudgetComponentsModule } from './budget/budget-components.module';

@NgModule({
  imports: [
    CostCenterComponentsModule,
    UserGroupComponentsModule,
    BudgetComponentsModule,
  ],
})
export class OrganizationComponentsModule {}
