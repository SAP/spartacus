import { CanActivate, Router, UrlTree } from '@angular/router';
import { ActiveCartFacade, CartValidationFacade } from '@spartacus/cart/base/root';
import { GlobalMessageService, SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CartConfigService } from '../services/cart-config.service';
import { CartValidationStateService } from '../services/cart-validation-state.service';
import * as i0 from "@angular/core";
export declare class CartValidationGuard implements CanActivate {
    protected cartValidationService: CartValidationFacade;
    protected semanticPathService: SemanticPathService;
    protected router: Router;
    protected globalMessageService: GlobalMessageService;
    protected activeCartService: ActiveCartFacade;
    protected cartValidationStateService: CartValidationStateService;
    protected cartConfigService: CartConfigService;
    constructor(cartValidationService: CartValidationFacade, semanticPathService: SemanticPathService, router: Router, globalMessageService: GlobalMessageService, activeCartService: ActiveCartFacade, cartValidationStateService: CartValidationStateService, cartConfigService: CartConfigService);
    protected GLOBAL_MESSAGE_TIMEOUT: number;
    canActivate(): Observable<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CartValidationGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CartValidationGuard>;
}
