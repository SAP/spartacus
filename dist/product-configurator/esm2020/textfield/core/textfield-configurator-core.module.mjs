/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { ConfiguratorTextfieldConnector } from './connectors/configurator-textfield.connector';
import { ConfiguratorTextfieldStoreModule } from './state/configurator-textfield-store.module';
import * as i0 from "@angular/core";
/**
 * Exposes the textfield configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
export class TextfieldConfiguratorCoreModule {
}
TextfieldConfiguratorCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextfieldConfiguratorCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorCoreModule, imports: [ConfiguratorTextfieldStoreModule] });
TextfieldConfiguratorCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorCoreModule, providers: [ConfiguratorTextfieldConnector], imports: [ConfiguratorTextfieldStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ConfiguratorTextfieldStoreModule],
                    providers: [ConfiguratorTextfieldConnector],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLWNvbmZpZ3VyYXRvci1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci90ZXh0ZmllbGQvY29yZS90ZXh0ZmllbGQtY29uZmlndXJhdG9yLWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBQy9GLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOztBQUUvRjs7O0dBR0c7QUFLSCxNQUFNLE9BQU8sK0JBQStCOzs0SEFBL0IsK0JBQStCOzZIQUEvQiwrQkFBK0IsWUFIaEMsZ0NBQWdDOzZIQUcvQiwrQkFBK0IsYUFGL0IsQ0FBQyw4QkFBOEIsQ0FBQyxZQURqQyxnQ0FBZ0M7MkZBRy9CLCtCQUErQjtrQkFKM0MsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztvQkFDM0MsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7aUJBQzVDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclRleHRmaWVsZENvbm5lY3RvciB9IGZyb20gJy4vY29ubmVjdG9ycy9jb25maWd1cmF0b3ItdGV4dGZpZWxkLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JUZXh0ZmllbGRTdG9yZU1vZHVsZSB9IGZyb20gJy4vc3RhdGUvY29uZmlndXJhdG9yLXRleHRmaWVsZC1zdG9yZS5tb2R1bGUnO1xuXG4vKipcbiAqIEV4cG9zZXMgdGhlIHRleHRmaWVsZCBjb25maWd1cmF0b3IgY29yZSBlbnRpdGllcy5cbiAqIEV4cGxpY2l0IHByb3ZpZGluZyBvZiBjb25uZWN0b3IgYmVjYXVzZSBvdGhlcndpc2UgbGF6eSBsb2FkaW5nIGRvZXMgbm90IHdvcmtcbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbmZpZ3VyYXRvclRleHRmaWVsZFN0b3JlTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbQ29uZmlndXJhdG9yVGV4dGZpZWxkQ29ubmVjdG9yXSxcbn0pXG5leHBvcnQgY2xhc3MgVGV4dGZpZWxkQ29uZmlndXJhdG9yQ29yZU1vZHVsZSB7fVxuIl19