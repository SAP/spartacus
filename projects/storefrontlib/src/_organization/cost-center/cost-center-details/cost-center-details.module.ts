import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ConfirmModalModule } from 'projects/storefrontlib/src/shared/components/modal/confirm-modal/confirm-modal.module';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { SplitViewModule } from '../../../_organization/shared/split-view/split-view.module';
import { CostCenterBudgetListModule } from '../cost-center-budget-list/cost-center-budget-list.module';
import { CostCenterDetailsComponent } from './cost-center-details.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    ConfirmModalModule,

    RouterModule,
    IconModule,

    SplitViewModule,

    CostCenterBudgetListModule,
  ],
  declarations: [CostCenterDetailsComponent],
  exports: [CostCenterDetailsComponent],
  entryComponents: [CostCenterDetailsComponent],
})
export class CostCenterDetailsModule {}
