/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ItemCounterModule, KeyboardFocusModule } from '@spartacus/storefront';
import { defaultConfiguratorUISettingsConfig } from '../../config/default-configurator-ui-settings.config';
import { ConfiguratorAttributeQuantityComponent } from './configurator-attribute-quantity.component';
import * as i0 from "@angular/core";
export class ConfiguratorAttributeQuantityModule {
}
ConfiguratorAttributeQuantityModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeQuantityModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityModule, declarations: [ConfiguratorAttributeQuantityComponent], imports: [CommonModule, I18nModule, ItemCounterModule, KeyboardFocusModule], exports: [ConfiguratorAttributeQuantityComponent] });
ConfiguratorAttributeQuantityModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityModule, providers: [provideDefaultConfig(defaultConfiguratorUISettingsConfig)], imports: [CommonModule, I18nModule, ItemCounterModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfiguratorAttributeQuantityComponent],
                    exports: [ConfiguratorAttributeQuantityComponent],
                    imports: [CommonModule, I18nModule, ItemCounterModule, KeyboardFocusModule],
                    providers: [provideDefaultConfig(defaultConfiguratorUISettingsConfig)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvYXR0cmlidXRlL3F1YW50aXR5L2NvbmZpZ3VyYXRvci1hdHRyaWJ1dGUtcXVhbnRpdHkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDL0UsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDM0csT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7O0FBUXJHLE1BQU0sT0FBTyxtQ0FBbUM7O2dJQUFuQyxtQ0FBbUM7aUlBQW5DLG1DQUFtQyxpQkFML0Isc0NBQXNDLGFBRTNDLFlBQVksRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLGFBRGhFLHNDQUFzQztpSUFJckMsbUNBQW1DLGFBRm5DLENBQUMsb0JBQW9CLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxZQUQ1RCxZQUFZLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQjsyRkFHL0QsbUNBQW1DO2tCQU4vQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLHNDQUFzQyxDQUFDO29CQUN0RCxPQUFPLEVBQUUsQ0FBQyxzQ0FBc0MsQ0FBQztvQkFDakQsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQztvQkFDM0UsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUMsbUNBQW1DLENBQUMsQ0FBQztpQkFDdkUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEl0ZW1Db3VudGVyTW9kdWxlLCBLZXlib2FyZEZvY3VzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IGRlZmF1bHRDb25maWd1cmF0b3JVSVNldHRpbmdzQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlnL2RlZmF1bHQtY29uZmlndXJhdG9yLXVpLXNldHRpbmdzLmNvbmZpZyc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eUNvbXBvbmVudCB9IGZyb20gJy4vY29uZmlndXJhdG9yLWF0dHJpYnV0ZS1xdWFudGl0eS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JBdHRyaWJ1dGVRdWFudGl0eUNvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEkxOG5Nb2R1bGUsIEl0ZW1Db3VudGVyTW9kdWxlLCBLZXlib2FyZEZvY3VzTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdENvbmZpZ3VyYXRvclVJU2V0dGluZ3NDb25maWcpXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdG9yQXR0cmlidXRlUXVhbnRpdHlNb2R1bGUge31cbiJdfQ==