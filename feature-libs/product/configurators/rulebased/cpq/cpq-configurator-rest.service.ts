import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap } from 'rxjs/operators';
import { Configurator } from '../core/model/configurator.model';
import { CpqAccessStorageService } from '../occ/cpq/cpq-access-storage.service';
import { CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT } from './cpq-configurator-rest.interceptor';
import { Cpq } from './cpq.models';

@Injectable({ providedIn: 'root' })
export class CpqConfiguratorRestService {
  constructor(
    protected http: HttpClient,
    protected cpqAccessStorageService: CpqAccessStorageService
  ) {}

  createConfiguration(
    productSystemId: string
  ): Observable<Configurator.Configuration> {
    return this.callConfigurationsInit(productSystemId).pipe(
      switchMap((configCreatedResponse) => {
        return this.callConfigurationsDisplay(
          configCreatedResponse.configurationId
        ).pipe(
          map((configResponse) => {
            //todo call normalizers?
            const config: Configurator.Configuration = {
              configId: configCreatedResponse.configurationId,
              productCode: configResponse.productSystemId,
            };
            return config;
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
