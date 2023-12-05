import { CanActivate, Router, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { AuthRedirectService, AuthService, SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutConfigService } from '../services/checkout-config.service';
import * as i0 from "@angular/core";
export declare class CheckoutAuthGuard implements CanActivate {
    protected authService: AuthService;
    protected authRedirectService: AuthRedirectService;
    protected checkoutConfigService: CheckoutConfigService;
    protected activeCartFacade: ActiveCartFacade;
    protected semanticPathService: SemanticPathService;
    protected router: Router;
    constructor(authService: AuthService, authRedirectService: AuthRedirectService, checkoutConfigService: CheckoutConfigService, activeCartFacade: ActiveCartFacade, semanticPathService: SemanticPathService, router: Router);
    canActivate(): Observable<boolean | UrlTree>;
    protected handleAnonymousUser(): boolean | UrlTree;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutAuthGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutAuthGuard>;
}
