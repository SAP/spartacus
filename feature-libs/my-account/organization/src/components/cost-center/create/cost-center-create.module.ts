import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { CostCenterFormModule } from '../form/cost-center-form.module';
import { CostCenterCreateComponent } from './cost-center-create.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    CostCenterFormModule,
    RouterModule,
    IconModule,

    SplitViewModule,
    ReactiveFormsModule,
  ],
  declarations: [CostCenterCreateComponent],
})
export class CostCenterCreateModule {}
