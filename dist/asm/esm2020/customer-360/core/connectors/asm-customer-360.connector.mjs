/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./asm-customer-360.adapter";
export class AsmCustomer360Connector {
    constructor(asmCustomer360Adapter) {
        this.asmCustomer360Adapter = asmCustomer360Adapter;
    }
    getAsmCustomer360Data(request) {
        return this.asmCustomer360Adapter.getAsmCustomer360Data(request);
    }
}
AsmCustomer360Connector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Connector, deps: [{ token: i1.AsmCustomer360Adapter }], target: i0.ɵɵFactoryTarget.Injectable });
AsmCustomer360Connector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Connector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Connector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AsmCustomer360Adapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC5jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2N1c3RvbWVyLTM2MC9jb3JlL2Nvbm5lY3RvcnMvYXNtLWN1c3RvbWVyLTM2MC5jb25uZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQVkzQyxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLFlBQXNCLHFCQUE0QztRQUE1QywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO0lBQUcsQ0FBQztJQUV0RSxxQkFBcUIsQ0FDbkIsT0FBOEI7UUFFOUIsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkUsQ0FBQzs7b0hBUFUsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FGdEIsTUFBTTsyRkFFUCx1QkFBdUI7a0JBSG5DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQXNtQ3VzdG9tZXIzNjBSZXF1ZXN0LFxuICBBc21DdXN0b21lcjM2MFJlc3BvbnNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2FzbS9jdXN0b21lci0zNjAvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwQWRhcHRlciB9IGZyb20gJy4vYXNtLWN1c3RvbWVyLTM2MC5hZGFwdGVyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEFzbUN1c3RvbWVyMzYwQ29ubmVjdG9yIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFzbUN1c3RvbWVyMzYwQWRhcHRlcjogQXNtQ3VzdG9tZXIzNjBBZGFwdGVyKSB7fVxuXG4gIGdldEFzbUN1c3RvbWVyMzYwRGF0YShcbiAgICByZXF1ZXN0OiBBc21DdXN0b21lcjM2MFJlcXVlc3RcbiAgKTogT2JzZXJ2YWJsZTxBc21DdXN0b21lcjM2MFJlc3BvbnNlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXNtQ3VzdG9tZXIzNjBBZGFwdGVyLmdldEFzbUN1c3RvbWVyMzYwRGF0YShyZXF1ZXN0KTtcbiAgfVxufVxuIl19