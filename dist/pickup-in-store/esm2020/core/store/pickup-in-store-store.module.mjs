/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects } from './effects/index';
import { PICKUP_LOCATIONS_FEATURE } from './pickup-location-state';
import { PICKUP_OPTION_FEATURE } from './pickup-option-state';
import { pickupLocationsMetaReducers, pickupLocationsReducersProvider, pickupLocationsReducersToken, pickupOptionMetaReducers, pickupOptionReducersProvider, pickupOptionReducersToken, stockMetaReducers, stockReducersProvider, stockReducersToken, } from './reducers/index';
import { STOCK_FEATURE } from './stock-state';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@ngrx/effects";
export class PickupInStoreStoreModule {
}
PickupInStoreStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PickupInStoreStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreStoreModule, imports: [CommonModule, i1.StoreFeatureModule, i1.StoreFeatureModule, i1.StoreFeatureModule, i2.EffectsFeatureModule] });
PickupInStoreStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreStoreModule, providers: [
        pickupLocationsReducersProvider,
        pickupOptionReducersProvider,
        stockReducersProvider,
    ], imports: [CommonModule,
        StoreModule.forFeature(PICKUP_LOCATIONS_FEATURE, pickupLocationsReducersToken, {
            metaReducers: pickupLocationsMetaReducers,
        }),
        StoreModule.forFeature(PICKUP_OPTION_FEATURE, pickupOptionReducersToken, {
            metaReducers: pickupOptionMetaReducers,
        }),
        StoreModule.forFeature(STOCK_FEATURE, stockReducersToken, {
            metaReducers: stockMetaReducers,
        }),
        EffectsModule.forFeature(effects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupInStoreStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StoreModule.forFeature(PICKUP_LOCATIONS_FEATURE, pickupLocationsReducersToken, {
                            metaReducers: pickupLocationsMetaReducers,
                        }),
                        StoreModule.forFeature(PICKUP_OPTION_FEATURE, pickupOptionReducersToken, {
                            metaReducers: pickupOptionMetaReducers,
                        }),
                        StoreModule.forFeature(STOCK_FEATURE, stockReducersToken, {
                            metaReducers: stockMetaReducers,
                        }),
                        EffectsModule.forFeature(effects),
                    ],
                    providers: [
                        pickupLocationsReducersProvider,
                        pickupOptionReducersProvider,
                        stockReducersProvider,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLWluLXN0b3JlLXN0b3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9waWNrdXAtaW4tc3RvcmUvY29yZS9zdG9yZS9waWNrdXAtaW4tc3RvcmUtc3RvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFMUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFDTCwyQkFBMkIsRUFDM0IsK0JBQStCLEVBQy9CLDRCQUE0QixFQUM1Qix3QkFBd0IsRUFDeEIsNEJBQTRCLEVBQzVCLHlCQUF5QixFQUN6QixpQkFBaUIsRUFDakIscUJBQXFCLEVBQ3JCLGtCQUFrQixHQUNuQixNQUFNLGtCQUFrQixDQUFDO0FBQzFCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUEwQjlDLE1BQU0sT0FBTyx3QkFBd0I7O3FIQUF4Qix3QkFBd0I7c0hBQXhCLHdCQUF3QixZQXRCakMsWUFBWTtzSEFzQkgsd0JBQXdCLGFBTnhCO1FBQ1QsK0JBQStCO1FBQy9CLDRCQUE0QjtRQUM1QixxQkFBcUI7S0FDdEIsWUFwQkMsWUFBWTtRQUNaLFdBQVcsQ0FBQyxVQUFVLENBQ3BCLHdCQUF3QixFQUN4Qiw0QkFBNEIsRUFDNUI7WUFDRSxZQUFZLEVBQUUsMkJBQTJCO1NBQzFDLENBQ0Y7UUFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLHlCQUF5QixFQUFFO1lBQ3ZFLFlBQVksRUFBRSx3QkFBd0I7U0FDdkMsQ0FBQztRQUNGLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGtCQUFrQixFQUFFO1lBQ3hELFlBQVksRUFBRSxpQkFBaUI7U0FDaEMsQ0FBQztRQUNGLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDOzJGQVF4Qix3QkFBd0I7a0JBeEJwQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFdBQVcsQ0FBQyxVQUFVLENBQ3BCLHdCQUF3QixFQUN4Qiw0QkFBNEIsRUFDNUI7NEJBQ0UsWUFBWSxFQUFFLDJCQUEyQjt5QkFDMUMsQ0FDRjt3QkFDRCxXQUFXLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLHlCQUF5QixFQUFFOzRCQUN2RSxZQUFZLEVBQUUsd0JBQXdCO3lCQUN2QyxDQUFDO3dCQUNGLFdBQVcsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGtCQUFrQixFQUFFOzRCQUN4RCxZQUFZLEVBQUUsaUJBQWlCO3lCQUNoQyxDQUFDO3dCQUNGLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO3FCQUNsQztvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsK0JBQStCO3dCQUMvQiw0QkFBNEI7d0JBQzVCLHFCQUFxQjtxQkFDdEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRWZmZWN0c01vZHVsZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgU3RvcmVNb2R1bGUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmltcG9ydCB7IGVmZmVjdHMgfSBmcm9tICcuL2VmZmVjdHMvaW5kZXgnO1xuaW1wb3J0IHsgUElDS1VQX0xPQ0FUSU9OU19GRUFUVVJFIH0gZnJvbSAnLi9waWNrdXAtbG9jYXRpb24tc3RhdGUnO1xuaW1wb3J0IHsgUElDS1VQX09QVElPTl9GRUFUVVJFIH0gZnJvbSAnLi9waWNrdXAtb3B0aW9uLXN0YXRlJztcbmltcG9ydCB7XG4gIHBpY2t1cExvY2F0aW9uc01ldGFSZWR1Y2VycyxcbiAgcGlja3VwTG9jYXRpb25zUmVkdWNlcnNQcm92aWRlcixcbiAgcGlja3VwTG9jYXRpb25zUmVkdWNlcnNUb2tlbixcbiAgcGlja3VwT3B0aW9uTWV0YVJlZHVjZXJzLFxuICBwaWNrdXBPcHRpb25SZWR1Y2Vyc1Byb3ZpZGVyLFxuICBwaWNrdXBPcHRpb25SZWR1Y2Vyc1Rva2VuLFxuICBzdG9ja01ldGFSZWR1Y2VycyxcbiAgc3RvY2tSZWR1Y2Vyc1Byb3ZpZGVyLFxuICBzdG9ja1JlZHVjZXJzVG9rZW4sXG59IGZyb20gJy4vcmVkdWNlcnMvaW5kZXgnO1xuaW1wb3J0IHsgU1RPQ0tfRkVBVFVSRSB9IGZyb20gJy4vc3RvY2stc3RhdGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFN0b3JlTW9kdWxlLmZvckZlYXR1cmUoXG4gICAgICBQSUNLVVBfTE9DQVRJT05TX0ZFQVRVUkUsXG4gICAgICBwaWNrdXBMb2NhdGlvbnNSZWR1Y2Vyc1Rva2VuLFxuICAgICAge1xuICAgICAgICBtZXRhUmVkdWNlcnM6IHBpY2t1cExvY2F0aW9uc01ldGFSZWR1Y2VycyxcbiAgICAgIH1cbiAgICApLFxuICAgIFN0b3JlTW9kdWxlLmZvckZlYXR1cmUoUElDS1VQX09QVElPTl9GRUFUVVJFLCBwaWNrdXBPcHRpb25SZWR1Y2Vyc1Rva2VuLCB7XG4gICAgICBtZXRhUmVkdWNlcnM6IHBpY2t1cE9wdGlvbk1ldGFSZWR1Y2VycyxcbiAgICB9KSxcbiAgICBTdG9yZU1vZHVsZS5mb3JGZWF0dXJlKFNUT0NLX0ZFQVRVUkUsIHN0b2NrUmVkdWNlcnNUb2tlbiwge1xuICAgICAgbWV0YVJlZHVjZXJzOiBzdG9ja01ldGFSZWR1Y2VycyxcbiAgICB9KSxcbiAgICBFZmZlY3RzTW9kdWxlLmZvckZlYXR1cmUoZWZmZWN0cyksXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHBpY2t1cExvY2F0aW9uc1JlZHVjZXJzUHJvdmlkZXIsXG4gICAgcGlja3VwT3B0aW9uUmVkdWNlcnNQcm92aWRlcixcbiAgICBzdG9ja1JlZHVjZXJzUHJvdmlkZXIsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBpY2t1cEluU3RvcmVTdG9yZU1vZHVsZSB7fVxuIl19