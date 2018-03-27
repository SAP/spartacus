import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { ConfigService } from '../config.service';

const ENDPOINT_DELIVERY_COUNTRIES = 'deliverycountries';
const ENDPOINT_TITLES = 'titles';

@Injectable()
export class OccMiscsService {
  constructor(private http: HttpClient, private config: ConfigService) {}

  protected getDeliveryCountriesEndpoint() {
    return (
      this.config.server.baseUrl +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      '/' +
      ENDPOINT_DELIVERY_COUNTRIES
    );
  }

  protected getTitlesEndpoint() {
    return (
      this.config.server.baseUrl +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      '/' +
      ENDPOINT_TITLES
    );
  }

  loadDeliveryCountries(): Observable<any> {
    return this.http
      .get(this.getDeliveryCountriesEndpoint())
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  loadTitles(): Observable<any> {
    return this.http
      .get(this.getTitlesEndpoint())
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
