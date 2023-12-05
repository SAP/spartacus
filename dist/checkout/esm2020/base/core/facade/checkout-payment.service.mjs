/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CheckoutPaymentCardTypesQueryReloadEvent, CheckoutPaymentCardTypesQueryResetEvent, CheckoutPaymentDetailsCreatedEvent, CheckoutPaymentDetailsSetEvent, } from '@spartacus/checkout/base/root';
import { CommandStrategy, OCC_USER_ID_ANONYMOUS, } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "../connectors/checkout-payment/checkout-payment.connector";
import * as i4 from "@spartacus/checkout/base/root";
export class CheckoutPaymentService {
    /**
     * Returns the reload events for the cardTypes query
     */
    getCheckoutPaymentCardTypesQueryReloadEvents() {
        return [CheckoutPaymentCardTypesQueryReloadEvent];
    }
    /**
     * Returns the reset events for the cardTypes query
     */
    getCheckoutPaymentCardTypesQueryResetEvents() {
        return [CheckoutPaymentCardTypesQueryResetEvent];
    }
    constructor(activeCartFacade, userIdService, queryService, commandService, eventService, checkoutPaymentConnector, checkoutQueryFacade) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.queryService = queryService;
        this.commandService = commandService;
        this.eventService = eventService;
        this.checkoutPaymentConnector = checkoutPaymentConnector;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.paymentCardTypesQuery = this.queryService.create(() => this.checkoutPaymentConnector.getPaymentCardTypes(), {
            reloadOn: this.getCheckoutPaymentCardTypesQueryReloadEvents(),
            resetOn: this.getCheckoutPaymentCardTypesQueryResetEvents(),
        });
        this.createPaymentMethodCommand = this.commandService.create((paymentDetails) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutPaymentConnector
            .createPaymentDetails(userId, cartId, paymentDetails)
            .pipe(tap((response) => this.eventService.dispatch({ userId, cartId, paymentDetails: response }, CheckoutPaymentDetailsCreatedEvent))))), {
            strategy: CommandStrategy.CancelPrevious,
        });
        this.setPaymentMethodCommand = this.commandService.create((paymentDetails) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => {
            const paymentDetailsId = paymentDetails?.id;
            if (!paymentDetailsId) {
                throw new Error('Checkout conditions not met');
            }
            return this.checkoutPaymentConnector
                .setPaymentDetails(userId, cartId, paymentDetailsId)
                .pipe(tap(() => this.eventService.dispatch({
                userId,
                cartId,
                paymentDetailsId,
            }, CheckoutPaymentDetailsSetEvent)));
        })), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
    /**
     * Performs the necessary checkout preconditions.
     */
    checkoutPreconditions() {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.activeCartFacade.takeActiveCartId(),
            this.activeCartFacade.isGuestCart(),
        ]).pipe(take(1), map(([userId, cartId, isGuestCart]) => {
            if (!userId ||
                !cartId ||
                (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)) {
                throw new Error('Checkout conditions not met');
            }
            return [userId, cartId];
        }));
    }
    getPaymentCardTypesState() {
        return this.paymentCardTypesQuery.getState();
    }
    getPaymentCardTypes() {
        return this.getPaymentCardTypesState().pipe(map((state) => state.data ?? []));
    }
    getPaymentDetailsState() {
        return this.checkoutQueryFacade
            .getCheckoutDetailsState()
            .pipe(map((state) => ({ ...state, data: state.data?.paymentInfo })));
    }
    createPaymentDetails(paymentDetails) {
        return this.createPaymentMethodCommand.execute(paymentDetails);
    }
    setPaymentDetails(paymentDetails) {
        return this.setPaymentMethodCommand.execute(paymentDetails);
    }
}
CheckoutPaymentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.QueryService }, { token: i2.CommandService }, { token: i2.EventService }, { token: i3.CheckoutPaymentConnector }, { token: i4.CheckoutQueryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutPaymentService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.QueryService }, { type: i2.CommandService }, { type: i2.EventService }, { type: i3.CheckoutPaymentConnector }, { type: i4.CheckoutQueryFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGF5bWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2UvY29yZS9mYWNhZGUvY2hlY2tvdXQtcGF5bWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTTNDLE9BQU8sRUFDTCx3Q0FBd0MsRUFDeEMsdUNBQXVDLEVBQ3ZDLGtDQUFrQyxFQUNsQyw4QkFBOEIsR0FHL0IsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBR0wsZUFBZSxFQUVmLHFCQUFxQixHQU10QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFJM0QsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQzs7T0FFRztJQUNPLDRDQUE0QztRQUNwRCxPQUFPLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7O09BRUc7SUFDTywyQ0FBMkM7UUFDbkQsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQThERCxZQUNZLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixZQUEwQixFQUMxQixjQUE4QixFQUM5QixZQUEwQixFQUMxQix3QkFBa0QsRUFDbEQsbUJBQXdDO1FBTnhDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLDZC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TyxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixPQUFPLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDLElBQUksQ0FDekMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUNqQyxDQUFDO0lBQ0osQ0FBQztJQUVELHNCQUFzQjtRQUNwQixPQUFPLElBQUksQ0FBQyxtQkFBbUI7YUFDNUIsdUJBQXVCLEVBQUU7YUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxjQUE4QjtRQUNqRCxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELGlCQUFpQixDQUFDLGNBQThCO1FBQzlDLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM5RCxDQUFDOzttSEFsSVUsc0JBQXNCO3VIQUF0QixzQkFBc0I7MkZBQXRCLHNCQUFzQjtrQkFEbEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGl2ZUNhcnRGYWNhZGUsXG4gIENhcmRUeXBlLFxuICBQYXltZW50RGV0YWlscyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBDaGVja291dFBheW1lbnRDYXJkVHlwZXNRdWVyeVJlbG9hZEV2ZW50LFxuICBDaGVja291dFBheW1lbnRDYXJkVHlwZXNRdWVyeVJlc2V0RXZlbnQsXG4gIENoZWNrb3V0UGF5bWVudERldGFpbHNDcmVhdGVkRXZlbnQsXG4gIENoZWNrb3V0UGF5bWVudERldGFpbHNTZXRFdmVudCxcbiAgQ2hlY2tvdXRQYXltZW50RmFjYWRlLFxuICBDaGVja291dFF1ZXJ5RmFjYWRlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBDb21tYW5kLFxuICBDb21tYW5kU2VydmljZSxcbiAgQ29tbWFuZFN0cmF0ZWd5LFxuICBFdmVudFNlcnZpY2UsXG4gIE9DQ19VU0VSX0lEX0FOT05ZTU9VUyxcbiAgUXVlcnksXG4gIFF1ZXJ5Tm90aWZpZXIsXG4gIFF1ZXJ5U2VydmljZSxcbiAgUXVlcnlTdGF0ZSxcbiAgVXNlcklkU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDaGVja291dFBheW1lbnRDb25uZWN0b3IgfSBmcm9tICcuLi9jb25uZWN0b3JzL2NoZWNrb3V0LXBheW1lbnQvY2hlY2tvdXQtcGF5bWVudC5jb25uZWN0b3InO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRQYXltZW50U2VydmljZSBpbXBsZW1lbnRzIENoZWNrb3V0UGF5bWVudEZhY2FkZSB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSByZWxvYWQgZXZlbnRzIGZvciB0aGUgY2FyZFR5cGVzIHF1ZXJ5XG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0Q2hlY2tvdXRQYXltZW50Q2FyZFR5cGVzUXVlcnlSZWxvYWRFdmVudHMoKTogUXVlcnlOb3RpZmllcltdIHtcbiAgICByZXR1cm4gW0NoZWNrb3V0UGF5bWVudENhcmRUeXBlc1F1ZXJ5UmVsb2FkRXZlbnRdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJlc2V0IGV2ZW50cyBmb3IgdGhlIGNhcmRUeXBlcyBxdWVyeVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldENoZWNrb3V0UGF5bWVudENhcmRUeXBlc1F1ZXJ5UmVzZXRFdmVudHMoKTogUXVlcnlOb3RpZmllcltdIHtcbiAgICByZXR1cm4gW0NoZWNrb3V0UGF5bWVudENhcmRUeXBlc1F1ZXJ5UmVzZXRFdmVudF07XG4gIH1cblxuICBwcm90ZWN0ZWQgcGF5bWVudENhcmRUeXBlc1F1ZXJ5OiBRdWVyeTxDYXJkVHlwZVtdPiA9IHRoaXMucXVlcnlTZXJ2aWNlLmNyZWF0ZTxcbiAgICBDYXJkVHlwZVtdXG4gID4oKCkgPT4gdGhpcy5jaGVja291dFBheW1lbnRDb25uZWN0b3IuZ2V0UGF5bWVudENhcmRUeXBlcygpLCB7XG4gICAgcmVsb2FkT246IHRoaXMuZ2V0Q2hlY2tvdXRQYXltZW50Q2FyZFR5cGVzUXVlcnlSZWxvYWRFdmVudHMoKSxcbiAgICByZXNldE9uOiB0aGlzLmdldENoZWNrb3V0UGF5bWVudENhcmRUeXBlc1F1ZXJ5UmVzZXRFdmVudHMoKSxcbiAgfSk7XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVBheW1lbnRNZXRob2RDb21tYW5kOiBDb21tYW5kPFBheW1lbnREZXRhaWxzLCB1bmtub3duPiA9XG4gICAgdGhpcy5jb21tYW5kU2VydmljZS5jcmVhdGU8UGF5bWVudERldGFpbHM+KFxuICAgICAgKHBheW1lbnREZXRhaWxzKSA9PlxuICAgICAgICB0aGlzLmNoZWNrb3V0UHJlY29uZGl0aW9ucygpLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKChbdXNlcklkLCBjYXJ0SWRdKSA9PlxuICAgICAgICAgICAgdGhpcy5jaGVja291dFBheW1lbnRDb25uZWN0b3JcbiAgICAgICAgICAgICAgLmNyZWF0ZVBheW1lbnREZXRhaWxzKHVzZXJJZCwgY2FydElkLCBwYXltZW50RGV0YWlscylcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFwKChyZXNwb25zZSkgPT5cbiAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgICAgICB7IHVzZXJJZCwgY2FydElkLCBwYXltZW50RGV0YWlsczogcmVzcG9uc2UgfSxcbiAgICAgICAgICAgICAgICAgICAgQ2hlY2tvdXRQYXltZW50RGV0YWlsc0NyZWF0ZWRFdmVudFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgIHtcbiAgICAgICAgc3RyYXRlZ3k6IENvbW1hbmRTdHJhdGVneS5DYW5jZWxQcmV2aW91cyxcbiAgICAgIH1cbiAgICApO1xuXG4gIHByb3RlY3RlZCBzZXRQYXltZW50TWV0aG9kQ29tbWFuZDogQ29tbWFuZDxQYXltZW50RGV0YWlscywgdW5rbm93bj4gPVxuICAgIHRoaXMuY29tbWFuZFNlcnZpY2UuY3JlYXRlPFBheW1lbnREZXRhaWxzPihcbiAgICAgIChwYXltZW50RGV0YWlscykgPT5cbiAgICAgICAgdGhpcy5jaGVja291dFByZWNvbmRpdGlvbnMoKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgoW3VzZXJJZCwgY2FydElkXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF5bWVudERldGFpbHNJZCA9IHBheW1lbnREZXRhaWxzPy5pZDtcbiAgICAgICAgICAgIGlmICghcGF5bWVudERldGFpbHNJZCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrb3V0IGNvbmRpdGlvbnMgbm90IG1ldCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGVja291dFBheW1lbnRDb25uZWN0b3JcbiAgICAgICAgICAgICAgLnNldFBheW1lbnREZXRhaWxzKHVzZXJJZCwgY2FydElkLCBwYXltZW50RGV0YWlsc0lkKVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YXAoKCkgPT5cbiAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICAgICAgICAgICAgICBwYXltZW50RGV0YWlsc0lkLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBDaGVja291dFBheW1lbnREZXRhaWxzU2V0RXZlbnRcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgIHtcbiAgICAgICAgc3RyYXRlZ3k6IENvbW1hbmRTdHJhdGVneS5DYW5jZWxQcmV2aW91cyxcbiAgICAgIH1cbiAgICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0RmFjYWRlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBxdWVyeVNlcnZpY2U6IFF1ZXJ5U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29tbWFuZFNlcnZpY2U6IENvbW1hbmRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXRQYXltZW50Q29ubmVjdG9yOiBDaGVja291dFBheW1lbnRDb25uZWN0b3IsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0UXVlcnlGYWNhZGU6IENoZWNrb3V0UXVlcnlGYWNhZGVcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyB0aGUgbmVjZXNzYXJ5IGNoZWNrb3V0IHByZWNvbmRpdGlvbnMuXG4gICAqL1xuICBwcm90ZWN0ZWQgY2hlY2tvdXRQcmVjb25kaXRpb25zKCk6IE9ic2VydmFibGU8W3N0cmluZywgc3RyaW5nXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKCksXG4gICAgICB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUudGFrZUFjdGl2ZUNhcnRJZCgpLFxuICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLmlzR3Vlc3RDYXJ0KCksXG4gICAgXSkucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBtYXAoKFt1c2VySWQsIGNhcnRJZCwgaXNHdWVzdENhcnRdKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhdXNlcklkIHx8XG4gICAgICAgICAgIWNhcnRJZCB8fFxuICAgICAgICAgICh1c2VySWQgPT09IE9DQ19VU0VSX0lEX0FOT05ZTU9VUyAmJiAhaXNHdWVzdENhcnQpXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2tvdXQgY29uZGl0aW9ucyBub3QgbWV0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt1c2VySWQsIGNhcnRJZF07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRQYXltZW50Q2FyZFR5cGVzU3RhdGUoKTogT2JzZXJ2YWJsZTxRdWVyeVN0YXRlPENhcmRUeXBlW10gfCB1bmRlZmluZWQ+PiB7XG4gICAgcmV0dXJuIHRoaXMucGF5bWVudENhcmRUeXBlc1F1ZXJ5LmdldFN0YXRlKCk7XG4gIH1cblxuICBnZXRQYXltZW50Q2FyZFR5cGVzKCk6IE9ic2VydmFibGU8Q2FyZFR5cGVbXT4ge1xuICAgIHJldHVybiB0aGlzLmdldFBheW1lbnRDYXJkVHlwZXNTdGF0ZSgpLnBpcGUoXG4gICAgICBtYXAoKHN0YXRlKSA9PiBzdGF0ZS5kYXRhID8/IFtdKVxuICAgICk7XG4gIH1cblxuICBnZXRQYXltZW50RGV0YWlsc1N0YXRlKCk6IE9ic2VydmFibGU8UXVlcnlTdGF0ZTxQYXltZW50RGV0YWlscyB8IHVuZGVmaW5lZD4+IHtcbiAgICByZXR1cm4gdGhpcy5jaGVja291dFF1ZXJ5RmFjYWRlXG4gICAgICAuZ2V0Q2hlY2tvdXREZXRhaWxzU3RhdGUoKVxuICAgICAgLnBpcGUobWFwKChzdGF0ZSkgPT4gKHsgLi4uc3RhdGUsIGRhdGE6IHN0YXRlLmRhdGE/LnBheW1lbnRJbmZvIH0pKSk7XG4gIH1cblxuICBjcmVhdGVQYXltZW50RGV0YWlscyhwYXltZW50RGV0YWlsczogUGF5bWVudERldGFpbHMpOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVQYXltZW50TWV0aG9kQ29tbWFuZC5leGVjdXRlKHBheW1lbnREZXRhaWxzKTtcbiAgfVxuXG4gIHNldFBheW1lbnREZXRhaWxzKHBheW1lbnREZXRhaWxzOiBQYXltZW50RGV0YWlscyk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLnNldFBheW1lbnRNZXRob2RDb21tYW5kLmV4ZWN1dGUocGF5bWVudERldGFpbHMpO1xuICB9XG59XG4iXX0=