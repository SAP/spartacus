import { NgModule } from '@angular/core';

import { CheckoutService } from './facade/index';
import { CheckoutStoreModule } from './store/checkout-store.module';
import { PageTitleResolver } from '../cms';
import { CheckoutPageTitleResolver } from './service/checkout-page-title.resolver';

@NgModule({
  imports: [CheckoutStoreModule],
  providers: [
    CheckoutService,
    {
      provide: PageTitleResolver,
      useExisting: CheckoutPageTitleResolver,
      multi: true
    }
  ]
})
export class CheckoutModule {}
