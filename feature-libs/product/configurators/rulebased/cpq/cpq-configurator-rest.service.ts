import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConverterService } from '@spartacus/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap } from 'rxjs/operators';
import { Configurator } from '../core/model/configurator.model';
import { CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT } from '../root/interceptor/cpq-configurator-rest.interceptor';
import { Cpq } from './cpq.models';
import { CPQ_CONFIGURATOR_NORMALIZER } from './cpq-configurator.converters';

@Injectable({ providedIn: 'root' })
export class CpqConfiguratorRestService {
  constructor(
    protected http: HttpClient,
    protected converterService: ConverterService
  ) {}

  createConfiguration(
    productSystemId: string
  ): Observable<Configurator.Configuration> {
    return this.callConfigurationsInit(productSystemId).pipe(
      switchMap((configCreatedResponse) => {
        return this.callConfigurationsDisplay(
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

  protected callConfigurationsInit(
    productSystemId: string
  ): Observable<Cpq.ConfigurationCreatedResponseData> {
    return this.http.post<Cpq.ConfigurationCreatedResponseData>(
      `${CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT}/api/configuration/v1/configurations`,
      {
        ProductSystemId: productSystemId,
      }
    );
  }

  protected callConfigurationsDisplay(
    configId: string
  ): Observable<Cpq.Configuration> {
    return this.http.get<Cpq.Configuration>(
      `${CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT}/api/configuration/v1/configurations/${configId}/display`
    );
  }
}
