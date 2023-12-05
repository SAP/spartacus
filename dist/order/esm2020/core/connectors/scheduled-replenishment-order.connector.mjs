/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./scheduled-replenishment-order.adapter";
export class ScheduledReplenishmentOrderConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    scheduleReplenishmentOrder(cartId, scheduleReplenishmentForm, termsChecked, userId) {
        return this.adapter.scheduleReplenishmentOrder(cartId, scheduleReplenishmentForm, termsChecked, userId);
    }
}
ScheduledReplenishmentOrderConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderConnector, deps: [{ token: i1.ScheduledReplenishmentOrderAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
ScheduledReplenishmentOrderConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScheduledReplenishmentOrderConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ScheduledReplenishmentOrderAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGVkLXJlcGxlbmlzaG1lbnQtb3JkZXIuY29ubmVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvcmUvY29ubmVjdG9ycy9zY2hlZHVsZWQtcmVwbGVuaXNobWVudC1vcmRlci5jb25uZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVMzQyxNQUFNLE9BQU8sb0NBQW9DO0lBQy9DLFlBQXNCLE9BQTJDO1FBQTNDLFlBQU8sR0FBUCxPQUFPLENBQW9DO0lBQUcsQ0FBQztJQUU5RCwwQkFBMEIsQ0FDL0IsTUFBYyxFQUNkLHlCQUFvRCxFQUNwRCxZQUFxQixFQUNyQixNQUFjO1FBRWQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUM1QyxNQUFNLEVBQ04seUJBQXlCLEVBQ3pCLFlBQVksRUFDWixNQUFNLENBQ1AsQ0FBQztJQUNKLENBQUM7O2lJQWZVLG9DQUFvQztxSUFBcEMsb0NBQW9DOzJGQUFwQyxvQ0FBb0M7a0JBRGhELFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBSZXBsZW5pc2htZW50T3JkZXIsXG4gIFNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm0sXG59IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTY2hlZHVsZWRSZXBsZW5pc2htZW50T3JkZXJBZGFwdGVyIH0gZnJvbSAnLi9zY2hlZHVsZWQtcmVwbGVuaXNobWVudC1vcmRlci5hZGFwdGVyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNjaGVkdWxlZFJlcGxlbmlzaG1lbnRPcmRlckNvbm5lY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhZGFwdGVyOiBTY2hlZHVsZWRSZXBsZW5pc2htZW50T3JkZXJBZGFwdGVyKSB7fVxuXG4gIHB1YmxpYyBzY2hlZHVsZVJlcGxlbmlzaG1lbnRPcmRlcihcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICBzY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtOiBTY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtLFxuICAgIHRlcm1zQ2hlY2tlZDogYm9vbGVhbixcbiAgICB1c2VySWQ6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFJlcGxlbmlzaG1lbnRPcmRlcj4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuc2NoZWR1bGVSZXBsZW5pc2htZW50T3JkZXIoXG4gICAgICBjYXJ0SWQsXG4gICAgICBzY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtLFxuICAgICAgdGVybXNDaGVja2VkLFxuICAgICAgdXNlcklkXG4gICAgKTtcbiAgfVxufVxuIl19