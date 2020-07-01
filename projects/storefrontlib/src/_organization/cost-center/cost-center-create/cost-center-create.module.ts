import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { SplitViewModule } from '../../../_organization/shared/split-view/split-view.module';
import { FormNotificationModule } from '../../shared/form/form-notification/form-notification.module';
import { CostCenterFormModule } from '../cost-center-form/cost-center-form.module';
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
    FormNotificationModule,
  ],
  declarations: [CostCenterCreateComponent],
})
export class CostCenterCreateModule {}
