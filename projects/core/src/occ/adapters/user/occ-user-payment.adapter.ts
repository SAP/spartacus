import { Injectable } from '@angular/core';
import { UserPaymentAdapter } from '../../../user/connectors/payment/user-payment.adapter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Occ } from '../../occ-models/occ.models';
import { PaymentDetails } from '../../../model/cart.model';
import { ConverterService } from '../../../util/converter.service';
import { PAYMENT_DETAILS_NORMALIZER } from '../../../checkout/connectors/payment/converters';

const USER_ENDPOINT = 'users/';
const PAYMENT_DETAILS_ENDPOINT = '/paymentdetails';

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
}
