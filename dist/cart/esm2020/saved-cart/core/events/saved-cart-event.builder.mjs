/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { CloneSavedCartEvent, CloneSavedCartFailEvent, CloneSavedCartSuccessEvent, EditSavedCartEvent, EditSavedCartFailEvent, EditSavedCartSuccessEvent, RestoreSavedCartEvent, RestoreSavedCartFailEvent, RestoreSavedCartSuccessEvent, SaveCartEvent, SaveCartFailEvent, SaveCartSuccessEvent, } from '@spartacus/cart/saved-cart/root';
import { createFrom, } from '@spartacus/core';
import { of } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SavedCartActions } from '../store/actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cart/base/root";
export class SavedCartEventBuilder {
    constructor(actionsSubject, eventService, stateEventService, multiCartService) {
        this.actionsSubject = actionsSubject;
        this.eventService = eventService;
        this.stateEventService = stateEventService;
        this.multiCartService = multiCartService;
        this.register();
    }
    /**
     * Registers events for the saved cart
     */
    register() {
        this.registerRestoreSavedCartEvents();
        this.registerSaveCartEvents();
        this.registerEditSavedCartEvents();
        this.registerCloneSavedCartEvents();
    }
    /**
     * Registers restore saved cart events
     */
    registerRestoreSavedCartEvents() {
        this.buildRestoreSavedCartEvents({
            action: SavedCartActions.RESTORE_SAVED_CART,
            event: RestoreSavedCartEvent,
        });
        this.buildRestoreSavedCartEvents({
            action: SavedCartActions.RESTORE_SAVED_CART_SUCCESS,
            event: RestoreSavedCartSuccessEvent,
        });
        this.buildRestoreSavedCartEvents({
            action: SavedCartActions.RESTORE_SAVED_CART_FAIL,
            event: RestoreSavedCartFailEvent,
        });
    }
    /**
     * Registers save cart events
     */
    registerSaveCartEvents() {
        this.buildSaveCartSuccessEvent({
            action: SavedCartActions.SAVE_CART_SUCCESS,
            event: SaveCartSuccessEvent,
        });
        this.stateEventService.register({
            action: SavedCartActions.SAVE_CART_FAIL,
            event: SaveCartFailEvent,
            factory: (action) => createFrom(SaveCartFailEvent, {
                ...action.payload,
                cartCode: action.payload.cartId,
            }),
        });
        this.stateEventService.register({
            action: SavedCartActions.SAVE_CART,
            event: SaveCartEvent,
            factory: (action) => {
                return createFrom(SaveCartEvent, {
                    ...action.payload,
                    cartCode: action.payload.cartId,
                });
            },
        });
    }
    /**
     * Registers edit saved cart events
     */
    registerEditSavedCartEvents() {
        this.buildSaveCartSuccessEvent({
            action: SavedCartActions.EDIT_SAVED_CART_SUCCESS,
            event: EditSavedCartSuccessEvent,
        });
        this.stateEventService.register({
            action: SavedCartActions.EDIT_SAVED_CART_FAIL,
            event: EditSavedCartFailEvent,
            factory: (action) => createFrom(EditSavedCartFailEvent, {
                ...action.payload,
                cartCode: action.payload.cartId,
            }),
        });
        this.stateEventService.register({
            action: SavedCartActions.EDIT_SAVED_CART,
            event: EditSavedCartEvent,
            factory: (action) => {
                return createFrom(EditSavedCartEvent, {
                    ...action.payload,
                    cartCode: action.payload.cartId,
                });
            },
        });
    }
    /**
     * Registers clone saved cart events
     */
    registerCloneSavedCartEvents() {
        this.buildRestoreSavedCartEvents({
            action: SavedCartActions.CLONE_SAVED_CART,
            event: CloneSavedCartEvent,
        });
        this.buildRestoreSavedCartEvents({
            action: SavedCartActions.CLONE_SAVED_CART_SUCCESS,
            event: CloneSavedCartSuccessEvent,
        });
        this.buildRestoreSavedCartEvents({
            action: SavedCartActions.CLONE_SAVED_CART_FAIL,
            event: CloneSavedCartFailEvent,
        });
    }
    /**
     * Builds the restore save cart events from the action and cart
     *
     * @param mapping mapping declaration from `action` string type to `event` class type
     * @param saveTime should the saveTime attribute be added to the event
     * @returns
     */
    buildRestoreSavedCartEvents(mapping) {
        const eventStream$ = this.getAction(mapping.action).pipe(switchMap((action) => of(action).pipe(withLatestFrom(this.multiCartService.getCart(action.payload.cartId)))), map(([action, cart]) => createFrom(mapping.event, {
            ...action.payload,
            cartCode: cart.code,
            saveCartName: cart.name,
            saveCartDescription: cart.description,
            ...(cart.saveTime && { saveTime: cart.saveTime }),
        })));
        return this.eventService.register(mapping.event, eventStream$);
    }
    /**
     * Builds save cart event by adding the saveTime from the cart
     *
     * @param mapping mapping declaration from `action` string type to `event` class type
     * @returns events register function
     */
    buildSaveCartSuccessEvent(mapping) {
        const eventStream$ = this.getAction(mapping.action).pipe(switchMap((action) => of(action).pipe(withLatestFrom(this.multiCartService.getCart(action.payload.cartId)))), filter(([, cart]) => Boolean(cart)), map(([action, cart]) => createFrom(mapping.event, {
            ...action.payload,
            cartCode: cart.code,
            saveTime: cart.saveTime,
        })));
        return this.eventService.register(mapping.event, eventStream$);
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
SavedCartEventBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartEventBuilder, deps: [{ token: i1.ActionsSubject }, { token: i2.EventService }, { token: i2.StateEventService }, { token: i3.MultiCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
SavedCartEventBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartEventBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartEventBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ActionsSubject }, { type: i2.EventService }, { type: i2.StateEventService }, { type: i3.MultiCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZWQtY2FydC1ldmVudC5idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvc2F2ZWQtY2FydC9jb3JlL2V2ZW50cy9zYXZlZC1jYXJ0LWV2ZW50LmJ1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQVEsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2QyxPQUFPLEVBQ0wsbUJBQW1CLEVBQ25CLHVCQUF1QixFQUN2QiwwQkFBMEIsRUFDMUIsa0JBQWtCLEVBQ2xCLHNCQUFzQixFQUN0Qix5QkFBeUIsRUFDekIscUJBQXFCLEVBQ3JCLHlCQUF5QixFQUN6Qiw0QkFBNEIsRUFDNUIsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixvQkFBb0IsR0FDckIsTUFBTSxpQ0FBaUMsQ0FBQztBQUN6QyxPQUFPLEVBRUwsVUFBVSxHQUdYLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7O0FBRzFELE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsWUFDWSxjQUE4QixFQUM5QixZQUEwQixFQUMxQixpQkFBb0MsRUFDcEMsZ0JBQWlDO1FBSGpDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFM0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxD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QUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUMvQyxDQUFDO0lBQ0osQ0FBQzs7a0hBN0xVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRFIsTUFBTTsyRkFDbkIscUJBQXFCO2tCQURqQyxVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG9mVHlwZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgQWN0aW9uc1N1YmplY3QgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBNdWx0aUNhcnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENsb25lU2F2ZWRDYXJ0RXZlbnQsXG4gIENsb25lU2F2ZWRDYXJ0RmFpbEV2ZW50LFxuICBDbG9uZVNhdmVkQ2FydFN1Y2Nlc3NFdmVudCxcbiAgRWRpdFNhdmVkQ2FydEV2ZW50LFxuICBFZGl0U2F2ZWRDYXJ0RmFpbEV2ZW50LFxuICBFZGl0U2F2ZWRDYXJ0U3VjY2Vzc0V2ZW50LFxuICBSZXN0b3JlU2F2ZWRDYXJ0RXZlbnQsXG4gIFJlc3RvcmVTYXZlZENhcnRGYWlsRXZlbnQsXG4gIFJlc3RvcmVTYXZlZENhcnRTdWNjZXNzRXZlbnQsXG4gIFNhdmVDYXJ0RXZlbnQsXG4gIFNhdmVDYXJ0RmFpbEV2ZW50LFxuICBTYXZlQ2FydFN1Y2Nlc3NFdmVudCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L3NhdmVkLWNhcnQvcm9vdCc7XG5pbXBvcnQge1xuICBBY3Rpb25Ub0V2ZW50TWFwcGluZyxcbiAgY3JlYXRlRnJvbSxcbiAgRXZlbnRTZXJ2aWNlLFxuICBTdGF0ZUV2ZW50U2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNhdmVkQ2FydEFjdGlvbnMgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zL2luZGV4JztcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBTYXZlZENhcnRFdmVudEJ1aWxkZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aW9uc1N1YmplY3Q6IEFjdGlvbnNTdWJqZWN0LFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgc3RhdGVFdmVudFNlcnZpY2U6IFN0YXRlRXZlbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBtdWx0aUNhcnRTZXJ2aWNlOiBNdWx0aUNhcnRGYWNhZGVcbiAgKSB7XG4gICAgdGhpcy5yZWdpc3RlcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBldmVudHMgZm9yIHRoZSBzYXZlZCBjYXJ0XG4gICAqL1xuICBwcm90ZWN0ZWQgcmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RlclJlc3RvcmVTYXZlZENhcnRFdmVudHMoKTtcbiAgICB0aGlzLnJlZ2lzdGVyU2F2ZUNhcnRFdmVudHMoKTtcbiAgICB0aGlzLnJlZ2lzdGVyRWRpdFNhdmVkQ2FydEV2ZW50cygpO1xuICAgIHRoaXMucmVnaXN0ZXJDbG9uZVNhdmVkQ2FydEV2ZW50cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyByZXN0b3JlIHNhdmVkIGNhcnQgZXZlbnRzXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVnaXN0ZXJSZXN0b3JlU2F2ZWRDYXJ0RXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuYnVpbGRSZXN0b3JlU2F2ZWRDYXJ0RXZlbnRzKHtcbiAgICAgIGFjdGlvbjogU2F2ZWRDYXJ0QWN0aW9ucy5SRVNUT1JFX1NBVkVEX0NBUlQsXG4gICAgICBldmVudDogUmVzdG9yZVNhdmVkQ2FydEV2ZW50LFxuICAgIH0pO1xuXG4gICAgdGhpcy5idWlsZFJlc3RvcmVTYXZlZENhcnRFdmVudHMoe1xuICAgICAgYWN0aW9uOiBTYXZlZENhcnRBY3Rpb25zLlJFU1RPUkVfU0FWRURfQ0FSVF9TVUNDRVNTLFxuICAgICAgZXZlbnQ6IFJlc3RvcmVTYXZlZENhcnRTdWNjZXNzRXZlbnQsXG4gICAgfSk7XG5cbiAgICB0aGlzLmJ1aWxkUmVzdG9yZVNhdmVkQ2FydEV2ZW50cyh7XG4gICAgICBhY3Rpb246IFNhdmVkQ2FydEFjdGlvbnMuUkVTVE9SRV9TQVZFRF9DQVJUX0ZBSUwsXG4gICAgICBldmVudDogUmVzdG9yZVNhdmVkQ2FydEZhaWxFdmVudCxcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgc2F2ZSBjYXJ0IGV2ZW50c1xuICAgKi9cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyU2F2ZUNhcnRFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy5idWlsZFNhdmVDYXJ0U3VjY2Vzc0V2ZW50KHtcbiAgICAgIGFjdGlvbjogU2F2ZWRDYXJ0QWN0aW9ucy5TQVZFX0NBUlRfU1VDQ0VTUyxcbiAgICAgIGV2ZW50OiBTYXZlQ2FydFN1Y2Nlc3NFdmVudCxcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGVFdmVudFNlcnZpY2UucmVnaXN0ZXIoe1xuICAgICAgYWN0aW9uOiBTYXZlZENhcnRBY3Rpb25zLlNBVkVfQ0FSVF9GQUlMLFxuICAgICAgZXZlbnQ6IFNhdmVDYXJ0RmFpbEV2ZW50LFxuICAgICAgZmFjdG9yeTogKGFjdGlvbjogU2F2ZWRDYXJ0QWN0aW9ucy5TYXZlQ2FydEZhaWwpID0+XG4gICAgICAgIGNyZWF0ZUZyb20oU2F2ZUNhcnRGYWlsRXZlbnQsIHtcbiAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgICBjYXJ0Q29kZTogYWN0aW9uLnBheWxvYWQuY2FydElkLFxuICAgICAgICB9KSxcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGVFdmVudFNlcnZpY2UucmVnaXN0ZXIoe1xuICAgICAgYWN0aW9uOiBTYXZlZENhcnRBY3Rpb25zLlNBVkVfQ0FSVCxcbiAgICAgIGV2ZW50OiBTYXZlQ2FydEV2ZW50LFxuICAgICAgZmFjdG9yeTogKGFjdGlvbjogU2F2ZWRDYXJ0QWN0aW9ucy5TYXZlQ2FydCkgPT4ge1xuICAgICAgICByZXR1cm4gY3JlYXRlRnJvbShTYXZlQ2FydEV2ZW50LCB7XG4gICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQsXG4gICAgICAgICAgY2FydENvZGU6IGFjdGlvbi5wYXlsb2FkLmNhcnRJZCxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBlZGl0IHNhdmVkIGNhcnQgZXZlbnRzXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVnaXN0ZXJFZGl0U2F2ZWRDYXJ0RXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMuYnVpbGRTYXZlQ2FydFN1Y2Nlc3NFdmVudCh7XG4gICAgICBhY3Rpb246IFNhdmVkQ2FydEFjdGlvbnMuRURJVF9TQVZFRF9DQVJUX1NVQ0NFU1MsXG4gICAgICBldmVudDogRWRpdFNhdmVkQ2FydFN1Y2Nlc3NFdmVudCxcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGVFdmVudFNlcnZpY2UucmVnaXN0ZXIoe1xuICAgICAgYWN0aW9uOiBTYXZlZENhcnRBY3Rpb25zLkVESVRfU0FWRURfQ0FSVF9GQUlMLFxuICAgICAgZXZlbnQ6IEVkaXRTYXZlZENhcnRGYWlsRXZlbnQsXG4gICAgICBmYWN0b3J5OiAoYWN0aW9uOiBTYXZlZENhcnRBY3Rpb25zLkVkaXRTYXZlZENhcnRGYWlsKSA9PlxuICAgICAgICBjcmVhdGVGcm9tKEVkaXRTYXZlZENhcnRGYWlsRXZlbnQsIHtcbiAgICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgICBjYXJ0Q29kZTogYWN0aW9uLnBheWxvYWQuY2FydElkLFxuICAgICAgICB9KSxcbiAgICB9KTtcblxuICAgIHRoaXMuc3RhdGVFdmVudFNlcnZpY2UucmVnaXN0ZXIoe1xuICAgICAgYWN0aW9uOiBTYXZlZENhcnRBY3Rpb25zLkVESVRfU0FWRURfQ0FSVCxcbiAgICAgIGV2ZW50OiBFZGl0U2F2ZWRDYXJ0RXZlbnQsXG4gICAgICBmYWN0b3J5OiAoYWN0aW9uOiBTYXZlZENhcnRBY3Rpb25zLkVkaXRTYXZlZENhcnQpID0+IHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUZyb20oRWRpdFNhdmVkQ2FydEV2ZW50LCB7XG4gICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQsXG4gICAgICAgICAgY2FydENvZGU6IGFjdGlvbi5wYXlsb2FkLmNhcnRJZCxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjbG9uZSBzYXZlZCBjYXJ0IGV2ZW50c1xuICAgKi9cbiAgcHJvdGVjdGVkIHJlZ2lzdGVyQ2xvbmVTYXZlZENhcnRFdmVudHMoKTogdm9pZCB7XG4gICAgdGhpcy5idWlsZFJlc3RvcmVTYXZlZENhcnRFdmVudHMoe1xuICAgICAgYWN0aW9uOiBTYXZlZENhcnRBY3Rpb25zLkNMT05FX1NBVkVEX0NBUlQsXG4gICAgICBldmVudDogQ2xvbmVTYXZlZENhcnRFdmVudCxcbiAgICB9KTtcblxuICAgIHRoaXMuYnVpbGRSZXN0b3JlU2F2ZWRDYXJ0RXZlbnRzKHtcbiAgICAgIGFjdGlvbjogU2F2ZWRDYXJ0QWN0aW9ucy5DTE9ORV9TQVZFRF9DQVJUX1NVQ0NFU1MsXG4gICAgICBldmVudDogQ2xvbmVTYXZlZENhcnRTdWNjZXNzRXZlbnQsXG4gICAgfSk7XG5cbiAgICB0aGlzLmJ1aWxkUmVzdG9yZVNhdmVkQ2FydEV2ZW50cyh7XG4gICAgICBhY3Rpb246IFNhdmVkQ2FydEFjdGlvbnMuQ0xPTkVfU0FWRURfQ0FSVF9GQUlMLFxuICAgICAgZXZlbnQ6IENsb25lU2F2ZWRDYXJ0RmFpbEV2ZW50LFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ1aWxkcyB0aGUgcmVzdG9yZSBzYXZlIGNhcnQgZXZlbnRzIGZyb20gdGhlIGFjdGlvbiBhbmQgY2FydFxuICAgKlxuICAgKiBAcGFyYW0gbWFwcGluZyBtYXBwaW5nIGRlY2xhcmF0aW9uIGZyb20gYGFjdGlvbmAgc3RyaW5nIHR5cGUgdG8gYGV2ZW50YCBjbGFzcyB0eXBlXG4gICAqIEBwYXJhbSBzYXZlVGltZSBzaG91bGQgdGhlIHNhdmVUaW1lIGF0dHJpYnV0ZSBiZSBhZGRlZCB0byB0aGUgZXZlbnRcbiAgICogQHJldHVybnNcbiAgICovXG4gIHByb3RlY3RlZCBidWlsZFJlc3RvcmVTYXZlZENhcnRFdmVudHM8VD4oXG4gICAgbWFwcGluZzogQWN0aW9uVG9FdmVudE1hcHBpbmc8VD5cbiAgKTogKCkgPT4gdm9pZCB7XG4gICAgY29uc3QgZXZlbnRTdHJlYW0kID0gdGhpcy5nZXRBY3Rpb24obWFwcGluZy5hY3Rpb24pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGFjdGlvbikgPT5cbiAgICAgICAgb2YoYWN0aW9uKS5waXBlKFxuICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMubXVsdGlDYXJ0U2VydmljZS5nZXRDYXJ0KGFjdGlvbi5wYXlsb2FkLmNhcnRJZCkpXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBtYXAoKFthY3Rpb24sIGNhcnRdKSA9PlxuICAgICAgICBjcmVhdGVGcm9tKG1hcHBpbmcuZXZlbnQgYXMgVHlwZTxUPiwge1xuICAgICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLFxuICAgICAgICAgIGNhcnRDb2RlOiBjYXJ0LmNvZGUsXG4gICAgICAgICAgc2F2ZUNhcnROYW1lOiBjYXJ0Lm5hbWUsXG4gICAgICAgICAgc2F2ZUNhcnREZXNjcmlwdGlvbjogY2FydC5kZXNjcmlwdGlvbixcbiAgICAgICAgICAuLi4oY2FydC5zYXZlVGltZSAmJiB7IHNhdmVUaW1lOiBjYXJ0LnNhdmVUaW1lIH0pLFxuICAgICAgICB9KVxuICAgICAgKVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRTZXJ2aWNlLnJlZ2lzdGVyKG1hcHBpbmcuZXZlbnQgYXMgVHlwZTxUPiwgZXZlbnRTdHJlYW0kKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCdWlsZHMgc2F2ZSBjYXJ0IGV2ZW50IGJ5IGFkZGluZyB0aGUgc2F2ZVRpbWUgZnJvbSB0aGUgY2FydFxuICAgKlxuICAgKiBAcGFyYW0gbWFwcGluZyBtYXBwaW5nIGRlY2xhcmF0aW9uIGZyb20gYGFjdGlvbmAgc3RyaW5nIHR5cGUgdG8gYGV2ZW50YCBjbGFzcyB0eXBlXG4gICAqIEByZXR1cm5zIGV2ZW50cyByZWdpc3RlciBmdW5jdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIGJ1aWxkU2F2ZUNhcnRTdWNjZXNzRXZlbnQ8VD4oXG4gICAgbWFwcGluZzogQWN0aW9uVG9FdmVudE1hcHBpbmc8VD5cbiAgKTogKCkgPT4gdm9pZCB7XG4gICAgY29uc3QgZXZlbnRTdHJlYW0kID0gdGhpcy5nZXRBY3Rpb24obWFwcGluZy5hY3Rpb24pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGFjdGlvbikgPT5cbiAgICAgICAgb2YoYWN0aW9uKS5waXBlKFxuICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMubXVsdGlDYXJ0U2VydmljZS5nZXRDYXJ0KGFjdGlvbi5wYXlsb2FkLmNhcnRJZCkpXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBmaWx0ZXIoKFssIGNhcnRdKSA9PiBCb29sZWFuKGNhcnQpKSxcbiAgICAgIG1hcCgoW2FjdGlvbiwgY2FydF0pID0+XG4gICAgICAgIGNyZWF0ZUZyb20obWFwcGluZy5ldmVudCBhcyBUeXBlPFQ+LCB7XG4gICAgICAgICAgLi4uYWN0aW9uLnBheWxvYWQsXG4gICAgICAgICAgY2FydENvZGU6IGNhcnQuY29kZSxcbiAgICAgICAgICBzYXZlVGltZTogY2FydC5zYXZlVGltZSxcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICAgIHJldHVybiB0aGlzLmV2ZW50U2VydmljZS5yZWdpc3RlcihtYXBwaW5nLmV2ZW50IGFzIFR5cGU8VD4sIGV2ZW50U3RyZWFtJCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmVhbSBvZiBhY3Rpb25zIG9ubHkgb2YgYSBnaXZlbiB0eXBlKHMpXG4gICAqXG4gICAqIEBwYXJhbSBhY3Rpb25UeXBlIHR5cGUocykgb2YgYWN0aW9uc1xuICAgKi9cbiAgcHJvdGVjdGVkIGdldEFjdGlvbihcbiAgICBhY3Rpb25UeXBlOiBzdHJpbmcgfCBzdHJpbmdbXVxuICApOiBPYnNlcnZhYmxlPHsgdHlwZTogc3RyaW5nOyBwYXlsb2FkPzogYW55IH0+IHtcbiAgICByZXR1cm4gdGhpcy5hY3Rpb25zU3ViamVjdC5waXBlKFxuICAgICAgb2ZUeXBlKC4uLihbXSBhcyBzdHJpbmdbXSkuY29uY2F0KGFjdGlvblR5cGUpKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==