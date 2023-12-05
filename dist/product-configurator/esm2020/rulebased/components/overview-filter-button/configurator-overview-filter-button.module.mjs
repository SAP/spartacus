/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorOverviewFilterBarModule } from '../overview-filter-bar/configurator-overview-filter-bar.module';
import { ConfiguratorOverviewFilterButtonComponent } from './configurator-overview-filter-button.component';
import * as i0 from "@angular/core";
export class ConfiguratorOverviewFilterButtonModule {
}
ConfiguratorOverviewFilterButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewFilterButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterButtonModule, declarations: [ConfiguratorOverviewFilterButtonComponent], imports: [CommonModule, I18nModule, ConfiguratorOverviewFilterBarModule], exports: [ConfiguratorOverviewFilterButtonComponent] });
ConfiguratorOverviewFilterButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterButtonModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorOverviewFilterButton: {
                    component: ConfiguratorOverviewFilterButtonComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, ConfiguratorOverviewFilterBarModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, ConfiguratorOverviewFilterBarModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorOverviewFilterButton: {
                                    component: ConfiguratorOverviewFilterButtonComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorOverviewFilterButtonComponent],
                    exports: [ConfiguratorOverviewFilterButtonComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLW92ZXJ2aWV3LWZpbHRlci1idXR0b24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL292ZXJ2aWV3LWZpbHRlci1idXR0b24vY29uZmlndXJhdG9yLW92ZXJ2aWV3LWZpbHRlci1idXR0b24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sZ0VBQWdFLENBQUM7QUFDckgsT0FBTyxFQUFFLHlDQUF5QyxFQUFFLE1BQU0saURBQWlELENBQUM7O0FBZ0I1RyxNQUFNLE9BQU8sc0NBQXNDOzttSUFBdEMsc0NBQXNDO29JQUF0QyxzQ0FBc0MsaUJBSGxDLHlDQUF5QyxhQVY5QyxZQUFZLEVBQUUsVUFBVSxFQUFFLG1DQUFtQyxhQVc3RCx5Q0FBeUM7b0lBRXhDLHNDQUFzQyxhQVp0QztRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixnQ0FBZ0MsRUFBRTtvQkFDaEMsU0FBUyxFQUFFLHlDQUF5QztpQkFDckQ7YUFDRjtTQUNGLENBQUM7S0FDSCxZQVRTLFlBQVksRUFBRSxVQUFVLEVBQUUsbUNBQW1DOzJGQWE1RCxzQ0FBc0M7a0JBZGxELFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxtQ0FBbUMsQ0FBQztvQkFDeEUsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsZ0NBQWdDLEVBQUU7b0NBQ2hDLFNBQVMsRUFBRSx5Q0FBeUM7aUNBQ3JEOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMseUNBQXlDLENBQUM7b0JBQ3pELE9BQU8sRUFBRSxDQUFDLHlDQUF5QyxDQUFDO2lCQUNyRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlckJhck1vZHVsZSB9IGZyb20gJy4uL292ZXJ2aWV3LWZpbHRlci1iYXIvY29uZmlndXJhdG9yLW92ZXJ2aWV3LWZpbHRlci1iYXIubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvck92ZXJ2aWV3RmlsdGVyQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3Itb3ZlcnZpZXctZmlsdGVyLWJ1dHRvbi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJMThuTW9kdWxlLCBDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlckJhck1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlckJ1dHRvbjoge1xuICAgICAgICAgIGNvbXBvbmVudDogQ29uZmlndXJhdG9yT3ZlcnZpZXdGaWx0ZXJCdXR0b25Db21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlckJ1dHRvbkNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JPdmVydmlld0ZpbHRlckJ1dHRvbkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvck92ZXJ2aWV3RmlsdGVyQnV0dG9uTW9kdWxlIHt9XG4iXX0=