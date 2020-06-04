import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CostCenterFormModule } from '../cost-center-form/cost-center-form.module';
import { CostCenterCreateComponent } from './cost-center-create.component';

@NgModule({
  imports: [CommonModule, I18nModule, CostCenterFormModule],
  declarations: [CostCenterCreateComponent],
})
export class CostCenterCreateModule {}
