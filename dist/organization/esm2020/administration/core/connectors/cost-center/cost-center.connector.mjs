/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./cost-center.adapter";
export class CostCenterConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(userId, costCenterCode) {
        return this.adapter.load(userId, costCenterCode);
    }
    getList(userId, params) {
        return this.adapter.loadList(userId, params);
    }
    create(userId, costCenter) {
        return this.adapter.create(userId, costCenter);
    }
    update(userId, costCenterCode, costCenter) {
        return this.adapter.update(userId, costCenterCode, costCenter);
    }
    getBudgets(userId, costCenterCode, params) {
        return this.adapter.loadBudgets(userId, costCenterCode, params);
    }
    assignBudget(userId, costCenterCode, budgetCode) {
        return this.adapter.assignBudget(userId, costCenterCode, budgetCode);
    }
    unassignBudget(userId, costCenterCode, budgetCode) {
        return this.adapter.unassignBudget(userId, costCenterCode, budgetCode);
    }
}
CostCenterConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterConnector, deps: [{ token: i1.CostCenterAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CostCenterConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CostCenterAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zdC1jZW50ZXIuY29ubmVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlL2Nvbm5lY3RvcnMvY29zdC1jZW50ZXIvY29zdC1jZW50ZXIuY29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFTM0MsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUFzQixPQUEwQjtRQUExQixZQUFPLEdBQVAsT0FBTyxDQUFtQjtJQUFHLENBQUM7SUFFcEQsR0FBRyxDQUFDLE1BQWMsRUFBRSxjQUFzQjtRQUN4QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsT0FBTyxDQUNMLE1BQWMsRUFDZCxNQUFxQjtRQUVyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQWMsRUFBRSxVQUFzQjtRQUMzQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsTUFBTSxDQUNKLE1BQWMsRUFDZCxjQUFzQixFQUN0QixVQUFzQjtRQUV0QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELFVBQVUsQ0FDUixNQUFjLEVBQ2QsY0FBc0IsRUFDdEIsTUFBcUI7UUFFckIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxZQUFZLENBQ1YsTUFBYyxFQUNkLGNBQXNCLEVBQ3RCLFVBQWtCO1FBRWxCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsY0FBYyxDQUNaLE1BQWMsRUFDZCxjQUFzQixFQUN0QixVQUFrQjtRQUVsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDekUsQ0FBQzs7Z0hBaERVLG1CQUFtQjtvSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvc3RDZW50ZXIsIEVudGl0aWVzTW9kZWwsIFNlYXJjaENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCdWRnZXQgfSBmcm9tICcuLi8uLi9tb2RlbC9idWRnZXQubW9kZWwnO1xuaW1wb3J0IHsgQ29zdENlbnRlckFkYXB0ZXIgfSBmcm9tICcuL2Nvc3QtY2VudGVyLmFkYXB0ZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29zdENlbnRlckNvbm5lY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhZGFwdGVyOiBDb3N0Q2VudGVyQWRhcHRlcikge31cblxuICBnZXQodXNlcklkOiBzdHJpbmcsIGNvc3RDZW50ZXJDb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENvc3RDZW50ZXI+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmxvYWQodXNlcklkLCBjb3N0Q2VudGVyQ29kZSk7XG4gIH1cblxuICBnZXRMaXN0KFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIHBhcmFtcz86IFNlYXJjaENvbmZpZ1xuICApOiBPYnNlcnZhYmxlPEVudGl0aWVzTW9kZWw8Q29zdENlbnRlcj4+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmxvYWRMaXN0KHVzZXJJZCwgcGFyYW1zKTtcbiAgfVxuXG4gIGNyZWF0ZSh1c2VySWQ6IHN0cmluZywgY29zdENlbnRlcjogQ29zdENlbnRlcik6IE9ic2VydmFibGU8Q29zdENlbnRlcj4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuY3JlYXRlKHVzZXJJZCwgY29zdENlbnRlcik7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY29zdENlbnRlckNvZGU6IHN0cmluZyxcbiAgICBjb3N0Q2VudGVyOiBDb3N0Q2VudGVyXG4gICk6IE9ic2VydmFibGU8Q29zdENlbnRlcj4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIudXBkYXRlKHVzZXJJZCwgY29zdENlbnRlckNvZGUsIGNvc3RDZW50ZXIpO1xuICB9XG5cbiAgZ2V0QnVkZ2V0cyhcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjb3N0Q2VudGVyQ29kZTogc3RyaW5nLFxuICAgIHBhcmFtcz86IFNlYXJjaENvbmZpZ1xuICApOiBPYnNlcnZhYmxlPEVudGl0aWVzTW9kZWw8QnVkZ2V0Pj4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIubG9hZEJ1ZGdldHModXNlcklkLCBjb3N0Q2VudGVyQ29kZSwgcGFyYW1zKTtcbiAgfVxuXG4gIGFzc2lnbkJ1ZGdldChcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBjb3N0Q2VudGVyQ29kZTogc3RyaW5nLFxuICAgIGJ1ZGdldENvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuYXNzaWduQnVkZ2V0KHVzZXJJZCwgY29zdENlbnRlckNvZGUsIGJ1ZGdldENvZGUpO1xuICB9XG5cbiAgdW5hc3NpZ25CdWRnZXQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgY29zdENlbnRlckNvZGU6IHN0cmluZyxcbiAgICBidWRnZXRDb2RlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLnVuYXNzaWduQnVkZ2V0KHVzZXJJZCwgY29zdENlbnRlckNvZGUsIGJ1ZGdldENvZGUpO1xuICB9XG59XG4iXX0=