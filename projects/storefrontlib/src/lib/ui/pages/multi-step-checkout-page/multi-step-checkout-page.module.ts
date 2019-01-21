import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@spartacus/core';
import { CartNotEmptyGuard } from '../../../cart/guards/cart-not-empty.guard';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { MultiStepCheckoutPageComponent } from './multi-step-checkout-page.component';
import { PageLayoutModule } from '../../../cms/page-layout/page-layout.module';
import { MultiStepCheckoutModule } from '../../../checkout';

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
    RouterModule.forChild(routes),
    PageLayoutModule,
    MultiStepCheckoutModule
  ],
  declarations: [MultiStepCheckoutPageComponent],
  exports: [MultiStepCheckoutPageComponent]
})
export class MultiStepCheckoutPageModule {}
