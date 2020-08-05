import { Injectable } from '@angular/core';
import { OccConfig } from '../../../occ/config/occ-config';
import { AuthConfig } from '../config/auth-config';

@Injectable({
  providedIn: 'root',
})
export class AuthConfigService {
  constructor(
    protected authConfig: AuthConfig,
    protected occConfig: OccConfig
  ) {}

  protected getBaseUrl() {
    return (
      this.authConfig.authentication.baseUrl ??
      this.occConfig.backend.occ.baseUrl
    );
  }

  getLoginEndpoint() {
    let loginEndpoint = this.authConfig.authentication.loginEndpoint;
    if (!loginEndpoint.startsWith('/')) {
      loginEndpoint = '/' + loginEndpoint;
    }
    return `${this.getBaseUrl()}${loginEndpoint}`;
  }

  getRevokeEndpoint() {
    let revokeEndpoint = this.authConfig.authentication.revokeEndpoint;
    if (!revokeEndpoint.startsWith('/')) {
      revokeEndpoint = '/' + revokeEndpoint;
    }
    return `${this.getBaseUrl()}${revokeEndpoint}`;
  }
}
