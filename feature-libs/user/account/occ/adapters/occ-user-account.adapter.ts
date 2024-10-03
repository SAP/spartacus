/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ConverterService,
  InterceptorUtil,
  LoggerService,
  Occ,
  OccEndpointsService,
  USE_CLIENT_TOKEN,
  normalizeHttpError,
} from '@spartacus/core';
import {
  LOGIN_FORM_SERIALIZER,
  USER_ACCOUNT_NORMALIZER,
  UserAccountAdapter,
  VERIFICATION_TOKEN_NORMALIZER,
} from '@spartacus/user/account/core';
import {
  User,
  VerificationToken,
  VerificationTokenCreation,
} from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

const CONTENT_TYPE_JSON_HEADER = { 'Content-Type': 'application/json' };

@Injectable()
export class OccUserAccountAdapter implements UserAccountAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  load(userId: string): Observable<User> {
    const url = this.occEndpoints.buildUrl('user', { urlParams: { userId } });
    return this.http.get<Occ.User>(url).pipe(
      catchError((error) => {
        throw normalizeHttpError(error, this.logger);
      }),
      this.converter.pipeable(USER_ACCOUNT_NORMALIZER)
    );
  }

  createVerificationToken(
    verificationTokenCreation: VerificationTokenCreation
  ): Observable<VerificationToken> {
    const url = this.occEndpoints.buildUrl('createVerificationToken');

    const headers = InterceptorUtil.createHeader(
      USE_CLIENT_TOKEN,
      true,
      new HttpHeaders({
        ...CONTENT_TYPE_JSON_HEADER,
      })
    );
    verificationTokenCreation = this.converter.convert(
      verificationTokenCreation,
      LOGIN_FORM_SERIALIZER
    );

    return this.http
      .post<VerificationToken>(url, verificationTokenCreation, { headers })
      .pipe(
        catchError((error) => {
          throw normalizeHttpError(error, this.logger);
        }),
        this.converter.pipeable(VERIFICATION_TOKEN_NORMALIZER)
      );
  }
}
