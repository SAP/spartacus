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

// To be changed to a more optimised params after ticket: C3PO-1076
const FULL_PARAMS = 'fields=FULL';

@Injectable()
export class OccCheckoutAdapter implements CheckoutAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  protected getOrderEndpoint(userId: string): string {
    const orderEndpoint = 'users/' + userId + '/orders';
    return this.occEndpoints.getEndpoint(orderEndpoint);
  }

  public placeOrder(userId: string, cartId: string): Observable<Order> {
    const url = this.getOrderEndpoint(userId);
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
}
