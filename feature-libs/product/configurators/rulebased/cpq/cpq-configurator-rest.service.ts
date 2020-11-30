import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap } from 'rxjs/operators';
import { Configurator } from '../core/model/configurator.model';
import { CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT } from '../root/interceptor/cpq-configurator-rest.interceptor';
import { CPQ_CONFIGURATOR_NORMALIZER } from './cpq-configurator.converters';
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
    _groupId: string // not yet implemented
  ): Observable<Configurator.Configuration> {
    return this.callConfigurationDisplay(configId).pipe(
      this.converterService.pipeable(CPQ_CONFIGURATOR_NORMALIZER),
      map((resultConfiguration) => {
        return {
          ...resultConfiguration,
          configId: configId,
        };
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
    configId: string
  ): Observable<Cpq.Configuration> {
    return this.http.get<Cpq.Configuration>(
      `${CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT}/api/configuration/v1/configurations/${configId}/display`
    );
  }
}
