/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CdcAuthModule } from './auth/cdc-auth.module';
import { facadeProviders } from './auth/facade/facade-providers';
import { CdcEventModule } from './events/cdc-event.module';
import { CdcStoreModule } from './store/cdc-store.module';
import * as i0 from "@angular/core";
export class CdcCoreModule {
}
CdcCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdcCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CdcCoreModule, imports: [CdcAuthModule, CdcEventModule, CdcStoreModule] });
CdcCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcCoreModule, providers: [...facadeProviders], imports: [CdcAuthModule, CdcEventModule, CdcStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CdcAuthModule, CdcEventModule, CdcStoreModule],
                    providers: [...facadeProviders],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9jZGMvY29yZS9jZGMtY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztBQU0xRCxNQUFNLE9BQU8sYUFBYTs7MEdBQWIsYUFBYTsyR0FBYixhQUFhLFlBSGQsYUFBYSxFQUFFLGNBQWMsRUFBRSxjQUFjOzJHQUc1QyxhQUFhLGFBRmIsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxZQURyQixhQUFhLEVBQUUsY0FBYyxFQUFFLGNBQWM7MkZBRzVDLGFBQWE7a0JBSnpCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUM7b0JBQ3hELFNBQVMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDO2lCQUNoQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGNBdXRoTW9kdWxlIH0gZnJvbSAnLi9hdXRoL2NkYy1hdXRoLm1vZHVsZSc7XG5pbXBvcnQgeyBmYWNhZGVQcm92aWRlcnMgfSBmcm9tICcuL2F1dGgvZmFjYWRlL2ZhY2FkZS1wcm92aWRlcnMnO1xuaW1wb3J0IHsgQ2RjRXZlbnRNb2R1bGUgfSBmcm9tICcuL2V2ZW50cy9jZGMtZXZlbnQubW9kdWxlJztcbmltcG9ydCB7IENkY1N0b3JlTW9kdWxlIH0gZnJvbSAnLi9zdG9yZS9jZGMtc3RvcmUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NkY0F1dGhNb2R1bGUsIENkY0V2ZW50TW9kdWxlLCBDZGNTdG9yZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogWy4uLmZhY2FkZVByb3ZpZGVyc10sXG59KVxuZXhwb3J0IGNsYXNzIENkY0NvcmVNb2R1bGUge31cbiJdfQ==