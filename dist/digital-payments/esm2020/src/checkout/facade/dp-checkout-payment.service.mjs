/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CommandStrategy, } from '@spartacus/core';
import { switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../adapters/digital-payments.adapter";
import * as i2 from "@spartacus/core";
export class DpCheckoutPaymentService {
    constructor(dpAdapter, command, query, userIdService) {
        this.dpAdapter = dpAdapter;
        this.command = command;
        this.query = query;
        this.userIdService = userIdService;
        this.RequestUrlQuery = this.query.create(() => this.userIdService
            .takeUserId()
            .pipe(switchMap((userId) => this.dpAdapter.createPaymentRequest(userId))));
        this.createPaymentDetailsCommand = this.command.create((payload) => this.userIdService
            .takeUserId()
            .pipe(switchMap((userId) => this.dpAdapter.createPaymentDetails(payload.sessionId, payload.signature, userId))), {
            strategy: CommandStrategy.Queue,
        });
    }
    getCardRegistrationDetails() {
        return this.RequestUrlQuery.get();
    }
    createPaymentDetails(sessionId, signature) {
        return this.createPaymentDetailsCommand.execute({ sessionId, signature });
    }
}
DpCheckoutPaymentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpCheckoutPaymentService, deps: [{ token: i1.DigitalPaymentsAdapter }, { token: i2.CommandService }, { token: i2.QueryService }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
DpCheckoutPaymentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpCheckoutPaymentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DpCheckoutPaymentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.DigitalPaymentsAdapter }, { type: i2.CommandService }, { type: i2.QueryService }, { type: i2.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHAtY2hlY2tvdXQtcGF5bWVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9kaWdpdGFsLXBheW1lbnRzL3NyYy9jaGVja291dC9mYWNhZGUvZHAtY2hlY2tvdXQtcGF5bWVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFHTCxlQUFlLEdBSWhCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBTTNDLE1BQU0sT0FBTyx3QkFBd0I7SUFDbkMsWUFDWSxTQUFpQyxFQUNqQyxPQUF1QixFQUN2QixLQUFtQixFQUNuQixhQUE0QjtRQUg1QixjQUFTLEdBQVQsU0FBUyxDQUF3QjtRQUNqQyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBQ25CLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBRzlCLG9CQUFlLEdBQTRCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUMxRSxJQUFJLENBQUMsYUFBYTthQUNmLFVBQVUsRUFBRTthQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUM1RSxDQUFDO1FBTVEsZ0NBQTJCLEdBTWpDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUNyQixDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ1YsSUFBSSxDQUFDLGFBQWE7YUFDZixVQUFVLEVBQUU7YUFDWixJQUFJLENBQ0gsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FDakMsT0FBTyxDQUFDLFNBQVMsRUFDakIsT0FBTyxDQUFDLFNBQVMsRUFDakIsTUFBTSxDQUNQLENBQ0YsQ0FDRixFQUNMO1lBQ0UsUUFBUSxFQUFFLGVBQWUsQ0FBQyxLQUFLO1NBQ2hDLENBQ0YsQ0FBQztJQWxDQyxDQUFDO0lBUUosMEJBQTBCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBMEJELG9CQUFvQixDQUNsQixTQUFpQixFQUNqQixTQUFpQjtRQUVqQixPQUFPLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUM1RSxDQUFDOztxSEEvQ1Usd0JBQXdCO3lIQUF4Qix3QkFBd0IsY0FGdkIsTUFBTTsyRkFFUCx3QkFBd0I7a0JBSHBDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGF5bWVudERldGFpbHMgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENvbW1hbmQsXG4gIENvbW1hbmRTZXJ2aWNlLFxuICBDb21tYW5kU3RyYXRlZ3ksXG4gIFF1ZXJ5LFxuICBRdWVyeVNlcnZpY2UsXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEaWdpdGFsUGF5bWVudHNBZGFwdGVyIH0gZnJvbSAnLi4vYWRhcHRlcnMvZGlnaXRhbC1wYXltZW50cy5hZGFwdGVyJztcbmltcG9ydCB7IERwUGF5bWVudFJlcXVlc3QgfSBmcm9tICcuLi9tb2RlbHMvZHAtY2hlY2tvdXQubW9kZWwnO1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIERwQ2hlY2tvdXRQYXltZW50U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBkcEFkYXB0ZXI6IERpZ2l0YWxQYXltZW50c0FkYXB0ZXIsXG4gICAgcHJvdGVjdGVkIGNvbW1hbmQ6IENvbW1hbmRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBxdWVyeTogUXVlcnlTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlXG4gICkge31cblxuICBwcm90ZWN0ZWQgUmVxdWVzdFVybFF1ZXJ5OiBRdWVyeTxEcFBheW1lbnRSZXF1ZXN0PiA9IHRoaXMucXVlcnkuY3JlYXRlKCgpID0+XG4gICAgdGhpcy51c2VySWRTZXJ2aWNlXG4gICAgICAudGFrZVVzZXJJZCgpXG4gICAgICAucGlwZShzd2l0Y2hNYXAoKHVzZXJJZCkgPT4gdGhpcy5kcEFkYXB0ZXIuY3JlYXRlUGF5bWVudFJlcXVlc3QodXNlcklkKSkpXG4gICk7XG5cbiAgZ2V0Q2FyZFJlZ2lzdHJhdGlvbkRldGFpbHMoKTogT2JzZXJ2YWJsZTxEcFBheW1lbnRSZXF1ZXN0IHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuUmVxdWVzdFVybFF1ZXJ5LmdldCgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZVBheW1lbnREZXRhaWxzQ29tbWFuZDogQ29tbWFuZDxcbiAgICB7XG4gICAgICBzZXNzaW9uSWQ6IHN0cmluZztcbiAgICAgIHNpZ25hdHVyZTogc3RyaW5nO1xuICAgIH0sXG4gICAgUGF5bWVudERldGFpbHNcbiAgPiA9IHRoaXMuY29tbWFuZC5jcmVhdGUoXG4gICAgKHBheWxvYWQpID0+XG4gICAgICB0aGlzLnVzZXJJZFNlcnZpY2VcbiAgICAgICAgLnRha2VVc2VySWQoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKHVzZXJJZCkgPT5cbiAgICAgICAgICAgIHRoaXMuZHBBZGFwdGVyLmNyZWF0ZVBheW1lbnREZXRhaWxzKFxuICAgICAgICAgICAgICBwYXlsb2FkLnNlc3Npb25JZCxcbiAgICAgICAgICAgICAgcGF5bG9hZC5zaWduYXR1cmUsXG4gICAgICAgICAgICAgIHVzZXJJZFxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICB7XG4gICAgICBzdHJhdGVneTogQ29tbWFuZFN0cmF0ZWd5LlF1ZXVlLFxuICAgIH1cbiAgKTtcblxuICBjcmVhdGVQYXltZW50RGV0YWlscyhcbiAgICBzZXNzaW9uSWQ6IHN0cmluZyxcbiAgICBzaWduYXR1cmU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFBheW1lbnREZXRhaWxzPiB7XG4gICAgcmV0dXJuIHRoaXMuY3JlYXRlUGF5bWVudERldGFpbHNDb21tYW5kLmV4ZWN1dGUoeyBzZXNzaW9uSWQsIHNpZ25hdHVyZSB9KTtcbiAgfVxufVxuIl19