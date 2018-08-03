import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicComponentLoaderModule } from '../../../dynamic-component-loader/dynamic-component-loader.module';
import { OrderHistoryPageLayoutModule } from '../../layout/order-history-page-layout/order-history-page-layout.module';

import { OrderHistoryPageComponent } from './order-history-page.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../user/guards';
import { CmsPageGuards } from '../../../cms/guards';

const routes: Routes = [
  {
    path: 'orders',
    canActivate: [AuthGuard, CmsPageGuards],
    component: OrderHistoryPageComponent,
    data: { pageLabel: 'orders' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OrderHistoryPageLayoutModule
    //DynamicComponentLoaderModule.forChild(OrderHistoryPageComponent)
  ],
  declarations: [OrderHistoryPageComponent],
  exports: [OrderHistoryPageComponent]
})
export class OrderHistoryPageModule {}
