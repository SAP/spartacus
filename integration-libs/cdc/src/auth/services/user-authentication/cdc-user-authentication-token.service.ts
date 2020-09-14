import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfigService, AuthToken } from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CdcUserAuthenticationTokenService {
  constructor(
    protected http: HttpClient,
    protected authConfigService: AuthConfigService
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
  ): Observable<AuthToken> {
    const url = this.authConfigService.getTokenEndpoint();
    const params = new HttpParams()
      .set('client_id', this.authConfigService.getClientId())
      .set('client_secret', this.authConfigService.getClientSecret())
      .set('grant_type', 'custom')
      .set('UID', UID)
      .set('UIDSignature', UIDSignature)
      .set('timeStamp', signatureTimestamp)
      .set('idToken', idToken)
      .set('baseSite', baseSite);

    return this.http
      .post<AuthToken>(url, params)
      .pipe(catchError((error: any) => throwError(error)));
  }
}
