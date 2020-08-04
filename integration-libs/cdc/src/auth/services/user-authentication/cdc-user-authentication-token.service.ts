import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OccEndpointsService, UserToken } from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CdcUserAuthenticationTokenService {
  constructor(
    protected http: HttpClient,
    protected config: AuthConfig,
    protected occEndpointsService: OccEndpointsService
  ) {}

  /**
   * Load User token using custom oauth flow
   *
   * @param UID - UID received from CDC on login event
   * @param UIDSignature - UIDSignature received from CDC on login event
   * @param signatureTimestamp - signatureTimestamp received from CDC on login event
   * @param idToken - idToken received from CDC on login event
   * @param baseSite - baseSite received from CDC on login event
   */
  loadTokenUsingCustomFlow(
    UID: string,
    UIDSignature: string,
    signatureTimestamp: string,
    idToken: string,
    baseSite: string
  ): Observable<UserToken> {
    const url = this.occEndpointsService.getRawEndpoint('login');
    const params = new HttpParams()
      .set('client_id', this.config.authentication.client_id)
      .set('client_secret', this.config.authentication.client_secret)
      .set('grant_type', 'custom')
      .set('UID', UID)
      .set('UIDSignature', UIDSignature)
      .set('timeStamp', signatureTimestamp)
      .set('idToken', idToken)
      .set('baseSite', baseSite);

    return this.http
      .post<UserToken>(url, params)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
