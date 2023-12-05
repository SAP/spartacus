/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfigModule, I18nModule } from '@spartacus/core';
import { IconModule } from '../../../misc/icon/icon.module';
import { ActiveFacetsModule } from './active-facets/active-facets.module';
import { FacetListModule } from './facet-list/facet-list.module';
import { ProductFacetNavigationComponent } from './product-facet-navigation.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class ProductFacetNavigationModule {
}
ProductFacetNavigationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductFacetNavigationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductFacetNavigationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductFacetNavigationModule, declarations: [ProductFacetNavigationComponent], imports: [CommonModule,
        FacetListModule,
        ActiveFacetsModule,
        IconModule,
        I18nModule, i1.ConfigModule], exports: [ProductFacetNavigationComponent] });
ProductFacetNavigationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductFacetNavigationModule, imports: [CommonModule,
        FacetListModule,
        ActiveFacetsModule,
        IconModule,
        I18nModule,
        ConfigModule.withConfig({
            cmsComponents: {
                ProductRefinementComponent: {
                    component: ProductFacetNavigationComponent,
                },
            },
        })] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductFacetNavigationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FacetListModule,
                        ActiveFacetsModule,
                        IconModule,
                        I18nModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                ProductRefinementComponent: {
                                    component: ProductFacetNavigationComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ProductFacetNavigationComponent],
                    exports: [ProductFacetNavigationComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1mYWNldC1uYXZpZ2F0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvcHJvZHVjdC9wcm9kdWN0LWxpc3QvcHJvZHVjdC1mYWNldC1uYXZpZ2F0aW9uL3Byb2R1Y3QtZmFjZXQtbmF2aWdhdGlvbi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBYSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7O0FBbUJ2RixNQUFNLE9BQU8sNEJBQTRCOzt5SEFBNUIsNEJBQTRCOzBIQUE1Qiw0QkFBNEIsaUJBSHhCLCtCQUErQixhQWI1QyxZQUFZO1FBQ1osZUFBZTtRQUNmLGtCQUFrQjtRQUNsQixVQUFVO1FBQ1YsVUFBVSw4QkFVRiwrQkFBK0I7MEhBRTlCLDRCQUE0QixZQWhCckMsWUFBWTtRQUNaLGVBQWU7UUFDZixrQkFBa0I7UUFDbEIsVUFBVTtRQUNWLFVBQVU7UUFDVixZQUFZLENBQUMsVUFBVSxDQUFZO1lBQ2pDLGFBQWEsRUFBRTtnQkFDYiwwQkFBMEIsRUFBRTtvQkFDMUIsU0FBUyxFQUFFLCtCQUErQjtpQkFDM0M7YUFDRjtTQUNGLENBQUM7MkZBS08sNEJBQTRCO2tCQWxCeEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixlQUFlO3dCQUNmLGtCQUFrQjt3QkFDbEIsVUFBVTt3QkFDVixVQUFVO3dCQUNWLFlBQVksQ0FBQyxVQUFVLENBQVk7NEJBQ2pDLGFBQWEsRUFBRTtnQ0FDYiwwQkFBMEIsRUFBRTtvQ0FDMUIsU0FBUyxFQUFFLCtCQUErQjtpQ0FDM0M7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztvQkFDL0MsT0FBTyxFQUFFLENBQUMsK0JBQStCLENBQUM7aUJBQzNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbXNDb25maWcsIENvbmZpZ01vZHVsZSwgSTE4bk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBJY29uTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vbWlzYy9pY29uL2ljb24ubW9kdWxlJztcbmltcG9ydCB7IEFjdGl2ZUZhY2V0c01vZHVsZSB9IGZyb20gJy4vYWN0aXZlLWZhY2V0cy9hY3RpdmUtZmFjZXRzLm1vZHVsZSc7XG5pbXBvcnQgeyBGYWNldExpc3RNb2R1bGUgfSBmcm9tICcuL2ZhY2V0LWxpc3QvZmFjZXQtbGlzdC5tb2R1bGUnO1xuaW1wb3J0IHsgUHJvZHVjdEZhY2V0TmF2aWdhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vcHJvZHVjdC1mYWNldC1uYXZpZ2F0aW9uLmNvbXBvbmVudCc7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZhY2V0TGlzdE1vZHVsZSxcbiAgICBBY3RpdmVGYWNldHNNb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIENvbmZpZ01vZHVsZS53aXRoQ29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBQcm9kdWN0UmVmaW5lbWVudENvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogUHJvZHVjdEZhY2V0TmF2aWdhdGlvbkNvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1Byb2R1Y3RGYWNldE5hdmlnYXRpb25Db21wb25lbnRdLFxuICBleHBvcnRzOiBbUHJvZHVjdEZhY2V0TmF2aWdhdGlvbkNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RGYWNldE5hdmlnYXRpb25Nb2R1bGUge31cbiJdfQ==