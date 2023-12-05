/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { ASM_CUSTOMER_360_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class AsmCustomer360Facade {
}
AsmCustomer360Facade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Facade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AsmCustomer360Facade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Facade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: AsmCustomer360Facade,
        feature: ASM_CUSTOMER_360_FEATURE,
        methods: ['get360Data'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Facade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: AsmCustomer360Facade,
                        feature: ASM_CUSTOMER_360_FEATURE,
                        methods: ['get360Data'],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2N1c3RvbWVyLTM2MC9yb290L2ZhY2FkZS9hc20tY3VzdG9tZXItMzYwLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBWTNELE1BQU0sT0FBZ0Isb0JBQW9COztpSEFBcEIsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FSNUIsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSxvQkFBb0I7UUFDNUIsT0FBTyxFQUFFLHdCQUF3QjtRQUNqQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7S0FDeEIsQ0FBQzsyRkFFZ0Isb0JBQW9CO2tCQVR6QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0sc0JBQXNCO3dCQUM1QixPQUFPLEVBQUUsd0JBQXdCO3dCQUNqQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7cUJBQ3hCLENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFTTV9DVVNUT01FUl8zNjBfRkVBVFVSRSB9IGZyb20gJy4uL2ZlYXR1cmUtbmFtZSc7XG5pbXBvcnQgeyBBc21DdXN0b21lcjM2MFJlc3BvbnNlLCBBc21DdXN0b21lcjM2MFRhYkNvbXBvbmVudCB9IGZyb20gJy4uL21vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6ICgpID0+XG4gICAgZmFjYWRlRmFjdG9yeSh7XG4gICAgICBmYWNhZGU6IEFzbUN1c3RvbWVyMzYwRmFjYWRlLFxuICAgICAgZmVhdHVyZTogQVNNX0NVU1RPTUVSXzM2MF9GRUFUVVJFLFxuICAgICAgbWV0aG9kczogWydnZXQzNjBEYXRhJ10sXG4gICAgfSksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFzbUN1c3RvbWVyMzYwRmFjYWRlIHtcbiAgYWJzdHJhY3QgZ2V0MzYwRGF0YShcbiAgICBjb21wb25lbnRzOiBBcnJheTxBc21DdXN0b21lcjM2MFRhYkNvbXBvbmVudD5cbiAgKTogT2JzZXJ2YWJsZTxBc21DdXN0b21lcjM2MFJlc3BvbnNlIHwgdW5kZWZpbmVkPjtcbn1cbiJdfQ==