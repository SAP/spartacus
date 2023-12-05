/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultImportExportConfig } from './config/default-import-export-config';
import * as i0 from "@angular/core";
export class ImportExportCoreModule {
    static forRoot() {
        return {
            ngModule: ImportExportCoreModule,
            providers: [provideDefaultConfig(defaultImportExportConfig)],
        };
    }
}
ImportExportCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImportExportCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ImportExportCoreModule });
ImportExportCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportCoreModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportCoreModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2ltcG9ydC1leHBvcnQvY29yZS9pbXBvcnQtZXhwb3J0LWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQzs7QUFHbEYsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsc0JBQXNCO1lBQ2hDLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDN0QsQ0FBQztJQUNKLENBQUM7O21IQU5VLHNCQUFzQjtvSEFBdEIsc0JBQXNCO29IQUF0QixzQkFBc0I7MkZBQXRCLHNCQUFzQjtrQkFEbEMsUUFBUTttQkFBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGRlZmF1bHRJbXBvcnRFeHBvcnRDb25maWcgfSBmcm9tICcuL2NvbmZpZy9kZWZhdWx0LWltcG9ydC1leHBvcnQtY29uZmlnJztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIEltcG9ydEV4cG9ydENvcmVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEltcG9ydEV4cG9ydENvcmVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEltcG9ydEV4cG9ydENvcmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0SW1wb3J0RXhwb3J0Q29uZmlnKV0sXG4gICAgfTtcbiAgfVxufVxuIl19