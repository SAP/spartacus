import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@spartacus/core';

import { OrderConfirmationModule } from '../../../checkout';
import { PageLayoutModule } from '../../../cms';
import { OrderConfirmationPageGuard } from '../../../checkout/guards/order-confirmation-page.guard';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

import { OrderConfirmationPageComponent } from './order-confirmation-page.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuards, OrderConfirmationPageGuard],
    component: OrderConfirmationPageComponent,
    data: { pageLabel: 'orderConfirmationPage', cxPath: 'orderConfirmation' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    OrderConfirmationModule,
    PageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderConfirmationPageComponent],
  exports: [OrderConfirmationPageComponent]
})
export class OrderConfirmationPageModule {}
