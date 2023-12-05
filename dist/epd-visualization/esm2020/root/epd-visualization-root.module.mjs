/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideConfigValidator, provideDefaultConfigFactory, } from '@spartacus/core';
import { epdVisualizationConfigValidator } from './config';
import { getEpdVisualizationDefaultConfig } from './config/epd-visualization-default-config';
import { EPD_VISUALIZATION_FEATURE } from './feature-name';
import * as i0 from "@angular/core";
export function defaultEpdVisualizationComponentsConfig() {
    const config = {
        featureModules: {
            [EPD_VISUALIZATION_FEATURE]: {
                cmsComponents: ['VisualPickingTabComponent'],
            },
        },
    };
    return config;
}
export class EpdVisualizationRootModule {
}
EpdVisualizationRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
EpdVisualizationRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationRootModule });
EpdVisualizationRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationRootModule, providers: [
        provideDefaultConfigFactory(defaultEpdVisualizationComponentsConfig),
        provideDefaultConfigFactory(getEpdVisualizationDefaultConfig),
        provideConfigValidator(epdVisualizationConfigValidator),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfigFactory(defaultEpdVisualizationComponentsConfig),
                        provideDefaultConfigFactory(getEpdVisualizationDefaultConfig),
                        provideConfigValidator(epdVisualizationConfigValidator),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXBkLXZpc3VhbGl6YXRpb24tcm9vdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL3Jvb3QvZXBkLXZpc3VhbGl6YXRpb24tcm9vdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUVMLHNCQUFzQixFQUN0QiwyQkFBMkIsR0FDNUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDM0QsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDN0YsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBRTNELE1BQU0sVUFBVSx1Q0FBdUM7SUFDckQsTUFBTSxNQUFNLEdBQWM7UUFDeEIsY0FBYyxFQUFFO1lBQ2QsQ0FBQyx5QkFBeUIsQ0FBQyxFQUFFO2dCQUMzQixhQUFhLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQzthQUM3QztTQUNGO0tBQ0YsQ0FBQztJQUNGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFTRCxNQUFNLE9BQU8sMEJBQTBCOzt1SEFBMUIsMEJBQTBCO3dIQUExQiwwQkFBMEI7d0hBQTFCLDBCQUEwQixhQU4xQjtRQUNULDJCQUEyQixDQUFDLHVDQUF1QyxDQUFDO1FBQ3BFLDJCQUEyQixDQUFDLGdDQUFnQyxDQUFDO1FBQzdELHNCQUFzQixDQUFDLCtCQUErQixDQUFDO0tBQ3hEOzJGQUVVLDBCQUEwQjtrQkFQdEMsUUFBUTttQkFBQztvQkFDUixTQUFTLEVBQUU7d0JBQ1QsMkJBQTJCLENBQUMsdUNBQXVDLENBQUM7d0JBQ3BFLDJCQUEyQixDQUFDLGdDQUFnQyxDQUFDO3dCQUM3RCxzQkFBc0IsQ0FBQywrQkFBK0IsQ0FBQztxQkFDeEQ7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBwcm92aWRlQ29uZmlnVmFsaWRhdG9yLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnksXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBlcGRWaXN1YWxpemF0aW9uQ29uZmlnVmFsaWRhdG9yIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgZ2V0RXBkVmlzdWFsaXphdGlvbkRlZmF1bHRDb25maWcgfSBmcm9tICcuL2NvbmZpZy9lcGQtdmlzdWFsaXphdGlvbi1kZWZhdWx0LWNvbmZpZyc7XG5pbXBvcnQgeyBFUERfVklTVUFMSVpBVElPTl9GRUFUVVJFIH0gZnJvbSAnLi9mZWF0dXJlLW5hbWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdEVwZFZpc3VhbGl6YXRpb25Db21wb25lbnRzQ29uZmlnKCk6IENtc0NvbmZpZyB7XG4gIGNvbnN0IGNvbmZpZzogQ21zQ29uZmlnID0ge1xuICAgIGZlYXR1cmVNb2R1bGVzOiB7XG4gICAgICBbRVBEX1ZJU1VBTElaQVRJT05fRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50czogWydWaXN1YWxQaWNraW5nVGFiQ29tcG9uZW50J10sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG4gIHJldHVybiBjb25maWc7XG59XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeShkZWZhdWx0RXBkVmlzdWFsaXphdGlvbkNvbXBvbmVudHNDb25maWcpLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeShnZXRFcGRWaXN1YWxpemF0aW9uRGVmYXVsdENvbmZpZyksXG4gICAgcHJvdmlkZUNvbmZpZ1ZhbGlkYXRvcihlcGRWaXN1YWxpemF0aW9uQ29uZmlnVmFsaWRhdG9yKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRXBkVmlzdWFsaXphdGlvblJvb3RNb2R1bGUge31cbiJdfQ==