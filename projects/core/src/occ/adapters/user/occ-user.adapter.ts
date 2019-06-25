import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title, User, UserSignUp } from '../../../model/misc.model';
import {
  TITLE_NORMALIZER,
  USER_NORMALIZER,
  USER_SERIALIZER,
  USER_SIGN_UP_SERIALIZER,
} from '../../../user/connectors/user/converters';
import { UserAdapter } from '../../../user/connectors/user/user.adapter';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
} from '../../utils/interceptor-util';

const USER_ENDPOINT = 'users/';
const FORGOT_PASSWORD_ENDPOINT = '/forgottenpasswordtokens';
const RESET_PASSWORD_ENDPOINT = '/resetpassword';
const UPDATE_EMAIL_ENDPOINT = '/login';
const UPDATE_PASSWORD_ENDPOINT = '/password';
const TITLES_ENDPOINT = 'titles';

@Injectable()
export class OccUserAdapter implements UserAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  private getUserEndpoint(userId?: string): string {
    const endpoint = userId ? `${USER_ENDPOINT}${userId}` : USER_ENDPOINT;
    return this.occEndpoints.getEndpoint(endpoint);
  }

  load(userId: string): Observable<User> {
    const url = this.getUserEndpoint(userId);
    return this.http
      .get<Occ.User>(url)
      .pipe(this.converter.pipeable(USER_NORMALIZER));
  }

  update(userId: string, user: User): Observable<{}> {
    const url = this.getUserEndpoint(userId);
    user = this.converter.convert(user, USER_SERIALIZER);
    return this.http.patch(url, user);
  }

  register(user: UserSignUp): Observable<User> {
    const url: string = this.getUserEndpoint();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    user = this.converter.convert(user, USER_SIGN_UP_SERIALIZER);

    return this.http
      .post<User>(url, user, { headers })
      .pipe(this.converter.pipeable(USER_NORMALIZER));
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
    return this.http.post(url, httpParams, { headers });
  }

  resetPassword(token: string, newPassword: string): Observable<{}> {
    const url = this.occEndpoints.getEndpoint(RESET_PASSWORD_ENDPOINT);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    return this.http.post(url, { token, newPassword }, { headers });
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
    return this.http.put(url, httpParams, { headers });
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
    return this.http.put(url, httpParams, { headers });
  }

  remove(userId: string): Observable<{}> {
    const url = this.getUserEndpoint(userId);
    return this.http.delete<User>(url);
  }

  loadTitles(): Observable<Title[]> {
    return this.http
      .get<Occ.TitleList>(this.occEndpoints.getEndpoint(TITLES_ENDPOINT))
      .pipe(
        map(titleList => titleList.titles),
        this.converter.pipeableMany(TITLE_NORMALIZER)
      );
  }
}
