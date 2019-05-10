import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Occ } from '../../occ/occ-models/occ.models';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, pluck } from 'rxjs/operators';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { CartDeliveryAdapter } from '../connectors/delivery/cart-delivery.adapter';
import { ConverterService } from '../../util/converter.service';
import {
  DELIVERY_ADDRESS_NORMALIZER,
  DELIVERY_ADDRESS_SERIALIZER,
  DELIVERY_MODE_NORMALIZER,
} from '../connectors/delivery/converters';
import { Address } from '../../model/address.model';
import { DeliveryMode } from '../../model/order.model';

@Injectable()
export class OccCartDeliveryAdapter implements CartDeliveryAdapter {
  constructor(
    protected http: HttpClient,
    private occEndpoints: OccEndpointsService,
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
    address = this.converter.convert(address, DELIVERY_ADDRESS_SERIALIZER);

    return this.http
      .post<Occ.Address>(
        this.getCartEndpoint(userId) + cartId + '/addresses/delivery',
        address,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .pipe(
        catchError((error: any) => throwError(error.json())),
        this.converter.pipeable(DELIVERY_ADDRESS_NORMALIZER)
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
      .pipe(catchError((error: any) => throwError(error.json())));
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
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public getMode(userId: string, cartId: string): Observable<any> {
    return this.http
      .get(this.getCartEndpoint(userId) + cartId + '/deliverymode')
      .pipe(
        catchError((error: any) => throwError(error.json())),
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
        catchError((error: any) => throwError(error.json())),
        pluck('deliveryModes'),
        this.converter.pipeableMany(DELIVERY_MODE_NORMALIZER)
      );
  }
}
