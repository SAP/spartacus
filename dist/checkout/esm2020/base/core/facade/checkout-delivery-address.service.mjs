/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CheckoutDeliveryAddressClearedEvent, CheckoutDeliveryAddressCreatedEvent, CheckoutDeliveryAddressSetEvent, } from '@spartacus/checkout/base/root';
import { CommandStrategy, OCC_USER_ID_ANONYMOUS, } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "../connectors/checkout-delivery-address/checkout-delivery-address.connector";
import * as i4 from "@spartacus/checkout/base/root";
export class CheckoutDeliveryAddressService {
    constructor(activeCartFacade, userIdService, eventService, commandService, checkoutDeliveryAddressConnector, checkoutQueryFacade) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.eventService = eventService;
        this.commandService = commandService;
        this.checkoutDeliveryAddressConnector = checkoutDeliveryAddressConnector;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.createDeliveryAddressCommand = this.commandService.create((payload) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => {
            return this.checkoutDeliveryAddressConnector
                .createAddress(userId, cartId, payload)
                .pipe(map((address) => {
                address.titleCode = payload.titleCode;
                if (payload.region?.isocodeShort) {
                    address.region = {
                        ...address.region,
                        isocodeShort: payload.region.isocodeShort,
                    };
                }
                return address;
            }), tap((address) => this.eventService.dispatch({ userId, cartId, address }, CheckoutDeliveryAddressCreatedEvent)));
        })), {
            strategy: CommandStrategy.CancelPrevious,
        });
        this.setDeliveryAddressCommand = this.commandService.create((address) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => {
            const addressId = address.id;
            if (!addressId) {
                throw new Error('Checkout conditions not met');
            }
            return this.checkoutDeliveryAddressConnector
                .setAddress(userId, cartId, addressId)
                .pipe(tap(() => {
                this.eventService.dispatch({
                    userId,
                    cartId,
                    address,
                }, CheckoutDeliveryAddressSetEvent);
            }));
        })), {
            strategy: CommandStrategy.CancelPrevious,
        });
        this.clearDeliveryAddressCommand = this.commandService.create(() => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.checkoutDeliveryAddressConnector
            .clearCheckoutDeliveryAddress(userId, cartId)
            .pipe(tap(() => {
            this.eventService.dispatch({
                userId,
                cartId,
            }, CheckoutDeliveryAddressClearedEvent);
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
    getDeliveryAddressState() {
        return this.checkoutQueryFacade.getCheckoutDetailsState().pipe(map((state) => ({
            ...state,
            data: state.data?.deliveryAddress,
        })));
    }
    createAndSetAddress(address) {
        return this.createDeliveryAddressCommand.execute(address);
    }
    setDeliveryAddress(address) {
        return this.setDeliveryAddressCommand.execute(address);
    }
    clearCheckoutDeliveryAddress() {
        return this.clearDeliveryAddressCommand.execute();
    }
}
CheckoutDeliveryAddressService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.EventService }, { token: i2.CommandService }, { token: i3.CheckoutDeliveryAddressConnector }, { token: i4.CheckoutQueryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutDeliveryAddressService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutDeliveryAddressService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.EventService }, { type: i2.CommandService }, { type: i3.CheckoutDeliveryAddressConnector }, { type: i4.CheckoutQueryFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2UvY29yZS9mYWNhZGUvY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxtQ0FBbUMsRUFDbkMsbUNBQW1DLEVBRW5DLCtCQUErQixHQUVoQyxNQUFNLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sRUFJTCxlQUFlLEVBRWYscUJBQXFCLEdBR3RCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGFBQWEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQUkzRCxNQUFNLE9BQU8sOEJBQThCO0lBMEZ6QyxZQUNZLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixZQUEwQixFQUMxQixjQUE4QixFQUM5QixnQ0FBa0UsRUFDbEUsbUJBQXdDO1FBTHhDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHFDQUFnQyxHQUFoQyxnQ0FBZ0MsQ0FBa0M7UUFDbEUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQTdGMUMsaUNBQTRCLEdBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUN4QixDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ1YsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUMv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cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZlQ2FydEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDbGVhcmVkRXZlbnQsXG4gIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQ3JlYXRlZEV2ZW50LFxuICBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NTZXRFdmVudCxcbiAgQ2hlY2tvdXRRdWVyeUZhY2FkZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQWRkcmVzcyxcbiAgQ29tbWFuZCxcbiAgQ29tbWFuZFNlcnZpY2UsXG4gIENvbW1hbmRTdHJhdGVneSxcbiAgRXZlbnRTZXJ2aWNlLFxuICBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMsXG4gIFF1ZXJ5U3RhdGUsXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFrZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDb25uZWN0b3IgfSBmcm9tICcuLi9jb25uZWN0b3JzL2NoZWNrb3V0LWRlbGl2ZXJ5LWFkZHJlc3MvY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5jb25uZWN0b3InO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NTZXJ2aWNlXG4gIGltcGxlbWVudHMgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGVcbntcbiAgcHJvdGVjdGVkIGNyZWF0ZURlbGl2ZXJ5QWRkcmVzc0NvbW1hbmQ6IENvbW1hbmQ8QWRkcmVzcywgdW5rbm93bj4gPVxuICAgIHRoaXMuY29tbWFuZFNlcnZpY2UuY3JlYXRlPEFkZHJlc3M+KFxuICAgICAgKHBheWxvYWQpID0+XG4gICAgICAgIHRoaXMuY2hlY2tvdXRQcmVjb25kaXRpb25zKCkucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKFt1c2VySWQsIGNhcnRJZF0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQ29ubmVjdG9yXG4gICAgICAgICAgICAgIC5jcmVhdGVBZGRyZXNzKHVzZXJJZCwgY2FydElkLCBwYXlsb2FkKVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoKGFkZHJlc3MpID0+IHtcbiAgICAgICAgICAgICAgICAgIGFkZHJlc3MudGl0bGVDb2RlID0gcGF5bG9hZC50aXRsZUNvZGU7XG4gICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5yZWdpb24/Lmlzb2NvZGVTaG9ydCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzLnJlZ2lvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5hZGRyZXNzLnJlZ2lvbixcbiAgICAgICAgICAgICAgICAgICAgICBpc29jb2RlU2hvcnQ6IHBheWxvYWQucmVnaW9uLmlzb2NvZGVTaG9ydCxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiBhZGRyZXNzO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHRhcCgoYWRkcmVzcykgPT5cbiAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgICAgICB7IHVzZXJJZCwgY2FydElkLCBhZGRyZXNzIH0sXG4gICAgICAgICAgICAgICAgICAgIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQ3JlYXRlZEV2ZW50XG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH0pXG4gICAgICAgICksXG4gICAgICB7XG4gICAgICAgIHN0cmF0ZWd5OiBDb21tYW5kU3RyYXRlZ3kuQ2FuY2VsUHJldmlvdXMsXG4gICAgICB9XG4gICAgKTtcblxuICBwcm90ZWN0ZWQgc2V0RGVsaXZlcnlBZGRyZXNzQ29tbWFuZDogQ29tbWFuZDxBZGRyZXNzLCB1bmtub3duPiA9XG4gICAgdGhpcy5jb21tYW5kU2VydmljZS5jcmVhdGU8QWRkcmVzcz4oXG4gICAgICAoYWRkcmVzcykgPT5cbiAgICAgICAgdGhpcy5jaGVja291dFByZWNvbmRpdGlvbnMoKS5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgoW3VzZXJJZCwgY2FydElkXSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYWRkcmVzc0lkID0gYWRkcmVzcy5pZDtcbiAgICAgICAgICAgIGlmICghYWRkcmVzc0lkKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2tvdXQgY29uZGl0aW9ucyBub3QgbWV0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGVja291dERlbGl2ZXJ5QWRkcmVzc0Nvbm5lY3RvclxuICAgICAgICAgICAgICAuc2V0QWRkcmVzcyh1c2VySWQsIGNhcnRJZCwgYWRkcmVzc0lkKVxuICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudFNlcnZpY2UuZGlzcGF0Y2goXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgY2FydElkLFxuICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzU2V0RXZlbnRcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAge1xuICAgICAgICBzdHJhdGVneTogQ29tbWFuZFN0cmF0ZWd5LkNhbmNlbFByZXZpb3VzLFxuICAgICAgfVxuICAgICk7XG5cbiAgcHJvdGVjdGVkIGNsZWFyRGVsaXZlcnlBZGRyZXNzQ29tbWFuZDogQ29tbWFuZDx2b2lkLCB1bmtub3duPiA9XG4gICAgdGhpcy5jb21tYW5kU2VydmljZS5jcmVhdGU8dm9pZD4oXG4gICAgICAoKSA9PlxuICAgICAgICB0aGlzLmNoZWNrb3V0UHJlY29uZGl0aW9ucygpLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKChbdXNlcklkLCBjYXJ0SWRdKSA9PlxuICAgICAgICAgICAgdGhpcy5jaGVja291dERlbGl2ZXJ5QWRkcmVzc0Nvbm5lY3RvclxuICAgICAgICAgICAgICAuY2xlYXJDaGVja291dERlbGl2ZXJ5QWRkcmVzcyh1c2VySWQsIGNhcnRJZClcbiAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmRpc3BhdGNoKFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDbGVhcmVkRXZlbnRcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgIHtcbiAgICAgICAgc3RyYXRlZ3k6IENvbW1hbmRTdHJhdGVneS5DYW5jZWxQcmV2aW91cyxcbiAgICAgIH1cbiAgICApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0RmFjYWRlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29tbWFuZFNlcnZpY2U6IENvbW1hbmRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjaGVja291dERlbGl2ZXJ5QWRkcmVzc0Nvbm5lY3RvcjogQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDb25uZWN0b3IsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0UXVlcnlGYWNhZGU6IENoZWNrb3V0UXVlcnlGYWNhZGVcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyB0aGUgbmVjZXNzYXJ5IGNoZWNrb3V0IHByZWNvbmRpdGlvbnMuXG4gICAqL1xuICBwcm90ZWN0ZWQgY2hlY2tvdXRQcmVjb25kaXRpb25zKCk6IE9ic2VydmFibGU8W3N0cmluZywgc3RyaW5nXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKCksXG4gICAgICB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUudGFrZUFjdGl2ZUNhcnRJZCgpLFxuICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLmlzR3Vlc3RDYXJ0KCksXG4gICAgXSkucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBtYXAoKFt1c2VySWQsIGNhcnRJZCwgaXNHdWVzdENhcnRdKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhdXNlcklkIHx8XG4gICAgICAgICAgIWNhcnRJZCB8fFxuICAgICAgICAgICh1c2VySWQgPT09IE9DQ19VU0VSX0lEX0FOT05ZTU9VUyAmJiAhaXNHdWVzdENhcnQpXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2tvdXQgY29uZGl0aW9ucyBub3QgbWV0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt1c2VySWQsIGNhcnRJZF07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXREZWxpdmVyeUFkZHJlc3NTdGF0ZSgpOiBPYnNlcnZhYmxlPFF1ZXJ5U3RhdGU8QWRkcmVzcyB8IHVuZGVmaW5lZD4+IHtcbiAgICByZXR1cm4gdGhpcy5jaGVja291dFF1ZXJ5RmFjYWRlLmdldENoZWNrb3V0RGV0YWlsc1N0YXRlKCkucGlwZShcbiAgICAgIG1hcCgoc3RhdGUpID0+ICh7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkYXRhOiBzdGF0ZS5kYXRhPy5kZWxpdmVyeUFkZHJlc3MsXG4gICAgICB9KSlcbiAgICApO1xuICB9XG5cbiAgY3JlYXRlQW5kU2V0QWRkcmVzcyhhZGRyZXNzOiBBZGRyZXNzKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlRGVsaXZlcnlBZGRyZXNzQ29tbWFuZC5leGVjdXRlKGFkZHJlc3MpO1xuICB9XG5cbiAgc2V0RGVsaXZlcnlBZGRyZXNzKGFkZHJlc3M6IEFkZHJlc3MpOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5zZXREZWxpdmVyeUFkZHJlc3NDb21tYW5kLmV4ZWN1dGUoYWRkcmVzcyk7XG4gIH1cblxuICBjbGVhckNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzKCk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLmNsZWFyRGVsaXZlcnlBZGRyZXNzQ29tbWFuZC5leGVjdXRlKCk7XG4gIH1cbn1cbiJdfQ==