/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { UnitOrderComponentsModule } from '@spartacus/organization/unit-order/components';
import { UnitOrderCoreModule } from '@spartacus/organization/unit-order/core';
import { UnitOrderOccModule } from '@spartacus/organization/unit-order/occ';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/organization/unit-order/core";
export class UnitOrderModule {
}
UnitOrderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitOrderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderModule, imports: [i1.UnitOrderCoreModule, UnitOrderOccModule,
        UnitOrderComponentsModule] });
UnitOrderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderModule, imports: [UnitOrderCoreModule.forRoot(),
        UnitOrderOccModule,
        UnitOrderComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        UnitOrderCoreModule.forRoot(),
                        UnitOrderOccModule,
                        UnitOrderComponentsModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1vcmRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL3VuaXQtb3JkZXIvdW5pdC1vcmRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDMUYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7OztBQVM1RSxNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLG9DQUp4QixrQkFBa0I7UUFDbEIseUJBQXlCOzZHQUdoQixlQUFlLFlBTHhCLG1CQUFtQixDQUFDLE9BQU8sRUFBRTtRQUM3QixrQkFBa0I7UUFDbEIseUJBQXlCOzJGQUdoQixlQUFlO2tCQVAzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxtQkFBbUIsQ0FBQyxPQUFPLEVBQUU7d0JBQzdCLGtCQUFrQjt3QkFDbEIseUJBQXlCO3FCQUMxQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbml0T3JkZXJDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vdW5pdC1vcmRlci9jb21wb25lbnRzJztcbmltcG9ydCB7IFVuaXRPcmRlckNvcmVNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi91bml0LW9yZGVyL2NvcmUnO1xuaW1wb3J0IHsgVW5pdE9yZGVyT2NjTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vdW5pdC1vcmRlci9vY2MnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgVW5pdE9yZGVyQ29yZU1vZHVsZS5mb3JSb290KCksXG4gICAgVW5pdE9yZGVyT2NjTW9kdWxlLFxuICAgIFVuaXRPcmRlckNvbXBvbmVudHNNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRPcmRlck1vZHVsZSB7fVxuIl19