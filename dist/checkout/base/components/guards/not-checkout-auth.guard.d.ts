import { CanActivate, Router, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { AuthService, SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class NotCheckoutAuthGuard implements CanActivate {
    protected authService: AuthService;
    protected activeCartFacade: ActiveCartFacade;
    protected semanticPathService: SemanticPathService;
    protected router: Router;
    constructor(authService: AuthService, activeCartFacade: ActiveCartFacade, semanticPathService: SemanticPathService, router: Router);
    canActivate(): Observable<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NotCheckoutAuthGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NotCheckoutAuthGuard>;
}
