import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

import { OrderHistoryPageLayoutModule } from '../../layout/order-history-page-layout/order-history-page-layout.module';
import { OrderHistoryPageComponent } from './order-history-page.component';
import { AuthGuard } from '@spartacus/core';

const routes: Routes = [
  {
    path: 'my-account/orders',
    canActivate: [AuthGuard, CmsPageGuards],
    component: OrderHistoryPageComponent,
    data: { pageLabel: 'orders', breadcrumb: '/ My-Account / Orders' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OrderHistoryPageLayoutModule
  ],
  declarations: [OrderHistoryPageComponent],
  exports: [OrderHistoryPageComponent]
})
export class OrderHistoryPageModule {}
