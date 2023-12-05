/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { DeleteCartFailEvent, DeleteCartSuccessEvent, } from '@spartacus/cart/base/root';
import { GlobalMessageType, } from '@spartacus/core';
import { merge } from 'rxjs';
import { map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cart/base/root";
export class ClearCartDialogComponentService {
    constructor(launchDialogService, globalMessageService, activeCartFacade, multiCartFacade, userIdService, eventService) {
        this.launchDialogService = launchDialogService;
        this.globalMessageService = globalMessageService;
        this.activeCartFacade = activeCartFacade;
        this.multiCartFacade = multiCartFacade;
        this.userIdService = userIdService;
        this.eventService = eventService;
    }
    /**
     * Clear the cart by deleting the active cart.
     */
    deleteActiveCart() {
        this.activeCartFacade
            .getActiveCartId()
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1), tap(([cartId, userId]) => {
            this.multiCartFacade.deleteCart(cartId, userId);
        }), switchMap(() => merge(this.eventService.get(DeleteCartSuccessEvent).pipe(map(() => true)), this.eventService.get(DeleteCartFailEvent).pipe(map(() => false))).pipe(take(1))), tap(() => this.closeDialog('Close dialog after cart cleared')))
            .subscribe((success) => {
            this.displayGlobalMessage(success);
        });
    }
    /**
     * Close clear cart modal dialog
     *
     * @param reason to close dialog
     */
    closeDialog(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    /**
     * Display global message after clearing cart.
     * By default, only message displayed is of type `Success`. A negative scenario
     * related to cart has been handled in the occ layer already.
     *
     * @param success result of clear cart action
     */
    displayGlobalMessage(success) {
        if (success) {
            this.globalMessageService.add({ key: 'clearCart.cartClearedSuccessfully' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }
    }
}
ClearCartDialogComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartDialogComponentService, deps: [{ token: i1.LaunchDialogService }, { token: i2.GlobalMessageService }, { token: i3.ActiveCartFacade }, { token: i3.MultiCartFacade }, { token: i2.UserIdService }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
ClearCartDialogComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartDialogComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClearCartDialogComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i2.GlobalMessageService }, { type: i3.ActiveCartFacade }, { type: i3.MultiCartFacade }, { type: i2.UserIdService }, { type: i2.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xlYXItY2FydC1kaWFsb2ctY29tcG9uZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL2NvbXBvbmVudHMvY2xlYXItY2FydC9jbGVhci1jYXJ0LWRpYWxvZy9jbGVhci1jYXJ0LWRpYWxvZy1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUwsbUJBQW1CLEVBQ25CLHNCQUFzQixHQUV2QixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFHTCxpQkFBaUIsR0FFbEIsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdCLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBSzNFLE1BQU0sT0FBTywrQkFBK0I7SUFDMUMsWUFDWSxtQkFBd0MsRUFDeEMsb0JBQTBDLEVBQzFDLGdCQUFrQyxFQUNsQyxlQUFnQyxFQUNoQyxhQUE0QixFQUM1QixZQUEwQjtRQUwxQix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFDbkMsQ0FBQztJQUVKOztPQUVHO0lBQ0gsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQjthQUNsQixlQUFlLEVBQUU7YUFDakIsSUFBSSxDQUNILGNBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQzlDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsRUFDRixTQUFTLENBQUMsR0FBRyxFQUFFLENBQ2IsS0FBSyxDQUNILElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNuRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FDbEUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2hCLEVBQ0QsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUMvRDthQUNBLFNBQVMsQ0FBQyxDQUFDLE9BQWdCLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVcsQ0FBQyxNQUFjO1FBQ3hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNPLG9CQUFvQixDQUFDLE9BQWdCO1FBQzdDLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0IsRUFBRSxHQUFHLEVBQUUsbUNBQW1DLEVBQUUsRUFDNUMsaUJBQWlCLENBQUMscUJBQXFCLENBQ3hDLENBQUM7U0FDSDtJQUNILENBQUM7OzRIQTFEVSwrQkFBK0I7Z0lBQS9CLCtCQUErQixjQUY5QixNQUFNOzJGQUVQLCtCQUErQjtrQkFIM0MsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBY3RpdmVDYXJ0RmFjYWRlLFxuICBEZWxldGVDYXJ0RmFpbEV2ZW50LFxuICBEZWxldGVDYXJ0U3VjY2Vzc0V2ZW50LFxuICBNdWx0aUNhcnRGYWNhZGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgRXZlbnRTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBMYXVuY2hEaWFsb2dTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFrZSwgdGFwLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENsZWFyQ2FydERpYWxvZ0NvbXBvbmVudFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0RmFjYWRlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCBtdWx0aUNhcnRGYWNhZGU6IE11bHRpQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2VcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgY2FydCBieSBkZWxldGluZyB0aGUgYWN0aXZlIGNhcnQuXG4gICAqL1xuICBkZWxldGVBY3RpdmVDYXJ0KCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZVxuICAgICAgLmdldEFjdGl2ZUNhcnRJZCgpXG4gICAgICAucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgdGFwKChbY2FydElkLCB1c2VySWRdKSA9PiB7XG4gICAgICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUuZGVsZXRlQ2FydChjYXJ0SWQsIHVzZXJJZCk7XG4gICAgICAgIH0pLFxuICAgICAgICBzd2l0Y2hNYXAoKCkgPT5cbiAgICAgICAgICBtZXJnZShcbiAgICAgICAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChEZWxldGVDYXJ0U3VjY2Vzc0V2ZW50KS5waXBlKG1hcCgoKSA9PiB0cnVlKSksXG4gICAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5nZXQoRGVsZXRlQ2FydEZhaWxFdmVudCkucGlwZShtYXAoKCkgPT4gZmFsc2UpKVxuICAgICAgICAgICkucGlwZSh0YWtlKDEpKVxuICAgICAgICApLFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy5jbG9zZURpYWxvZygnQ2xvc2UgZGlhbG9nIGFmdGVyIGNhcnQgY2xlYXJlZCcpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoc3VjY2VzczogYm9vbGVhbikgPT4ge1xuICAgICAgICB0aGlzLmRpc3BsYXlHbG9iYWxNZXNzYWdlKHN1Y2Nlc3MpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgY2xlYXIgY2FydCBtb2RhbCBkaWFsb2dcbiAgICpcbiAgICogQHBhcmFtIHJlYXNvbiB0byBjbG9zZSBkaWFsb2dcbiAgICovXG4gIGNsb3NlRGlhbG9nKHJlYXNvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLmNsb3NlRGlhbG9nKHJlYXNvbik7XG4gIH1cblxuICAvKipcbiAgICogRGlzcGxheSBnbG9iYWwgbWVzc2FnZSBhZnRlciBjbGVhcmluZyBjYXJ0LlxuICAgKiBCeSBkZWZhdWx0LCBvbmx5IG1lc3NhZ2UgZGlzcGxheWVkIGlzIG9mIHR5cGUgYFN1Y2Nlc3NgLiBBIG5lZ2F0aXZlIHNjZW5hcmlvXG4gICAqIHJlbGF0ZWQgdG8gY2FydCBoYXMgYmVlbiBoYW5kbGVkIGluIHRoZSBvY2MgbGF5ZXIgYWxyZWFkeS5cbiAgICpcbiAgICogQHBhcmFtIHN1Y2Nlc3MgcmVzdWx0IG9mIGNsZWFyIGNhcnQgYWN0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgZGlzcGxheUdsb2JhbE1lc3NhZ2Uoc3VjY2VzczogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgeyBrZXk6ICdjbGVhckNhcnQuY2FydENsZWFyZWRTdWNjZXNzZnVsbHknIH0sXG4gICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0NPTkZJUk1BVElPTlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==