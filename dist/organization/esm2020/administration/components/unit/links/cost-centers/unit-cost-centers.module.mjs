/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { DisableInfoModule } from '../../../shared/detail/disable-info/disable-info.module';
import { SubListModule } from '../../../shared/sub-list/sub-list.module';
import { UnitCostCenterListComponent } from './unit-cost-centers.component';
import * as i0 from "@angular/core";
export class UnitCostCenterListModule {
}
UnitCostCenterListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitCostCenterListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListModule, declarations: [UnitCostCenterListComponent], imports: [I18nModule,
        RouterModule,
        SubListModule,
        CommonModule,
        DisableInfoModule] });
UnitCostCenterListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListModule, imports: [I18nModule,
        RouterModule,
        SubListModule,
        CommonModule,
        DisableInfoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        I18nModule,
                        RouterModule,
                        SubListModule,
                        CommonModule,
                        DisableInfoModule,
                    ],
                    declarations: [UnitCostCenterListComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1jb3N0LWNlbnRlcnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VuaXQvbGlua3MvY29zdC1jZW50ZXJzL3VuaXQtY29zdC1jZW50ZXJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUM1RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDekUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0JBQStCLENBQUM7O0FBWTVFLE1BQU0sT0FBTyx3QkFBd0I7O3FIQUF4Qix3QkFBd0I7c0hBQXhCLHdCQUF3QixpQkFGcEIsMkJBQTJCLGFBTnhDLFVBQVU7UUFDVixZQUFZO1FBQ1osYUFBYTtRQUNiLFlBQVk7UUFDWixpQkFBaUI7c0hBSVIsd0JBQXdCLFlBUmpDLFVBQVU7UUFDVixZQUFZO1FBQ1osYUFBYTtRQUNiLFlBQVk7UUFDWixpQkFBaUI7MkZBSVIsd0JBQXdCO2tCQVZwQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxVQUFVO3dCQUNWLFlBQVk7d0JBQ1osYUFBYTt3QkFDYixZQUFZO3dCQUNaLGlCQUFpQjtxQkFDbEI7b0JBQ0QsWUFBWSxFQUFFLENBQUMsMkJBQTJCLENBQUM7aUJBQzVDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBEaXNhYmxlSW5mb01vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9kZXRhaWwvZGlzYWJsZS1pbmZvL2Rpc2FibGUtaW5mby5tb2R1bGUnO1xuaW1wb3J0IHsgU3ViTGlzdE1vZHVsZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zdWItbGlzdC9zdWItbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHsgVW5pdENvc3RDZW50ZXJMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi91bml0LWNvc3QtY2VudGVycy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgSTE4bk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgU3ViTGlzdE1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRGlzYWJsZUluZm9Nb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1VuaXRDb3N0Q2VudGVyTGlzdENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRDb3N0Q2VudGVyTGlzdE1vZHVsZSB7fVxuIl19