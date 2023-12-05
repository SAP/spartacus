/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { VariantConfiguratorOverviewLayoutModule } from './variant-configurator-overview-layout.module';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
/**
 * Takes care of the configuration overview that visualizes the attribute value assignments that have been done already in a condensed, read-only form.
 * The end-user can switch between the interactive view and this overview.
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots.
 * Some of the ng components on this view (tab bar, price summary and addToCart button) are shared between the interactive view and the overview.
 */
export class VariantConfiguratorOverviewModule {
}
VariantConfiguratorOverviewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VariantConfiguratorOverviewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewModule, imports: [i1.RouterModule, VariantConfiguratorOverviewLayoutModule] });
VariantConfiguratorOverviewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewModule, imports: [RouterModule.forChild([
            {
                // We can neither omit the path nor set to undefined
                // @ts-ignore
                path: null,
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'configureOverviewCPQCONFIGURATOR',
                },
                canActivate: [CmsPageGuard],
            },
        ]),
        VariantConfiguratorOverviewLayoutModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // We can neither omit the path nor set to undefined
                                // @ts-ignore
                                path: null,
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'configureOverviewCPQCONFIGURATOR',
                                },
                                canActivate: [CmsPageGuard],
                            },
                        ]),
                        VariantConfiguratorOverviewLayoutModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyaWFudC1jb25maWd1cmF0b3Itb3ZlcnZpZXcubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9yb290L3ZhcmlhbnQvdmFyaWFudC1jb25maWd1cmF0b3Itb3ZlcnZpZXcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHVDQUF1QyxFQUFFLE1BQU0sK0NBQStDLENBQUM7OztBQUV4Rzs7Ozs7R0FLRztBQWtCSCxNQUFNLE9BQU8saUNBQWlDOzs4SEFBakMsaUNBQWlDOytIQUFqQyxpQ0FBaUMsNkJBSDFDLHVDQUF1QzsrSEFHOUIsaUNBQWlDLFlBZjFDLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDcEI7Z0JBQ0Usb0RBQW9EO2dCQUNwRCxhQUFhO2dCQUNiLElBQUksRUFBRSxJQUFJO2dCQUNWLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsa0NBQWtDO2lCQUM1QztnQkFDRCxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDNUI7U0FDRixDQUFDO1FBQ0YsdUNBQXVDOzJGQUc5QixpQ0FBaUM7a0JBakI3QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZLENBQUMsUUFBUSxDQUFDOzRCQUNwQjtnQ0FDRSxvREFBb0Q7Z0NBQ3BELGFBQWE7Z0NBQ2IsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsU0FBUyxFQUFFLG1CQUFtQjtnQ0FDOUIsSUFBSSxFQUFFO29DQUNKLE9BQU8sRUFBRSxrQ0FBa0M7aUNBQzVDO2dDQUNELFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQzs2QkFDNUI7eUJBQ0YsQ0FBQzt3QkFDRix1Q0FBdUM7cUJBQ3hDO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDbXNQYWdlR3VhcmQsIFBhZ2VMYXlvdXRDb21wb25lbnQgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgVmFyaWFudENvbmZpZ3VyYXRvck92ZXJ2aWV3TGF5b3V0TW9kdWxlIH0gZnJvbSAnLi92YXJpYW50LWNvbmZpZ3VyYXRvci1vdmVydmlldy1sYXlvdXQubW9kdWxlJztcblxuLyoqXG4gKiBUYWtlcyBjYXJlIG9mIHRoZSBjb25maWd1cmF0aW9uIG92ZXJ2aWV3IHRoYXQgdmlzdWFsaXplcyB0aGUgYXR0cmlidXRlIHZhbHVlIGFzc2lnbm1lbnRzIHRoYXQgaGF2ZSBiZWVuIGRvbmUgYWxyZWFkeSBpbiBhIGNvbmRlbnNlZCwgcmVhZC1vbmx5IGZvcm0uXG4gKiBUaGUgZW5kLXVzZXIgY2FuIHN3aXRjaCBiZXR3ZWVuIHRoZSBpbnRlcmFjdGl2ZSB2aWV3IGFuZCB0aGlzIG92ZXJ2aWV3LlxuICogUHJvdmlkZXMgcm91dGluZywgYXNzaWdubWVudCBvZiBuZyBjb21wb25lbnRzIHRvIENNUyBjb21wb25lbnRzIGFuZCBhc3NpZ25tZW50IG9mIENNUyBjb21wb25lbnRzIHRvIHRoZSBsYXlvdXQgc2xvdHMuXG4gKiBTb21lIG9mIHRoZSBuZyBjb21wb25lbnRzIG9uIHRoaXMgdmlldyAodGFiIGJhciwgcHJpY2Ugc3VtbWFyeSBhbmQgYWRkVG9DYXJ0IGJ1dHRvbikgYXJlIHNoYXJlZCBiZXR3ZWVuIHRoZSBpbnRlcmFjdGl2ZSB2aWV3IGFuZCB0aGUgb3ZlcnZpZXcuXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoW1xuICAgICAge1xuICAgICAgICAvLyBXZSBjYW4gbmVpdGhlciBvbWl0IHRoZSBwYXRoIG5vciBzZXQgdG8gdW5kZWZpbmVkXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY3hSb3V0ZTogJ2NvbmZpZ3VyZU92ZXJ2aWV3Q1BRQ09ORklHVVJBVE9SJyxcbiAgICAgICAgfSxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtDbXNQYWdlR3VhcmRdLFxuICAgICAgfSxcbiAgICBdKSxcbiAgICBWYXJpYW50Q29uZmlndXJhdG9yT3ZlcnZpZXdMYXlvdXRNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFZhcmlhbnRDb25maWd1cmF0b3JPdmVydmlld01vZHVsZSB7fVxuIl19