import { NgModule } from '@angular/core';
import { CostCenterAssignBudgetsModule } from './components/assign-budgets/cost-center-assign-budgets.module';
import { CostCenterBudgetsModule } from './components/budgets/cost-center-budgets.module';
import { CostCenterCreateModule } from './components/create/cost-center-create.module';
import { CostCenterEditModule } from './components/edit/cost-center-edit.module';
import { CostCenterFormModule } from './components/form/cost-center-form.module';
import { CostCenterListModule } from './components/list/cost-center-list.module';

@NgModule({
  imports: [
    CostCenterAssignBudgetsModule,
    CostCenterBudgetsModule,
    CostCenterCreateModule,
    CostCenterEditModule,
    CostCenterFormModule,
    CostCenterListModule,
  ],
})
export class CostCenterModule {}
