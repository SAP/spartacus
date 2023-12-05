/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ProductVariantColorSelectorModule } from '../variant-color-selector/product-variant-color-selector.module';
import { ProductVariantSizeSelectorModule } from '../variant-size-selector/product-variant-size-selector.module';
import { ProductVariantStyleSelectorModule } from '../variant-style-selector/product-variant-style-selector.module';
import { ProductVariantsContainerComponent } from './product-variants-container.component';
import * as i0 from "@angular/core";
export class ProductVariantsContainerModule {
}
ProductVariantsContainerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsContainerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductVariantsContainerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsContainerModule, declarations: [ProductVariantsContainerComponent], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ProductVariantStyleSelectorModule,
        ProductVariantSizeSelectorModule,
        ProductVariantColorSelectorModule] });
ProductVariantsContainerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsContainerModule, imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ProductVariantStyleSelectorModule,
        ProductVariantSizeSelectorModule,
        ProductVariantColorSelectorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsContainerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        ProductVariantStyleSelectorModule,
                        ProductVariantSizeSelectorModule,
                        ProductVariantColorSelectorModule,
                    ],
                    declarations: [ProductVariantsContainerComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC12YXJpYW50cy1jb250YWluZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvdmFyaWFudHMvY29tcG9uZW50cy9wcm9kdWN0LXZhcmlhbnRzLWNvbnRhaW5lci9wcm9kdWN0LXZhcmlhbnRzLWNvbnRhaW5lci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ2pILE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHdDQUF3QyxDQUFDOztBQWMzRixNQUFNLE9BQU8sOEJBQThCOzsySEFBOUIsOEJBQThCOzRIQUE5Qiw4QkFBOEIsaUJBRjFCLGlDQUFpQyxhQVI5QyxZQUFZO1FBQ1osWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsaUNBQWlDO1FBQ2pDLGdDQUFnQztRQUNoQyxpQ0FBaUM7NEhBSXhCLDhCQUE4QixZQVZ2QyxZQUFZO1FBQ1osWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsaUNBQWlDO1FBQ2pDLGdDQUFnQztRQUNoQyxpQ0FBaUM7MkZBSXhCLDhCQUE4QjtrQkFaMUMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFNBQVM7d0JBQ1QsVUFBVTt3QkFDVixpQ0FBaUM7d0JBQ2pDLGdDQUFnQzt3QkFDaEMsaUNBQWlDO3FCQUNsQztvQkFDRCxZQUFZLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQztpQkFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBVcmxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUHJvZHVjdFZhcmlhbnRDb2xvclNlbGVjdG9yTW9kdWxlIH0gZnJvbSAnLi4vdmFyaWFudC1jb2xvci1zZWxlY3Rvci9wcm9kdWN0LXZhcmlhbnQtY29sb3Itc2VsZWN0b3IubW9kdWxlJztcbmltcG9ydCB7IFByb2R1Y3RWYXJpYW50U2l6ZVNlbGVjdG9yTW9kdWxlIH0gZnJvbSAnLi4vdmFyaWFudC1zaXplLXNlbGVjdG9yL3Byb2R1Y3QtdmFyaWFudC1zaXplLXNlbGVjdG9yLm1vZHVsZSc7XG5pbXBvcnQgeyBQcm9kdWN0VmFyaWFudFN0eWxlU2VsZWN0b3JNb2R1bGUgfSBmcm9tICcuLi92YXJpYW50LXN0eWxlLXNlbGVjdG9yL3Byb2R1Y3QtdmFyaWFudC1zdHlsZS1zZWxlY3Rvci5tb2R1bGUnO1xuaW1wb3J0IHsgUHJvZHVjdFZhcmlhbnRzQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9kdWN0LXZhcmlhbnRzLWNvbnRhaW5lci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBQcm9kdWN0VmFyaWFudFN0eWxlU2VsZWN0b3JNb2R1bGUsXG4gICAgUHJvZHVjdFZhcmlhbnRTaXplU2VsZWN0b3JNb2R1bGUsXG4gICAgUHJvZHVjdFZhcmlhbnRDb2xvclNlbGVjdG9yTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtQcm9kdWN0VmFyaWFudHNDb250YWluZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0VmFyaWFudHNDb250YWluZXJNb2R1bGUge31cbiJdfQ==