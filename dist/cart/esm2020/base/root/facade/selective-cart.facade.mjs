/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CART_BASE_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class SelectiveCartFacade {
}
SelectiveCartFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectiveCartFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SelectiveCartFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectiveCartFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: SelectiveCartFacade,
        feature: CART_BASE_CORE_FEATURE,
        methods: [
            'getCart',
            'getEntries',
            'isStable',
            'addEntry',
            'removeEntry',
            'updateEntry',
            'getEntry',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SelectiveCartFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: SelectiveCartFacade,
                        feature: CART_BASE_CORE_FEATURE,
                        methods: [
                            'getCart',
                            'getEntries',
                            'isStable',
                            'addEntry',
                            'removeEntry',
                            'updateEntry',
                            'getEntry',
                        ],
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aXZlLWNhcnQuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9yb290L2ZhY2FkZS9zZWxlY3RpdmUtY2FydC5mYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQXFCekQsTUFBTSxPQUFnQixtQkFBbUI7O2dIQUFuQixtQkFBbUI7b0hBQW5CLG1CQUFtQixjQWpCM0IsTUFBTSxjQUNOLEdBQUcsRUFBRSxDQUNmLGFBQWEsQ0FBQztRQUNaLE1BQU0sRUFBRSxtQkFBbUI7UUFDM0IsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixPQUFPLEVBQUU7WUFDUCxTQUFTO1lBQ1QsWUFBWTtZQUNaLFVBQVU7WUFDVixVQUFVO1lBQ1YsYUFBYTtZQUNiLGFBQWE7WUFDYixVQUFVO1NBQ1g7UUFDRCxLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUM7MkZBRWdCLG1CQUFtQjtrQkFsQnhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7d0JBQ1osTUFBTSxxQkFBcUI7d0JBQzNCLE9BQU8sRUFBRSxzQkFBc0I7d0JBQy9CLE9BQU8sRUFBRTs0QkFDUCxTQUFTOzRCQUNULFlBQVk7NEJBQ1osVUFBVTs0QkFDVixVQUFVOzRCQUNWLGFBQWE7NEJBQ2IsYUFBYTs0QkFDYixVQUFVO3lCQUNYO3dCQUNELEtBQUssRUFBRSxJQUFJO3FCQUNaLENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENBUlRfQkFTRV9DT1JFX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuaW1wb3J0IHsgQ2FydCwgT3JkZXJFbnRyeSB9IGZyb20gJy4uL21vZGVscy9jYXJ0Lm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6ICgpID0+XG4gICAgZmFjYWRlRmFjdG9yeSh7XG4gICAgICBmYWNhZGU6IFNlbGVjdGl2ZUNhcnRGYWNhZGUsXG4gICAgICBmZWF0dXJlOiBDQVJUX0JBU0VfQ09SRV9GRUFUVVJFLFxuICAgICAgbWV0aG9kczogW1xuICAgICAgICAnZ2V0Q2FydCcsXG4gICAgICAgICdnZXRFbnRyaWVzJyxcbiAgICAgICAgJ2lzU3RhYmxlJyxcbiAgICAgICAgJ2FkZEVudHJ5JyxcbiAgICAgICAgJ3JlbW92ZUVudHJ5JyxcbiAgICAgICAgJ3VwZGF0ZUVudHJ5JyxcbiAgICAgICAgJ2dldEVudHJ5JyxcbiAgICAgIF0sXG4gICAgICBhc3luYzogdHJ1ZSxcbiAgICB9KSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2VsZWN0aXZlQ2FydEZhY2FkZSB7XG4gIGFic3RyYWN0IGdldENhcnQoKTogT2JzZXJ2YWJsZTxDYXJ0PjtcblxuICBhYnN0cmFjdCBnZXRFbnRyaWVzKCk6IE9ic2VydmFibGU8T3JkZXJFbnRyeVtdPjtcblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIHdoZW4gc2VsZWN0aXZlIGNhcnQgaXMgc3RhYmxlIChub3QgbG9hZGluZyBhbmQgbm90IHBlbmRpbmcgcHJvY2Vzc2VzIG9uIGNhcnQpXG4gICAqL1xuICBhYnN0cmFjdCBpc1N0YWJsZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIGFic3RyYWN0IGFkZEVudHJ5KHByb2R1Y3RDb2RlOiBzdHJpbmcsIHF1YW50aXR5OiBudW1iZXIpOiB2b2lkO1xuXG4gIGFic3RyYWN0IHJlbW92ZUVudHJ5KGVudHJ5OiBPcmRlckVudHJ5KTogdm9pZDtcblxuICBhYnN0cmFjdCB1cGRhdGVFbnRyeShlbnRyeU51bWJlcjogbnVtYmVyLCBxdWFudGl0eTogbnVtYmVyKTogdm9pZDtcblxuICBhYnN0cmFjdCBnZXRFbnRyeShwcm9kdWN0Q29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxPcmRlckVudHJ5IHwgdW5kZWZpbmVkPjtcbn1cbiJdfQ==