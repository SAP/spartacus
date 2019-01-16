import { NgModule } from '@angular/core';

import { OutletRefModule } from '../../outlet/index';

import { PageTemplateModule } from './page-template/page-template.module';
import { MainModule } from './main/main.module';
import { MultiStepCheckoutPageLayoutModule } from './multi-step-checkout-page-layout/multi-step-checkout-page-layout.module';
import { OrderConfirmationPageLayoutModule } from './order-confirmation-page-layout/order-confirmation-page-layout.module';
import { OrderDetailsPageLayoutModule } from './order-details-page-layout/order-details-page-layout.module';
import { AddressBookPageLayoutModule } from './address-book-page-layout/address-book-page-layout.module';
import { OrderHistoryPageLayoutModule } from './order-history-page-layout/order-history-page-layout.module';
import { PaymentDetailsPageLayoutModule } from './payment-details-page-layout/payment-details-page-layout.module';
import { ProductListPageLayoutModule } from './product-list-page-layout/product-list-page-layout.module';
import { StoreFinderPageLayoutModule } from './store-finder-page-layout/store-finder-page-layout.module';

const layoutModules = [
  PageTemplateModule,

  OrderHistoryPageLayoutModule,
  ProductListPageLayoutModule,
  MultiStepCheckoutPageLayoutModule,
  OrderDetailsPageLayoutModule,
  OrderConfirmationPageLayoutModule,
  AddressBookPageLayoutModule,
  PaymentDetailsPageLayoutModule,
  StoreFinderPageLayoutModule,
  OutletRefModule
];

@NgModule({
  imports: [MainModule, ...layoutModules],
  exports: [MainModule, ...layoutModules]
})
export class LayoutModule {}
