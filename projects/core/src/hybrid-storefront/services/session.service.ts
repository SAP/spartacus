import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Session } from '../../model/hybrid-session';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(
    protected http: HttpClient,
    protected occEndpointsService: OccEndpointsService
  ) {}

  load(): Observable<Session> {
    // TODO configurable endpoints
    return this.http.get<Session>(
      this.occEndpointsService.getRawEndpointValue('sessionEndpoint')
    );
  }

  updateLanguage(languageISOCode: string) {
    const params = new HttpParams().set('languageIsoCode', languageISOCode);

    return this.http.post<any>(
      this.occEndpointsService.getRawEndpointValue('sessionEndpoint'),
      null,
      {
        params,
      }
    );
  }

  updateCurrency(currencyISOCode: string) {
    const params = new HttpParams().set('currencyIsoCode', currencyISOCode);

    return this.http.post<any>(
      this.occEndpointsService.getRawEndpointValue('sessionEndpoint'),
      null,
      {
        params,
      }
    );
  }
}
