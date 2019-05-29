import { Injectable } from '@angular/core';
import { UserPaymentAdapter } from '../../../user/connectors/payment/user-payment.adapter';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Occ } from '../../occ-models/occ.models';
import { PaymentDetails } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { PAYMENT_DETAILS_NORMALIZER } from '../../../checkout/connectors/payment/converters';
import { Country, Region } from '../../../model/address.model';
import {
  COUNTRY_NORMALIZER,
  REGION_NORMALIZER,
} from '../../../user/connectors/payment/converters';

const USER_ENDPOINT = 'users/';
const PAYMENT_DETAILS_ENDPOINT = '/paymentdetails';
const COUNTRIES_ENDPOINT = 'countries';
const REGIONS_ENDPOINT = 'regions';
const COUNTRIES_TYPE_BILLING = 'BILLING';
const COUNTRIES_TYPE_SHIPPING = 'SHIPPING';

@Injectable()
export class OccUserPaymentAdapter implements UserPaymentAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  private getPaymentDetailsEndpoint(userId: string): string {
    const endpoint = `${USER_ENDPOINT}${userId}${PAYMENT_DETAILS_ENDPOINT}`;
    return this.occEndpoints.getEndpoint(endpoint);
  }

  loadAll(userId: string): Observable<PaymentDetails[]> {
    const url = this.getPaymentDetailsEndpoint(userId) + '?saved=true';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get<Occ.PaymentDetailsList>(url, { headers }).pipe(
      catchError((error: any) => throwError(error)),
      map(methodList => methodList.payments),
      this.converter.pipeableMany(PAYMENT_DETAILS_NORMALIZER)
    );
  }

  delete(userId: string, paymentMethodID: string): Observable<{}> {
    const url = this.getPaymentDetailsEndpoint(userId) + `/${paymentMethodID}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .delete(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  setDefault(userId: string, paymentMethodID: string): Observable<{}> {
    const url = this.getPaymentDetailsEndpoint(userId) + `/${paymentMethodID}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .patch(
        url,
        // TODO: Remove billingAddress property
        { billingAddress: { titleCode: 'mr' }, defaultPayment: true },
        { headers }
      )
      .pipe(catchError((error: any) => throwError(error)));
  }

  loadBillingCountries(): Observable<Country[]> {
    return this.http
      .get<Occ.CountryList>(this.occEndpoints.getEndpoint(COUNTRIES_ENDPOINT), {
        params: new HttpParams().set('type', COUNTRIES_TYPE_BILLING),
      })
      .pipe(
        catchError((error: any) => throwError(error.json())),
        map(countryList => countryList.countries),
        this.converter.pipeableMany(COUNTRY_NORMALIZER)
      );
  }

  loadDeliveryCountries(): Observable<Country[]> {
    return this.http
      .get<Occ.CountryList>(this.occEndpoints.getEndpoint(COUNTRIES_ENDPOINT), {
        params: new HttpParams().set('type', COUNTRIES_TYPE_SHIPPING),
      })
      .pipe(
        catchError((error: any) => throwError(error.json())),
        map(countryList => countryList.countries),
        this.converter.pipeableMany(COUNTRY_NORMALIZER)
      );
  }

  loadRegions(countryIsoCode: string): Observable<Region[]> {
    const regionsEndpoint = `${COUNTRIES_ENDPOINT}/${countryIsoCode}/${REGIONS_ENDPOINT}`;
    return this.http
      .get<Occ.RegionList>(this.occEndpoints.getEndpoint(regionsEndpoint))
      .pipe(
        catchError((error: any) => throwError(error.json())),
        map(regionList => regionList.regions),
        this.converter.pipeableMany(REGION_NORMALIZER)
      );
  }
}
