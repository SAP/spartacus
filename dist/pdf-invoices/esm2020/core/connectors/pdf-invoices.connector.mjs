/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PDFInvoicesAdapter } from './pdf-invoices.adapter';
import * as i0 from "@angular/core";
import * as i1 from "./pdf-invoices.adapter";
export class PDFInvoicesConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    getInvoicesForOrder(userId, orderId, queryParams) {
        return this.adapter.getInvoicesForOrder(userId, orderId, queryParams);
    }
    getInvoicePDF(userId, orderId, invoiceId, externalSystemId) {
        return this.adapter.getInvoicePDF(userId, orderId, invoiceId, externalSystemId);
    }
}
PDFInvoicesConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesConnector, deps: [{ token: i1.PDFInvoicesAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
PDFInvoicesConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.PDFInvoicesAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLWludm9pY2VzLmNvbm5lY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wZGYtaW52b2ljZXMvY29yZS9jb25uZWN0b3JzL3BkZi1pbnZvaWNlcy5jb25uZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFNM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7OztBQUs1RCxNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLFlBQXNCLE9BQTJCO1FBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO0lBQUcsQ0FBQztJQUU5QyxtQkFBbUIsQ0FDeEIsTUFBYyxFQUNkLE9BQWUsRUFDZixXQUErQjtRQUUvQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU0sYUFBYSxDQUNsQixNQUFjLEVBQ2QsT0FBZSxFQUNmLFNBQWlCLEVBQ2pCLGdCQUF5QjtRQUV6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUMvQixNQUFNLEVBQ04sT0FBTyxFQUNQLFNBQVMsRUFDVCxnQkFBZ0IsQ0FDakIsQ0FBQztJQUNKLENBQUM7O2lIQXZCVSxvQkFBb0I7cUhBQXBCLG9CQUFvQixjQUZuQixNQUFNOzJGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBJbnZvaWNlUXVlcnlQYXJhbXMsXG4gIE9yZGVySW52b2ljZUxpc3QsXG59IGZyb20gJ0BzcGFydGFjdXMvcGRmLWludm9pY2VzL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUERGSW52b2ljZXNBZGFwdGVyIH0gZnJvbSAnLi9wZGYtaW52b2ljZXMuYWRhcHRlcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQREZJbnZvaWNlc0Nvbm5lY3RvciB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhZGFwdGVyOiBQREZJbnZvaWNlc0FkYXB0ZXIpIHt9XG5cbiAgcHVibGljIGdldEludm9pY2VzRm9yT3JkZXIoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgb3JkZXJJZDogc3RyaW5nLFxuICAgIHF1ZXJ5UGFyYW1zOiBJbnZvaWNlUXVlcnlQYXJhbXNcbiAgKTogT2JzZXJ2YWJsZTxPcmRlckludm9pY2VMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5nZXRJbnZvaWNlc0Zvck9yZGVyKHVzZXJJZCwgb3JkZXJJZCwgcXVlcnlQYXJhbXMpO1xuICB9XG5cbiAgcHVibGljIGdldEludm9pY2VQREYoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgb3JkZXJJZDogc3RyaW5nLFxuICAgIGludm9pY2VJZDogc3RyaW5nLFxuICAgIGV4dGVybmFsU3lzdGVtSWQ/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxCbG9iPiB7XG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5nZXRJbnZvaWNlUERGKFxuICAgICAgdXNlcklkLFxuICAgICAgb3JkZXJJZCxcbiAgICAgIGludm9pY2VJZCxcbiAgICAgIGV4dGVybmFsU3lzdGVtSWRcbiAgICApO1xuICB9XG59XG4iXX0=