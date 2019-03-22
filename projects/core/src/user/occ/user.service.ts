import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserRegisterFormData } from '../model/user.model';
import { OccConfig } from '../../occ/config/occ-config';
import {
  User,
  Address,
  AddressValidation,
  AddressList,
  PaymentDetailsList
} from '../../occ/occ-models/index';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN
} from '../../occ/utils/interceptor-util';

const USER_ENDPOINT = 'users/';
const ADDRESSES_VERIFICATION_ENDPOINT = '/addresses/verification';
const ADDRESSES_ENDPOINT = '/addresses';
const PAYMENT_DETAILS_ENDPOINT = '/paymentdetails';
const FORGOT_PASSWORD_ENDPOINT = '/forgottenpasswordtokens';
const RESET_PASSWORD_ENDPOINT = '/resetpassword';

@Injectable()
export class OccUserService {
  // some extending from baseservice is not working here...
  constructor(protected http: HttpClient, protected config: OccConfig) {}

  public loadUser(userId: string): Observable<User> {
    const url = this.getUserEndpoint() + userId;
    return this.http
      .get<User>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  verifyAddress(
    userId: string,
    address: Address
  ): Observable<AddressValidation> {
    const url =
      this.getUserEndpoint() + userId + ADDRESSES_VERIFICATION_ENDPOINT;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<AddressValidation>(url, address, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  loadUserAddresses(userId: string): Observable<AddressList> {
    const url = this.getUserEndpoint() + userId + ADDRESSES_ENDPOINT;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .get<AddressList>(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  addUserAddress(userId: string, address: Address): Observable<{}> {
    const url = this.getUserEndpoint() + userId + ADDRESSES_ENDPOINT;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(url, address, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateUserAddress(
    userId: string,
    addressId: string,
    address: Address
  ): Observable<{}> {
    const url =
      this.getUserEndpoint() + userId + ADDRESSES_ENDPOINT + '/' + addressId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .patch(url, address, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  deleteUserAddress(userId: string, addressId: string): Observable<{}> {
    const url =
      this.getUserEndpoint() + userId + ADDRESSES_ENDPOINT + '/' + addressId;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .delete(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  loadUserPaymentMethods(userId: string): Observable<PaymentDetailsList> {
    const url = `${this.getUserEndpoint()}${userId}${PAYMENT_DETAILS_ENDPOINT}?saved=true`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .get<PaymentDetailsList>(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  deleteUserPaymentMethod(
    userId: string,
    paymentMethodID: string
  ): Observable<{}> {
    const url = `${this.getUserEndpoint()}${userId}${PAYMENT_DETAILS_ENDPOINT}/${paymentMethodID}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .delete(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  setDefaultUserPaymentMethod(
    userId: string,
    paymentMethodID: string
  ): Observable<{}> {
    const url = `${this.getUserEndpoint()}${userId}${PAYMENT_DETAILS_ENDPOINT}/${paymentMethodID}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
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

  registerUser(user: UserRegisterFormData): Observable<User> {
    const url: string = this.getUserEndpoint();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    return this.http
      .post<User>(url, user, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  requestForgotPasswordEmail(userEmailAddress: string): Observable<{}> {
    const url = this.getBaseEndPoint() + FORGOT_PASSWORD_ENDPOINT;
    const httpParams: HttpParams = new HttpParams().set(
      'userId',
      userEmailAddress
    );
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    return this.http
      .post(url, httpParams, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  resetPassword(token: string, newPassword: string): Observable<{}> {
    const url = this.getBaseEndPoint() + RESET_PASSWORD_ENDPOINT;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    return this.http
      .post(url, { token, newPassword }, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  protected getUserEndpoint() {
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      '/' +
      USER_ENDPOINT
    );
  }

  protected getBaseEndPoint(): string {
    if (!this.config || !this.config.server) {
      return '';
    }
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite
    );
  }
}
