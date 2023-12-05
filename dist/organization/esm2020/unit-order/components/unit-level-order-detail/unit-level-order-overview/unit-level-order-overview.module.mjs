/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { CardModule } from '@spartacus/storefront';
import { UnitLevelOrderOverviewComponent as UnitLevelOrderOverviewComponent } from './unit-level-order-overview.component';
import * as i0 from "@angular/core";
export class UnitLevelOrderOverviewModule {
}
UnitLevelOrderOverviewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderOverviewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitLevelOrderOverviewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderOverviewModule, declarations: [UnitLevelOrderOverviewComponent], imports: [CommonModule, I18nModule, CardModule], exports: [UnitLevelOrderOverviewComponent] });
UnitLevelOrderOverviewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderOverviewModule, imports: [CommonModule, I18nModule, CardModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitLevelOrderOverviewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, CardModule],
                    declarations: [UnitLevelOrderOverviewComponent],
                    exports: [UnitLevelOrderOverviewComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1sZXZlbC1vcmRlci1vdmVydmlldy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL3VuaXQtb3JkZXIvY29tcG9uZW50cy91bml0LWxldmVsLW9yZGVyLWRldGFpbC91bml0LWxldmVsLW9yZGVyLW92ZXJ2aWV3L3VuaXQtbGV2ZWwtb3JkZXItb3ZlcnZpZXcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSwrQkFBK0IsSUFBSSwrQkFBK0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOztBQU8zSCxNQUFNLE9BQU8sNEJBQTRCOzt5SEFBNUIsNEJBQTRCOzBIQUE1Qiw0QkFBNEIsaUJBSHhCLCtCQUErQixhQURwQyxZQUFZLEVBQUUsVUFBVSxFQUFFLFVBQVUsYUFFcEMsK0JBQStCOzBIQUU5Qiw0QkFBNEIsWUFKN0IsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVOzJGQUluQyw0QkFBNEI7a0JBTHhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUM7b0JBQy9DLFlBQVksRUFBRSxDQUFDLCtCQUErQixDQUFDO29CQUMvQyxPQUFPLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztpQkFDM0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ2FyZE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBVbml0TGV2ZWxPcmRlck92ZXJ2aWV3Q29tcG9uZW50IGFzIFVuaXRMZXZlbE9yZGVyT3ZlcnZpZXdDb21wb25lbnQgfSBmcm9tICcuL3VuaXQtbGV2ZWwtb3JkZXItb3ZlcnZpZXcuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgQ2FyZE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW1VuaXRMZXZlbE9yZGVyT3ZlcnZpZXdDb21wb25lbnRdLFxuICBleHBvcnRzOiBbVW5pdExldmVsT3JkZXJPdmVydmlld0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRMZXZlbE9yZGVyT3ZlcnZpZXdNb2R1bGUge31cbiJdfQ==