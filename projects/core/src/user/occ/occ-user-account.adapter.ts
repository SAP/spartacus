import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Title, User } from '../../model/misc.model';
import {
  ConsentTemplate,
  ConsentTemplateList,
} from '../../occ/occ-models/additional-occ.models';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
} from '../../occ/utils/interceptor-util';
import { ConverterService } from '../../util/converter.service';
import {
  TITLE_NORMALIZER,
  USER_REGISTER_FORM_SERIALIZER,
} from '../connectors/account/converters';
import { UserAccountAdapter } from '../connectors/account/user-account.adapter';
import { USER_NORMALIZER } from '../connectors/details/converters';
import { UserRegisterFormData } from '../model/user.model';
import { Occ } from '@spartacus/core';

const USER_ENDPOINT = 'users/';
const FORGOT_PASSWORD_ENDPOINT = '/forgottenpasswordtokens';
const RESET_PASSWORD_ENDPOINT = '/resetpassword';
const UPDATE_EMAIL_ENDPOINT = '/login';
const UPDATE_PASSWORD_ENDPOINT = '/password';
const CONSENTS_TEMPLATES_ENDPOINT = '/consenttemplates';
const CONSENTS_ENDPOINT = '/consents';
const TITLES_ENDPOINT = 'titles';

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

  loadTitles(): Observable<Title[]> {
    return this.http
      .get<Occ.TitleList>(this.occEndpoints.getEndpoint(TITLES_ENDPOINT))
      .pipe(
        catchError((error: any) => throwError(error.json())),
        map(titleList => titleList.titles),
        this.converter.pipeableMany(TITLE_NORMALIZER)
      );
  }

  loadConsents(userId: string): Observable<ConsentTemplateList> {
    const url = this.getUserEndpoint() + userId + CONSENTS_TEMPLATES_ENDPOINT;
    const headers = new HttpHeaders({ 'Cache-Control': 'no-cache' });
    return this.http
      .get<ConsentTemplateList>(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  giveConsent(
    userId: string,
    consentTemplateId: string,
    consentTemplateVersion: number
  ): Observable<ConsentTemplate> {
    const url = this.getUserEndpoint() + userId + CONSENTS_ENDPOINT;
    const httpParams = new HttpParams()
      .set('consentTemplateId', consentTemplateId)
      .set('consentTemplateVersion', consentTemplateVersion.toString());
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    });
    return this.http
      .post<ConsentTemplate>(url, httpParams, { headers })
      .pipe(catchError(error => throwError(error)));
  }

  withdrawConsent(userId: string, consentCode: string): Observable<{}> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
    });
    const url =
      this.getUserEndpoint() + userId + CONSENTS_ENDPOINT + '/' + consentCode;
    return this.http.delete(url, { headers });
  }
}
