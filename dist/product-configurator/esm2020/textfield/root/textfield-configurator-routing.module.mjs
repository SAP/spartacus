/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultTextfieldRoutingConfig } from './default-textfield-routing-config';
import * as i0 from "@angular/core";
/**
 * Provides the default cx routing configuration for the textfield configurator
 */
export class TextfieldConfiguratorRoutingModule {
    static forRoot() {
        return {
            ngModule: TextfieldConfiguratorRoutingModule,
            providers: [provideDefaultConfig(defaultTextfieldRoutingConfig)],
        };
    }
}
TextfieldConfiguratorRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextfieldConfiguratorRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRoutingModule });
TextfieldConfiguratorRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRoutingModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorRoutingModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGZpZWxkLWNvbmZpZ3VyYXRvci1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci90ZXh0ZmllbGQvcm9vdC90ZXh0ZmllbGQtY29uZmlndXJhdG9yLXJvdXRpbmcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7QUFFbkY7O0dBRUc7QUFFSCxNQUFNLE9BQU8sa0NBQWtDO0lBQzdDLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxrQ0FBa0M7WUFDNUMsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUMsNkJBQTZCLENBQUMsQ0FBQztTQUNqRSxDQUFDO0lBQ0osQ0FBQzs7K0hBTlUsa0NBQWtDO2dJQUFsQyxrQ0FBa0M7Z0lBQWxDLGtDQUFrQzsyRkFBbEMsa0NBQWtDO2tCQUQ5QyxRQUFRO21CQUFDLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgZGVmYXVsdFRleHRmaWVsZFJvdXRpbmdDb25maWcgfSBmcm9tICcuL2RlZmF1bHQtdGV4dGZpZWxkLXJvdXRpbmctY29uZmlnJztcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgZGVmYXVsdCBjeCByb3V0aW5nIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSB0ZXh0ZmllbGQgY29uZmlndXJhdG9yXG4gKi9cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBUZXh0ZmllbGRDb25maWd1cmF0b3JSb3V0aW5nTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxUZXh0ZmllbGRDb25maWd1cmF0b3JSb3V0aW5nTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBUZXh0ZmllbGRDb25maWd1cmF0b3JSb3V0aW5nTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdFRleHRmaWVsZFJvdXRpbmdDb25maWcpXSxcbiAgICB9O1xuICB9XG59XG4iXX0=