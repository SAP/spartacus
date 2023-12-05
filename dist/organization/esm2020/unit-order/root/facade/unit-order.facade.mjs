/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { ORGANIZATION_UNIT_ORDER_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export function unitOrderFacadeFactory() {
    return facadeFactory({
        facade: UnitOrderFacade,
        feature: ORGANIZATION_UNIT_ORDER_FEATURE,
        methods: [
            'getOrderHistoryList',
            'getOrderHistoryListLoaded',
            'loadOrderList',
            'clearOrderList',
            'getOrderDetails',
            'loadOrderDetails',
            'clearOrderDetails',
        ],
        async: true,
    });
}
export class UnitOrderFacade {
}
UnitOrderFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UnitOrderFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderFacade, providedIn: 'root', useFactory: unitOrderFacadeFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: unitOrderFacadeFactory,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1vcmRlci5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL3VuaXQtb3JkZXIvcm9vdC9mYWNhZGUvdW5pdC1vcmRlci5mYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR2hELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUVsRSxNQUFNLFVBQVUsc0JBQXNCO0lBQ3BDLE9BQU8sYUFBYSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxlQUFlO1FBQ3ZCLE9BQU8sRUFBRSwrQkFBK0I7UUFDeEMsT0FBTyxFQUFFO1lBQ1AscUJBQXFCO1lBQ3JCLDJCQUEyQjtZQUMzQixlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLGlCQUFpQjtZQUNqQixrQkFBa0I7WUFDbEIsbUJBQW1CO1NBQ3BCO1FBQ0QsS0FBSyxFQUFFLElBQUk7S0FDWixDQUFDLENBQUM7QUFDTCxDQUFDO0FBTUQsTUFBTSxPQUFnQixlQUFlOzs0R0FBZixlQUFlO2dIQUFmLGVBQWUsY0FIdkIsTUFBTSxjQUNOLHNCQUFzQjsyRkFFZCxlQUFlO2tCQUpwQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsc0JBQXNCO2lCQUNuQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZhY2FkZUZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXIsIE9yZGVySGlzdG9yeUxpc3QgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT1JHQU5JWkFUSU9OX1VOSVRfT1JERVJfRkVBVFVSRSB9IGZyb20gJy4uL2ZlYXR1cmUtbmFtZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1bml0T3JkZXJGYWNhZGVGYWN0b3J5KCkge1xuICByZXR1cm4gZmFjYWRlRmFjdG9yeSh7XG4gICAgZmFjYWRlOiBVbml0T3JkZXJGYWNhZGUsXG4gICAgZmVhdHVyZTogT1JHQU5JWkFUSU9OX1VOSVRfT1JERVJfRkVBVFVSRSxcbiAgICBtZXRob2RzOiBbXG4gICAgICAnZ2V0T3JkZXJIaXN0b3J5TGlzdCcsXG4gICAgICAnZ2V0T3JkZXJIaXN0b3J5TGlzdExvYWRlZCcsXG4gICAgICAnbG9hZE9yZGVyTGlzdCcsXG4gICAgICAnY2xlYXJPcmRlckxpc3QnLFxuICAgICAgJ2dldE9yZGVyRGV0YWlscycsXG4gICAgICAnbG9hZE9yZGVyRGV0YWlscycsXG4gICAgICAnY2xlYXJPcmRlckRldGFpbHMnLFxuICAgIF0sXG4gICAgYXN5bmM6IHRydWUsXG4gIH0pO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogdW5pdE9yZGVyRmFjYWRlRmFjdG9yeSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVW5pdE9yZGVyRmFjYWRlIHtcbiAgLyoqXG4gICAqIFJldHVybnMgb3JkZXIgaGlzdG9yeSBsaXN0XG4gICAqL1xuICBhYnN0cmFjdCBnZXRPcmRlckhpc3RvcnlMaXN0KFxuICAgIHBhZ2VTaXplOiBudW1iZXJcbiAgKTogT2JzZXJ2YWJsZTxPcmRlckhpc3RvcnlMaXN0IHwgdW5kZWZpbmVkPjtcblxuICAvKipcbiAgICogUmV0dXJucyBhIGxvYWRlZCBmbGFnIGZvciBvcmRlciBoaXN0b3J5IGxpc3RcbiAgICovXG4gIGFic3RyYWN0IGdldE9yZGVySGlzdG9yeUxpc3RMb2FkZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvKipcbiAgICogUmV0cmlldmVzIGFuIG9yZGVyIGxpc3RcbiAgICogQHBhcmFtIHBhZ2VTaXplIHBhZ2Ugc2l6ZVxuICAgKiBAcGFyYW0gY3VycmVudFBhZ2UgY3VycmVudCBwYWdlXG4gICAqIEBwYXJhbSBmaWx0ZXJzIGZpbHRlcnMgdmFsdWVzIGZvciBidXllciBhbmQgdW5pdCBnaXZlbiBpbiBmb3JtYXQgJzo6dXNlcjo8dXNlckZpbHRlcj46dW5pdDo8dW5pdEZpbHRlcj4nXG4gICAqIEBwYXJhbSBzb3J0IHNvcnRcbiAgICovXG4gIGFic3RyYWN0IGxvYWRPcmRlckxpc3QoXG4gICAgcGFnZVNpemU6IG51bWJlcixcbiAgICBjdXJyZW50UGFnZT86IG51bWJlcixcbiAgICBmaWx0ZXJzPzogc3RyaW5nLFxuICAgIHNvcnQ/OiBzdHJpbmdcbiAgKTogdm9pZDtcblxuICAvKipcbiAgICogQ2xlYW5pbmcgb3JkZXIgbGlzdFxuICAgKi9cbiAgYWJzdHJhY3QgY2xlYXJPcmRlckxpc3QoKTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvcmRlcidzIGRldGFpbFxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0T3JkZXJEZXRhaWxzKCk6IE9ic2VydmFibGU8T3JkZXI+O1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgb3JkZXIncyBkZXRhaWxzXG4gICAqXG4gICAqIEBwYXJhbSBvcmRlckNvZGUgYW4gb3JkZXIgY29kZVxuICAgKi9cbiAgYWJzdHJhY3QgbG9hZE9yZGVyRGV0YWlscyhvcmRlckNvZGU6IHN0cmluZyk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIENsZWFycyBvcmRlcidzIGRldGFpbHNcbiAgICovXG4gIGFic3RyYWN0IGNsZWFyT3JkZXJEZXRhaWxzKCk6IHZvaWQ7XG59XG4iXX0=