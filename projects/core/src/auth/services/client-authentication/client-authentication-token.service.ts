import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthConfig } from '../../config/auth-config';
import { ClientToken } from '../../models/token-types.model';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';

@Injectable()
export class ClientAuthenticationTokenService {
  constructor(protected config: AuthConfig, protected http: HttpClient) {}

  loadClientAuthenticationToken(): Observable<ClientToken> {
    const url: string = this.getOAuthEndpoint();
    const params = new HttpParams()
      .set(
        'client_id',
        encodeURIComponent(this.config.authentication.client_id)
      )
      .set(
        'client_secret',
        encodeURIComponent(this.config.authentication.client_secret)
      )
      .set('grant_type', 'client_credentials');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<ClientToken>(url, params, { headers });
  }

  protected getOAuthEndpoint(): string {
    return (this.config.backend.occ.baseUrl || '') + OAUTH_ENDPOINT;
  }
}
