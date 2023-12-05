/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RulebasedConfiguratorComponentsModule } from './components/rulebased-configurator-components.module';
import { RulebasedConfiguratorCoreModule } from './core/rulebased-configurator-core.module';
import { VariantConfiguratorOccModule } from './occ/variant/variant-configurator-occ.module';
import * as i0 from "@angular/core";
export class RulebasedConfiguratorModule {
}
RulebasedConfiguratorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorModule, imports: [VariantConfiguratorOccModule,
        RulebasedConfiguratorCoreModule,
        RulebasedConfiguratorComponentsModule] });
RulebasedConfiguratorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorModule, imports: [VariantConfiguratorOccModule,
        RulebasedConfiguratorCoreModule,
        RulebasedConfiguratorComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        VariantConfiguratorOccModule,
                        RulebasedConfiguratorCoreModule,
                        RulebasedConfiguratorComponentsModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZWJhc2VkLWNvbmZpZ3VyYXRvci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL3J1bGViYXNlZC1jb25maWd1cmF0b3IubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQzlHLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzVGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLCtDQUErQyxDQUFDOztBQVM3RixNQUFNLE9BQU8sMkJBQTJCOzt3SEFBM0IsMkJBQTJCO3lIQUEzQiwyQkFBMkIsWUFMcEMsNEJBQTRCO1FBQzVCLCtCQUErQjtRQUMvQixxQ0FBcUM7eUhBRzVCLDJCQUEyQixZQUxwQyw0QkFBNEI7UUFDNUIsK0JBQStCO1FBQy9CLHFDQUFxQzsyRkFHNUIsMkJBQTJCO2tCQVB2QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCw0QkFBNEI7d0JBQzVCLCtCQUErQjt3QkFDL0IscUNBQXFDO3FCQUN0QztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSdWxlYmFzZWRDb25maWd1cmF0b3JDb21wb25lbnRzTW9kdWxlIH0gZnJvbSAnLi9jb21wb25lbnRzL3J1bGViYXNlZC1jb25maWd1cmF0b3ItY29tcG9uZW50cy5tb2R1bGUnO1xuaW1wb3J0IHsgUnVsZWJhc2VkQ29uZmlndXJhdG9yQ29yZU1vZHVsZSB9IGZyb20gJy4vY29yZS9ydWxlYmFzZWQtY29uZmlndXJhdG9yLWNvcmUubW9kdWxlJztcbmltcG9ydCB7IFZhcmlhbnRDb25maWd1cmF0b3JPY2NNb2R1bGUgfSBmcm9tICcuL29jYy92YXJpYW50L3ZhcmlhbnQtY29uZmlndXJhdG9yLW9jYy5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgVmFyaWFudENvbmZpZ3VyYXRvck9jY01vZHVsZSxcbiAgICBSdWxlYmFzZWRDb25maWd1cmF0b3JDb3JlTW9kdWxlLFxuICAgIFJ1bGViYXNlZENvbmZpZ3VyYXRvckNvbXBvbmVudHNNb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFJ1bGViYXNlZENvbmZpZ3VyYXRvck1vZHVsZSB7fVxuIl19