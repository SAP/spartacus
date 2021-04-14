import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Cart,
  CART_NORMALIZER,
  ConverterService,
  Occ,
  OccEndpointsService,
  Product,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { QuickOrderAdapter } from '../../core/connectors/quick-order.adapter';
import { QuickOrderEntry } from '../../core/model/quick-order-entry.model';

@Injectable()
export class OccQuickOrderAdapter implements QuickOrderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  addToCart(
    userId: string,
    cartId: string,
    entries: QuickOrderEntry[]
  ): Observable<Cart[]> {
    return this.http.post<Cart[]>(
      this.getQuickOrderAddEndpoint(userId, cartId),
      entries
    );
  }

  createCart(userId: string): Observable<Cart> {
    return this.http
      .post<Occ.Cart>(this.getQuickOrderCartCreationEndpoint(userId), {})
      .pipe(this.converter.pipeable(CART_NORMALIZER));
  }

  search(productCode: string): Observable<Product> {
    return this.http
      .get<Occ.Product>(this.getQuickOrderSearchEndpoint(productCode))
      .pipe(this.converter.pipeable(PRODUCT_NORMALIZER));
  }

  protected getQuickOrderAddEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.getUrl('addToCart', {
      userId,
      cartId,
    });
  }

  protected getQuickOrderCartCreationEndpoint(userId: string): string {
    return this.occEndpoints.getUrl('createCart', {
      userId,
    });
  }

  protected getQuickOrderSearchEndpoint(productCode: string): string {
    return this.occEndpoints.getUrl('product', {
      productCode,
    });
  }
}
