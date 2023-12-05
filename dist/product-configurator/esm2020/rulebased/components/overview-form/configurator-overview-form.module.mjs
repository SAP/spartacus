/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorOverviewAttributeModule } from '../overview-attribute/configurator-overview-attribute.module';
import { ConfiguratorOverviewBundleAttributeModule } from '../overview-bundle-attribute/configurator-overview-bundle-attribute.module';
import { ConfiguratorOverviewFormComponent } from './configurator-overview-form.component';
import * as i0 from "@angular/core";
export class ConfiguratorOverviewFormModule {
}
ConfiguratorOverviewFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFormModule, declarations: [ConfiguratorOverviewFormComponent], imports: [CommonModule,
        ConfiguratorOverviewAttributeModule,
        ConfiguratorOverviewBundleAttributeModule,
        I18nModule], exports: [ConfiguratorOverviewFormComponent] });
ConfiguratorOverviewFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorOverviewForm: {
                    component: ConfiguratorOverviewFormComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ConfiguratorOverviewAttributeModule,
        ConfiguratorOverviewBundleAttributeModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorOverviewAttributeModule,
                        ConfiguratorOverviewBundleAttributeModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorOverviewForm: {
                                    component: ConfiguratorOverviewFormComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorOverviewFormComponent],
                    exports: [ConfiguratorOverviewFormComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLW92ZXJ2aWV3LWZvcm0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL292ZXJ2aWV3LWZvcm0vY29uZmlndXJhdG9yLW92ZXJ2aWV3LWZvcm0ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sOERBQThELENBQUM7QUFDbkgsT0FBTyxFQUFFLHlDQUF5QyxFQUFFLE1BQU0sNEVBQTRFLENBQUM7QUFDdkksT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7O0FBcUIzRixNQUFNLE9BQU8sOEJBQThCOzsySEFBOUIsOEJBQThCOzRIQUE5Qiw4QkFBOEIsaUJBSDFCLGlDQUFpQyxhQWQ5QyxZQUFZO1FBQ1osbUNBQW1DO1FBQ25DLHlDQUF5QztRQUN6QyxVQUFVLGFBWUYsaUNBQWlDOzRIQUVoQyw4QkFBOEIsYUFaOUI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2Isd0JBQXdCLEVBQUU7b0JBQ3hCLFNBQVMsRUFBRSxpQ0FBaUM7aUJBQzdDO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFiQyxZQUFZO1FBQ1osbUNBQW1DO1FBQ25DLHlDQUF5QztRQUN6QyxVQUFVOzJGQWNELDhCQUE4QjtrQkFuQjFDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osbUNBQW1DO3dCQUNuQyx5Q0FBeUM7d0JBQ3pDLFVBQVU7cUJBQ1g7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2Isd0JBQXdCLEVBQUU7b0NBQ3hCLFNBQVMsRUFBRSxpQ0FBaUM7aUNBQzdDOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsaUNBQWlDLENBQUM7b0JBQ2pELE9BQU8sRUFBRSxDQUFDLGlDQUFpQyxDQUFDO2lCQUM3QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ21zQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JPdmVydmlld0F0dHJpYnV0ZU1vZHVsZSB9IGZyb20gJy4uL292ZXJ2aWV3LWF0dHJpYnV0ZS9jb25maWd1cmF0b3Itb3ZlcnZpZXctYXR0cmlidXRlLm1vZHVsZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JPdmVydmlld0J1bmRsZUF0dHJpYnV0ZU1vZHVsZSB9IGZyb20gJy4uL292ZXJ2aWV3LWJ1bmRsZS1hdHRyaWJ1dGUvY29uZmlndXJhdG9yLW92ZXJ2aWV3LWJ1bmRsZS1hdHRyaWJ1dGUubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvck92ZXJ2aWV3Rm9ybUNvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJhdG9yLW92ZXJ2aWV3LWZvcm0uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JPdmVydmlld0F0dHJpYnV0ZU1vZHVsZSxcbiAgICBDb25maWd1cmF0b3JPdmVydmlld0J1bmRsZUF0dHJpYnV0ZU1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQ29uZmlndXJhdG9yT3ZlcnZpZXdGb3JtOiB7XG4gICAgICAgICAgY29tcG9uZW50OiBDb25maWd1cmF0b3JPdmVydmlld0Zvcm1Db21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JPdmVydmlld0Zvcm1Db21wb25lbnRdLFxuICBleHBvcnRzOiBbQ29uZmlndXJhdG9yT3ZlcnZpZXdGb3JtQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yT3ZlcnZpZXdGb3JtTW9kdWxlIHt9XG4iXX0=