/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CartAddEntryFailEvent, CartUiEventAddToCart, } from '@spartacus/cart/base/root';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/storefront";
export class AddedToCartDialogEventListener {
    constructor(eventService, launchDialogService) {
        this.eventService = eventService;
        this.launchDialogService = launchDialogService;
        this.subscription = new Subscription();
        this.onAddToCart();
    }
    onAddToCart() {
        this.subscription.add(this.eventService.get(CartUiEventAddToCart).subscribe((event) => {
            this.openModal(event);
        }));
        this.subscription.add(this.eventService.get(CartAddEntryFailEvent).subscribe((event) => {
            this.closeModal(event);
        }));
    }
    openModal(event) {
        const addToCartData = {
            productCode: event.productCode,
            quantity: event.quantity,
            numberOfEntriesBeforeAdd: event.numberOfEntriesBeforeAdd,
            pickupStoreName: event.pickupStoreName,
        };
        const dialog = this.launchDialogService.openDialog("ADDED_TO_CART" /* LAUNCH_CALLER.ADDED_TO_CART */, undefined, undefined, addToCartData);
        if (dialog) {
            dialog.pipe(take(1)).subscribe();
        }
    }
    closeModal(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
AddedToCartDialogEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogEventListener, deps: [{ token: i1.EventService }, { token: i2.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Injectable });
AddedToCartDialogEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AddedToCartDialogEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i2.LaunchDialogService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkZWQtdG8tY2FydC1kaWFsb2ctZXZlbnQubGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL2NvbXBvbmVudHMvYWRkZWQtdG8tY2FydC1kaWFsb2cvYWRkZWQtdG8tY2FydC1kaWFsb2ctZXZlbnQubGlzdGVuZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUNMLHFCQUFxQixFQUNyQixvQkFBb0IsR0FDckIsTUFBTSwyQkFBMkIsQ0FBQztBQUduQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUt0QyxNQUFNLE9BQU8sOEJBQThCO0lBR3pDLFlBQ1ksWUFBMEIsRUFDMUIsbUJBQXdDO1FBRHhDLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFKMUMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBTTFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRVMsV0FBVztRQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUM5RCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRVMsU0FBUyxDQUFDLEtBQTJCO1FBQzdDLE1BQU0sYUFBYSxHQUFHO1lBQ3BCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztZQUM5QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDeEIsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLHdCQUF3QjtZQUN4RCxlQUFlLEVBQUUsS0FBSyxDQUFDLGVBQWU7U0FDdkMsQ0FBQztRQUVGLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLG9EQUVoRCxTQUFTLEVBQ1QsU0FBUyxFQUNULGFBQWEsQ0FDZCxDQUFDO1FBRUYsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUVTLFVBQVUsQ0FBQyxNQUFZO1FBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7OzJIQWxEVSw4QkFBOEI7K0hBQTlCLDhCQUE4QixjQUY3QixNQUFNOzJGQUVQLDhCQUE4QjtrQkFIMUMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENhcnRBZGRFbnRyeUZhaWxFdmVudCxcbiAgQ2FydFVpRXZlbnRBZGRUb0NhcnQsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgRXZlbnRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IExhdW5jaERpYWxvZ1NlcnZpY2UsIExBVU5DSF9DQUxMRVIgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQWRkZWRUb0NhcnREaWFsb2dFdmVudExpc3RlbmVyIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZXZlbnRTZXJ2aWNlOiBFdmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGxhdW5jaERpYWxvZ1NlcnZpY2U6IExhdW5jaERpYWxvZ1NlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5vbkFkZFRvQ2FydCgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9uQWRkVG9DYXJ0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuZXZlbnRTZXJ2aWNlLmdldChDYXJ0VWlFdmVudEFkZFRvQ2FydCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLm9wZW5Nb2RhbChldmVudCk7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLmV2ZW50U2VydmljZS5nZXQoQ2FydEFkZEVudHJ5RmFpbEV2ZW50KS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbChldmVudCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3Blbk1vZGFsKGV2ZW50OiBDYXJ0VWlFdmVudEFkZFRvQ2FydCk6IHZvaWQge1xuICAgIGNvbnN0IGFkZFRvQ2FydERhdGEgPSB7XG4gICAgICBwcm9kdWN0Q29kZTogZXZlbnQucHJvZHVjdENvZGUsXG4gICAgICBxdWFudGl0eTogZXZlbnQucXVhbnRpdHksXG4gICAgICBudW1iZXJPZkVudHJpZXNCZWZvcmVBZGQ6IGV2ZW50Lm51bWJlck9mRW50cmllc0JlZm9yZUFkZCxcbiAgICAgIHBpY2t1cFN0b3JlTmFtZTogZXZlbnQucGlja3VwU3RvcmVOYW1lLFxuICAgIH07XG5cbiAgICBjb25zdCBkaWFsb2cgPSB0aGlzLmxhdW5jaERpYWxvZ1NlcnZpY2Uub3BlbkRpYWxvZyhcbiAgICAgIExBVU5DSF9DQUxMRVIuQURERURfVE9fQ0FSVCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIHVuZGVmaW5lZCxcbiAgICAgIGFkZFRvQ2FydERhdGFcbiAgICApO1xuXG4gICAgaWYgKGRpYWxvZykge1xuICAgICAgZGlhbG9nLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGNsb3NlTW9kYWwocmVhc29uPzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLmNsb3NlRGlhbG9nKHJlYXNvbik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19