/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { PICKUP_IN_STORE_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
/**
 * Service to store the user's preferred store for Pickup in Store in local storage.
 */
export class PreferredStoreFacade {
}
PreferredStoreFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PreferredStoreFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PreferredStoreFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PreferredStoreFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: PreferredStoreFacade,
        feature: PICKUP_IN_STORE_CORE_FEATURE,
        methods: [
            'getPreferredStore$',
            'getPreferredStoreWithProductInStock',
            'clearPreferredStore',
            'setPreferredStore',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PreferredStoreFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: PreferredStoreFacade,
                        feature: PICKUP_IN_STORE_CORE_FEATURE,
                        methods: [
                            'getPreferredStore$',
                            'getPreferredStoreWithProductInStock',
                            'clearPreferredStore',
                            'setPreferredStore',
                        ],
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZmVycmVkLXN0b3JlLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9waWNrdXAtaW4tc3RvcmUvcm9vdC9mYWNhZGUvcHJlZmVycmVkLXN0b3JlLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRy9EOztHQUVHO0FBZ0JILE1BQU0sT0FBZ0Isb0JBQW9COztpSEFBcEIsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FkNUIsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsT0FBTyxFQUFFLDRCQUE0QjtRQUNyQyxPQUFPLEVBQUU7WUFDUCxvQkFBb0I7WUFDcEIscUNBQXFDO1lBQ3JDLHFCQUFxQjtZQUNyQixtQkFBbUI7U0FDcEI7UUFDRCxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUM7MkZBRWdCLG9CQUFvQjtrQkFmekMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQzt3QkFDWixNQUFNLHNCQUFzQjt3QkFDNUIsT0FBTyxFQUFFLDRCQUE0Qjt3QkFDckMsT0FBTyxFQUFFOzRCQUNQLG9CQUFvQjs0QkFDcEIscUNBQXFDOzRCQUNyQyxxQkFBcUI7NEJBQ3JCLG1CQUFtQjt5QkFDcEI7d0JBQ0QsS0FBSyxFQUFFLElBQUk7cUJBQ1osQ0FBQztpQkFDTCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZhY2FkZUZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUElDS1VQX0lOX1NUT1JFX0NPUkVfRkVBVFVSRSB9IGZyb20gJy4uL2ZlYXR1cmUtbmFtZSc7XG5pbXBvcnQgeyBQb2ludE9mU2VydmljZU5hbWVzIH0gZnJvbSAnLi4vbW9kZWwvcG9pbnQtb2Ytc2VydmljZS1uYW1lcy5tb2RlbCc7XG5cbi8qKlxuICogU2VydmljZSB0byBzdG9yZSB0aGUgdXNlcidzIHByZWZlcnJlZCBzdG9yZSBmb3IgUGlja3VwIGluIFN0b3JlIGluIGxvY2FsIHN0b3JhZ2UuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VGYWN0b3J5OiAoKSA9PlxuICAgIGZhY2FkZUZhY3Rvcnkoe1xuICAgICAgZmFjYWRlOiBQcmVmZXJyZWRTdG9yZUZhY2FkZSxcbiAgICAgIGZlYXR1cmU6IFBJQ0tVUF9JTl9TVE9SRV9DT1JFX0ZFQVRVUkUsXG4gICAgICBtZXRob2RzOiBbXG4gICAgICAgICdnZXRQcmVmZXJyZWRTdG9yZSQnLFxuICAgICAgICAnZ2V0UHJlZmVycmVkU3RvcmVXaXRoUHJvZHVjdEluU3RvY2snLFxuICAgICAgICAnY2xlYXJQcmVmZXJyZWRTdG9yZScsXG4gICAgICAgICdzZXRQcmVmZXJyZWRTdG9yZScsXG4gICAgICBdLFxuICAgICAgYXN5bmM6IHRydWUsXG4gICAgfSksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFByZWZlcnJlZFN0b3JlRmFjYWRlIHtcbiAgLyoqXG4gICAqIEdldHMgdGhlIHVzZXIncyBwcmVmZXJyZWQgc3RvcmUgZm9yIFBpY2t1cCBpbiBTdG9yZS5cbiAgICogQHJldHVybnMgdGhlIHByZWZlcnJlZCBzdG9yZSBmcm9tIHRoZSBzdG9yZVxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0UHJlZmVycmVkU3RvcmUkKCk6IE9ic2VydmFibGU8UG9pbnRPZlNlcnZpY2VOYW1lcyB8IG51bGw+O1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSB1c2VyJ3MgcHJlZmVycmVkIHN0b3JlIGZvciBQaWNrdXAgaW4gU3RvcmUuXG4gICAqIEBwYXJhbSBwcmVmZXJyZWRTdG9yZSB0aGUgcHJlZmVycmVkIHN0b3JlIHRvIHNldFxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0UHJlZmVycmVkU3RvcmUocHJlZmVycmVkU3RvcmU6IFBvaW50T2ZTZXJ2aWNlTmFtZXMpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIHVzZXIncyBwcmVmZXJyZWQgc3RvcmUgZm9yIFBpY2t1cCBpbiBTdG9yZS5cbiAgICovXG4gIGFic3RyYWN0IGNsZWFyUHJlZmVycmVkU3RvcmUoKTogdm9pZDtcblxuICAvKipcbiAgICogR2V0IHRoZSB1c2VyJ3MgcHJlZmVycmVkIHN0b3JlIGZyb20gbG9jYWwgc3RvcmFnZSBhbmQgb25seSByZXR1cm4gaXQgaWYgaXRcbiAgICogaGFzIHN0b2NrIGZvciB0aGUgZ2l2ZW4gcHJvZHVjdC5cbiAgICogQHBhcmFtIHByb2R1Y3RDb2RlIFRoZSBwcm9kdWN0IGNvZGUgdG8gY2hlY2sgdGhlIHN0b2NrIGxldmVsIG9mXG4gICAqL1xuICBhYnN0cmFjdCBnZXRQcmVmZXJyZWRTdG9yZVdpdGhQcm9kdWN0SW5TdG9jayhcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8UG9pbnRPZlNlcnZpY2VOYW1lcz47XG59XG4iXX0=