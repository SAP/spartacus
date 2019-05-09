import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
Occ
} from '../../occ/occ-models/occ.models';
import { OccEndpointsService } from '../services/occ-endpoints.service';

const ENDPOINT_COUNTRIES = 'countries';
const ENDPOINT_TITLES = 'titles';
const ENDPOINT_CARD_TYPES = 'cardtypes';
const ENDPOINT_REGIONS = 'regions';
const COUNTRIES_TYPE_SHIPPING = 'SHIPPING';
const COUNTRIES_TYPE_BILLING = 'BILLING';

@Injectable({
  providedIn: 'root',
})
export class OccMiscsService {
  constructor(
    private http: HttpClient,
    private occEndpoints: OccEndpointsService
  ) {}

  loadDeliveryCountries(): Observable<Occ.CountryList> {
    return this.http
      .get<Occ.CountryList>(this.occEndpoints.getEndpoint(ENDPOINT_COUNTRIES), {
        params: new HttpParams().set('type', COUNTRIES_TYPE_SHIPPING),
      })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadBillingCountries(): Observable<Occ.CountryList> {
    return this.http
      .get<Occ.CountryList>(this.occEndpoints.getEndpoint(ENDPOINT_COUNTRIES), {
        params: new HttpParams().set('type', COUNTRIES_TYPE_BILLING),
      })
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadTitles(): Observable<Occ.TitleList> {
    return this.http
      .get<Occ.TitleList>(this.occEndpoints.getEndpoint(ENDPOINT_TITLES))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadCardTypes(): Observable<Occ.CardTypeList> {
    return this.http
      .get<Occ.CardTypeList>(this.occEndpoints.getEndpoint(ENDPOINT_CARD_TYPES))
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  loadRegions(countryIsoCode: string): Observable<Occ.RegionList> {
    return this.http
      .get<Occ.RegionList>(
        this.occEndpoints.getEndpoint(this.buildRegionsUrl(countryIsoCode))
      )
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  private buildRegionsUrl(countryIsoCode: string): string {
    return `${ENDPOINT_COUNTRIES}/${countryIsoCode}/${ENDPOINT_REGIONS}`;
  }
}
