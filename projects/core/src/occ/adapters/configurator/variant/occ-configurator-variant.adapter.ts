import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CART_MODIFICATION_NORMALIZER } from '../../../../cart/connectors/entry/converters';
import { ConfiguratorCommonsAdapter } from '../../../../configurator/commons/connectors/configurator-commons.adapter';
import {
  CONFIGURATION_ADD_TO_CART_SERIALIZER,
  CONFIGURATION_NORMALIZER,
  CONFIGURATION_OVERVIEW_NORMALIZER,
  CONFIGURATION_PRICE_SUMMARY_NORMALIZER,
  CONFIGURATION_SERIALIZER,
  CONFIGURATION_UPDATE_CART_ENTRY_SERIALIZER,
} from '../../../../configurator/commons/connectors/converters';
import { CartModification } from '../../../../model/cart.model';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
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
    owner: GenericConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    const productCode = owner.id;
    return this.http
      .get<OccConfigurator.Configuration>(
        this.occEndpointsService.getUrl('createConfiguration', { productCode })
      )
      .pipe(
        this.converterService.pipeable(CONFIGURATION_NORMALIZER),
        tap((configuration) => {
          configuration.owner = {
            ...owner,
            hasObsoleteState: false,
          };
        })
      );
  }

  readConfiguration(
    configId: string,
    groupId: string,
    configurationOwner: GenericConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return this.http
      .get<OccConfigurator.Configuration>(
        this.occEndpointsService.getUrl(
          'readConfiguration',
          { configId },
          { groupId: groupId }
        )
      )
      .pipe(
        this.converterService.pipeable(CONFIGURATION_NORMALIZER),
        tap((configuration) => {
          configuration.owner = {
            ...configurationOwner,
            hasObsoleteState: false,
          };
        })
      );
  }

  updateConfiguration(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    const configId = configuration.configId;
    const url = this.occEndpointsService.getUrl('updateConfiguration', {
      configId,
    });
    const occConfiguration = this.converterService.convert(
      configuration,
      CONFIGURATION_SERIALIZER
    );

    return this.http.patch(url, occConfiguration).pipe(
      this.converterService.pipeable(CONFIGURATION_NORMALIZER),
      tap(
        (resultConfiguration) =>
          (resultConfiguration.owner = configuration.owner)
      )
    );
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

  readConfigurationForCartEntry(
    parameters: Configurator.ReadConfigurationFromCartEntryParameters
  ): Observable<Configurator.Configuration> {
    const url = this.occEndpointsService.getUrl(
      'readConfigurationForCartEntry',
      {
        userId: parameters.userId,
        cartId: parameters.cartId,
        cartEntryNumber: parameters.cartEntryNumber,
      }
    );

    return this.http.get<Configurator.Configuration>(url).pipe(
      this.converterService.pipeable(CONFIGURATION_NORMALIZER),
      tap((resultConfiguration) => {
        resultConfiguration.owner = {
          ...parameters.owner,
          hasObsoleteState: false,
        };
      })
    );
  }

  updateConfigurationForCartEntry(
    parameters: Configurator.UpdateConfigurationForCartEntryParameters
  ): Observable<CartModification> {
    const url = this.occEndpointsService.getUrl(
      'updateConfigurationForCartEntry',
      {
        userId: parameters.userId,
        cartId: parameters.cartId,
        cartEntryNumber: parameters.cartEntryNumber,
      }
    );

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const occUpdateCartEntryParameters = this.converterService.convert(
      parameters,
      CONFIGURATION_UPDATE_CART_ENTRY_SERIALIZER
    );

    return this.http
      .put<CartModification>(url, occUpdateCartEntryParameters, { headers })
      .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
  }

  readPriceSummary(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    const url = this.occEndpointsService.getUrl('readPriceSummary', {
      configId: configuration.configId,
    });

    return this.http.get(url).pipe(
      this.converterService.pipeable(CONFIGURATION_PRICE_SUMMARY_NORMALIZER),
      tap(
        (resultConfiguration) =>
          (resultConfiguration.owner = configuration.owner)
      )
    );
  }
  getConfigurationOverview(
    configId: string
  ): Observable<Configurator.Overview> {
    const url = this.occEndpointsService.getUrl('getConfigurationOverview', {
      configId,
    });

    return this.http
      .get(url)
      .pipe(this.converterService.pipeable(CONFIGURATION_OVERVIEW_NORMALIZER));
  }
}
