/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CreateCartEvent } from '@spartacus/cart/base/root';
import { BASE_SITE_CONTEXT_ID, StorageSyncType, } from '@spartacus/core';
import { combineLatest, of } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, takeWhile, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
export class MiniCartComponentService {
    constructor(activeCartFacade, authService, statePersistenceService, siteContextParamsService, eventService) {
        this.activeCartFacade = activeCartFacade;
        this.authService = authService;
        this.statePersistenceService = statePersistenceService;
        this.siteContextParamsService = siteContextParamsService;
        this.eventService = eventService;
    }
    /**
     * This function supports lazy loading of the cart functionality's code. We only call
     * the activeCartFacade if we know there is actually a cart.
     * Without a cart, we can return a default value and
     * avoid loading the cart library code.
     */
    getQuantity() {
        return this.activeCartRequired().pipe(switchMap((activeCartRequired) => {
            if (activeCartRequired) {
                return this.activeCartFacade.getActive().pipe(startWith({ totalUnitCount: 0 }), map((cart) => cart.totalUnitCount || 0));
            }
            else {
                return of(0);
            }
        }));
    }
    /**
     * This function supports lazy loading of the cart functionality's code. We only call
     * the activeCartFacade if we know there is actually a cart.
     * Without a cart, we can return a default value and
     * avoid loading the cart library code.
     */
    getTotalPrice() {
        return this.activeCartRequired().pipe(switchMap((activeCartRequired) => {
            if (activeCartRequired) {
                return this.activeCartFacade
                    .getActive()
                    .pipe(map((cart) => cart.totalPrice?.formattedValue ?? ''));
            }
            else {
                return of('');
            }
        }));
    }
    /**
     * This function determines if it is required to get active cart data from ActiveCartFacade.
     * It is required to call the ActiveCartFacade if one of these criteria is met:
     * - There is an active cart id in the browser local storage
     * - A user is authenticated
     * - The cart library code chunk with the ActiveCartFacade implementation is already loaded.
     *
     * Once the observable returned by activeCartRequired emits true, it completes.
     * activeCartRequired helps to make the mini cart compatible with some level of lazy loading.
     */
    activeCartRequired() {
        return combineLatest([
            this.hasActiveCartInStorage(),
            this.authService.isUserLoggedIn(),
            this.isCartCreated(),
        ]).pipe(map(([hasCartInStorage, isUserLoggedIn, isCartCreated]) => hasCartInStorage || isUserLoggedIn || isCartCreated), distinctUntilChanged(), takeWhile((hasCart) => !hasCart, true));
    }
    hasActiveCartInStorage() {
        return this.getCartStateFromBrowserStorage().pipe(map((state) => Boolean(state?.active)));
    }
    isCartCreated() {
        return this.eventService.get(CreateCartEvent).pipe(map((_) => true), startWith(false));
    }
    getCartStateFromBrowserStorage() {
        return this.siteContextParamsService.getValues([BASE_SITE_CONTEXT_ID]).pipe(map((context) => {
            return this.statePersistenceService.readStateFromStorage({
                key: 'cart',
                context: context,
                storageType: StorageSyncType.LOCAL_STORAGE,
            });
        }));
    }
}
MiniCartComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MiniCartComponentService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.AuthService }, { token: i2.StatePersistenceService }, { token: i2.SiteContextParamsService }, { token: i2.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
MiniCartComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MiniCartComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MiniCartComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.AuthService }, { type: i2.StatePersistenceService }, { type: i2.SiteContextParamsService }, { type: i2.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaS1jYXJ0LWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL21pbmktY2FydC9taW5pLWNhcnQtY29tcG9uZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFvQixlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RSxPQUFPLEVBRUwsb0JBQW9CLEVBSXBCLGVBQWUsR0FDaEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLEdBQUcsRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsR0FDVixNQUFNLGdCQUFnQixDQUFDOzs7O0FBS3hCLE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsWUFDWSxnQkFBa0MsRUFDbEMsV0FBd0IsRUFDeEIsdUJBQWdELEVBQ2hELHdCQUFrRCxFQUNsRCxZQUEwQjtRQUoxQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLDRCQUF1QixHQUF2Qix1QkFBdUIsQ0FBeUI7UUFDaEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUNuQyxDQUFDO0lBRUo7Ozs7O09BS0c7SUFDSCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQ25DLFNBQVMsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLEVBQUU7WUFDL0IsSUFBSSxrQkFBa0IsRUFBRTtnQkFDdEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUMzQyxTQUFTLENBQUMsRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDaEMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQyxDQUN4QyxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxhQUFhO1FBQ1gsT0FBTyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxJQUFJLENBQ25DLFNBQVMsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLEVBQUU7WUFDL0IsSUFBSSxrQkFBa0IsRUFBRTtnQkFDdEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCO3FCQUN6QixTQUFTLEVBQUU7cUJBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxjQUFjLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzthQUMvRDtpQkFBTTtnQkFDTCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNmO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDTyxrQkFBa0I7UUFDMUIsT0FBTyxhQUFhLENBQUM7WUFDbkIsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEVBQUU7U0FDckIsQ0FBQyxDQUFDLElBQUksQ0FDTCxHQUFHLENBQ0QsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUMsRUFBRSxFQUFFLENBQ3BELGdCQUFnQixJQUFJLGNBQWMsSUFBSSxhQUFhLENBQ3RELEVBQ0Qsb0JBQW9CLEVBQUUsRUFDdEIsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FDdkMsQ0FBQztJQUNKLENBQUM7SUFFUyxzQkFBc0I7UUFDOUIsT0FBTyxJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQyxJQUFJLENBQy9DLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUN2QyxDQUFDO0lBQ0osQ0FBQztJQUVTLGFBQWE7UUFDckIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxJQUFJLENBQ2hELEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQ2hCLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FDakIsQ0FBQztJQUNKLENBQUM7SUFFUyw4QkFBOEI7UUFHdEMsT0FBTyxJQUFJLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDekUsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDdkQsR0FBRyxFQUFFLE1BQU07Z0JBQ1gsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLFdBQVcsRUFBRSxlQUFlLENBQUMsYUFBYTthQUMzQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7cUhBcEdVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCLGNBRnZCLE1BQU07MkZBRVAsd0JBQXdCO2tCQUhwQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUsIENyZWF0ZUNhcnRFdmVudCB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQXV0aFNlcnZpY2UsXG4gIEJBU0VfU0lURV9DT05URVhUX0lELFxuICBFdmVudFNlcnZpY2UsXG4gIFNpdGVDb250ZXh0UGFyYW1zU2VydmljZSxcbiAgU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UsXG4gIFN0b3JhZ2VTeW5jVHlwZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgbWFwLFxuICBzdGFydFdpdGgsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZVdoaWxlLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBNaW5pQ2FydENvbXBvbmVudFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzdGF0ZVBlcnNpc3RlbmNlU2VydmljZTogU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHNpdGVDb250ZXh0UGFyYW1zU2VydmljZTogU2l0ZUNvbnRleHRQYXJhbXNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBldmVudFNlcnZpY2U6IEV2ZW50U2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gc3VwcG9ydHMgbGF6eSBsb2FkaW5nIG9mIHRoZSBjYXJ0IGZ1bmN0aW9uYWxpdHkncyBjb2RlLiBXZSBvbmx5IGNhbGxcbiAgICogdGhlIGFjdGl2ZUNhcnRGYWNhZGUgaWYgd2Uga25vdyB0aGVyZSBpcyBhY3R1YWxseSBhIGNhcnQuXG4gICAqIFdpdGhvdXQgYSBjYXJ0LCB3ZSBjYW4gcmV0dXJuIGEgZGVmYXVsdCB2YWx1ZSBhbmRcbiAgICogYXZvaWQgbG9hZGluZyB0aGUgY2FydCBsaWJyYXJ5IGNvZGUuXG4gICAqL1xuICBnZXRRdWFudGl0eSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnRSZXF1aXJlZCgpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGFjdGl2ZUNhcnRSZXF1aXJlZCkgPT4ge1xuICAgICAgICBpZiAoYWN0aXZlQ2FydFJlcXVpcmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS5nZXRBY3RpdmUoKS5waXBlKFxuICAgICAgICAgICAgc3RhcnRXaXRoKHsgdG90YWxVbml0Q291bnQ6IDAgfSksXG4gICAgICAgICAgICBtYXAoKGNhcnQpID0+IGNhcnQudG90YWxVbml0Q291bnQgfHwgMClcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvZigwKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gc3VwcG9ydHMgbGF6eSBsb2FkaW5nIG9mIHRoZSBjYXJ0IGZ1bmN0aW9uYWxpdHkncyBjb2RlLiBXZSBvbmx5IGNhbGxcbiAgICogdGhlIGFjdGl2ZUNhcnRGYWNhZGUgaWYgd2Uga25vdyB0aGVyZSBpcyBhY3R1YWxseSBhIGNhcnQuXG4gICAqIFdpdGhvdXQgYSBjYXJ0LCB3ZSBjYW4gcmV0dXJuIGEgZGVmYXVsdCB2YWx1ZSBhbmRcbiAgICogYXZvaWQgbG9hZGluZyB0aGUgY2FydCBsaWJyYXJ5IGNvZGUuXG4gICAqL1xuICBnZXRUb3RhbFByaWNlKCk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlQ2FydFJlcXVpcmVkKCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoYWN0aXZlQ2FydFJlcXVpcmVkKSA9PiB7XG4gICAgICAgIGlmIChhY3RpdmVDYXJ0UmVxdWlyZWQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hY3RpdmVDYXJ0RmFjYWRlXG4gICAgICAgICAgICAuZ2V0QWN0aXZlKClcbiAgICAgICAgICAgIC5waXBlKG1hcCgoY2FydCkgPT4gY2FydC50b3RhbFByaWNlPy5mb3JtYXR0ZWRWYWx1ZSA/PyAnJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvZignJyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGRldGVybWluZXMgaWYgaXQgaXMgcmVxdWlyZWQgdG8gZ2V0IGFjdGl2ZSBjYXJ0IGRhdGEgZnJvbSBBY3RpdmVDYXJ0RmFjYWRlLlxuICAgKiBJdCBpcyByZXF1aXJlZCB0byBjYWxsIHRoZSBBY3RpdmVDYXJ0RmFjYWRlIGlmIG9uZSBvZiB0aGVzZSBjcml0ZXJpYSBpcyBtZXQ6XG4gICAqIC0gVGhlcmUgaXMgYW4gYWN0aXZlIGNhcnQgaWQgaW4gdGhlIGJyb3dzZXIgbG9jYWwgc3RvcmFnZVxuICAgKiAtIEEgdXNlciBpcyBhdXRoZW50aWNhdGVkXG4gICAqIC0gVGhlIGNhcnQgbGlicmFyeSBjb2RlIGNodW5rIHdpdGggdGhlIEFjdGl2ZUNhcnRGYWNhZGUgaW1wbGVtZW50YXRpb24gaXMgYWxyZWFkeSBsb2FkZWQuXG4gICAqXG4gICAqIE9uY2UgdGhlIG9ic2VydmFibGUgcmV0dXJuZWQgYnkgYWN0aXZlQ2FydFJlcXVpcmVkIGVtaXRzIHRydWUsIGl0IGNvbXBsZXRlcy5cbiAgICogYWN0aXZlQ2FydFJlcXVpcmVkIGhlbHBzIHRvIG1ha2UgdGhlIG1pbmkgY2FydCBjb21wYXRpYmxlIHdpdGggc29tZSBsZXZlbCBvZiBsYXp5IGxvYWRpbmcuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWN0aXZlQ2FydFJlcXVpcmVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMuaGFzQWN0aXZlQ2FydEluU3RvcmFnZSgpLFxuICAgICAgdGhpcy5hdXRoU2VydmljZS5pc1VzZXJMb2dnZWRJbigpLFxuICAgICAgdGhpcy5pc0NhcnRDcmVhdGVkKCksXG4gICAgXSkucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKFtoYXNDYXJ0SW5TdG9yYWdlLCBpc1VzZXJMb2dnZWRJbiwgaXNDYXJ0Q3JlYXRlZF0pID0+XG4gICAgICAgICAgaGFzQ2FydEluU3RvcmFnZSB8fCBpc1VzZXJMb2dnZWRJbiB8fCBpc0NhcnRDcmVhdGVkXG4gICAgICApLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIHRha2VXaGlsZSgoaGFzQ2FydCkgPT4gIWhhc0NhcnQsIHRydWUpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYXNBY3RpdmVDYXJ0SW5TdG9yYWdlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmdldENhcnRTdGF0ZUZyb21Ccm93c2VyU3RvcmFnZSgpLnBpcGUoXG4gICAgICBtYXAoKHN0YXRlKSA9PiBCb29sZWFuKHN0YXRlPy5hY3RpdmUpKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDYXJ0Q3JlYXRlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5ldmVudFNlcnZpY2UuZ2V0KENyZWF0ZUNhcnRFdmVudCkucGlwZShcbiAgICAgIG1hcCgoXykgPT4gdHJ1ZSksXG4gICAgICBzdGFydFdpdGgoZmFsc2UpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRDYXJ0U3RhdGVGcm9tQnJvd3NlclN0b3JhZ2UoKTogT2JzZXJ2YWJsZTxcbiAgICB7IGFjdGl2ZTogc3RyaW5nIH0gfCB1bmRlZmluZWRcbiAgPiB7XG4gICAgcmV0dXJuIHRoaXMuc2l0ZUNvbnRleHRQYXJhbXNTZXJ2aWNlLmdldFZhbHVlcyhbQkFTRV9TSVRFX0NPTlRFWFRfSURdKS5waXBlKFxuICAgICAgbWFwKChjb250ZXh0KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLnJlYWRTdGF0ZUZyb21TdG9yYWdlKHtcbiAgICAgICAgICBrZXk6ICdjYXJ0JyxcbiAgICAgICAgICBjb250ZXh0OiBjb250ZXh0LFxuICAgICAgICAgIHN0b3JhZ2VUeXBlOiBTdG9yYWdlU3luY1R5cGUuTE9DQUxfU1RPUkFHRSxcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==