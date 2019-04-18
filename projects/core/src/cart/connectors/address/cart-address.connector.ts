import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Address } from '../../../occ/occ-models/occ.models';
import { CartAddressAdapter } from './cart-address.adapter';

@Injectable({
  providedIn: 'root',
})
export class CartAddressConnector {
  constructor(private adapter: CartAddressAdapter) {}

  public createAddressOnCart(
    userId: string,
    cartId: string,
    address: any
  ): Observable<Address> {
    return this.adapter.createAddressOnCart(userId, cartId, address);
  }
}
