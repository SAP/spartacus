/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_IMAGE_ZOOM_FEATURE } from './feature-name';
import * as i0 from "@angular/core";
export function defaultImageZoomComponentsConfig() {
    const config = {
        featureModules: {
            [PRODUCT_IMAGE_ZOOM_FEATURE]: {
                cmsComponents: ['ProductImagesComponent'],
            },
        },
    };
    return config;
}
export class ProductImageZoomRootModule {
}
ProductImageZoomRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductImageZoomRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomRootModule });
ProductImageZoomRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomRootModule, providers: [provideDefaultConfigFactory(defaultImageZoomComponentsConfig)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [provideDefaultConfigFactory(defaultImageZoomComponentsConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbWFnZS16b29tLXJvb3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvaW1hZ2Utem9vbS9yb290L3Byb2R1Y3QtaW1hZ2Utem9vbS1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFNUQsTUFBTSxVQUFVLGdDQUFnQztJQUM5QyxNQUFNLE1BQU0sR0FBRztRQUNiLGNBQWMsRUFBRTtZQUNkLENBQUMsMEJBQTBCLENBQUMsRUFBRTtnQkFDNUIsYUFBYSxFQUFFLENBQUMsd0JBQXdCLENBQUM7YUFDMUM7U0FDRjtLQUNGLENBQUM7SUFDRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBTUQsTUFBTSxPQUFPLDBCQUEwQjs7dUhBQTFCLDBCQUEwQjt3SEFBMUIsMEJBQTBCO3dIQUExQiwwQkFBMEIsYUFGMUIsQ0FBQywyQkFBMkIsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDOzJGQUUvRCwwQkFBMEI7a0JBSnRDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztpQkFDM0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFBST0RVQ1RfSU1BR0VfWk9PTV9GRUFUVVJFIH0gZnJvbSAnLi9mZWF0dXJlLW5hbWUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdEltYWdlWm9vbUNvbXBvbmVudHNDb25maWcoKSB7XG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBmZWF0dXJlTW9kdWxlczoge1xuICAgICAgW1BST0RVQ1RfSU1BR0VfWk9PTV9GRUFUVVJFXToge1xuICAgICAgICBjbXNDb21wb25lbnRzOiBbJ1Byb2R1Y3RJbWFnZXNDb21wb25lbnQnXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIHByb3ZpZGVyczogW3Byb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeShkZWZhdWx0SW1hZ2Vab29tQ29tcG9uZW50c0NvbmZpZyldLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0SW1hZ2Vab29tUm9vdE1vZHVsZSB7fVxuIl19