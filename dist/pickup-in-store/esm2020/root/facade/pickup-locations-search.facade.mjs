/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory, } from '@spartacus/core';
import { PICKUP_IN_STORE_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
// TODO jsdoc
// TODO split this service
export class PickupLocationsSearchFacade {
}
PickupLocationsSearchFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationsSearchFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
PickupLocationsSearchFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationsSearchFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: PickupLocationsSearchFacade,
        feature: PICKUP_IN_STORE_CORE_FEATURE,
        methods: [
            'clearSearchResults',
            'getHideOutOfStock',
            'getSearchResults',
            'getStockLevelAtStore',
            'getStoreDetails',
            'hasSearchStarted',
            'isSearchRunning',
            'loadStoreDetails',
            'setBrowserLocation',
            'startSearch',
            'stockLevelAtStore',
            'toggleHideOutOfStock',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PickupLocationsSearchFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: PickupLocationsSearchFacade,
                        feature: PICKUP_IN_STORE_CORE_FEATURE,
                        methods: [
                            'clearSearchResults',
                            'getHideOutOfStock',
                            'getSearchResults',
                            'getStockLevelAtStore',
                            'getStoreDetails',
                            'hasSearchStarted',
                            'isSearchRunning',
                            'loadStoreDetails',
                            'setBrowserLocation',
                            'startSearch',
                            'stockLevelAtStore',
                            'toggleHideOutOfStock',
                        ],
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlja3VwLWxvY2F0aW9ucy1zZWFyY2guZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BpY2t1cC1pbi1zdG9yZS9yb290L2ZhY2FkZS9waWNrdXAtbG9jYXRpb25zLXNlYXJjaC5mYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUNMLGFBQWEsR0FJZCxNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUcvRCxhQUFhO0FBRWIsMEJBQTBCO0FBeUIxQixNQUFNLE9BQWdCLDJCQUEyQjs7d0hBQTNCLDJCQUEyQjs0SEFBM0IsMkJBQTJCLGNBdEJuQyxNQUFNLGNBQ04sR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO1FBQ1osTUFBTSxFQUFFLDJCQUEyQjtRQUNuQyxPQUFPLEVBQUUsNEJBQTRCO1FBQ3JDLE9BQU8sRUFBRTtZQUNQLG9CQUFvQjtZQUNwQixtQkFBbUI7WUFDbkIsa0JBQWtCO1lBQ2xCLHNCQUFzQjtZQUN0QixpQkFBaUI7WUFDakIsa0JBQWtCO1lBQ2xCLGlCQUFpQjtZQUNqQixrQkFBa0I7WUFDbEIsb0JBQW9CO1lBQ3BCLGFBQWE7WUFDYixtQkFBbUI7WUFDbkIsc0JBQXNCO1NBQ3ZCO1FBQ0QsS0FBSyxFQUFFLElBQUk7S0FDWixDQUFDOzJGQUVnQiwyQkFBMkI7a0JBdkJoRCxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0sNkJBQTZCO3dCQUNuQyxPQUFPLEVBQUUsNEJBQTRCO3dCQUNyQyxPQUFPLEVBQUU7NEJBQ1Asb0JBQW9COzRCQUNwQixtQkFBbUI7NEJBQ25CLGtCQUFrQjs0QkFDbEIsc0JBQXNCOzRCQUN0QixpQkFBaUI7NEJBQ2pCLGtCQUFrQjs0QkFDbEIsaUJBQWlCOzRCQUNqQixrQkFBa0I7NEJBQ2xCLG9CQUFvQjs0QkFDcEIsYUFBYTs0QkFDYixtQkFBbUI7NEJBQ25CLHNCQUFzQjt5QkFDdkI7d0JBQ0QsS0FBSyxFQUFFLElBQUk7cUJBQ1osQ0FBQztpQkFDTCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIGZhY2FkZUZhY3RvcnksXG4gIFBvaW50T2ZTZXJ2aWNlLFxuICBQb2ludE9mU2VydmljZVN0b2NrLFxuICBTdG9jayxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBJQ0tVUF9JTl9TVE9SRV9DT1JFX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuaW1wb3J0IHsgU3RvY2tMb2NhdGlvblNlYXJjaFBhcmFtcyB9IGZyb20gJy4uL21vZGVsJztcblxuLy8gVE9ETyBqc2RvY1xuXG4vLyBUT0RPIHNwbGl0IHRoaXMgc2VydmljZVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogUGlja3VwTG9jYXRpb25zU2VhcmNoRmFjYWRlLFxuICAgICAgZmVhdHVyZTogUElDS1VQX0lOX1NUT1JFX0NPUkVfRkVBVFVSRSxcbiAgICAgIG1ldGhvZHM6IFtcbiAgICAgICAgJ2NsZWFyU2VhcmNoUmVzdWx0cycsXG4gICAgICAgICdnZXRIaWRlT3V0T2ZTdG9jaycsXG4gICAgICAgICdnZXRTZWFyY2hSZXN1bHRzJyxcbiAgICAgICAgJ2dldFN0b2NrTGV2ZWxBdFN0b3JlJyxcbiAgICAgICAgJ2dldFN0b3JlRGV0YWlscycsXG4gICAgICAgICdoYXNTZWFyY2hTdGFydGVkJyxcbiAgICAgICAgJ2lzU2VhcmNoUnVubmluZycsXG4gICAgICAgICdsb2FkU3RvcmVEZXRhaWxzJyxcbiAgICAgICAgJ3NldEJyb3dzZXJMb2NhdGlvbicsXG4gICAgICAgICdzdGFydFNlYXJjaCcsXG4gICAgICAgICdzdG9ja0xldmVsQXRTdG9yZScsXG4gICAgICAgICd0b2dnbGVIaWRlT3V0T2ZTdG9jaycsXG4gICAgICBdLFxuICAgICAgYXN5bmM6IHRydWUsXG4gICAgfSksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBpY2t1cExvY2F0aW9uc1NlYXJjaEZhY2FkZSB7XG4gIGFic3RyYWN0IHN0b2NrTGV2ZWxBdFN0b3JlKHByb2R1Y3RDb2RlOiBzdHJpbmcsIHN0b3JlTmFtZTogc3RyaW5nKTogdm9pZDtcbiAgYWJzdHJhY3QgZ2V0U3RvY2tMZXZlbEF0U3RvcmUoXG4gICAgcHJvZHVjdENvZGU6IHN0cmluZyxcbiAgICBzdG9yZU5hbWU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFN0b2NrIHwgdW5kZWZpbmVkPjtcblxuICBhYnN0cmFjdCBzdGFydFNlYXJjaChzZWFyY2hQYXJhbXM6IFN0b2NrTG9jYXRpb25TZWFyY2hQYXJhbXMpOiB2b2lkO1xuICBhYnN0cmFjdCBoYXNTZWFyY2hTdGFydGVkKHByb2R1Y3RDb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBhYnN0cmFjdCBpc1NlYXJjaFJ1bm5pbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgYWJzdHJhY3QgZ2V0U2VhcmNoUmVzdWx0cyhcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8UG9pbnRPZlNlcnZpY2VTdG9ja1tdPjtcbiAgYWJzdHJhY3QgY2xlYXJTZWFyY2hSZXN1bHRzKCk6IHZvaWQ7XG4gIGFic3RyYWN0IGdldEhpZGVPdXRPZlN0b2NrKCk6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIGFic3RyYWN0IHNldEJyb3dzZXJMb2NhdGlvbihsYXRpdHVkZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlcik6IHZvaWQ7XG4gIGFic3RyYWN0IHRvZ2dsZUhpZGVPdXRPZlN0b2NrKCk6IHZvaWQ7XG5cbiAgYWJzdHJhY3QgZ2V0U3RvcmVEZXRhaWxzKG5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8UG9pbnRPZlNlcnZpY2U+O1xuICBhYnN0cmFjdCBsb2FkU3RvcmVEZXRhaWxzKG5hbWU6IHN0cmluZyk6IHZvaWQ7XG59XG4iXX0=