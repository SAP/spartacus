import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CmsPageGuards } from '../../../cms/guards';
import { AuthGuard } from '../../../user/guards';
import { OrderConfirmationPageLayoutModule } from '../../layout/order-confirmation-page-layout/order-confirmation-page-layout.module';
import { OrderConfirmationPageComponent } from './order-confirmation-page.component';

const routes: Routes = [
  {
    path: 'orderConfirmation',
    canActivate: [AuthGuard, CmsPageGuards],
    data: { pageLabel: 'orderConfirmationPage' },
    component: OrderConfirmationPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    OrderConfirmationPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderConfirmationPageComponent],
  exports: [OrderConfirmationPageComponent]
})
export class OrderConfirmationPageModule {}
