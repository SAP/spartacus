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

  saveCart(
    userId: string,
    cartId: string,
    saveCartName?: string,
    saveCartDescription?: string
  ): Observable<Cart> {
    return this.http
      .patch<Occ.Cart>(
        this.getSaveCartEndpoint(
          userId,
          cartId,
          saveCartName,
          saveCartDescription
        ),
        cartId
      )
      .pipe(pluck('savedCartData'), this.converter.pipeable(CART_NORMALIZER));
  }

  protected getSaveCartEndpoint(
    userId: string,
    cartId: string,
    saveCartName: string,
    saveCartDescription: string
  ): string {
    return this.occEndpoints.getUrl('saveCart', {
      userId,
      cartId,
      saveCartName,
      saveCartDescription,
    });
  }
}
