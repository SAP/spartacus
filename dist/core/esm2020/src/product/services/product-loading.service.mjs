/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ofType } from '@ngrx/effects';
import { select } from '@ngrx/store';
import { defer, merge, of, using } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, map, shareReplay, tap, withLatestFrom, } from 'rxjs/operators';
import { deepMerge } from '../../config/utils/deep-merge';
import { uniteLatest } from '../../util/rxjs/unite-latest';
import { withdrawOn } from '../../util/rxjs/withdraw-on';
import { ProductActions } from '../store/actions/index';
import { ProductSelectors } from '../store/selectors/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "../../occ/services/loading-scopes.service";
import * as i3 from "@ngrx/effects";
import * as i4 from "../../event/event.service";
export class ProductLoadingService {
    constructor(store, loadingScopes, actions$, platformId, eventService) {
        this.store = store;
        this.loadingScopes = loadingScopes;
        this.actions$ = actions$;
        this.platformId = platformId;
        this.eventService = eventService;
        this.products = {};
    }
    get(productCode, scopes) {
        scopes = this.loadingScopes.expand('product', scopes);
        this.initProductScopes(productCode, scopes);
        return this.products[productCode][this.getScopesIndex(scopes)];
    }
    initProductScopes(productCode, scopes) {
        if (!this.products[productCode]) {
            this.products[productCode] = {};
        }
        for (const scope of scopes) {
            if (!this.products[productCode][scope]) {
                this.products[productCode][scope] = this.getProductForScope(productCode, scope);
            }
        }
        if (scopes.length > 1) {
            this.products[productCode][this.getScopesIndex(scopes)] = uniteLatest(scopes.map((scope) => this.products[productCode][scope])).pipe(map((productParts) => productParts.every(Boolean)
                ? deepMerge({}, ...productParts)
                : undefined), distinctUntilChanged());
        }
    }
    getScopesIndex(scopes) {
        return scopes.join('ɵ');
    }
    /**
     * Creates observable for providing specified product data for the scope
     *
     * @param productCode
     * @param scope
     */
    getProductForScope(productCode, scope) {
        const shouldLoad$ = this.store.pipe(select(ProductSelectors.getSelectedProductStateFactory(productCode, scope)), map((productState) => !productState.loading && !productState.success && !productState.error), distinctUntilChanged(), filter((x) => x));
        const isLoading$ = this.store.pipe(select(ProductSelectors.getSelectedProductLoadingFactory(productCode, scope)));
        const productLoadLogic$ = merge(shouldLoad$, ...this.getProductReloadTriggers(productCode, scope)).pipe(debounceTime(0), withLatestFrom(isLoading$), tap(([, isLoading]) => {
            if (!isLoading) {
                this.store.dispatch(new ProductActions.LoadProduct(productCode, scope));
            }
        }));
        const productData$ = this.store.pipe(select(ProductSelectors.getSelectedProductFactory(productCode, scope)));
        return using(() => productLoadLogic$.subscribe(), () => productData$).pipe(shareReplay({ bufferSize: 1, refCount: true }));
    }
    /**
     * Returns reload triggers for product per scope
     *
     * @param productCode
     * @param scope
     */
    getProductReloadTriggers(productCode, scope) {
        const triggers = [];
        // max age trigger add
        const maxAge = this.loadingScopes.getMaxAge('product', scope);
        if (maxAge && isPlatformBrowser(this.platformId)) {
            // we want to grab load product success and load product fail for this product and scope
            const loadFinish$ = this.actions$.pipe(ofType(ProductActions.LOAD_PRODUCT_SUCCESS, ProductActions.LOAD_PRODUCT_FAIL), filter((action) => action.meta.entityId === productCode && action.meta.scope === scope));
            const loadStart$ = this.actions$.pipe(ofType(ProductActions.LOAD_PRODUCT), filter((action) => action.payload === productCode && action.meta.scope === scope));
            triggers.push(this.getMaxAgeTrigger(loadStart$, loadFinish$, maxAge));
        }
        const reloadTriggers$ = this.loadingScopes
            .getReloadTriggers('product', scope)
            .map((e) => this.eventService.get(e));
        return triggers.concat(reloadTriggers$);
    }
    /**
     * Generic method that returns stream triggering reload by maxAge
     *
     * Could be refactored to separate service in future to use in other
     * max age reload implementations
     *
     * @param loadStart$ Stream that emits on load start
     * @param loadFinish$ Stream that emits on load finish
     * @param maxAge max age
     */
    getMaxAgeTrigger(loadStart$, loadFinish$, maxAge, scheduler) {
        let timestamp = 0;
        const now = () => (scheduler ? scheduler.now() : Date.now());
        const timestamp$ = loadFinish$.pipe(tap(() => (timestamp = now())));
        const shouldReload$ = defer(() => {
            const age = now() - timestamp;
            const timestampRefresh$ = timestamp$.pipe(delay(maxAge, scheduler), map(() => true), withdrawOn(loadStart$));
            if (age > maxAge) {
                // we should emit first value immediately
                return merge(of(true), timestampRefresh$);
            }
            else if (age === 0) {
                // edge case, we should emit max age timeout after next load success
                // could happen with artificial schedulers
                return timestampRefresh$;
            }
            else {
                // we should emit first value when age will expire
                return merge(of(true).pipe(delay(maxAge - age, scheduler)), timestampRefresh$);
            }
        });
        return shouldReload$;
    }
}
ProductLoadingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductLoadingService, deps: [{ token: i1.Store }, { token: i2.LoadingScopesService }, { token: i3.Actions }, { token: PLATFORM_ID }, { token: i4.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
ProductLoadingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductLoadingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductLoadingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.LoadingScopesService }, { type: i3.Actions }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i4.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1sb2FkaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9wcm9kdWN0L3NlcnZpY2VzL3Byb2R1Y3QtbG9hZGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFXLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUUsTUFBTSxFQUFTLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFjLEVBQUUsRUFBaUIsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFFLE9BQU8sRUFDTCxZQUFZLEVBQ1osS0FBSyxFQUNMLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sR0FBRyxFQUNILFdBQVcsRUFDWCxHQUFHLEVBQ0gsY0FBYyxHQUNmLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBSTFELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXhELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7QUFLNUQsTUFBTSxPQUFPLHFCQUFxQjtJQUtoQyxZQUNZLEtBQThCLEVBQzlCLGFBQW1DLEVBQ25DLFFBQWlCLEVBQ0ksVUFBZSxFQUNwQyxZQUEwQjtRQUoxQixVQUFLLEdBQUwsS0FBSyxDQUF5QjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFDbkMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNJLGVBQVUsR0FBVixVQUFVLENBQUs7UUFDcEMsaUJBQVksR0FBWixZQUFZLENBQWM7UUFUNUIsYUFBUSxHQUVkLEVBQUUsQ0FBQztJQVFKLENBQUM7SUFFSixHQUFHLENBQUMsV0FBbUIsRUFBRSxNQUFnQjtRQUN2QyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXRELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRVMsaUJBQWlCLENBQUMsV0FBbUIsRUFBRSxNQUFnQjtRQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNqQztRQUVELEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FDekQsV0FBVyxFQUNYLEtBQUssQ0FDTixDQUFDO2FBQ0g7U0FDRjtRQUVELElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUNuRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQ3pELENBQUMsSUFBSSxDQUNKLEdBQUcsQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQ25CLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUN6QixDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxHQUFHLFlBQVksQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLFNBQVMsQ0FDZCxFQUNELG9CQUFvQixFQUFFLENBQ3ZCLENBQUM7U0FDSDtJQUNILENBQUM7SUFFUyxjQUFjLENBQUMsTUFBZ0I7UUFDdkMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNPLGtCQUFrQixDQUMxQixXQUFtQixFQUNuQixLQUFhO1FBRWIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2pDLE1BQU0sQ0FDSixnQkFBZ0IsQ0FBQyw4QkFBOEIsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQ3BFLEVBQ0QsR0FBRyxDQUNELENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FDZixDQUFDLFlBQVksQ0FBQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FDeEUsRUFDRCxvQkFBb0IsRUFBRSxFQUN0QixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUNqQixDQUFDO1FBRUYsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2hDLE1BQU0sQ0FDSixnQkFBZ0IsQ0FBQyxnQ0FBZ0MsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQ3RFLENBQ0YsQ0FBQztRQUVGLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxDQUM3QixXQUFXLEVBQ1gsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUNyRCxDQUFDLElBQUksQ0FDSixZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQ2YsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUMxQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNqQixJQUFJLGNBQWMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUNuRCxDQUFDO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQ2xDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FDdkUsQ0FBQztRQUVGLE9BQU8sS0FBSyxDQUNWLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxFQUNuQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQ25CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDTyx3QkFBd0IsQ0FDaEMsV0FBbUIsRUFDbkIsS0FBYTtRQUViLE1BQU0sUUFBUSxHQUEwQixFQUFFLENBQUM7UUFFM0Msc0JBQXNCO1FBQ3RCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5RCxJQUFJLE1BQU0sSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDaEQsd0ZBQXdGO1lBQ3hGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNwQyxNQUFNLENBQ0osY0FBYyxDQUFDLG9CQUFvQixFQUNuQyxjQUFjLENBQUMsaUJBQWlCLENBQ2pDLEVBQ0QsTUFBTSxDQUNKLENBQ0UsTUFFa0MsRUFDbEMsRUFBRSxDQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQ3RFLENBQ0YsQ0FBQztZQUVGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNuQyxNQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUNuQyxNQUFNLENBQ0osQ0FBQyxNQUFrQyxFQUFFLEVBQUUsQ0FDckMsTUFBTSxDQUFDLE9BQU8sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUNoRSxDQUNGLENBQUM7WUFFRixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdkU7UUFFRCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYTthQUN2QyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO2FBQ25DLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4QyxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNLLGdCQUFnQixDQUN0QixVQUFvRCxFQUNwRCxXQUFxRCxFQUNyRCxNQUFjLEVBQ2QsU0FBeUI7UUFFekIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBRTdELE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBFLE1BQU0sYUFBYSxHQUF3QixLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ3BELE1BQU0sR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztZQUU5QixNQUFNLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQ3ZDLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQ3hCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFDZixVQUFVLENBQUMsVUFBVSxDQUFDLENBQ3ZCLENBQUM7WUFFRixJQUFJLEdBQUcsR0FBRyxNQUFNLEVBQUU7Z0JBQ2hCLHlDQUF5QztnQkFDekMsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7YUFDM0M7aUJBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFO2dCQUNwQixvRUFBb0U7Z0JBQ3BFLDBDQUEwQztnQkFDMUMsT0FBTyxpQkFBaUIsQ0FBQzthQUMxQjtpQkFBTTtnQkFDTCxrREFBa0Q7Z0JBQ2xELE9BQU8sS0FBSyxDQUNWLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsRUFDN0MsaUJBQWlCLENBQ2xCLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQzs7a0hBMU1VLHFCQUFxQixrR0FTdEIsV0FBVztzSEFUVixxQkFBcUIsY0FGcEIsTUFBTTsyRkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFVSSxNQUFNOzJCQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb25zLCBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IHNlbGVjdCwgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBkZWZlciwgbWVyZ2UsIE9ic2VydmFibGUsIG9mLCBTY2hlZHVsZXJMaWtlLCB1c2luZyB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGVib3VuY2VUaW1lLFxuICBkZWxheSxcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBzaGFyZVJlcGxheSxcbiAgdGFwLFxuICB3aXRoTGF0ZXN0RnJvbSxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZGVlcE1lcmdlIH0gZnJvbSAnLi4vLi4vY29uZmlnL3V0aWxzL2RlZXAtbWVyZ2UnO1xuaW1wb3J0IHsgRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vZXZlbnQvZXZlbnQuc2VydmljZSc7XG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSAnLi4vLi4vbW9kZWwvcHJvZHVjdC5tb2RlbCc7XG5pbXBvcnQgeyBMb2FkaW5nU2NvcGVzU2VydmljZSB9IGZyb20gJy4uLy4uL29jYy9zZXJ2aWNlcy9sb2FkaW5nLXNjb3Blcy5zZXJ2aWNlJztcbmltcG9ydCB7IHVuaXRlTGF0ZXN0IH0gZnJvbSAnLi4vLi4vdXRpbC9yeGpzL3VuaXRlLWxhdGVzdCc7XG5pbXBvcnQgeyB3aXRoZHJhd09uIH0gZnJvbSAnLi4vLi4vdXRpbC9yeGpzL3dpdGhkcmF3LW9uJztcbmltcG9ydCB7IFByb2R1Y3RBY3Rpb25zIH0gZnJvbSAnLi4vc3RvcmUvYWN0aW9ucy9pbmRleCc7XG5pbXBvcnQgeyBTdGF0ZVdpdGhQcm9kdWN0IH0gZnJvbSAnLi4vc3RvcmUvcHJvZHVjdC1zdGF0ZSc7XG5pbXBvcnQgeyBQcm9kdWN0U2VsZWN0b3JzIH0gZnJvbSAnLi4vc3RvcmUvc2VsZWN0b3JzL2luZGV4JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RMb2FkaW5nU2VydmljZSB7XG4gIHByb3RlY3RlZCBwcm9kdWN0czoge1xuICAgIFtjb2RlOiBzdHJpbmddOiB7IFtzY29wZTogc3RyaW5nXTogT2JzZXJ2YWJsZTxQcm9kdWN0PiB9O1xuICB9ID0ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHN0b3JlOiBTdG9yZTxTdGF0ZVdpdGhQcm9kdWN0PixcbiAgICBwcm90ZWN0ZWQgbG9hZGluZ1Njb3BlczogTG9hZGluZ1Njb3Blc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGFjdGlvbnMkOiBBY3Rpb25zLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBwbGF0Zm9ybUlkOiBhbnksXG4gICAgcHJvdGVjdGVkIGV2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlXG4gICkge31cblxuICBnZXQocHJvZHVjdENvZGU6IHN0cmluZywgc2NvcGVzOiBzdHJpbmdbXSk6IE9ic2VydmFibGU8UHJvZHVjdD4ge1xuICAgIHNjb3BlcyA9IHRoaXMubG9hZGluZ1Njb3Blcy5leHBhbmQoJ3Byb2R1Y3QnLCBzY29wZXMpO1xuXG4gICAgdGhpcy5pbml0UHJvZHVjdFNjb3Blcyhwcm9kdWN0Q29kZSwgc2NvcGVzKTtcbiAgICByZXR1cm4gdGhpcy5wcm9kdWN0c1twcm9kdWN0Q29kZV1bdGhpcy5nZXRTY29wZXNJbmRleChzY29wZXMpXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0UHJvZHVjdFNjb3Blcyhwcm9kdWN0Q29kZTogc3RyaW5nLCBzY29wZXM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnByb2R1Y3RzW3Byb2R1Y3RDb2RlXSkge1xuICAgICAgdGhpcy5wcm9kdWN0c1twcm9kdWN0Q29kZV0gPSB7fTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHNjb3BlIG9mIHNjb3Blcykge1xuICAgICAgaWYgKCF0aGlzLnByb2R1Y3RzW3Byb2R1Y3RDb2RlXVtzY29wZV0pIHtcbiAgICAgICAgdGhpcy5wcm9kdWN0c1twcm9kdWN0Q29kZV1bc2NvcGVdID0gdGhpcy5nZXRQcm9kdWN0Rm9yU2NvcGUoXG4gICAgICAgICAgcHJvZHVjdENvZGUsXG4gICAgICAgICAgc2NvcGVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2NvcGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMucHJvZHVjdHNbcHJvZHVjdENvZGVdW3RoaXMuZ2V0U2NvcGVzSW5kZXgoc2NvcGVzKV0gPSB1bml0ZUxhdGVzdChcbiAgICAgICAgc2NvcGVzLm1hcCgoc2NvcGUpID0+IHRoaXMucHJvZHVjdHNbcHJvZHVjdENvZGVdW3Njb3BlXSlcbiAgICAgICkucGlwZShcbiAgICAgICAgbWFwKChwcm9kdWN0UGFydHMpID0+XG4gICAgICAgICAgcHJvZHVjdFBhcnRzLmV2ZXJ5KEJvb2xlYW4pXG4gICAgICAgICAgICA/IGRlZXBNZXJnZSh7fSwgLi4ucHJvZHVjdFBhcnRzKVxuICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgKSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0U2NvcGVzSW5kZXgoc2NvcGVzOiBzdHJpbmdbXSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHNjb3Blcy5qb2luKCfJtScpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgb2JzZXJ2YWJsZSBmb3IgcHJvdmlkaW5nIHNwZWNpZmllZCBwcm9kdWN0IGRhdGEgZm9yIHRoZSBzY29wZVxuICAgKlxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGVcbiAgICogQHBhcmFtIHNjb3BlXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0UHJvZHVjdEZvclNjb3BlKFxuICAgIHByb2R1Y3RDb2RlOiBzdHJpbmcsXG4gICAgc2NvcGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFByb2R1Y3Q+IHtcbiAgICBjb25zdCBzaG91bGRMb2FkJCA9IHRoaXMuc3RvcmUucGlwZShcbiAgICAgIHNlbGVjdChcbiAgICAgICAgUHJvZHVjdFNlbGVjdG9ycy5nZXRTZWxlY3RlZFByb2R1Y3RTdGF0ZUZhY3RvcnkocHJvZHVjdENvZGUsIHNjb3BlKVxuICAgICAgKSxcbiAgICAgIG1hcChcbiAgICAgICAgKHByb2R1Y3RTdGF0ZSkgPT5cbiAgICAgICAgICAhcHJvZHVjdFN0YXRlLmxvYWRpbmcgJiYgIXByb2R1Y3RTdGF0ZS5zdWNjZXNzICYmICFwcm9kdWN0U3RhdGUuZXJyb3JcbiAgICAgICksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxuICAgICAgZmlsdGVyKCh4KSA9PiB4KVxuICAgICk7XG5cbiAgICBjb25zdCBpc0xvYWRpbmckID0gdGhpcy5zdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KFxuICAgICAgICBQcm9kdWN0U2VsZWN0b3JzLmdldFNlbGVjdGVkUHJvZHVjdExvYWRpbmdGYWN0b3J5KHByb2R1Y3RDb2RlLCBzY29wZSlcbiAgICAgIClcbiAgICApO1xuXG4gICAgY29uc3QgcHJvZHVjdExvYWRMb2dpYyQgPSBtZXJnZShcbiAgICAgIHNob3VsZExvYWQkLFxuICAgICAgLi4udGhpcy5nZXRQcm9kdWN0UmVsb2FkVHJpZ2dlcnMocHJvZHVjdENvZGUsIHNjb3BlKVxuICAgICkucGlwZShcbiAgICAgIGRlYm91bmNlVGltZSgwKSxcbiAgICAgIHdpdGhMYXRlc3RGcm9tKGlzTG9hZGluZyQpLFxuICAgICAgdGFwKChbLCBpc0xvYWRpbmddKSA9PiB7XG4gICAgICAgIGlmICghaXNMb2FkaW5nKSB7XG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgIG5ldyBQcm9kdWN0QWN0aW9ucy5Mb2FkUHJvZHVjdChwcm9kdWN0Q29kZSwgc2NvcGUpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgcHJvZHVjdERhdGEkID0gdGhpcy5zdG9yZS5waXBlKFxuICAgICAgc2VsZWN0KFByb2R1Y3RTZWxlY3RvcnMuZ2V0U2VsZWN0ZWRQcm9kdWN0RmFjdG9yeShwcm9kdWN0Q29kZSwgc2NvcGUpKVxuICAgICk7XG5cbiAgICByZXR1cm4gdXNpbmcoXG4gICAgICAoKSA9PiBwcm9kdWN0TG9hZExvZ2ljJC5zdWJzY3JpYmUoKSxcbiAgICAgICgpID0+IHByb2R1Y3REYXRhJFxuICAgICkucGlwZShzaGFyZVJlcGxheSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHJlbG9hZCB0cmlnZ2VycyBmb3IgcHJvZHVjdCBwZXIgc2NvcGVcbiAgICpcbiAgICogQHBhcmFtIHByb2R1Y3RDb2RlXG4gICAqIEBwYXJhbSBzY29wZVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFByb2R1Y3RSZWxvYWRUcmlnZ2VycyhcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nLFxuICAgIHNjb3BlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTx1bmtub3duPltdIHtcbiAgICBjb25zdCB0cmlnZ2VyczogT2JzZXJ2YWJsZTx1bmtub3duPltdID0gW107XG5cbiAgICAvLyBtYXggYWdlIHRyaWdnZXIgYWRkXG4gICAgY29uc3QgbWF4QWdlID0gdGhpcy5sb2FkaW5nU2NvcGVzLmdldE1heEFnZSgncHJvZHVjdCcsIHNjb3BlKTtcbiAgICBpZiAobWF4QWdlICYmIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIC8vIHdlIHdhbnQgdG8gZ3JhYiBsb2FkIHByb2R1Y3Qgc3VjY2VzcyBhbmQgbG9hZCBwcm9kdWN0IGZhaWwgZm9yIHRoaXMgcHJvZHVjdCBhbmQgc2NvcGVcbiAgICAgIGNvbnN0IGxvYWRGaW5pc2gkID0gdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgICBvZlR5cGUoXG4gICAgICAgICAgUHJvZHVjdEFjdGlvbnMuTE9BRF9QUk9EVUNUX1NVQ0NFU1MsXG4gICAgICAgICAgUHJvZHVjdEFjdGlvbnMuTE9BRF9QUk9EVUNUX0ZBSUxcbiAgICAgICAgKSxcbiAgICAgICAgZmlsdGVyKFxuICAgICAgICAgIChcbiAgICAgICAgICAgIGFjdGlvbjpcbiAgICAgICAgICAgICAgfCBQcm9kdWN0QWN0aW9ucy5Mb2FkUHJvZHVjdFN1Y2Nlc3NcbiAgICAgICAgICAgICAgfCBQcm9kdWN0QWN0aW9ucy5Mb2FkUHJvZHVjdEZhaWxcbiAgICAgICAgICApID0+XG4gICAgICAgICAgICBhY3Rpb24ubWV0YS5lbnRpdHlJZCA9PT0gcHJvZHVjdENvZGUgJiYgYWN0aW9uLm1ldGEuc2NvcGUgPT09IHNjb3BlXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGxvYWRTdGFydCQgPSB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICAgIG9mVHlwZShQcm9kdWN0QWN0aW9ucy5MT0FEX1BST0RVQ1QpLFxuICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgKGFjdGlvbjogUHJvZHVjdEFjdGlvbnMuTG9hZFByb2R1Y3QpID0+XG4gICAgICAgICAgICBhY3Rpb24ucGF5bG9hZCA9PT0gcHJvZHVjdENvZGUgJiYgYWN0aW9uLm1ldGEuc2NvcGUgPT09IHNjb3BlXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIHRyaWdnZXJzLnB1c2godGhpcy5nZXRNYXhBZ2VUcmlnZ2VyKGxvYWRTdGFydCQsIGxvYWRGaW5pc2gkLCBtYXhBZ2UpKTtcbiAgICB9XG5cbiAgICBjb25zdCByZWxvYWRUcmlnZ2VycyQgPSB0aGlzLmxvYWRpbmdTY29wZXNcbiAgICAgIC5nZXRSZWxvYWRUcmlnZ2VycygncHJvZHVjdCcsIHNjb3BlKVxuICAgICAgLm1hcCgoZSkgPT4gdGhpcy5ldmVudFNlcnZpY2UuZ2V0KGUpKTtcblxuICAgIHJldHVybiB0cmlnZ2Vycy5jb25jYXQocmVsb2FkVHJpZ2dlcnMkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmljIG1ldGhvZCB0aGF0IHJldHVybnMgc3RyZWFtIHRyaWdnZXJpbmcgcmVsb2FkIGJ5IG1heEFnZVxuICAgKlxuICAgKiBDb3VsZCBiZSByZWZhY3RvcmVkIHRvIHNlcGFyYXRlIHNlcnZpY2UgaW4gZnV0dXJlIHRvIHVzZSBpbiBvdGhlclxuICAgKiBtYXggYWdlIHJlbG9hZCBpbXBsZW1lbnRhdGlvbnNcbiAgICpcbiAgICogQHBhcmFtIGxvYWRTdGFydCQgU3RyZWFtIHRoYXQgZW1pdHMgb24gbG9hZCBzdGFydFxuICAgKiBAcGFyYW0gbG9hZEZpbmlzaCQgU3RyZWFtIHRoYXQgZW1pdHMgb24gbG9hZCBmaW5pc2hcbiAgICogQHBhcmFtIG1heEFnZSBtYXggYWdlXG4gICAqL1xuICBwcml2YXRlIGdldE1heEFnZVRyaWdnZXIoXG4gICAgbG9hZFN0YXJ0JDogT2JzZXJ2YWJsZTxQcm9kdWN0QWN0aW9ucy5Qcm9kdWN0QWN0aW9uPixcbiAgICBsb2FkRmluaXNoJDogT2JzZXJ2YWJsZTxQcm9kdWN0QWN0aW9ucy5Qcm9kdWN0QWN0aW9uPixcbiAgICBtYXhBZ2U6IG51bWJlcixcbiAgICBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGxldCB0aW1lc3RhbXAgPSAwO1xuXG4gICAgY29uc3Qgbm93ID0gKCkgPT4gKHNjaGVkdWxlciA/IHNjaGVkdWxlci5ub3coKSA6IERhdGUubm93KCkpO1xuXG4gICAgY29uc3QgdGltZXN0YW1wJCA9IGxvYWRGaW5pc2gkLnBpcGUodGFwKCgpID0+ICh0aW1lc3RhbXAgPSBub3coKSkpKTtcblxuICAgIGNvbnN0IHNob3VsZFJlbG9hZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSBkZWZlcigoKSA9PiB7XG4gICAgICBjb25zdCBhZ2UgPSBub3coKSAtIHRpbWVzdGFtcDtcblxuICAgICAgY29uc3QgdGltZXN0YW1wUmVmcmVzaCQgPSB0aW1lc3RhbXAkLnBpcGUoXG4gICAgICAgIGRlbGF5KG1heEFnZSwgc2NoZWR1bGVyKSxcbiAgICAgICAgbWFwKCgpID0+IHRydWUpLFxuICAgICAgICB3aXRoZHJhd09uKGxvYWRTdGFydCQpXG4gICAgICApO1xuXG4gICAgICBpZiAoYWdlID4gbWF4QWdlKSB7XG4gICAgICAgIC8vIHdlIHNob3VsZCBlbWl0IGZpcnN0IHZhbHVlIGltbWVkaWF0ZWx5XG4gICAgICAgIHJldHVybiBtZXJnZShvZih0cnVlKSwgdGltZXN0YW1wUmVmcmVzaCQpO1xuICAgICAgfSBlbHNlIGlmIChhZ2UgPT09IDApIHtcbiAgICAgICAgLy8gZWRnZSBjYXNlLCB3ZSBzaG91bGQgZW1pdCBtYXggYWdlIHRpbWVvdXQgYWZ0ZXIgbmV4dCBsb2FkIHN1Y2Nlc3NcbiAgICAgICAgLy8gY291bGQgaGFwcGVuIHdpdGggYXJ0aWZpY2lhbCBzY2hlZHVsZXJzXG4gICAgICAgIHJldHVybiB0aW1lc3RhbXBSZWZyZXNoJDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHdlIHNob3VsZCBlbWl0IGZpcnN0IHZhbHVlIHdoZW4gYWdlIHdpbGwgZXhwaXJlXG4gICAgICAgIHJldHVybiBtZXJnZShcbiAgICAgICAgICBvZih0cnVlKS5waXBlKGRlbGF5KG1heEFnZSAtIGFnZSwgc2NoZWR1bGVyKSksXG4gICAgICAgICAgdGltZXN0YW1wUmVmcmVzaCRcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBzaG91bGRSZWxvYWQkO1xuICB9XG59XG4iXX0=