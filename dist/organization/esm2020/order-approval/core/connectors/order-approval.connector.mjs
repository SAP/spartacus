/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./order-approval.adapter";
export class OrderApprovalConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    get(userId, orderApprovalCode) {
        return this.adapter.load(userId, orderApprovalCode);
    }
    getList(userId, params) {
        return this.adapter.loadList(userId, params);
    }
    makeDecision(userId, orderApprovalCode, orderApprovalDecision) {
        return this.adapter.makeDecision(userId, orderApprovalCode, orderApprovalDecision);
    }
}
OrderApprovalConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalConnector, deps: [{ token: i1.OrderApprovalAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
OrderApprovalConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderApprovalConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OrderApprovalAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItYXBwcm92YWwuY29ubmVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9vcmRlci1hcHByb3ZhbC9jb3JlL2Nvbm5lY3RvcnMvb3JkZXItYXBwcm92YWwuY29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFZM0MsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxZQUFzQixPQUE2QjtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjtJQUFHLENBQUM7SUFFdkQsR0FBRyxDQUFDLE1BQWMsRUFBRSxpQkFBeUI7UUFDM0MsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsT0FBTyxDQUNMLE1BQWMsRUFDZCxNQUFxQjtRQUVyQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsWUFBWSxDQUNWLE1BQWMsRUFDZCxpQkFBeUIsRUFDekIscUJBQTRDO1FBRTVDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQzlCLE1BQU0sRUFDTixpQkFBaUIsRUFDakIscUJBQXFCLENBQ3RCLENBQUM7SUFDSixDQUFDOzttSEF4QlUsc0JBQXNCO3VIQUF0QixzQkFBc0IsY0FGckIsTUFBTTsyRkFFUCxzQkFBc0I7a0JBSGxDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRW50aXRpZXNNb2RlbCwgU2VhcmNoQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIE9yZGVyQXBwcm92YWwsXG4gIE9yZGVyQXBwcm92YWxEZWNpc2lvbixcbn0gZnJvbSAnLi4vbW9kZWwvb3JkZXItYXBwcm92YWwubW9kZWwnO1xuaW1wb3J0IHsgT3JkZXJBcHByb3ZhbEFkYXB0ZXIgfSBmcm9tICcuL29yZGVyLWFwcHJvdmFsLmFkYXB0ZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJBcHByb3ZhbENvbm5lY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhZGFwdGVyOiBPcmRlckFwcHJvdmFsQWRhcHRlcikge31cblxuICBnZXQodXNlcklkOiBzdHJpbmcsIG9yZGVyQXBwcm92YWxDb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE9yZGVyQXBwcm92YWw+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmxvYWQodXNlcklkLCBvcmRlckFwcHJvdmFsQ29kZSk7XG4gIH1cblxuICBnZXRMaXN0KFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIHBhcmFtcz86IFNlYXJjaENvbmZpZ1xuICApOiBPYnNlcnZhYmxlPEVudGl0aWVzTW9kZWw8T3JkZXJBcHByb3ZhbD4+IHtcbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmxvYWRMaXN0KHVzZXJJZCwgcGFyYW1zKTtcbiAgfVxuXG4gIG1ha2VEZWNpc2lvbihcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBvcmRlckFwcHJvdmFsQ29kZTogc3RyaW5nLFxuICAgIG9yZGVyQXBwcm92YWxEZWNpc2lvbjogT3JkZXJBcHByb3ZhbERlY2lzaW9uXG4gICk6IE9ic2VydmFibGU8T3JkZXJBcHByb3ZhbERlY2lzaW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5tYWtlRGVjaXNpb24oXG4gICAgICB1c2VySWQsXG4gICAgICBvcmRlckFwcHJvdmFsQ29kZSxcbiAgICAgIG9yZGVyQXBwcm92YWxEZWNpc2lvblxuICAgICk7XG4gIH1cbn1cbiJdfQ==