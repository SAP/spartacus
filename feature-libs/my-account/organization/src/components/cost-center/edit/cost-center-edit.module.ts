import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { CostCenterFormModule } from '../form/cost-center-form.module';
import { CostCenterEditComponent } from './cost-center-edit.component';

@NgModule({
  imports: [
    CommonModule,
    CostCenterFormModule,
    ReactiveFormsModule,
    I18nModule,
    SplitViewModule,
    IconModule,
    RouterModule,
  ],
  declarations: [CostCenterEditComponent],
  exports: [CostCenterEditComponent],
})
export class CostCenterEditModule {}
