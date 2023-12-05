/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { CpqConfiguratorLayoutModule } from './cpq-configurator-layout.module';
import { defaultCpqOverviewRoutingConfig } from './default-cpq-overview-routing-config';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
/**
 * Takes care of the configuration overview that visualizes the attribute value assignments that have been done already in a condensed, read-only form.
 * The end-user can switch between the interactive view and this overview.
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots.
 * Some of the ng components on this view (tab bar, price summary and addToCart button) are shared between the interactive view and the overview.
 */
export class CpqConfiguratorOverviewModule {
}
CpqConfiguratorOverviewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOverviewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorOverviewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOverviewModule, imports: [i1.RouterModule, CpqConfiguratorLayoutModule] });
CpqConfiguratorOverviewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOverviewModule, providers: [provideDefaultConfig(defaultCpqOverviewRoutingConfig)], imports: [RouterModule.forChild([
            {
                // We can neither omit the path nor set to undefined
                // @ts-ignore
                path: null,
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'configureOverviewCLOUDCPQCONFIGURATOR',
                },
                canActivate: [CmsPageGuard],
            },
        ]),
        CpqConfiguratorLayoutModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOverviewModule, decorators: [{
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
                                    cxRoute: 'configureOverviewCLOUDCPQCONFIGURATOR',
                                },
                                canActivate: [CmsPageGuard],
                            },
                        ]),
                        CpqConfiguratorLayoutModule,
                    ],
                    providers: [provideDefaultConfig(defaultCpqOverviewRoutingConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3BxLWNvbmZpZ3VyYXRvci1vdmVydmlldy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL3Jvb3QvY3BxL2NwcS1jb25maWd1cmF0b3Itb3ZlcnZpZXcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7OztBQUV4Rjs7Ozs7R0FLRztBQW1CSCxNQUFNLE9BQU8sNkJBQTZCOzswSEFBN0IsNkJBQTZCOzJIQUE3Qiw2QkFBNkIsNkJBSnRDLDJCQUEyQjsySEFJbEIsNkJBQTZCLGFBRjdCLENBQUMsb0JBQW9CLENBQUMsK0JBQStCLENBQUMsQ0FBQyxZQWRoRSxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQ3BCO2dCQUNFLG9EQUFvRDtnQkFDcEQsYUFBYTtnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixTQUFTLEVBQUUsbUJBQW1CO2dCQUM5QixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLHVDQUF1QztpQkFDakQ7Z0JBQ0QsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQzVCO1NBQ0YsQ0FBQztRQUNGLDJCQUEyQjsyRkFJbEIsNkJBQTZCO2tCQWxCekMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWSxDQUFDLFFBQVEsQ0FBQzs0QkFDcEI7Z0NBQ0Usb0RBQW9EO2dDQUNwRCxhQUFhO2dDQUNiLElBQUksRUFBRSxJQUFJO2dDQUNWLFNBQVMsRUFBRSxtQkFBbUI7Z0NBQzlCLElBQUksRUFBRTtvQ0FDSixPQUFPLEVBQUUsdUNBQXVDO2lDQUNqRDtnQ0FDRCxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUM7NkJBQzVCO3lCQUNGLENBQUM7d0JBQ0YsMkJBQTJCO3FCQUM1QjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2lCQUNuRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ21zUGFnZUd1YXJkLCBQYWdlTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENwcUNvbmZpZ3VyYXRvckxheW91dE1vZHVsZSB9IGZyb20gJy4vY3BxLWNvbmZpZ3VyYXRvci1sYXlvdXQubW9kdWxlJztcbmltcG9ydCB7IGRlZmF1bHRDcHFPdmVydmlld1JvdXRpbmdDb25maWcgfSBmcm9tICcuL2RlZmF1bHQtY3BxLW92ZXJ2aWV3LXJvdXRpbmctY29uZmlnJztcblxuLyoqXG4gKiBUYWtlcyBjYXJlIG9mIHRoZSBjb25maWd1cmF0aW9uIG92ZXJ2aWV3IHRoYXQgdmlzdWFsaXplcyB0aGUgYXR0cmlidXRlIHZhbHVlIGFzc2lnbm1lbnRzIHRoYXQgaGF2ZSBiZWVuIGRvbmUgYWxyZWFkeSBpbiBhIGNvbmRlbnNlZCwgcmVhZC1vbmx5IGZvcm0uXG4gKiBUaGUgZW5kLXVzZXIgY2FuIHN3aXRjaCBiZXR3ZWVuIHRoZSBpbnRlcmFjdGl2ZSB2aWV3IGFuZCB0aGlzIG92ZXJ2aWV3LlxuICogUHJvdmlkZXMgcm91dGluZywgYXNzaWdubWVudCBvZiBuZyBjb21wb25lbnRzIHRvIENNUyBjb21wb25lbnRzIGFuZCBhc3NpZ25tZW50IG9mIENNUyBjb21wb25lbnRzIHRvIHRoZSBsYXlvdXQgc2xvdHMuXG4gKiBTb21lIG9mIHRoZSBuZyBjb21wb25lbnRzIG9uIHRoaXMgdmlldyAodGFiIGJhciwgcHJpY2Ugc3VtbWFyeSBhbmQgYWRkVG9DYXJ0IGJ1dHRvbikgYXJlIHNoYXJlZCBiZXR3ZWVuIHRoZSBpbnRlcmFjdGl2ZSB2aWV3IGFuZCB0aGUgb3ZlcnZpZXcuXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoW1xuICAgICAge1xuICAgICAgICAvLyBXZSBjYW4gbmVpdGhlciBvbWl0IHRoZSBwYXRoIG5vciBzZXQgdG8gdW5kZWZpbmVkXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY3hSb3V0ZTogJ2NvbmZpZ3VyZU92ZXJ2aWV3Q0xPVURDUFFDT05GSUdVUkFUT1InLFxuICAgICAgICB9LFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0Ntc1BhZ2VHdWFyZF0sXG4gICAgICB9LFxuICAgIF0pLFxuICAgIENwcUNvbmZpZ3VyYXRvckxheW91dE1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdENwcU92ZXJ2aWV3Um91dGluZ0NvbmZpZyldLFxufSlcbmV4cG9ydCBjbGFzcyBDcHFDb25maWd1cmF0b3JPdmVydmlld01vZHVsZSB7fVxuIl19