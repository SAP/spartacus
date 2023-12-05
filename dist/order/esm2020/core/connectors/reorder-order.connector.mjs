/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./reorder-order.adapter";
export class ReorderOrderConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    reorder(orderId, userId) {
        return this.adapter.reorder(orderId, userId);
    }
}
ReorderOrderConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderConnector, deps: [{ token: i1.ReorderOrderAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
ReorderOrderConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReorderOrderConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ReorderOrderAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVvcmRlci1vcmRlci5jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29yZS9jb25uZWN0b3JzL3Jlb3JkZXItb3JkZXIuY29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNM0MsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUFzQixPQUE0QjtRQUE1QixZQUFPLEdBQVAsT0FBTyxDQUFxQjtJQUFHLENBQUM7SUFFL0MsT0FBTyxDQUNaLE9BQWUsRUFDZixNQUFjO1FBRWQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7a0hBUlUscUJBQXFCO3NIQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFJlb3JkZXJPcmRlckFkYXB0ZXIgfSBmcm9tICcuL3Jlb3JkZXItb3JkZXIuYWRhcHRlcic7XG5pbXBvcnQgeyBDYXJ0TW9kaWZpY2F0aW9uTGlzdCB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVvcmRlck9yZGVyQ29ubmVjdG9yIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFkYXB0ZXI6IFJlb3JkZXJPcmRlckFkYXB0ZXIpIHt9XG5cbiAgcHVibGljIHJlb3JkZXIoXG4gICAgb3JkZXJJZDogc3RyaW5nLFxuICAgIHVzZXJJZDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8Q2FydE1vZGlmaWNhdGlvbkxpc3Q+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLnJlb3JkZXIob3JkZXJJZCwgdXNlcklkKTtcbiAgfVxufVxuIl19