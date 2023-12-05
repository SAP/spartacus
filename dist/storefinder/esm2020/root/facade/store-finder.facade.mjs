/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory, } from '@spartacus/core';
import { STORE_FINDER_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
/**
 * Store the Point of Service a user wants to collect a product from before it is added to the cart.
 */
export class StoreFinderFacade {
}
StoreFinderFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
StoreFinderFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: StoreFinderFacade,
        feature: STORE_FINDER_FEATURE,
        methods: [
            'getStoresLoading',
            'getStoresLoaded',
            'getFindStoresEntities',
            'getViewAllStoresLoading',
            'getViewAllStoresEntities',
            'findStoresAction',
            'viewAllStores',
            'viewStoreById',
            'callFindStoresAction',
            'getStoreLatitude',
            'getStoreLongitude',
            'getDirections',
            'getFindStoreEntityById',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: StoreFinderFacade,
                        feature: STORE_FINDER_FEATURE,
                        methods: [
                            'getStoresLoading',
                            'getStoresLoaded',
                            'getFindStoresEntities',
                            'getViewAllStoresLoading',
                            'getViewAllStoresEntities',
                            'findStoresAction',
                            'viewAllStores',
                            'viewStoreById',
                            'callFindStoresAction',
                            'getStoreLatitude',
                            'getStoreLongitude',
                            'getDirections',
                            'getFindStoreEntityById',
                        ],
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtZmluZGVyLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9zdG9yZWZpbmRlci9yb290L2ZhY2FkZS9zdG9yZS1maW5kZXIuZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFDTCxhQUFhLEdBSWQsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFHdkQ7O0dBRUc7QUF5QkgsTUFBTSxPQUFnQixpQkFBaUI7OzhHQUFqQixpQkFBaUI7a0hBQWpCLGlCQUFpQixjQXZCekIsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSxpQkFBaUI7UUFDekIsT0FBTyxFQUFFLG9CQUFvQjtRQUM3QixPQUFPLEVBQUU7WUFDUCxrQkFBa0I7WUFDbEIsaUJBQWlCO1lBQ2pCLHVCQUF1QjtZQUN2Qix5QkFBeUI7WUFDekIsMEJBQTBCO1lBQzFCLGtCQUFrQjtZQUNsQixlQUFlO1lBQ2YsZUFBZTtZQUNmLHNCQUFzQjtZQUN0QixrQkFBa0I7WUFDbEIsbUJBQW1CO1lBQ25CLGVBQWU7WUFDZix3QkFBd0I7U0FDekI7UUFDRCxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUM7MkZBRWdCLGlCQUFpQjtrQkF4QnRDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7d0JBQ1osTUFBTSxtQkFBbUI7d0JBQ3pCLE9BQU8sRUFBRSxvQkFBb0I7d0JBQzdCLE9BQU8sRUFBRTs0QkFDUCxrQkFBa0I7NEJBQ2xCLGlCQUFpQjs0QkFDakIsdUJBQXVCOzRCQUN2Qix5QkFBeUI7NEJBQ3pCLDBCQUEwQjs0QkFDMUIsa0JBQWtCOzRCQUNsQixlQUFlOzRCQUNmLGVBQWU7NEJBQ2Ysc0JBQXNCOzRCQUN0QixrQkFBa0I7NEJBQ2xCLG1CQUFtQjs0QkFDbkIsZUFBZTs0QkFDZix3QkFBd0I7eUJBQ3pCO3dCQUNELEtBQUssRUFBRSxJQUFJO3FCQUNaLENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBmYWNhZGVGYWN0b3J5LFxuICBHZW9Qb2ludCxcbiAgUG9pbnRPZlNlcnZpY2UsXG4gIFNlYXJjaENvbmZpZyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNUT1JFX0ZJTkRFUl9GRUFUVVJFIH0gZnJvbSAnLi4vZmVhdHVyZS1uYW1lJztcbmltcG9ydCB7IFN0b3JlRW50aXRpZXMgfSBmcm9tICcuLi9tb2RlbC9zdG9yZS1lbnRpdGllcy5tb2RlbCc7XG5cbi8qKlxuICogU3RvcmUgdGhlIFBvaW50IG9mIFNlcnZpY2UgYSB1c2VyIHdhbnRzIHRvIGNvbGxlY3QgYSBwcm9kdWN0IGZyb20gYmVmb3JlIGl0IGlzIGFkZGVkIHRvIHRoZSBjYXJ0LlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogU3RvcmVGaW5kZXJGYWNhZGUsXG4gICAgICBmZWF0dXJlOiBTVE9SRV9GSU5ERVJfRkVBVFVSRSxcbiAgICAgIG1ldGhvZHM6IFtcbiAgICAgICAgJ2dldFN0b3Jlc0xvYWRpbmcnLFxuICAgICAgICAnZ2V0U3RvcmVzTG9hZGVkJyxcbiAgICAgICAgJ2dldEZpbmRTdG9yZXNFbnRpdGllcycsXG4gICAgICAgICdnZXRWaWV3QWxsU3RvcmVzTG9hZGluZycsXG4gICAgICAgICdnZXRWaWV3QWxsU3RvcmVzRW50aXRpZXMnLFxuICAgICAgICAnZmluZFN0b3Jlc0FjdGlvbicsXG4gICAgICAgICd2aWV3QWxsU3RvcmVzJyxcbiAgICAgICAgJ3ZpZXdTdG9yZUJ5SWQnLFxuICAgICAgICAnY2FsbEZpbmRTdG9yZXNBY3Rpb24nLFxuICAgICAgICAnZ2V0U3RvcmVMYXRpdHVkZScsXG4gICAgICAgICdnZXRTdG9yZUxvbmdpdHVkZScsXG4gICAgICAgICdnZXREaXJlY3Rpb25zJyxcbiAgICAgICAgJ2dldEZpbmRTdG9yZUVudGl0eUJ5SWQnLFxuICAgICAgXSxcbiAgICAgIGFzeW5jOiB0cnVlLFxuICAgIH0pLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdG9yZUZpbmRlckZhY2FkZSB7XG4gIGFic3RyYWN0IGdldFN0b3Jlc0xvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgYWJzdHJhY3QgZ2V0U3RvcmVzTG9hZGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIGFic3RyYWN0IGdldEZpbmRTdG9yZXNFbnRpdGllcygpOiBPYnNlcnZhYmxlPFN0b3JlRW50aXRpZXM+O1xuICBhYnN0cmFjdCBnZXRWaWV3QWxsU3RvcmVzTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBhYnN0cmFjdCBnZXRWaWV3QWxsU3RvcmVzRW50aXRpZXMoKTogT2JzZXJ2YWJsZTxTdG9yZUVudGl0aWVzPjtcbiAgYWJzdHJhY3QgZmluZFN0b3Jlc0FjdGlvbihcbiAgICBxdWVyeVRleHQ6IHN0cmluZyxcbiAgICBzZWFyY2hDb25maWc/OiBTZWFyY2hDb25maWcsXG4gICAgbG9uZ2l0dWRlTGF0aXR1ZGU/OiBHZW9Qb2ludCxcbiAgICBjb3VudHJ5SXNvQ29kZT86IHN0cmluZyxcbiAgICB1c2VNeUxvY2F0aW9uPzogYm9vbGVhbixcbiAgICByYWRpdXM/OiBudW1iZXJcbiAgKTogdm9pZDtcbiAgYWJzdHJhY3Qgdmlld0FsbFN0b3JlcygpOiB2b2lkO1xuICBhYnN0cmFjdCB2aWV3U3RvcmVCeUlkKHN0b3JlSWQ6IHN0cmluZyk6IHZvaWQ7XG4gIGFic3RyYWN0IGNhbGxGaW5kU3RvcmVzQWN0aW9uKHJvdXRlUGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9KTogdm9pZDtcbiAgYWJzdHJhY3QgZ2V0U3RvcmVMYXRpdHVkZShsb2NhdGlvbjogUG9pbnRPZlNlcnZpY2UpOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIGFic3RyYWN0IGdldFN0b3JlTG9uZ2l0dWRlKGxvY2F0aW9uOiBQb2ludE9mU2VydmljZSk6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgYWJzdHJhY3QgZ2V0RGlyZWN0aW9ucyhsb2NhdGlvbjogUG9pbnRPZlNlcnZpY2UpOiBzdHJpbmc7XG4gIGFic3RyYWN0IGdldEZpbmRTdG9yZUVudGl0eUJ5SWQoKTogT2JzZXJ2YWJsZTxTdG9yZUVudGl0aWVzPjtcbn1cbiJdfQ==