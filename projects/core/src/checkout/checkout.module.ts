import { NgModule } from '@angular/core';

import { CheckoutService } from './facade/index';
import { CheckoutStoreModule } from './store/checkout-store.module';

@NgModule({
  imports: [CheckoutStoreModule],
  providers: [CheckoutService]
})
export class CheckoutModule {}
