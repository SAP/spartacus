/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { REQUESTED_DELIVERY_DATE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export function requestedDeliveryDateFacadeFactory() {
    return facadeFactory({
        facade: RequestedDeliveryDateFacade,
        feature: REQUESTED_DELIVERY_DATE_FEATURE,
        methods: ['setRequestedDeliveryDate'],
    });
}
export class RequestedDeliveryDateFacade {
}
RequestedDeliveryDateFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
RequestedDeliveryDateFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateFacade, providedIn: 'root', useFactory: requestedDeliveryDateFacadeFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RequestedDeliveryDateFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: requestedDeliveryDateFacadeFactory,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdGVkLWRlbGl2ZXJ5LWRhdGUuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3JlcXVlc3RlZC1kZWxpdmVyeS1kYXRlL3Jvb3QvZmFjYWRlL3JlcXVlc3RlZC1kZWxpdmVyeS1kYXRlLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRWxFLE1BQU0sVUFBVSxrQ0FBa0M7SUFDaEQsT0FBTyxhQUFhLENBQUM7UUFDbkIsTUFBTSxFQUFFLDJCQUEyQjtRQUNuQyxPQUFPLEVBQUUsK0JBQStCO1FBQ3hDLE9BQU8sRUFBRSxDQUFDLDBCQUEwQixDQUFDO0tBQ3RDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFNRCxNQUFNLE9BQWdCLDJCQUEyQjs7d0hBQTNCLDJCQUEyQjs0SEFBM0IsMkJBQTJCLGNBSG5DLE1BQU0sY0FDTixrQ0FBa0M7MkZBRTFCLDJCQUEyQjtrQkFKaEQsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLGtDQUFrQztpQkFDL0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFJFUVVFU1RFRF9ERUxJVkVSWV9EQVRFX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVxdWVzdGVkRGVsaXZlcnlEYXRlRmFjYWRlRmFjdG9yeSgpIHtcbiAgcmV0dXJuIGZhY2FkZUZhY3Rvcnkoe1xuICAgIGZhY2FkZTogUmVxdWVzdGVkRGVsaXZlcnlEYXRlRmFjYWRlLFxuICAgIGZlYXR1cmU6IFJFUVVFU1RFRF9ERUxJVkVSWV9EQVRFX0ZFQVRVUkUsXG4gICAgbWV0aG9kczogWydzZXRSZXF1ZXN0ZWREZWxpdmVyeURhdGUnXSxcbiAgfSk7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VGYWN0b3J5OiByZXF1ZXN0ZWREZWxpdmVyeURhdGVGYWNhZGVGYWN0b3J5LFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBSZXF1ZXN0ZWREZWxpdmVyeURhdGVGYWNhZGUge1xuICAvKipcbiAgICogU2V0IHRoZSByZXF1ZXN0ZWQgZGVsaXZlcnkgZGF0ZVxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0UmVxdWVzdGVkRGVsaXZlcnlEYXRlKFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIGNhcnRJZDogc3RyaW5nLFxuICAgIHJlcXVlc3RlZERhdGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPHt9Pjtcbn1cbiJdfQ==