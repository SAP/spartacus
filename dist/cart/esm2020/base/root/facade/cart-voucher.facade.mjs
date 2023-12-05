/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CART_BASE_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class CartVoucherFacade {
}
CartVoucherFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CartVoucherFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: CartVoucherFacade,
        feature: CART_BASE_CORE_FEATURE,
        methods: [
            'addVoucher',
            'removeVoucher',
            'getAddVoucherResultError',
            'getAddVoucherResultSuccess',
            'getAddVoucherResultLoading',
            'resetAddVoucherProcessingState',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: CartVoucherFacade,
                        feature: CART_BASE_CORE_FEATURE,
                        methods: [
                            'addVoucher',
                            'removeVoucher',
                            'getAddVoucherResultError',
                            'getAddVoucherResultSuccess',
                            'getAddVoucherResultLoading',
                            'resetAddVoucherProcessingState',
                        ],
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC12b3VjaGVyLmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2Uvcm9vdC9mYWNhZGUvY2FydC12b3VjaGVyLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFaEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBbUJ6RCxNQUFNLE9BQWdCLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjtrSEFBakIsaUJBQWlCLGNBaEJ6QixNQUFNLGNBQ04sR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO1FBQ1osTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixPQUFPLEVBQUUsc0JBQXNCO1FBQy9CLE9BQU8sRUFBRTtZQUNQLFlBQVk7WUFDWixlQUFlO1lBQ2YsMEJBQTBCO1lBQzFCLDRCQUE0QjtZQUM1Qiw0QkFBNEI7WUFDNUIsZ0NBQWdDO1NBQ2pDO1FBQ0QsS0FBSyxFQUFFLElBQUk7S0FDWixDQUFDOzJGQUVnQixpQkFBaUI7a0JBakJ0QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUsR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO3dCQUNaLE1BQU0sbUJBQW1CO3dCQUN6QixPQUFPLEVBQUUsc0JBQXNCO3dCQUMvQixPQUFPLEVBQUU7NEJBQ1AsWUFBWTs0QkFDWixlQUFlOzRCQUNmLDBCQUEwQjs0QkFDMUIsNEJBQTRCOzRCQUM1Qiw0QkFBNEI7NEJBQzVCLGdDQUFnQzt5QkFDakM7d0JBQ0QsS0FBSyxFQUFFLElBQUk7cUJBQ1osQ0FBQztpQkFDTCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZhY2FkZUZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ0FSVF9CQVNFX0NPUkVfRkVBVFVSRSB9IGZyb20gJy4uL2ZlYXR1cmUtbmFtZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICB1c2VGYWN0b3J5OiAoKSA9PlxuICAgIGZhY2FkZUZhY3Rvcnkoe1xuICAgICAgZmFjYWRlOiBDYXJ0Vm91Y2hlckZhY2FkZSxcbiAgICAgIGZlYXR1cmU6IENBUlRfQkFTRV9DT1JFX0ZFQVRVUkUsXG4gICAgICBtZXRob2RzOiBbXG4gICAgICAgICdhZGRWb3VjaGVyJyxcbiAgICAgICAgJ3JlbW92ZVZvdWNoZXInLFxuICAgICAgICAnZ2V0QWRkVm91Y2hlclJlc3VsdEVycm9yJyxcbiAgICAgICAgJ2dldEFkZFZvdWNoZXJSZXN1bHRTdWNjZXNzJyxcbiAgICAgICAgJ2dldEFkZFZvdWNoZXJSZXN1bHRMb2FkaW5nJyxcbiAgICAgICAgJ3Jlc2V0QWRkVm91Y2hlclByb2Nlc3NpbmdTdGF0ZScsXG4gICAgICBdLFxuICAgICAgYXN5bmM6IHRydWUsXG4gICAgfSksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENhcnRWb3VjaGVyRmFjYWRlIHtcbiAgYWJzdHJhY3QgYWRkVm91Y2hlcih2b3VjaGVySWQ6IHN0cmluZywgY2FydElkPzogc3RyaW5nKTogdm9pZDtcblxuICBhYnN0cmFjdCByZW1vdmVWb3VjaGVyKHZvdWNoZXJJZDogc3RyaW5nLCBjYXJ0SWQ/OiBzdHJpbmcpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBHZXQgYWRkIHZvdWNoZXIgcHJvY2VzcyBlcnJvciBmbGFnXG4gICAqL1xuICBhYnN0cmFjdCBnZXRBZGRWb3VjaGVyUmVzdWx0RXJyb3IoKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvKipcbiAgICogR2V0IGFkZCB2b3VjaGVyIHByb2Nlc3Mgc3VjY2VzcyBmbGFnXG4gICAqL1xuICBhYnN0cmFjdCBnZXRBZGRWb3VjaGVyUmVzdWx0U3VjY2VzcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBHZXQgYWRkIHZvdWNoZXIgcHJvY2VzcyBsb2FkaW5nIGZsYWdcbiAgICovXG4gIGFic3RyYWN0IGdldEFkZFZvdWNoZXJSZXN1bHRMb2FkaW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIFJlc2V0IGFkZCB2b3VjaGVyIHByb2Nlc3NcbiAgICovXG4gIGFic3RyYWN0IHJlc2V0QWRkVm91Y2hlclByb2Nlc3NpbmdTdGF0ZSgpOiB2b2lkO1xufVxuIl19