/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../connectors";
import * as i2 from "@spartacus/core";
export class AsmCreateCustomerService {
    constructor(asmConnector, command) {
        this.asmConnector = asmConnector;
        this.command = command;
        this.createCustomerCommand = this.command.create(({ user }) => this.asmConnector.createCustomer(user));
    }
    createCustomer(user) {
        return this.createCustomerCommand.execute({ user });
    }
}
AsmCreateCustomerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCreateCustomerService, deps: [{ token: i1.AsmConnector }, { token: i2.CommandService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmCreateCustomerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCreateCustomerService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCreateCustomerService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.AsmConnector }, { type: i2.CommandService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWNyZWF0ZS1jdXN0b21lci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jb3JlL2ZhY2FkZS9hc20tY3JlYXRlLWN1c3RvbWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFVM0MsTUFBTSxPQUFPLHdCQUF3QjtJQU1uQyxZQUNZLFlBQTBCLEVBQzFCLE9BQXVCO1FBRHZCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBUHpCLDBCQUFxQixHQUczQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFLM0UsQ0FBQztJQUVKLGNBQWMsQ0FBQyxJQUE4QjtRQUMzQyxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7O3FIQWJVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCOzJGQUF4Qix3QkFBd0I7a0JBRHBDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBc21DcmVhdGVDdXN0b21lckZhY2FkZSxcbiAgQ3VzdG9tZXJSZWdpc3RyYXRpb25Gb3JtLFxufSBmcm9tICdAc3BhcnRhY3VzL2FzbS9yb290JztcbmltcG9ydCB7IENvbW1hbmQsIENvbW1hbmRTZXJ2aWNlLCBVc2VyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFzbUNvbm5lY3RvciB9IGZyb20gJy4uL2Nvbm5lY3RvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXNtQ3JlYXRlQ3VzdG9tZXJTZXJ2aWNlIGltcGxlbWVudHMgQXNtQ3JlYXRlQ3VzdG9tZXJGYWNhZGUge1xuICBwcm90ZWN0ZWQgY3JlYXRlQ3VzdG9tZXJDb21tYW5kOiBDb21tYW5kPFxuICAgIHsgdXNlcjogQ3VzdG9tZXJSZWdpc3RyYXRpb25Gb3JtIH0sXG4gICAgVXNlclxuICA+ID0gdGhpcy5jb21tYW5kLmNyZWF0ZSgoeyB1c2VyIH0pID0+IHRoaXMuYXNtQ29ubmVjdG9yLmNyZWF0ZUN1c3RvbWVyKHVzZXIpKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYXNtQ29ubmVjdG9yOiBBc21Db25uZWN0b3IsXG4gICAgcHJvdGVjdGVkIGNvbW1hbmQ6IENvbW1hbmRTZXJ2aWNlXG4gICkge31cblxuICBjcmVhdGVDdXN0b21lcih1c2VyOiBDdXN0b21lclJlZ2lzdHJhdGlvbkZvcm0pOiBPYnNlcnZhYmxlPFVzZXI+IHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDdXN0b21lckNvbW1hbmQuZXhlY3V0ZSh7IHVzZXIgfSk7XG4gIH1cbn1cbiJdfQ==