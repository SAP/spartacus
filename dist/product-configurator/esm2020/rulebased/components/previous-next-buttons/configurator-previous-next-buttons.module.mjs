/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorPreviousNextButtonsComponent } from './configurator-previous-next-buttons.component';
import * as i0 from "@angular/core";
export class ConfiguratorPreviousNextButtonsModule {
}
ConfiguratorPreviousNextButtonsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPreviousNextButtonsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorPreviousNextButtonsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPreviousNextButtonsModule, declarations: [ConfiguratorPreviousNextButtonsComponent], imports: [CommonModule, I18nModule, KeyboardFocusModule], exports: [ConfiguratorPreviousNextButtonsComponent] });
ConfiguratorPreviousNextButtonsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPreviousNextButtonsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorPrevNext: {
                    component: ConfiguratorPreviousNextButtonsComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPreviousNextButtonsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, KeyboardFocusModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorPrevNext: {
                                    component: ConfiguratorPreviousNextButtonsComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorPreviousNextButtonsComponent],
                    exports: [ConfiguratorPreviousNextButtonsComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXByZXZpb3VzLW5leHQtYnV0dG9ucy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvcHJldmlvdXMtbmV4dC1idXR0b25zL2NvbmZpZ3VyYXRvci1wcmV2aW91cy1uZXh0LWJ1dHRvbnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7O0FBZ0IxRyxNQUFNLE9BQU8scUNBQXFDOztrSUFBckMscUNBQXFDO21JQUFyQyxxQ0FBcUMsaUJBSGpDLHdDQUF3QyxhQVY3QyxZQUFZLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixhQVc3Qyx3Q0FBd0M7bUlBRXZDLHFDQUFxQyxhQVpyQztRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYixvQkFBb0IsRUFBRTtvQkFDcEIsU0FBUyxFQUFFLHdDQUF3QztpQkFDcEQ7YUFDRjtTQUNGLENBQUM7S0FDSCxZQVRTLFlBQVksRUFBRSxVQUFVLEVBQUUsbUJBQW1COzJGQWE1QyxxQ0FBcUM7a0JBZGpELFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQztvQkFDeEQsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2Isb0JBQW9CLEVBQUU7b0NBQ3BCLFNBQVMsRUFBRSx3Q0FBd0M7aUNBQ3BEOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsd0NBQXdDLENBQUM7b0JBQ3hELE9BQU8sRUFBRSxDQUFDLHdDQUF3QyxDQUFDO2lCQUNwRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBLZXlib2FyZEZvY3VzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclByZXZpb3VzTmV4dEJ1dHRvbnNDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1wcmV2aW91cy1uZXh0LWJ1dHRvbnMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgS2V5Ym9hcmRGb2N1c01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDb25maWd1cmF0b3JQcmV2TmV4dDoge1xuICAgICAgICAgIGNvbXBvbmVudDogQ29uZmlndXJhdG9yUHJldmlvdXNOZXh0QnV0dG9uc0NvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvclByZXZpb3VzTmV4dEJ1dHRvbnNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ29uZmlndXJhdG9yUHJldmlvdXNOZXh0QnV0dG9uc0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvclByZXZpb3VzTmV4dEJ1dHRvbnNNb2R1bGUge31cbiJdfQ==