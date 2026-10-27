import { Injectable } from '@angular/core';
import { AuthConfigService } from '@spartacus/core';

@Injectable()
export class AuthProxyAuthConfigService extends AuthConfigService {
  // The csrf endpoint needs to go to the auth server directly, not through the proxy
  public getCsrfEndpoint(): string {
    // return if configured as absolute value
    if (
      this.authConfig.authentication?.customLoginPage?.csrfEndpoint?.match(
        /^https?:/
      )
    ) {
      return this.authConfig.authentication?.customLoginPage?.csrfEndpoint;
    }
    return super.getCsrfEndpoint();
  }
  // The custom login form endpoint needs to go to the auth server directly, not through the proxy
  public getCustomLoginFormEndpoint(): string {
    // return if configured as absolute value
    if (
      this.authConfig.authentication?.customLoginPage?.loginFormEndpoint?.match(
        /^https?:/
      )
    ) {
      return this.authConfig.authentication?.customLoginPage?.loginFormEndpoint;
    }
    return super.getCustomLoginFormEndpoint();
  }
}
