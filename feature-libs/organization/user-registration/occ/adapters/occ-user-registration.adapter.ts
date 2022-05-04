import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  ConverterService,
  InterceptorUtil,
  normalizeHttpError,
  OccEndpointsService,
  USE_CLIENT_TOKEN,
} from '@spartacus/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  ORG_USER_REGISTRATION_SERIALIZER,
  UserRegistrationAdapter,
} from '../../core/connectors';
import { OrgUserRegistration } from '../../core/model/user-registration.model';

@Injectable()
export class OccUserRegistrationAdapter implements UserRegistrationAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  registerUser(userData: OrgUserRegistration): Observable<OrgUserRegistration> {
    const url: string = this.getB2bUserRegistrationEndpoint();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);
    userData = this.converter.convert(
      userData,
      ORG_USER_REGISTRATION_SERIALIZER
    );

    return this.http
      .post<OrgUserRegistration>(url, userData, { headers })
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  protected getB2bUserRegistrationEndpoint(): string {
    return this.occEndpoints.buildUrl('b2bUserRegistration');
  }
}
