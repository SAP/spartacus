import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from '../../../cms/guards/cms-page.guard';

import { OrderHistoryPageLayoutModule } from '../../layout/order-history-page-layout/order-history-page-layout.module';
import { OrderHistoryPageComponent } from './order-history-page.component';
import { AuthGuard } from '@spartacus/core';

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
    OrderHistoryPageLayoutModule
  ],
  declarations: [OrderHistoryPageComponent],
  exports: [OrderHistoryPageComponent]
})
export class OrderHistoryPageModule {}
