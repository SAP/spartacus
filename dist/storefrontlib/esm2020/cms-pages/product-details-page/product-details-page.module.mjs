/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { CmsPageGuard } from '../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../cms-structure/page/page-layout/page-layout.component';
import { PRODUCT_DETAILS_URL_MATCHER } from './product-details-url-matcher';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class ProductDetailsPageModule {
}
ProductDetailsPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductDetailsPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductDetailsPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductDetailsPageModule, imports: [i1.RouterModule] });
ProductDetailsPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductDetailsPageModule, providers: [
        provideDefaultConfig({
            routing: {
                routes: {
                    product: {
                        matchers: [PRODUCT_DETAILS_URL_MATCHER],
                    },
                },
            },
        }),
    ], imports: [RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'product' },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductDetailsPageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'product' },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfig({
                            routing: {
                                routes: {
                                    product: {
                                        matchers: [PRODUCT_DETAILS_URL_MATCHER],
                                    },
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1kZXRhaWxzLXBhZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtcGFnZXMvcHJvZHVjdC1kZXRhaWxzLXBhZ2UvcHJvZHVjdC1kZXRhaWxzLXBhZ2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQWlCLE1BQU0saUJBQWlCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDREQUE0RCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7QUEwQjVFLE1BQU0sT0FBTyx3QkFBd0I7O3FIQUF4Qix3QkFBd0I7c0hBQXhCLHdCQUF3QjtzSEFBeEIsd0JBQXdCLGFBWnhCO1FBQ1Qsb0JBQW9CLENBQWdCO1lBQ2xDLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUU7b0JBQ04sT0FBTyxFQUFFO3dCQUNQLFFBQVEsRUFBRSxDQUFDLDJCQUEyQixDQUFDO3FCQUN4QztpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBcEJDLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDcEI7Z0JBQ0UsYUFBYTtnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQzNCLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUU7YUFDN0I7U0FDRixDQUFDOzJGQWNPLHdCQUF3QjtrQkF4QnBDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVksQ0FBQyxRQUFRLENBQUM7NEJBQ3BCO2dDQUNFLGFBQWE7Z0NBQ2IsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDO2dDQUMzQixTQUFTLEVBQUUsbUJBQW1CO2dDQUM5QixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFOzZCQUM3Qjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBZ0I7NEJBQ2xDLE9BQU8sRUFBRTtnQ0FDUCxNQUFNLEVBQUU7b0NBQ04sT0FBTyxFQUFFO3dDQUNQLFFBQVEsRUFBRSxDQUFDLDJCQUEyQixDQUFDO3FDQUN4QztpQ0FDRjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZywgUm91dGluZ0NvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDbXNQYWdlR3VhcmQgfSBmcm9tICcuLi8uLi9jbXMtc3RydWN0dXJlL2d1YXJkcy9jbXMtcGFnZS5ndWFyZCc7XG5pbXBvcnQgeyBQYWdlTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY21zLXN0cnVjdHVyZS9wYWdlL3BhZ2UtbGF5b3V0L3BhZ2UtbGF5b3V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQUk9EVUNUX0RFVEFJTFNfVVJMX01BVENIRVIgfSBmcm9tICcuL3Byb2R1Y3QtZGV0YWlscy11cmwtbWF0Y2hlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoW1xuICAgICAge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhdGg6IG51bGwsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICdwcm9kdWN0JyB9LFxuICAgICAgfSxcbiAgICBdKSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPFJvdXRpbmdDb25maWc+e1xuICAgICAgcm91dGluZzoge1xuICAgICAgICByb3V0ZXM6IHtcbiAgICAgICAgICBwcm9kdWN0OiB7XG4gICAgICAgICAgICBtYXRjaGVyczogW1BST0RVQ1RfREVUQUlMU19VUkxfTUFUQ0hFUl0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3REZXRhaWxzUGFnZU1vZHVsZSB7fVxuIl19