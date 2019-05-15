import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
} from '../../occ/utils/interceptor-util';
import { UserRegisterFormData } from '../model/user.model';
import { User } from '../../model/misc.model';
import { Occ } from '../../occ/occ-models/occ.models';

const USER_ENDPOINT = 'users/';
const PAYMENT_DETAILS_ENDPOINT = '/paymentdetails';
const FORGOT_PASSWORD_ENDPOINT = '/forgottenpasswordtokens';
const RESET_PASSWORD_ENDPOINT = '/resetpassword';
const UPDATE_EMAIL_ENDPOINT = '/login';
const UPDATE_PASSWORD_ENDPOINT = '/password';

@Injectable()
export class OccUserService {
  // some extending from baseservice is not working here...
  constructor(
    protected http: HttpClient,
    private occEndpoints: OccEndpointsService
  ) {}

  loadUserPaymentMethods(userId: string): Observable<Occ.PaymentDetailsList> {
    const url = `${this.getUserEndpoint()}${userId}${PAYMENT_DETAILS_ENDPOINT}?saved=true`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .get<Occ.PaymentDetailsList>(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  deleteUserPaymentMethod(
    userId: string,
    paymentMethodID: string
  ): Observable<{}> {
    const url = `${this.getUserEndpoint()}${userId}${PAYMENT_DETAILS_ENDPOINT}/${paymentMethodID}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
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

  registerUser(user: UserRegisterFormData): Observable<User> {
    const url: string = this.getUserEndpoint();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    return this.http
      .post<User>(url, user, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  requestForgotPasswordEmail(userEmailAddress: string): Observable<{}> {
    const url = this.occEndpoints.getEndpoint(FORGOT_PASSWORD_ENDPOINT);
    const httpParams: HttpParams = new HttpParams().set(
      'userId',
      userEmailAddress
    );
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    return this.http
      .post(url, httpParams, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  resetPassword(token: string, newPassword: string): Observable<{}> {
    const url = this.occEndpoints.getEndpoint(RESET_PASSWORD_ENDPOINT);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    return this.http
      .post(url, { token, newPassword }, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  removeUser(userId: string): Observable<{}> {
    const url = this.getUserEndpoint() + userId;
    return this.http
      .delete<User>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  updateEmail(
    userId: string,
    currentPassword: string,
    newUserId: string
  ): Observable<{}> {
    const url = this.getUserEndpoint() + userId + UPDATE_EMAIL_ENDPOINT;
    const httpParams: HttpParams = new HttpParams()
      .set('password', currentPassword)
      .set('newLogin', newUserId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http
      .put(url, httpParams, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  protected getUserEndpoint(): string {
    return this.occEndpoints.getEndpoint(USER_ENDPOINT);
  }

  updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Observable<{}> {
    const url = this.getUserEndpoint() + userId + UPDATE_PASSWORD_ENDPOINT;
    const httpParams: HttpParams = new HttpParams()
      .set('old', oldPassword)
      .set('new', newPassword);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http
      .put(url, httpParams, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }
}
