import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutCostCenterFacade, CheckoutPaymentTypeFacade } from '@spartacus/checkout/b2b/root';
import { CheckoutStepService, CheckoutStepsSetGuard } from '@spartacus/checkout/base/components';
import { CheckoutDeliveryAddressFacade, CheckoutDeliveryModesFacade, CheckoutPaymentFacade, CheckoutStep } from '@spartacus/checkout/base/root';
import { LoggerService, RoutingConfigService } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CheckoutB2BStepsSetGuard extends CheckoutStepsSetGuard implements CanActivate {
    protected checkoutStepService: CheckoutStepService;
    protected routingConfigService: RoutingConfigService;
    protected checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade;
    protected checkoutPaymentFacade: CheckoutPaymentFacade;
    protected checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade;
    protected router: Router;
    protected checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade;
    protected checkoutCostCenterFacade: CheckoutCostCenterFacade;
    protected activeCartFacade: ActiveCartFacade;
    protected logger: LoggerService;
    constructor(checkoutStepService: CheckoutStepService, routingConfigService: RoutingConfigService, checkoutDeliveryAddressFacade: CheckoutDeliveryAddressFacade, checkoutPaymentFacade: CheckoutPaymentFacade, checkoutDeliveryModesFacade: CheckoutDeliveryModesFacade, router: Router, checkoutPaymentTypeFacade: CheckoutPaymentTypeFacade, checkoutCostCenterFacade: CheckoutCostCenterFacade, activeCartFacade: ActiveCartFacade);
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree>;
    protected isB2BStepSet(step: CheckoutStep, isAccountPayment: boolean): Observable<boolean | UrlTree>;
    protected isPaymentTypeSet(step: CheckoutStep): Observable<boolean | UrlTree>;
    protected isDeliveryAddressAndCostCenterSet(step: CheckoutStep, isAccountPayment: boolean): Observable<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckoutB2BStepsSetGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckoutB2BStepsSetGuard>;
}
