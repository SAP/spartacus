/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '@spartacus/core';
import { CONFIGURATOR_FEATURE } from './configurator-state';
import { ConfiguratorEffects } from './effects/index';
import { configuratorReducerProvider, configuratorReducerToken, } from './reducers/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
export class RulebasedConfiguratorStateModule {
}
RulebasedConfiguratorStateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorStateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorStateModule, imports: [CommonModule,
        StateModule, i1.StoreFeatureModule, i2.EffectsFeatureModule] });
RulebasedConfiguratorStateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorStateModule, providers: [configuratorReducerProvider], imports: [CommonModule,
        StateModule,
        StoreModule.forFeature(CONFIGURATOR_FEATURE, configuratorReducerToken),
        EffectsModule.forFeature(ConfiguratorEffects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorStateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StateModule,
                        StoreModule.forFeature(CONFIGURATOR_FEATURE, configuratorReducerToken),
                        EffectsModule.forFeature(ConfiguratorEffects),
                    ],
                    providers: [configuratorReducerProvider],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZWJhc2VkLWNvbmZpZ3VyYXRvci1zdGF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC1jb25maWd1cmF0b3IvcnVsZWJhc2VkL2NvcmUvc3RhdGUvcnVsZWJhc2VkLWNvbmZpZ3VyYXRvci1zdGF0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEQsT0FBTyxFQUNMLDJCQUEyQixFQUMzQix3QkFBd0IsR0FDekIsTUFBTSxrQkFBa0IsQ0FBQzs7OztBQVkxQixNQUFNLE9BQU8sZ0NBQWdDOzs2SEFBaEMsZ0NBQWdDOzhIQUFoQyxnQ0FBZ0MsWUFSekMsWUFBWTtRQUVaLFdBQVc7OEhBTUYsZ0NBQWdDLGFBRmhDLENBQUMsMkJBQTJCLENBQUMsWUFOdEMsWUFBWTtRQUVaLFdBQVc7UUFDWCxXQUFXLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLHdCQUF3QixDQUFDO1FBQ3RFLGFBQWEsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUM7MkZBSXBDLGdDQUFnQztrQkFWNUMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFFWixXQUFXO3dCQUNYLFdBQVcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsd0JBQXdCLENBQUM7d0JBQ3RFLGFBQWEsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUM7cUJBQzlDO29CQUNELFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO2lCQUN6QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWZmZWN0c01vZHVsZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgU3RvcmVNb2R1bGUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBTdGF0ZU1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDT05GSUdVUkFUT1JfRkVBVFVSRSB9IGZyb20gJy4vY29uZmlndXJhdG9yLXN0YXRlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRvckVmZmVjdHMgfSBmcm9tICcuL2VmZmVjdHMvaW5kZXgnO1xuaW1wb3J0IHtcbiAgY29uZmlndXJhdG9yUmVkdWNlclByb3ZpZGVyLFxuICBjb25maWd1cmF0b3JSZWR1Y2VyVG9rZW4sXG59IGZyb20gJy4vcmVkdWNlcnMvaW5kZXgnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuXG4gICAgU3RhdGVNb2R1bGUsXG4gICAgU3RvcmVNb2R1bGUuZm9yRmVhdHVyZShDT05GSUdVUkFUT1JfRkVBVFVSRSwgY29uZmlndXJhdG9yUmVkdWNlclRva2VuKSxcbiAgICBFZmZlY3RzTW9kdWxlLmZvckZlYXR1cmUoQ29uZmlndXJhdG9yRWZmZWN0cyksXG4gIF0sXG4gIHByb3ZpZGVyczogW2NvbmZpZ3VyYXRvclJlZHVjZXJQcm92aWRlcl0sXG59KVxuZXhwb3J0IGNsYXNzIFJ1bGViYXNlZENvbmZpZ3VyYXRvclN0YXRlTW9kdWxlIHt9XG4iXX0=