import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { OrganizationCardModule } from '../../shared';
import { CostCenterFormModule } from '../form/cost-center-form.module';
import { CostCenterEditComponent } from './cost-center-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    IconModule,
    CostCenterFormModule,
    ReactiveFormsModule,
    OrganizationCardModule,
  ],
  declarations: [CostCenterEditComponent],
  exports: [CostCenterEditComponent],
})
export class CostCenterEditModule {}
