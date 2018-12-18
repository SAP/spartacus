import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@spartacus/core';
import { CartNotEmptyGuard } from '../../../cart/guards/cart-not-empty.guard';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { MultiStepCheckoutPageLayoutModule } from '../../layout/multi-step-checkout-page-layout/multi-step-checkout-page-layout.module';
import { MultiStepCheckoutPageComponent } from './multi-step-checkout-page.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuards, CartNotEmptyGuard],
    component: MultiStepCheckoutPageComponent,
    data: { pageLabel: 'multiStepCheckoutSummaryPage', cxPath: 'checkout' }
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
