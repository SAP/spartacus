/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitLevelOrderHistoryFilterComponent } from './unit-level-order-history-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export class UnitLevelOrderHistoryFilterModule {
}
UnitLevelOrderHistoryFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitLevelOrderHistoryFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryFilterModule, declarations: [UnitLevelOrderHistoryFilterComponent], imports: [CommonModule, ReactiveFormsModule, I18nModule, IconModule], exports: [UnitLevelOrderHistoryFilterComponent] });
UnitLevelOrderHistoryFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryFilterModule, imports: [CommonModule, ReactiveFormsModule, I18nModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderHistoryFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [UnitLevelOrderHistoryFilterComponent],
                    exports: [UnitLevelOrderHistoryFilterComponent],
                    imports: [CommonModule, ReactiveFormsModule, I18nModule, IconModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1sZXZlbC1vcmRlci1oaXN0b3J5LWZpbHRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL3VuaXQtb3JkZXIvY29tcG9uZW50cy91bml0LWxldmVsLW9yZGVyLWhpc3RvcnkvZmlsdGVyL3VuaXQtbGV2ZWwtb3JkZXItaGlzdG9yeS1maWx0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUNuRyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQU9uRCxNQUFNLE9BQU8saUNBQWlDOzs4SEFBakMsaUNBQWlDOytIQUFqQyxpQ0FBaUMsaUJBSjdCLG9DQUFvQyxhQUV6QyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLFVBQVUsYUFEekQsb0NBQW9DOytIQUduQyxpQ0FBaUMsWUFGbEMsWUFBWSxFQUFFLG1CQUFtQixFQUFFLFVBQVUsRUFBRSxVQUFVOzJGQUV4RCxpQ0FBaUM7a0JBTDdDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsb0NBQW9DLENBQUM7b0JBQ3BELE9BQU8sRUFBRSxDQUFDLG9DQUFvQyxDQUFDO29CQUMvQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsVUFBVSxFQUFFLFVBQVUsQ0FBQztpQkFDckUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFVuaXRMZXZlbE9yZGVySGlzdG9yeUZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vdW5pdC1sZXZlbC1vcmRlci1oaXN0b3J5LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1VuaXRMZXZlbE9yZGVySGlzdG9yeUZpbHRlckNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtVbml0TGV2ZWxPcmRlckhpc3RvcnlGaWx0ZXJDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlLCBJMThuTW9kdWxlLCBJY29uTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdExldmVsT3JkZXJIaXN0b3J5RmlsdGVyTW9kdWxlIHt9XG4iXX0=