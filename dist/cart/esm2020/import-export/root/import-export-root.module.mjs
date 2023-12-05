/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CART_IMPORT_EXPORT_FEATURE } from './feature-name';
import * as i0 from "@angular/core";
export class ImportExportRootModule {
}
ImportExportRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImportExportRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ImportExportRootModule });
ImportExportRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportRootModule, providers: [
        provideDefaultConfig({
            featureModules: {
                [CART_IMPORT_EXPORT_FEATURE]: {
                    cmsComponents: [
                        'ImportExportOrderEntriesComponent',
                        'ImportOrderEntriesComponent',
                        'ExportOrderEntriesComponent',
                    ],
                },
            },
        }),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig({
                            featureModules: {
                                [CART_IMPORT_EXPORT_FEATURE]: {
                                    cmsComponents: [
                                        'ImportExportOrderEntriesComponent',
                                        'ImportOrderEntriesComponent',
                                        'ExportOrderEntriesComponent',
                                    ],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC1yb290Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2ltcG9ydC1leHBvcnQvcm9vdC9pbXBvcnQtZXhwb3J0LXJvb3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQWlCNUQsTUFBTSxPQUFPLHNCQUFzQjs7bUhBQXRCLHNCQUFzQjtvSEFBdEIsc0JBQXNCO29IQUF0QixzQkFBc0IsYUFkdEI7UUFDVCxvQkFBb0IsQ0FBQztZQUNuQixjQUFjLEVBQUU7Z0JBQ2QsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFO29CQUM1QixhQUFhLEVBQUU7d0JBQ2IsbUNBQW1DO3dCQUNuQyw2QkFBNkI7d0JBQzdCLDZCQUE2QjtxQkFDOUI7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7S0FDSDsyRkFFVSxzQkFBc0I7a0JBZmxDLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDOzRCQUNuQixjQUFjLEVBQUU7Z0NBQ2QsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFO29DQUM1QixhQUFhLEVBQUU7d0NBQ2IsbUNBQW1DO3dDQUNuQyw2QkFBNkI7d0NBQzdCLDZCQUE2QjtxQ0FDOUI7aUNBQ0Y7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDQVJUX0lNUE9SVF9FWFBPUlRfRkVBVFVSRSB9IGZyb20gJy4vZmVhdHVyZS1uYW1lJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoe1xuICAgICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgICAgW0NBUlRfSU1QT1JUX0VYUE9SVF9GRUFUVVJFXToge1xuICAgICAgICAgIGNtc0NvbXBvbmVudHM6IFtcbiAgICAgICAgICAgICdJbXBvcnRFeHBvcnRPcmRlckVudHJpZXNDb21wb25lbnQnLFxuICAgICAgICAgICAgJ0ltcG9ydE9yZGVyRW50cmllc0NvbXBvbmVudCcsXG4gICAgICAgICAgICAnRXhwb3J0T3JkZXJFbnRyaWVzQ29tcG9uZW50JyxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgSW1wb3J0RXhwb3J0Um9vdE1vZHVsZSB7fVxuIl19