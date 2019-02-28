import { NgModule } from '@angular/core';

import { CheckoutService } from './facade/index';
import { CheckoutStoreModule } from './store/checkout-store.module';
import { PageMetaResolver } from '../cms/index';
import { CheckoutPageMetaResolver } from './services/checkout-page-meta.resolver';

@NgModule({
  imports: [CheckoutStoreModule],
  providers: [
    CheckoutService,
    {
      provide: PageMetaResolver,
      useExisting: CheckoutPageMetaResolver,
      multi: true
    }
  ]
})
export class CheckoutModule {}
