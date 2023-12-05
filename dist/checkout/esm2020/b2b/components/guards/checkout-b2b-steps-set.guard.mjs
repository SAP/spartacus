/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject, isDevMode } from '@angular/core';
import { CheckoutStepsSetGuard, } from '@spartacus/checkout/base/components';
import { LoggerService } from '@spartacus/core';
import { combineLatest, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/checkout/base/components";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/checkout/base/root";
import * as i4 from "@angular/router";
import * as i5 from "@spartacus/checkout/b2b/root";
import * as i6 from "@spartacus/cart/base/root";
export class CheckoutB2BStepsSetGuard extends CheckoutStepsSetGuard {
    constructor(checkoutStepService, routingConfigService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, checkoutDeliveryModesFacade, router, checkoutPaymentTypeFacade, checkoutCostCenterFacade, activeCartFacade) {
        super(checkoutStepService, routingConfigService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, checkoutDeliveryModesFacade, router, activeCartFacade);
        this.checkoutStepService = checkoutStepService;
        this.routingConfigService = routingConfigService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.checkoutPaymentFacade = checkoutPaymentFacade;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.router = router;
        this.checkoutPaymentTypeFacade = checkoutPaymentTypeFacade;
        this.checkoutCostCenterFacade = checkoutCostCenterFacade;
        this.activeCartFacade = activeCartFacade;
        this.logger = inject(LoggerService);
    }
    canActivate(route) {
        let currentIndex = -1;
        const currentRouteUrl = '/' + route.url.join('/');
        // check whether the previous step is set
        return combineLatest([
            this.checkoutStepService.steps$,
            this.checkoutPaymentTypeFacade.isAccountPayment(),
        ]).pipe(tap(([, isAccount]) => {
            this.checkoutStepService.disableEnableStep("paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */, isAccount);
        }), take(1), switchMap(([steps, isAccount]) => {
            currentIndex = steps.findIndex((step) => {
                const stepRouteUrl = `/${this.routingConfigService.getRouteConfig(step.routeName)?.paths?.[0]}`;
                return stepRouteUrl === currentRouteUrl;
            });
            // get current step
            let currentStep;
            if (currentIndex >= 0) {
                currentStep = steps[currentIndex];
            }
            if (Boolean(currentStep)) {
                return this.isB2BStepSet(steps[currentIndex - 1], isAccount);
            }
            else {
                if (isDevMode()) {
                    this.logger.warn(`Missing step with route '${currentRouteUrl}' in checkout configuration or this step is disabled.`);
                }
                return of(this.getUrl('checkout'));
            }
        }));
    }
    isB2BStepSet(step, isAccountPayment) {
        if (step && !step.disabled) {
            switch (step.type[0]) {
                case "paymentType" /* CheckoutStepType.PAYMENT_TYPE */: {
                    return this.isPaymentTypeSet(step);
                }
                case "deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */: {
                    return this.isDeliveryAddressAndCostCenterSet(step, isAccountPayment);
                }
                case "deliveryMode" /* CheckoutStepType.DELIVERY_MODE */: {
                    return this.isDeliveryModeSet(step);
                }
                case "paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */: {
                    return this.isPaymentDetailsSet(step);
                }
                case "reviewOrder" /* CheckoutStepType.REVIEW_ORDER */: {
                    break;
                }
            }
        }
        return of(true);
    }
    isPaymentTypeSet(step) {
        return this.checkoutPaymentTypeFacade.getSelectedPaymentTypeState().pipe(filter((state) => !state.loading), map((state) => state.data), map((paymentType) => {
            if (paymentType) {
                return true;
            }
            else {
                return this.getUrl(step.routeName);
            }
        }));
    }
    isDeliveryAddressAndCostCenterSet(step, isAccountPayment) {
        return combineLatest([
            this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(filter((state) => !state.loading), map((state) => state.data)),
            this.checkoutCostCenterFacade.getCostCenterState().pipe(filter((state) => !state.loading), map((state) => state.data)),
        ]).pipe(map(([deliveryAddress, costCenter]) => {
            if (isAccountPayment) {
                if (deliveryAddress &&
                    Object.keys(deliveryAddress).length &&
                    !!costCenter) {
                    return true;
                }
                else {
                    return this.getUrl(step.routeName);
                }
            }
            else {
                if (deliveryAddress &&
                    Object.keys(deliveryAddress).length &&
                    costCenter === undefined) {
                    return true;
                }
                else {
                    return this.getUrl(step.routeName);
                }
            }
        }));
    }
}
CheckoutB2BStepsSetGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BStepsSetGuard, deps: [{ token: i1.CheckoutStepService }, { token: i2.RoutingConfigService }, { token: i3.CheckoutDeliveryAddressFacade }, { token: i3.CheckoutPaymentFacade }, { token: i3.CheckoutDeliveryModesFacade }, { token: i4.Router }, { token: i5.CheckoutPaymentTypeFacade }, { token: i5.CheckoutCostCenterFacade }, { token: i6.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutB2BStepsSetGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BStepsSetGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BStepsSetGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CheckoutStepService }, { type: i2.RoutingConfigService }, { type: i3.CheckoutDeliveryAddressFacade }, { type: i3.CheckoutPaymentFacade }, { type: i3.CheckoutDeliveryModesFacade }, { type: i4.Router }, { type: i5.CheckoutPaymentTypeFacade }, { type: i5.CheckoutCostCenterFacade }, { type: i6.ActiveCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtYjJiLXN0ZXBzLXNldC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iMmIvY29tcG9uZW50cy9ndWFyZHMvY2hlY2tvdXQtYjJiLXN0ZXBzLXNldC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBWTlELE9BQU8sRUFFTCxxQkFBcUIsR0FDdEIsTUFBTSxxQ0FBcUMsQ0FBQztBQVE3QyxPQUFPLEVBQUUsYUFBYSxFQUF3QixNQUFNLGlCQUFpQixDQUFDO0FBQ3RFLE9BQU8sRUFBYyxhQUFhLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7O0FBS25FLE1BQU0sT0FBTyx3QkFDWCxTQUFRLHFCQUFxQjtJQUs3QixZQUNZLG1CQUF3QyxFQUN4QyxvQkFBMEMsRUFDMUMsNkJBQTRELEVBQzVELHFCQUE0QyxFQUM1QywyQkFBd0QsRUFDeEQsTUFBYyxFQUNkLHlCQUFvRCxFQUNwRCx3QkFBa0QsRUFDbEQsZ0JBQWtDO1FBRTVDLEtBQUssQ0FDSCxtQkFBbUIsRUFDbkIsb0JBQW9CLEVBQ3BCLDZCQUE2QixFQUM3QixxQkFBcUIsRUFDckIsMkJBQTJCLEVBQzNCLE1BQU0sRUFDTixnQkFBZ0IsQ0FDakIsQ0FBQztRQWxCUSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsa0NBQTZCLEdBQTdCLDZCQUE2QixDQUErQjtRQUM1RCwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLGdDQUEyQixHQUEzQiwyQkFBMkIsQ0FBNkI7UUFDeEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBMkI7UUFDcEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBWHBDLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFzQnpDLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBNkI7UUFDdkMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEIsTUFBTSxlQUFlLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxELHlDQUF5QztRQUN6QyxPQUFPLGFBQWEsQ0FBQztZQUNuQixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTTtZQUMvQixJQUFJLENBQUMseUJBQXlCLENBQUMsZ0JBQWdCLEVBQUU7U0FDbEQsQ0FBQyxDQUFDLElBQUksQ0FDTCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLDBEQUV4QyxTQUFTLENBQ1YsQ0FBQztRQUNKLENBQUMsQ0FBQyxFQUNGLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsRUFBRSxFQUFFO1lBQy9CLFlBQVksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sWUFBWSxHQUFHLElBQ25CLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FDckUsRUFBRSxDQUFDO2dCQUNILE9BQU8sWUFBWSxLQUFLLGVBQWUsQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztZQUNILG1CQUFtQjtZQUNuQixJQUFJLFdBQVcsQ0FBQztZQUNoQixJQUFJLFlBQVksSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLFdBQVcsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDbkM7WUFDRCxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDeEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDOUQ7aUJBQU07Z0JBQ0wsSUFBSSxTQUFTLEVBQUUsRUFBRTtvQkFDZixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDZCw0QkFBNEIsZUFBZSx1REFBdUQsQ0FDbkcsQ0FBQztpQkFDSDtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDcEM7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVTLFlBQVksQ0FDcEIsSUFBa0IsRUFDbEIsZ0JBQXlCO1FBRXpCLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMxQixRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3BCLHNEQUFrQyxDQUFDLENBQUM7b0JBQ2xDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNwQztnQkFDRCw4REFBc0MsQ0FBQyxDQUFDO29CQUN0QyxPQUFPLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztpQkFDdkU7Z0JBQ0Qsd0RBQW1DLENBQUMsQ0FBQztvQkFDbkMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3JDO2dCQUNELDREQUFxQyxDQUFDLENBQUM7b0JBQ3JDLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN2QztnQkFDRCxzREFBa0MsQ0FBQyxDQUFDO29CQUNsQyxNQUFNO2lCQUNQO2FBQ0Y7U0FDRjtRQUNELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFUyxnQkFBZ0IsQ0FDeEIsSUFBa0I7UUFFbEIsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQ3RFLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQ2pDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUMxQixHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUNsQixJQUFJLFdBQVcsRUFBRTtnQkFDZixPQUFPLElBQUksQ0FBQzthQUNiO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDcEM7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVTLGlDQUFpQyxDQUN6QyxJQUFrQixFQUNsQixnQkFBeUI7UUFFekIsT0FBTyxhQUFhLENBQUM7WUFDbkIsSUFBSSxDQUFDLDZCQUE2QixDQUFDLHVCQUF1QixFQUFFLENBQUMsSUFBSSxDQUMvRCxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUNqQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FDM0I7WUFDRCxJQUFJLENBQUMsd0JBQXdCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQ3JELE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQ2pDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUMzQjtTQUNGLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsVUFBVSxDQUFDLEVBQUUsRUFBRTtZQUNwQyxJQUFJLGdCQUFnQixFQUFFO2dCQUNwQixJQUNFLGVBQWU7b0JBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNO29CQUNuQyxDQUFDLENBQUMsVUFBVSxFQUNaO29CQUNBLE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNO29CQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3BDO2FBQ0Y7aUJBQU07Z0JBQ0wsSUFDRSxlQUFlO29CQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTTtvQkFDbkMsVUFBVSxLQUFLLFNBQVMsRUFDeEI7b0JBQ0EsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU07b0JBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDcEM7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOztxSEF0SlUsd0JBQXdCO3lIQUF4Qix3QkFBd0IsY0FGdkIsTUFBTTsyRkFFUCx3QkFBd0I7a0JBSHBDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgaW5qZWN0LCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gIENhbkFjdGl2YXRlLFxuICBSb3V0ZXIsXG4gIFVybFRyZWUsXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBY3RpdmVDYXJ0RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBDaGVja291dENvc3RDZW50ZXJGYWNhZGUsXG4gIENoZWNrb3V0UGF5bWVudFR5cGVGYWNhZGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYjJiL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ2hlY2tvdXRTdGVwU2VydmljZSxcbiAgQ2hlY2tvdXRTdGVwc1NldEd1YXJkLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2UvY29tcG9uZW50cyc7XG5pbXBvcnQge1xuICBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgQ2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlLFxuICBDaGVja291dFBheW1lbnRGYWNhZGUsXG4gIENoZWNrb3V0U3RlcCxcbiAgQ2hlY2tvdXRTdGVwVHlwZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSwgUm91dGluZ0NvbmZpZ1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgY29tYmluZUxhdGVzdCwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0QjJCU3RlcHNTZXRHdWFyZFxuICBleHRlbmRzIENoZWNrb3V0U3RlcHNTZXRHdWFyZFxuICBpbXBsZW1lbnRzIENhbkFjdGl2YXRlXG57XG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0U3RlcFNlcnZpY2U6IENoZWNrb3V0U3RlcFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdDb25maWdTZXJ2aWNlOiBSb3V0aW5nQ29uZmlnU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGU6IENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlLFxuICAgIHByb3RlY3RlZCBjaGVja291dFBheW1lbnRGYWNhZGU6IENoZWNrb3V0UGF5bWVudEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlOiBDaGVja291dERlbGl2ZXJ5TW9kZXNGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxuICAgIHByb3RlY3RlZCBjaGVja291dFBheW1lbnRUeXBlRmFjYWRlOiBDaGVja291dFBheW1lbnRUeXBlRmFjYWRlLFxuICAgIHByb3RlY3RlZCBjaGVja291dENvc3RDZW50ZXJGYWNhZGU6IENoZWNrb3V0Q29zdENlbnRlckZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZVxuICApIHtcbiAgICBzdXBlcihcbiAgICAgIGNoZWNrb3V0U3RlcFNlcnZpY2UsXG4gICAgICByb3V0aW5nQ29uZmlnU2VydmljZSxcbiAgICAgIGNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlLFxuICAgICAgY2hlY2tvdXRQYXltZW50RmFjYWRlLFxuICAgICAgY2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlLFxuICAgICAgcm91dGVyLFxuICAgICAgYWN0aXZlQ2FydEZhY2FkZVxuICAgICk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gLTE7XG4gICAgY29uc3QgY3VycmVudFJvdXRlVXJsID0gJy8nICsgcm91dGUudXJsLmpvaW4oJy8nKTtcblxuICAgIC8vIGNoZWNrIHdoZXRoZXIgdGhlIHByZXZpb3VzIHN0ZXAgaXMgc2V0XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5jaGVja291dFN0ZXBTZXJ2aWNlLnN0ZXBzJCxcbiAgICAgIHRoaXMuY2hlY2tvdXRQYXltZW50VHlwZUZhY2FkZS5pc0FjY291bnRQYXltZW50KCksXG4gICAgXSkucGlwZShcbiAgICAgIHRhcCgoWywgaXNBY2NvdW50XSkgPT4ge1xuICAgICAgICB0aGlzLmNoZWNrb3V0U3RlcFNlcnZpY2UuZGlzYWJsZUVuYWJsZVN0ZXAoXG4gICAgICAgICAgQ2hlY2tvdXRTdGVwVHlwZS5QQVlNRU5UX0RFVEFJTFMsXG4gICAgICAgICAgaXNBY2NvdW50XG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICAgIHRha2UoMSksXG4gICAgICBzd2l0Y2hNYXAoKFtzdGVwcywgaXNBY2NvdW50XSkgPT4ge1xuICAgICAgICBjdXJyZW50SW5kZXggPSBzdGVwcy5maW5kSW5kZXgoKHN0ZXApID0+IHtcbiAgICAgICAgICBjb25zdCBzdGVwUm91dGVVcmwgPSBgLyR7XG4gICAgICAgICAgICB0aGlzLnJvdXRpbmdDb25maWdTZXJ2aWNlLmdldFJvdXRlQ29uZmlnKHN0ZXAucm91dGVOYW1lKT8ucGF0aHM/LlswXVxuICAgICAgICAgIH1gO1xuICAgICAgICAgIHJldHVybiBzdGVwUm91dGVVcmwgPT09IGN1cnJlbnRSb3V0ZVVybDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGdldCBjdXJyZW50IHN0ZXBcbiAgICAgICAgbGV0IGN1cnJlbnRTdGVwO1xuICAgICAgICBpZiAoY3VycmVudEluZGV4ID49IDApIHtcbiAgICAgICAgICBjdXJyZW50U3RlcCA9IHN0ZXBzW2N1cnJlbnRJbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEJvb2xlYW4oY3VycmVudFN0ZXApKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaXNCMkJTdGVwU2V0KHN0ZXBzW2N1cnJlbnRJbmRleCAtIDFdLCBpc0FjY291bnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihcbiAgICAgICAgICAgICAgYE1pc3Npbmcgc3RlcCB3aXRoIHJvdXRlICcke2N1cnJlbnRSb3V0ZVVybH0nIGluIGNoZWNrb3V0IGNvbmZpZ3VyYXRpb24gb3IgdGhpcyBzdGVwIGlzIGRpc2FibGVkLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvZih0aGlzLmdldFVybCgnY2hlY2tvdXQnKSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0IyQlN0ZXBTZXQoXG4gICAgc3RlcDogQ2hlY2tvdXRTdGVwLFxuICAgIGlzQWNjb3VudFBheW1lbnQ6IGJvb2xlYW5cbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVXJsVHJlZT4ge1xuICAgIGlmIChzdGVwICYmICFzdGVwLmRpc2FibGVkKSB7XG4gICAgICBzd2l0Y2ggKHN0ZXAudHlwZVswXSkge1xuICAgICAgICBjYXNlIENoZWNrb3V0U3RlcFR5cGUuUEFZTUVOVF9UWVBFOiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaXNQYXltZW50VHlwZVNldChzdGVwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoZWNrb3V0U3RlcFR5cGUuREVMSVZFUllfQUREUkVTUzoge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlzRGVsaXZlcnlBZGRyZXNzQW5kQ29zdENlbnRlclNldChzdGVwLCBpc0FjY291bnRQYXltZW50KTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoZWNrb3V0U3RlcFR5cGUuREVMSVZFUllfTU9ERToge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlzRGVsaXZlcnlNb2RlU2V0KHN0ZXApO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hlY2tvdXRTdGVwVHlwZS5QQVlNRU5UX0RFVEFJTFM6IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pc1BheW1lbnREZXRhaWxzU2V0KHN0ZXApO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hlY2tvdXRTdGVwVHlwZS5SRVZJRVdfT1JERVI6IHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2YodHJ1ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNQYXltZW50VHlwZVNldChcbiAgICBzdGVwOiBDaGVja291dFN0ZXBcbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVXJsVHJlZT4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrb3V0UGF5bWVudFR5cGVGYWNhZGUuZ2V0U2VsZWN0ZWRQYXltZW50VHlwZVN0YXRlKCkucGlwZShcbiAgICAgIGZpbHRlcigoc3RhdGUpID0+ICFzdGF0ZS5sb2FkaW5nKSxcbiAgICAgIG1hcCgoc3RhdGUpID0+IHN0YXRlLmRhdGEpLFxuICAgICAgbWFwKChwYXltZW50VHlwZSkgPT4ge1xuICAgICAgICBpZiAocGF5bWVudFR5cGUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmwoc3RlcC5yb3V0ZU5hbWUpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNEZWxpdmVyeUFkZHJlc3NBbmRDb3N0Q2VudGVyU2V0KFxuICAgIHN0ZXA6IENoZWNrb3V0U3RlcCxcbiAgICBpc0FjY291bnRQYXltZW50OiBib29sZWFuXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLmNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlLmdldERlbGl2ZXJ5QWRkcmVzc1N0YXRlKCkucGlwZShcbiAgICAgICAgZmlsdGVyKChzdGF0ZSkgPT4gIXN0YXRlLmxvYWRpbmcpLFxuICAgICAgICBtYXAoKHN0YXRlKSA9PiBzdGF0ZS5kYXRhKVxuICAgICAgKSxcbiAgICAgIHRoaXMuY2hlY2tvdXRDb3N0Q2VudGVyRmFjYWRlLmdldENvc3RDZW50ZXJTdGF0ZSgpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoc3RhdGUpID0+ICFzdGF0ZS5sb2FkaW5nKSxcbiAgICAgICAgbWFwKChzdGF0ZSkgPT4gc3RhdGUuZGF0YSlcbiAgICAgICksXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW2RlbGl2ZXJ5QWRkcmVzcywgY29zdENlbnRlcl0pID0+IHtcbiAgICAgICAgaWYgKGlzQWNjb3VudFBheW1lbnQpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBkZWxpdmVyeUFkZHJlc3MgJiZcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRlbGl2ZXJ5QWRkcmVzcykubGVuZ3RoICYmXG4gICAgICAgICAgICAhIWNvc3RDZW50ZXJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmwoc3RlcC5yb3V0ZU5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBkZWxpdmVyeUFkZHJlc3MgJiZcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRlbGl2ZXJ5QWRkcmVzcykubGVuZ3RoICYmXG4gICAgICAgICAgICBjb3N0Q2VudGVyID09PSB1bmRlZmluZWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmwoc3RlcC5yb3V0ZU5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=