import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from '../../../../cms/guards/cms-page.guard';

import { OrderHistoryPageComponent } from './order-history-page.component';
import { AuthGuard } from '@spartacus/core';
import { PageLayoutModule } from '../../../../cms/page-layout/page-layout.module';
import { OrderHistoryModule } from '../../../../my-account/order/order-history/order-history.module';
import { OutletRefModule } from '../../../../outlet';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuards],
    component: OrderHistoryPageComponent,
    data: { pageLabel: 'orders', cxPath: 'orders' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule,
    OrderHistoryModule,
    OutletRefModule
  ],
  declarations: [OrderHistoryPageComponent],
  exports: [OrderHistoryPageComponent]
})
export class OrderHistoryPageModule {}
