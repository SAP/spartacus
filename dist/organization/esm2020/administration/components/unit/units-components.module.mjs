/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { UnitDetailsModule } from './details/unit-details.module';
import { UnitFormModule } from './form/unit-form.module';
import { UnitAddressModule } from './links/addresses/unit-address.module';
import { UnitApproverListModule } from './links/approvers/unit-approver-list.module';
import { UnitChildrenModule } from './links/children/unit-children.module';
import { UnitCostCenterListModule } from './links/cost-centers/unit-cost-centers.module';
import { UnitUsersModule } from './links/users/unit-user-list.module';
import { UnitListModule } from './list/unit-list.module';
import { unitsCmsConfig, unitsTableConfigFactory } from './units.config';
import * as i0 from "@angular/core";
export class UnitsComponentsModule {
}
UnitsComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitsComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitsComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitsComponentsModule, imports: [RouterModule,
        UnitListModule,
        UnitDetailsModule,
        UnitFormModule,
        UnitChildrenModule,
        UnitApproverListModule,
        UnitUsersModule,
        UnitCostCenterListModule,
        UnitAddressModule] });
UnitsComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitsComponentsModule, providers: [
        provideDefaultConfig(unitsCmsConfig),
        provideDefaultConfigFactory(unitsTableConfigFactory),
    ], imports: [RouterModule,
        UnitListModule,
        UnitDetailsModule,
        UnitFormModule,
        UnitChildrenModule,
        UnitApproverListModule,
        UnitUsersModule,
        UnitCostCenterListModule,
        UnitAddressModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitsComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule,
                        UnitListModule,
                        UnitDetailsModule,
                        UnitFormModule,
                        UnitChildrenModule,
                        UnitApproverListModule,
                        UnitUsersModule,
                        UnitCostCenterListModule,
                        UnitAddressModule,
                    ],
                    providers: [
                        provideDefaultConfig(unitsCmsConfig),
                        provideDefaultConfigFactory(unitsTableConfigFactory),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdHMtY29tcG9uZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC91bml0cy1jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLG9CQUFvQixFQUNwQiwyQkFBMkIsR0FDNUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNsRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDMUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDckYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDekYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBbUJ6RSxNQUFNLE9BQU8scUJBQXFCOztrSEFBckIscUJBQXFCO21IQUFyQixxQkFBcUIsWUFmOUIsWUFBWTtRQUNaLGNBQWM7UUFDZCxpQkFBaUI7UUFDakIsY0FBYztRQUNkLGtCQUFrQjtRQUNsQixzQkFBc0I7UUFDdEIsZUFBZTtRQUNmLHdCQUF3QjtRQUN4QixpQkFBaUI7bUhBT1IscUJBQXFCLGFBTHJCO1FBQ1Qsb0JBQW9CLENBQUMsY0FBYyxDQUFDO1FBQ3BDLDJCQUEyQixDQUFDLHVCQUF1QixDQUFDO0tBQ3JELFlBYkMsWUFBWTtRQUNaLGNBQWM7UUFDZCxpQkFBaUI7UUFDakIsY0FBYztRQUNkLGtCQUFrQjtRQUNsQixzQkFBc0I7UUFDdEIsZUFBZTtRQUNmLHdCQUF3QjtRQUN4QixpQkFBaUI7MkZBT1IscUJBQXFCO2tCQWpCakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixjQUFjO3dCQUNkLGlCQUFpQjt3QkFDakIsY0FBYzt3QkFDZCxrQkFBa0I7d0JBQ2xCLHNCQUFzQjt3QkFDdEIsZUFBZTt3QkFDZix3QkFBd0I7d0JBQ3hCLGlCQUFpQjtxQkFDbEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLGNBQWMsQ0FBQzt3QkFDcEMsMkJBQTJCLENBQUMsdUJBQXVCLENBQUM7cUJBQ3JEO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5LFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgVW5pdERldGFpbHNNb2R1bGUgfSBmcm9tICcuL2RldGFpbHMvdW5pdC1kZXRhaWxzLm1vZHVsZSc7XG5pbXBvcnQgeyBVbml0Rm9ybU1vZHVsZSB9IGZyb20gJy4vZm9ybS91bml0LWZvcm0ubW9kdWxlJztcbmltcG9ydCB7IFVuaXRBZGRyZXNzTW9kdWxlIH0gZnJvbSAnLi9saW5rcy9hZGRyZXNzZXMvdW5pdC1hZGRyZXNzLm1vZHVsZSc7XG5pbXBvcnQgeyBVbml0QXBwcm92ZXJMaXN0TW9kdWxlIH0gZnJvbSAnLi9saW5rcy9hcHByb3ZlcnMvdW5pdC1hcHByb3Zlci1saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBVbml0Q2hpbGRyZW5Nb2R1bGUgfSBmcm9tICcuL2xpbmtzL2NoaWxkcmVuL3VuaXQtY2hpbGRyZW4ubW9kdWxlJztcbmltcG9ydCB7IFVuaXRDb3N0Q2VudGVyTGlzdE1vZHVsZSB9IGZyb20gJy4vbGlua3MvY29zdC1jZW50ZXJzL3VuaXQtY29zdC1jZW50ZXJzLm1vZHVsZSc7XG5pbXBvcnQgeyBVbml0VXNlcnNNb2R1bGUgfSBmcm9tICcuL2xpbmtzL3VzZXJzL3VuaXQtdXNlci1saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBVbml0TGlzdE1vZHVsZSB9IGZyb20gJy4vbGlzdC91bml0LWxpc3QubW9kdWxlJztcbmltcG9ydCB7IHVuaXRzQ21zQ29uZmlnLCB1bml0c1RhYmxlQ29uZmlnRmFjdG9yeSB9IGZyb20gJy4vdW5pdHMuY29uZmlnJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVbml0TGlzdE1vZHVsZSxcbiAgICBVbml0RGV0YWlsc01vZHVsZSxcbiAgICBVbml0Rm9ybU1vZHVsZSxcbiAgICBVbml0Q2hpbGRyZW5Nb2R1bGUsXG4gICAgVW5pdEFwcHJvdmVyTGlzdE1vZHVsZSxcbiAgICBVbml0VXNlcnNNb2R1bGUsXG4gICAgVW5pdENvc3RDZW50ZXJMaXN0TW9kdWxlLFxuICAgIFVuaXRBZGRyZXNzTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyh1bml0c0Ntc0NvbmZpZyksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KHVuaXRzVGFibGVDb25maWdGYWN0b3J5KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdHNDb21wb25lbnRzTW9kdWxlIHt9XG4iXX0=