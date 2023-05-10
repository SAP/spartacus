/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  InterceptorUtil,
  OccEndpointsService,
  USE_CLIENT_TOKEN,
  normalizeHttpError,
} from '@spartacus/core';
import {
  ORGANIZATION_USER_REGISTRATION_SERIALIZER,
  UserRegistrationAdapter,
} from '@spartacus/organization/user-registration/core';
import { OrganizationUserRegistration } from '@spartacus/organization/user-registration/root';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OccUserRegistrationAdapter implements UserRegistrationAdapter {
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
        catchError((error) => {
          throw normalizeHttpError(error);
        })
      );
  }

  protected getOrganizationUserRegistrationEndpoint(): string {
    return this.occEndpoints.buildUrl('organizationUserRegistration');
  }
}
