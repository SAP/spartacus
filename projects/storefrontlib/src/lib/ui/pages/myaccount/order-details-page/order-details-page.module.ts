import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { OrderDetailsPageComponent } from './order-details-page.component';
import { CmsPageGuards } from '../../../../cms/guards/cms-page.guard';
import { AuthGuard } from '@spartacus/core';
import { PageLayoutModule } from '../../../../cms/page-layout/page-layout.module';
import { OrderDetailsModule } from '../../../../my-account/order/order-details/order-details.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuards],
    component: OrderDetailsPageComponent,
    data: { pageLabel: 'order', cxPath: 'orderDetails' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PageLayoutModule,
    OrderDetailsModule
  ],
  declarations: [OrderDetailsPageComponent],
  exports: [OrderDetailsPageComponent]
})
export class OrderDetailsPageModule {}
