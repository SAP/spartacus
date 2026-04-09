/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector, inject } from '@angular/core';
import {
  ConverterService,
  InterceptorUtil,
  LoggerService,
  Occ,
  OccEndpointsService,
  USE_CAPTCHA_TOKEN,
  USE_CLIENT_TOKEN,
  tryNormalizeHttpError,
} from '@spartacus/core';
import { CaptchaApiConfig, CaptchaRenderer } from '@spartacus/storefront';
import { User } from '@spartacus/user/account/root';
import {
  TITLE_NORMALIZER,
  USER_PROFILE_NORMALIZER,
  USER_PROFILE_SERIALIZER,
  USER_SIGN_UP_SERIALIZER,
  UserProfileAdapter,
} from '@spartacus/user/profile/core';
import {
  ChineseCity,
  ChineseDistrict,
  Title,
  UserSignUp,
} from '@spartacus/user/profile/root';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };
const CONTENT_TYPE_URLENCODED_HEADER = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

@Injectable()
export class OccUserProfileAdapter implements UserProfileAdapter {
  protected logger = inject(LoggerService);
  protected captchaConfig = inject(CaptchaApiConfig, { optional: true });
  protected injector = inject(Injector, { optional: true });

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
    return this.http.patch(url, user).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  register(user: UserSignUp): Observable<User> {
    const url: string = this.occEndpoints.buildUrl('userRegister');
    let headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    headers = this.appendCaptchaToken(headers);
    user = this.converter.convert(user, USER_SIGN_UP_SERIALIZER);

    return this.http.post<User>(url, user, { headers }).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      }),
      this.converter.pipeable(USER_PROFILE_NORMALIZER)
    );
  }

  registerGuest(guid: string, password: string): Observable<User> {
    const url: string = this.occEndpoints.buildUrl('userRegister');
    let headers = new HttpHeaders({
      ...CONTENT_TYPE_URLENCODED_HEADER,
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    headers = this.appendCaptchaToken(headers);
    const httpParams: HttpParams = new HttpParams()
      .set('guid', guid)
      .set('password', password);

    return this.http.post<User>(url, httpParams, { headers }).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      }),
      this.converter.pipeable(USER_PROFILE_NORMALIZER)
    );
  }

  requestForgotPasswordEmail(userEmailAddress: string): Observable<unknown> {
    const url = this.occEndpoints.buildUrl('userRestoreToken');
    const body = { loginId: userEmailAddress };
    let headers = new HttpHeaders(CONTENT_TYPE_JSON_HEADER);
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    return this.http.post(url, body, { headers }).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  resetPassword(token: string, newPassword: string): Observable<unknown> {
    const url = this.occEndpoints.buildUrl('userResetPassword');
    let headers = new HttpHeaders({
      ...CONTENT_TYPE_JSON_HEADER,
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    return this.http.post(url, { token, newPassword }, { headers }).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  updateEmail(
    userId: string,
    currentPassword: string,
    newUserId: string
  ): Observable<unknown> {
    const url = this.occEndpoints.buildUrl('userUpdateLoginId', {
      urlParams: { userId },
    });
    const body = {
      newLoginId: newUserId,
      password: currentPassword,
    };
    const headers = new HttpHeaders(CONTENT_TYPE_JSON_HEADER);
    return this.http.post(url, body, { headers }).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Observable<unknown> {
    const url = this.occEndpoints.buildUrl('userUpdatePassword', {
      urlParams: { userId },
    });
    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    const headers = new HttpHeaders(CONTENT_TYPE_JSON_HEADER);
    return this.http.post(url, body, { headers }).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  close(userId: string): Observable<unknown> {
    const endpoint = this.occEndpoints.isConfigured('userCloseAccount')
      ? 'userCloseAccount'
      : 'user';
    const url = this.occEndpoints.buildUrl(endpoint, { urlParams: { userId } });
    return this.http.delete<User>(url).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      })
    );
  }

  loadTitles(): Observable<Title[]> {
    const url = this.occEndpoints.buildUrl('titles');
    return this.http.get<Occ.TitleList>(url).pipe(
      catchError((error) => {
        throw tryNormalizeHttpError(error, this.logger);
      }),
      map((titleList) => titleList.titles ?? []),
      this.converter.pipeableMany(TITLE_NORMALIZER)
    );
  }

  getCities(regionIsocode: string): Observable<ChineseCity[]> {
    const url = this.occEndpoints.buildUrl('chineseAddressCities', {
      urlParams: { regionId: regionIsocode },
    });
    return this.http
      .get<{ cities: ChineseCity[] }>(url, {
        params: { fields: 'cities(name,isocode)' },
      })
      .pipe(
        map((res) => res.cities ?? []),
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }

  getDistricts(cityIsocode: string): Observable<ChineseDistrict[]> {
    const url = this.occEndpoints.buildUrl('chineseAddressDistricts', {
      urlParams: { cityId: cityIsocode },
    });
    return this.http
      .get<{ districts: ChineseDistrict[] }>(url, {
        params: { fields: 'districts(name,isocode)' },
      })
      .pipe(
        map((res) => res.districts ?? []),
        catchError((error) => {
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }

  protected appendCaptchaToken(currentHeaders: HttpHeaders): HttpHeaders {
    if (this.injector && this.captchaConfig?.captchaRenderer) {
      const provider = this.injector.get<CaptchaRenderer>(
        this.captchaConfig.captchaRenderer
      );
      const isCaptchaEnabled = provider
        .getCaptchaConfig()
        .subscribe((config) => {
          return config.enabled;
        });

      if (provider?.getToken() && isCaptchaEnabled) {
        return currentHeaders.append(USE_CAPTCHA_TOKEN, provider.getToken());
      }
    }
    return currentHeaders;
  }
}
