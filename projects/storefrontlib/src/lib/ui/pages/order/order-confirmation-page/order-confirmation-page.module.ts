import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CmsPageGuards } from '../../../../cms/guards/cms-page.guard';
import { OrderConfirmationPageComponent } from './order-confirmation-page.component';
import { OrderConfirmationPageGuard } from '../../../../checkout/guards/order-confirmation-page.guard';
import { AuthGuard } from '@spartacus/core';
import { PageTemplateModule } from '../../../layout/page-template/page-template.module';
import { OutletRefModule } from 'projects/storefrontlib/src/lib/outlet';
import { OrderConfirmationModule } from 'projects/storefrontlib/src/lib/checkout';

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
    RouterModule.forChild(routes),
    PageTemplateModule,
    OutletRefModule,
    OrderConfirmationModule
  ],
  declarations: [OrderConfirmationPageComponent],
  exports: [OrderConfirmationPageComponent]
})
export class OrderConfirmationPageModule {}
