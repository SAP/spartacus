import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ConfirmModalModule } from 'projects/storefrontlib/src/shared/components/modal/confirm-modal/confirm-modal.module';

import { CostCenterDetailsComponent } from './cost-center-details.component';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { CostCenterBudgetsModule } from '../budgets/cost-center-budgets.module';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    ConfirmModalModule,

    RouterModule,
    IconModule,

    SplitViewModule,

    CostCenterBudgetsModule,
  ],
  declarations: [CostCenterDetailsComponent],
  exports: [CostCenterDetailsComponent],
})
export class CostCenterDetailsModule {}
