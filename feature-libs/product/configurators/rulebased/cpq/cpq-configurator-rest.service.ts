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
    return this.cpqAccessStorageService.getCachedCpqAccessData().pipe(
      switchMap((accessData) => {
        return this.initConfiguration(accessData, productSystemId).pipe(
          map((configResonse) => {
            const config: Configurator.Configuration = {
              configId: configResonse.configurationId,
            };
            return config;
          })
        );
      })
    );
  }
  protected initConfiguration(
    accessData: Cpq.AccessData,
    productSystemId: string
  ): Observable<Cpq.ConfigurationCreatedResponseData> {
    return this.http.post<Cpq.ConfigurationCreatedResponseData>(
      accessData.endpoint + '/api/configuration/v1/configurations',
      { ProductSystemId: productSystemId },
      {
        //move to interceptor
        headers: {
          Authorization: 'Bearer ' + accessData.accessToken,
          'x-cpq-disable-cookies': 'true',
        },
      }
    );
  }
}
