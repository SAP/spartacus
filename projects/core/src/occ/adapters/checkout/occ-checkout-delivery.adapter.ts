import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
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

  protected setDeliveryAddressEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.getUrl('deliveryAddress', { userId, cartId });
  }

  protected getDeliveryModeEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.getUrl('deliverymode', { userId, cartId });
  }

  protected getDeliveryModesEndpoint(userId: string, cartId: string): string {
    return this.occEndpoints.getUrl('deliverymodes', { userId, cartId });
  }

  public createAddress(
    userId: string,
    cartId: string,
    address: Address
  ): Observable<Address> {
    address = this.converter.convert(address, ADDRESS_SERIALIZER);

    return this.http
      .post<Occ.Address>(
        this.setDeliveryAddressEndpoint(userId, cartId),
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
      this.setDeliveryAddressEndpoint(userId, cartId),
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
      this.getDeliveryModeEndpoint(userId, cartId),
      {},
      {
        params: { deliveryModeId: deliveryModeId },
      }
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
        this.converter.pipeableMany(DELIVERY_MODE_NORMALIZER)
      );
  }
}
