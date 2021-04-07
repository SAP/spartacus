import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuickOrderAdapter } from '@spartacus/cart/quick-order/core';
import {
  ConverterService,
  OccEndpointsService,
  OrderEntry,
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
    return this.http.patch<any>(
      this.getQuickOrderEndpoint(userId, cartId, entries),
      cartId
    );
  }

  protected getQuickOrderEndpoint(
    userId: string,
    cartId: string,
    entries: OrderEntry[]
  ): string {
    return this.occEndpoints.getUrl('addToCart', {
      userId,
      cartId,
      entries,
    });
  }
}
