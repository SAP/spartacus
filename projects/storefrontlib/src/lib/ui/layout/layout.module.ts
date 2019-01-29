import { NgModule } from '@angular/core';

import { OutletRefModule } from '../../outlet/index';
import { StyleRefModule } from '../../outlet/style-ref/style-ref.module';

import { LoginPageLayoutModule } from './login-page-layout/login-page-layout.module';
import { MainModule } from './main/main.module';
import { MultiStepCheckoutPageLayoutModule } from './multi-step-checkout-page-layout/multi-step-checkout-page-layout.module';
import { OrderConfirmationPageLayoutModule } from './order-confirmation-page-layout/order-confirmation-page-layout.module';
import { AddressBookPageLayoutModule } from './address-book-page-layout/address-book-page-layout.module';

import { PaymentDetailsPageLayoutModule } from './payment-details-page-layout/payment-details-page-layout.module';
import { RegisterLayoutModule } from './register-layout/register-layout.module';
import { StoreFinderPageLayoutModule } from './store-finder-page-layout/store-finder-page-layout.module';
import { BreakpointService } from './breakpoint/breakpoint.service';
import { ConfigModule, Config } from '@spartacus/core';

import { defaultLayoutConfig } from './config/default-layout-config';
import { LayoutConfig } from './config/layout-config';

const layoutModules = [
  MultiStepCheckoutPageLayoutModule,
  OrderConfirmationPageLayoutModule,
  AddressBookPageLayoutModule,
  PaymentDetailsPageLayoutModule,
  RegisterLayoutModule,
  LoginPageLayoutModule,
  StoreFinderPageLayoutModule,
  OutletRefModule,
  StyleRefModule
];

@NgModule({
  imports: [
    MainModule,
    ...layoutModules,
    ConfigModule.withConfig(defaultLayoutConfig)
  ],
  providers: [
    { provide: LayoutConfig, useExisting: Config },
    BreakpointService
  ],
  exports: [MainModule, ...layoutModules]
})
export class LayoutModule {}
