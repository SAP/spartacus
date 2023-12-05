/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { CarouselModule, IconModule, MediaModule, ProductReferencesModule, } from '@spartacus/storefront';
import { CompactAddToCartModule } from './compact-add-to-cart/compact-add-to-cart.module';
import { PagedListModule } from './paged-list/paged-list.module';
import { VisualPickingProductListComponent } from './visual-picking-product-list.component';
import * as i0 from "@angular/core";
export class VisualPickingProductListModule {
}
VisualPickingProductListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VisualPickingProductListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductListModule, declarations: [VisualPickingProductListComponent], imports: [CommonModule,
        RouterModule,
        ProductReferencesModule,
        MediaModule,
        IconModule,
        CarouselModule,
        PagedListModule,
        UrlModule,
        I18nModule,
        CompactAddToCartModule], exports: [VisualPickingProductListComponent] });
VisualPickingProductListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductListModule, imports: [CommonModule,
        RouterModule,
        ProductReferencesModule,
        MediaModule,
        IconModule,
        CarouselModule,
        PagedListModule,
        UrlModule,
        I18nModule,
        CompactAddToCartModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        ProductReferencesModule,
                        MediaModule,
                        IconModule,
                        CarouselModule,
                        PagedListModule,
                        UrlModule,
                        I18nModule,
                        CompactAddToCartModule,
                    ],
                    declarations: [VisualPickingProductListComponent],
                    exports: [VisualPickingProductListComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXBpY2tpbmctcHJvZHVjdC1saXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvZXBkLXZpc3VhbGl6YXRpb24vY29tcG9uZW50cy92aXN1YWwtcGlja2luZy92aXN1YWwtcGlja2luZy10YWIvcHJvZHVjdC1saXN0L3Zpc3VhbC1waWNraW5nLXByb2R1Y3QtbGlzdC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFDTCxjQUFjLEVBQ2QsVUFBVSxFQUNWLFdBQVcsRUFDWCx1QkFBdUIsR0FDeEIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDakUsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7O0FBa0I1RixNQUFNLE9BQU8sOEJBQThCOzsySEFBOUIsOEJBQThCOzRIQUE5Qiw4QkFBOEIsaUJBSDFCLGlDQUFpQyxhQVg5QyxZQUFZO1FBQ1osWUFBWTtRQUNaLHVCQUF1QjtRQUN2QixXQUFXO1FBQ1gsVUFBVTtRQUNWLGNBQWM7UUFDZCxlQUFlO1FBQ2YsU0FBUztRQUNULFVBQVU7UUFDVixzQkFBc0IsYUFHZCxpQ0FBaUM7NEhBRWhDLDhCQUE4QixZQWR2QyxZQUFZO1FBQ1osWUFBWTtRQUNaLHVCQUF1QjtRQUN2QixXQUFXO1FBQ1gsVUFBVTtRQUNWLGNBQWM7UUFDZCxlQUFlO1FBQ2YsU0FBUztRQUNULFVBQVU7UUFDVixzQkFBc0I7MkZBS2IsOEJBQThCO2tCQWhCMUMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLHVCQUF1Qjt3QkFDdkIsV0FBVzt3QkFDWCxVQUFVO3dCQUNWLGNBQWM7d0JBQ2QsZUFBZTt3QkFDZixTQUFTO3dCQUNULFVBQVU7d0JBQ1Ysc0JBQXNCO3FCQUN2QjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztvQkFDakQsT0FBTyxFQUFFLENBQUMsaUNBQWlDLENBQUM7aUJBQzdDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSwgVXJsTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIENhcm91c2VsTW9kdWxlLFxuICBJY29uTW9kdWxlLFxuICBNZWRpYU1vZHVsZSxcbiAgUHJvZHVjdFJlZmVyZW5jZXNNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDb21wYWN0QWRkVG9DYXJ0TW9kdWxlIH0gZnJvbSAnLi9jb21wYWN0LWFkZC10by1jYXJ0L2NvbXBhY3QtYWRkLXRvLWNhcnQubW9kdWxlJztcbmltcG9ydCB7IFBhZ2VkTGlzdE1vZHVsZSB9IGZyb20gJy4vcGFnZWQtbGlzdC9wYWdlZC1saXN0Lm1vZHVsZSc7XG5pbXBvcnQgeyBWaXN1YWxQaWNraW5nUHJvZHVjdExpc3RDb21wb25lbnQgfSBmcm9tICcuL3Zpc3VhbC1waWNraW5nLXByb2R1Y3QtbGlzdC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBQcm9kdWN0UmVmZXJlbmNlc01vZHVsZSxcbiAgICBNZWRpYU1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIENhcm91c2VsTW9kdWxlLFxuICAgIFBhZ2VkTGlzdE1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBDb21wYWN0QWRkVG9DYXJ0TW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtWaXN1YWxQaWNraW5nUHJvZHVjdExpc3RDb21wb25lbnRdLFxuICBleHBvcnRzOiBbVmlzdWFsUGlja2luZ1Byb2R1Y3RMaXN0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgVmlzdWFsUGlja2luZ1Byb2R1Y3RMaXN0TW9kdWxlIHt9XG4iXX0=