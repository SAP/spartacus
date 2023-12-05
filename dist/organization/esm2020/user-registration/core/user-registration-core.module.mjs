/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { HttpErrorHandler } from '@spartacus/core';
import { UserRegistrationConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';
import { OrganizationUserRegistrationConflictHandler } from './http-interceptors';
import * as i0 from "@angular/core";
export class UserRegistrationCoreModule {
    static forRoot() {
        return {
            ngModule: UserRegistrationCoreModule,
            providers: [
                ...facadeProviders,
                UserRegistrationConnector,
                {
                    provide: HttpErrorHandler,
                    useExisting: OrganizationUserRegistrationConflictHandler,
                    multi: true,
                },
            ],
        };
    }
}
UserRegistrationCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserRegistrationCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationCoreModule });
UserRegistrationCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationCoreModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRegistrationCoreModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yZWdpc3RyYXRpb24tY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL3VzZXItcmVnaXN0cmF0aW9uL2NvcmUvdXNlci1yZWdpc3RyYXRpb24tY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ25ELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLDJDQUEyQyxFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBR2xGLE1BQU0sT0FBTywwQkFBMEI7SUFDckMsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLDBCQUEwQjtZQUNwQyxTQUFTLEVBQUU7Z0JBQ1QsR0FBRyxlQUFlO2dCQUNsQix5QkFBeUI7Z0JBQ3pCO29CQUNFLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLFdBQVcsRUFBRSwyQ0FBMkM7b0JBQ3hELEtBQUssRUFBRSxJQUFJO2lCQUNaO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7dUhBZFUsMEJBQTBCO3dIQUExQiwwQkFBMEI7d0hBQTFCLDBCQUEwQjsyRkFBMUIsMEJBQTBCO2tCQUR0QyxRQUFRO21CQUFDLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEVycm9ySGFuZGxlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBVc2VyUmVnaXN0cmF0aW9uQ29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzJztcbmltcG9ydCB7IGZhY2FkZVByb3ZpZGVycyB9IGZyb20gJy4vZmFjYWRlL2ZhY2FkZS1wcm92aWRlcnMnO1xuaW1wb3J0IHsgT3JnYW5pemF0aW9uVXNlclJlZ2lzdHJhdGlvbkNvbmZsaWN0SGFuZGxlciB9IGZyb20gJy4vaHR0cC1pbnRlcmNlcHRvcnMnO1xuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgVXNlclJlZ2lzdHJhdGlvbkNvcmVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFVzZXJSZWdpc3RyYXRpb25Db3JlTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBVc2VyUmVnaXN0cmF0aW9uQ29yZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAuLi5mYWNhZGVQcm92aWRlcnMsXG4gICAgICAgIFVzZXJSZWdpc3RyYXRpb25Db25uZWN0b3IsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBIdHRwRXJyb3JIYW5kbGVyLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOiBPcmdhbml6YXRpb25Vc2VyUmVnaXN0cmF0aW9uQ29uZmxpY3RIYW5kbGVyLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=