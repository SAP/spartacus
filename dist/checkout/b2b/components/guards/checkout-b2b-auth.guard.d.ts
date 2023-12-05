import { CanActivate, Router, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutAuthGuard, CheckoutConfigService } from '@spartacus/checkout/base/components';
import { AuthRedirectService, AuthService, GlobalMessageService, SemanticPathService } from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutB2BAuthGuard extends CheckoutAuthGuard implements CanActivate {
    protected authService: AuthService;
    protected authRedirectService: AuthRedirectService;
    protected checkoutConfigService: CheckoutConfigService;
    protected activeCartFacade: ActiveCartFacade;
    protected semanticPathService: SemanticPathService;
    protected router: Router;
    protected userAccountFacade: UserAccountFacade;
    protected globalMessageService: GlobalMessageService;
    constructor(authService: AuthService, authRedirectService: AuthRedirectService, checkoutConfigService: CheckoutConfigService, activeCartFacade: ActiveCartFacade, semanticPathService: SemanticPathService, router: Router, userAccountFacade: UserAccountFacade, globalMessageService: GlobalMessageService);
    canActivate(): Observable<boolean | UrlTree>;
    protected handleUserRole(user: User): boolean | UrlTree;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutB2BAuthGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutB2BAuthGuard>;
}
