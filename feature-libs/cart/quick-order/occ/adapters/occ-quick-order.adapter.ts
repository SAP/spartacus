import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuickOrderAdapter } from '@spartacus/cart/quick-order/core';
import {
  ConverterService,
  Occ,
  OccEndpointsService,
  OrderEntry,
  Product,
  PRODUCT_NORMALIZER,
} from '@spartacus/core';
import { Observable } from 'rxjs';

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
    entries: OrderEntry[]
  ): Observable<any> {
    return this.http.post<any>(
      this.getQuickOrderAddEndpoint(userId, cartId),
      entries
    );
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

  protected getQuickOrderSearchEndpoint(productCode: string): string {
    return this.occEndpoints.getUrl('product', {
      productCode,
    });
  }
}
