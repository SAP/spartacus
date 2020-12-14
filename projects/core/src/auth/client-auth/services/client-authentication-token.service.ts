import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthConfigService } from '../../user-auth/services/auth-config.service';
import { ClientToken } from '../models/client-token.model';

/**
 * Responsible for requesting from OAuth server `ClientToken` for a particular
 * auth client.
 */
@Injectable({
  providedIn: 'root',
})
export class ClientAuthenticationTokenService {
  constructor(
    protected http: HttpClient,
    protected authConfigService: AuthConfigService
  ) {}

  /**
   * Loads token with client authentication flow.
   *
   * @returns observable with ClientToken
   */
  loadClientAuthenticationToken(): Observable<ClientToken> {
    const url: string = this.authConfigService.getTokenEndpoint();
    const params = new HttpParams()
      .set(
        'client_id',
        encodeURIComponent(this.authConfigService.getClientId())
      )
      .set(
        'client_secret',
        encodeURIComponent(this.authConfigService.getClientSecret())
      )
      .set('grant_type', 'client_credentials');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post<ClientToken>(url, params, { headers });
  }
}
