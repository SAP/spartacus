/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { SceneConnector, VisualizationConnector } from './connectors';
import { SceneNodeToProductLookupService } from './services/scene-node-to-product-lookup/scene-node-to-product-lookup.service';
import { VisualizationLookupService } from './services/visualization-lookup/visualization-lookup.service';
import * as i0 from "@angular/core";
export class EpdVisualizationCoreModule {
}
EpdVisualizationCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
EpdVisualizationCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationCoreModule });
EpdVisualizationCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationCoreModule, providers: [
        SceneConnector,
        VisualizationConnector,
        SceneNodeToProductLookupService,
        VisualizationLookupService,
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        SceneConnector,
                        VisualizationConnector,
                        SceneNodeToProductLookupService,
                        VisualizationLookupService,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXBkLXZpc3VhbGl6YXRpb24tY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvcmUvZXBkLXZpc3VhbGl6YXRpb24tY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGNBQWMsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSw4RUFBOEUsQ0FBQztBQUMvSCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQzs7QUFVMUcsTUFBTSxPQUFPLDBCQUEwQjs7dUhBQTFCLDBCQUEwQjt3SEFBMUIsMEJBQTBCO3dIQUExQiwwQkFBMEIsYUFQMUI7UUFDVCxjQUFjO1FBQ2Qsc0JBQXNCO1FBQ3RCLCtCQUErQjtRQUMvQiwwQkFBMEI7S0FDM0I7MkZBRVUsMEJBQTBCO2tCQVJ0QyxRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxjQUFjO3dCQUNkLHNCQUFzQjt3QkFDdEIsK0JBQStCO3dCQUMvQiwwQkFBMEI7cUJBQzNCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjZW5lQ29ubmVjdG9yLCBWaXN1YWxpemF0aW9uQ29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzJztcbmltcG9ydCB7IFNjZW5lTm9kZVRvUHJvZHVjdExvb2t1cFNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3NjZW5lLW5vZGUtdG8tcHJvZHVjdC1sb29rdXAvc2NlbmUtbm9kZS10by1wcm9kdWN0LWxvb2t1cC5zZXJ2aWNlJztcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25Mb29rdXBTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy92aXN1YWxpemF0aW9uLWxvb2t1cC92aXN1YWxpemF0aW9uLWxvb2t1cC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgU2NlbmVDb25uZWN0b3IsXG4gICAgVmlzdWFsaXphdGlvbkNvbm5lY3RvcixcbiAgICBTY2VuZU5vZGVUb1Byb2R1Y3RMb29rdXBTZXJ2aWNlLFxuICAgIFZpc3VhbGl6YXRpb25Mb29rdXBTZXJ2aWNlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBFcGRWaXN1YWxpemF0aW9uQ29yZU1vZHVsZSB7fVxuIl19