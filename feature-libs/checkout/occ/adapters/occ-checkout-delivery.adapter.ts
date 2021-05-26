import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CheckoutDeliveryAdapter,
  DELIVERY_MODE_NORMALIZER,
} from '@spartacus/checkout/core';
import {
  Address,
  ADDRESS_NORMALIZER,
  ADDRESS_SERIALIZER,
  ConverterService,
  DeliveryMode,
  Occ,
  OccEndpointsService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

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
      .pipe(this.converter.pipeable(ADDRESS_NORMALIZER));
  }

  public setAddress(
    userId: string,
    cartId: string,
    addressId: string
  ): Observable<any> {
    return this.http.put(
      this.occEndpoints.getUrl('setDeliveryAddress', { userId, cartId }),
      {},
      {
        params: { addressId: addressId },
      }
    );
  }

  public setMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<any> {
    return this.http.put(
      this.getCartEndpoint(userId) + cartId + '/deliverymode',
      {},
      {
        params: { deliveryModeId: deliveryModeId },
      }
    );
  }

  public getMode(userId: string, cartId: string): Observable<any> {
    return this.http
      .get(this.getCartEndpoint(userId) + cartId + '/deliverymode')
      .pipe(this.converter.pipeable(DELIVERY_MODE_NORMALIZER));
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
        pluck('deliveryModes'),
        map((modes) => modes ?? []),
        this.converter.pipeableMany(DELIVERY_MODE_NORMALIZER)
      );
  }
}
