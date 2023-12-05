/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE } from './feature-name';
import * as i0 from "@angular/core";
const cmsComponents = ['TextfieldConfigurationForm'];
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultProductConfiguratorTextfieldComponentsConfig() {
    const config = {
        featureModules: {
            [PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE]: {
                cmsComponents,
            },
        },
    };
    return config;
}
/**
 * Contains feature module configuration
 */
export class TextfieldConfiguratorRootFeatureModule {
}
TextfieldConfiguratorRootFeatureModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootFeatureModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextfieldConfiguratorRootFeatureModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootFeatureModule });
TextfieldConfiguratorRootFeatureModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootFeatureModule, providers: [
        provideDefaultConfigFactory(defaultProductConfiguratorTextfieldComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootFeatureModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [
                        provideDefaultConfigFactory(defaultProductConfiguratorTextfieldComponentsConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLWNvbmZpZ3VyYXRvci1yb290LWZlYXR1cmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3RleHRmaWVsZC9yb290L3RleHRmaWVsZC1jb25maWd1cmF0b3Itcm9vdC1mZWF0dXJlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsMkJBQTJCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFeEUsTUFBTSxhQUFhLEdBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBRS9ELDJFQUEyRTtBQUMzRSxNQUFNLFVBQVUsbURBQW1EO0lBQ2pFLE1BQU0sTUFBTSxHQUFjO1FBQ3hCLGNBQWMsRUFBRTtZQUNkLENBQUMsc0NBQXNDLENBQUMsRUFBRTtnQkFDeEMsYUFBYTthQUNkO1NBQ0Y7S0FDRixDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVEOztHQUVHO0FBU0gsTUFBTSxPQUFPLHNDQUFzQzs7bUlBQXRDLHNDQUFzQztvSUFBdEMsc0NBQXNDO29JQUF0QyxzQ0FBc0MsYUFOdEM7UUFDVCwyQkFBMkIsQ0FDekIsbURBQW1ELENBQ3BEO0tBQ0Y7MkZBRVUsc0NBQXNDO2tCQVJsRCxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxFQUFFO29CQUNYLFNBQVMsRUFBRTt3QkFDVCwyQkFBMkIsQ0FDekIsbURBQW1ELENBQ3BEO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENtc0NvbmZpZywgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFBST0RVQ1RfQ09ORklHVVJBVE9SX1RFWFRGSUVMRF9GRUFUVVJFIH0gZnJvbSAnLi9mZWF0dXJlLW5hbWUnO1xuXG5jb25zdCBjbXNDb21wb25lbnRzOiBzdHJpbmdbXSA9IFsnVGV4dGZpZWxkQ29uZmlndXJhdGlvbkZvcm0nXTtcblxuLy8gVE9ETzogSW5saW5lIHRoaXMgZmFjdG9yeSB3aGVuIHdlIHN0YXJ0IHJlbGVhc2luZyBJdnkgY29tcGlsZWQgbGlicmFyaWVzXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFByb2R1Y3RDb25maWd1cmF0b3JUZXh0ZmllbGRDb21wb25lbnRzQ29uZmlnKCk6IENtc0NvbmZpZyB7XG4gIGNvbnN0IGNvbmZpZzogQ21zQ29uZmlnID0ge1xuICAgIGZlYXR1cmVNb2R1bGVzOiB7XG4gICAgICBbUFJPRFVDVF9DT05GSUdVUkFUT1JfVEVYVEZJRUxEX0ZFQVRVUkVdOiB7XG4gICAgICAgIGNtc0NvbXBvbmVudHMsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuLyoqXG4gKiBDb250YWlucyBmZWF0dXJlIG1vZHVsZSBjb25maWd1cmF0aW9uXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnkoXG4gICAgICBkZWZhdWx0UHJvZHVjdENvbmZpZ3VyYXRvclRleHRmaWVsZENvbXBvbmVudHNDb25maWdcbiAgICApLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBUZXh0ZmllbGRDb25maWd1cmF0b3JSb290RmVhdHVyZU1vZHVsZSB7fVxuIl19