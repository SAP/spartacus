import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Address, DeliveryModeList } from '../../occ/occ-models/occ.models';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { CartDeliveryAdapter } from '../connectors/delivery/cart-delivery.adapter';

@Injectable()
export class OccCartDeliveryAdapter implements CartDeliveryAdapter {
  constructor(
    protected http: HttpClient,
    private occEndpoints: OccEndpointsService
  ) {}

  protected getCartEndpoint(userId: string): string {
    const cartEndpoint = 'users/' + userId + '/carts/';
    return this.occEndpoints.getEndpoint(cartEndpoint);
  }

  public createAddress(
    userId: string,
    cartId: string,
    address: any
  ): Observable<Address> {
    return this.http
      .post<Address>(
        this.getCartEndpoint(userId) + cartId + '/addresses/delivery',
        address,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .pipe(catchError((error: any) => throwError(error.json())));
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
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  public getSupportedModes(
    userId: string,
    cartId: string
  ): Observable<DeliveryModeList> {
    return this.http
      .get<DeliveryModeList>(
        this.getCartEndpoint(userId) + cartId + '/deliverymodes'
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
