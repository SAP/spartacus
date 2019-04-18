import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OccModule } from '../../occ/occ.module';
import { CartAdapter } from '../connectors/cart/cart.adapter';
import { OccCartAdapter } from './occ-cart.adapter';
import { CartAddressAdapter } from '../connectors/address/cart-address.adapter';
import { OccCartAddressAdapter } from './occ-cart-address.adapter';
import { CartDeliveryAdapter } from '../connectors/delivery/cart-delivery.adapter';
import { OccCartDeliveryAdapter } from './occ-cart-delivery.adapter';
import { CartEntryAdapter } from '../connectors/entry/cart-entry.adapter';
import { OccCartEntryAdapter } from './occ-cart-entry.adapter';
import { CartPaymentAdapter } from '../connectors/payment/cart-payment.adapter';
import { OccCartPaymentAdapter } from './occ-cart-payment.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule, OccModule],
  providers: [
    {
      provide: CartAdapter,
      useClass: OccCartAdapter,
    },
    {
      provide: CartAddressAdapter,
      useClass: OccCartAddressAdapter,
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
  ],
})
export class CartOccModule {}
