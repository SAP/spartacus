import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Cart,
  CART_NORMALIZER,
  ConverterService,
  Occ,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { SavedCartAdapter } from '../../core/connectors/saved-cart.adapter';

@Injectable()
export class OccSavedCartAdapter implements SavedCartAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  loadList(userId: string): Observable<Cart[]> {
    return this.http
      .get<Occ.CartList>(this.getSavedCartListEndpoint(userId))
      .pipe(pluck('carts'), this.converter.pipeableMany(CART_NORMALIZER));
  }

  restoreSavedCart(userId: string, cartId: string): Observable<Cart> {
    return this.http
      .patch<Occ.Cart>(this.getRestoreSavedCartEndpoint(userId, cartId), cartId)
      .pipe(pluck('savedCartData'), this.converter.pipeable(CART_NORMALIZER));
  }

  protected getSavedCartListEndpoint(userId: string): string {
    return this.occEndpoints.getUrl('savedCarts', { userId });
  }

  protected getRestoreSavedCartEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.getUrl('restoreSavedCart', { userId, cartId });
  }
}
