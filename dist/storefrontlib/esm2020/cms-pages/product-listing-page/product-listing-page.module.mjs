/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '../../cms-structure/index';
import { PRODUCT_LISTING_URL_MATCHER } from './product-listing-url-matcher';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class ProductListingPageModule {
}
ProductListingPageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductListingPageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProductListingPageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProductListingPageModule, imports: [i1.RouterModule] });
ProductListingPageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductListingPageModule, providers: [
        provideDefaultConfig({
            routing: {
                routes: {
                    category: {
                        matchers: [PRODUCT_LISTING_URL_MATCHER],
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
                data: { pageLabel: 'search', cxRoute: 'search' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'brand' },
            },
            {
                // The 'category' route  may include a greedy suffix url matcher '**/c/:categoryCode'
                // So not to shadow the specific 'brand' route, the 'category' is the last route in the sequence.
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'category' },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductListingPageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { pageLabel: 'search', cxRoute: 'search' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'brand' },
                            },
                            {
                                // The 'category' route  may include a greedy suffix url matcher '**/c/:categoryCode'
                                // So not to shadow the specific 'brand' route, the 'category' is the last route in the sequence.
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'category' },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfig({
                            routing: {
                                routes: {
                                    category: {
                                        matchers: [PRODUCT_LISTING_URL_MATCHER],
                                    },
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1saXN0aW5nLXBhZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtcGFnZXMvcHJvZHVjdC1saXN0aW5nLXBhZ2UvcHJvZHVjdC1saXN0aW5nLXBhZ2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQWlCLE1BQU0saUJBQWlCLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzlFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtCQUErQixDQUFDOzs7QUEwQzVFLE1BQU0sT0FBTyx3QkFBd0I7O3FIQUF4Qix3QkFBd0I7c0hBQXhCLHdCQUF3QjtzSEFBeEIsd0JBQXdCLGFBWnhCO1FBQ1Qsb0JBQW9CLENBQWdCO1lBQ2xDLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUU7b0JBQ04sUUFBUSxFQUFFO3dCQUNSLFFBQVEsRUFBRSxDQUFDLDJCQUEyQixDQUFDO3FCQUN4QztpQkFDRjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBcENDLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDcEI7Z0JBQ0UsYUFBYTtnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQzNCLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRTthQUNqRDtZQUNEO2dCQUNFLGFBQWE7Z0JBQ2IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUMzQixTQUFTLEVBQUUsbUJBQW1CO2dCQUM5QixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFO2FBQzNCO1lBQ0Q7Z0JBQ0UscUZBQXFGO2dCQUNyRixpR0FBaUc7Z0JBQ2pHLGFBQWE7Z0JBQ2IsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUMzQixTQUFTLEVBQUUsbUJBQW1CO2dCQUM5QixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFO2FBQzlCO1NBQ0YsQ0FBQzsyRkFjTyx3QkFBd0I7a0JBeENwQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZLENBQUMsUUFBUSxDQUFDOzRCQUNwQjtnQ0FDRSxhQUFhO2dDQUNiLElBQUksRUFBRSxJQUFJO2dDQUNWLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQztnQ0FDM0IsU0FBUyxFQUFFLG1CQUFtQjtnQ0FDOUIsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFOzZCQUNqRDs0QkFDRDtnQ0FDRSxhQUFhO2dDQUNiLElBQUksRUFBRSxJQUFJO2dDQUNWLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQztnQ0FDM0IsU0FBUyxFQUFFLG1CQUFtQjtnQ0FDOUIsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTs2QkFDM0I7NEJBQ0Q7Z0NBQ0UscUZBQXFGO2dDQUNyRixpR0FBaUc7Z0NBQ2pHLGFBQWE7Z0NBQ2IsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDO2dDQUMzQixTQUFTLEVBQUUsbUJBQW1CO2dDQUM5QixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFOzZCQUM5Qjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBZ0I7NEJBQ2xDLE9BQU8sRUFBRTtnQ0FDUCxNQUFNLEVBQUU7b0NBQ04sUUFBUSxFQUFFO3dDQUNSLFFBQVEsRUFBRSxDQUFDLDJCQUEyQixDQUFDO3FDQUN4QztpQ0FDRjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZywgUm91dGluZ0NvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDbXNQYWdlR3VhcmQsIFBhZ2VMYXlvdXRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jbXMtc3RydWN0dXJlL2luZGV4JztcbmltcG9ydCB7IFBST0RVQ1RfTElTVElOR19VUkxfTUFUQ0hFUiB9IGZyb20gJy4vcHJvZHVjdC1saXN0aW5nLXVybC1tYXRjaGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChbXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtDbXNQYWdlR3VhcmRdLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHsgcGFnZUxhYmVsOiAnc2VhcmNoJywgY3hSb3V0ZTogJ3NlYXJjaCcgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtDbXNQYWdlR3VhcmRdLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHsgY3hSb3V0ZTogJ2JyYW5kJyB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gVGhlICdjYXRlZ29yeScgcm91dGUgIG1heSBpbmNsdWRlIGEgZ3JlZWR5IHN1ZmZpeCB1cmwgbWF0Y2hlciAnKiovYy86Y2F0ZWdvcnlDb2RlJ1xuICAgICAgICAvLyBTbyBub3QgdG8gc2hhZG93IHRoZSBzcGVjaWZpYyAnYnJhbmQnIHJvdXRlLCB0aGUgJ2NhdGVnb3J5JyBpcyB0aGUgbGFzdCByb3V0ZSBpbiB0aGUgc2VxdWVuY2UuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtDbXNQYWdlR3VhcmRdLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHsgY3hSb3V0ZTogJ2NhdGVnb3J5JyB9LFxuICAgICAgfSxcbiAgICBdKSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPFJvdXRpbmdDb25maWc+e1xuICAgICAgcm91dGluZzoge1xuICAgICAgICByb3V0ZXM6IHtcbiAgICAgICAgICBjYXRlZ29yeToge1xuICAgICAgICAgICAgbWF0Y2hlcnM6IFtQUk9EVUNUX0xJU1RJTkdfVVJMX01BVENIRVJdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0TGlzdGluZ1BhZ2VNb2R1bGUge31cbiJdfQ==