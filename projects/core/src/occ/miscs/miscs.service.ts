import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { OccConfig } from '../config/occ-config';
import {
  CountryList,
  TitleList,
  CardTypeList,
  RegionList
} from '../../occ/occ-models/index';

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

  loadDeliveryCountries(): Observable<CountryList> {
    return this.http
      .get<CountryList>(this.getEndpoint(ENDPOINT_COUNTRIES))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadTitles(): Observable<TitleList> {
    return this.http
      .get<TitleList>(this.getEndpoint(ENDPOINT_TITLES))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadCardTypes(): Observable<CardTypeList> {
    return this.http
      .get<CardTypeList>(this.getEndpoint(ENDPOINT_CARD_TYPES))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadRegions(countryIsoCode: string): Observable<RegionList> {
    return this.http
      .get<RegionList>(this.getEndpoint(this.buildRegionsUrl(countryIsoCode)))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  private buildRegionsUrl(countryIsoCode: string): string {
    return `${ENDPOINT_COUNTRIES}/${countryIsoCode}/${ENDPOINT_REGIONS}`;
  }
}
