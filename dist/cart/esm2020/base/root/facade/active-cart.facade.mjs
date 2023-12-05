/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CART_BASE_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class ActiveCartFacade {
}
ActiveCartFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ActiveCartFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: ActiveCartFacade,
        feature: CART_BASE_CORE_FEATURE,
        methods: [
            'getActive',
            'takeActive',
            'getActiveCartId',
            'takeActiveCartId',
            'getEntries',
            'getLastEntry',
            'getLoading',
            'isStable',
            'addEntry',
            'removeEntry',
            'updateEntry',
            'getEntry',
            'addEmail',
            'getAssignedUser',
            'isGuestCart',
            'addEntries',
            'requireLoadedCart',
            'reloadActiveCart',
            'hasPickupItems',
            'hasDeliveryItems',
            'getPickupEntries',
            'getDeliveryEntries',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveCartFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: ActiveCartFacade,
                        feature: CART_BASE_CORE_FEATURE,
                        methods: [
                            'getActive',
                            'takeActive',
                            'getActiveCartId',
                            'takeActiveCartId',
                            'getEntries',
                            'getLastEntry',
                            'getLoading',
                            'isStable',
                            'addEntry',
                            'removeEntry',
                            'updateEntry',
                            'getEntry',
                            'addEmail',
                            'getAssignedUser',
                            'isGuestCart',
                            'addEntries',
                            'requireLoadedCart',
                            'reloadActiveCart',
                            'hasPickupItems',
                            'hasDeliveryItems',
                            'getPickupEntries',
                            'getDeliveryEntries',
                        ],
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLWNhcnQuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9yb290L2ZhY2FkZS9hY3RpdmUtY2FydC5mYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBUSxNQUFNLGlCQUFpQixDQUFDO0FBRXRELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQW9DekQsTUFBTSxPQUFnQixnQkFBZ0I7OzZHQUFoQixnQkFBZ0I7aUhBQWhCLGdCQUFnQixjQWhDeEIsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixPQUFPLEVBQUU7WUFDUCxXQUFXO1lBQ1gsWUFBWTtZQUNaLGlCQUFpQjtZQUNqQixrQkFBa0I7WUFDbEIsWUFBWTtZQUNaLGNBQWM7WUFDZCxZQUFZO1lBQ1osVUFBVTtZQUNWLFVBQVU7WUFDVixhQUFhO1lBQ2IsYUFBYTtZQUNiLFVBQVU7WUFDVixVQUFVO1lBQ1YsaUJBQWlCO1lBQ2pCLGFBQWE7WUFDYixZQUFZO1lBQ1osbUJBQW1CO1lBQ25CLGtCQUFrQjtZQUNsQixnQkFBZ0I7WUFDaEIsa0JBQWtCO1lBQ2xCLGtCQUFrQjtZQUNsQixvQkFBb0I7U0FDckI7UUFDRCxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUM7MkZBRWdCLGdCQUFnQjtrQkFqQ3JDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7d0JBQ1osTUFBTSxrQkFBa0I7d0JBQ3hCLE9BQU8sRUFBRSxzQkFBc0I7d0JBQy9CLE9BQU8sRUFBRTs0QkFDUCxXQUFXOzRCQUNYLFlBQVk7NEJBQ1osaUJBQWlCOzRCQUNqQixrQkFBa0I7NEJBQ2xCLFlBQVk7NEJBQ1osY0FBYzs0QkFDZCxZQUFZOzRCQUNaLFVBQVU7NEJBQ1YsVUFBVTs0QkFDVixhQUFhOzRCQUNiLGFBQWE7NEJBQ2IsVUFBVTs0QkFDVixVQUFVOzRCQUNWLGlCQUFpQjs0QkFDakIsYUFBYTs0QkFDYixZQUFZOzRCQUNaLG1CQUFtQjs0QkFDbkIsa0JBQWtCOzRCQUNsQixnQkFBZ0I7NEJBQ2hCLGtCQUFrQjs0QkFDbEIsa0JBQWtCOzRCQUNsQixvQkFBb0I7eUJBQ3JCO3dCQUNELEtBQUssRUFBRSxJQUFJO3FCQUNaLENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5LCBVc2VyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENBUlRfQkFTRV9DT1JFX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuaW1wb3J0IHsgQ2FydCwgT3JkZXJFbnRyeSB9IGZyb20gJy4uL21vZGVscy9jYXJ0Lm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6ICgpID0+XG4gICAgZmFjYWRlRmFjdG9yeSh7XG4gICAgICBmYWNhZGU6IEFjdGl2ZUNhcnRGYWNhZGUsXG4gICAgICBmZWF0dXJlOiBDQVJUX0JBU0VfQ09SRV9GRUFUVVJFLFxuICAgICAgbWV0aG9kczogW1xuICAgICAgICAnZ2V0QWN0aXZlJyxcbiAgICAgICAgJ3Rha2VBY3RpdmUnLFxuICAgICAgICAnZ2V0QWN0aXZlQ2FydElkJyxcbiAgICAgICAgJ3Rha2VBY3RpdmVDYXJ0SWQnLFxuICAgICAgICAnZ2V0RW50cmllcycsXG4gICAgICAgICdnZXRMYXN0RW50cnknLFxuICAgICAgICAnZ2V0TG9hZGluZycsXG4gICAgICAgICdpc1N0YWJsZScsXG4gICAgICAgICdhZGRFbnRyeScsXG4gICAgICAgICdyZW1vdmVFbnRyeScsXG4gICAgICAgICd1cGRhdGVFbnRyeScsXG4gICAgICAgICdnZXRFbnRyeScsXG4gICAgICAgICdhZGRFbWFpbCcsXG4gICAgICAgICdnZXRBc3NpZ25lZFVzZXInLFxuICAgICAgICAnaXNHdWVzdENhcnQnLFxuICAgICAgICAnYWRkRW50cmllcycsXG4gICAgICAgICdyZXF1aXJlTG9hZGVkQ2FydCcsXG4gICAgICAgICdyZWxvYWRBY3RpdmVDYXJ0JyxcbiAgICAgICAgJ2hhc1BpY2t1cEl0ZW1zJyxcbiAgICAgICAgJ2hhc0RlbGl2ZXJ5SXRlbXMnLFxuICAgICAgICAnZ2V0UGlja3VwRW50cmllcycsXG4gICAgICAgICdnZXREZWxpdmVyeUVudHJpZXMnLFxuICAgICAgXSxcbiAgICAgIGFzeW5jOiB0cnVlLFxuICAgIH0pLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBY3RpdmVDYXJ0RmFjYWRlIHtcbiAgLyoqXG4gICAqIFJldHVybnMgYWN0aXZlIGNhcnRcbiAgICovXG4gIGFic3RyYWN0IGdldEFjdGl2ZSgpOiBPYnNlcnZhYmxlPENhcnQ+O1xuXG4gIC8qKlxuICAgKiBXYWl0cyBmb3IgdGhlIGNhcnQgdG8gYmUgc3RhYmxlIGJlZm9yZSByZXR1cm5pbmcgdGhlIGFjdGl2ZSBjYXJ0LlxuICAgKi9cbiAgYWJzdHJhY3QgdGFrZUFjdGl2ZSgpOiBPYnNlcnZhYmxlPENhcnQ+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFjdGl2ZSBjYXJ0IGlkXG4gICAqL1xuICBhYnN0cmFjdCBnZXRBY3RpdmVDYXJ0SWQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIC8qKlxuICAgKiBXYWl0cyBmb3IgdGhlIGNhcnQgdG8gYmUgc3RhYmxlIGJlZm9yZSByZXR1cm5pbmcgdGhlIGFjdGl2ZSBjYXJ0J3MgSUQuXG4gICAqL1xuICBhYnN0cmFjdCB0YWtlQWN0aXZlQ2FydElkKCk6IE9ic2VydmFibGU8c3RyaW5nPjtcblxuICAvKipcbiAgICogUmV0dXJucyBjYXJ0IGVudHJpZXNcbiAgICovXG4gIGFic3RyYWN0IGdldEVudHJpZXMoKTogT2JzZXJ2YWJsZTxPcmRlckVudHJ5W10+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGxhc3QgY2FydCBlbnRyeSBmb3IgcHJvdmlkZWQgcHJvZHVjdCBjb2RlLlxuICAgKiBOZWVkZWQgdG8gY292ZXIgcHJvY2Vzc2VzIHdoZXJlIG11bHRpcGxlIGVudHJpZXMgY2FuIHNoYXJlIHRoZSBzYW1lIHByb2R1Y3QgY29kZVxuICAgKiAoZS5nLiBwcm9tb3Rpb25zIG9yIGNvbmZpZ3VyYWJsZSBwcm9kdWN0cylcbiAgICpcbiAgICogQHBhcmFtIHByb2R1Y3RDb2RlXG4gICAqL1xuICBhYnN0cmFjdCBnZXRMYXN0RW50cnkoXG4gICAgcHJvZHVjdENvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZGVyRW50cnkgfCB1bmRlZmluZWQ+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGNhcnQgbG9hZGluZyBzdGF0ZVxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0TG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgd2hlbiBjYXJ0IGlzIHN0YWJsZSAobm90IGxvYWRpbmcgYW5kIG5vdCBwZW5kaW5nIHByb2Nlc3NlcyBvbiBjYXJ0KVxuICAgKi9cbiAgYWJzdHJhY3QgaXNTdGFibGUoKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvKipcbiAgICogQWRkIGVudHJ5IHRvIGFjdGl2ZSBjYXJ0XG4gICAqXG4gICAqIEBwYXJhbSBwcm9kdWN0Q29kZVxuICAgKiBAcGFyYW0gcXVhbnRpdHlcbiAgICogQHBhcmFtIHBpY2t1cFN0b3JlXG4gICAqL1xuICBhYnN0cmFjdCBhZGRFbnRyeShcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nLFxuICAgIHF1YW50aXR5OiBudW1iZXIsXG4gICAgcGlja3VwU3RvcmU/OiBzdHJpbmdcbiAgKTogdm9pZDtcblxuICAvKipcbiAgICogUmVtb3ZlIGVudHJ5XG4gICAqXG4gICAqIEBwYXJhbSBlbnRyeVxuICAgKi9cbiAgYWJzdHJhY3QgcmVtb3ZlRW50cnkoZW50cnk6IE9yZGVyRW50cnkpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgZW50cnlcbiAgICpcbiAgICogQHBhcmFtIGVudHJ5TnVtYmVyXG4gICAqIEBwYXJhbSBxdWFudGl0eVxuICAgKiBAcGFyYW0gcGlja3VwU3RvcmVcbiAgICogQHBhcmFtIHBpY2t1cFRvRGVsaXZlcnlcbiAgICovXG4gIGFic3RyYWN0IHVwZGF0ZUVudHJ5KFxuICAgIGVudHJ5TnVtYmVyOiBudW1iZXIsXG4gICAgcXVhbnRpdHk6IG51bWJlcixcbiAgICBwaWNrdXBTdG9yZT86IHN0cmluZyxcbiAgICBwaWNrdXBUb0RlbGl2ZXJ5PzogYm9vbGVhblxuICApOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGNhcnQgZW50cnlcbiAgICpcbiAgICogQHBhcmFtIHByb2R1Y3RDb2RlXG4gICAqL1xuICBhYnN0cmFjdCBnZXRFbnRyeShwcm9kdWN0Q29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxPcmRlckVudHJ5IHwgdW5kZWZpbmVkPjtcblxuICAvKipcbiAgICogQXNzaWduIGVtYWlsIHRvIGNhcnRcbiAgICpcbiAgICogQHBhcmFtIGVtYWlsXG4gICAqL1xuICBhYnN0cmFjdCBhZGRFbWFpbChlbWFpbDogc3RyaW5nKTogdm9pZDtcblxuICAvKipcbiAgICogR2V0IGFzc2lnbmVkIHVzZXIgdG8gY2FydFxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0QXNzaWduZWRVc2VyKCk6IE9ic2VydmFibGU8VXNlcj47XG5cbiAgLyoqXG4gICAqIFJldHVybnMgb2JzZXJ2YWJsZSBvZiB0cnVlIGZvciBndWVzdCBjYXJ0XG4gICAqL1xuICBhYnN0cmFjdCBpc0d1ZXN0Q2FydChjYXJ0PzogQ2FydCk6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIEFkZCBtdWx0aXBsZSBlbnRyaWVzIHRvIGEgY2FydFxuICAgKlxuICAgKiBAcGFyYW0gY2FydEVudHJpZXMgOiBsaXN0IG9mIGVudHJpZXMgdG8gYWRkIChPcmRlckVudHJ5W10pXG4gICAqL1xuICBhYnN0cmFjdCBhZGRFbnRyaWVzKGNhcnRFbnRyaWVzOiBPcmRlckVudHJ5W10pOiB2b2lkO1xuXG4gIGFic3RyYWN0IHJlcXVpcmVMb2FkZWRDYXJ0KGZvckd1ZXN0TWVyZ2U/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxDYXJ0PjtcblxuICBhYnN0cmFjdCByZWxvYWRBY3RpdmVDYXJ0KCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybiB3aGV0aGVyIGNhcnQgaGFzIHBpY2t1cCBpdGVtc1xuICAgKi9cbiAgYWJzdHJhY3QgaGFzUGlja3VwSXRlbXMoKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvKipcbiAgICogUmV0dXJuIHdoZXRoZXIgY2FydCBoYXMgZGVsaXZlcnkgaXRlbXNcbiAgICovXG4gIGFic3RyYWN0IGhhc0RlbGl2ZXJ5SXRlbXMoKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvKipcbiAgICogUmV0dXJuIGNhcnQncyBwaWNrdXAgZW50cmllc1xuICAgKi9cbiAgYWJzdHJhY3QgZ2V0UGlja3VwRW50cmllcygpOiBPYnNlcnZhYmxlPE9yZGVyRW50cnlbXT47XG5cbiAgLyoqXG4gICAqIFJldHVybiBjYXJ0J3MgZGVsaXZlcnkgZW50cmllc1xuICAgKi9cbiAgYWJzdHJhY3QgZ2V0RGVsaXZlcnlFbnRyaWVzKCk6IE9ic2VydmFibGU8T3JkZXJFbnRyeVtdPjtcbn1cbiJdfQ==