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

@Injectable()
export class OccQuickOrderAdapter implements QuickOrderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

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

  protected getQuickOrderCartCreationEndpoint(userId: string): string {
    return this.occEndpoints.buildUrl('createCart', {
      urlParams: {
        userId,
      },
    });
  }

  protected getQuickOrderSearchEndpoint(productCode: string): string {
    return this.occEndpoints.buildUrl('product', {
      urlParams: {
        productCode,
      },
    });
  }
}
