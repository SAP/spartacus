import { CanActivate, Router, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CartNotEmptyGuard implements CanActivate {
    protected activeCartFacade: ActiveCartFacade;
    protected semanticPathService: SemanticPathService;
    protected router: Router;
    constructor(activeCartFacade: ActiveCartFacade, semanticPathService: SemanticPathService, router: Router);
    canActivate(): Observable<boolean | UrlTree>;
    private isEmpty;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartNotEmptyGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartNotEmptyGuard>;
}
