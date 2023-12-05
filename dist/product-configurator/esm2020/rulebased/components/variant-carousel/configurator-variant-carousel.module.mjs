/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { CarouselModule, ProductCarouselModule } from '@spartacus/storefront';
import { ConfiguratorVariantCarouselComponent } from './configurator-variant-carousel.component';
import * as i0 from "@angular/core";
export class ConfiguratorVariantCarouselModule {
}
ConfiguratorVariantCarouselModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantCarouselModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorVariantCarouselModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantCarouselModule, declarations: [ConfiguratorVariantCarouselComponent], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        CarouselModule,
        ProductCarouselModule], exports: [ConfiguratorVariantCarouselComponent] });
ConfiguratorVariantCarouselModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantCarouselModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorVariantCarousel: {
                    component: ConfiguratorVariantCarouselComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        CarouselModule,
        ProductCarouselModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantCarouselModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        CarouselModule,
                        ProductCarouselModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorVariantCarousel: {
                                    component: ConfiguratorVariantCarouselComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorVariantCarouselComponent],
                    exports: [ConfiguratorVariantCarouselComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXZhcmlhbnQtY2Fyb3VzZWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL3ZhcmlhbnQtY2Fyb3VzZWwvY29uZmlndXJhdG9yLXZhcmlhbnQtY2Fyb3VzZWwubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFhLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7QUF1QmpHLE1BQU0sT0FBTyxpQ0FBaUM7OzhIQUFqQyxpQ0FBaUM7K0hBQWpDLGlDQUFpQyxpQkFIN0Isb0NBQW9DLGFBaEJqRCxXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixVQUFVO1FBQ1YsY0FBYztRQUNkLHFCQUFxQixhQVliLG9DQUFvQzsrSEFFbkMsaUNBQWlDLGFBWmpDO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLDJCQUEyQixFQUFFO29CQUMzQixTQUFTLEVBQUUsb0NBQW9DO2lCQUNoRDthQUNGO1NBQ0YsQ0FBQztLQUNILFlBZkMsV0FBVztRQUNYLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osVUFBVTtRQUNWLGNBQWM7UUFDZCxxQkFBcUI7MkZBY1osaUNBQWlDO2tCQXJCN0MsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixjQUFjO3dCQUNkLHFCQUFxQjtxQkFDdEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFZOzRCQUM5QixhQUFhLEVBQUU7Z0NBQ2IsMkJBQTJCLEVBQUU7b0NBQzNCLFNBQVMsRUFBRSxvQ0FBb0M7aUNBQ2hEOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsb0NBQW9DLENBQUM7b0JBQ3BELE9BQU8sRUFBRSxDQUFDLG9DQUFvQyxDQUFDO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDbXNDb25maWcsIEkxOG5Nb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENhcm91c2VsTW9kdWxlLCBQcm9kdWN0Q2Fyb3VzZWxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yVmFyaWFudENhcm91c2VsQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3ItdmFyaWFudC1jYXJvdXNlbC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBDYXJvdXNlbE1vZHVsZSxcbiAgICBQcm9kdWN0Q2Fyb3VzZWxNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDb25maWd1cmF0b3JWYXJpYW50Q2Fyb3VzZWw6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENvbmZpZ3VyYXRvclZhcmlhbnRDYXJvdXNlbENvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvclZhcmlhbnRDYXJvdXNlbENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JWYXJpYW50Q2Fyb3VzZWxDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0b3JWYXJpYW50Q2Fyb3VzZWxNb2R1bGUge31cbiJdfQ==