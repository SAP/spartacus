/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Config, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { ConfiguratorMessageConfig } from '../config/configurator-message.config';
import { defaultConfiguratorMessageConfig } from '../config/default-configurator-message.config';
import { ConfiguratorUpdateMessageComponent } from './configurator-update-message.component';
import * as i0 from "@angular/core";
export class ConfiguratorUpdateMessageModule {
}
ConfiguratorUpdateMessageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUpdateMessageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorUpdateMessageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUpdateMessageModule, declarations: [ConfiguratorUpdateMessageComponent], imports: [CommonModule, SpinnerModule, I18nModule], exports: [ConfiguratorUpdateMessageComponent] });
ConfiguratorUpdateMessageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUpdateMessageModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorUpdateMessage: {
                    component: ConfiguratorUpdateMessageComponent,
                },
            },
        }),
        provideDefaultConfig(defaultConfiguratorMessageConfig),
        { provide: ConfiguratorMessageConfig, useExisting: Config },
    ], imports: [CommonModule, SpinnerModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUpdateMessageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SpinnerModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorUpdateMessage: {
                                    component: ConfiguratorUpdateMessageComponent,
                                },
                            },
                        }),
                        provideDefaultConfig(defaultConfiguratorMessageConfig),
                        { provide: ConfiguratorMessageConfig, useExisting: Config },
                    ],
                    declarations: [ConfiguratorUpdateMessageComponent],
                    exports: [ConfiguratorUpdateMessageComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLXVwZGF0ZS1tZXNzYWdlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvY29tcG9uZW50cy91cGRhdGUtbWVzc2FnZS9jb25maWd1cmF0b3ItdXBkYXRlLW1lc3NhZ2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNqRyxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7QUFrQjdGLE1BQU0sT0FBTywrQkFBK0I7OzRIQUEvQiwrQkFBK0I7NkhBQS9CLCtCQUErQixpQkFIM0Isa0NBQWtDLGFBWnZDLFlBQVksRUFBRSxhQUFhLEVBQUUsVUFBVSxhQWF2QyxrQ0FBa0M7NkhBRWpDLCtCQUErQixhQWQvQjtRQUNULG9CQUFvQixDQUFDO1lBQ25CLGFBQWEsRUFBRTtnQkFDYix5QkFBeUIsRUFBRTtvQkFDekIsU0FBUyxFQUFFLGtDQUFrQztpQkFDOUM7YUFDRjtTQUNGLENBQUM7UUFDRixvQkFBb0IsQ0FBQyxnQ0FBZ0MsQ0FBQztRQUN0RCxFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFO0tBQzVELFlBWFMsWUFBWSxFQUFFLGFBQWEsRUFBRSxVQUFVOzJGQWV0QywrQkFBK0I7a0JBaEIzQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDO29CQUNsRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQUM7NEJBQ25CLGFBQWEsRUFBRTtnQ0FDYix5QkFBeUIsRUFBRTtvQ0FDekIsU0FBUyxFQUFFLGtDQUFrQztpQ0FDOUM7NkJBQ0Y7eUJBQ0YsQ0FBQzt3QkFDRixvQkFBb0IsQ0FBQyxnQ0FBZ0MsQ0FBQzt3QkFDdEQsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRTtxQkFDNUQ7b0JBQ0QsWUFBWSxFQUFFLENBQUMsa0NBQWtDLENBQUM7b0JBQ2xELE9BQU8sRUFBRSxDQUFDLGtDQUFrQyxDQUFDO2lCQUM5QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnLCBJMThuTW9kdWxlLCBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTcGlubmVyTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENvbmZpZ3VyYXRvck1lc3NhZ2VDb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uZmlndXJhdG9yLW1lc3NhZ2UuY29uZmlnJztcbmltcG9ydCB7IGRlZmF1bHRDb25maWd1cmF0b3JNZXNzYWdlQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL2RlZmF1bHQtY29uZmlndXJhdG9yLW1lc3NhZ2UuY29uZmlnJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvclVwZGF0ZU1lc3NhZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci11cGRhdGUtbWVzc2FnZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTcGlubmVyTW9kdWxlLCBJMThuTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoe1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBDb25maWd1cmF0b3JVcGRhdGVNZXNzYWdlOiB7XG4gICAgICAgICAgY29tcG9uZW50OiBDb25maWd1cmF0b3JVcGRhdGVNZXNzYWdlQ29tcG9uZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0Q29uZmlndXJhdG9yTWVzc2FnZUNvbmZpZyksXG4gICAgeyBwcm92aWRlOiBDb25maWd1cmF0b3JNZXNzYWdlQ29uZmlnLCB1c2VFeGlzdGluZzogQ29uZmlnIH0sXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0NvbmZpZ3VyYXRvclVwZGF0ZU1lc3NhZ2VDb21wb25lbnRdLFxuICBleHBvcnRzOiBbQ29uZmlndXJhdG9yVXBkYXRlTWVzc2FnZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvclVwZGF0ZU1lc3NhZ2VNb2R1bGUge31cbiJdfQ==