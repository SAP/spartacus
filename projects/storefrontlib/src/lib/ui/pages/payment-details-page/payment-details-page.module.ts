import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PaymentDetailsPageComponent } from './payment-details-page.component';
import { AuthGuard } from '@spartacus/core';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { PaymentDetailsPageLayoutModule } from '../../layout/payment-details-page-layout/payment-details-page-layout.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuards],
    data: { pageLabel: 'payment-details', cxPath: 'paymentManagement' },
    component: PaymentDetailsPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    PaymentDetailsPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PaymentDetailsPageComponent],
  exports: [PaymentDetailsPageComponent]
})
export class PaymentDetailsPageModule {}
