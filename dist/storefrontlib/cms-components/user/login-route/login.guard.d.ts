import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthConfigService, AuthService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import * as i0 from "@angular/core";
/**
 * Guards the _login_ route.
 *
 * Takes care of routing the user to a auth server login page (if implicit or code flow is used).
 * In case of Resource Owner Password Flow just renders the page as normal CMS page.
 */
export declare class LoginGuard implements CanActivate {
    protected authService: AuthService;
    protected authConfigService: AuthConfigService;
    protected cmsPageGuard: CmsPageGuard;
    constructor(authService: AuthService, authConfigService: AuthConfigService, cmsPageGuard: CmsPageGuard);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoginGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LoginGuard>;
}
