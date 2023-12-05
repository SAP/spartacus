/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { META_REDUCERS } from '@ngrx/store';
import { CartType } from '@spartacus/cart/base/root';
import { ConfigInitializerService, MODULE_INITIALIZER, } from '@spartacus/core';
import { tap } from 'rxjs/operators';
import { MultiCartStatePersistenceService } from './services/multi-cart-state-persistence.service';
import * as i0 from "@angular/core";
export function cartStatePersistenceFactory(cartStatePersistenceService, configInit) {
    const result = () => configInit
        .getStable('context')
        .pipe(tap(() => {
        cartStatePersistenceService.initSync();
    }))
        .toPromise();
    return result;
}
/**
 * Before `MultiCartStatePersistenceService` restores the active cart id `ActiveCartService`
 * will use `current` cart instead of the one saved in browser. This meta reducer
 * sets the value on store initialization to undefined cart which holds active cart loading
 * until the data from storage is restored.
 */
export function uninitializeActiveCartMetaReducerFactory() {
    const metaReducer = (reducer) => (state, action) => {
        const newState = { ...state };
        if (action.type === '@ngrx/store/init') {
            newState.cart = {
                ...newState.cart,
                ...{ index: { [CartType.ACTIVE]: undefined } },
            };
        }
        return reducer(newState, action);
    };
    return metaReducer;
}
/**
 * Complimentary module for cart to store cart id in browser storage.
 * This makes it possible to work on the same anonymous cart even after page refresh.
 */
export class CartPersistenceModule {
}
CartPersistenceModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPersistenceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartPersistenceModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartPersistenceModule });
CartPersistenceModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPersistenceModule, providers: [
        {
            provide: MODULE_INITIALIZER,
            useFactory: cartStatePersistenceFactory,
            deps: [MultiCartStatePersistenceService, ConfigInitializerService],
            multi: true,
        },
        {
            provide: META_REDUCERS,
            useFactory: uninitializeActiveCartMetaReducerFactory,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPersistenceModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [
                        {
                            provide: MODULE_INITIALIZER,
                            useFactory: cartStatePersistenceFactory,
                            deps: [MultiCartStatePersistenceService, ConfigInitializerService],
                            multi: true,
                        },
                        {
                            provide: META_REDUCERS,
                            useFactory: uninitializeActiveCartMetaReducerFactory,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1wZXJzaXN0ZW5jZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL2NvcmUvY2FydC1wZXJzaXN0ZW5jZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFzQyxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDaEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFFTCx3QkFBd0IsRUFDeEIsa0JBQWtCLEdBQ25CLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLGlEQUFpRCxDQUFDOztBQUVuRyxNQUFNLFVBQVUsMkJBQTJCLENBQ3pDLDJCQUE2RCxFQUM3RCxVQUFvQztJQUVwQyxNQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FDbEIsVUFBVTtTQUNQLFNBQVMsQ0FBQyxTQUFTLENBQUM7U0FDcEIsSUFBSSxDQUNILEdBQUcsQ0FBQyxHQUFHLEVBQUU7UUFDUCwyQkFBMkIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QyxDQUFDLENBQUMsQ0FDSDtTQUNBLFNBQVMsRUFBRSxDQUFDO0lBQ2pCLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSx3Q0FBd0M7SUFDdEQsTUFBTSxXQUFXLEdBQ2YsQ0FBQyxPQUEyQixFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQVUsRUFBRSxNQUFjLEVBQUUsRUFBRTtRQUM5RCxNQUFNLFFBQVEsR0FBRyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUM7UUFDOUIsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLGtCQUFrQixFQUFFO1lBQ3RDLFFBQVEsQ0FBQyxJQUFJLEdBQUc7Z0JBQ2QsR0FBRyxRQUFRLENBQUMsSUFBSTtnQkFDaEIsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFO2FBQy9DLENBQUM7U0FDSDtRQUNELE9BQU8sT0FBTyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFDSixPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBRUQ7OztHQUdHO0FBaUJILE1BQU0sT0FBTyxxQkFBcUI7O2tIQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLGFBZHJCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLFVBQVUsRUFBRSwyQkFBMkI7WUFDdkMsSUFBSSxFQUFFLENBQUMsZ0NBQWdDLEVBQUUsd0JBQXdCLENBQUM7WUFDbEUsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLGFBQWE7WUFDdEIsVUFBVSxFQUFFLHdDQUF3QztZQUNwRCxLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0Y7MkZBRVUscUJBQXFCO2tCQWhCakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsRUFBRTtvQkFDWCxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGtCQUFrQjs0QkFDM0IsVUFBVSxFQUFFLDJCQUEyQjs0QkFDdkMsSUFBSSxFQUFFLENBQUMsZ0NBQWdDLEVBQUUsd0JBQXdCLENBQUM7NEJBQ2xFLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxhQUFhOzRCQUN0QixVQUFVLEVBQUUsd0NBQXdDOzRCQUNwRCxLQUFLLEVBQUUsSUFBSTt5QkFDWjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb24sIEFjdGlvblJlZHVjZXIsIE1ldGFSZWR1Y2VyLCBNRVRBX1JFRFVDRVJTIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgQ2FydFR5cGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENvbmZpZyxcbiAgQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlLFxuICBNT0RVTEVfSU5JVElBTElaRVIsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNdWx0aUNhcnRTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbXVsdGktY2FydC1zdGF0ZS1wZXJzaXN0ZW5jZS5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNhcnRTdGF0ZVBlcnNpc3RlbmNlRmFjdG9yeShcbiAgY2FydFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlOiBNdWx0aUNhcnRTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSxcbiAgY29uZmlnSW5pdDogQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlXG4pOiAoKSA9PiBQcm9taXNlPENvbmZpZz4ge1xuICBjb25zdCByZXN1bHQgPSAoKSA9PlxuICAgIGNvbmZpZ0luaXRcbiAgICAgIC5nZXRTdGFibGUoJ2NvbnRleHQnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgY2FydFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLmluaXRTeW5jKCk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAudG9Qcm9taXNlKCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQmVmb3JlIGBNdWx0aUNhcnRTdGF0ZVBlcnNpc3RlbmNlU2VydmljZWAgcmVzdG9yZXMgdGhlIGFjdGl2ZSBjYXJ0IGlkIGBBY3RpdmVDYXJ0U2VydmljZWBcbiAqIHdpbGwgdXNlIGBjdXJyZW50YCBjYXJ0IGluc3RlYWQgb2YgdGhlIG9uZSBzYXZlZCBpbiBicm93c2VyLiBUaGlzIG1ldGEgcmVkdWNlclxuICogc2V0cyB0aGUgdmFsdWUgb24gc3RvcmUgaW5pdGlhbGl6YXRpb24gdG8gdW5kZWZpbmVkIGNhcnQgd2hpY2ggaG9sZHMgYWN0aXZlIGNhcnQgbG9hZGluZ1xuICogdW50aWwgdGhlIGRhdGEgZnJvbSBzdG9yYWdlIGlzIHJlc3RvcmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5pbml0aWFsaXplQWN0aXZlQ2FydE1ldGFSZWR1Y2VyRmFjdG9yeSgpOiBNZXRhUmVkdWNlcjxhbnk+IHtcbiAgY29uc3QgbWV0YVJlZHVjZXIgPVxuICAgIChyZWR1Y2VyOiBBY3Rpb25SZWR1Y2VyPGFueT4pID0+IChzdGF0ZTogYW55LCBhY3Rpb246IEFjdGlvbikgPT4ge1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7IC4uLnN0YXRlIH07XG4gICAgICBpZiAoYWN0aW9uLnR5cGUgPT09ICdAbmdyeC9zdG9yZS9pbml0Jykge1xuICAgICAgICBuZXdTdGF0ZS5jYXJ0ID0ge1xuICAgICAgICAgIC4uLm5ld1N0YXRlLmNhcnQsXG4gICAgICAgICAgLi4ueyBpbmRleDogeyBbQ2FydFR5cGUuQUNUSVZFXTogdW5kZWZpbmVkIH0gfSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZWR1Y2VyKG5ld1N0YXRlLCBhY3Rpb24pO1xuICAgIH07XG4gIHJldHVybiBtZXRhUmVkdWNlcjtcbn1cblxuLyoqXG4gKiBDb21wbGltZW50YXJ5IG1vZHVsZSBmb3IgY2FydCB0byBzdG9yZSBjYXJ0IGlkIGluIGJyb3dzZXIgc3RvcmFnZS5cbiAqIFRoaXMgbWFrZXMgaXQgcG9zc2libGUgdG8gd29yayBvbiB0aGUgc2FtZSBhbm9ueW1vdXMgY2FydCBldmVuIGFmdGVyIHBhZ2UgcmVmcmVzaC5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1PRFVMRV9JTklUSUFMSVpFUixcbiAgICAgIHVzZUZhY3Rvcnk6IGNhcnRTdGF0ZVBlcnNpc3RlbmNlRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtNdWx0aUNhcnRTdGF0ZVBlcnNpc3RlbmNlU2VydmljZSwgQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlXSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTUVUQV9SRURVQ0VSUyxcbiAgICAgIHVzZUZhY3Rvcnk6IHVuaW5pdGlhbGl6ZUFjdGl2ZUNhcnRNZXRhUmVkdWNlckZhY3RvcnksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJ0UGVyc2lzdGVuY2VNb2R1bGUge31cbiJdfQ==