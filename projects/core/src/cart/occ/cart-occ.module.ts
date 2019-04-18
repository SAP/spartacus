import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OccModule } from '../../occ/occ.module';
import { CartAdapter } from '../connectors/cart/cart.adapter';
import { OccCartAdapter } from './occ-cart.adapter';
import { CartAddressAdapter } from '../connectors/address/cart-address.adapter';
import { OccCartAddressAdapter } from './occ-cart-address.adapter';

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
    }
  ],
})
export class CartOccModule {}
