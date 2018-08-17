import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConfigService } from '../config.service';

const E2E_ENDPOINT = '/e2econfigurationwebservices/e2econfiguration';

@Injectable()
export class OccE2eConfigurationService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getConfiguration(configurationKey: string): Observable<any> {
    const url = this.getConfigurationEndpoint() + '/' + configurationKey;

    return this.http
      .get(url)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  protected getConfigurationEndpoint() {
    return this.configService.server.baseUrl + E2E_ENDPOINT;
  }
}
