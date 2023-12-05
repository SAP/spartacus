/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { CommonConfiguratorModule } from '@spartacus/product-configurator/common';
import { CmsPageGuard, PageLayoutComponent, } from '@spartacus/storefront';
import { TextfieldConfiguratorRootFeatureModule } from './textfield-configurator-root-feature.module';
import { TextfieldConfiguratorRoutingModule } from './textfield-configurator-routing.module';
import * as i0 from "@angular/core";
import * as i1 from "./textfield-configurator-routing.module";
import * as i2 from "@angular/router";
/**
 * Exposes the root modules that we need to statically load. Contains page mappings
 */
export class TextfieldConfiguratorRootModule {
    static forRoot() {
        return {
            ngModule: TextfieldConfiguratorRootModule,
        };
    }
}
TextfieldConfiguratorRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextfieldConfiguratorRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootModule, imports: [CommonModule,
        CommonConfiguratorModule,
        TextfieldConfiguratorRootFeatureModule, i1.TextfieldConfiguratorRoutingModule, i2.RouterModule] });
TextfieldConfiguratorRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootModule, providers: [
        provideDefaultConfig({
            layoutSlots: {
                TextfieldConfigurationTemplate: {
                    slots: ['TextfieldConfigContent'],
                },
            },
        }),
    ], imports: [CommonModule,
        CommonConfiguratorModule,
        TextfieldConfiguratorRootFeatureModule,
        TextfieldConfiguratorRoutingModule.forRoot(),
        RouterModule.forChild([
            {
                // We can neither omit the path nor set to undefined
                // @ts-ignore
                path: null,
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'configureTEXTFIELD',
                },
                canActivate: [CmsPageGuard],
            },
            {
                // We can neither omit the path nor set to undefined
                // @ts-ignore
                path: null,
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'configureOverviewTEXTFIELD',
                },
                canActivate: [CmsPageGuard],
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CommonConfiguratorModule,
                        TextfieldConfiguratorRootFeatureModule,
                        TextfieldConfiguratorRoutingModule.forRoot(),
                        RouterModule.forChild([
                            {
                                // We can neither omit the path nor set to undefined
                                // @ts-ignore
                                path: null,
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'configureTEXTFIELD',
                                },
                                canActivate: [CmsPageGuard],
                            },
                            {
                                // We can neither omit the path nor set to undefined
                                // @ts-ignore
                                path: null,
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'configureOverviewTEXTFIELD',
                                },
                                canActivate: [CmsPageGuard],
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfig({
                            layoutSlots: {
                                TextfieldConfigurationTemplate: {
                                    slots: ['TextfieldConfigContent'],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLWNvbmZpZ3VyYXRvci1yb290Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci90ZXh0ZmllbGQvcm9vdC90ZXh0ZmllbGQtY29uZmlndXJhdG9yLXJvb3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sRUFDTCxZQUFZLEVBRVosbUJBQW1CLEdBQ3BCLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdEcsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7Ozs7QUFFN0Y7O0dBRUc7QUF3Q0gsTUFBTSxPQUFPLCtCQUErQjtJQUMxQyxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsK0JBQStCO1NBQzFDLENBQUM7SUFDSixDQUFDOzs0SEFMVSwrQkFBK0I7NkhBQS9CLCtCQUErQixZQXJDeEMsWUFBWTtRQUNaLHdCQUF3QjtRQUN4QixzQ0FBc0M7NkhBbUM3QiwrQkFBK0IsYUFWL0I7UUFDVCxvQkFBb0IsQ0FBZTtZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsOEJBQThCLEVBQUU7b0JBQzlCLEtBQUssRUFBRSxDQUFDLHdCQUF3QixDQUFDO2lCQUNsQzthQUNGO1NBQ0YsQ0FBQztLQUNILFlBbkNDLFlBQVk7UUFDWix3QkFBd0I7UUFDeEIsc0NBQXNDO1FBQ3RDLGtDQUFrQyxDQUFDLE9BQU8sRUFBRTtRQUM1QyxZQUFZLENBQUMsUUFBUSxDQUFDO1lBQ3BCO2dCQUNFLG9EQUFvRDtnQkFDcEQsYUFBYTtnQkFDYixJQUFJLEVBQUUsSUFBSTtnQkFDVixTQUFTLEVBQUUsbUJBQW1CO2dCQUM5QixJQUFJLEVBQUU7b0JBQ0osT0FBTyxFQUFFLG9CQUFvQjtpQkFDOUI7Z0JBQ0QsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDO2FBQzVCO1lBQ0Q7Z0JBQ0Usb0RBQW9EO2dCQUNwRCxhQUFhO2dCQUNiLElBQUksRUFBRSxJQUFJO2dCQUNWLFNBQVMsRUFBRSxtQkFBbUI7Z0JBQzlCLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsNEJBQTRCO2lCQUN0QztnQkFDRCxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUM7YUFDNUI7U0FDRixDQUFDOzJGQVlPLCtCQUErQjtrQkF2QzNDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osd0JBQXdCO3dCQUN4QixzQ0FBc0M7d0JBQ3RDLGtDQUFrQyxDQUFDLE9BQU8sRUFBRTt3QkFDNUMsWUFBWSxDQUFDLFFBQVEsQ0FBQzs0QkFDcEI7Z0NBQ0Usb0RBQW9EO2dDQUNwRCxhQUFhO2dDQUNiLElBQUksRUFBRSxJQUFJO2dDQUNWLFNBQVMsRUFBRSxtQkFBbUI7Z0NBQzlCLElBQUksRUFBRTtvQ0FDSixPQUFPLEVBQUUsb0JBQW9CO2lDQUM5QjtnQ0FDRCxXQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUM7NkJBQzVCOzRCQUNEO2dDQUNFLG9EQUFvRDtnQ0FDcEQsYUFBYTtnQ0FDYixJQUFJLEVBQUUsSUFBSTtnQ0FDVixTQUFTLEVBQUUsbUJBQW1CO2dDQUM5QixJQUFJLEVBQUU7b0NBQ0osT0FBTyxFQUFFLDRCQUE0QjtpQ0FDdEM7Z0NBQ0QsV0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDOzZCQUM1Qjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBZTs0QkFDakMsV0FBVyxFQUFFO2dDQUNYLDhCQUE4QixFQUFFO29DQUM5QixLQUFLLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztpQ0FDbEM7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENvbW1vbkNvbmZpZ3VyYXRvck1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvcHJvZHVjdC1jb25maWd1cmF0b3IvY29tbW9uJztcbmltcG9ydCB7XG4gIENtc1BhZ2VHdWFyZCxcbiAgTGF5b3V0Q29uZmlnLFxuICBQYWdlTGF5b3V0Q29tcG9uZW50LFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgVGV4dGZpZWxkQ29uZmlndXJhdG9yUm9vdEZlYXR1cmVNb2R1bGUgfSBmcm9tICcuL3RleHRmaWVsZC1jb25maWd1cmF0b3Itcm9vdC1mZWF0dXJlLm1vZHVsZSc7XG5pbXBvcnQgeyBUZXh0ZmllbGRDb25maWd1cmF0b3JSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi90ZXh0ZmllbGQtY29uZmlndXJhdG9yLXJvdXRpbmcubW9kdWxlJztcblxuLyoqXG4gKiBFeHBvc2VzIHRoZSByb290IG1vZHVsZXMgdGhhdCB3ZSBuZWVkIHRvIHN0YXRpY2FsbHkgbG9hZC4gQ29udGFpbnMgcGFnZSBtYXBwaW5nc1xuICovXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENvbW1vbkNvbmZpZ3VyYXRvck1vZHVsZSxcbiAgICBUZXh0ZmllbGRDb25maWd1cmF0b3JSb290RmVhdHVyZU1vZHVsZSxcbiAgICBUZXh0ZmllbGRDb25maWd1cmF0b3JSb3V0aW5nTW9kdWxlLmZvclJvb3QoKSxcbiAgICBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoW1xuICAgICAge1xuICAgICAgICAvLyBXZSBjYW4gbmVpdGhlciBvbWl0IHRoZSBwYXRoIG5vciBzZXQgdG8gdW5kZWZpbmVkXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY3hSb3V0ZTogJ2NvbmZpZ3VyZVRFWFRGSUVMRCcsXG4gICAgICAgIH0sXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQ21zUGFnZUd1YXJkXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIFdlIGNhbiBuZWl0aGVyIG9taXQgdGhlIHBhdGggbm9yIHNldCB0byB1bmRlZmluZWRcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBjeFJvdXRlOiAnY29uZmlndXJlT3ZlcnZpZXdURVhURklFTEQnLFxuICAgICAgICB9LFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0Ntc1BhZ2VHdWFyZF0sXG4gICAgICB9LFxuICAgIF0pLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8TGF5b3V0Q29uZmlnPntcbiAgICAgIGxheW91dFNsb3RzOiB7XG4gICAgICAgIFRleHRmaWVsZENvbmZpZ3VyYXRpb25UZW1wbGF0ZToge1xuICAgICAgICAgIHNsb3RzOiBbJ1RleHRmaWVsZENvbmZpZ0NvbnRlbnQnXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFRleHRmaWVsZENvbmZpZ3VyYXRvclJvb3RNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFRleHRmaWVsZENvbmZpZ3VyYXRvclJvb3RNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFRleHRmaWVsZENvbmZpZ3VyYXRvclJvb3RNb2R1bGUsXG4gICAgfTtcbiAgfVxufVxuIl19