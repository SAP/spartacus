import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CartModification,
  CART_MODIFICATION_NORMALIZER,
  ConverterService,
  OccEndpointsService,
} from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
  CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
} from './converters/cpq-configurator-occ.converters';

@Injectable({ providedIn: 'root' })
export class CpqConfiguratorOccService {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  addToCart(
    parameters: Configurator.AddToCartParameters
  ): Observable<CartModification> {
    const url = this.occEndpointsService.buildUrl('addCpqConfigurationToCart', {
      urlParams: {
        userId: parameters.userId,
        cartId: parameters.cartId,
      },
    });

    const occAddToCartParameters = this.converterService.convert(
      parameters,
      CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER
    );

    return this.http
      .post<CartModification>(url, occAddToCartParameters)
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  updateCartEntry(
    parameters: Configurator.UpdateConfigurationForCartEntryParameters
  ): Observable<CartModification> {
    const url = this.occEndpointsService.buildUrl(
      'updateCpqConfigurationForCartEntry',
      {
        urlParams: {
          userId: parameters.userId,
          cartId: parameters.cartId,
          cartEntryNumber: parameters.cartEntryNumber,
        },
      }
    );

    const occUpdateCartEntryParameters = this.converterService.convert(
      parameters,
      CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER
    );

    return this.http
      .put<CartModification>(url, occUpdateCartEntryParameters)
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  getConfigIdForCartEntry(
    parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<string> {
    const url = this.occEndpointsService.buildUrl(
      'readCpqConfigurationForCartEntry',
      {
        urlParams: {
          userId: parameters.userId,
          cartId: parameters.cartId,
          cartEntryNumber: parameters.cartEntryNumber,
        },
      }
    );

    return this.http.get<{ configId: string }>(url).pipe(
      map((response) => {
        return response.configId;
      })
    );
  }

  getConfigIdForOrderEntry(
    parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters
  ): Observable<string> {
    const url = this.occEndpointsService.buildUrl(
      'readCpqConfigurationForOrderEntry',
      {
        urlParams: {
          userId: parameters.userId,
          orderId: parameters.orderId,
          orderEntryNumber: parameters.orderEntryNumber,
        },
      }
    );

    return this.http.get<{ configId: string }>(url).pipe(
      map((response) => {
        return response.configId;
      })
    );
  }
}
