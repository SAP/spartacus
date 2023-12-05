/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { ORDER_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class OrderFacade {
}
OrderFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OrderFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: OrderFacade,
        feature: ORDER_CORE_FEATURE,
        methods: [
            'getOrderDetails',
            'clearPlacedOrder',
            'setPlacedOrder',
            'placeOrder',
            'getPickupEntries',
            'getDeliveryEntries',
        ],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: OrderFacade,
                        feature: ORDER_CORE_FEATURE,
                        methods: [
                            'getOrderDetails',
                            'clearPlacedOrder',
                            'setPlacedOrder',
                            'placeOrder',
                            'getPickupEntries',
                            'getDeliveryEntries',
                        ],
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL3Jvb3QvZmFjYWRlL29yZGVyLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBbUJyRCxNQUFNLE9BQWdCLFdBQVc7O3dHQUFYLFdBQVc7NEdBQVgsV0FBVyxjQWZuQixNQUFNLGNBQ04sR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO1FBQ1osTUFBTSxFQUFFLFdBQVc7UUFDbkIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUU7WUFDUCxpQkFBaUI7WUFDakIsa0JBQWtCO1lBQ2xCLGdCQUFnQjtZQUNoQixZQUFZO1lBQ1osa0JBQWtCO1lBQ2xCLG9CQUFvQjtTQUNyQjtLQUNGLENBQUM7MkZBRWdCLFdBQVc7a0JBaEJoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0sYUFBYTt3QkFDbkIsT0FBTyxFQUFFLGtCQUFrQjt3QkFDM0IsT0FBTyxFQUFFOzRCQUNQLGlCQUFpQjs0QkFDakIsa0JBQWtCOzRCQUNsQixnQkFBZ0I7NEJBQ2hCLFlBQVk7NEJBQ1osa0JBQWtCOzRCQUNsQixvQkFBb0I7eUJBQ3JCO3FCQUNGLENBQUM7aUJBQ0wiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPcmRlckVudHJ5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBmYWNhZGVGYWN0b3J5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9SREVSX0NPUkVfRkVBVFVSRSB9IGZyb20gJy4uL2ZlYXR1cmUtbmFtZSc7XG5pbXBvcnQgeyBPcmRlciB9IGZyb20gJy4uL21vZGVsL29yZGVyLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6ICgpID0+XG4gICAgZmFjYWRlRmFjdG9yeSh7XG4gICAgICBmYWNhZGU6IE9yZGVyRmFjYWRlLFxuICAgICAgZmVhdHVyZTogT1JERVJfQ09SRV9GRUFUVVJFLFxuICAgICAgbWV0aG9kczogW1xuICAgICAgICAnZ2V0T3JkZXJEZXRhaWxzJyxcbiAgICAgICAgJ2NsZWFyUGxhY2VkT3JkZXInLFxuICAgICAgICAnc2V0UGxhY2VkT3JkZXInLFxuICAgICAgICAncGxhY2VPcmRlcicsXG4gICAgICAgICdnZXRQaWNrdXBFbnRyaWVzJyxcbiAgICAgICAgJ2dldERlbGl2ZXJ5RW50cmllcycsXG4gICAgICBdLFxuICAgIH0pLFxufSlcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBPcmRlckZhY2FkZSB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IG9yZGVyXG4gICAqL1xuICBhYnN0cmFjdCBnZXRPcmRlckRldGFpbHMoKTogT2JzZXJ2YWJsZTxPcmRlciB8IHVuZGVmaW5lZD47XG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGN1cnJlbnQgb3JkZXJcbiAgICovXG4gIGFic3RyYWN0IGNsZWFyUGxhY2VkT3JkZXIoKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldHMgdGhlIHByb3ZpZGVkIG9yZGVyIGFzIGN1cnJlbnRcbiAgICovXG4gIGFic3RyYWN0IHNldFBsYWNlZE9yZGVyKG9yZGVyOiBPcmRlcik6IHZvaWQ7XG4gIC8qKlxuICAgKiBQbGFjZXMgYW4gb3JkZXJcbiAgICovXG4gIGFic3RyYWN0IHBsYWNlT3JkZXIodGVybXNDaGVja2VkOiBib29sZWFuKTogT2JzZXJ2YWJsZTxPcmRlcj47XG4gIC8qKlxuICAgKiBSZXR1cm4gb3JkZXIncyBwaWNrdXAgZW50cmllc1xuICAgKi9cbiAgYWJzdHJhY3QgZ2V0UGlja3VwRW50cmllcygpOiBPYnNlcnZhYmxlPE9yZGVyRW50cnlbXT47XG5cbiAgLyoqXG4gICAqIFJldHVybiBvcmRlcidzIGRlbGl2ZXJ5IGVudHJpZXNcbiAgICovXG4gIGFic3RyYWN0IGdldERlbGl2ZXJ5RW50cmllcygpOiBPYnNlcnZhYmxlPE9yZGVyRW50cnlbXT47XG59XG4iXX0=