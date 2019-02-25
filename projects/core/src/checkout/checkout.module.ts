import { NgModule } from '@angular/core';

import { CheckoutService } from './facade/index';
import { CheckoutStoreModule } from './store/checkout-store.module';
import { PageMetaResolver } from '../cms/index';
import { CheckoutPageTitleResolver } from './services/checkout-page-title.resolver';

@NgModule({
  imports: [CheckoutStoreModule],
  providers: [
    CheckoutService,
    {
      provide: PageMetaResolver,
      useExisting: CheckoutPageTitleResolver,
      multi: true
    }
  ]
})
export class CheckoutModule {}
