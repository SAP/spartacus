/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { ProductVariantsContainerModule } from './product-variants-container/product-variants-container.module';
import { ProductVariantColorSelectorModule } from './variant-color-selector/product-variant-color-selector.module';
import { ProductVariantSizeSelectorModule } from './variant-size-selector/product-variant-size-selector.module';
import { ProductVariantStyleSelectorModule } from './variant-style-selector/product-variant-style-selector.module';
import { provideDefaultConfig } from '@spartacus/core';
import { ProductVariantsContainerComponent } from './product-variants-container/product-variants-container.component';
import { ProductVariantsGuard } from './guards/product-variants.guard';
import * as i0 from "@angular/core";
export class ProductVariantsComponentsModule {
}
ProductVariantsComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductVariantsComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsComponentsModule, imports: [ProductVariantsContainerModule,
        ProductVariantColorSelectorModule,
        ProductVariantSizeSelectorModule,
        ProductVariantStyleSelectorModule] });
ProductVariantsComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsComponentsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ProductVariantSelectorComponent: {
                    component: ProductVariantsContainerComponent,
                    guards: [ProductVariantsGuard],
                },
            },
        }),
    ], imports: [ProductVariantsContainerModule,
        ProductVariantColorSelectorModule,
        ProductVariantSizeSelectorModule,
        ProductVariantStyleSelectorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ProductVariantsContainerModule,
                        ProductVariantColorSelectorModule,
                        ProductVariantSizeSelectorModule,
                        ProductVariantStyleSelectorModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ProductVariantSelectorComponent: {
                                    component: ProductVariantsContainerComponent,
                                    guards: [ProductVariantsGuard],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC12YXJpYW50cy1jb21wb25lbnRzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0L3ZhcmlhbnRzL2NvbXBvbmVudHMvcHJvZHVjdC12YXJpYW50cy1jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUNoSCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUNuSCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSw4REFBOEQsQ0FBQztBQUNoSCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxnRUFBZ0UsQ0FBQztBQUNuSCxPQUFPLEVBQWEsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxtRUFBbUUsQ0FBQztBQUN0SCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7QUFvQnZFLE1BQU0sT0FBTywrQkFBK0I7OzRIQUEvQiwrQkFBK0I7NkhBQS9CLCtCQUErQixZQWhCeEMsOEJBQThCO1FBQzlCLGlDQUFpQztRQUNqQyxnQ0FBZ0M7UUFDaEMsaUNBQWlDOzZIQWF4QiwrQkFBK0IsYUFYL0I7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsK0JBQStCLEVBQUU7b0JBQy9CLFNBQVMsRUFBRSxpQ0FBaUM7b0JBQzVDLE1BQU0sRUFBRSxDQUFDLG9CQUFvQixDQUFDO2lCQUMvQjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBZEMsOEJBQThCO1FBQzlCLGlDQUFpQztRQUNqQyxnQ0FBZ0M7UUFDaEMsaUNBQWlDOzJGQWF4QiwrQkFBK0I7a0JBbEIzQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCw4QkFBOEI7d0JBQzlCLGlDQUFpQzt3QkFDakMsZ0NBQWdDO3dCQUNoQyxpQ0FBaUM7cUJBQ2xDO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLCtCQUErQixFQUFFO29DQUMvQixTQUFTLEVBQUUsaUNBQWlDO29DQUM1QyxNQUFNLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztpQ0FDL0I7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9kdWN0VmFyaWFudHNDb250YWluZXJNb2R1bGUgfSBmcm9tICcuL3Byb2R1Y3QtdmFyaWFudHMtY29udGFpbmVyL3Byb2R1Y3QtdmFyaWFudHMtY29udGFpbmVyLm1vZHVsZSc7XG5pbXBvcnQgeyBQcm9kdWN0VmFyaWFudENvbG9yU2VsZWN0b3JNb2R1bGUgfSBmcm9tICcuL3ZhcmlhbnQtY29sb3Itc2VsZWN0b3IvcHJvZHVjdC12YXJpYW50LWNvbG9yLXNlbGVjdG9yLm1vZHVsZSc7XG5pbXBvcnQgeyBQcm9kdWN0VmFyaWFudFNpemVTZWxlY3Rvck1vZHVsZSB9IGZyb20gJy4vdmFyaWFudC1zaXplLXNlbGVjdG9yL3Byb2R1Y3QtdmFyaWFudC1zaXplLXNlbGVjdG9yLm1vZHVsZSc7XG5pbXBvcnQgeyBQcm9kdWN0VmFyaWFudFN0eWxlU2VsZWN0b3JNb2R1bGUgfSBmcm9tICcuL3ZhcmlhbnQtc3R5bGUtc2VsZWN0b3IvcHJvZHVjdC12YXJpYW50LXN0eWxlLXNlbGVjdG9yLm1vZHVsZSc7XG5pbXBvcnQgeyBDbXNDb25maWcsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFByb2R1Y3RWYXJpYW50c0NvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vcHJvZHVjdC12YXJpYW50cy1jb250YWluZXIvcHJvZHVjdC12YXJpYW50cy1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3RWYXJpYW50c0d1YXJkIH0gZnJvbSAnLi9ndWFyZHMvcHJvZHVjdC12YXJpYW50cy5ndWFyZCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBQcm9kdWN0VmFyaWFudHNDb250YWluZXJNb2R1bGUsXG4gICAgUHJvZHVjdFZhcmlhbnRDb2xvclNlbGVjdG9yTW9kdWxlLFxuICAgIFByb2R1Y3RWYXJpYW50U2l6ZVNlbGVjdG9yTW9kdWxlLFxuICAgIFByb2R1Y3RWYXJpYW50U3R5bGVTZWxlY3Rvck1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIFByb2R1Y3RWYXJpYW50U2VsZWN0b3JDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IFByb2R1Y3RWYXJpYW50c0NvbnRhaW5lckNvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtQcm9kdWN0VmFyaWFudHNHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0VmFyaWFudHNDb21wb25lbnRzTW9kdWxlIHt9XG4iXX0=