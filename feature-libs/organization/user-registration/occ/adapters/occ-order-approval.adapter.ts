import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConverterService,
  InterceptorUtil,
  normalizeHttpError,
  OccEndpointsService,
  USE_CLIENT_TOKEN,
} from '@spartacus/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserRegistrationAdapter } from '../../core/connectors';
import { OrgUserRegistration } from '../../core/model/user-registration.model';

@Injectable()
export class OccUserRegistrationAdapter implements UserRegistrationAdapter {
  constructor(
    protected http: HttpClient,
    protected occEndpoints: OccEndpointsService,
    protected converter: ConverterService
  ) {}

  registerUser(userData: OrgUserRegistration): Observable<any> {
    const httpParams: HttpParams = new HttpParams().set('userData', true);
    console.log(userData);

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    return this.http
      .post(this.getB2bUserRegistrationEndpoint(), httpParams, { headers })
      .pipe(catchError((error) => throwError(normalizeHttpError(error))));
  }

  protected getB2bUserRegistrationEndpoint(): string {
    return this.occEndpoints.buildUrl('b2bUserRegistration');
  }
}
