import { Injectable } from '@angular/core';
import { UserAccountAdapter } from '../connectors/account/user-account.adapter';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { ConverterService } from '../../util/converter.service';
import { Observable, throwError } from 'rxjs';
import { User } from '../../model/misc.model';
import { catchError } from 'rxjs/operators';
import { USER_NORMALIZER } from '../connectors/details/converters';
import { USER_REGISTER_FORM_SERIALIZER } from '../connectors/account/converters';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
} from '../../occ/utils/interceptor-util';
import { UserRegisterFormData } from '../model/user.model';

const USER_ENDPOINT = 'users/';
const FORGOT_PASSWORD_ENDPOINT = '/forgottenpasswordtokens';
const RESET_PASSWORD_ENDPOINT = '/resetpassword';
const UPDATE_EMAIL_ENDPOINT = '/login';
const UPDATE_PASSWORD_ENDPOINT = '/password';

@Injectable()
export class OccUserAccountAdapter implements UserAccountAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  private getUserEndpoint(userId?: string): string {
    const endpoint = userId ? `${USER_ENDPOINT}${userId}` : USER_ENDPOINT;
    return this.occEndpoints.getEndpoint(endpoint);
  }
  register(user: UserRegisterFormData): Observable<User> {
    const url: string = this.getUserEndpoint();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    user = this.converter.convert(user, USER_REGISTER_FORM_SERIALIZER);

    return this.http.post<User>(url, user, { headers }).pipe(
      catchError((error: any) => throwError(error)),
      this.converter.pipeable(USER_NORMALIZER)
    );
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

  updateEmail(
    userId: string,
    currentPassword: string,
    newUserId: string
  ): Observable<{}> {
    const url = this.getUserEndpoint(userId) + UPDATE_EMAIL_ENDPOINT;
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

  updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Observable<{}> {
    const url = this.getUserEndpoint(userId) + UPDATE_PASSWORD_ENDPOINT;
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

  remove(userId: string): Observable<{}> {
    const url = this.getUserEndpoint(userId);
    return this.http
      .delete<User>(url)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
