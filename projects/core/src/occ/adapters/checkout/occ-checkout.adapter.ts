import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutAdapter } from '../../../checkout/connectors/checkout/checkout.adapter';
import { ORDER_NORMALIZER } from '../../../checkout/connectors/checkout/converters';
import { CheckoutDetails } from '../../../checkout/models/checkout.model';
import { Order } from '../../../model/order.model';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
} from '../../utils/interceptor-util';
import { OCC_USER_ID_ANONYMOUS } from '../../utils/occ-constants';

@Injectable()
export class OccCheckoutAdapter implements CheckoutAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  protected getPlaceOrderEndpoint(
    userId: string,
    cartId: string,
    termsChecked: string
  ): string {
    return this.occEndpoints.getUrl(
      'placeOrder',
      { userId },
      { cartId, termsChecked }
    );
  }

  protected getDeliveryAddressesEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.getUrl('deliveryAddresses', { userId, cartId });
  }

  protected getDeliveryModeEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.getUrl('deliveryMode', { userId, cartId });
  }

  protected getLoadCheckoutDetailsEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.getUrl('loadCheckoutDetails', { userId, cartId });
  }

  public placeOrder(
    userId: string,
    cartId: string,
    termsChecked: boolean
  ): Observable<Order> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    if (userId === OCC_USER_ID_ANONYMOUS) {
      headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    }

    return this.http
      .post<Occ.Order>(
        this.getPlaceOrderEndpoint(userId, cartId, termsChecked.toString()),
        {},
        { headers }
      )
      .pipe(this.converter.pipeable(ORDER_NORMALIZER));
  }

  loadCheckoutDetails(
    userId: string,
    cartId: string
  ): Observable<CheckoutDetails> {
    return this.http.get<CheckoutDetails>(
      this.getLoadCheckoutDetailsEndpoint(userId, cartId)
    );
  }

  clearCheckoutDeliveryAddress(
    userId: string,
    cartId: string
  ): Observable<any> {
    return this.http.delete<any>(
      this.getDeliveryAddressesEndpoint(userId, cartId)
    );
  }

  clearCheckoutDeliveryMode(userId: string, cartId: string): Observable<any> {
    return this.http.delete<any>(this.getDeliveryModeEndpoint(userId, cartId));
  }
}
