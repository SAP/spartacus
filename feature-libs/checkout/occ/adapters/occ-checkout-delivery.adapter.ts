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

  protected getCreateDeliveryAddressEndpoint(
    userId: string,
    cartId: string
  ): string {
    return this.occEndpoints.buildUrl('createDeliveryAddress', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }

  protected getSetDeliveryAddressEndpoint(
    userId: string,
    cartId: string,
    addressId?: string
  ): string {
    return this.occEndpoints.buildUrl('setDeliveryAddress', {
      urlParams: { userId, cartId },
      queryParams: { addressId },
    });
  }

  protected getDeliveryModeEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.buildUrl('deliveryMode', {
      urlParams: {
        userId,
        cartId,
      },
    });
  }

  protected getSetDeliveryModeEndpoint(
    userId: string,
    cartId: string,
    deliveryModeId?: string
  ): string {
    return this.occEndpoints.buildUrl('setDeliveryMode', {
      urlParams: {
        userId,
        cartId,
      },
      queryParams: { deliveryModeId },
    });
  }

  protected getDeliveryModesEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.buildUrl('deliveryModes', {
      urlParams: { userId, cartId },
    });
  }

  public createAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<Address> {
    address = this.converter.convert(address, ADDRESS_SERIALIZER);

    return this.http
      .post<Occ.Address>(
        this.getCreateDeliveryAddressEndpoint(userId, cartId),
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
      this.getSetDeliveryAddressEndpoint(userId, cartId, addressId),
      {}
    );
  }

  public setMode(
    userId: string,
    cartId: string,
    deliveryModeId: string
  ): Observable<any> {
    return this.http.put(
      this.getSetDeliveryModeEndpoint(userId, cartId, deliveryModeId),
      {}
    );
  }

  public getMode(userId: string, cartId: string): Observable<any> {
    return this.http
      .get(this.getDeliveryModeEndpoint(userId, cartId))
      .pipe(this.converter.pipeable(DELIVERY_MODE_NORMALIZER));
  }

  public getSupportedModes(
    userId: string,
    cartId: string
  ): Observable<DeliveryMode[]> {
    return this.http
      .get<Occ.DeliveryModeList>(this.getDeliveryModesEndpoint(userId, cartId))
      .pipe(
        pluck('deliveryModes'),
        map((modes) => modes ?? []),
        this.converter.pipeableMany(DELIVERY_MODE_NORMALIZER)
      );
  }
}
