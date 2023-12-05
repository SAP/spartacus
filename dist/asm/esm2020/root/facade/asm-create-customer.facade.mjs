/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { ASM_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class AsmCreateCustomerFacade {
}
AsmCreateCustomerFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCreateCustomerFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AsmCreateCustomerFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCreateCustomerFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: AsmCreateCustomerFacade,
        feature: ASM_FEATURE,
        methods: ['createCustomer'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCreateCustomerFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: AsmCreateCustomerFacade,
                        feature: ASM_FEATURE,
                        methods: ['createCustomer'],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWNyZWF0ZS1jdXN0b21lci5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL3Jvb3QvZmFjYWRlL2FzbS1jcmVhdGUtY3VzdG9tZXIuZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUdoRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBWTlDLE1BQU0sT0FBZ0IsdUJBQXVCOztvSEFBdkIsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FSL0IsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSx1QkFBdUI7UUFDL0IsT0FBTyxFQUFFLFdBQVc7UUFDcEIsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7S0FDNUIsQ0FBQzsyRkFFZ0IsdUJBQXVCO2tCQVQ1QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0seUJBQXlCO3dCQUMvQixPQUFPLEVBQUUsV0FBVzt3QkFDcEIsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7cUJBQzVCLENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvYWNjb3VudC9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFTTV9GRUFUVVJFIH0gZnJvbSAnLi4vZmVhdHVyZS1uYW1lJztcbmltcG9ydCB7IEN1c3RvbWVyUmVnaXN0cmF0aW9uRm9ybSB9IGZyb20gJy4uL21vZGVsL2NyZWF0ZS1jdXN0b21lci5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VGYWN0b3J5OiAoKSA9PlxuICAgIGZhY2FkZUZhY3Rvcnkoe1xuICAgICAgZmFjYWRlOiBBc21DcmVhdGVDdXN0b21lckZhY2FkZSxcbiAgICAgIGZlYXR1cmU6IEFTTV9GRUFUVVJFLFxuICAgICAgbWV0aG9kczogWydjcmVhdGVDdXN0b21lciddLFxuICAgIH0pLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBc21DcmVhdGVDdXN0b21lckZhY2FkZSB7XG4gIGFic3RyYWN0IGNyZWF0ZUN1c3RvbWVyKHVzZXI6IEN1c3RvbWVyUmVnaXN0cmF0aW9uRm9ybSk6IE9ic2VydmFibGU8VXNlcj47XG59XG4iXX0=