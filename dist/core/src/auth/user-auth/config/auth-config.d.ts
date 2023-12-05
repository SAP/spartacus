import { AuthConfig as LibConfig } from 'angular-oauth2-oidc';
import * as i0 from "@angular/core";
export type AuthLibConfig = Omit<LibConfig, 'clientId' | 'dummyClientSecret' | 'siletRefreshTimeout' | 'loginUrl' | 'logoutUrl' | 'tokenEndpoint' | 'revocationEndpoint' | 'userinfoEndpoint'>;
export declare abstract class AuthConfig {
    authentication?: {
        /**
         * OAuth client id.
         */
        client_id?: string;
        /**
         * Secret for client required by Hybris OAuth.
         */
        client_secret?: string;
        /**
         * Base url for auth server (for login, token, revoke endpoints).
         */
        baseUrl?: string;
        /**
         * Endpoint for getting token.
         */
        tokenEndpoint?: string;
        /**
         * Endpoint url for revoking tokens.
         */
        revokeEndpoint?: string;
        /**
         * Url for login redirect for Implicit and Authorization Code Flow.
         */
        loginUrl?: string;
        /**
         * Redirect url after logout.
         */
        logoutUrl?: string;
        /**
         * Userinfo endpoint.
         */
        userinfoEndpoint?: string;
        /**
         * Config for angular-oauth-oidc library.
         */
        OAuthLibConfig?: AuthLibConfig;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthConfig>;
}
declare module '../../../config/config-tokens' {
    interface Config extends AuthConfig {
    }
}
