import { ModuleWithProviders } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { AuthService } from './facade/auth.service';
import { AuthStatePersistenceService } from './services/auth-state-persistence.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "angular-oauth2-oidc";
import * as i3 from "./events/user-auth-event.module";
/**
 * Initialize the check for `token` or `code` in the url returned from the OAuth server.
 */
export declare function checkOAuthParamsInUrl(authService: AuthService, configInit: ConfigInitializerService): () => Promise<void>;
export declare function authStatePersistenceFactory(authStatePersistenceService: AuthStatePersistenceService): () => void;
/**
 * Authentication module for a user. Handlers requests for logged in users,
 * provides authorization services and storage for tokens.
 */
export declare class UserAuthModule {
    static forRoot(): ModuleWithProviders<UserAuthModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserAuthModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<UserAuthModule, never, [typeof i1.CommonModule, typeof i2.OAuthModule, typeof i3.UserAuthEventModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<UserAuthModule>;
}
