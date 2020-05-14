import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { KymaConfig } from '../../config/kyma-config';
import { OpenIdToken } from '../../models/kyma-token-types.model';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';

@Injectable({
  providedIn: 'root',
})
export class OpenIdAuthenticationTokenService {
  constructor(private config: KymaConfig, private http: HttpClient) {}

  loadOpenIdAuthenticationToken(
    username: string,
    password: string
  ): Observable<OpenIdToken> {
    const url = this.getOAuthEndpoint();
    const params = new HttpParams()
      .set(
        'client_id',
        encodeURIComponent(this.config.authentication.kyma_client_id)
      )
      .set(
        'client_secret',
        encodeURIComponent(this.config.authentication.kyma_client_secret)
      )
      .set('grant_type', 'password') // authorization_code, client_credentials, password
      .set('username', username)
      .set('password', password)
      .set('scope', 'openid');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<OpenIdToken>(url, params, { headers })
      .pipe(catchError((error) => throwError(error)));
  }

  private getOAuthEndpoint(): string {
    return (this.config.backend.occ.baseUrl || '') + OAUTH_ENDPOINT;
  }
}
