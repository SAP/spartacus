/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { select } from '@ngrx/store';
import { CartType } from '@spartacus/cart/base/root';
import { BASE_SITE_CONTEXT_ID, StorageSyncType, } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { distinctUntilKeyChanged, filter, map } from 'rxjs/operators';
import { CartActions, MultiCartSelectors } from '../store';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@ngrx/store";
export class MultiCartStatePersistenceService {
    constructor(statePersistenceService, store, siteContextParamsService) {
        this.statePersistenceService = statePersistenceService;
        this.store = store;
        this.siteContextParamsService = siteContextParamsService;
        this.subscription = new Subscription();
    }
    initSync() {
        this.subscription.add(this.statePersistenceService.syncWithStorage({
            key: 'cart',
            state$: this.getCartState(),
            context$: this.siteContextParamsService.getValues([
                BASE_SITE_CONTEXT_ID,
            ]),
            storageType: StorageSyncType.LOCAL_STORAGE,
            onRead: (state) => this.onRead(state),
        }));
    }
    getCartState() {
        return this.store.pipe(
        // Since getCartState() may be called while the module is lazy loded
        // The cart state slice may not exist yet in the first store emissions.
        filter((store) => !!store.cart), select(MultiCartSelectors.getMultiCartState), filter((state) => !!state), map((state) => state.index), distinctUntilKeyChanged('Active'), map((indexState) => {
            return {
                active: indexState[CartType.ACTIVE] ?? '',
            };
        }));
    }
    onRead(state) {
        this.store.dispatch(new CartActions.ClearCartState());
        if (state) {
            this.store.dispatch(new CartActions.SetActiveCartId(state.active));
        }
        else {
            this.store.dispatch(new CartActions.SetActiveCartId(''));
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
MultiCartStatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartStatePersistenceService, deps: [{ token: i1.StatePersistenceService }, { token: i2.Store }, { token: i1.SiteContextParamsService }], target: i0.ɵɵFactoryTarget.Injectable });
MultiCartStatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartStatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartStatePersistenceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.StatePersistenceService }, { type: i2.Store }, { type: i1.SiteContextParamsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktY2FydC1zdGF0ZS1wZXJzaXN0ZW5jZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb3JlL3NlcnZpY2VzL211bHRpLWNhcnQtc3RhdGUtcGVyc2lzdGVuY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBQUUsTUFBTSxFQUFTLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQ0wsb0JBQW9CLEVBR3BCLGVBQWUsR0FDaEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7OztBQU0zRCxNQUFNLE9BQU8sZ0NBQWdDO0lBRzNDLFlBQ1ksdUJBQWdELEVBQ2hELEtBQWdDLEVBQ2hDLHdCQUFrRDtRQUZsRCw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQXlCO1FBQ2hELFVBQUssR0FBTCxLQUFLLENBQTJCO1FBQ2hDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFMcEQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBTXpDLENBQUM7SUFFRyxRQUFRO1FBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7WUFDM0MsR0FBRyxFQUFFLE1BQU07WUFDWCxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFNBQVMsQ0FBQztnQkFDaEQsb0JBQW9CO2FBQ3JCLENBQUM7WUFDRixXQUFXLEVBQUUsZUFBZSxDQUFDLGFBQWE7WUFDMUMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUN0QyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFUyxZQUFZO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO1FBQ3BCLG9FQUFvRTtRQUNwRSx1RUFBdUU7UUFDdkUsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUMvQixNQUFNLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsRUFDNUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQzFCLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUMzQix1QkFBdUIsQ0FBQyxRQUFRLENBQUMsRUFDakMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDakIsT0FBTztnQkFDTCxNQUFNLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO2FBQzFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVTLE1BQU0sQ0FBQyxLQUFxQztRQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxXQUFXLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQ3BFO2FBQU07WUFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMxRDtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs2SEFuRFUsZ0NBQWdDO2lJQUFoQyxnQ0FBZ0MsY0FGL0IsTUFBTTsyRkFFUCxnQ0FBZ0M7a0JBSDVDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQ2FydFR5cGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIEJBU0VfU0lURV9DT05URVhUX0lELFxuICBTaXRlQ29udGV4dFBhcmFtc1NlcnZpY2UsXG4gIFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLFxuICBTdG9yYWdlU3luY1R5cGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxLZXlDaGFuZ2VkLCBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENhcnRBY3Rpb25zLCBNdWx0aUNhcnRTZWxlY3RvcnMgfSBmcm9tICcuLi9zdG9yZSc7XG5pbXBvcnQgeyBTdGF0ZVdpdGhNdWx0aUNhcnQgfSBmcm9tICcuLi9zdG9yZS9tdWx0aS1jYXJ0LXN0YXRlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpQ2FydFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2U6IFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzdG9yZTogU3RvcmU8U3RhdGVXaXRoTXVsdGlDYXJ0PixcbiAgICBwcm90ZWN0ZWQgc2l0ZUNvbnRleHRQYXJhbXNTZXJ2aWNlOiBTaXRlQ29udGV4dFBhcmFtc1NlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBpbml0U3luYygpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLnN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLnN5bmNXaXRoU3RvcmFnZSh7XG4gICAgICAgIGtleTogJ2NhcnQnLFxuICAgICAgICBzdGF0ZSQ6IHRoaXMuZ2V0Q2FydFN0YXRlKCksXG4gICAgICAgIGNvbnRleHQkOiB0aGlzLnNpdGVDb250ZXh0UGFyYW1zU2VydmljZS5nZXRWYWx1ZXMoW1xuICAgICAgICAgIEJBU0VfU0lURV9DT05URVhUX0lELFxuICAgICAgICBdKSxcbiAgICAgICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VTeW5jVHlwZS5MT0NBTF9TVE9SQUdFLFxuICAgICAgICBvblJlYWQ6IChzdGF0ZSkgPT4gdGhpcy5vblJlYWQoc3RhdGUpLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldENhcnRTdGF0ZSgpOiBPYnNlcnZhYmxlPHsgYWN0aXZlOiBzdHJpbmcgfT4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnBpcGUoXG4gICAgICAvLyBTaW5jZSBnZXRDYXJ0U3RhdGUoKSBtYXkgYmUgY2FsbGVkIHdoaWxlIHRoZSBtb2R1bGUgaXMgbGF6eSBsb2RlZFxuICAgICAgLy8gVGhlIGNhcnQgc3RhdGUgc2xpY2UgbWF5IG5vdCBleGlzdCB5ZXQgaW4gdGhlIGZpcnN0IHN0b3JlIGVtaXNzaW9ucy5cbiAgICAgIGZpbHRlcigoc3RvcmUpID0+ICEhc3RvcmUuY2FydCksXG4gICAgICBzZWxlY3QoTXVsdGlDYXJ0U2VsZWN0b3JzLmdldE11bHRpQ2FydFN0YXRlKSxcbiAgICAgIGZpbHRlcigoc3RhdGUpID0+ICEhc3RhdGUpLFxuICAgICAgbWFwKChzdGF0ZSkgPT4gc3RhdGUuaW5kZXgpLFxuICAgICAgZGlzdGluY3RVbnRpbEtleUNoYW5nZWQoJ0FjdGl2ZScpLFxuICAgICAgbWFwKChpbmRleFN0YXRlKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWN0aXZlOiBpbmRleFN0YXRlW0NhcnRUeXBlLkFDVElWRV0gPz8gJycsXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25SZWFkKHN0YXRlOiB7IGFjdGl2ZTogc3RyaW5nIH0gfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBDYXJ0QWN0aW9ucy5DbGVhckNhcnRTdGF0ZSgpKTtcbiAgICBpZiAoc3RhdGUpIHtcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IENhcnRBY3Rpb25zLlNldEFjdGl2ZUNhcnRJZChzdGF0ZS5hY3RpdmUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQ2FydEFjdGlvbnMuU2V0QWN0aXZlQ2FydElkKCcnKSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19