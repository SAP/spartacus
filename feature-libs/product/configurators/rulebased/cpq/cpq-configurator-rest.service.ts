import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap } from 'rxjs/operators';
import { Configurator } from '../core/model/configurator.model';
import { CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT } from '../root/interceptor/cpq-configurator-rest.interceptor';
import {
  CPQ_CONFIGURATOR_NORMALIZER,
  CPQ_CONFIGURATOR_SERIALIZER,
} from './cpq-configurator.converters';
import { Cpq } from './cpq.models';

@Injectable({ providedIn: 'root' })
export class CpqConfiguratorRestService {
  constructor(
    protected http: HttpClient,
    protected converterService: ConverterService
  ) {}

  /**
   * Will create a new runtime configuration for the given product id
   * and read this default configuration from the CPQ system.
   */
  createConfiguration(
    productSystemId: string
  ): Observable<Configurator.Configuration> {
    return this.callConfigurationInit(productSystemId).pipe(
      switchMap((configCreatedResponse) => {
        return this.callConfigurationDisplay(
          configCreatedResponse.configurationId
        ).pipe(
          this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER),
          map((resultConfiguration) => {
            return {
              ...resultConfiguration,
              configId: configCreatedResponse.configurationId,
            };
          })
        );
      })
    );
  }

  readConfiguration(
    configId: string,
    tabId?: string
  ): Observable<Configurator.Configuration> {
    return this.callConfigurationDisplay(configId, tabId).pipe(
      this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER),
      map((resultConfiguration) => {
        return {
          ...resultConfiguration,
          configId: configId,
        };
      })
    );
  }

  /**
   * Will update an attribute of the runtime configuration for the given configuration id and attribute code
   * and read this default configuration from the CPQ system.
   */
  updateAttribute(
    configuration: Configurator.Configuration
  ): Observable<Configurator.Configuration> {
    const updateAttribute: Cpq.UpdateAttribute = this.converterService.convert(
      configuration,
      CPQ_CONFIGURATOR_SERIALIZER
    );
    return this.callUpdateAttribute(updateAttribute).pipe(
      switchMap(() => {
        return this.callConfigurationDisplay(configuration.configId).pipe(
          this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER),
          map((resultConfiguration) => {
            return {
              ...resultConfiguration,
              configId: configuration.configId,
            };
          })
        );
      })
    );
  }

  protected callConfigurationInit(
    productSystemId: string
  ): Observable<Cpq.ConfigurationCreatedResponseData> {
    return this.http.post<Cpq.ConfigurationCreatedResponseData>(
      `${CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT}/api/configuration/v1/configurations`,
      {
        ProductSystemId: productSystemId,
      }
    );
  }

  protected callConfigurationDisplay(
    configId: string,
    tabId?: string
  ): Observable<Cpq.Configuration> {
    let url = `${CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT}/api/configuration/v1/configurations/${configId}/display`;
    if (tabId) {
      url += `?tabId=${tabId}`;
    }
    return this.http.get<Cpq.Configuration>(url);
  }

  protected callUpdateAttribute(
    updateAttribute: Cpq.UpdateAttribute
  ): Observable<any> {
    return this.http.patch<any>(
      `${CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT}/api/configuration/v1/configurations/${updateAttribute.configurationId}/attributes/${updateAttribute.standardAttributeCode}`,
      updateAttribute.changeAttributeValue
    );
  }
}
