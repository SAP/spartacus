/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { EpdVisualizationComponentsModule } from '@spartacus/epd-visualization/components';
import { EpdVisualizationCoreModule } from '@spartacus/epd-visualization/core';
import { EpdVisualizationApiModule } from '@spartacus/epd-visualization/epd-visualization-api';
import * as i0 from "@angular/core";
export class EpdVisualizationModule {
}
EpdVisualizationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
EpdVisualizationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationModule, imports: [EpdVisualizationComponentsModule,
        EpdVisualizationCoreModule,
        EpdVisualizationApiModule] });
EpdVisualizationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationModule, imports: [EpdVisualizationComponentsModule,
        EpdVisualizationCoreModule,
        EpdVisualizationApiModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        EpdVisualizationComponentsModule,
                        EpdVisualizationCoreModule,
                        EpdVisualizationApiModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXBkLXZpc3VhbGl6YXRpb24ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9lcGQtdmlzdWFsaXphdGlvbi9lcGQtdmlzdWFsaXphdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGdDQUFnQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDM0YsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDL0UsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sb0RBQW9ELENBQUM7O0FBUy9GLE1BQU0sT0FBTyxzQkFBc0I7O21IQUF0QixzQkFBc0I7b0hBQXRCLHNCQUFzQixZQUwvQixnQ0FBZ0M7UUFDaEMsMEJBQTBCO1FBQzFCLHlCQUF5QjtvSEFHaEIsc0JBQXNCLFlBTC9CLGdDQUFnQztRQUNoQywwQkFBMEI7UUFDMUIseUJBQXlCOzJGQUdoQixzQkFBc0I7a0JBUGxDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLGdDQUFnQzt3QkFDaEMsMEJBQTBCO3dCQUMxQix5QkFBeUI7cUJBQzFCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEVwZFZpc3VhbGl6YXRpb25Db21wb25lbnRzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9lcGQtdmlzdWFsaXphdGlvbi9jb21wb25lbnRzJztcbmltcG9ydCB7IEVwZFZpc3VhbGl6YXRpb25Db3JlTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9lcGQtdmlzdWFsaXphdGlvbi9jb3JlJztcbmltcG9ydCB7IEVwZFZpc3VhbGl6YXRpb25BcGlNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2VwZC12aXN1YWxpemF0aW9uL2VwZC12aXN1YWxpemF0aW9uLWFwaSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBFcGRWaXN1YWxpemF0aW9uQ29tcG9uZW50c01vZHVsZSxcbiAgICBFcGRWaXN1YWxpemF0aW9uQ29yZU1vZHVsZSxcbiAgICBFcGRWaXN1YWxpemF0aW9uQXBpTW9kdWxlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBFcGRWaXN1YWxpemF0aW9uTW9kdWxlIHt9XG4iXX0=