/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { VisualViewerModule } from '../../visual-viewer/visual-viewer.module';
import { VisualPickingProductFilterModule } from './product-filter/visual-picking-product-filter.module';
import { VisualPickingProductListModule } from './product-list/visual-picking-product-list.module';
import { VisualPickingTabComponent } from './visual-picking-tab.component';
import * as i0 from "@angular/core";
export class VisualPickingTabModule {
}
VisualPickingTabModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VisualPickingTabModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabModule, declarations: [VisualPickingTabComponent], imports: [CommonModule,
        RouterModule,
        I18nModule,
        VisualViewerModule,
        VisualPickingProductListModule,
        VisualPickingProductFilterModule], exports: [VisualPickingTabComponent] });
VisualPickingTabModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                VisualPickingTabComponent: {
                    component: VisualPickingTabComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        I18nModule,
        VisualViewerModule,
        VisualPickingProductListModule,
        VisualPickingProductFilterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingTabModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        I18nModule,
                        VisualViewerModule,
                        VisualPickingProductListModule,
                        VisualPickingProductFilterModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                VisualPickingTabComponent: {
                                    component: VisualPickingTabComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [VisualPickingTabComponent],
                    exports: [VisualPickingTabComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXBpY2tpbmctdGFiLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvZXBkLXZpc3VhbGl6YXRpb24vY29tcG9uZW50cy92aXN1YWwtcGlja2luZy92aXN1YWwtcGlja2luZy10YWIvdmlzdWFsLXBpY2tpbmctdGFiLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBYSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUN6RyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUNuRyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUF1QjNFLE1BQU0sT0FBTyxzQkFBc0I7O21IQUF0QixzQkFBc0I7b0hBQXRCLHNCQUFzQixpQkFIbEIseUJBQXlCLGFBaEJ0QyxZQUFZO1FBQ1osWUFBWTtRQUNaLFVBQVU7UUFDVixrQkFBa0I7UUFDbEIsOEJBQThCO1FBQzlCLGdDQUFnQyxhQVl4Qix5QkFBeUI7b0hBRXhCLHNCQUFzQixhQVp0QjtRQUNULG9CQUFvQixDQUFDO1lBQ25CLGFBQWEsRUFBRTtnQkFDYix5QkFBeUIsRUFBRTtvQkFDekIsU0FBUyxFQUFFLHlCQUF5QjtpQkFDckM7YUFDRjtTQUNXLENBQUM7S0FDaEIsWUFmQyxZQUFZO1FBQ1osWUFBWTtRQUNaLFVBQVU7UUFDVixrQkFBa0I7UUFDbEIsOEJBQThCO1FBQzlCLGdDQUFnQzsyRkFjdkIsc0JBQXNCO2tCQXJCbEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFVBQVU7d0JBQ1Ysa0JBQWtCO3dCQUNsQiw4QkFBOEI7d0JBQzlCLGdDQUFnQztxQkFDakM7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDOzRCQUNuQixhQUFhLEVBQUU7Z0NBQ2IseUJBQXlCLEVBQUU7b0NBQ3pCLFNBQVMsRUFBRSx5QkFBeUI7aUNBQ3JDOzZCQUNGO3lCQUNXLENBQUM7cUJBQ2hCO29CQUNELFlBQVksRUFBRSxDQUFDLHlCQUF5QixDQUFDO29CQUN6QyxPQUFPLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztpQkFDckMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDbXNDb25maWcsIEkxOG5Nb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFZpc3VhbFZpZXdlck1vZHVsZSB9IGZyb20gJy4uLy4uL3Zpc3VhbC12aWV3ZXIvdmlzdWFsLXZpZXdlci5tb2R1bGUnO1xuaW1wb3J0IHsgVmlzdWFsUGlja2luZ1Byb2R1Y3RGaWx0ZXJNb2R1bGUgfSBmcm9tICcuL3Byb2R1Y3QtZmlsdGVyL3Zpc3VhbC1waWNraW5nLXByb2R1Y3QtZmlsdGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBWaXN1YWxQaWNraW5nUHJvZHVjdExpc3RNb2R1bGUgfSBmcm9tICcuL3Byb2R1Y3QtbGlzdC92aXN1YWwtcGlja2luZy1wcm9kdWN0LWxpc3QubW9kdWxlJztcbmltcG9ydCB7IFZpc3VhbFBpY2tpbmdUYWJDb21wb25lbnQgfSBmcm9tICcuL3Zpc3VhbC1waWNraW5nLXRhYi5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFZpc3VhbFZpZXdlck1vZHVsZSxcbiAgICBWaXN1YWxQaWNraW5nUHJvZHVjdExpc3RNb2R1bGUsXG4gICAgVmlzdWFsUGlja2luZ1Byb2R1Y3RGaWx0ZXJNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKHtcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgVmlzdWFsUGlja2luZ1RhYkNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogVmlzdWFsUGlja2luZ1RhYkNvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSBhcyBDbXNDb25maWcpLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtWaXN1YWxQaWNraW5nVGFiQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1Zpc3VhbFBpY2tpbmdUYWJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBWaXN1YWxQaWNraW5nVGFiTW9kdWxlIHt9XG4iXX0=