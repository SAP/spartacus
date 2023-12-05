/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CART_BASE_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class CartValidationFacade {
}
CartValidationFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CartValidationFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CartValidationFacade,
        feature: CART_BASE_CORE_FEATURE,
        methods: ['validateCart', 'getValidationResults'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CartValidationFacade,
                        feature: CART_BASE_CORE_FEATURE,
                        methods: ['validateCart', 'getValidationResults'],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC12YWxpZGF0aW9uLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2Uvcm9vdC9mYWNhZGUvY2FydC12YWxpZGF0aW9uLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBWXpELE1BQU0sT0FBZ0Isb0JBQW9COztpSEFBcEIsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FSNUIsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsc0JBQXNCLENBQUM7S0FDbEQsQ0FBQzsyRkFFZ0Isb0JBQW9CO2tCQVR6QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0sc0JBQXNCO3dCQUM1QixPQUFPLEVBQUUsc0JBQXNCO3dCQUMvQixPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsc0JBQXNCLENBQUM7cUJBQ2xELENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENBUlRfQkFTRV9DT1JFX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuaW1wb3J0IHsgQ2FydE1vZGlmaWNhdGlvbiwgQ2FydE1vZGlmaWNhdGlvbkxpc3QgfSBmcm9tICcuLi9tb2RlbHMvY2FydC5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VGYWN0b3J5OiAoKSA9PlxuICAgIGZhY2FkZUZhY3Rvcnkoe1xuICAgICAgZmFjYWRlOiBDYXJ0VmFsaWRhdGlvbkZhY2FkZSxcbiAgICAgIGZlYXR1cmU6IENBUlRfQkFTRV9DT1JFX0ZFQVRVUkUsXG4gICAgICBtZXRob2RzOiBbJ3ZhbGlkYXRlQ2FydCcsICdnZXRWYWxpZGF0aW9uUmVzdWx0cyddLFxuICAgIH0pLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDYXJ0VmFsaWRhdGlvbkZhY2FkZSB7XG4gIC8qKlxuICAgKiBWYWxpZGF0ZXMgY2FydCwgYW5kIHJldHVybnMgY2FydCBtb2RpZmljYXRpb24gbGlzdC5cbiAgICovXG4gIGFic3RyYWN0IHZhbGlkYXRlQ2FydCgpOiBPYnNlcnZhYmxlPENhcnRNb2RpZmljYXRpb25MaXN0PjtcblxuICAvKipcbiAgICogUmV0dXJucyBjYXJ0IG1vZGlmaWNhdGlvbiByZXN1bHRzXG4gICAqL1xuICBhYnN0cmFjdCBnZXRWYWxpZGF0aW9uUmVzdWx0cygpOiBPYnNlcnZhYmxlPENhcnRNb2RpZmljYXRpb25bXT47XG59XG4iXX0=