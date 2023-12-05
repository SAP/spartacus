/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonConfiguratorModule } from '@spartacus/product-configurator/common';
import { RulebasedConfiguratorRootFeatureModule } from './rulebased-configurator-root-feature.module';
import { RulebasedConfiguratorRoutingModule } from './rulebased-configurator-routing.module';
import { VariantConfiguratorInteractiveModule } from './variant/variant-configurator-interactive.module';
import { VariantConfiguratorOverviewModule } from './variant/variant-configurator-overview.module';
import * as i0 from "@angular/core";
import * as i1 from "./rulebased-configurator-routing.module";
/**
 * Exposes the root modules that we need to load statically. Contains page mappings, route configurations
 * and feature configuration
 */
export class RulebasedConfiguratorRootModule {
    static forRoot() {
        return {
            ngModule: RulebasedConfiguratorRootModule,
        };
    }
}
RulebasedConfiguratorRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootModule, imports: [CommonModule,
        CommonConfiguratorModule,
        RulebasedConfiguratorRootFeatureModule,
        VariantConfiguratorInteractiveModule,
        VariantConfiguratorOverviewModule, i1.RulebasedConfiguratorRoutingModule] });
RulebasedConfiguratorRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootModule, imports: [CommonModule,
        CommonConfiguratorModule,
        RulebasedConfiguratorRootFeatureModule,
        VariantConfiguratorInteractiveModule,
        VariantConfiguratorOverviewModule,
        RulebasedConfiguratorRoutingModule.forRoot()] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CommonConfiguratorModule,
                        RulebasedConfiguratorRootFeatureModule,
                        VariantConfiguratorInteractiveModule,
                        VariantConfiguratorOverviewModule,
                        RulebasedConfiguratorRoutingModule.forRoot(),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZWJhc2VkLWNvbmZpZ3VyYXRvci1yb290Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9ydWxlYmFzZWQvcm9vdC9ydWxlYmFzZWQtY29uZmlndXJhdG9yLXJvb3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDdEcsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0YsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDekcsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7OztBQUVuRzs7O0dBR0c7QUFXSCxNQUFNLE9BQU8sK0JBQStCO0lBQzFDLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSwrQkFBK0I7U0FDMUMsQ0FBQztJQUNKLENBQUM7OzRIQUxVLCtCQUErQjs2SEFBL0IsK0JBQStCLFlBUnhDLFlBQVk7UUFDWix3QkFBd0I7UUFDeEIsc0NBQXNDO1FBQ3RDLG9DQUFvQztRQUNwQyxpQ0FBaUM7NkhBSXhCLCtCQUErQixZQVJ4QyxZQUFZO1FBQ1osd0JBQXdCO1FBQ3hCLHNDQUFzQztRQUN0QyxvQ0FBb0M7UUFDcEMsaUNBQWlDO1FBQ2pDLGtDQUFrQyxDQUFDLE9BQU8sRUFBRTsyRkFHbkMsK0JBQStCO2tCQVYzQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLHdCQUF3Qjt3QkFDeEIsc0NBQXNDO3dCQUN0QyxvQ0FBb0M7d0JBQ3BDLGlDQUFpQzt3QkFDakMsa0NBQWtDLENBQUMsT0FBTyxFQUFFO3FCQUM3QztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uQ29uZmlndXJhdG9yTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9wcm9kdWN0LWNvbmZpZ3VyYXRvci9jb21tb24nO1xuaW1wb3J0IHsgUnVsZWJhc2VkQ29uZmlndXJhdG9yUm9vdEZlYXR1cmVNb2R1bGUgfSBmcm9tICcuL3J1bGViYXNlZC1jb25maWd1cmF0b3Itcm9vdC1mZWF0dXJlLm1vZHVsZSc7XG5pbXBvcnQgeyBSdWxlYmFzZWRDb25maWd1cmF0b3JSb3V0aW5nTW9kdWxlIH0gZnJvbSAnLi9ydWxlYmFzZWQtY29uZmlndXJhdG9yLXJvdXRpbmcubW9kdWxlJztcbmltcG9ydCB7IFZhcmlhbnRDb25maWd1cmF0b3JJbnRlcmFjdGl2ZU1vZHVsZSB9IGZyb20gJy4vdmFyaWFudC92YXJpYW50LWNvbmZpZ3VyYXRvci1pbnRlcmFjdGl2ZS5tb2R1bGUnO1xuaW1wb3J0IHsgVmFyaWFudENvbmZpZ3VyYXRvck92ZXJ2aWV3TW9kdWxlIH0gZnJvbSAnLi92YXJpYW50L3ZhcmlhbnQtY29uZmlndXJhdG9yLW92ZXJ2aWV3Lm1vZHVsZSc7XG5cbi8qKlxuICogRXhwb3NlcyB0aGUgcm9vdCBtb2R1bGVzIHRoYXQgd2UgbmVlZCB0byBsb2FkIHN0YXRpY2FsbHkuIENvbnRhaW5zIHBhZ2UgbWFwcGluZ3MsIHJvdXRlIGNvbmZpZ3VyYXRpb25zXG4gKiBhbmQgZmVhdHVyZSBjb25maWd1cmF0aW9uXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ29tbW9uQ29uZmlndXJhdG9yTW9kdWxlLFxuICAgIFJ1bGViYXNlZENvbmZpZ3VyYXRvclJvb3RGZWF0dXJlTW9kdWxlLFxuICAgIFZhcmlhbnRDb25maWd1cmF0b3JJbnRlcmFjdGl2ZU1vZHVsZSxcbiAgICBWYXJpYW50Q29uZmlndXJhdG9yT3ZlcnZpZXdNb2R1bGUsXG4gICAgUnVsZWJhc2VkQ29uZmlndXJhdG9yUm91dGluZ01vZHVsZS5mb3JSb290KCksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFJ1bGViYXNlZENvbmZpZ3VyYXRvclJvb3RNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFJ1bGViYXNlZENvbmZpZ3VyYXRvclJvb3RNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFJ1bGViYXNlZENvbmZpZ3VyYXRvclJvb3RNb2R1bGUsXG4gICAgfTtcbiAgfVxufVxuIl19