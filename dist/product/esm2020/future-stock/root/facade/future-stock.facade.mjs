/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { PRODUCT_FUTURE_STOCK_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export function futureStockFacadeFactory() {
    return facadeFactory({
        facade: FutureStockFacade,
        feature: PRODUCT_FUTURE_STOCK_CORE_FEATURE,
        methods: ['getFutureStock'],
    });
}
export class FutureStockFacade {
}
FutureStockFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FutureStockFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockFacade, providedIn: 'root', useFactory: futureStockFacadeFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: futureStockFacadeFactory,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnV0dXJlLXN0b2NrLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9wcm9kdWN0L2Z1dHVyZS1zdG9jay9yb290L2ZhY2FkZS9mdXR1cmUtc3RvY2suZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFcEUsTUFBTSxVQUFVLHdCQUF3QjtJQUN0QyxPQUFPLGFBQWEsQ0FBQztRQUNuQixNQUFNLEVBQUUsaUJBQWlCO1FBQ3pCLE9BQU8sRUFBRSxpQ0FBaUM7UUFDMUMsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7S0FDNUIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQU1ELE1BQU0sT0FBZ0IsaUJBQWlCOzs4R0FBakIsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FIekIsTUFBTSxjQUNOLHdCQUF3QjsyRkFFaEIsaUJBQWlCO2tCQUp0QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsd0JBQXdCO2lCQUNyQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZhY2FkZUZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUFJPRFVDVF9GVVRVUkVfU1RPQ0tfQ09SRV9GRUFUVVJFIH0gZnJvbSAnLi4vZmVhdHVyZS1uYW1lJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZ1dHVyZVN0b2NrRmFjYWRlRmFjdG9yeSgpIHtcbiAgcmV0dXJuIGZhY2FkZUZhY3Rvcnkoe1xuICAgIGZhY2FkZTogRnV0dXJlU3RvY2tGYWNhZGUsXG4gICAgZmVhdHVyZTogUFJPRFVDVF9GVVRVUkVfU1RPQ0tfQ09SRV9GRUFUVVJFLFxuICAgIG1ldGhvZHM6IFsnZ2V0RnV0dXJlU3RvY2snXSxcbiAgfSk7XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VGYWN0b3J5OiBmdXR1cmVTdG9ja0ZhY2FkZUZhY3RvcnksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZ1dHVyZVN0b2NrRmFjYWRlIHtcbiAgLyoqXG4gICAqIEdldCBmdXR1cmUgc3RvY2tcbiAgICovXG4gIGFic3RyYWN0IGdldEZ1dHVyZVN0b2NrKCk6IE9ic2VydmFibGU8YW55Pjtcbn1cbiJdfQ==