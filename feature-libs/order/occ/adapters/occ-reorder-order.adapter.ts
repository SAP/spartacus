import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartModificationList } from '@spartacus/cart/base/root';
import {
  ConverterService,
  normalizeHttpError,
  OccEndpointsService,
} from '@spartacus/core';
import { REORDER_ORDER_NORMALIZER } from '@spartacus/order/root';
import { ReorderOrderAdapter } from '../../core/connectors/reorder-order.adapter';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OccReorderOrderAdapter implements ReorderOrderAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  reorder(orderId: string, userId: string): Observable<CartModificationList> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post(this.getReorderOrderEndpoint(orderId, userId), {}, { headers })
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(REORDER_ORDER_NORMALIZER)
      );
  }

  protected getReorderOrderEndpoint(orderCode: string, userId: string): string {
    return this.occEndpoints.buildUrl('reorder', {
      urlParams: {
        userId,
      },
      queryParams: { orderCode },
    });
  }
}
