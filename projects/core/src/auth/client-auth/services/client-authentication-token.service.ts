import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthConfig } from '../../user-auth/config/auth-config';
import { AuthConfigService } from '../../user-auth/services/auth-config.service';
import { ClientToken } from '../models/client-token.model';

@Injectable({
  providedIn: 'root',
})
export class ClientAuthenticationTokenService {
  constructor(
    protected config: AuthConfig,
    protected http: HttpClient,
    protected authConfigService: AuthConfigService
  ) {}

  loadClientAuthenticationToken(): Observable<ClientToken> {
    const url: string = this.authConfigService.getTokenEndpoint();
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
}
