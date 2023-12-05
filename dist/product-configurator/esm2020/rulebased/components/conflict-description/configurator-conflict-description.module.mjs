/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorConflictDescriptionComponent } from './configurator-conflict-description.component';
import * as i0 from "@angular/core";
export class ConfiguratorConflictDescriptionModule {
}
ConfiguratorConflictDescriptionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictDescriptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorConflictDescriptionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictDescriptionModule, declarations: [ConfiguratorConflictDescriptionComponent], imports: [CommonModule, IconModule], exports: [ConfiguratorConflictDescriptionComponent] });
ConfiguratorConflictDescriptionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictDescriptionModule, imports: [CommonModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictDescriptionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, IconModule],
                    declarations: [ConfiguratorConflictDescriptionComponent],
                    exports: [ConfiguratorConflictDescriptionComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWNvbmZsaWN0LWRlc2NyaXB0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9jb25mbGljdC1kZXNjcmlwdGlvbi9jb25maWd1cmF0b3ItY29uZmxpY3QtZGVzY3JpcHRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sK0NBQStDLENBQUM7O0FBT3pHLE1BQU0sT0FBTyxxQ0FBcUM7O2tJQUFyQyxxQ0FBcUM7bUlBQXJDLHFDQUFxQyxpQkFIakMsd0NBQXdDLGFBRDdDLFlBQVksRUFBRSxVQUFVLGFBRXhCLHdDQUF3QzttSUFFdkMscUNBQXFDLFlBSnRDLFlBQVksRUFBRSxVQUFVOzJGQUl2QixxQ0FBcUM7a0JBTGpELFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQztvQkFDbkMsWUFBWSxFQUFFLENBQUMsd0NBQXdDLENBQUM7b0JBQ3hELE9BQU8sRUFBRSxDQUFDLHdDQUF3QyxDQUFDO2lCQUNwRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSWNvbk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JDb25mbGljdERlc2NyaXB0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItY29uZmxpY3QtZGVzY3JpcHRpb24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSWNvbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvckNvbmZsaWN0RGVzY3JpcHRpb25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbQ29uZmlndXJhdG9yQ29uZmxpY3REZXNjcmlwdGlvbkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckNvbmZsaWN0RGVzY3JpcHRpb25Nb2R1bGUge31cbiJdfQ==