import { Injectable } from '@angular/core';
import { OccConfig } from '../../../occ/config/occ-config';
import { AuthConfig, AuthLibConfig } from '../config/auth-config';
import { OAuthFlow } from '../models/oauth-flow';

@Injectable({
  providedIn: 'root',
})
export class AuthConfigService {
  constructor(
    protected authConfig: AuthConfig,
    protected occConfig: OccConfig
  ) {}

  public getClientId(): string {
    return this.authConfig.authentication.client_id ?? '';
  }

  public getClientSecret(): string {
    return this.authConfig.authentication.client_secret ?? '';
  }

  public getBaseUrl(): string {
    return (
      this.authConfig.authentication.baseUrl ??
      this.occConfig.backend.occ.baseUrl + '/authorizationserver'
    );
  }

  public getTokenEndpoint(): string {
    const tokenEndpoint = this.authConfig.authentication.tokenEndpoint ?? '';
    return this.prefixEndpoint(tokenEndpoint);
  }

  public getLoginEndpoint(): string {
    const loginEndpoint = this.authConfig.authentication.loginEndpoint ?? '';
    return this.prefixEndpoint(loginEndpoint);
  }

  public getRevokeEndpoint(): string {
    const revokeEndpoint = this.authConfig.authentication.revokeEndpoint ?? '';
    return this.prefixEndpoint(revokeEndpoint);
  }

  public getLogoutUrl(): string {
    const logoutUrl = this.authConfig.authentication.logoutUrl ?? '';
    return this.prefixEndpoint(logoutUrl);
  }

  public getUserinfoEndpoint(): string {
    const userinfoEndpoint =
      this.authConfig.authentication.userinfoEndpoint ?? '';
    return this.prefixEndpoint(userinfoEndpoint);
  }

  public getOAuthLibConfig(): AuthLibConfig {
    return this.authConfig.authentication?.OAuthLibConfig ?? {};
  }

  protected prefixEndpoint(endpoint: string): string {
    let url = endpoint;
    if (!url.startsWith('/')) {
      url = '/' + url;
    }
    return `${this.getBaseUrl()}${url}`;
  }

  // TODO: Should we consume directly from this service or should it go through a facade.
  public getOAuthFlow(): OAuthFlow {
    const responseType = this.authConfig.authentication?.OAuthLibConfig
      ?.responseType;
    if (responseType) {
      const types = responseType.split(' ');
      if (types.includes('code')) {
        return OAuthFlow.AuthorizationCode;
      } else if (types.includes('token')) {
        return OAuthFlow.ImplicitFlow;
      } else {
        return OAuthFlow.ResourceOwnerPasswordFlow;
      }
    }
    return OAuthFlow.ResourceOwnerPasswordFlow;
  }
}
