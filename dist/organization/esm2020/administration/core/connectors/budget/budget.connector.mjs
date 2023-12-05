/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./budget.adapter";
export class BudgetConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(userId, budgetCode) {
        return this.adapter.load(userId, budgetCode);
    }
    getList(userId, params) {
        return this.adapter.loadList(userId, params);
    }
    create(userId, budget) {
        return this.adapter.create(userId, budget);
    }
    update(userId, budgetCode, budget) {
        return this.adapter.update(userId, budgetCode, budget);
    }
}
BudgetConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetConnector, deps: [{ token: i1.BudgetAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
BudgetConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.BudgetAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LmNvbm5lY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZS9jb25uZWN0b3JzL2J1ZGdldC9idWRnZXQuY29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFTM0MsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFBc0IsT0FBc0I7UUFBdEIsWUFBTyxHQUFQLE9BQU8sQ0FBZTtJQUFHLENBQUM7SUFFaEQsR0FBRyxDQUFDLE1BQWMsRUFBRSxVQUFrQjtRQUNwQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsT0FBTyxDQUNMLE1BQWMsRUFDZCxNQUFxQjtRQUVyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQWMsRUFBRSxNQUFjO1FBQ25DLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxNQUFNLENBQ0osTUFBYyxFQUNkLFVBQWtCLEVBQ2xCLE1BQWM7UUFFZCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekQsQ0FBQzs7NEdBeEJVLGVBQWU7Z0hBQWYsZUFBZSxjQUZkLE1BQU07MkZBRVAsZUFBZTtrQkFIM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFbnRpdGllc01vZGVsLCBTZWFyY2hDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQnVkZ2V0IH0gZnJvbSAnLi4vLi4vbW9kZWwvYnVkZ2V0Lm1vZGVsJztcbmltcG9ydCB7IEJ1ZGdldEFkYXB0ZXIgfSBmcm9tICcuL2J1ZGdldC5hZGFwdGVyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEJ1ZGdldENvbm5lY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhZGFwdGVyOiBCdWRnZXRBZGFwdGVyKSB7fVxuXG4gIGdldCh1c2VySWQ6IHN0cmluZywgYnVkZ2V0Q29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxCdWRnZXQ+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmxvYWQodXNlcklkLCBidWRnZXRDb2RlKTtcbiAgfVxuXG4gIGdldExpc3QoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgcGFyYW1zPzogU2VhcmNoQ29uZmlnXG4gICk6IE9ic2VydmFibGU8RW50aXRpZXNNb2RlbDxCdWRnZXQ+PiB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5sb2FkTGlzdCh1c2VySWQsIHBhcmFtcyk7XG4gIH1cblxuICBjcmVhdGUodXNlcklkOiBzdHJpbmcsIGJ1ZGdldDogQnVkZ2V0KTogT2JzZXJ2YWJsZTxCdWRnZXQ+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmNyZWF0ZSh1c2VySWQsIGJ1ZGdldCk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgYnVkZ2V0Q29kZTogc3RyaW5nLFxuICAgIGJ1ZGdldDogQnVkZ2V0XG4gICk6IE9ic2VydmFibGU8QnVkZ2V0PiB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci51cGRhdGUodXNlcklkLCBidWRnZXRDb2RlLCBidWRnZXQpO1xuICB9XG59XG4iXX0=