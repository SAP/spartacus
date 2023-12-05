/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { UserEventBuilder } from './events/user-event.builder';
import { UserEventModule } from './events/user-event.module';
import { UserStoreModule } from './store/user-store.module';
import * as i0 from "@angular/core";
export class UserModule {
    static forRoot() {
        return {
            ngModule: UserModule,
        };
    }
}
UserModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserModule, imports: [UserStoreModule, UserEventModule] });
UserModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserModule, providers: [UserEventBuilder], imports: [UserStoreModule, UserEventModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [UserStoreModule, UserEventModule],
                    providers: [UserEventBuilder],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy91c2VyL3VzZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQU01RCxNQUFNLE9BQU8sVUFBVTtJQUNyQixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsVUFBVTtTQUNyQixDQUFDO0lBQ0osQ0FBQzs7dUdBTFUsVUFBVTt3R0FBVixVQUFVLFlBSFgsZUFBZSxFQUFFLGVBQWU7d0dBRy9CLFVBQVUsYUFGVixDQUFDLGdCQUFnQixDQUFDLFlBRG5CLGVBQWUsRUFBRSxlQUFlOzJGQUcvQixVQUFVO2tCQUp0QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxlQUFlLENBQUM7b0JBQzNDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2lCQUM5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVc2VyRXZlbnRCdWlsZGVyIH0gZnJvbSAnLi9ldmVudHMvdXNlci1ldmVudC5idWlsZGVyJztcbmltcG9ydCB7IFVzZXJFdmVudE1vZHVsZSB9IGZyb20gJy4vZXZlbnRzL3VzZXItZXZlbnQubW9kdWxlJztcbmltcG9ydCB7IFVzZXJTdG9yZU1vZHVsZSB9IGZyb20gJy4vc3RvcmUvdXNlci1zdG9yZS5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbVXNlclN0b3JlTW9kdWxlLCBVc2VyRXZlbnRNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtVc2VyRXZlbnRCdWlsZGVyXSxcbn0pXG5leHBvcnQgY2xhc3MgVXNlck1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8VXNlck1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVXNlck1vZHVsZSxcbiAgICB9O1xuICB9XG59XG4iXX0=