import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { OccConfig } from '@spartacus/core';

const ENDPOINT_COUNTRIES = 'countries';
const ENDPOINT_TITLES = 'titles';
const ENDPOINT_CARD_TYPES = 'cardtypes';
const ENDPOINT_REGIONS = 'regions';

@Injectable()
export class OccMiscsService {
  constructor(private http: HttpClient, private config: OccConfig) {}

  protected getEndpoint(endpoint: string) {
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      '/' +
      endpoint
    );
  }

  loadDeliveryCountries(): Observable<any> {
    return this.http
      .get(this.getEndpoint(ENDPOINT_COUNTRIES))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadTitles(): Observable<any> {
    return this.http
      .get(this.getEndpoint(ENDPOINT_TITLES))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadCardTypes(): Observable<any> {
    return this.http
      .get(this.getEndpoint(ENDPOINT_CARD_TYPES))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadRegions(countryIsoCode: string): Observable<any> {
    return this.http
      .get(this.getEndpoint(this.buildRegionsUrl(countryIsoCode)))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  private buildRegionsUrl(countryIsoCode: string): string {
    return `${ENDPOINT_COUNTRIES}/${countryIsoCode}/${ENDPOINT_REGIONS}`;
  }
}
