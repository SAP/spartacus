import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService, CmsService, ProtectedRoutesService, SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
 * Guards the _logout_ route.
 *
 * Takes care of routing the user to a logout page (if available) or redirects to
 * the homepage. If the homepage is protected, the user is redirected
 * to the login route instead.
 */
export declare class LogoutGuard implements CanActivate {
    protected auth: AuthService;
    protected cms: CmsService;
    protected semanticPathService: SemanticPathService;
    protected protectedRoutes: ProtectedRoutesService;
    protected router: Router;
    constructor(auth: AuthService, cms: CmsService, semanticPathService: SemanticPathService, protectedRoutes: ProtectedRoutesService, router: Router);
    canActivate(): Observable<boolean | UrlTree>;
    protected logout(): Promise<any>;
    /**
     * Whenever there is no specific "logout" page configured in the CMS,
     * we redirect after the user is logged out.
     *
     * The user gets redirected to the homepage, unless the homepage is protected
     * (in case of a closed shop). We'll redirect to the login page instead.
     */
    protected getRedirectUrl(): UrlTree;
    static ɵfac: i0.ɵɵFactoryDeclaration<LogoutGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LogoutGuard>;
}
