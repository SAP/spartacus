/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { ConfiguratorPriceModule } from '../price/configurator-price.module';
import { ConfiguratorOverviewBundleAttributeComponent } from './configurator-overview-bundle-attribute.component';
import * as i0 from "@angular/core";
export class ConfiguratorOverviewBundleAttributeModule {
}
ConfiguratorOverviewBundleAttributeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewBundleAttributeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewBundleAttributeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewBundleAttributeModule, declarations: [ConfiguratorOverviewBundleAttributeComponent], imports: [CommonModule, MediaModule, I18nModule, ConfiguratorPriceModule], exports: [ConfiguratorOverviewBundleAttributeComponent] });
ConfiguratorOverviewBundleAttributeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewBundleAttributeModule, imports: [CommonModule, MediaModule, I18nModule, ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewBundleAttributeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MediaModule, I18nModule, ConfiguratorPriceModule],
                    declarations: [ConfiguratorOverviewBundleAttributeComponent],
                    exports: [ConfiguratorOverviewBundleAttributeComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdG9yLW92ZXJ2aWV3LWJ1bmRsZS1hdHRyaWJ1dGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QtY29uZmlndXJhdG9yL3J1bGViYXNlZC9jb21wb25lbnRzL292ZXJ2aWV3LWJ1bmRsZS1hdHRyaWJ1dGUvY29uZmlndXJhdG9yLW92ZXJ2aWV3LWJ1bmRsZS1hdHRyaWJ1dGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSw0Q0FBNEMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDOztBQU9sSCxNQUFNLE9BQU8seUNBQXlDOztzSUFBekMseUNBQXlDO3VJQUF6Qyx5Q0FBeUMsaUJBSHJDLDRDQUE0QyxhQURqRCxZQUFZLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsYUFFOUQsNENBQTRDO3VJQUUzQyx5Q0FBeUMsWUFKMUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsdUJBQXVCOzJGQUk3RCx5Q0FBeUM7a0JBTHJELFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsdUJBQXVCLENBQUM7b0JBQ3pFLFlBQVksRUFBRSxDQUFDLDRDQUE0QyxDQUFDO29CQUM1RCxPQUFPLEVBQUUsQ0FBQyw0Q0FBNEMsQ0FBQztpQkFDeEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTWVkaWFNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ29uZmlndXJhdG9yUHJpY2VNb2R1bGUgfSBmcm9tICcuLi9wcmljZS9jb25maWd1cmF0b3ItcHJpY2UubW9kdWxlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvck92ZXJ2aWV3QnVuZGxlQXR0cmlidXRlQ29tcG9uZW50IH0gZnJvbSAnLi9jb25maWd1cmF0b3Itb3ZlcnZpZXctYnVuZGxlLWF0dHJpYnV0ZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNZWRpYU1vZHVsZSwgSTE4bk1vZHVsZSwgQ29uZmlndXJhdG9yUHJpY2VNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtDb25maWd1cmF0b3JPdmVydmlld0J1bmRsZUF0dHJpYnV0ZUNvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDb25maWd1cmF0b3JPdmVydmlld0J1bmRsZUF0dHJpYnV0ZUNvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRvck92ZXJ2aWV3QnVuZGxlQXR0cmlidXRlTW9kdWxlIHt9XG4iXX0=