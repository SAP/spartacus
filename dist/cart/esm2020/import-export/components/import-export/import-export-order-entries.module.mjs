/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule, I18nModule, UrlModule, } from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import { ExportOrderEntriesModule } from '../export-entries';
import { ImportOrderEntriesModule } from '../import-to-cart';
import { ImportExportOrderEntriesComponent } from './import-export-order-entries.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class ImportExportOrderEntriesModule {
}
ImportExportOrderEntriesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportOrderEntriesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ImportExportOrderEntriesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ImportExportOrderEntriesModule, declarations: [ImportExportOrderEntriesComponent], imports: [PageComponentModule, i1.ConfigModule, I18nModule,
        UrlModule,
        ImportOrderEntriesModule,
        ExportOrderEntriesModule,
        CommonModule], exports: [ImportExportOrderEntriesComponent] });
ImportExportOrderEntriesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportOrderEntriesModule, imports: [PageComponentModule,
        ConfigModule.withConfig({
            cmsComponents: {
                ImportExportOrderEntriesComponent: {
                    component: ImportExportOrderEntriesComponent,
                },
            },
        }),
        I18nModule,
        UrlModule,
        ImportOrderEntriesModule,
        ExportOrderEntriesModule,
        CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportExportOrderEntriesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        PageComponentModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                ImportExportOrderEntriesComponent: {
                                    component: ImportExportOrderEntriesComponent,
                                },
                            },
                        }),
                        I18nModule,
                        UrlModule,
                        ImportOrderEntriesModule,
                        ExportOrderEntriesModule,
                        CommonModule,
                    ],
                    exports: [ImportExportOrderEntriesComponent],
                    declarations: [ImportExportOrderEntriesComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LWV4cG9ydC1vcmRlci1lbnRyaWVzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2ltcG9ydC1leHBvcnQvY29tcG9uZW50cy9pbXBvcnQtZXhwb3J0L2ltcG9ydC1leHBvcnQtb3JkZXItZW50cmllcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFFTCxZQUFZLEVBQ1osVUFBVSxFQUNWLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdELE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7QUFxQjVGLE1BQU0sT0FBTyw4QkFBOEI7OzJIQUE5Qiw4QkFBOEI7NEhBQTlCLDhCQUE4QixpQkFGMUIsaUNBQWlDLGFBZjlDLG1CQUFtQixtQkFRbkIsVUFBVTtRQUNWLFNBQVM7UUFDVCx3QkFBd0I7UUFDeEIsd0JBQXdCO1FBQ3hCLFlBQVksYUFFSixpQ0FBaUM7NEhBR2hDLDhCQUE4QixZQWpCdkMsbUJBQW1CO1FBQ25CLFlBQVksQ0FBQyxVQUFVLENBQVk7WUFDakMsYUFBYSxFQUFFO2dCQUNiLGlDQUFpQyxFQUFFO29CQUNqQyxTQUFTLEVBQUUsaUNBQWlDO2lCQUM3QzthQUNGO1NBQ0YsQ0FBQztRQUNGLFVBQVU7UUFDVixTQUFTO1FBQ1Qsd0JBQXdCO1FBQ3hCLHdCQUF3QjtRQUN4QixZQUFZOzJGQUtILDhCQUE4QjtrQkFuQjFDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLG1CQUFtQjt3QkFDbkIsWUFBWSxDQUFDLFVBQVUsQ0FBWTs0QkFDakMsYUFBYSxFQUFFO2dDQUNiLGlDQUFpQyxFQUFFO29DQUNqQyxTQUFTLEVBQUUsaUNBQWlDO2lDQUM3Qzs2QkFDRjt5QkFDRixDQUFDO3dCQUNGLFVBQVU7d0JBQ1YsU0FBUzt3QkFDVCx3QkFBd0I7d0JBQ3hCLHdCQUF3Qjt3QkFDeEIsWUFBWTtxQkFDYjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztvQkFDNUMsWUFBWSxFQUFFLENBQUMsaUNBQWlDLENBQUM7aUJBQ2xEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDbXNDb25maWcsXG4gIENvbmZpZ01vZHVsZSxcbiAgSTE4bk1vZHVsZSxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUGFnZUNvbXBvbmVudE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBFeHBvcnRPcmRlckVudHJpZXNNb2R1bGUgfSBmcm9tICcuLi9leHBvcnQtZW50cmllcyc7XG5pbXBvcnQgeyBJbXBvcnRPcmRlckVudHJpZXNNb2R1bGUgfSBmcm9tICcuLi9pbXBvcnQtdG8tY2FydCc7XG5pbXBvcnQgeyBJbXBvcnRFeHBvcnRPcmRlckVudHJpZXNDb21wb25lbnQgfSBmcm9tICcuL2ltcG9ydC1leHBvcnQtb3JkZXItZW50cmllcy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgUGFnZUNvbXBvbmVudE1vZHVsZSxcbiAgICBDb25maWdNb2R1bGUud2l0aENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgSW1wb3J0RXhwb3J0T3JkZXJFbnRyaWVzQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBJbXBvcnRFeHBvcnRPcmRlckVudHJpZXNDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIEltcG9ydE9yZGVyRW50cmllc01vZHVsZSxcbiAgICBFeHBvcnRPcmRlckVudHJpZXNNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICBdLFxuICBleHBvcnRzOiBbSW1wb3J0RXhwb3J0T3JkZXJFbnRyaWVzQ29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbSW1wb3J0RXhwb3J0T3JkZXJFbnRyaWVzQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgSW1wb3J0RXhwb3J0T3JkZXJFbnRyaWVzTW9kdWxlIHt9XG4iXX0=