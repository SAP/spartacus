import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoutingService } from '../../../routing/facade/routing.service';
import { AuthFlowRoutesService } from './auth-flow-routes.service';
import { AuthRedirectStorageService } from './auth-redirect-storage.service';
import * as i0 from "@angular/core";
/**
 * Responsible for saving last accessed page (or attempted) before login and for redirecting to that page after login.
 */
export declare class AuthRedirectService implements OnDestroy {
    protected routing: RoutingService;
    protected router: Router;
    protected authRedirectStorageService: AuthRedirectStorageService;
    protected authFlowRoutesService: AuthFlowRoutesService;
    /**
     * This service is responsible for remembering the last page before the authentication. "The last page" can be:
     * 1. Just the previously opened page; or
     * 2. The page that we just tried to open, but AuthGuard cancelled it
     *
     * Then, after successful authentication it allows for redirecting to that remembered page via the `redirect()` method.
     *
     * For example:
     * 1. The user opens the product page, then clicks /login link and signs in
     *    -> Then we should redirect to the product page; or
     * 2. The user opens the product page, then he clicks /my-account link,
     *    but is automatically redirected to the login page by the AuthGuard, and he signs in
     *    -> Then we should redirect to the my-account page, not the product page
     */
    constructor(routing: RoutingService, router: Router, authRedirectStorageService: AuthRedirectStorageService, authFlowRoutesService: AuthFlowRoutesService);
    protected subscription: Subscription;
    protected init(): void;
    ngOnDestroy(): void;
    /**
     * Redirect to saved url (homepage if nothing is saved).
     */
    redirect(): void;
    /**
     * Saves the url of the current navigation as the redirect url, unless
     * the url is a part of the user login flow.
     */
    saveCurrentNavigationUrl(): void;
    /**
     * Save the url as the redirect url, unless it's a part of the user login flow.
     */
    setRedirectUrl(url: string): void;
    /**
     * Sets the redirect URL to undefined.
     */
    protected clearRedirectUrl(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthRedirectService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthRedirectService>;
}
