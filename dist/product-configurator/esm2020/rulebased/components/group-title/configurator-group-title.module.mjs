/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { ConfiguratorGroupTitleComponent } from './configurator-group-title.component';
import { HamburgerMenuModule } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export class ConfiguratorGroupTitleModule {
}
ConfiguratorGroupTitleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupTitleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorGroupTitleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupTitleModule, declarations: [ConfiguratorGroupTitleComponent], imports: [CommonModule, HamburgerMenuModule], exports: [ConfiguratorGroupTitleComponent] });
ConfiguratorGroupTitleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupTitleModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorGroupTitle: {
                    component: ConfiguratorGroupTitleComponent,
                },
            },
        }),
    ], imports: [CommonModule, HamburgerMenuModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupTitleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, HamburgerMenuModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorGroupTitle: {
                                    component: ConfiguratorGroupTitleComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorGroupTitleComponent],
                    exports: [ConfiguratorGroupTitleComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWdyb3VwLXRpdGxlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9ncm91cC10aXRsZS9jb25maWd1cmF0b3ItZ3JvdXAtdGl0bGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQWEsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFnQjVELE1BQU0sT0FBTyw0QkFBNEI7O3lIQUE1Qiw0QkFBNEI7MEhBQTVCLDRCQUE0QixpQkFIeEIsK0JBQStCLGFBVnBDLFlBQVksRUFBRSxtQkFBbUIsYUFXakMsK0JBQStCOzBIQUU5Qiw0QkFBNEIsYUFaNUI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2Isc0JBQXNCLEVBQUU7b0JBQ3RCLFNBQVMsRUFBRSwrQkFBK0I7aUJBQzNDO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFUUyxZQUFZLEVBQUUsbUJBQW1COzJGQWFoQyw0QkFBNEI7a0JBZHhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDO29CQUM1QyxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYixzQkFBc0IsRUFBRTtvQ0FDdEIsU0FBUyxFQUFFLCtCQUErQjtpQ0FDM0M7NkJBQ0Y7eUJBQ0YsQ0FBQztxQkFDSDtvQkFDRCxZQUFZLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztvQkFDL0MsT0FBTyxFQUFFLENBQUMsK0JBQStCLENBQUM7aUJBQzNDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDbXNDb25maWcsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckdyb3VwVGl0bGVDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1ncm91cC10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSGFtYnVyZ2VyTWVudU1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEhhbWJ1cmdlck1lbnVNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgQ29uZmlndXJhdG9yR3JvdXBUaXRsZToge1xuICAgICAgICAgIGNvbXBvbmVudDogQ29uZmlndXJhdG9yR3JvdXBUaXRsZUNvbXBvbmVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvckdyb3VwVGl0bGVDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ29uZmlndXJhdG9yR3JvdXBUaXRsZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvckdyb3VwVGl0bGVNb2R1bGUge31cbiJdfQ==