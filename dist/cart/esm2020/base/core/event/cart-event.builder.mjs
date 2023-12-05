/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { AddCartVoucherEvent, AddCartVoucherFailEvent, AddCartVoucherSuccessEvent, CartAddEntryEvent, CartAddEntryFailEvent, CartAddEntrySuccessEvent, CartRemoveEntryFailEvent, CartRemoveEntrySuccessEvent, CartUpdateEntryFailEvent, CartUpdateEntrySuccessEvent, CreateCartEvent, CreateCartFailEvent, CreateCartSuccessEvent, DeleteCartEvent, DeleteCartFailEvent, DeleteCartSuccessEvent, RemoveCartVoucherEvent, RemoveCartVoucherFailEvent, RemoveCartVoucherSuccessEvent, MergeCartSuccessEvent, } from '@spartacus/cart/base/root';
import { createFrom, } from '@spartacus/core';
import { of } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { CartActions } from '../store/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cart/base/root";
/**
 * Registers events for the active cart
 */
export class CartEventBuilder {
    constructor(actionsSubject, event, activeCartService, stateEventService) {
        this.actionsSubject = actionsSubject;
        this.event = event;
        this.activeCartService = activeCartService;
        this.stateEventService = stateEventService;
        this.register();
    }
    /**
     * Registers events for the active cart
     */
    register() {
        this.registerCreateCart();
        this.registerAddEntry();
        this.registerRemoveEntry();
        this.registerUpdateEntry();
        this.registerDeleteCart();
        this.registerAddCartVoucher();
        this.registerRemoveCartVoucher();
        this.registerMergeCartSuccess();
    }
    /**
     * Register events for adding entry to the active cart
     */
    registerAddEntry() {
        this.registerMapped({
            action: CartActions.CART_ADD_ENTRY,
            event: CartAddEntryEvent,
        });
        this.registerMapped({
            action: CartActions.CART_ADD_ENTRY_SUCCESS,
            event: CartAddEntrySuccessEvent,
        });
        this.registerMapped({
            action: CartActions.CART_ADD_ENTRY_FAIL,
            event: CartAddEntryFailEvent,
        });
    }
    registerRemoveEntry() {
        this.registerMapped({
            action: CartActions.CART_REMOVE_ENTRY_SUCCESS,
            event: CartRemoveEntrySuccessEvent,
        });
        this.registerMapped({
            action: CartActions.CART_REMOVE_ENTRY_FAIL,
            event: CartRemoveEntryFailEvent,
        });
    }
    registerUpdateEntry() {
        this.registerMapped({
            action: CartActions.CART_UPDATE_ENTRY_SUCCESS,
            event: CartUpdateEntrySuccessEvent,
        });
        this.registerMapped({
            action: CartActions.CART_UPDATE_ENTRY_FAIL,
            event: CartUpdateEntryFailEvent,
        });
    }
    registerMergeCartSuccess() {
        this.registerMapped({
            action: CartActions.MERGE_CART_SUCCESS,
            event: MergeCartSuccessEvent,
        });
    }
    registerCreateCart() {
        this.stateEventService.register({
            action: CartActions.CREATE_CART,
            event: CreateCartEvent,
        });
        this.stateEventService.register({
            action: CartActions.CREATE_CART_SUCCESS,
            event: CreateCartSuccessEvent,
        });
        this.stateEventService.register({
            action: CartActions.CREATE_CART_FAIL,
            event: CreateCartFailEvent,
        });
    }
    /**
     * Registers delete cart events
     */
    registerDeleteCart() {
        this.stateEventService.register({
            action: CartActions.DELETE_CART,
            event: DeleteCartEvent,
            factory: (action) => createFrom(DeleteCartEvent, {
                ...action.payload,
                cartCode: action.payload.cartId,
            }),
        });
        this.stateEventService.register({
            action: CartActions.DELETE_CART_SUCCESS,
            event: DeleteCartSuccessEvent,
            factory: (action) => createFrom(DeleteCartSuccessEvent, {
                ...action.payload,
                cartCode: action.payload.cartId,
            }),
        });
        this.stateEventService.register({
            action: CartActions.DELETE_CART_FAIL,
            event: DeleteCartFailEvent,
            factory: (action) => createFrom(DeleteCartFailEvent, {
                ...action.payload,
                cartCode: action.payload.cartId,
            }),
        });
    }
    registerAddCartVoucher() {
        this.stateEventService.register({
            action: CartActions.CART_ADD_VOUCHER,
            event: AddCartVoucherEvent,
        });
        this.stateEventService.register({
            action: CartActions.CART_ADD_VOUCHER_SUCCESS,
            event: AddCartVoucherSuccessEvent,
        });
        this.stateEventService.register({
            action: CartActions.CART_ADD_VOUCHER_FAIL,
            event: AddCartVoucherFailEvent,
        });
    }
    registerRemoveCartVoucher() {
        this.stateEventService.register({
            action: CartActions.CART_REMOVE_VOUCHER,
            event: RemoveCartVoucherEvent,
        });
        this.stateEventService.register({
            action: CartActions.CART_REMOVE_VOUCHER_SUCCESS,
            event: RemoveCartVoucherSuccessEvent,
        });
        this.stateEventService.register({
            action: CartActions.CART_REMOVE_VOUCHER_FAIL,
            event: RemoveCartVoucherFailEvent,
        });
    }
    /**
     * Registers a stream of target events mapped from the source actions that contain the cart id equal to the active cart id.
     *
     * @param mapping mapping declaration - from `action` string type to `event` class type
     *   (an with optional `factory` function - by default `action.payload` will be assigned to the properties of the event instance).
     */
    registerMapped(mapping) {
        const eventStream$ = this.getAction(mapping.action).pipe(switchMap((action) => {
            // SwitchMap was used instead of withLatestFrom, because we only want to subscribe to cart stream when action is dispatched.
            // Using withLatestFrom would trigger subscription to cart observables on event subscription and that causes side effects,
            // such as loading cart when we don't yet need it.
            return of(action).pipe(withLatestFrom(this.activeCartService.getActive(), this.activeCartService.getActiveCartId()));
        }), filter(([action, _activeCart, activeCartId]) => action.payload['cartId'] === activeCartId), map(([action, activeCart]) => createFrom(mapping.event, {
            ...action.payload,
            cartCode: activeCart.code,
            entry: action.payload.entry
                ? action.payload.entry
                : activeCart.entries?.[Number(action.payload.entryNumber)],
        })));
        return this.event.register(mapping.event, eventStream$);
    }
    /**
     * Returns a stream of actions only of a given type(s)
     *
     * @param actionType type(s) of actions
     */
    getAction(actionType) {
        return this.actionsSubject.pipe(ofType(...[].concat(actionType)));
    }
}
CartEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEventBuilder, deps: [{ token: i1.ActionsSubject }, { token: i2.EventService }, { token: i3.ActiveCartFacade }, { token: i2.StateEventService }], target: i0.ɵɵFactoryTarget.Injectable });
CartEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartEventBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ActionsSubject }, { type: i2.EventService }, { type: i3.ActiveCartFacade }, { type: i2.StateEventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1ldmVudC5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb3JlL2V2ZW50L2NhcnQtZXZlbnQuYnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFFTCxtQkFBbUIsRUFDbkIsdUJBQXVCLEVBQ3ZCLDBCQUEwQixFQUMxQixpQkFBaUIsRUFDakIscUJBQXFCLEVBQ3JCLHdCQUF3QixFQUN4Qix3QkFBd0IsRUFDeEIsMkJBQTJCLEVBQzNCLHdCQUF3QixFQUN4QiwyQkFBMkIsRUFDM0IsZUFBZSxFQUNmLG1CQUFtQixFQUNuQixzQkFBc0IsRUFDdEIsZUFBZSxFQUNmLG1CQUFtQixFQUNuQixzQkFBc0IsRUFDdEIsc0JBQXNCLEVBQ3RCLDBCQUEwQixFQUMxQiw2QkFBNkIsRUFDN0IscUJBQXFCLEdBQ3RCLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUVMLFVBQVUsR0FHWCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFFN0M7O0dBRUc7QUFFSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLFlBQ1ksY0FBOEIsRUFDOUIsS0FBbUIsRUFDbkIsaUJBQW1DLEVBQ25DLGlCQUFvQztRQUhwQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsVUFBSyxHQUFMLEtBQUssQ0FBYztR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RSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQzNCLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBZ0IsRUFBRTtZQUNuQyxHQUFHLE1BQU0sQ0FBQyxPQUFPO1lBQ2pCLFFBQVEsRUFBRSxVQUFVLENBQUMsSUFBSTtZQUN6QixLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLO2dCQUN6QixDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLO2dCQUN0QixDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzdELENBQUMsQ0FDSCxDQUNGLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFnQixFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7OztPQUlHO0lBQ08sU0FBUyxDQUNqQixVQUE2QjtRQUU3QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUM3QixNQUFNLENBQUMsR0FBSSxFQUFlLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQy9DLENBQUM7SUFDSixDQUFDOzs2R0ExTVUsZ0JBQWdCO2lIQUFoQixnQkFBZ0IsY0FESCxNQUFNOzJGQUNuQixnQkFBZ0I7a0JBRDVCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgb2ZUeXBlIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBBY3Rpb25zU3ViamVjdCB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7XG4gIEFjdGl2ZUNhcnRGYWNhZGUsXG4gIEFkZENhcnRWb3VjaGVyRXZlbnQsXG4gIEFkZENhcnRWb3VjaGVyRmFpbEV2ZW50LFxuICBBZGRDYXJ0Vm91Y2hlclN1Y2Nlc3NFdmVudCxcbiAgQ2FydEFkZEVudHJ5RXZlbnQsXG4gIENhcnRBZGRFbnRyeUZhaWxFdmVudCxcbiAgQ2FydEFkZEVudHJ5U3VjY2Vzc0V2ZW50LFxuICBDYXJ0UmVtb3ZlRW50cnlGYWlsRXZlbnQsXG4gIENhcnRSZW1vdmVFbnRyeVN1Y2Nlc3NFdmVudCxcbiAgQ2FydFVwZGF0ZUVudHJ5RmFpbEV2ZW50LFxuICBDYXJ0VXBkYXRlRW50cnlTdWNjZXNzRXZlbnQsXG4gIENyZWF0ZUNhcnRFdmVudCxcbiAgQ3JlYXRlQ2FydEZhaWxFdmVudCxcbiAgQ3JlYXRlQ2FydFN1Y2Nlc3NFdmVudCxcbiAgRGVsZXRlQ2FydEV2ZW50LFxuICBEZWxldGVDYXJ0RmFpbEV2ZW50LFxuICBEZWxldGVDYXJ0U3VjY2Vzc0V2ZW50LFxuICBSZW1vdmVDYXJ0Vm91Y2hlckV2ZW50LFxuICBSZW1vdmVDYXJ0Vm91Y2hlckZhaWxFdmVudCxcbiAgUmVtb3ZlQ2FydFZvdWNoZXJTdWNjZXNzRXZlbnQsXG4gIE1lcmdlQ2FydFN1Y2Nlc3NFdmVudCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBBY3Rpb25Ub0V2ZW50TWFwcGluZyxcbiAgY3JlYXRlRnJvbSxcbiAgRXZlbnRTZXJ2aWNlLFxuICBTdGF0ZUV2ZW50U2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENhcnRBY3Rpb25zIH0gZnJvbSAnLi4vc3RvcmUvaW5kZXgnO1xuXG4vKipcbiAqIFJlZ2lzdGVycyBldmVudHMgZm9yIHRoZSBhY3RpdmUgY2FydFxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENhcnRFdmVudEJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aW9uc1N1YmplY3Q6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHByb3RlY3RlZCBldmVudDogRXZlbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0U2VydmljZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgc3RhdGVFdmVudFNlcnZpY2U6IFN0YXRlRXZlbnRTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgZXZlbnRzIGZvciB0aGUgYWN0aXZlIGNhcnRcbiAgICovXG4gIHByb3RlY3RlZCByZWdpc3RlcigpIHtcbiAgICB0aGlzLnJlZ2lzdGVyQ3JlYXRlQ2FydCgpO1xuICAgIHRoaXMucmVnaXN0ZXJBZGRFbnRyeSgpO1xuICAgIHRoaXMucmVnaXN0ZXJSZW1vdmVFbnRyeSgpO1xuICAgIHRoaXMucmVnaXN0ZXJVcGRhdGVFbnRyeSgpO1xuICAgIHRoaXMucmVnaXN0ZXJEZWxldGVDYXJ0KCk7XG4gICAgdGhpcy5yZWdpc3RlckFkZENhcnRWb3VjaGVyKCk7XG4gICAgdGhpcy5yZWdpc3RlclJlbW92ZUNhcnRWb3VjaGVyKCk7XG4gICAgdGhpcy5yZWdpc3Rlck1lcmdlQ2FydFN1Y2Nlc3MoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBldmVudHMgZm9yIGFkZGluZyBlbnRyeSB0byB0aGUgYWN0aXZlIGNhcnRcbiAgICovXG4gIHByb3RlY3RlZCByZWdpc3RlckFkZEVudHJ5KCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0ZXJNYXBwZWQoe1xuICAgICAgYWN0aW9uOiBDYXJ0QWN0aW9ucy5DQVJUX0FERF9FTlRSWSxcbiAgICAgIGV2ZW50OiBDYXJ0QWRkRW50cnlFdmVudCxcbiAgICB9KTtcbiAgICB0aGlzLnJlZ2lzdGVyTWFwcGVkKHtcbiAgICAgIGFjdGlvbjogQ2FydEFjdGlvbnMuQ0FSVF9BRERfRU5UUllfU1VDQ0VTUyxcbiAgICAgIGV2ZW50OiBDYXJ0QWRkRW50cnlTdWNjZXNzRXZlbnQsXG4gICAgfSk7XG4gICAgdGhpcy5yZWdpc3Rlck1hcHBlZCh7XG4gICAgICBhY3Rpb246IENhcnRBY3Rpb25zLkNBUlRfQUREX0VOVFJZX0ZBSUwsXG4gICAgICBldmVudDogQ2FydEFkZEVudHJ5RmFpbEV2ZW50LFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyUmVtb3ZlRW50cnkoKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3Rlck1hcHBlZCh7XG4gICAgICBhY3Rpb246IENhcnRBY3Rpb25zLkNBUlRfUkVNT1ZFX0VOVFJZX1NVQ0NFU1MsXG4gICAgICBldmVudDogQ2FydFJlbW92ZUVudHJ5U3VjY2Vzc0V2ZW50LFxuICAgIH0pO1xuICAgIHRoaXMucmVnaXN0ZXJNYXBwZWQoe1xuICAgICAgYWN0aW9uOiBDYXJ0QWN0aW9ucy5DQVJUX1JFTU9WRV9FTlRSWV9GQUlMLFxuICAgICAgZXZlbnQ6IENhcnRSZW1vdmVFbnRyeUZhaWxFdmVudCxcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZWdpc3RlclVwZGF0ZUVudHJ5KCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0ZXJNYXBwZWQoe1xuICAgICAgYWN0aW9uOiBDYXJ0QWN0aW9ucy5DQVJUX1VQREFURV9FTlRSWV9TVUNDRVNTLFxuICAgICAgZXZlbnQ6IENhcnRVcGRhdGVFbnRyeVN1Y2Nlc3NFdmVudCxcbiAgICB9KTtcbiAgICB0aGlzLnJlZ2lzdGVyTWFwcGVkKHtcbiAgICAgIGFjdGlvbjogQ2FydEFjdGlvbnMuQ0FSVF9VUERBVEVfRU5UUllfRkFJTCxcbiAgICAgIGV2ZW50OiBDYXJ0VXBkYXRlRW50cnlGYWlsRXZlbnQsXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVnaXN0ZXJNZXJnZUNhcnRTdWNjZXNzKCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0ZXJNYXBwZWQoe1xuICAgICAgYWN0aW9uOiBDYXJ0QWN0aW9ucy5NRVJHRV9DQVJUX1NVQ0NFU1MsXG4gICAgICBldmVudDogTWVyZ2VDYXJ0U3VjY2Vzc0V2ZW50LFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyQ3JlYXRlQ2FydCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlRXZlbnRTZXJ2aWNlLnJlZ2lzdGVyKHtcbiAgICAgIGFjdGlvbjogQ2FydEFjdGlvbnMuQ1JFQVRFX0NBUlQsXG4gICAgICBldmVudDogQ3JlYXRlQ2FydEV2ZW50LFxuICAgIH0pO1xuICAgIHRoaXMuc3RhdGVFdmVudFNlcnZpY2UucmVnaXN0ZXIoe1xuICAgICAgYWN0aW9uOiBDYXJ0QWN0aW9ucy5DUkVBVEVfQ0FSVF9TVUNDRVNTLFxuICAgICAgZXZlbnQ6IENyZWF0ZUNhcnRTdWNjZXNzRXZlbnQsXG4gICAgfSk7XG4gICAgdGhpcy5zdGF0ZUV2ZW50U2VydmljZS5yZWdpc3Rlcih7XG4gICAgICBhY3Rpb246IENhcnRBY3Rpb25zLkNSRUFURV9DQVJUX0ZBSUwsXG4gICAgICBldmVudDogQ3JlYXRlQ2FydEZhaWxFdmVudCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgZGVsZXRlIGNhcnQgZXZlbnRzXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVnaXN0ZXJEZWxldGVDYXJ0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhdGVFdmVudFNlcnZpY2UucmVnaXN0ZXIoe1xuICAgICAgYWN0aW9uOiBDYXJ0QWN0aW9ucy5ERUxFVEVfQ0FSVCxcbiAgICAgIGV2ZW50OiBEZWxldGVDYXJ0RXZlbnQsXG4gICAgICBmYWN0b3J5OiAoYWN0aW9uOiBDYXJ0QWN0aW9ucy5EZWxldGVDYXJ0KSA9PlxuICAgICAgICBjcmVhdGVGcm9tKERlbGV0ZUNhcnRFdmVudCwge1xuICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLFxuICAgICAgICAgIGNhcnRDb2RlOiBhY3Rpb24ucGF5bG9hZC5jYXJ0SWQsXG4gICAgICAgIH0pLFxuICAgIH0pO1xuXG4gICAgdGhpcy5zdGF0ZUV2ZW50U2VydmljZS5yZWdpc3Rlcih7XG4gICAgICBhY3Rpb246IENhcnRBY3Rpb25zLkRFTEVURV9DQVJUX1NVQ0NFU1MsXG4gICAgICBldmVudDogRGVsZXRlQ2FydFN1Y2Nlc3NFdmVudCxcbiAgICAgIGZhY3Rvcnk6IChhY3Rpb246IENhcnRBY3Rpb25zLkRlbGV0ZUNhcnRTdWNjZXNzKSA9PlxuICAgICAgICBjcmVhdGVGcm9tKERlbGV0ZUNhcnRTdWNjZXNzRXZlbnQsIHtcbiAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgICBjYXJ0Q29kZTogYWN0aW9uLnBheWxvYWQuY2FydElkLFxuICAgICAgICB9KSxcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGVFdmVudFNlcnZpY2UucmVnaXN0ZXIoe1xuICAgICAgYWN0aW9uOiBDYXJ0QWN0aW9ucy5ERUxFVEVfQ0FSVF9GQUlMLFxuICAgICAgZXZlbnQ6IERlbGV0ZUNhcnRGYWlsRXZlbnQsXG4gICAgICBmYWN0b3J5OiAoYWN0aW9uOiBDYXJ0QWN0aW9ucy5EZWxldGVDYXJ0RmFpbCkgPT5cbiAgICAgICAgY3JlYXRlRnJvbShEZWxldGVDYXJ0RmFpbEV2ZW50LCB7XG4gICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQsXG4gICAgICAgICAgY2FydENvZGU6IGFjdGlvbi5wYXlsb2FkLmNhcnRJZCxcbiAgICAgICAgfSksXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVnaXN0ZXJBZGRDYXJ0Vm91Y2hlcigpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlRXZlbnRTZXJ2aWNlLnJlZ2lzdGVyKHtcbiAgICAgIGFjdGlvbjogQ2FydEFjdGlvbnMuQ0FSVF9BRERfVk9VQ0hFUixcbiAgICAgIGV2ZW50OiBBZGRDYXJ0Vm91Y2hlckV2ZW50LFxuICAgIH0pO1xuXG4gICAgdGhpcy5zdGF0ZUV2ZW50U2VydmljZS5yZWdpc3Rlcih7XG4gICAgICBhY3Rpb246IENhcnRBY3Rpb25zLkNBUlRfQUREX1ZPVUNIRVJfU1VDQ0VTUyxcbiAgICAgIGV2ZW50OiBBZGRDYXJ0Vm91Y2hlclN1Y2Nlc3NFdmVudCxcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGVFdmVudFNlcnZpY2UucmVnaXN0ZXIoe1xuICAgICAgYWN0aW9uOiBDYXJ0QWN0aW9ucy5DQVJUX0FERF9WT1VDSEVSX0ZBSUwsXG4gICAgICBldmVudDogQWRkQ2FydFZvdWNoZXJGYWlsRXZlbnQsXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVnaXN0ZXJSZW1vdmVDYXJ0Vm91Y2hlcigpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXRlRXZlbnRTZXJ2aWNlLnJlZ2lzdGVyKHtcbiAgICAgIGFjdGlvbjogQ2FydEFjdGlvbnMuQ0FSVF9SRU1PVkVfVk9VQ0hFUixcbiAgICAgIGV2ZW50OiBSZW1vdmVDYXJ0Vm91Y2hlckV2ZW50LFxuICAgIH0pO1xuXG4gICAgdGhpcy5zdGF0ZUV2ZW50U2VydmljZS5yZWdpc3Rlcih7XG4gICAgICBhY3Rpb246IENhcnRBY3Rpb25zLkNBUlRfUkVNT1ZFX1ZPVUNIRVJfU1VDQ0VTUyxcbiAgICAgIGV2ZW50OiBSZW1vdmVDYXJ0Vm91Y2hlclN1Y2Nlc3NFdmVudCxcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGVFdmVudFNlcnZpY2UucmVnaXN0ZXIoe1xuICAgICAgYWN0aW9uOiBDYXJ0QWN0aW9ucy5DQVJUX1JFTU9WRV9WT1VDSEVSX0ZBSUwsXG4gICAgICBldmVudDogUmVtb3ZlQ2FydFZvdWNoZXJGYWlsRXZlbnQsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGEgc3RyZWFtIG9mIHRhcmdldCBldmVudHMgbWFwcGVkIGZyb20gdGhlIHNvdXJjZSBhY3Rpb25zIHRoYXQgY29udGFpbiB0aGUgY2FydCBpZCBlcXVhbCB0byB0aGUgYWN0aXZlIGNhcnQgaWQuXG4gICAqXG4gICAqIEBwYXJhbSBtYXBwaW5nIG1hcHBpbmcgZGVjbGFyYXRpb24gLSBmcm9tIGBhY3Rpb25gIHN0cmluZyB0eXBlIHRvIGBldmVudGAgY2xhc3MgdHlwZVxuICAgKiAgIChhbiB3aXRoIG9wdGlvbmFsIGBmYWN0b3J5YCBmdW5jdGlvbiAtIGJ5IGRlZmF1bHQgYGFjdGlvbi5wYXlsb2FkYCB3aWxsIGJlIGFzc2lnbmVkIHRvIHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBldmVudCBpbnN0YW5jZSkuXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVnaXN0ZXJNYXBwZWQ8VD4obWFwcGluZzogQWN0aW9uVG9FdmVudE1hcHBpbmc8VD4pOiAoKSA9PiB2b2lkIHtcbiAgICBjb25zdCBldmVudFN0cmVhbSQgPSB0aGlzLmdldEFjdGlvbihtYXBwaW5nLmFjdGlvbikucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoYWN0aW9uKSA9PiB7XG4gICAgICAgIC8vIFN3aXRjaE1hcCB3YXMgdXNlZCBpbnN0ZWFkIG9mIHdpdGhMYXRlc3RGcm9tLCBiZWNhdXNlIHdlIG9ubHkgd2FudCB0byBzdWJzY3JpYmUgdG8gY2FydCBzdHJlYW0gd2hlbiBhY3Rpb24gaXMgZGlzcGF0Y2hlZC5cbiAgICAgICAgLy8gVXNpbmcgd2l0aExhdGVzdEZyb20gd291bGQgdHJpZ2dlciBzdWJzY3JpcHRpb24gdG8gY2FydCBvYnNlcnZhYmxlcyBvbiBldmVudCBzdWJzY3JpcHRpb24gYW5kIHRoYXQgY2F1c2VzIHNpZGUgZWZmZWN0cyxcbiAgICAgICAgLy8gc3VjaCBhcyBsb2FkaW5nIGNhcnQgd2hlbiB3ZSBkb24ndCB5ZXQgbmVlZCBpdC5cbiAgICAgICAgcmV0dXJuIG9mKGFjdGlvbikucGlwZShcbiAgICAgICAgICB3aXRoTGF0ZXN0RnJvbShcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2UuZ2V0QWN0aXZlKCksXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlLmdldEFjdGl2ZUNhcnRJZCgpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgICBmaWx0ZXIoXG4gICAgICAgIChbYWN0aW9uLCBfYWN0aXZlQ2FydCwgYWN0aXZlQ2FydElkXSkgPT5cbiAgICAgICAgICBhY3Rpb24ucGF5bG9hZFsnY2FydElkJ10gPT09IGFjdGl2ZUNhcnRJZFxuICAgICAgKSxcbiAgICAgIG1hcCgoW2FjdGlvbiwgYWN0aXZlQ2FydF0pID0+XG4gICAgICAgIGNyZWF0ZUZyb20obWFwcGluZy5ldmVudCBhcyBUeXBlPFQ+LCB7XG4gICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQsXG4gICAgICAgICAgY2FydENvZGU6IGFjdGl2ZUNhcnQuY29kZSxcbiAgICAgICAgICBlbnRyeTogYWN0aW9uLnBheWxvYWQuZW50cnlcbiAgICAgICAgICAgID8gYWN0aW9uLnBheWxvYWQuZW50cnlcbiAgICAgICAgICAgIDogYWN0aXZlQ2FydC5lbnRyaWVzPy5bTnVtYmVyKGFjdGlvbi5wYXlsb2FkLmVudHJ5TnVtYmVyKV0sXG4gICAgICAgIH0pXG4gICAgICApXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5ldmVudC5yZWdpc3RlcihtYXBwaW5nLmV2ZW50IGFzIFR5cGU8VD4sIGV2ZW50U3RyZWFtJCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmVhbSBvZiBhY3Rpb25zIG9ubHkgb2YgYSBnaXZlbiB0eXBlKHMpXG4gICAqXG4gICAqIEBwYXJhbSBhY3Rpb25UeXBlIHR5cGUocykgb2YgYWN0aW9uc1xuICAgKi9cbiAgcHJvdGVjdGVkIGdldEFjdGlvbihcbiAgICBhY3Rpb25UeXBlOiBzdHJpbmcgfCBzdHJpbmdbXVxuICApOiBPYnNlcnZhYmxlPHsgdHlwZTogc3RyaW5nOyBwYXlsb2FkPzogYW55IH0+IHtcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zU3ViamVjdC5waXBlKFxuICAgICAgb2ZUeXBlKC4uLihbXSBhcyBzdHJpbmdbXSkuY29uY2F0KGFjdGlvblR5cGUpKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==