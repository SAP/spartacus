/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ConfiguratorRestartDialogComponent } from './configurator-restart-dialog.component';
import { defaultConfiguratorRestartDialogLayoutConfig } from './default-configurator-restart-dialog-layout.config';
import * as i0 from "@angular/core";
export class ConfiguratorRestartDialogModule {
}
ConfiguratorRestartDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRestartDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorRestartDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRestartDialogModule, declarations: [ConfiguratorRestartDialogComponent], imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule] });
ConfiguratorRestartDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRestartDialogModule, providers: [
        provideDefaultConfig(defaultConfiguratorRestartDialogLayoutConfig),
    ], imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRestartDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfiguratorRestartDialogComponent],
                    imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
                    providers: [
                        provideDefaultConfig(defaultConfiguratorRestartDialogLayoutConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXJlc3RhcnQtZGlhbG9nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy9yZXN0YXJ0LWRpYWxvZy9jb25maWd1cmF0b3ItcmVzdGFydC1kaWFsb2cubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQzdGLE9BQU8sRUFBRSw0Q0FBNEMsRUFBRSxNQUFNLHFEQUFxRCxDQUFDOztBQVNuSCxNQUFNLE9BQU8sK0JBQStCOzs0SEFBL0IsK0JBQStCOzZIQUEvQiwrQkFBK0IsaUJBTjNCLGtDQUFrQyxhQUN2QyxZQUFZLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxtQkFBbUI7NkhBS3hELCtCQUErQixhQUovQjtRQUNULG9CQUFvQixDQUFDLDRDQUE0QyxDQUFDO0tBQ25FLFlBSFMsWUFBWSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsbUJBQW1COzJGQUt4RCwrQkFBK0I7a0JBUDNDLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFLENBQUMsa0NBQWtDLENBQUM7b0JBQ2xELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixDQUFDO29CQUNwRSxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQUMsNENBQTRDLENBQUM7cUJBQ25FO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBJY29uTW9kdWxlLCBLZXlib2FyZEZvY3VzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclJlc3RhcnREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1yZXN0YXJ0LWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdENvbmZpZ3VyYXRvclJlc3RhcnREaWFsb2dMYXlvdXRDb25maWcgfSBmcm9tICcuL2RlZmF1bHQtY29uZmlndXJhdG9yLXJlc3RhcnQtZGlhbG9nLWxheW91dC5jb25maWcnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JSZXN0YXJ0RGlhbG9nQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgSWNvbk1vZHVsZSwgS2V5Ym9hcmRGb2N1c01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRDb25maWd1cmF0b3JSZXN0YXJ0RGlhbG9nTGF5b3V0Q29uZmlnKSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yUmVzdGFydERpYWxvZ01vZHVsZSB7fVxuIl19