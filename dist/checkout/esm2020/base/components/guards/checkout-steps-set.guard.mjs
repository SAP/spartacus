/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Injectable, isDevMode } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, take, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/checkout-step.service";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/checkout/base/root";
import * as i4 from "@angular/router";
import * as i5 from "@spartacus/cart/base/root";
export class CheckoutStepsSetGuard {
    constructor(checkoutStepService, routingConfigService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, checkoutDeliveryModesFacade, router, activeCartFacade) {
        this.checkoutStepService = checkoutStepService;
        this.routingConfigService = routingConfigService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.checkoutPaymentFacade = checkoutPaymentFacade;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.router = router;
        this.activeCartFacade = activeCartFacade;
        this.logger = inject(LoggerService);
        this.subscription = this.activeCartFacade
            .hasDeliveryItems()
            .pipe(distinctUntilChanged())
            .subscribe((hasDeliveryItems) => {
            this.checkoutStepService.disableEnableStep("deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */, !hasDeliveryItems);
            this.checkoutStepService.disableEnableStep("deliveryMode" /* CheckoutStepType.DELIVERY_MODE */, !hasDeliveryItems);
            this.setStepNameMultiLine("paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */, hasDeliveryItems);
            this.setStepNameMultiLine("reviewOrder" /* CheckoutStepType.REVIEW_ORDER */, hasDeliveryItems);
        });
    }
    canActivate(route) {
        let currentIndex = -1;
        const currentRouteUrl = '/' + route.url.join('/');
        // check whether the previous step is set
        return this.checkoutStepService.steps$.pipe(take(1), switchMap((steps) => {
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
                return this.isStepSet(steps[currentIndex - 1]);
            }
            else {
                if (isDevMode()) {
                    this.logger.warn(`Missing step with route '${currentRouteUrl}' in checkout configuration or this step is disabled.`);
                }
                return of(this.getUrl('checkout'));
            }
        }));
    }
    isStepSet(step) {
        if (step && !step.disabled) {
            switch (step.type[0]) {
                case "deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */: {
                    return this.isDeliveryAddress(step);
                }
                case "deliveryMode" /* CheckoutStepType.DELIVERY_MODE */: {
                    return this.isDeliveryModeSet(step);
                }
                case "paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */: {
                    if (this.checkoutStepService.getCheckoutStep("deliveryMode" /* CheckoutStepType.DELIVERY_MODE */)?.disabled) {
                        this.checkoutDeliveryModesFacade.setDeliveryMode('pickup');
                    }
                    return this.isPaymentDetailsSet(step);
                }
                case "reviewOrder" /* CheckoutStepType.REVIEW_ORDER */: {
                    break;
                }
            }
        }
        return of(true);
    }
    isDeliveryAddress(step) {
        return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(filter((state) => !state.loading), map((state) => state.data), map((deliveryAddress) => {
            if (deliveryAddress && Object.keys(deliveryAddress).length) {
                return true;
            }
            else {
                return this.getUrl(step.routeName);
            }
        }));
    }
    isDeliveryModeSet(step) {
        return this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState().pipe(filter((state) => !state.loading), map((state) => state.data), map((mode) => (mode ? true : this.getUrl(step.routeName))));
    }
    isPaymentDetailsSet(step) {
        return this.checkoutPaymentFacade.getPaymentDetailsState().pipe(filter((state) => !state.loading), map((state) => state.data), map((paymentDetails) => paymentDetails && Object.keys(paymentDetails).length !== 0
            ? true
            : this.getUrl(step.routeName)));
    }
    getUrl(routeName) {
        return this.router.parseUrl(this.routingConfigService.getRouteConfig(routeName)?.paths?.[0]);
    }
    setStepNameMultiLine(stepType, value) {
        const step = this.checkoutStepService.getCheckoutStep(stepType);
        if (step) {
            step.nameMultiLine = value;
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CheckoutStepsSetGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutStepsSetGuard, deps: [{ token: i1.CheckoutStepService }, { token: i2.RoutingConfigService }, { token: i3.CheckoutDeliveryAddressFacade }, { token: i3.CheckoutPaymentFacade }, { token: i3.CheckoutDeliveryModesFacade }, { token: i4.Router }, { token: i5.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutStepsSetGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutStepsSetGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutStepsSetGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CheckoutStepService }, { type: i2.RoutingConfigService }, { type: i3.CheckoutDeliveryAddressFacade }, { type: i3.CheckoutPaymentFacade }, { type: i3.CheckoutDeliveryModesFacade }, { type: i4.Router }, { type: i5.ActiveCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtc3RlcHMtc2V0Lmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2UvY29tcG9uZW50cy9ndWFyZHMvY2hlY2tvdXQtc3RlcHMtc2V0Lmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFlekUsT0FBTyxFQUFFLGFBQWEsRUFBd0IsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RSxPQUFPLEVBQWMsRUFBRSxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUNwRCxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixHQUFHLEVBQ0gsU0FBUyxFQUNULElBQUksR0FDTCxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBTXhCLE1BQU0sT0FBTyxxQkFBcUI7SUFJaEMsWUFDWSxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLDZCQUE0RCxFQUM1RCxxQkFBNEMsRUFDNUMsMkJBQXdELEVBQ3hELE1BQWMsRUFDZCxnQkFBa0M7UUFObEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLGtDQUE2QixHQUE3Qiw2QkFBNkIsQ0FBK0I7UUFDNUQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxnQ0FBMkIsR0FBM0IsMkJBQTJCLENBQTZCO1FBQ3hELFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBVHBDLFdBQU0sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFXdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCO2FBQ3RDLGdCQUFnQixFQUFFO2FBQ2xCLElBQUksQ0FBQyxvQkFB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QUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFDakMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQzFCLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQ3JCLGNBQWMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQ3hELENBQUMsQ0FBQyxJQUFJO1lBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUNoQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRVMsTUFBTSxDQUFDLFNBQWlCO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQ3pCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFXLENBQzFFLENBQUM7SUFDSixDQUFDO0lBRVMsb0JBQW9CLENBQzVCLFFBQTBCLEVBQzFCLEtBQWM7UUFFZCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7a0hBNUpVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRnBCLE1BQU07MkZBRVAscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IGluamVjdCwgSW5qZWN0YWJsZSwgaXNEZXZNb2RlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gIENhbkFjdGl2YXRlLFxuICBSb3V0ZXIsXG4gIFVybFRyZWUsXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBY3RpdmVDYXJ0RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgQ2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlLFxuICBDaGVja291dFBheW1lbnRGYWNhZGUsXG4gIENoZWNrb3V0U3RlcCxcbiAgQ2hlY2tvdXRTdGVwVHlwZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgTG9nZ2VyU2VydmljZSwgUm91dGluZ0NvbmZpZ1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBzd2l0Y2hNYXAsXG4gIHRha2UsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENoZWNrb3V0U3RlcFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jaGVja291dC1zdGVwLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRTdGVwc1NldEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUsIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHJvdGVjdGVkIGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXRTdGVwU2VydmljZTogQ2hlY2tvdXRTdGVwU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ0NvbmZpZ1NlcnZpY2U6IFJvdXRpbmdDb25maWdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZTogQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0UGF5bWVudEZhY2FkZTogQ2hlY2tvdXRQYXltZW50RmFjYWRlLFxuICAgIHByb3RlY3RlZCBjaGVja291dERlbGl2ZXJ5TW9kZXNGYWNhZGU6IENoZWNrb3V0RGVsaXZlcnlNb2Rlc0ZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRGYWNhZGU6IEFjdGl2ZUNhcnRGYWNhZGVcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmFjdGl2ZUNhcnRGYWNhZGVcbiAgICAgIC5oYXNEZWxpdmVyeUl0ZW1zKClcbiAgICAgIC5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAuc3Vic2NyaWJlKChoYXNEZWxpdmVyeUl0ZW1zKSA9PiB7XG4gICAgICAgIHRoaXMuY2hlY2tvdXRTdGVwU2VydmljZS5kaXNhYmxlRW5hYmxlU3RlcChcbiAgICAgICAgICBDaGVja291dFN0ZXBUeXBlLkRFTElWRVJZX0FERFJFU1MsXG4gICAgICAgICAgIWhhc0RlbGl2ZXJ5SXRlbXNcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jaGVja291dFN0ZXBTZXJ2aWNlLmRpc2FibGVFbmFibGVTdGVwKFxuICAgICAgICAgIENoZWNrb3V0U3RlcFR5cGUuREVMSVZFUllfTU9ERSxcbiAgICAgICAgICAhaGFzRGVsaXZlcnlJdGVtc1xuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc2V0U3RlcE5hbWVNdWx0aUxpbmUoXG4gICAgICAgICAgQ2hlY2tvdXRTdGVwVHlwZS5QQVlNRU5UX0RFVEFJTFMsXG4gICAgICAgICAgaGFzRGVsaXZlcnlJdGVtc1xuICAgICAgICApO1xuICAgICAgICB0aGlzLnNldFN0ZXBOYW1lTXVsdGlMaW5lKFxuICAgICAgICAgIENoZWNrb3V0U3RlcFR5cGUuUkVWSUVXX09SREVSLFxuICAgICAgICAgIGhhc0RlbGl2ZXJ5SXRlbXNcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgbGV0IGN1cnJlbnRJbmRleCA9IC0xO1xuICAgIGNvbnN0IGN1cnJlbnRSb3V0ZVVybCA9ICcvJyArIHJvdXRlLnVybC5qb2luKCcvJyk7XG5cbiAgICAvLyBjaGVjayB3aGV0aGVyIHRoZSBwcmV2aW91cyBzdGVwIGlzIHNldFxuICAgIHJldHVybiB0aGlzLmNoZWNrb3V0U3RlcFNlcnZpY2Uuc3RlcHMkLnBpcGUoXG4gICAgICB0YWtlKDEpLFxuICAgICAgc3dpdGNoTWFwKChzdGVwcykgPT4ge1xuICAgICAgICBjdXJyZW50SW5kZXggPSBzdGVwcy5maW5kSW5kZXgoKHN0ZXApID0+IHtcbiAgICAgICAgICBjb25zdCBzdGVwUm91dGVVcmwgPSBgLyR7XG4gICAgICAgICAgICB0aGlzLnJvdXRpbmdDb25maWdTZXJ2aWNlLmdldFJvdXRlQ29uZmlnKHN0ZXAucm91dGVOYW1lKT8ucGF0aHM/LlswXVxuICAgICAgICAgIH1gO1xuICAgICAgICAgIHJldHVybiBzdGVwUm91dGVVcmwgPT09IGN1cnJlbnRSb3V0ZVVybDtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGdldCBjdXJyZW50IHN0ZXBcbiAgICAgICAgbGV0IGN1cnJlbnRTdGVwO1xuICAgICAgICBpZiAoY3VycmVudEluZGV4ID49IDApIHtcbiAgICAgICAgICBjdXJyZW50U3RlcCA9IHN0ZXBzW2N1cnJlbnRJbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEJvb2xlYW4oY3VycmVudFN0ZXApKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaXNTdGVwU2V0KHN0ZXBzW2N1cnJlbnRJbmRleCAtIDFdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXG4gICAgICAgICAgICAgIGBNaXNzaW5nIHN0ZXAgd2l0aCByb3V0ZSAnJHtjdXJyZW50Um91dGVVcmx9JyBpbiBjaGVja291dCBjb25maWd1cmF0aW9uIG9yIHRoaXMgc3RlcCBpcyBkaXNhYmxlZC5gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb2YodGhpcy5nZXRVcmwoJ2NoZWNrb3V0JykpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNTdGVwU2V0KHN0ZXA6IENoZWNrb3V0U3RlcCk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICBpZiAoc3RlcCAmJiAhc3RlcC5kaXNhYmxlZCkge1xuICAgICAgc3dpdGNoIChzdGVwLnR5cGVbMF0pIHtcbiAgICAgICAgY2FzZSBDaGVja291dFN0ZXBUeXBlLkRFTElWRVJZX0FERFJFU1M6IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pc0RlbGl2ZXJ5QWRkcmVzcyhzdGVwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoZWNrb3V0U3RlcFR5cGUuREVMSVZFUllfTU9ERToge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlzRGVsaXZlcnlNb2RlU2V0KHN0ZXApO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hlY2tvdXRTdGVwVHlwZS5QQVlNRU5UX0RFVEFJTFM6IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmNoZWNrb3V0U3RlcFNlcnZpY2UuZ2V0Q2hlY2tvdXRTdGVwKFxuICAgICAgICAgICAgICBDaGVja291dFN0ZXBUeXBlLkRFTElWRVJZX01PREVcbiAgICAgICAgICAgICk/LmRpc2FibGVkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrb3V0RGVsaXZlcnlNb2Rlc0ZhY2FkZS5zZXREZWxpdmVyeU1vZGUoJ3BpY2t1cCcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aGlzLmlzUGF5bWVudERldGFpbHNTZXQoc3RlcCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGVja291dFN0ZXBUeXBlLlJFVklFV19PUkRFUjoge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvZih0cnVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0RlbGl2ZXJ5QWRkcmVzcyhcbiAgICBzdGVwOiBDaGVja291dFN0ZXBcbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVXJsVHJlZT4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlLmdldERlbGl2ZXJ5QWRkcmVzc1N0YXRlKCkucGlwZShcbiAgICAgIGZpbHRlcigoc3RhdGUpID0+ICFzdGF0ZS5sb2FkaW5nKSxcbiAgICAgIG1hcCgoc3RhdGUpID0+IHN0YXRlLmRhdGEpLFxuICAgICAgbWFwKChkZWxpdmVyeUFkZHJlc3MpID0+IHtcbiAgICAgICAgaWYgKGRlbGl2ZXJ5QWRkcmVzcyAmJiBPYmplY3Qua2V5cyhkZWxpdmVyeUFkZHJlc3MpLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldFVybChzdGVwLnJvdXRlTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0RlbGl2ZXJ5TW9kZVNldChcbiAgICBzdGVwOiBDaGVja291dFN0ZXBcbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVXJsVHJlZT4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrb3V0RGVsaXZlcnlNb2Rlc0ZhY2FkZS5nZXRTZWxlY3RlZERlbGl2ZXJ5TW9kZVN0YXRlKCkucGlwZShcbiAgICAgIGZpbHRlcigoc3RhdGUpID0+ICFzdGF0ZS5sb2FkaW5nKSxcbiAgICAgIG1hcCgoc3RhdGUpID0+IHN0YXRlLmRhdGEpLFxuICAgICAgbWFwKChtb2RlKSA9PiAobW9kZSA/IHRydWUgOiB0aGlzLmdldFVybChzdGVwLnJvdXRlTmFtZSkpKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNQYXltZW50RGV0YWlsc1NldChcbiAgICBzdGVwOiBDaGVja291dFN0ZXBcbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVXJsVHJlZT4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrb3V0UGF5bWVudEZhY2FkZS5nZXRQYXltZW50RGV0YWlsc1N0YXRlKCkucGlwZShcbiAgICAgIGZpbHRlcigoc3RhdGUpID0+ICFzdGF0ZS5sb2FkaW5nKSxcbiAgICAgIG1hcCgoc3RhdGUpID0+IHN0YXRlLmRhdGEpLFxuICAgICAgbWFwKChwYXltZW50RGV0YWlscykgPT5cbiAgICAgICAgcGF5bWVudERldGFpbHMgJiYgT2JqZWN0LmtleXMocGF5bWVudERldGFpbHMpLmxlbmd0aCAhPT0gMFxuICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgIDogdGhpcy5nZXRVcmwoc3RlcC5yb3V0ZU5hbWUpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRVcmwocm91dGVOYW1lOiBzdHJpbmcpOiBVcmxUcmVlIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIucGFyc2VVcmwoXG4gICAgICB0aGlzLnJvdXRpbmdDb25maWdTZXJ2aWNlLmdldFJvdXRlQ29uZmlnKHJvdXRlTmFtZSk/LnBhdGhzPy5bMF0gYXMgc3RyaW5nXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRTdGVwTmFtZU11bHRpTGluZShcbiAgICBzdGVwVHlwZTogQ2hlY2tvdXRTdGVwVHlwZSxcbiAgICB2YWx1ZTogYm9vbGVhblxuICApOiB2b2lkIHtcbiAgICBjb25zdCBzdGVwID0gdGhpcy5jaGVja291dFN0ZXBTZXJ2aWNlLmdldENoZWNrb3V0U3RlcChzdGVwVHlwZSk7XG4gICAgaWYgKHN0ZXApIHtcbiAgICAgIHN0ZXAubmFtZU11bHRpTGluZSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==