/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { ORDER_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class ScheduledReplenishmentOrderFacade {
}
ScheduledReplenishmentOrderFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ScheduledReplenishmentOrderFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: ScheduledReplenishmentOrderFacade,
        feature: ORDER_CORE_FEATURE,
        methods: ['scheduleReplenishmentOrder'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: ScheduledReplenishmentOrderFacade,
                        feature: ORDER_CORE_FEATURE,
                        methods: ['scheduleReplenishmentOrder'],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGVkLXJlcGxlbmlzaG1lbnQtb3JkZXIuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL3Jvb3QvZmFjYWRlL3NjaGVkdWxlZC1yZXBsZW5pc2htZW50LW9yZGVyLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBYXJELE1BQU0sT0FBZ0IsaUNBQWlDOzs4SEFBakMsaUNBQWlDO2tJQUFqQyxpQ0FBaUMsY0FSekMsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSxpQ0FBaUM7UUFDekMsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztLQUN4QyxDQUFDOzJGQUVnQixpQ0FBaUM7a0JBVHRELFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7d0JBQ1osTUFBTSxtQ0FBbUM7d0JBQ3pDLE9BQU8sRUFBRSxrQkFBa0I7d0JBQzNCLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO3FCQUN4QyxDQUFDO2lCQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmFjYWRlRmFjdG9yeSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPUkRFUl9DT1JFX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuaW1wb3J0IHsgUmVwbGVuaXNobWVudE9yZGVyIH0gZnJvbSAnLi4vbW9kZWwvcmVwbGVuaXNobWVudC1vcmRlci5tb2RlbCc7XG5pbXBvcnQgeyBTY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtIH0gZnJvbSAnLi4vbW9kZWwvc2NoZWR1bGVkLXJlcGxlbmlzaG1lbnQubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogU2NoZWR1bGVkUmVwbGVuaXNobWVudE9yZGVyRmFjYWRlLFxuICAgICAgZmVhdHVyZTogT1JERVJfQ09SRV9GRUFUVVJFLFxuICAgICAgbWV0aG9kczogWydzY2hlZHVsZVJlcGxlbmlzaG1lbnRPcmRlciddLFxuICAgIH0pLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTY2hlZHVsZWRSZXBsZW5pc2htZW50T3JkZXJGYWNhZGUge1xuICAvKipcbiAgICogU2NoZWR1bGUgYSByZXBsZW5pc2htZW50IG9yZGVyXG4gICAqL1xuICBhYnN0cmFjdCBzY2hlZHVsZVJlcGxlbmlzaG1lbnRPcmRlcihcbiAgICBzY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtOiBTY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtLFxuICAgIHRlcm1zQ2hlY2tlZDogYm9vbGVhblxuICApOiBPYnNlcnZhYmxlPFJlcGxlbmlzaG1lbnRPcmRlcj47XG59XG4iXX0=