/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_VARIANTS_FEATURE } from './feature-name';
import { ProductListOutlets, OutletPosition, provideOutlet, } from '@spartacus/storefront';
import { ProductVariantStyleIconsComponent } from './components/variant-style-icons/product-variant-style-icons.component';
import { ProductVariantStyleIconsModule } from './components/variant-style-icons/product-variant-style-icons.module';
import * as i0 from "@angular/core";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultProductVariantsComponentsConfig() {
    const config = {
        featureModules: {
            [PRODUCT_VARIANTS_FEATURE]: {
                cmsComponents: ['ProductVariantSelectorComponent'],
            },
        },
    };
    return config;
}
export class ProductVariantsRootModule {
}
ProductVariantsRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductVariantsRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsRootModule, imports: [ProductVariantStyleIconsModule] });
ProductVariantsRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsRootModule, providers: [
        provideDefaultConfigFactory(defaultProductVariantsComponentsConfig),
        provideOutlet({
            id: ProductListOutlets.ITEM_DETAILS,
            position: OutletPosition.AFTER,
            component: ProductVariantStyleIconsComponent,
        }),
    ], imports: [ProductVariantStyleIconsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductVariantsRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ProductVariantStyleIconsModule],
                    providers: [
                        provideDefaultConfigFactory(defaultProductVariantsComponentsConfig),
                        provideOutlet({
                            id: ProductListOutlets.ITEM_DETAILS,
                            position: OutletPosition.AFTER,
                            component: ProductVariantStyleIconsComponent,
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC12YXJpYW50cy1yb290Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0L3ZhcmlhbnRzL3Jvb3QvcHJvZHVjdC12YXJpYW50cy1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsMkJBQTJCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRCxPQUFPLEVBQ0wsa0JBQWtCLEVBQ2xCLGNBQWMsRUFDZCxhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx3RUFBd0UsQ0FBQztBQUMzSCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxRUFBcUUsQ0FBQzs7QUFFckgsMkVBQTJFO0FBQzNFLE1BQU0sVUFBVSxzQ0FBc0M7SUFDcEQsTUFBTSxNQUFNLEdBQWM7UUFDeEIsY0FBYyxFQUFFO1lBQ2QsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO2dCQUMxQixhQUFhLEVBQUUsQ0FBQyxpQ0FBaUMsQ0FBQzthQUNuRDtTQUNGO0tBQ0YsQ0FBQztJQUVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFhRCxNQUFNLE9BQU8seUJBQXlCOztzSEFBekIseUJBQXlCO3VIQUF6Qix5QkFBeUIsWUFWMUIsOEJBQThCO3VIQVU3Qix5QkFBeUIsYUFUekI7UUFDVCwyQkFBMkIsQ0FBQyxzQ0FBc0MsQ0FBQztRQUNuRSxhQUFhLENBQUM7WUFDWixFQUFFLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtZQUNuQyxRQUFRLEVBQUUsY0FBYyxDQUFDLEtBQUs7WUFDOUIsU0FBUyxFQUFFLGlDQUFpQztTQUM3QyxDQUFDO0tBQ0gsWUFSUyw4QkFBOEI7MkZBVTdCLHlCQUF5QjtrQkFYckMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztvQkFDekMsU0FBUyxFQUFFO3dCQUNULDJCQUEyQixDQUFDLHNDQUFzQyxDQUFDO3dCQUNuRSxhQUFhLENBQUM7NEJBQ1osRUFBRSxFQUFFLGtCQUFrQixDQUFDLFlBQVk7NEJBQ25DLFFBQVEsRUFBRSxjQUFjLENBQUMsS0FBSzs0QkFDOUIsU0FBUyxFQUFFLGlDQUFpQzt5QkFDN0MsQ0FBQztxQkFDSDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbXNDb25maWcsIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBQUk9EVUNUX1ZBUklBTlRTX0ZFQVRVUkUgfSBmcm9tICcuL2ZlYXR1cmUtbmFtZSc7XG5pbXBvcnQge1xuICBQcm9kdWN0TGlzdE91dGxldHMsXG4gIE91dGxldFBvc2l0aW9uLFxuICBwcm92aWRlT3V0bGV0LFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgUHJvZHVjdFZhcmlhbnRTdHlsZUljb25zQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3ZhcmlhbnQtc3R5bGUtaWNvbnMvcHJvZHVjdC12YXJpYW50LXN0eWxlLWljb25zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9kdWN0VmFyaWFudFN0eWxlSWNvbnNNb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvdmFyaWFudC1zdHlsZS1pY29ucy9wcm9kdWN0LXZhcmlhbnQtc3R5bGUtaWNvbnMubW9kdWxlJztcblxuLy8gVE9ETzogSW5saW5lIHRoaXMgZmFjdG9yeSB3aGVuIHdlIHN0YXJ0IHJlbGVhc2luZyBJdnkgY29tcGlsZWQgbGlicmFyaWVzXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFByb2R1Y3RWYXJpYW50c0NvbXBvbmVudHNDb25maWcoKTogQ21zQ29uZmlnIHtcbiAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgIFtQUk9EVUNUX1ZBUklBTlRTX0ZFQVRVUkVdOiB7XG4gICAgICAgIGNtc0NvbXBvbmVudHM6IFsnUHJvZHVjdFZhcmlhbnRTZWxlY3RvckNvbXBvbmVudCddLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBjb25maWc7XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtQcm9kdWN0VmFyaWFudFN0eWxlSWNvbnNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoZGVmYXVsdFByb2R1Y3RWYXJpYW50c0NvbXBvbmVudHNDb25maWcpLFxuICAgIHByb3ZpZGVPdXRsZXQoe1xuICAgICAgaWQ6IFByb2R1Y3RMaXN0T3V0bGV0cy5JVEVNX0RFVEFJTFMsXG4gICAgICBwb3NpdGlvbjogT3V0bGV0UG9zaXRpb24uQUZURVIsXG4gICAgICBjb21wb25lbnQ6IFByb2R1Y3RWYXJpYW50U3R5bGVJY29uc0NvbXBvbmVudCxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdFZhcmlhbnRzUm9vdE1vZHVsZSB7fVxuIl19