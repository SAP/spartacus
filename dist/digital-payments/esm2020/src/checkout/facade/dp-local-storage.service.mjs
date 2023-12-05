/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { of, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
const KEY = 'digital-payment.checkout.request';
export class DpLocalStorageService {
    constructor(statePersistenceService) {
        this.statePersistenceService = statePersistenceService;
        this.subscription = new Subscription();
    }
    syncCardRegistrationState(request) {
        this.subscription.add(this.statePersistenceService.syncWithStorage({
            key: KEY,
            state$: of(request),
        }));
    }
    readCardRegistrationState() {
        const paymentRequest = this.statePersistenceService.readStateFromStorage({
            key: KEY,
        });
        this.clearDpStorage();
        return paymentRequest;
    }
    clearDpStorage() {
        this.statePersistenceService.syncWithStorage({
            key: KEY,
            state$: of({}),
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
DpLocalStorageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpLocalStorageService, deps: [{ token: i1.StatePersistenceService }], target: i0.ɵɵFactoryTarget.Injectable });
DpLocalStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpLocalStorageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpLocalStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.StatePersistenceService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHAtbG9jYWwtc3RvcmFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9kaWdpdGFsLXBheW1lbnRzL3NyYy9jaGVja291dC9mYWNhZGUvZHAtbG9jYWwtc3RvcmFnZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsRUFBRSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd4QyxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDOzs7QUFFdEQsTUFBTSxHQUFHLEdBQUcsa0NBQWtDLENBQUM7QUFLL0MsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUFzQix1QkFBZ0Q7UUFBaEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUM1RCxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFENkIsQ0FBQztJQUcxRSx5QkFBeUIsQ0FBQyxPQUF5QjtRQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FFMUM7WUFDQSxHQUFHLEVBQUUsR0FBRztZQUNSLE1BQU0sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQ3BCLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELHlCQUF5QjtRQUN2QixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsb0JBQW9CLENBQUM7WUFDdkUsR0FBRyxFQUFFLEdBQUc7U0FDVCxDQUFxQixDQUFDO1FBRXZCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBRVMsY0FBYztRQUN0QixJQUFJLENBQUMsdUJBQXVCLENBQUMsZUFBZSxDQUFDO1lBQzNDLEdBQUcsRUFBRSxHQUFHO1lBQ1IsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7a0hBakNVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRnBCLE1BQU07MkZBRVAscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IG9mLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERwUGF5bWVudFJlcXVlc3QgfSBmcm9tICcuLy4uL21vZGVscy9kcC1jaGVja291dC5tb2RlbCc7XG5pbXBvcnQgeyBTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuY29uc3QgS0VZID0gJ2RpZ2l0YWwtcGF5bWVudC5jaGVja291dC5yZXF1ZXN0JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIERwTG9jYWxTdG9yYWdlU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBzdGF0ZVBlcnNpc3RlbmNlU2VydmljZTogU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UpIHt9XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgc3luY0NhcmRSZWdpc3RyYXRpb25TdGF0ZShyZXF1ZXN0OiBEcFBheW1lbnRSZXF1ZXN0KTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5zdGF0ZVBlcnNpc3RlbmNlU2VydmljZS5zeW5jV2l0aFN0b3JhZ2U8XG4gICAgICAgIERwUGF5bWVudFJlcXVlc3QgfCB1bmRlZmluZWRcbiAgICAgID4oe1xuICAgICAgICBrZXk6IEtFWSxcbiAgICAgICAgc3RhdGUkOiBvZihyZXF1ZXN0KSxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHJlYWRDYXJkUmVnaXN0cmF0aW9uU3RhdGUoKTogRHBQYXltZW50UmVxdWVzdCB7XG4gICAgY29uc3QgcGF5bWVudFJlcXVlc3QgPSB0aGlzLnN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLnJlYWRTdGF0ZUZyb21TdG9yYWdlKHtcbiAgICAgIGtleTogS0VZLFxuICAgIH0pIGFzIERwUGF5bWVudFJlcXVlc3Q7XG5cbiAgICB0aGlzLmNsZWFyRHBTdG9yYWdlKCk7XG4gICAgcmV0dXJuIHBheW1lbnRSZXF1ZXN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGNsZWFyRHBTdG9yYWdlKCkge1xuICAgIHRoaXMuc3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2Uuc3luY1dpdGhTdG9yYWdlKHtcbiAgICAgIGtleTogS0VZLFxuICAgICAgc3RhdGUkOiBvZih7fSksXG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=