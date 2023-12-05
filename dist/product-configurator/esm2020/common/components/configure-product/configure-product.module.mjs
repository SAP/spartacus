/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigModule, I18nModule, UrlModule, } from '@spartacus/core';
import { IconModule, OutletPosition, ProductListOutlets, provideOutlet, } from '@spartacus/storefront';
import { ConfigureProductComponent } from './configure-product.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class ConfigureProductModule {
}
ConfigureProductModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureProductModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfigureProductModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfigureProductModule, declarations: [ConfigureProductComponent], imports: [CommonModule,
        RouterModule, i1.ConfigModule, UrlModule,
        I18nModule,
        IconModule], exports: [ConfigureProductComponent] });
ConfigureProductModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureProductModule, providers: [
        provideOutlet({
            id: ProductListOutlets.ITEM_ACTIONS,
            position: OutletPosition.AFTER,
            component: ConfigureProductComponent,
        }),
    ], imports: [CommonModule,
        RouterModule,
        ConfigModule.withConfig({
            cmsComponents: {
                ConfigureProductComponent: {
                    component: ConfigureProductComponent,
                },
            },
        }),
        UrlModule,
        I18nModule,
        IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureProductModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                ConfigureProductComponent: {
                                    component: ConfigureProductComponent,
                                },
                            },
                        }),
                        UrlModule,
                        I18nModule,
                        IconModule,
                    ],
                    providers: [
                        provideOutlet({
                            id: ProductListOutlets.ITEM_ACTIONS,
                            position: OutletPosition.AFTER,
                            component: ConfigureProductComponent,
                        }),
                    ],
                    declarations: [ConfigureProductComponent],
                    exports: [ConfigureProductComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJlLXByb2R1Y3QubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL2NvbW1vbi9jb21wb25lbnRzL2NvbmZpZ3VyZS1wcm9kdWN0L2NvbmZpZ3VyZS1wcm9kdWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFFTCxZQUFZLEVBQ1osVUFBVSxFQUNWLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxVQUFVLEVBQ1YsY0FBYyxFQUNkLGtCQUFrQixFQUNsQixhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7O0FBMkIxRSxNQUFNLE9BQU8sc0JBQXNCOzttSEFBdEIsc0JBQXNCO29IQUF0QixzQkFBc0IsaUJBSGxCLHlCQUF5QixhQXBCdEMsWUFBWTtRQUNaLFlBQVksbUJBUVosU0FBUztRQUNULFVBQVU7UUFDVixVQUFVLGFBVUYseUJBQXlCO29IQUV4QixzQkFBc0IsYUFWdEI7UUFDVCxhQUFhLENBQUM7WUFDWixFQUFFLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtZQUNuQyxRQUFRLEVBQUUsY0FBYyxDQUFDLEtBQUs7WUFDOUIsU0FBUyxFQUFFLHlCQUF5QjtTQUNyQyxDQUFDO0tBQ0gsWUFuQkMsWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZLENBQUMsVUFBVSxDQUFZO1lBQ2pDLGFBQWEsRUFBRTtnQkFDYix5QkFBeUIsRUFBRTtvQkFDekIsU0FBUyxFQUFFLHlCQUF5QjtpQkFDckM7YUFDRjtTQUNGLENBQUM7UUFDRixTQUFTO1FBQ1QsVUFBVTtRQUNWLFVBQVU7MkZBWUQsc0JBQXNCO2tCQXpCbEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixZQUFZO3dCQUNaLFlBQVksQ0FBQyxVQUFVLENBQVk7NEJBQ2pDLGFBQWEsRUFBRTtnQ0FDYix5QkFBeUIsRUFBRTtvQ0FDekIsU0FBUyxFQUFFLHlCQUF5QjtpQ0FDckM7NkJBQ0Y7eUJBQ0YsQ0FBQzt3QkFDRixTQUFTO3dCQUNULFVBQVU7d0JBQ1YsVUFBVTtxQkFDWDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsYUFBYSxDQUFDOzRCQUNaLEVBQUUsRUFBRSxrQkFBa0IsQ0FBQyxZQUFZOzRCQUNuQyxRQUFRLEVBQUUsY0FBYyxDQUFDLEtBQUs7NEJBQzlCLFNBQVMsRUFBRSx5QkFBeUI7eUJBQ3JDLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMseUJBQXlCLENBQUM7b0JBQ3pDLE9BQU8sRUFBRSxDQUFDLHlCQUF5QixDQUFDO2lCQUNyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIENtc0NvbmZpZyxcbiAgQ29uZmlnTW9kdWxlLFxuICBJMThuTW9kdWxlLFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBJY29uTW9kdWxlLFxuICBPdXRsZXRQb3NpdGlvbixcbiAgUHJvZHVjdExpc3RPdXRsZXRzLFxuICBwcm92aWRlT3V0bGV0LFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJlUHJvZHVjdENvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJlLXByb2R1Y3QuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgQ29uZmlnTW9kdWxlLndpdGhDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIENvbmZpZ3VyZVByb2R1Y3RDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IENvbmZpZ3VyZVByb2R1Y3RDb21wb25lbnQsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICAgIFVybE1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVPdXRsZXQoe1xuICAgICAgaWQ6IFByb2R1Y3RMaXN0T3V0bGV0cy5JVEVNX0FDVElPTlMsXG4gICAgICBwb3NpdGlvbjogT3V0bGV0UG9zaXRpb24uQUZURVIsXG4gICAgICBjb21wb25lbnQ6IENvbmZpZ3VyZVByb2R1Y3RDb21wb25lbnQsXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyZVByb2R1Y3RDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ29uZmlndXJlUHJvZHVjdENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyZVByb2R1Y3RNb2R1bGUge31cbiJdfQ==