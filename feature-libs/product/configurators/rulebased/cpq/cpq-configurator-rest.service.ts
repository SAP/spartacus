import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map, switchMap } from 'rxjs/operators';
import { Configurator } from '../core/model/configurator.model';
import { CpqAccessStorageService } from '../occ/cpq/cpq-access-storage.service';
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
    return this.cpqAccessStorageService
      .getCachedCpqAccessData()
      .pipe(
        switchMap((accessData) =>
          this.createConfigWithEndpoit(accessData.endpoint, productSystemId)
        )
      );
  }

  protected createConfigWithEndpoit(endpoint: string, productSystemId: string) {
    return this.callConfigurationsInit(endpoint, productSystemId).pipe(
      switchMap((configCreatedResponse) => {
        return this.callConfigurationsDisplay(
          endpoint,
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
    endpoint: string,
    productSystemId: string
  ): Observable<Cpq.ConfigurationCreatedResponseData> {
    return this.http.post<Cpq.ConfigurationCreatedResponseData>(
      `${endpoint}/api/configuration/v1/configurations`,
      {
        ProductSystemId: productSystemId,
      }
    );
  }

  protected callConfigurationsDisplay(
    endpoint: string,
    configId: string
  ): Observable<Cpq.Configuration> {
    return this.http.get<Cpq.Configuration>(
      `${endpoint}/api/configuration/v1/configurations/${configId}/display`
    );
  }
}
