import { NgModule } from '@angular/core';
import { PageMetaResolver } from '../cms/index';
import { CheckoutService } from './facade/index';
import { CartPageMetaResolver } from './services/cart-page-meta.resolver';
import { CheckoutPageMetaResolver } from './services/checkout-page-meta.resolver';
import { CheckoutStoreModule } from './store/checkout-store.module';

@NgModule({
  imports: [CheckoutStoreModule],
  providers: [
    CheckoutService,
    {
      provide: PageMetaResolver,
      useExisting: CartPageMetaResolver,
      multi: true,
    },
    {
      provide: PageMetaResolver,
      useExisting: CheckoutPageMetaResolver,
      multi: true,
    },
  ],
})
export class CheckoutModule {}
