import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { ConfigService } from '../config.service';

const ENDPOINT_DELIVERY_COUNTRIES = 'deliverycountries';
const ENDPOINT_TITLES = 'titles';
const ENDPOINT_CARD_TYPES = 'cardtypes';

@Injectable()
export class OccMiscsService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  protected getEndpoint(endpoint: string) {
    return (
      this.config.server.baseUrl +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      '/' +
      endpoint
    );
  }

  loadDeliveryCountries(): Observable<any> {
    return this.http
      .get(this.getEndpoint(ENDPOINT_DELIVERY_COUNTRIES))
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  loadTitles(): Observable<any> {
    return this.http
      .get(this.getEndpoint(ENDPOINT_TITLES))
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  loadCardTypes(): Observable<any> {
    return this.http
      .get(this.getEndpoint(ENDPOINT_CARD_TYPES))
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
