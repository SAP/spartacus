import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeHttpErrorSerializable } from 'projects/core/src/util';
import { Observable, throwError } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';
import { CheckoutDeliveryAdapter } from '../../../checkout/connectors/delivery/checkout-delivery.adapter';
import { DELIVERY_MODE_NORMALIZER } from '../../../checkout/connectors/delivery/converters';
import { Address } from '../../../model/address.model';
import { DeliveryMode } from '../../../model/order.model';
import {
  ADDRESS_NORMALIZER,
  ADDRESS_SERIALIZER,
} from '../../../user/connectors/address/converters';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';

@Injectable()
export class OccCheckoutDeliveryAdapter implements CheckoutDeliveryAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  protected getCartEndpoint(userId: string): string {
    const cartEndpoint = 'users/' + userId + '/carts/';
    return this.occEndpoints.getEndpoint(cartEndpoint);
  }

  public createAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<Address> {
    address = this.converter.convert(address, ADDRESS_SERIALIZER);

    return this.http
      .post<Occ.Address>(
        this.getCartEndpoint(userId) + cartId + '/addresses/delivery',
        address,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .pipe(
        catchError((error: any) => throwError(error)),
        this.converter.pipeable(ADDRESS_NORMALIZER)
      );
  }

  public setAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<any> {
    return this.http
      .put(
        this.getCartEndpoint(userId) + cartId + '/addresses/delivery',
        {},
        {
          params: { addressId: addressId },
        }
      )
      .pipe(catchError((error: any) => throwError(error)));
  }

  public setMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<any> {
    return this.http
      .put(
        this.getCartEndpoint(userId) + cartId + '/deliverymode',
        {},
        {
          params: { deliveryModeId: deliveryModeId },
        }
      )
      .pipe(catchError((error: any) => throwError(error)));
  }

  public getMode(userId: string, cartId: string): Observable<any> {
    return this.http
      .get(this.getCartEndpoint(userId) + cartId + '/deliverymode')
      .pipe(
        catchError((error: any) => throwError(error)),
        this.converter.pipeable(DELIVERY_MODE_NORMALIZER)
      );
  }

  public getSupportedModes(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[]> {
    return this.http
      .get<Occ.DeliveryModeList>(
        this.getCartEndpoint(userId) + cartId + '/deliverymodes'
      )
      .pipe(
        catchError(error => throwError(makeHttpErrorSerializable(error))),
        pluck('deliveryModes'),
        this.converter.pipeableMany(DELIVERY_MODE_NORMALIZER)
      );
  }
}
