import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { Order } from '../../../model/order.model';
import { Occ } from '../../occ-models/occ.models';
import { ConverterService } from '../../../util/converter.service';
import { CheckoutAdapter } from '../../../checkout/connectors/checkout/checkout.adapter';
import { ORDER_NORMALIZER } from '../../../checkout/connectors/checkout/converters';
import { CheckoutDetails } from '../../../checkout/models/checkout.model';

// To be changed to a more optimised params after ticket: C3PO-1076
const FULL_PARAMS = 'fields=FULL';
const CHECKOUT_PARAMS = 'deliveryAddress(FULL),deliveryMode,paymentInfo(FULL)';
const ORDERS_ENDPOINT = '/orders';
const CARTS_ENDPOINT = '/carts/';

@Injectable()
export class OccCheckoutAdapter implements CheckoutAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  protected getEndpoint(userId: string, subEndpoint: string): string {
    const orderEndpoint = 'users/' + userId + subEndpoint;
    return this.occEndpoints.getEndpoint(orderEndpoint);
  }

  public placeOrder(userId: string, cartId: string): Observable<Order> {
    const url = this.getEndpoint(userId, ORDERS_ENDPOINT);
    const params = new HttpParams({
      fromString: 'cartId=' + cartId + '&' + FULL_PARAMS,
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<Occ.Order>(url, {}, { headers, params }).pipe(
      catchError((error: any) => throwError(error.json())),
      this.converter.pipeable(ORDER_NORMALIZER)
    );
  }

  loadCheckoutDetails(
    userId: string,
    cartId: string
  ): Observable<CheckoutDetails> {
    const url = this.getEndpoint(userId, CARTS_ENDPOINT) + cartId;
    const params = new HttpParams({
      fromString: `fields=${CHECKOUT_PARAMS}`,
    });
    return this.http
      .get<CheckoutDetails>(url, { params })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
