/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
// Imported for side effects (module augmentation)
import '@spartacus/storefront';
import * as i0 from "@angular/core";
export class CartConfig {
}
CartConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CartConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL3Jvb3QvY29uZmlnL2NhcnQtY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxrREFBa0Q7QUFDbEQsT0FBTyx1QkFBdUIsQ0FBQzs7QUFNL0IsTUFBTSxPQUFnQixVQUFVOzt1R0FBVixVQUFVOzJHQUFWLFVBQVUsY0FIbEIsTUFBTSxlQUNMLE1BQU07MkZBRUMsVUFBVTtrQkFKL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsV0FBVyxFQUFFLE1BQU07aUJBQ3BCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbi8vIEltcG9ydGVkIGZvciBzaWRlIGVmZmVjdHMgKG1vZHVsZSBhdWdtZW50YXRpb24pXG5pbXBvcnQgJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VFeGlzdGluZzogQ29uZmlnLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDYXJ0Q29uZmlnIHtcbiAgY2FydD86IHtcbiAgICBzZWxlY3RpdmVDYXJ0Pzoge1xuICAgICAgZW5hYmxlZD86IGJvb2xlYW47XG4gICAgfTtcbiAgICB2YWxpZGF0aW9uPzoge1xuICAgICAgZW5hYmxlZD86IGJvb2xlYW47XG4gICAgfTtcbiAgfTtcbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BzcGFydGFjdXMvY29yZScge1xuICBpbnRlcmZhY2UgQ29uZmlnIGV4dGVuZHMgQ2FydENvbmZpZyB7fVxufVxuIl19