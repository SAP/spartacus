/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CheckoutDeliveryModeClearedErrorEvent, CheckoutDeliveryModeClearedEvent, CheckoutDeliveryModeSetEvent, CheckoutSupportedDeliveryModesQueryReloadEvent, CheckoutSupportedDeliveryModesQueryResetEvent, } from '@spartacus/checkout/base/root';
import { CommandStrategy, OCC_USER_ID_ANONYMOUS, } from '@spartacus/core';
import { combineLatest, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "../connectors/checkout-delivery-modes/checkout-delivery-modes.connector";
import * as i4 from "@spartacus/checkout/base/root";
export class CheckoutDeliveryModesService {
    /**
     * Returns the reload events for the supportedDeliveryModes query
     */
    getCheckoutSupportedDeliveryModesQueryReloadEvents() {
        return [CheckoutSupportedDeliveryModesQueryReloadEvent];
    }
    /**
     * Return the reset events for the supportedDeliveryModes query
     */
    getCheckoutSupportedDeliveryModesQueryResetEvents() {
        return [CheckoutSupportedDeliveryModesQueryResetEvent];
    }
    constructor(activeCartFacade, userIdService, eventService, queryService, commandService, checkoutDeliveryModesConnector, checkoutQueryFacade) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.eventService = eventService;
        this.queryService = queryService;
        this.commandService = commandService;
        this.checkoutDeliveryModesConnector = checkoutDeliveryModesConnector;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.supportedDeliveryModesQuery = this.queryService.create(() => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutDeliveryModesConnector.getSupportedModes(userId, cartId))), {
            reloadOn: this.getCheckoutSupportedDeliveryModesQueryReloadEvents(),
            resetOn: this.getCheckoutSupportedDeliveryModesQueryResetEvents(),
        });
        this.setDeliveryModeCommand = this.commandService.create((deliveryModeCode) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutDeliveryModesConnector
            .setMode(userId, cartId, deliveryModeCode)
            .pipe(tap(() => {
            this.eventService.dispatch({ userId, cartId, cartCode: cartId, deliveryModeCode }, CheckoutDeliveryModeSetEvent);
        })))), {
            strategy: CommandStrategy.CancelPrevious,
        });
        this.clearDeliveryModeCommand = this.commandService.create(() => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutDeliveryModesConnector
            .clearCheckoutDeliveryMode(userId, cartId)
            .pipe(tap(() => {
            this.eventService.dispatch({
                userId,
                cartId,
                /**
                 * As we know the cart is not anonymous (precondition checked),
                 * we can safely use the cartId, which is actually the cart.code.
                 */
                cartCode: cartId,
            }, CheckoutDeliveryModeClearedEvent);
        }), catchError((error) => {
            this.eventService.dispatch({
                userId,
                cartId,
                /**
                 * As we know the cart is not anonymous (precondition checked),
                 * we can safely use the cartId, which is actually the cart.code.
                 */
                cartCode: cartId,
            }, CheckoutDeliveryModeClearedErrorEvent);
            return throwError(error);
        })))), {
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
    getSupportedDeliveryModesState() {
        return this.supportedDeliveryModesQuery.getState();
    }
    getSupportedDeliveryModes() {
        return this.getSupportedDeliveryModesState().pipe(filter((state) => !state.loading), map((state) => state.data ?? []));
    }
    getSelectedDeliveryModeState() {
        return this.checkoutQueryFacade
            .getCheckoutDetailsState()
            .pipe(map((state) => ({ ...state, data: state.data?.deliveryMode })));
    }
    setDeliveryMode(mode) {
        return this.setDeliveryModeCommand.execute(mode);
    }
    clearCheckoutDeliveryMode() {
        return this.clearDeliveryModeCommand.execute();
    }
}
CheckoutDeliveryModesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.EventService }, { token: i2.QueryService }, { token: i2.CommandService }, { token: i3.CheckoutDeliveryModesConnector }, { token: i4.CheckoutQueryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryModesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryModesService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.EventService }, { type: i2.QueryService }, { type: i2.CommandService }, { type: i3.CheckoutDeliveryModesConnector }, { type: i4.CheckoutQueryFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktbW9kZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL2NvcmUvZmFjYWRlL2NoZWNrb3V0LWRlbGl2ZXJ5LW1vZGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUNMLHFDQUFxQyxFQUNyQyxnQ0FBZ0MsRUFDaEMsNEJBQTRCLEVBRzVCLDhDQUE4QyxFQUM5Qyw2Q0FBNkMsR0FDOUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBR0wsZUFBZSxFQUVmLHFCQUFxQixHQU10QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFJL0UsTUFBTSxPQUFPLDRCQUE0QjtJQUd2Qzs7T0FFRztJQUNPLGtEQUFrRDtRQUMxRCxPQUFPLENBQUMsOENBQThDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ0Q7O09BRUc7SUFDTyxpREFBaUQ7UUFDekQsT0FBTyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQXVGRCxZQUNZLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixZQUEwQixFQUMxQixZQUEwQixFQUMxQixjQUE4QixFQUM5Qiw4QkFBOEQsRUFDOUQsbUJBQXdDO1FBTnhDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIs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Q2pELENBQUM7O3lIQS9KVSw0QkFBNEI7NkhBQTVCLDRCQUE0QjsyRkFBNUIsNEJBQTRCO2tCQUR4QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZlQ2FydEZhY2FkZSwgRGVsaXZlcnlNb2RlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBDaGVja291dERlbGl2ZXJ5TW9kZUNsZWFyZWRFcnJvckV2ZW50LFxuICBDaGVja291dERlbGl2ZXJ5TW9kZUNsZWFyZWRFdmVudCxcbiAgQ2hlY2tvdXREZWxpdmVyeU1vZGVTZXRFdmVudCxcbiAgQ2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlLFxuICBDaGVja291dFF1ZXJ5RmFjYWRlLFxuICBDaGVja291dFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlbG9hZEV2ZW50LFxuICBDaGVja291dFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlc2V0RXZlbnQsXG59IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENvbW1hbmQsXG4gIENvbW1hbmRTZXJ2aWNlLFxuICBDb21tYW5kU3RyYXRlZ3ksXG4gIEV2ZW50U2VydmljZSxcbiAgT0NDX1VTRVJfSURfQU5PTllNT1VTLFxuICBRdWVyeSxcbiAgUXVlcnlOb3RpZmllcixcbiAgUXVlcnlTZXJ2aWNlLFxuICBRdWVyeVN0YXRlLFxuICBVc2VySWRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCwgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2hlY2tvdXREZWxpdmVyeU1vZGVzQ29ubmVjdG9yIH0gZnJvbSAnLi4vY29ubmVjdG9ycy9jaGVja291dC1kZWxpdmVyeS1tb2Rlcy9jaGVja291dC1kZWxpdmVyeS1tb2Rlcy5jb25uZWN0b3InO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXREZWxpdmVyeU1vZGVzU2VydmljZVxuICBpbXBsZW1lbnRzIENoZWNrb3V0RGVsaXZlcnlNb2Rlc0ZhY2FkZVxue1xuICAvKipcbiAgICogUmV0dXJucyB0aGUgcmVsb2FkIGV2ZW50cyBmb3IgdGhlIHN1cHBvcnRlZERlbGl2ZXJ5TW9kZXMgcXVlcnlcbiAgICovXG4gIHByb3RlY3RlZCBnZXRDaGVja291dFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlbG9hZEV2ZW50cygpOiBRdWVyeU5vdGlmaWVyW10ge1xuICAgIHJldHVybiBbQ2hlY2tvdXRTdXBwb3J0ZWREZWxpdmVyeU1vZGVzUXVlcnlSZWxvYWRFdmVudF07XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgcmVzZXQgZXZlbnRzIGZvciB0aGUgc3VwcG9ydGVkRGVsaXZlcnlNb2RlcyBxdWVyeVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldENoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVzZXRFdmVudHMoKTogUXVlcnlOb3RpZmllcltdIHtcbiAgICByZXR1cm4gW0NoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVzZXRFdmVudF07XG4gIH1cblxuICBwcm90ZWN0ZWQgc3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5OiBRdWVyeTxEZWxpdmVyeU1vZGVbXT4gPVxuICAgIHRoaXMucXVlcnlTZXJ2aWNlLmNyZWF0ZTxEZWxpdmVyeU1vZGVbXT4oXG4gICAgICAoKSA9PlxuICAgICAgICB0aGlzLmNoZWNrb3V0UHJlY29uZGl0aW9ucygpLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKChbdXNlcklkLCBjYXJ0SWRdKSA9PlxuICAgICAgICAgICAgdGhpcy5jaGVja291dERlbGl2ZXJ5TW9kZXNDb25uZWN0b3IuZ2V0U3VwcG9ydGVkTW9kZXMoXG4gICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgY2FydElkXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAge1xuICAgICAgICByZWxvYWRPbjogdGhpcy5nZXRDaGVja291dFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlbG9hZEV2ZW50cygpLFxuICAgICAgICByZXNldE9uOiB0aGlzLmdldENoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVzZXRFdmVudHMoKSxcbiAgICAgIH1cbiAgICApO1xuXG4gIHByb3RlY3RlZCBzZXREZWxpdmVyeU1vZGVDb21tYW5kOiBDb21tYW5kPHN0cmluZywgdW5rbm93bj4gPVxuICAgIHRoaXMuY29tbWFuZFNlcnZpY2UuY3JlYXRlPHN0cmluZz4oXG4gICAgICAoZGVsaXZlcnlNb2RlQ29kZSkgPT5cbiAgICAgICAgdGhpcy5jaGVja291dFByZWNvbmRpdGlvbnMoKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgoW3VzZXJJZCwgY2FydElkXSkgPT5cbiAgICAgICAgICAgIHRoaXMuY2hlY2tvdXREZWxpdmVyeU1vZGVzQ29ubmVjdG9yXG4gICAgICAgICAgICAgIC5zZXRNb2RlKHVzZXJJZCwgY2FydElkLCBkZWxpdmVyeU1vZGVDb2RlKVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgICAgIHsgdXNlcklkLCBjYXJ0SWQsIGNhcnRDb2RlOiBjYXJ0SWQsIGRlbGl2ZXJ5TW9kZUNvZGUgfSxcbiAgICAgICAgICAgICAgICAgICAgQ2hlY2tvdXREZWxpdmVyeU1vZGVTZXRFdmVudFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAge1xuICAgICAgICBzdHJhdGVneTogQ29tbWFuZFN0cmF0ZWd5LkNhbmNlbFByZXZpb3VzLFxuICAgICAgfVxuICAgICk7XG5cbiAgcHJvdGVjdGVkIGNsZWFyRGVsaXZlcnlNb2RlQ29tbWFuZDogQ29tbWFuZDx2b2lkLCB1bmtub3duPiA9XG4gICAgdGhpcy5jb21tYW5kU2VydmljZS5jcmVhdGU8dm9pZD4oXG4gICAgICAoKSA9PlxuICAgICAgICB0aGlzLmNoZWNrb3V0UHJlY29uZGl0aW9ucygpLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKChbdXNlcklkLCBjYXJ0SWRdKSA9PlxuICAgICAgICAgICAgdGhpcy5jaGVja291dERlbGl2ZXJ5TW9kZXNDb25uZWN0b3JcbiAgICAgICAgICAgICAgLmNsZWFyQ2hlY2tvdXREZWxpdmVyeU1vZGUodXNlcklkLCBjYXJ0SWQpXG4gICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICBjYXJ0SWQsXG4gICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICogQXMgd2Uga25vdyB0aGUgY2FydCBpcyBub3QgYW5vbnltb3VzIChwcmVjb25kaXRpb24gY2hlY2tlZCksXG4gICAgICAgICAgICAgICAgICAgICAgICogd2UgY2FuIHNhZmVseSB1c2UgdGhlIGNhcnRJZCwgd2hpY2ggaXMgYWN0dWFsbHkgdGhlIGNhcnQuY29kZS5cbiAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICBjYXJ0Q29kZTogY2FydElkLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBDaGVja291dERlbGl2ZXJ5TW9kZUNsZWFyZWRFdmVudFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgY2FydElkLFxuICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAqIEFzIHdlIGtub3cgdGhlIGNhcnQgaXMgbm90IGFub255bW91cyAocHJlY29uZGl0aW9uIGNoZWNrZWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAqIHdlIGNhbiBzYWZlbHkgdXNlIHRoZSBjYXJ0SWQsIHdoaWNoIGlzIGFjdHVhbGx5IHRoZSBjYXJ0LmNvZGUuXG4gICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgY2FydENvZGU6IGNhcnRJZCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgQ2hlY2tvdXREZWxpdmVyeU1vZGVDbGVhcmVkRXJyb3JFdmVudFxuICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICB7XG4gICAgICAgIHN0cmF0ZWd5OiBDb21tYW5kU3RyYXRlZ3kuQ2FuY2VsUHJldmlvdXMsXG4gICAgICB9XG4gICAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHF1ZXJ5U2VydmljZTogUXVlcnlTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb21tYW5kU2VydmljZTogQ29tbWFuZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0RGVsaXZlcnlNb2Rlc0Nvbm5lY3RvcjogQ2hlY2tvdXREZWxpdmVyeU1vZGVzQ29ubmVjdG9yLFxuICAgIHByb3RlY3RlZCBjaGVja291dFF1ZXJ5RmFjYWRlOiBDaGVja291dFF1ZXJ5RmFjYWRlXG4gICkge31cblxuICAvKipcbiAgICogUGVyZm9ybXMgdGhlIG5lY2Vzc2FyeSBjaGVja291dCBwcmVjb25kaXRpb25zLlxuICAgKi9cbiAgcHJvdGVjdGVkIGNoZWNrb3V0UHJlY29uZGl0aW9ucygpOiBPYnNlcnZhYmxlPFtzdHJpbmcsIHN0cmluZ10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnVzZXJJZFNlcnZpY2UudGFrZVVzZXJJZCgpLFxuICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLnRha2VBY3RpdmVDYXJ0SWQoKSxcbiAgICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS5pc0d1ZXN0Q2FydCgpLFxuICAgIF0pLnBpcGUoXG4gICAgICB0YWtlKDEpLFxuICAgICAgbWFwKChbdXNlcklkLCBjYXJ0SWQsIGlzR3Vlc3RDYXJ0XSkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIXVzZXJJZCB8fFxuICAgICAgICAgICFjYXJ0SWQgfHxcbiAgICAgICAgICAodXNlcklkID09PSBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMgJiYgIWlzR3Vlc3RDYXJ0KVxuICAgICAgICApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NoZWNrb3V0IGNvbmRpdGlvbnMgbm90IG1ldCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbdXNlcklkLCBjYXJ0SWRdO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1N0YXRlKCk6IE9ic2VydmFibGU8UXVlcnlTdGF0ZTxEZWxpdmVyeU1vZGVbXT4+IHtcbiAgICByZXR1cm4gdGhpcy5zdXBwb3J0ZWREZWxpdmVyeU1vZGVzUXVlcnkuZ2V0U3RhdGUoKTtcbiAgfVxuXG4gIGdldFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXMoKTogT2JzZXJ2YWJsZTxEZWxpdmVyeU1vZGVbXT4ge1xuICAgIHJldHVybiB0aGlzLmdldFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNTdGF0ZSgpLnBpcGUoXG4gICAgICBmaWx0ZXIoKHN0YXRlKSA9PiAhc3RhdGUubG9hZGluZyksXG4gICAgICBtYXAoKHN0YXRlKSA9PiBzdGF0ZS5kYXRhID8/IFtdKVxuICAgICk7XG4gIH1cblxuICBnZXRTZWxlY3RlZERlbGl2ZXJ5TW9kZVN0YXRlKCk6IE9ic2VydmFibGU8XG4gICAgUXVlcnlTdGF0ZTxEZWxpdmVyeU1vZGUgfCB1bmRlZmluZWQ+XG4gID4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrb3V0UXVlcnlGYWNhZGVcbiAgICAgIC5nZXRDaGVja291dERldGFpbHNTdGF0ZSgpXG4gICAgICAucGlwZShtYXAoKHN0YXRlKSA9PiAoeyAuLi5zdGF0ZSwgZGF0YTogc3RhdGUuZGF0YT8uZGVsaXZlcnlNb2RlIH0pKSk7XG4gIH1cblxuICBzZXREZWxpdmVyeU1vZGUobW9kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuc2V0RGVsaXZlcnlNb2RlQ29tbWFuZC5leGVjdXRlKG1vZGUpO1xuICB9XG5cbiAgY2xlYXJDaGVja291dERlbGl2ZXJ5TW9kZSgpOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5jbGVhckRlbGl2ZXJ5TW9kZUNvbW1hbmQuZXhlY3V0ZSgpO1xuICB9XG59XG4iXX0=