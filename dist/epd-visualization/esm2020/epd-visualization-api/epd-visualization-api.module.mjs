/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { SceneAdapter, VisualizationAdapter, } from '@spartacus/epd-visualization/core';
import { StorageV1Adapter } from './adapters/storage-v1/storage-v1.adapter';
import { VisualizationV1Adapter } from './adapters/visualization-v1/visualization-v1.adapter';
import * as i0 from "@angular/core";
export class EpdVisualizationApiModule {
}
EpdVisualizationApiModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationApiModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
EpdVisualizationApiModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationApiModule });
EpdVisualizationApiModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationApiModule, providers: [
        { provide: SceneAdapter, useClass: StorageV1Adapter },
        { provide: VisualizationAdapter, useClass: VisualizationV1Adapter },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: EpdVisualizationApiModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        { provide: SceneAdapter, useClass: StorageV1Adapter },
                        { provide: VisualizationAdapter, useClass: VisualizationV1Adapter },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXBkLXZpc3VhbGl6YXRpb24tYXBpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvZXBkLXZpc3VhbGl6YXRpb24vZXBkLXZpc3VhbGl6YXRpb24tYXBpL2VwZC12aXN1YWxpemF0aW9uLWFwaS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNMLFlBQVksRUFDWixvQkFBb0IsR0FDckIsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzREFBc0QsQ0FBQzs7QUFROUYsTUFBTSxPQUFPLHlCQUF5Qjs7c0hBQXpCLHlCQUF5Qjt1SEFBekIseUJBQXlCO3VIQUF6Qix5QkFBeUIsYUFMekI7UUFDVCxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFO1FBQ3JELEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTtLQUNwRTsyRkFFVSx5QkFBeUI7a0JBTnJDLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUU7d0JBQ3JELEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTtxQkFDcEU7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgU2NlbmVBZGFwdGVyLFxuICBWaXN1YWxpemF0aW9uQWRhcHRlcixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9lcGQtdmlzdWFsaXphdGlvbi9jb3JlJztcbmltcG9ydCB7IFN0b3JhZ2VWMUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL3N0b3JhZ2UtdjEvc3RvcmFnZS12MS5hZGFwdGVyJztcbmltcG9ydCB7IFZpc3VhbGl6YXRpb25WMUFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL3Zpc3VhbGl6YXRpb24tdjEvdmlzdWFsaXphdGlvbi12MS5hZGFwdGVyJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBTY2VuZUFkYXB0ZXIsIHVzZUNsYXNzOiBTdG9yYWdlVjFBZGFwdGVyIH0sXG4gICAgeyBwcm92aWRlOiBWaXN1YWxpemF0aW9uQWRhcHRlciwgdXNlQ2xhc3M6IFZpc3VhbGl6YXRpb25WMUFkYXB0ZXIgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRXBkVmlzdWFsaXphdGlvbkFwaU1vZHVsZSB7fVxuIl19