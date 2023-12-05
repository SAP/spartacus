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
import { effects } from './effects/index';
import { MultiCartEffectsService } from './effects/multi-cart-effect.service';
import { MULTI_CART_FEATURE } from './multi-cart-state';
import { multiCartMetaReducers, multiCartReducerProvider, multiCartReducerToken, } from './reducers/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
export class MultiCartStoreModule {
}
MultiCartStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MultiCartStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MultiCartStoreModule, imports: [CommonModule,
        StateModule, i1.StoreFeatureModule, i2.EffectsFeatureModule] });
MultiCartStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartStoreModule, providers: [multiCartReducerProvider, MultiCartEffectsService], imports: [CommonModule,
        StateModule,
        StoreModule.forFeature(MULTI_CART_FEATURE, multiCartReducerToken, {
            metaReducers: multiCartMetaReducers,
        }),
        EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MultiCartStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StateModule,
                        StoreModule.forFeature(MULTI_CART_FEATURE, multiCartReducerToken, {
                            metaReducers: multiCartMetaReducers,
                        }),
                        EffectsModule.forFeature(effects),
                    ],
                    providers: [multiCartReducerProvider, MultiCartEffectsService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktY2FydC1zdG9yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL2NvcmUvc3RvcmUvbXVsdGktY2FydC1zdG9yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3hELE9BQU8sRUFDTCxxQkFBcUIsRUFDckIsd0JBQXdCLEVBQ3hCLHFCQUFxQixHQUN0QixNQUFNLGtCQUFrQixDQUFDOzs7O0FBYTFCLE1BQU0sT0FBTyxvQkFBb0I7O2lIQUFwQixvQkFBb0I7a0hBQXBCLG9CQUFvQixZQVQ3QixZQUFZO1FBQ1osV0FBVztrSEFRRixvQkFBb0IsYUFGcEIsQ0FBQyx3QkFBd0IsRUFBRSx1QkFBdUIsQ0FBQyxZQVA1RCxZQUFZO1FBQ1osV0FBVztRQUNYLFdBQVcsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUU7WUFDaEUsWUFBWSxFQUFFLHFCQUFxQjtTQUNwQyxDQUFDO1FBQ0YsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7MkZBSXhCLG9CQUFvQjtrQkFYaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLFdBQVcsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUscUJBQXFCLEVBQUU7NEJBQ2hFLFlBQVksRUFBRSxxQkFBcUI7eUJBQ3BDLENBQUM7d0JBQ0YsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7cUJBQ2xDO29CQUNELFNBQVMsRUFBRSxDQUFDLHdCQUF3QixFQUFFLHVCQUF1QixDQUFDO2lCQUMvRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRWZmZWN0c01vZHVsZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgU3RvcmVNb2R1bGUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBTdGF0ZU1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBlZmZlY3RzIH0gZnJvbSAnLi9lZmZlY3RzL2luZGV4JztcbmltcG9ydCB7IE11bHRpQ2FydEVmZmVjdHNTZXJ2aWNlIH0gZnJvbSAnLi9lZmZlY3RzL211bHRpLWNhcnQtZWZmZWN0LnNlcnZpY2UnO1xuaW1wb3J0IHsgTVVMVElfQ0FSVF9GRUFUVVJFIH0gZnJvbSAnLi9tdWx0aS1jYXJ0LXN0YXRlJztcbmltcG9ydCB7XG4gIG11bHRpQ2FydE1ldGFSZWR1Y2VycyxcbiAgbXVsdGlDYXJ0UmVkdWNlclByb3ZpZGVyLFxuICBtdWx0aUNhcnRSZWR1Y2VyVG9rZW4sXG59IGZyb20gJy4vcmVkdWNlcnMvaW5kZXgnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFN0YXRlTW9kdWxlLFxuICAgIFN0b3JlTW9kdWxlLmZvckZlYXR1cmUoTVVMVElfQ0FSVF9GRUFUVVJFLCBtdWx0aUNhcnRSZWR1Y2VyVG9rZW4sIHtcbiAgICAgIG1ldGFSZWR1Y2VyczogbXVsdGlDYXJ0TWV0YVJlZHVjZXJzLFxuICAgIH0pLFxuICAgIEVmZmVjdHNNb2R1bGUuZm9yRmVhdHVyZShlZmZlY3RzKSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbbXVsdGlDYXJ0UmVkdWNlclByb3ZpZGVyLCBNdWx0aUNhcnRFZmZlY3RzU2VydmljZV0sXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpQ2FydFN0b3JlTW9kdWxlIHt9XG4iXX0=