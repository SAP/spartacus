/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule, I18nModule } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { BulkPricingTableComponent } from './bulk-pricing-table.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class BulkPricingTableModule {
}
BulkPricingTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BulkPricingTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingTableModule, declarations: [BulkPricingTableComponent], imports: [CommonModule,
        I18nModule,
        SpinnerModule, i1.ConfigModule], exports: [BulkPricingTableComponent] });
BulkPricingTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingTableModule, imports: [CommonModule,
        I18nModule,
        SpinnerModule,
        ConfigModule.withConfig({
            cmsComponents: {
                BulkPricingTableComponent: {
                    component: BulkPricingTableComponent,
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BulkPricingTableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        SpinnerModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                BulkPricingTableComponent: {
                                    component: BulkPricingTableComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [BulkPricingTableComponent],
                    exports: [BulkPricingTableComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVsay1wcmljaW5nLXRhYmxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0L2J1bGstcHJpY2luZy9jb21wb25lbnRzL2J1bGstcHJpY2luZy10YWJsZS9idWxrLXByaWNpbmctdGFibGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQWEsWUFBWSxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7O0FBa0IzRSxNQUFNLE9BQU8sc0JBQXNCOzttSEFBdEIsc0JBQXNCO29IQUF0QixzQkFBc0IsaUJBSGxCLHlCQUF5QixhQVh0QyxZQUFZO1FBQ1osVUFBVTtRQUNWLGFBQWEsOEJBVUwseUJBQXlCO29IQUV4QixzQkFBc0IsWUFkL0IsWUFBWTtRQUNaLFVBQVU7UUFDVixhQUFhO1FBQ2IsWUFBWSxDQUFDLFVBQVUsQ0FBWTtZQUNqQyxhQUFhLEVBQUU7Z0JBQ2IseUJBQXlCLEVBQUU7b0JBQ3pCLFNBQVMsRUFBRSx5QkFBeUI7aUJBQ3JDO2FBQ0Y7U0FDRixDQUFDOzJGQUtPLHNCQUFzQjtrQkFoQmxDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixhQUFhO3dCQUNiLFlBQVksQ0FBQyxVQUFVLENBQVk7NEJBQ2pDLGFBQWEsRUFBRTtnQ0FDYix5QkFBeUIsRUFBRTtvQ0FDekIsU0FBUyxFQUFFLHlCQUF5QjtpQ0FDckM7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDekMsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7aUJBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IENtc0NvbmZpZywgQ29uZmlnTW9kdWxlLCBJMThuTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFNwaW5uZXJNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQnVsa1ByaWNpbmdUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vYnVsay1wcmljaW5nLXRhYmxlLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBTcGlubmVyTW9kdWxlLFxuICAgIENvbmZpZ01vZHVsZS53aXRoQ29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBCdWxrUHJpY2luZ1RhYmxlQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBCdWxrUHJpY2luZ1RhYmxlQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQnVsa1ByaWNpbmdUYWJsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtCdWxrUHJpY2luZ1RhYmxlQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQnVsa1ByaWNpbmdUYWJsZU1vZHVsZSB7fVxuIl19