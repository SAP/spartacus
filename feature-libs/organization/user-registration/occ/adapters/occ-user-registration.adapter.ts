/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ConverterService,
  InterceptorUtil,
  LoggerService,
  OccEndpointsService,
  USE_CLIENT_TOKEN,
  normalizeHttpError,
} from '@spartacus/core';
import {
  ORGANIZATION_USER_REGISTRATION_SERIALIZER,
  UserRegistrationAdapter,
} from '@spartacus/organization/user-registration/core';
import { OrganizationUserRegistration } from '@spartacus/organization/user-registration/root';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OccUserRegistrationAdapter implements UserRegistrationAdapter {
  protected logger = inject(LoggerService);

  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  registerUser(
    userData: OrganizationUserRegistration
  ): Observable<OrganizationUserRegistration> {
    const url: string = this.getOrganizationUserRegistrationEndpoint();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    userData = this.converter.convert(
      userData,
      ORGANIZATION_USER_REGISTRATION_SERIALIZER
    );

    return this.http
      .post<OrganizationUserRegistration>(url, userData, { headers })
      .pipe(
        catchError((error) =>
          throwError(normalizeHttpError(error, this.logger))
        )
      );
  }

  protected getOrganizationUserRegistrationEndpoint(): string {
    return this.occEndpoints.buildUrl('organizationUserRegistration');
  }
}
