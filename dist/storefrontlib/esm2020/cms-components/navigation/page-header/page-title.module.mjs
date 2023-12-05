/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageMetaModule, provideDefaultConfig, } from '@spartacus/core';
import { PageTitleComponent } from './page-title.component';
import * as i0 from "@angular/core";
export class PageTitleModule {
}
PageTitleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageTitleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PageTitleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PageTitleModule, declarations: [PageTitleComponent], imports: [CommonModule, RouterModule, PageMetaModule], exports: [PageTitleComponent] });
PageTitleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageTitleModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                PageTitleComponent: {
                    component: PageTitleComponent,
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, PageMetaModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PageTitleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, PageMetaModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                PageTitleComponent: {
                                    component: PageTitleComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [PageTitleComponent],
                    exports: [PageTitleComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS10aXRsZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL25hdmlnYXRpb24vcGFnZS1oZWFkZXIvcGFnZS10aXRsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBRUwsY0FBYyxFQUNkLG9CQUFvQixHQUNyQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztBQWdCNUQsTUFBTSxPQUFPLGVBQWU7OzRHQUFmLGVBQWU7NkdBQWYsZUFBZSxpQkFIWCxrQkFBa0IsYUFWdkIsWUFBWSxFQUFFLFlBQVksRUFBRSxjQUFjLGFBVzFDLGtCQUFrQjs2R0FFakIsZUFBZSxhQVpmO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLGtCQUFrQixFQUFFO29CQUNsQixTQUFTLEVBQUUsa0JBQWtCO2lCQUM5QjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBVFMsWUFBWSxFQUFFLFlBQVksRUFBRSxjQUFjOzJGQWF6QyxlQUFlO2tCQWQzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDO29CQUNyRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixrQkFBa0IsRUFBRTtvQ0FDbEIsU0FBUyxFQUFFLGtCQUFrQjtpQ0FDOUI7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDbEMsT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUM7aUJBQzlCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQ21zQ29uZmlnLFxuICBQYWdlTWV0YU1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBQYWdlVGl0bGVDb21wb25lbnQgfSBmcm9tICcuL3BhZ2UtdGl0bGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlLCBQYWdlTWV0YU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBQYWdlVGl0bGVDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFBhZ2VUaXRsZUNvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1BhZ2VUaXRsZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtQYWdlVGl0bGVDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBQYWdlVGl0bGVNb2R1bGUge31cbiJdfQ==