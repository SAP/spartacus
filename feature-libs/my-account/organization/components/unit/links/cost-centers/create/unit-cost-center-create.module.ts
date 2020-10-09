import { NgModule } from '@angular/core';
import { CostCenterFormModule } from '../../../../cost-center/form/cost-center-form.module';
import { UnitCostCenterCreateComponent } from './unit-cost-center-create.component';

@NgModule({
  imports: [CostCenterFormModule],
  declarations: [UnitCostCenterCreateComponent],
})
export class UnitCostCenterCreateModule {}
