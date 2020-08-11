import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  ConfirmModalModule,
  IconModule,
  SplitViewModule,
} from '@spartacus/storefront';
import { CostCenterDetailsComponent } from './cost-center-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    SplitViewModule,
    IconModule,
    ConfirmModalModule,
  ],
  declarations: [CostCenterDetailsComponent],
  exports: [CostCenterDetailsComponent],
})
export class CostCenterDetailsModule {}
