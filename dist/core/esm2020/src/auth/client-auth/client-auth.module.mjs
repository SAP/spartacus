/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { interceptors } from './http-interceptors/index';
import { ClientAuthStoreModule } from './store/client-auth-store.module';
import * as i0 from "@angular/core";
/**
 * Some of the OCC endpoints require Authorization header with the client token (eg. user registration).
 * This pattern should not be used in the frontend apps, but until OCC changes this requirement
 * we provide this module to support using those endpoints.
 *
 * After OCC improvements regarding client authentication this module can be safely removed.
 */
export class ClientAuthModule {
    static forRoot() {
        return {
            ngModule: ClientAuthModule,
            providers: [...interceptors],
        };
    }
}
ClientAuthModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClientAuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ClientAuthModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ClientAuthModule, imports: [CommonModule, ClientAuthStoreModule] });
ClientAuthModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClientAuthModule, imports: [CommonModule, ClientAuthStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ClientAuthModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ClientAuthStoreModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LWF1dGgubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvYXV0aC9jbGllbnQtYXV0aC9jbGllbnQtYXV0aC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDekQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0FBRXpFOzs7Ozs7R0FNRztBQUlILE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixTQUFTLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQztTQUM3QixDQUFDO0lBQ0osQ0FBQzs7NkdBTlUsZ0JBQWdCOzhHQUFoQixnQkFBZ0IsWUFGakIsWUFBWSxFQUFFLHFCQUFxQjs4R0FFbEMsZ0JBQWdCLFlBRmpCLFlBQVksRUFBRSxxQkFBcUI7MkZBRWxDLGdCQUFnQjtrQkFINUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUscUJBQXFCLENBQUM7aUJBQy9DIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbnRlcmNlcHRvcnMgfSBmcm9tICcuL2h0dHAtaW50ZXJjZXB0b3JzL2luZGV4JztcbmltcG9ydCB7IENsaWVudEF1dGhTdG9yZU1vZHVsZSB9IGZyb20gJy4vc3RvcmUvY2xpZW50LWF1dGgtc3RvcmUubW9kdWxlJztcblxuLyoqXG4gKiBTb21lIG9mIHRoZSBPQ0MgZW5kcG9pbnRzIHJlcXVpcmUgQXV0aG9yaXphdGlvbiBoZWFkZXIgd2l0aCB0aGUgY2xpZW50IHRva2VuIChlZy4gdXNlciByZWdpc3RyYXRpb24pLlxuICogVGhpcyBwYXR0ZXJuIHNob3VsZCBub3QgYmUgdXNlZCBpbiB0aGUgZnJvbnRlbmQgYXBwcywgYnV0IHVudGlsIE9DQyBjaGFuZ2VzIHRoaXMgcmVxdWlyZW1lbnRcbiAqIHdlIHByb3ZpZGUgdGhpcyBtb2R1bGUgdG8gc3VwcG9ydCB1c2luZyB0aG9zZSBlbmRwb2ludHMuXG4gKlxuICogQWZ0ZXIgT0NDIGltcHJvdmVtZW50cyByZWdhcmRpbmcgY2xpZW50IGF1dGhlbnRpY2F0aW9uIHRoaXMgbW9kdWxlIGNhbiBiZSBzYWZlbHkgcmVtb3ZlZC5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgQ2xpZW50QXV0aFN0b3JlTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2xpZW50QXV0aE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q2xpZW50QXV0aE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ2xpZW50QXV0aE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogWy4uLmludGVyY2VwdG9yc10sXG4gICAgfTtcbiAgfVxufVxuIl19