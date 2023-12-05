/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FutureStockAccordionComponent } from './future-stock-accordion.component';
import { IconModule } from '@spartacus/storefront';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import * as i0 from "@angular/core";
export class FutureStockAccordionModule {
}
FutureStockAccordionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockAccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FutureStockAccordionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FutureStockAccordionModule, declarations: [FutureStockAccordionComponent], imports: [CommonModule, I18nModule, IconModule], exports: [FutureStockAccordionComponent] });
FutureStockAccordionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockAccordionModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                FutureStockComponent: {
                    component: FutureStockAccordionComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockAccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, IconModule],
                    declarations: [FutureStockAccordionComponent],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                FutureStockComponent: {
                                    component: FutureStockAccordionComponent,
                                },
                            },
                        }),
                    ],
                    exports: [FutureStockAccordionComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnV0dXJlLXN0b2NrLWFjY29yZGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC9mdXR1cmUtc3RvY2svY29tcG9uZW50cy9mdXR1cmUtc3RvY2stYWNjb3JkaW9uL2Z1dHVyZS1zdG9jay1hY2NvcmRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNuRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFhLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQWdCOUUsTUFBTSxPQUFPLDBCQUEwQjs7dUhBQTFCLDBCQUEwQjt3SEFBMUIsMEJBQTBCLGlCQVp0Qiw2QkFBNkIsYUFEbEMsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLGFBV3BDLDZCQUE2Qjt3SEFFNUIsMEJBQTBCLGFBWDFCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLG9CQUFvQixFQUFFO29CQUNwQixTQUFTLEVBQUUsNkJBQTZCO2lCQUN6QzthQUNGO1NBQ0YsQ0FBQztLQUNILFlBVlMsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVOzJGQWFuQywwQkFBMEI7a0JBZHRDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUM7b0JBQy9DLFlBQVksRUFBRSxDQUFDLDZCQUE2QixDQUFDO29CQUM3QyxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixvQkFBb0IsRUFBRTtvQ0FDcEIsU0FBUyxFQUFFLDZCQUE2QjtpQ0FDekM7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxPQUFPLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztpQkFDekMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZ1dHVyZVN0b2NrQWNjb3JkaW9uQ29tcG9uZW50IH0gZnJvbSAnLi9mdXR1cmUtc3RvY2stYWNjb3JkaW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJY29uTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENtc0NvbmZpZywgSTE4bk1vZHVsZSwgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBJMThuTW9kdWxlLCBJY29uTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbRnV0dXJlU3RvY2tBY2NvcmRpb25Db21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgRnV0dXJlU3RvY2tDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IEZ1dHVyZVN0b2NrQWNjb3JkaW9uQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZXhwb3J0czogW0Z1dHVyZVN0b2NrQWNjb3JkaW9uQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgRnV0dXJlU3RvY2tBY2NvcmRpb25Nb2R1bGUge31cbiJdfQ==