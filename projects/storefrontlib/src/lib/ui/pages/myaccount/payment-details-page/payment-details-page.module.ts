import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PaymentDetailsPageComponent } from './payment-details-page.component';
import { AuthGuard } from '@spartacus/core';
import { CmsPageGuards } from '../../../../cms/guards/cms-page.guard';
import { PageLayoutModule } from '../../../../cms/page-layout/page-layout.module';
import { PaymentMethodsModule } from '../../../../my-account/payment-methods/payment-methods.module';

const routes: Routes = [
  {
    path: 'my-account/payment-details',
    canActivate: [AuthGuard, CmsPageGuards],
    data: { pageLabel: 'payment-details' },
    component: PaymentDetailsPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule,
    PaymentMethodsModule
  ],
  declarations: [PaymentDetailsPageComponent],
  exports: [PaymentDetailsPageComponent]
})
export class PaymentDetailsPageModule {}
