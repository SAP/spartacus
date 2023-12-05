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
 * Store the Point of Service a user wants to collect a product from before it is added to the cart.
 */
export class IntendedPickupLocationFacade {
}
IntendedPickupLocationFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IntendedPickupLocationFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
IntendedPickupLocationFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IntendedPickupLocationFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: IntendedPickupLocationFacade,
        feature: PICKUP_IN_STORE_CORE_FEATURE,
        methods: [
            'getIntendedLocation',
            'setIntendedLocation',
            'removeIntendedLocation',
            'getPickupOption',
            'setPickupOption',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: IntendedPickupLocationFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: IntendedPickupLocationFacade,
                        feature: PICKUP_IN_STORE_CORE_FEATURE,
                        methods: [
                            'getIntendedLocation',
                            'setIntendedLocation',
                            'removeIntendedLocation',
                            'getPickupOption',
                            'setPickupOption',
                        ],
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZW5kZWQtcGlja3VwLWxvY2F0aW9uLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9waWNrdXAtaW4tc3RvcmUvcm9vdC9mYWNhZGUvaW50ZW5kZWQtcGlja3VwLWxvY2F0aW9uLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBTS9EOztHQUVHO0FBaUJILE1BQU0sT0FBZ0IsNEJBQTRCOzt5SEFBNUIsNEJBQTRCOzZIQUE1Qiw0QkFBNEIsY0FmcEMsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSw0QkFBNEI7UUFDcEMsT0FBTyxFQUFFLDRCQUE0QjtRQUNyQyxPQUFPLEVBQUU7WUFDUCxxQkFBcUI7WUFDckIscUJBQXFCO1lBQ3JCLHdCQUF3QjtZQUN4QixpQkFBaUI7WUFDakIsaUJBQWlCO1NBQ2xCO1FBQ0QsS0FBSyxFQUFFLElBQUk7S0FDWixDQUFDOzJGQUVnQiw0QkFBNEI7a0JBaEJqRCxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0sOEJBQThCO3dCQUNwQyxPQUFPLEVBQUUsNEJBQTRCO3dCQUNyQyxPQUFPLEVBQUU7NEJBQ1AscUJBQXFCOzRCQUNyQixxQkFBcUI7NEJBQ3JCLHdCQUF3Qjs0QkFDeEIsaUJBQWlCOzRCQUNqQixpQkFBaUI7eUJBQ2xCO3dCQUNELEtBQUssRUFBRSxJQUFJO3FCQUNaLENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBJQ0tVUF9JTl9TVE9SRV9DT1JFX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuaW1wb3J0IHtcbiAgQXVnbWVudGVkUG9pbnRPZlNlcnZpY2UsXG4gIFBpY2t1cE9wdGlvbixcbn0gZnJvbSAnLi4vbW9kZWwvcGlja3VwLW9wdGlvbi5tb2RlbCc7XG5cbi8qKlxuICogU3RvcmUgdGhlIFBvaW50IG9mIFNlcnZpY2UgYSB1c2VyIHdhbnRzIHRvIGNvbGxlY3QgYSBwcm9kdWN0IGZyb20gYmVmb3JlIGl0IGlzIGFkZGVkIHRvIHRoZSBjYXJ0LlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogSW50ZW5kZWRQaWNrdXBMb2NhdGlvbkZhY2FkZSxcbiAgICAgIGZlYXR1cmU6IFBJQ0tVUF9JTl9TVE9SRV9DT1JFX0ZFQVRVUkUsXG4gICAgICBtZXRob2RzOiBbXG4gICAgICAgICdnZXRJbnRlbmRlZExvY2F0aW9uJyxcbiAgICAgICAgJ3NldEludGVuZGVkTG9jYXRpb24nLFxuICAgICAgICAncmVtb3ZlSW50ZW5kZWRMb2NhdGlvbicsXG4gICAgICAgICdnZXRQaWNrdXBPcHRpb24nLFxuICAgICAgICAnc2V0UGlja3VwT3B0aW9uJyxcbiAgICAgIF0sXG4gICAgICBhc3luYzogdHJ1ZSxcbiAgICB9KSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSW50ZW5kZWRQaWNrdXBMb2NhdGlvbkZhY2FkZSB7XG4gIC8qKlxuICAgKiBHZXQgdGhlIFBvaW50IG9mIFNlcnZpY2UgYSB1c2VyIHdhbnRzIHRvIGNvbGxlY3QgYSBwcm9kdWN0IGZyb20gYmVmb3JlIGl0IGlzIGFkZGVkIHRvIHRoZSBjYXJ0LlxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGUgVGhlIHByb2R1Y3QgY29kZSBvZiB0aGUgcHJvZHVjdCB0aGUgdXNlciB3YW50cyB0byBjb2xsZWN0LlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0SW50ZW5kZWRMb2NhdGlvbihcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8QXVnbWVudGVkUG9pbnRPZlNlcnZpY2UgfCB1bmRlZmluZWQ+O1xuXG4gIC8qKlxuICAgKiBTZXQgdGhlIFBvaW50IG9mIFNlcnZpY2UgYSB1c2VyIHdhbnRzIHRvIGNvbGxlY3QgYSBwcm9kdWN0IGZyb20gYmVmb3JlIGl0IGlzIGFkZGVkIHRvIHRoZSBjYXJ0LlxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGUgVGhlIHByb2R1Y3QgY29kZSBvZiB0aGUgcHJvZHVjdCB0aGUgdXNlciB3YW50cyB0byBjb2xsZWN0LlxuICAgKiBAcGFyYW0gbG9jYXRpb24gVGhlIFBvaW50IG9mIFNlcnZpY2UgdGhlIHVzZXIgd2FudHMgdG8gY29sbGVjdCB0aGUgcHJvZHVjdCBmcm9tLlxuICAgKi9cbiAgYWJzdHJhY3Qgc2V0SW50ZW5kZWRMb2NhdGlvbihcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nLFxuICAgIGxvY2F0aW9uOiBBdWdtZW50ZWRQb2ludE9mU2VydmljZVxuICApOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIFBvaW50IG9mIFNlcnZpY2UgYSB1c2VyIHdhbnRlZCB0byBjb2xsZWN0IGEgcHJvZHVjdCBmcm9tIGJlZm9yZSBpdCB3YXMgdG8gYmUgYWRkZWQgdG8gdGhlIGNhcnQuXG4gICAqIEBwYXJhbSBwcm9kdWN0Q29kZSBUaGUgcHJvZHVjdCBjb2RlIG9mIHRoZSBwcm9kdWN0IHRoZSB1c2VyIHdhbnRzIHRvIGNvbGxlY3QuXG4gICAqL1xuICBhYnN0cmFjdCByZW1vdmVJbnRlbmRlZExvY2F0aW9uKHByb2R1Y3RDb2RlOiBzdHJpbmcpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIFBpY2t1cCBPcHRpb24gKCdwaWNrdXAnIG9yICdkZWxpdmVyeScpIGEgdXNlciB3YW50c1xuICAgKiBAcGFyYW0gcHJvZHVjdENvZGUgVGhlIHByb2R1Y3QgY29kZSBvZiB0aGUgcHJvZHVjdCB0aGUgdXNlciB3YW50cyB0byBjb2xsZWN0LlxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0UGlja3VwT3B0aW9uKHByb2R1Y3RDb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFBpY2t1cE9wdGlvbj47XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgUGlja3VwIE9wdGlvbiAoJ3BpY2t1cCcgb3IgJ2RlbGl2ZXJ5JykgYSB1c2VyIHdhbnRzXG4gICAqIEBwYXJhbSBwcm9kdWN0Q29kZSBUaGUgcHJvZHVjdCBjb2RlIG9mIHRoZSBwcm9kdWN0IHRoZSB1c2VyIHdhbnRzIHRvIHNldCB0aGUgcGlja3VwIGxvY2F0aW9uIGZvci5cbiAgICovXG4gIGFic3RyYWN0IHNldFBpY2t1cE9wdGlvbihcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nLFxuICAgIHBpY2t1cE9wdGlvbjogUGlja3VwT3B0aW9uXG4gICk6IHZvaWQ7XG59XG4iXX0=