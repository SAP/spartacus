/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ReplenishmentOrderCancellationDialogComponent } from './replenishment-order-cancellation-dialog.component';
import * as i0 from "@angular/core";
export class ReplenishmentOrderCancellationDialogModule {
}
ReplenishmentOrderCancellationDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReplenishmentOrderCancellationDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, declarations: [ReplenishmentOrderCancellationDialogComponent], imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule], exports: [ReplenishmentOrderCancellationDialogComponent] });
ReplenishmentOrderCancellationDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReplenishmentOrderCancellationDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
                    declarations: [ReplenishmentOrderCancellationDialogComponent],
                    exports: [ReplenishmentOrderCancellationDialogComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGVuaXNobWVudC1vcmRlci1jYW5jZWxsYXRpb24tZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL3JlcGxlbmlzaG1lbnQtb3JkZXItY2FuY2VsbGF0aW9uLWRpYWxvZy9yZXBsZW5pc2htZW50LW9yZGVyLWNhbmNlbGxhdGlvbi1kaWFsb2cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSw2Q0FBNkMsRUFBRSxNQUFNLHFEQUFxRCxDQUFDOztBQU9wSCxNQUFNLE9BQU8sMENBQTBDOzt1SUFBMUMsMENBQTBDO3dJQUExQywwQ0FBMEMsaUJBSHRDLDZDQUE2QyxhQURsRCxZQUFZLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsYUFFekQsNkNBQTZDO3dJQUU1QywwQ0FBMEMsWUFKM0MsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsbUJBQW1COzJGQUl4RCwwQ0FBMEM7a0JBTHRELFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLENBQUM7b0JBQ3BFLFlBQVksRUFBRSxDQUFDLDZDQUE2QyxDQUFDO29CQUM3RCxPQUFPLEVBQUUsQ0FBQyw2Q0FBNkMsQ0FBQztpQkFDekQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSwgS2V5Ym9hcmRGb2N1c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBSZXBsZW5pc2htZW50T3JkZXJDYW5jZWxsYXRpb25EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3JlcGxlbmlzaG1lbnQtb3JkZXItY2FuY2VsbGF0aW9uLWRpYWxvZy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJMThuTW9kdWxlLCBJY29uTW9kdWxlLCBLZXlib2FyZEZvY3VzTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbUmVwbGVuaXNobWVudE9yZGVyQ2FuY2VsbGF0aW9uRGlhbG9nQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1JlcGxlbmlzaG1lbnRPcmRlckNhbmNlbGxhdGlvbkRpYWxvZ0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFJlcGxlbmlzaG1lbnRPcmRlckNhbmNlbGxhdGlvbkRpYWxvZ01vZHVsZSB7fVxuIl19