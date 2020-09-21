import { Injectable } from '@angular/core';
import { AuthConfig as LibConfig } from 'angular-oauth2-oidc';
import { Config } from '../../config/config-tokens';

// siletRefreshTimeout - ommited as it is deprecated of typo
// clientId - we need it for client credentials flow
// dummyClientSecret - we need it for client credentials flow
// loginUrl - similarly like the rest of endpoints we want to have full control over that
// logoutUrl - similarly like the rest of endpoints we want to have full control over that
// tokenEndpoint - similarly like the rest of endpoints we want to have full control over that
// revocationEndpoint - similarly like the rest of endpoints we want to have full control over that
// userinfoEndpoint - similarly like the rest of endpoints we want to have full control over that
//
export type AuthLibConfig = Omit<
  LibConfig,
  | 'clientId'
  | 'dummyClientSecret'
  | 'siletRefreshTimeout'
  | 'loginUrl'
  | 'logoutUrl'
  | 'tokenEndpoint'
  | 'revocationEndpoint'
  | 'userinfoEndpoint'
>;


@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class AuthConfig {
  authentication?: {
    client_id?: string;
    client_secret?: string;
    baseUrl?: string;
    tokenEndpoint?: string;
    revokeEndpoint?: string;
    loginEndpoint?: string;
    logoutUrl?: string;
    userinfoEndpoint?: string;
    OAuthLibConfig?: AuthLibConfig;
  };
}
