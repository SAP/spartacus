import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PaymentDetailsPageComponent } from './payment-details-page.component';
import { AuthGuard } from '../../../auth/guards/auth.guard';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';
import { PaymentMethodsModule } from '../../../my-account/payment-methods/payment-methods.module';

const routes: Routes = [
  {
    path: 'my-account/payment-details',
    canActivate: [AuthGuard, CmsPageGuards],
    data: { pageLabel: 'payment-details' },
    component: PaymentDetailsPageComponent
  }
];

@NgModule({
  imports: [CommonModule, PaymentMethodsModule, RouterModule.forChild(routes)],
  declarations: [PaymentDetailsPageComponent],
  exports: [PaymentDetailsPageComponent]
})
export class PaymentDetailsPageModule {}
