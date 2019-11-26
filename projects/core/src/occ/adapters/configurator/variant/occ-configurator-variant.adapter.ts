import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CART_MODIFICATION_NORMALIZER } from '../../../../cart/connectors/entry/converters';
import { ConfiguratorCommonsAdapter } from '../../../../configurator/commons/connectors/configurator-commons.adapter';
import {
  CONFIGURATION_ADD_TO_CART_SERIALIZER,
  CONFIGURATION_NORMALIZER,
  CONFIGURATION_PRICE_SUMMARY_NORMALIZER,
  CONFIGURATION_SERIALIZER,
} from '../../../../configurator/commons/connectors/converters';
import { CartModification } from '../../../../model/cart.model';
import { ConverterService } from '../../../../util/converter.service';
import { OccEndpointsService } from '../../../services/occ-endpoints.service';
import { Configurator } from './../../../../model/configurator.model';
import { OccConfigurator } from './occ-configurator.models';

@Injectable()
export class OccConfiguratorVariantAdapter
  implements ConfiguratorCommonsAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService,
    protected converterService: ConverterService
  ) {}

  createConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    return this.http
      .get<OccConfigurator.Configuration>(
        this.occEndpointsService.getUrl('createConfiguration', { productCode })
      )
      .pipe(this.converterService.pipeable(CONFIGURATION_NORMALIZER));
  }

  readConfiguration(
    configId: string,
    groupId: string
  ): Observable<Configurator.Configuration> {
    return this.http
      .get<OccConfigurator.Configuration>(
        this.occEndpointsService.getUrl(
          'readConfiguration',
          { configId },
          { groupId: groupId }
        )
      )
      .pipe(this.converterService.pipeable(CONFIGURATION_NORMALIZER));
  }

  updateConfiguration(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    const productCode = configuration.productCode;
    const url = this.occEndpointsService.getUrl('updateConfiguration', {
      productCode,
    });
    const occConfiguration = this.converterService.convert(
      configuration,
      CONFIGURATION_SERIALIZER
    );

    return this.http
      .put(url, occConfiguration)
      .pipe(this.converterService.pipeable(CONFIGURATION_NORMALIZER));
  }

  addToCart(
    parameters: Configurator.AddToCartParameters
  ): Observable<CartModification> {
    const url = this.occEndpointsService.getUrl('addConfigurationToCart', {
      userId: parameters.userId,
      cartId: parameters.cartId,
    });

    const occAddToCartParameters = this.converterService.convert(
      parameters,
      CONFIGURATION_ADD_TO_CART_SERIALIZER
    );

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<CartModification>(url, occAddToCartParameters, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  readPriceSummary(configId: string): Observable<Configurator.Configuration> {
    const url = this.occEndpointsService.getUrl('readPriceSummary', {
      configId,
    });

    //Send empty object as delta prices are not supported yet
    return this.http
      .patch(url, {})
      .pipe(
        this.converterService.pipeable(CONFIGURATION_PRICE_SUMMARY_NORMALIZER)
      );
  }
}
