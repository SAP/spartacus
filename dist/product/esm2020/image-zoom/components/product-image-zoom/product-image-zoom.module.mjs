/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { CarouselModule, IconModule, KeyboardFocusModule, MediaModule, OutletModule, } from '@spartacus/storefront';
import { defaultProductImageZoomLayoutConfig } from './default-product-image-zoom-layout.config';
import { ProductImageZoomDialogComponent } from './product-image-zoom-dialog/product-image-zoom-dialog.component';
import { ProductImageZoomProductImagesComponent } from './product-image-zoom-product-images/product-image-zoom-product-images.component';
import { ProductImageZoomThumbnailsComponent } from './product-image-zoom-thumbnails/product-image-zoom-thumbnails.component';
import { ProductImageZoomTriggerComponent } from './product-image-zoom-trigger/product-image-zoom-trigger.component';
import { ProductImageZoomViewComponent } from './product-image-zoom-view/product-image-zoom-view.component';
import * as i0 from "@angular/core";
export class ProductImageZoomModule {
}
ProductImageZoomModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductImageZoomModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomModule, declarations: [ProductImageZoomDialogComponent,
        ProductImageZoomProductImagesComponent,
        ProductImageZoomThumbnailsComponent,
        ProductImageZoomTriggerComponent,
        ProductImageZoomViewComponent], imports: [CarouselModule,
        CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        MediaModule,
        OutletModule,
        RouterModule], exports: [ProductImageZoomDialogComponent,
        ProductImageZoomProductImagesComponent,
        ProductImageZoomThumbnailsComponent,
        ProductImageZoomTriggerComponent,
        ProductImageZoomViewComponent] });
ProductImageZoomModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomModule, providers: [
        provideDefaultConfig(defaultProductImageZoomLayoutConfig),
        provideDefaultConfig({
            cmsComponents: {
                ProductImagesComponent: {
                    component: ProductImageZoomProductImagesComponent,
                },
            },
        }),
    ], imports: [CarouselModule,
        CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        MediaModule,
        OutletModule,
        RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CarouselModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        KeyboardFocusModule,
                        MediaModule,
                        OutletModule,
                        RouterModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultProductImageZoomLayoutConfig),
                        provideDefaultConfig({
                            cmsComponents: {
                                ProductImagesComponent: {
                                    component: ProductImageZoomProductImagesComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [
                        ProductImageZoomDialogComponent,
                        ProductImageZoomProductImagesComponent,
                        ProductImageZoomThumbnailsComponent,
                        ProductImageZoomTriggerComponent,
                        ProductImageZoomViewComponent,
                    ],
                    exports: [
                        ProductImageZoomDialogComponent,
                        ProductImageZoomProductImagesComponent,
                        ProductImageZoomThumbnailsComponent,
                        ProductImageZoomTriggerComponent,
                        ProductImageZoomViewComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbWFnZS16b29tLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0L2ltYWdlLXpvb20vY29tcG9uZW50cy9wcm9kdWN0LWltYWdlLXpvb20vcHJvZHVjdC1pbWFnZS16b29tLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQWEsTUFBTSxpQkFBaUIsQ0FBQztBQUM5RSxPQUFPLEVBQ0wsY0FBYyxFQUNkLFVBQVUsRUFDVixtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLFlBQVksR0FDYixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2pHLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGlFQUFpRSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLGlGQUFpRixDQUFDO0FBQ3pJLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSxNQUFNLHlFQUF5RSxDQUFDO0FBQzlILE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLG1FQUFtRSxDQUFDO0FBQ3JILE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDZEQUE2RCxDQUFDOztBQXNDNUcsTUFBTSxPQUFPLHNCQUFzQjs7bUhBQXRCLHNCQUFzQjtvSEFBdEIsc0JBQXNCLGlCQWQvQiwrQkFBK0I7UUFDL0Isc0NBQXNDO1FBQ3RDLG1DQUFtQztRQUNuQyxnQ0FBZ0M7UUFDaEMsNkJBQTZCLGFBeEI3QixjQUFjO1FBQ2QsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLFdBQVc7UUFDWCxZQUFZO1FBQ1osWUFBWSxhQW9CWiwrQkFBK0I7UUFDL0Isc0NBQXNDO1FBQ3RDLG1DQUFtQztRQUNuQyxnQ0FBZ0M7UUFDaEMsNkJBQTZCO29IQUdwQixzQkFBc0IsYUF6QnRCO1FBQ1Qsb0JBQW9CLENBQUMsbUNBQW1DLENBQUM7UUFDekQsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLHNCQUFzQixFQUFFO29CQUN0QixTQUFTLEVBQUUsc0NBQXNDO2lCQUNsRDthQUNGO1NBQ0YsQ0FBQztLQUNILFlBbEJDLGNBQWM7UUFDZCxZQUFZO1FBQ1osVUFBVTtRQUNWLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsV0FBVztRQUNYLFlBQVk7UUFDWixZQUFZOzJGQTJCSCxzQkFBc0I7a0JBcENsQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxjQUFjO3dCQUNkLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixVQUFVO3dCQUNWLG1CQUFtQjt3QkFDbkIsV0FBVzt3QkFDWCxZQUFZO3dCQUNaLFlBQVk7cUJBQ2I7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLG1DQUFtQyxDQUFDO3dCQUN6RCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLHNCQUFzQixFQUFFO29DQUN0QixTQUFTLEVBQUUsc0NBQXNDO2lDQUNsRDs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRTt3QkFDWiwrQkFBK0I7d0JBQy9CLHNDQUFzQzt3QkFDdEMsbUNBQW1DO3dCQUNuQyxnQ0FBZ0M7d0JBQ2hDLDZCQUE2QjtxQkFDOUI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLCtCQUErQjt3QkFDL0Isc0NBQXNDO3dCQUN0QyxtQ0FBbUM7d0JBQ25DLGdDQUFnQzt3QkFDaEMsNkJBQTZCO3FCQUM5QjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnLCBDbXNDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2Fyb3VzZWxNb2R1bGUsXG4gIEljb25Nb2R1bGUsXG4gIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gIE1lZGlhTW9kdWxlLFxuICBPdXRsZXRNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBkZWZhdWx0UHJvZHVjdEltYWdlWm9vbUxheW91dENvbmZpZyB9IGZyb20gJy4vZGVmYXVsdC1wcm9kdWN0LWltYWdlLXpvb20tbGF5b3V0LmNvbmZpZyc7XG5pbXBvcnQgeyBQcm9kdWN0SW1hZ2Vab29tRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9kdWN0LWltYWdlLXpvb20tZGlhbG9nL3Byb2R1Y3QtaW1hZ2Utem9vbS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3RJbWFnZVpvb21Qcm9kdWN0SW1hZ2VzQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9kdWN0LWltYWdlLXpvb20tcHJvZHVjdC1pbWFnZXMvcHJvZHVjdC1pbWFnZS16b29tLXByb2R1Y3QtaW1hZ2VzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9kdWN0SW1hZ2Vab29tVGh1bWJuYWlsc0NvbXBvbmVudCB9IGZyb20gJy4vcHJvZHVjdC1pbWFnZS16b29tLXRodW1ibmFpbHMvcHJvZHVjdC1pbWFnZS16b29tLXRodW1ibmFpbHMuY29tcG9uZW50JztcbmltcG9ydCB7IFByb2R1Y3RJbWFnZVpvb21UcmlnZ2VyQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9kdWN0LWltYWdlLXpvb20tdHJpZ2dlci9wcm9kdWN0LWltYWdlLXpvb20tdHJpZ2dlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvZHVjdEltYWdlWm9vbVZpZXdDb21wb25lbnQgfSBmcm9tICcuL3Byb2R1Y3QtaW1hZ2Utem9vbS12aWV3L3Byb2R1Y3QtaW1hZ2Utem9vbS12aWV3LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDYXJvdXNlbE1vZHVsZSxcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gICAgTWVkaWFNb2R1bGUsXG4gICAgT3V0bGV0TW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdFByb2R1Y3RJbWFnZVpvb21MYXlvdXRDb25maWcpLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBQcm9kdWN0SW1hZ2VzQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBQcm9kdWN0SW1hZ2Vab29tUHJvZHVjdEltYWdlc0NvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFByb2R1Y3RJbWFnZVpvb21EaWFsb2dDb21wb25lbnQsXG4gICAgUHJvZHVjdEltYWdlWm9vbVByb2R1Y3RJbWFnZXNDb21wb25lbnQsXG4gICAgUHJvZHVjdEltYWdlWm9vbVRodW1ibmFpbHNDb21wb25lbnQsXG4gICAgUHJvZHVjdEltYWdlWm9vbVRyaWdnZXJDb21wb25lbnQsXG4gICAgUHJvZHVjdEltYWdlWm9vbVZpZXdDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQcm9kdWN0SW1hZ2Vab29tRGlhbG9nQ29tcG9uZW50LFxuICAgIFByb2R1Y3RJbWFnZVpvb21Qcm9kdWN0SW1hZ2VzQ29tcG9uZW50LFxuICAgIFByb2R1Y3RJbWFnZVpvb21UaHVtYm5haWxzQ29tcG9uZW50LFxuICAgIFByb2R1Y3RJbWFnZVpvb21UcmlnZ2VyQ29tcG9uZW50LFxuICAgIFByb2R1Y3RJbWFnZVpvb21WaWV3Q29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0SW1hZ2Vab29tTW9kdWxlIHt9XG4iXX0=