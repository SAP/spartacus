import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PaymentDetailsPageComponent } from './payment-details-page.component';
import { AuthGuard } from '../../../auth/guards/auth.guard';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

const routes: Routes = [
  {
    path: 'my-account/payment-details',
    canActivate: [AuthGuard, CmsPageGuards],
    data: { pageLabel: 'payment-details' },
    component: PaymentDetailsPageComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [PaymentDetailsPageComponent],
  exports: [PaymentDetailsPageComponent]
})
export class PaymentDetailsPageModule {}
