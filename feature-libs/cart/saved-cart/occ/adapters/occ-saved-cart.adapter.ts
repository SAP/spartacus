import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SavedCartAdapter } from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  CART_NORMALIZER,
  ConverterService,
  Occ,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable()
export class OccSavedCartAdapter implements SavedCartAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string, cartId: string): Observable<Cart> {
    return this.http
      .get<Occ.Cart>(this.getSavedCartEndpoint(userId, cartId))
      .pipe(pluck('savedCartData'), this.converter.pipeable(CART_NORMALIZER));
  }

  loadList(userId: string): Observable<Cart[]> {
    return this.http
      .get<Occ.CartList>(this.getSavedCartListEndpoint(userId))
      .pipe(
        pluck('carts') as any,
        this.converter.pipeableMany(CART_NORMALIZER)
      );
  }

  restoreSavedCart(userId: string, cartId: string): Observable<Cart> {
    return this.http
      .patch<Occ.Cart>(this.getRestoreSavedCartEndpoint(userId, cartId), cartId)
      .pipe(pluck('savedCartData'), this.converter.pipeable(CART_NORMALIZER));
  }

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
    saveCartName: string | undefined,
    saveCartDescription: string | undefined
  ): string {
    return this.occEndpoints.getUrl('saveCart', {
      userId,
      cartId,
      saveCartName,
      saveCartDescription,
    });
  }

  protected getSavedCartEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.getUrl('savedCart', { userId, cartId });
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
