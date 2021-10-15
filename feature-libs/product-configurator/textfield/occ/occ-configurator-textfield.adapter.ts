import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CartModification,
  CART_MODIFICATION_NORMALIZER,
  ConverterService,
  OccEndpointsService,
} from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfiguratorTextfieldAdapter } from '../core/connectors/configurator-textfield.adapter';
import {
  CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER,
  CONFIGURATION_TEXTFIELD_NORMALIZER,
  CONFIGURATION_TEXTFIELD_UPDATE_CART_ENTRY_SERIALIZER,
} from '../core/connectors/converters';
import { ConfiguratorTextfield } from '../core/model/configurator-textfield.model';
import { OccConfiguratorTextfield } from './occ-configurator-textfield.models';

@Injectable()
export class OccConfiguratorTextfieldAdapter
  implements ConfiguratorTextfieldAdapter
{
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  createConfiguration(
    productCode: string,
    owner: CommonConfigurator.Owner
  ): Observable<ConfiguratorTextfield.Configuration> {
    return this.http
      .get<OccConfiguratorTextfield.Configuration>(
        this.occEndpointsService.buildUrl('createTextfieldConfiguration', {
          urlParams: {
            productCode,
          },
        })
      )
      .pipe(
        this.converterService.pipeable(CONFIGURATION_TEXTFIELD_NORMALIZER),
        map((resultConfiguration) => {
          return {
            ...resultConfiguration,
            owner: owner,
          };
        })
      );
  }

  addToCart(
    parameters: ConfiguratorTextfield.AddToCartParameters
  ): Observable<CartModification> {
    const url = this.occEndpointsService.buildUrl(
      'addTextfieldConfigurationToCart',
      {
        urlParams: {
          userId: parameters.userId,
          cartId: parameters.cartId,
        },
      }
    );

    const occAddToCartParameters = this.converterService.convert(
      parameters,
      CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER
    );

    return this.http
      .post<CartModification>(url, occAddToCartParameters)
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  readConfigurationForCartEntry(
    parameters: CommonConfigurator.ReadConfigurationFromCartEntryParameters
  ): Observable<ConfiguratorTextfield.Configuration> {
    const url = this.occEndpointsService.buildUrl(
      'readTextfieldConfigurationForCartEntry',
      {
        urlParams: {
          userId: parameters.userId,
          cartId: parameters.cartId,
          cartEntryNumber: parameters.cartEntryNumber,
        },
      }
    );

    return this.http.get<ConfiguratorTextfield.Configuration>(url).pipe(
      this.converterService.pipeable(CONFIGURATION_TEXTFIELD_NORMALIZER),
      map((resultConfiguration) => {
        return {
          ...resultConfiguration,
          owner: {
            ...parameters.owner,
          },
        };
      })
    );
  }
  readConfigurationForOrderEntry(
    parameters: CommonConfigurator.ReadConfigurationFromOrderEntryParameters
  ): Observable<ConfiguratorTextfield.Configuration> {
    const url = this.occEndpointsService.buildUrl(
      'readTextfieldConfigurationForOrderEntry',
      {
        urlParams: {
          userId: parameters.userId,
          orderId: parameters.orderId,
          orderEntryNumber: parameters.orderEntryNumber,
        },
      }
    );

    return this.http.get<ConfiguratorTextfield.Configuration>(url).pipe(
      this.converterService.pipeable(CONFIGURATION_TEXTFIELD_NORMALIZER),
      map((resultConfiguration) => {
        return {
          ...resultConfiguration,
          owner: {
            ...parameters.owner,
          },
        };
      })
    );
  }
  updateConfigurationForCartEntry(
    parameters: ConfiguratorTextfield.UpdateCartEntryParameters
  ): Observable<CartModification> {
    const url = this.occEndpointsService.buildUrl(
      'updateTextfieldConfigurationForCartEntry',
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
      CONFIGURATION_TEXTFIELD_UPDATE_CART_ENTRY_SERIALIZER
    );

    return this.http
      .post<CartModification>(url, occUpdateCartEntryParameters)
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }
}
