/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule, I18nModule, UrlModule, } from '@spartacus/core';
import { ExportOrderEntriesComponent } from './export-order-entries.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class ExportOrderEntriesModule {
}
ExportOrderEntriesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExportOrderEntriesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ExportOrderEntriesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ExportOrderEntriesModule, declarations: [ExportOrderEntriesComponent], imports: [CommonModule,
        RouterModule,
        I18nModule,
        UrlModule, i1.ConfigModule], exports: [ExportOrderEntriesComponent] });
ExportOrderEntriesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExportOrderEntriesModule, imports: [CommonModule,
        RouterModule,
        I18nModule,
        UrlModule,
        ConfigModule.withConfig({
            cmsComponents: {
                ExportOrderEntriesComponent: {
                    component: ExportOrderEntriesComponent,
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExportOrderEntriesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        I18nModule,
                        UrlModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                ExportOrderEntriesComponent: {
                                    component: ExportOrderEntriesComponent,
                                },
                            },
                        }),
                    ],
                    exports: [ExportOrderEntriesComponent],
                    declarations: [ExportOrderEntriesComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LW9yZGVyLWVudHJpZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvaW1wb3J0LWV4cG9ydC9jb21wb25lbnRzL2V4cG9ydC1lbnRyaWVzL2V4cG9ydC1vcmRlci1lbnRyaWVzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFFTCxZQUFZLEVBQ1osVUFBVSxFQUNWLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7QUFtQi9FLE1BQU0sT0FBTyx3QkFBd0I7O3FIQUF4Qix3QkFBd0I7c0hBQXhCLHdCQUF3QixpQkFGcEIsMkJBQTJCLGFBYnhDLFlBQVk7UUFDWixZQUFZO1FBQ1osVUFBVTtRQUNWLFNBQVMsOEJBU0QsMkJBQTJCO3NIQUcxQix3QkFBd0IsWUFmakMsWUFBWTtRQUNaLFlBQVk7UUFDWixVQUFVO1FBQ1YsU0FBUztRQUNULFlBQVksQ0FBQyxVQUFVLENBQVk7WUFDakMsYUFBYSxFQUFFO2dCQUNiLDJCQUEyQixFQUFFO29CQUMzQixTQUFTLEVBQUUsMkJBQTJCO2lCQUN2QzthQUNGO1NBQ0YsQ0FBQzsyRkFLTyx3QkFBd0I7a0JBakJwQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixTQUFTO3dCQUNULFlBQVksQ0FBQyxVQUFVLENBQVk7NEJBQ2pDLGFBQWEsRUFBRTtnQ0FDYiwyQkFBMkIsRUFBRTtvQ0FDM0IsU0FBUyxFQUFFLDJCQUEyQjtpQ0FDdkM7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxPQUFPLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztvQkFDdEMsWUFBWSxFQUFFLENBQUMsMkJBQTJCLENBQUM7aUJBQzVDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBDb25maWdNb2R1bGUsXG4gIEkxOG5Nb2R1bGUsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEV4cG9ydE9yZGVyRW50cmllc0NvbXBvbmVudCB9IGZyb20gJy4vZXhwb3J0LW9yZGVyLWVudHJpZXMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgQ29uZmlnTW9kdWxlLndpdGhDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIEV4cG9ydE9yZGVyRW50cmllc0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogRXhwb3J0T3JkZXJFbnRyaWVzQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZXhwb3J0czogW0V4cG9ydE9yZGVyRW50cmllc0NvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW0V4cG9ydE9yZGVyRW50cmllc0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIEV4cG9ydE9yZGVyRW50cmllc01vZHVsZSB7fVxuIl19