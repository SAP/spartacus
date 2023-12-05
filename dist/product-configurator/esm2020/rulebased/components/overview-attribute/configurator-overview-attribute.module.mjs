/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfiguratorPriceModule } from '../price/configurator-price.module';
import { ConfiguratorOverviewAttributeComponent } from './configurator-overview-attribute.component';
import * as i0 from "@angular/core";
export class ConfiguratorOverviewAttributeModule {
}
ConfiguratorOverviewAttributeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewAttributeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewAttributeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewAttributeModule, declarations: [ConfiguratorOverviewAttributeComponent], imports: [CommonModule, I18nModule, ConfiguratorPriceModule], exports: [ConfiguratorOverviewAttributeComponent] });
ConfiguratorOverviewAttributeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewAttributeModule, imports: [CommonModule, I18nModule, ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewAttributeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, ConfiguratorPriceModule],
                    declarations: [ConfiguratorOverviewAttributeComponent],
                    exports: [ConfiguratorOverviewAttributeComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLW92ZXJ2aWV3LWF0dHJpYnV0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvbXBvbmVudHMvb3ZlcnZpZXctYXR0cmlidXRlL2NvbmZpZ3VyYXRvci1vdmVydmlldy1hdHRyaWJ1dGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDN0UsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7O0FBT3JHLE1BQU0sT0FBTyxtQ0FBbUM7O2dJQUFuQyxtQ0FBbUM7aUlBQW5DLG1DQUFtQyxpQkFIL0Isc0NBQXNDLGFBRDNDLFlBQVksRUFBRSxVQUFVLEVBQUUsdUJBQXVCLGFBRWpELHNDQUFzQztpSUFFckMsbUNBQW1DLFlBSnBDLFlBQVksRUFBRSxVQUFVLEVBQUUsdUJBQXVCOzJGQUloRCxtQ0FBbUM7a0JBTC9DLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsQ0FBQztvQkFDNUQsWUFBWSxFQUFFLENBQUMsc0NBQXNDLENBQUM7b0JBQ3RELE9BQU8sRUFBRSxDQUFDLHNDQUFzQyxDQUFDO2lCQUNsRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSTE4bk1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0b3JQcmljZU1vZHVsZSB9IGZyb20gJy4uL3ByaWNlL2NvbmZpZ3VyYXRvci1wcmljZS5tb2R1bGUnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yT3ZlcnZpZXdBdHRyaWJ1dGVDb21wb25lbnQgfSBmcm9tICcuL2NvbmZpZ3VyYXRvci1vdmVydmlldy1hdHRyaWJ1dGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSTE4bk1vZHVsZSwgQ29uZmlndXJhdG9yUHJpY2VNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JPdmVydmlld0F0dHJpYnV0ZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JPdmVydmlld0F0dHJpYnV0ZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvck92ZXJ2aWV3QXR0cmlidXRlTW9kdWxlIHt9XG4iXX0=