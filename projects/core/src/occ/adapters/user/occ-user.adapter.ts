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
/**
 * @deprecated since 3.2, use `OccUserAccountAdapter` and `OccUserProfileAdapter`
 * from the `@spartacus/user` package
 */
@Injectable()
export class OccUserAdapter implements UserAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string): Observable<User> {
    const url = this.occEndpoints.buildUrl('user', { urlParams: { userId } });
    return this.http
      .get<Occ.User>(url)
      .pipe(this.converter.pipeable(USER_NORMALIZER));
  }

  update(userId: string, user: User): Observable<{}> {
    const endpoint = this.occEndpoints.isConfigured('userUpdateProfile')
      ? 'userUpdateProfile'
      : 'user';
    const url = this.occEndpoints.buildUrl(endpoint, { urlParams: { userId } });
    user = this.converter.convert(user, USER_SERIALIZER);
    return this.http.patch(url, user);
  }

  register(user: UserSignUp): Observable<User> {
    const url: string = this.occEndpoints.buildUrl('userRegister');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    user = this.converter.convert(user, USER_SIGN_UP_SERIALIZER);

    return this.http
      .post<User>(url, user, { headers })
      .pipe(this.converter.pipeable(USER_NORMALIZER));
  }

  registerGuest(guid: string, password: string): Observable<User> {
    const url: string = this.occEndpoints.buildUrl('userRegister');
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    const httpParams: HttpParams = new HttpParams()
      .set('guid', guid)
      .set('password', password);

    return this.http
      .post<User>(url, httpParams, { headers })
      .pipe(this.converter.pipeable(USER_NORMALIZER));
  }

  requestForgotPasswordEmail(userEmailAddress: string): Observable<{}> {
    const url = this.occEndpoints.buildUrl('userForgotPassword');
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
    const url = this.occEndpoints.buildUrl('userResetPassword');
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
    const url = this.occEndpoints.buildUrl('userUpdateLoginId', {
      urlParams: { userId },
    });
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
    const url = this.occEndpoints.buildUrl('userUpdatePassword', {
      urlParams: { userId },
    });
    const httpParams: HttpParams = new HttpParams()
      .set('old', oldPassword)
      .set('new', newPassword);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.put(url, httpParams, { headers });
  }

  remove(userId: string): Observable<{}> {
    const endpoint = this.occEndpoints.isConfigured('userCloseAccount')
      ? 'userCloseAccount'
      : 'user';
    const url = this.occEndpoints.buildUrl(endpoint, { urlParams: { userId } });
    return this.http.delete<User>(url);
  }

  loadTitles(): Observable<Title[]> {
    const url = this.occEndpoints.buildUrl('titles');
    return this.http.get<Occ.TitleList>(url).pipe(
      map((titleList) => titleList.titles),
      this.converter.pipeableMany(TITLE_NORMALIZER)
    );
  }
}
