import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  InterceptorUtil,
  normalizeHttpError,
  Occ,
  OccEndpointsService,
  USE_CLIENT_TOKEN,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import {
  TITLE_NORMALIZER,
  UserProfileAdapter,
  USER_PROFILE_NORMALIZER,
  USER_PROFILE_SERIALIZER,
  USER_SIGN_UP_SERIALIZER,
} from '@spartacus/user/profile/core';
import { Title, UserSignUp } from '@spartacus/user/profile/root';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class OccUserProfileAdapter implements UserProfileAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  update(userId: string, user: User): Observable<unknown> {
    const endpoint = this.occEndpoints.isConfigured('userUpdateProfile')
      ? 'userUpdateProfile'
      : 'user';
    const url = this.occEndpoints.buildUrl(endpoint, { urlParams: { userId } });
    user = this.converter.convert(user, USER_PROFILE_SERIALIZER);
    return this.http
      .patch(url, user)
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
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
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(USER_PROFILE_NORMALIZER)
      );
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
      .pipe(
        catchError((error) => throwError(normalizeHttpError(error))),
        this.converter.pipeable(USER_PROFILE_NORMALIZER)
      );
  }

  requestForgotPasswordEmail(userEmailAddress: string): Observable<unknown> {
    const url = this.occEndpoints.buildUrl('userForgotPassword');
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
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  resetPassword(token: string, newPassword: string): Observable<unknown> {
    const url = this.occEndpoints.buildUrl('userResetPassword');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    return this.http
      .post(url, { token, newPassword }, { headers })
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  updateEmail(
    userId: string,
    currentPassword: string,
    newUserId: string
  ): Observable<unknown> {
    const url = this.occEndpoints.buildUrl('userUpdateLoginId', {
      urlParams: { userId },
    });
    const httpParams: HttpParams = new HttpParams()
      .set('password', currentPassword)
      .set('newLogin', newUserId);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http
      .put(url, httpParams, { headers })
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Observable<unknown> {
    const url = this.occEndpoints.buildUrl('userUpdatePassword', {
      urlParams: { userId },
    });
    const httpParams: HttpParams = new HttpParams()
      .set('old', oldPassword)
      .set('new', newPassword);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http
      .put(url, httpParams, { headers })
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  close(userId: string): Observable<unknown> {
    const endpoint = this.occEndpoints.isConfigured('userCloseAccount')
      ? 'userCloseAccount'
      : 'user';
    const url = this.occEndpoints.buildUrl(endpoint, { urlParams: { userId } });
    return this.http
      .delete<User>(url)
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  loadTitles(): Observable<Title[]> {
    const url = this.occEndpoints.buildUrl('titles');
    return this.http.get<Occ.TitleList>(url).pipe(
      catchError((error) => throwError(normalizeHttpError(error))),
      map((titleList) => titleList.titles ?? []),
      this.converter.pipeableMany(TITLE_NORMALIZER)
    );
  }
}
