import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { FormNotificationModule } from '../../shared/form/form-notification/form-notification.module';
import { CostCenterFormModule } from '../form/cost-center-form.module';
import { CostCenterEditComponent } from './cost-center-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,

    I18nModule,
    SplitViewModule,
    IconModule,
    FormNotificationModule,

    CostCenterFormModule,
    ReactiveFormsModule,
  ],
  declarations: [CostCenterEditComponent],
  exports: [CostCenterEditComponent],
})
export class CostCenterEditModule {}
