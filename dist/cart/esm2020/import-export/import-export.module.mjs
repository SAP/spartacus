/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { ExportOrderEntriesModule, ImportExportOrderEntriesModule, ImportOrderEntriesModule, } from '@spartacus/cart/import-export/components';
import { ImportExportCoreModule } from '@spartacus/cart/import-export/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/import-export/core";
export class ImportExportModule {
}
ImportExportModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImportExportModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ImportExportModule, imports: [i1.ImportExportCoreModule, ExportOrderEntriesModule,
        ImportOrderEntriesModule,
        ImportExportOrderEntriesModule] });
ImportExportModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportModule, imports: [ImportExportCoreModule.forRoot(),
        ExportOrderEntriesModule,
        ImportOrderEntriesModule,
        ImportExportOrderEntriesModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ImportExportCoreModule.forRoot(),
                        ExportOrderEntriesModule,
                        ImportOrderEntriesModule,
                        ImportExportOrderEntriesModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9pbXBvcnQtZXhwb3J0L2ltcG9ydC1leHBvcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsOEJBQThCLEVBQzlCLHdCQUF3QixHQUN6QixNQUFNLDBDQUEwQyxDQUFDO0FBQ2xELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7QUFVNUUsTUFBTSxPQUFPLGtCQUFrQjs7K0dBQWxCLGtCQUFrQjtnSEFBbEIsa0JBQWtCLHVDQUwzQix3QkFBd0I7UUFDeEIsd0JBQXdCO1FBQ3hCLDhCQUE4QjtnSEFHckIsa0JBQWtCLFlBTjNCLHNCQUFzQixDQUFDLE9BQU8sRUFBRTtRQUNoQyx3QkFBd0I7UUFDeEIsd0JBQXdCO1FBQ3hCLDhCQUE4QjsyRkFHckIsa0JBQWtCO2tCQVI5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxzQkFBc0IsQ0FBQyxPQUFPLEVBQUU7d0JBQ2hDLHdCQUF3Qjt3QkFDeEIsd0JBQXdCO3dCQUN4Qiw4QkFBOEI7cUJBQy9CO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEV4cG9ydE9yZGVyRW50cmllc01vZHVsZSxcbiAgSW1wb3J0RXhwb3J0T3JkZXJFbnRyaWVzTW9kdWxlLFxuICBJbXBvcnRPcmRlckVudHJpZXNNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9pbXBvcnQtZXhwb3J0L2NvbXBvbmVudHMnO1xuaW1wb3J0IHsgSW1wb3J0RXhwb3J0Q29yZU1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9pbXBvcnQtZXhwb3J0L2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgSW1wb3J0RXhwb3J0Q29yZU1vZHVsZS5mb3JSb290KCksXG4gICAgRXhwb3J0T3JkZXJFbnRyaWVzTW9kdWxlLFxuICAgIEltcG9ydE9yZGVyRW50cmllc01vZHVsZSxcbiAgICBJbXBvcnRFeHBvcnRPcmRlckVudHJpZXNNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEltcG9ydEV4cG9ydE1vZHVsZSB7fVxuIl19