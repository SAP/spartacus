import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserToken, OccEndpointsService, AuthConfig } from '@spartacus/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class GigyaUserAuthenticationTokenService {
  constructor(
    http: HttpClient,
    config: AuthConfig,
    // tslint:disable-next-line:unified-signatures
    occEndpointsService: OccEndpointsService
  );

  /**
   * @deprecated since version 1.1
   * Use constructor(http: HttpClient, config: AuthConfig, occEndpointsService: OccEndpointsService) instead
   */
  constructor(http: HttpClient, config: AuthConfig);
  constructor(
    protected http: HttpClient,
    protected config: AuthConfig,
    protected occEndpointsService?: OccEndpointsService
  ) {}

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
