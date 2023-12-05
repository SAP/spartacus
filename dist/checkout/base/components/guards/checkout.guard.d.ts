import { CanActivate, Router, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { RoutingConfigService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CheckoutConfigService } from '../services/checkout-config.service';
import { CheckoutStepService } from '../services/checkout-step.service';
import { ExpressCheckoutService } from '../services/express-checkout.service';
import * as i0 from "@angular/core";
export declare class CheckoutGuard implements CanActivate {
    protected router: Router;
    protected routingConfigService: RoutingConfigService;
    protected checkoutConfigService: CheckoutConfigService;
    protected expressCheckoutService: ExpressCheckoutService;
    protected activeCartFacade: ActiveCartFacade;
    protected checkoutStepService: CheckoutStepService;
    private readonly firstStep$;
    constructor(router: Router, routingConfigService: RoutingConfigService, checkoutConfigService: CheckoutConfigService, expressCheckoutService: ExpressCheckoutService, activeCartFacade: ActiveCartFacade, checkoutStepService: CheckoutStepService);
    canActivate(): Observable<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutGuard>;
}
