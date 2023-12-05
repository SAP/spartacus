/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { PageComponentModule } from '../../../../cms-structure';
import { CarouselModule, MediaModule, } from '../../../../shared/components/index';
import { ProductCarouselComponent } from './product-carousel.component';
import { ProductCarouselItemComponent } from '../product-carousel-item/product-carousel-item.component';
import * as i0 from "@angular/core";
export class ProductCarouselModule {
}
ProductCarouselModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductCarouselModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductCarouselModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductCarouselModule, declarations: [ProductCarouselComponent, ProductCarouselItemComponent], imports: [CommonModule,
        CarouselModule,
        MediaModule,
        RouterModule,
        UrlModule,
        I18nModule,
        PageComponentModule], exports: [ProductCarouselComponent, ProductCarouselItemComponent] });
ProductCarouselModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductCarouselModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ProductCarouselComponent: {
                    component: ProductCarouselComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        CarouselModule,
        MediaModule,
        RouterModule,
        UrlModule,
        I18nModule,
        PageComponentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductCarouselModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CarouselModule,
                        MediaModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        PageComponentModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ProductCarouselComponent: {
                                    component: ProductCarouselComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ProductCarouselComponent, ProductCarouselItemComponent],
                    exports: [ProductCarouselComponent, ProductCarouselItemComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1jYXJvdXNlbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL3Byb2R1Y3QvY2Fyb3VzZWwvcHJvZHVjdC1jYXJvdXNlbC9wcm9kdWN0LWNhcm91c2VsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFFTCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2hFLE9BQU8sRUFDTCxjQUFjLEVBQ2QsV0FBVyxHQUNaLE1BQU0scUNBQXFDLENBQUM7QUFDN0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMERBQTBELENBQUM7O0FBd0J4RyxNQUFNLE9BQU8scUJBQXFCOztrSEFBckIscUJBQXFCO21IQUFyQixxQkFBcUIsaUJBSGpCLHdCQUF3QixFQUFFLDRCQUE0QixhQWpCbkUsWUFBWTtRQUNaLGNBQWM7UUFDZCxXQUFXO1FBQ1gsWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsbUJBQW1CLGFBWVgsd0JBQXdCLEVBQUUsNEJBQTRCO21IQUVyRCxxQkFBcUIsYUFackI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2Isd0JBQXdCLEVBQUU7b0JBQ3hCLFNBQVMsRUFBRSx3QkFBd0I7aUJBQ3BDO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFoQkMsWUFBWTtRQUNaLGNBQWM7UUFDZCxXQUFXO1FBQ1gsWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsbUJBQW1COzJGQWNWLHFCQUFxQjtrQkF0QmpDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osY0FBYzt3QkFDZCxXQUFXO3dCQUNYLFlBQVk7d0JBQ1osU0FBUzt3QkFDVCxVQUFVO3dCQUNWLG1CQUFtQjtxQkFDcEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2Isd0JBQXdCLEVBQUU7b0NBQ3hCLFNBQVMsRUFBRSx3QkFBd0I7aUNBQ3BDOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsd0JBQXdCLEVBQUUsNEJBQTRCLENBQUM7b0JBQ3RFLE9BQU8sRUFBRSxDQUFDLHdCQUF3QixFQUFFLDRCQUE0QixDQUFDO2lCQUNsRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIENtc0NvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFBhZ2VDb21wb25lbnRNb2R1bGUgfSBmcm9tICcuLi8uLi8uLi8uLi9jbXMtc3RydWN0dXJlJztcbmltcG9ydCB7XG4gIENhcm91c2VsTW9kdWxlLFxuICBNZWRpYU1vZHVsZSxcbn0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2NvbXBvbmVudHMvaW5kZXgnO1xuaW1wb3J0IHsgUHJvZHVjdENhcm91c2VsQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9kdWN0LWNhcm91c2VsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9kdWN0Q2Fyb3VzZWxJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi4vcHJvZHVjdC1jYXJvdXNlbC1pdGVtL3Byb2R1Y3QtY2Fyb3VzZWwtaXRlbS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENhcm91c2VsTW9kdWxlLFxuICAgIE1lZGlhTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBQYWdlQ29tcG9uZW50TW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgUHJvZHVjdENhcm91c2VsQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBQcm9kdWN0Q2Fyb3VzZWxDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQcm9kdWN0Q2Fyb3VzZWxDb21wb25lbnQsIFByb2R1Y3RDYXJvdXNlbEl0ZW1Db21wb25lbnRdLFxuICBleHBvcnRzOiBbUHJvZHVjdENhcm91c2VsQ29tcG9uZW50LCBQcm9kdWN0Q2Fyb3VzZWxJdGVtQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdENhcm91c2VsTW9kdWxlIHt9XG4iXX0=