/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
  tryNormalizeHttpError,
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
  protected http = inject(HttpClient);
  protected occEndpoints = inject(OccEndpointsService);
  protected converter = inject(ConverterService);

  protected logger = inject(LoggerService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

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
          throw tryNormalizeHttpError(error, this.logger);
        })
      );
  }

  protected getOrganizationUserRegistrationEndpoint(): string {
    return this.occEndpoints.buildUrl('organizationUserRegistration');
  }
}
