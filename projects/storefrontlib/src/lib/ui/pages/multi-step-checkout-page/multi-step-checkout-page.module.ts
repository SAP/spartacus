import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards';
import { AuthGuard } from '../../../user/guards';
import { MultiStepCheckoutPageLayoutModule } from '../../layout/multi-step-checkout-page-layout/multi-step-checkout-page-layout.module';
import { MultiStepCheckoutPageComponent } from './multi-step-checkout-page.component';

const routes: Routes = [
  {
    path: 'checkout',
    canActivate: [AuthGuard, CmsPageGuards],
    data: { pageLabel: 'multiStepCheckoutSummaryPage' },
    component: MultiStepCheckoutPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    MultiStepCheckoutPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MultiStepCheckoutPageComponent],
  exports: [MultiStepCheckoutPageComponent]
})
export class MultiStepCheckoutPageModule {}
