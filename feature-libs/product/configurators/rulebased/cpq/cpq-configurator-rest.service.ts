import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Cpq } from './cpq.models';

@Injectable({ providedIn: 'root' })
export class CpqConfiguratorRestService {
  constructor(protected http: HttpClient) {}

  createConfiguration(): Observable<Cpq.ConfigurationCreatedResponseData> {
    const host: String = 'https://eudev.webcomcpq.com'; // ==> get from token response
    return this.http.get<Cpq.ConfigurationCreatedResponseData>(
      host + '/api/configuration/v1/configurations'
    );
  }
}
