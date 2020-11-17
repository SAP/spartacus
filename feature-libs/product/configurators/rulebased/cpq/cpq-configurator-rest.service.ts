import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap } from 'rxjs/operators';
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
  ): Observable<Cpq.ConfigurationCreatedResponseData> {
    return this.cpqAccessStorageService.getCachedCpqAccessData().pipe(
      switchMap((data) => {
        return this.http.post<Cpq.ConfigurationCreatedResponseData>(
          data.endpoint + '/api/configuration/v1/configurations',
          { ProductSystemId: productSystemId },
          {
            //move to interceptor
            headers: {
              Authorization: 'Bearer ' + data.accessToken,
              'x-cpq-disable-cookies': 'true',
            },
          }
        );
      })
    );
  }
}
