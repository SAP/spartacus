import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OccModule } from '../../occ/occ.module';
import { CartAdapter } from '../connectors/cart/cart.adapter';
import { OccCartAdapter } from './occ-cart.adapter';
import { CartDeliveryAdapter } from '../connectors/delivery/cart-delivery.adapter';
import { OccCartDeliveryAdapter } from './occ-cart-delivery.adapter';
import { CartEntryAdapter } from '../connectors/entry/cart-entry.adapter';
import { OccCartEntryAdapter } from './occ-cart-entry.adapter';
import { CartPaymentAdapter } from '../connectors/payment/cart-payment.adapter';
import { OccCartPaymentAdapter } from './occ-cart-payment.adapter';
import { CART_NORMALIZER } from '../connectors/cart/converters';
import { OccCartNormalizer } from './converters/occ-cart-normalizer';
import { SaveForLaterAdapter } from '../connectors/cart/save-for-later.adapter';
import { OccSaveForLaterAdapter } from './occ-save-for-later.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule, OccModule],
  providers: [
    {
      provide: CartAdapter,
      useClass: OccCartAdapter,
    },
    {
      provide: CART_NORMALIZER,
      useClass: OccCartNormalizer,
      multi: true,
    },
    {
      provide: CartDeliveryAdapter,
      useClass: OccCartDeliveryAdapter,
    },
    {
      provide: CartEntryAdapter,
      useClass: OccCartEntryAdapter,
    },
    {
      provide: CartPaymentAdapter,
      useClass: OccCartPaymentAdapter,
    },
    {
      provide: SaveForLaterAdapter,
      useClass: OccSaveForLaterAdapter,
    },
  ],
})
export class CartOccModule {}
