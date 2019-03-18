import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@spartacus/core';

import { OrderConfirmationModule } from '../../../checkout/index';
import { PageLayoutModule } from '../../../cms/index';
import { OutletRefModule } from '../../../outlet/index';
import { OrderConfirmationPageGuard } from '../../../checkout/guards/order-confirmation-page.guard';
import { CmsPageGuard } from '../../../cms/guards/cms-page.guard';

import { OrderConfirmationPageComponent } from './order-confirmation-page.component';

const routes: Routes = [
  // TODO: as soon as the components are moved to CMS driven components we can drop this specific OrderConfirmationPageComponent
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, OrderConfirmationPageGuard],
    component: OrderConfirmationPageComponent,
    data: { pageLabel: 'orderConfirmationPage', cxPath: 'orderConfirmation' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    OrderConfirmationModule,
    PageLayoutModule,
    OutletRefModule,
    RouterModule.forChild(routes)
  ],
  providers: [OrderConfirmationPageGuard],
  declarations: [OrderConfirmationPageComponent],
  exports: [OrderConfirmationPageComponent]
})
export class OrderConfirmationPageModule {}
