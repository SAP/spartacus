/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_CONFIGURATOR_RULEBASED_FEATURE } from './feature-name';
import * as i0 from "@angular/core";
const cmsComponents = [
    'ConfiguratorForm',
    'ConfiguratorOverviewForm',
    'ConfiguratorOverviewMenu',
    'ConfiguratorUpdateMessage',
    'ConfiguratorAddToCartButton',
    'ConfiguratorMenu',
    'ConfiguratorGroupTitle',
    'ConfiguratorOverviewBanner',
    'ConfiguratorPrevNext',
    'ConfiguratorPriceSummary',
    'ConfiguratorProductTitle',
    'ConfiguratorTabBar',
    'ConfiguratorExitButton',
    'ConfiguratorVariantCarousel',
    'CpqConfiguratorConflictAndErrorMessagesComponent',
    'ConfiguratorOverviewFilterButton',
    'ConfiguratorOverviewFilter',
    'ConfiguratorOverviewSidebar',
];
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultProductConfiguratorRulebasedComponentsConfig() {
    const config = {
        featureModules: {
            [PRODUCT_CONFIGURATOR_RULEBASED_FEATURE]: {
                cmsComponents,
            },
        },
    };
    return config;
}
/**
 * Contains feature module configuration
 */
export class RulebasedConfiguratorRootFeatureModule {
}
RulebasedConfiguratorRootFeatureModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootFeatureModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorRootFeatureModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootFeatureModule });
RulebasedConfiguratorRootFeatureModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootFeatureModule, providers: [
        provideDefaultConfigFactory(defaultProductConfiguratorRulebasedComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootFeatureModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [
                        provideDefaultConfigFactory(defaultProductConfiguratorRulebasedComponentsConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZWJhc2VkLWNvbmZpZ3VyYXRvci1yb290LWZlYXR1cmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9yb290L3J1bGViYXNlZC1jb25maWd1cmF0b3Itcm9vdC1mZWF0dXJlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsMkJBQTJCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFeEUsTUFBTSxhQUFhLEdBQWE7SUFDOUIsa0JBQWtCO0lBQ2xCLDBCQUEwQjtJQUMxQiwwQkFBMEI7SUFDMUIsMkJBQTJCO0lBQzNCLDZCQUE2QjtJQUM3QixrQkFBa0I7SUFDbEIsd0JBQXdCO0lBQ3hCLDRCQUE0QjtJQUM1QixzQkFBc0I7SUFDdEIsMEJBQTBCO0lBQzFCLDBCQUEwQjtJQUMxQixvQkFBb0I7SUFDcEIsd0JBQXdCO0lBQ3hCLDZCQUE2QjtJQUM3QixrREFBa0Q7SUFDbEQsa0NBQWtDO0lBQ2xDLDRCQUE0QjtJQUM1Qiw2QkFBNkI7Q0FDOUIsQ0FBQztBQUVGLDJFQUEyRTtBQUMzRSxNQUFNLFVBQVUsbURBQW1EO0lBQ2pFLE1BQU0sTUFBTSxHQUFjO1FBQ3hCLGNBQWMsRUFBRTtZQUNkLENBQUMsc0NBQXNDLENBQUMsRUFBRTtnQkFDeEMsYUFBYTthQUNkO1NBQ0Y7S0FDRixDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVEOztHQUVHO0FBU0gsTUFBTSxPQUFPLHNDQUFzQzs7bUlBQXRDLHNDQUFzQztvSUFBdEMsc0NBQXNDO29JQUF0QyxzQ0FBc0MsYUFOdEM7UUFDVCwyQkFBMkIsQ0FDekIsbURBQW1ELENBQ3BEO0tBQ0Y7MkZBRVUsc0NBQXNDO2tCQVJsRCxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxFQUFFO29CQUNYLFNBQVMsRUFBRTt3QkFDVCwyQkFBMkIsQ0FDekIsbURBQW1ELENBQ3BEO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENtc0NvbmZpZywgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFBST0RVQ1RfQ09ORklHVVJBVE9SX1JVTEVCQVNFRF9GRUFUVVJFIH0gZnJvbSAnLi9mZWF0dXJlLW5hbWUnO1xuXG5jb25zdCBjbXNDb21wb25lbnRzOiBzdHJpbmdbXSA9IFtcbiAgJ0NvbmZpZ3VyYXRvckZvcm0nLFxuICAnQ29uZmlndXJhdG9yT3ZlcnZpZXdGb3JtJyxcbiAgJ0NvbmZpZ3VyYXRvck92ZXJ2aWV3TWVudScsXG4gICdDb25maWd1cmF0b3JVcGRhdGVNZXNzYWdlJyxcbiAgJ0NvbmZpZ3VyYXRvckFkZFRvQ2FydEJ1dHRvbicsXG4gICdDb25maWd1cmF0b3JNZW51JyxcbiAgJ0NvbmZpZ3VyYXRvckdyb3VwVGl0bGUnLFxuICAnQ29uZmlndXJhdG9yT3ZlcnZpZXdCYW5uZXInLFxuICAnQ29uZmlndXJhdG9yUHJldk5leHQnLFxuICAnQ29uZmlndXJhdG9yUHJpY2VTdW1tYXJ5JyxcbiAgJ0NvbmZpZ3VyYXRvclByb2R1Y3RUaXRsZScsXG4gICdDb25maWd1cmF0b3JUYWJCYXInLFxuICAnQ29uZmlndXJhdG9yRXhpdEJ1dHRvbicsXG4gICdDb25maWd1cmF0b3JWYXJpYW50Q2Fyb3VzZWwnLFxuICAnQ3BxQ29uZmlndXJhdG9yQ29uZmxpY3RBbmRFcnJvck1lc3NhZ2VzQ29tcG9uZW50JyxcbiAgJ0NvbmZpZ3VyYXRvck92ZXJ2aWV3RmlsdGVyQnV0dG9uJyxcbiAgJ0NvbmZpZ3VyYXRvck92ZXJ2aWV3RmlsdGVyJyxcbiAgJ0NvbmZpZ3VyYXRvck92ZXJ2aWV3U2lkZWJhcicsXG5dO1xuXG4vLyBUT0RPOiBJbmxpbmUgdGhpcyBmYWN0b3J5IHdoZW4gd2Ugc3RhcnQgcmVsZWFzaW5nIEl2eSBjb21waWxlZCBsaWJyYXJpZXNcbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0UHJvZHVjdENvbmZpZ3VyYXRvclJ1bGViYXNlZENvbXBvbmVudHNDb25maWcoKTogQ21zQ29uZmlnIHtcbiAgY29uc3QgY29uZmlnOiBDbXNDb25maWcgPSB7XG4gICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgIFtQUk9EVUNUX0NPTkZJR1VSQVRPUl9SVUxFQkFTRURfRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50cyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG4vKipcbiAqIENvbnRhaW5zIGZlYXR1cmUgbW9kdWxlIGNvbmZpZ3VyYXRpb25cbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeShcbiAgICAgIGRlZmF1bHRQcm9kdWN0Q29uZmlndXJhdG9yUnVsZWJhc2VkQ29tcG9uZW50c0NvbmZpZ1xuICAgICksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFJ1bGViYXNlZENvbmZpZ3VyYXRvclJvb3RGZWF0dXJlTW9kdWxlIHt9XG4iXX0=