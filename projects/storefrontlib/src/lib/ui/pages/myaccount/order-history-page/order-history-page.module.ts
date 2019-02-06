import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@spartacus/core';
import { CmsPageGuards } from '../../../../cms/guards/cms-page.guard';

import { OrderHistoryPageComponent } from './order-history-page.component';
import { PageLayoutModule } from '../../../../cms/page-layout/page-layout.module';
import { OrderHistoryModule } from '../../../../my-account/order/order-history/order-history.module';

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
    // As long as we do not have a JSP inlcude component (#1079) and
    // a specific CMS implementation for the adddress book, we stick to this hardcoded
    // `OrderHistoryModule` module.
    OrderHistoryModule
  ],
  declarations: [OrderHistoryPageComponent],
  exports: [OrderHistoryPageComponent]
})
export class OrderHistoryPageModule {}
