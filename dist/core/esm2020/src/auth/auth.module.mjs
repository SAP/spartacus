/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientAuthModule } from './client-auth/client-auth.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import * as i0 from "@angular/core";
import * as i1 from "./user-auth/user-auth.module";
import * as i2 from "./client-auth/client-auth.module";
export class AuthModule {
    static forRoot() {
        return {
            ngModule: AuthModule,
        };
    }
}
AuthModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AuthModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AuthModule, imports: [CommonModule, i1.UserAuthModule, i2.ClientAuthModule] });
AuthModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthModule, imports: [CommonModule, UserAuthModule.forRoot(), ClientAuthModule.forRoot()] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthModule, decorators: [{
            type: NgModule,
            args: [{
                    // ClientAuthModule should always be imported after UserAuthModule because the ClientTokenInterceptor must be imported after the AuthInterceptor.
                    // This way, the ClientTokenInterceptor is the first to handle 401 errors and attempt to refresh the client token.
                    // If the request is not for the client token, the AuthInterceptor handles the refresh.
                    imports: [CommonModule, UserAuthModule.forRoot(), ClientAuthModule.forRoot()],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9hdXRoL2F1dGgubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7O0FBUTlELE1BQU0sT0FBTyxVQUFVO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxVQUFVO1NBQ3JCLENBQUM7SUFDSixDQUFDOzt1R0FMVSxVQUFVO3dHQUFWLFVBQVUsWUFGWCxZQUFZO3dHQUVYLFVBQVUsWUFGWCxZQUFZLEVBQUUsY0FBYyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRTsyRkFFakUsVUFBVTtrQkFOdEIsUUFBUTttQkFBQztvQkFDUixpSkFBaUo7b0JBQ2pKLGtIQUFrSDtvQkFDbEgsdUZBQXVGO29CQUN2RixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLE9BQU8sRUFBRSxFQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUM5RSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2xpZW50QXV0aE1vZHVsZSB9IGZyb20gJy4vY2xpZW50LWF1dGgvY2xpZW50LWF1dGgubW9kdWxlJztcbmltcG9ydCB7IFVzZXJBdXRoTW9kdWxlIH0gZnJvbSAnLi91c2VyLWF1dGgvdXNlci1hdXRoLm1vZHVsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIC8vIENsaWVudEF1dGhNb2R1bGUgc2hvdWxkIGFsd2F5cyBiZSBpbXBvcnRlZCBhZnRlciBVc2VyQXV0aE1vZHVsZSBiZWNhdXNlIHRoZSBDbGllbnRUb2tlbkludGVyY2VwdG9yIG11c3QgYmUgaW1wb3J0ZWQgYWZ0ZXIgdGhlIEF1dGhJbnRlcmNlcHRvci5cbiAgLy8gVGhpcyB3YXksIHRoZSBDbGllbnRUb2tlbkludGVyY2VwdG9yIGlzIHRoZSBmaXJzdCB0byBoYW5kbGUgNDAxIGVycm9ycyBhbmQgYXR0ZW1wdCB0byByZWZyZXNoIHRoZSBjbGllbnQgdG9rZW4uXG4gIC8vIElmIHRoZSByZXF1ZXN0IGlzIG5vdCBmb3IgdGhlIGNsaWVudCB0b2tlbiwgdGhlIEF1dGhJbnRlcmNlcHRvciBoYW5kbGVzIHRoZSByZWZyZXNoLlxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBVc2VyQXV0aE1vZHVsZS5mb3JSb290KCksIENsaWVudEF1dGhNb2R1bGUuZm9yUm9vdCgpXSxcbn0pXG5leHBvcnQgY2xhc3MgQXV0aE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QXV0aE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQXV0aE1vZHVsZSxcbiAgICB9O1xuICB9XG59XG4iXX0=