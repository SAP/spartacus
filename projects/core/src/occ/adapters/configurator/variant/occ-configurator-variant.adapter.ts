import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfiguratorCommonsAdapter } from '../../../../configurator/commons/connectors/configurator-commons.adapter';
import {
  CONFIGURATION_NORMALIZER,
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
    userId: string,
    cartId: string,
    productCode: string,
    quantity: number = 1,
    configId: string
  ): Observable<Configurator.Configuration> {
    console.log('Adapter-Level: ' + cartId);
    console.log('Adapter-Level: ' + userId);
    console.log('Adapter-Level: ' + quantity);
    console.log('Adapter-Level: ' + productCode);

    const url = this.occEndpointsService.getUrl(
      'addConfigurationToCart',
      {
        userId,
        cartId,
      }
      //{ code: productCode, qty: quantity }
    );

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const occConfigOrderEntry = JSON.stringify({
      configId: configId,
      quantity: quantity,
      product: { code: productCode },
    });

    return this.http
      .post<CartModification>(url, occConfigOrderEntry, { headers })
      .pipe(
        map(() =>
          of({
            configId: 'aasdf',
            complete: true,
            groups: [],
          })
        ),
        this.converterService.pipeable(CONFIGURATION_NORMALIZER)
      );
  }
}
