/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, inject } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { GlobalMessageType, LoggerService, normalizeHttpError, } from '@spartacus/core';
import { from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CartActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors/voucher/cart-voucher.connector";
import * as i3 from "@spartacus/core";
export class CartVoucherEffects {
    constructor(actions$, cartVoucherConnector, messageService) {
        this.actions$ = actions$;
        this.cartVoucherConnector = cartVoucherConnector;
        this.messageService = messageService;
        this.logger = inject(LoggerService);
        this.addCartVoucher$ = createEffect(() => this.actions$.pipe(ofType(CartActions.CART_ADD_VOUCHER), map((action) => action.payload), mergeMap((payload) => {
            return this.cartVoucherConnector
                .add(payload.userId, payload.cartId, payload.voucherId)
                .pipe(map(() => {
                this.showGlobalMessage('voucher.applyVoucherSuccess', payload.voucherId, GlobalMessageType.MSG_TYPE_CONFIRMATION);
                return new CartActions.CartAddVoucherSuccess({
                    ...payload,
                });
            }), catchError((error) => from([
                new CartActions.CartAddVoucherFail({
                    ...payload,
                    error: normalizeHttpError(error, this.logger),
                }),
                new CartActions.CartProcessesDecrement(payload.cartId),
                new CartActions.LoadCart({
                    userId: payload.userId,
                    cartId: payload.cartId,
                }),
            ])));
        })));
        this.removeCartVoucher$ = createEffect(() => this.actions$.pipe(ofType(CartActions.CART_REMOVE_VOUCHER), map((action) => action.payload), mergeMap((payload) => {
            return this.cartVoucherConnector
                .remove(payload.userId, payload.cartId, payload.voucherId)
                .pipe(map(() => {
                this.showGlobalMessage('voucher.removeVoucherSuccess', payload.voucherId, GlobalMessageType.MSG_TYPE_INFO);
                return new CartActions.CartRemoveVoucherSuccess({
                    userId: payload.userId,
                    cartId: payload.cartId,
                    voucherId: payload.voucherId,
                });
            }), catchError((error) => from([
                new CartActions.CartRemoveVoucherFail({
                    error: normalizeHttpError(error, this.logger),
                    cartId: payload.cartId,
                    userId: payload.userId,
                    voucherId: payload.voucherId,
                }),
                new CartActions.LoadCart({
                    userId: payload.userId,
                    cartId: payload.cartId,
                }),
            ])));
        })));
    }
    showGlobalMessage(text, param, messageType) {
        this.messageService.add({ key: text, params: { voucherCode: param } }, messageType);
    }
}
CartVoucherEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherEffects, deps: [{ token: i1.Actions }, { token: i2.CartVoucherConnector }, { token: i3.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
CartVoucherEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartVoucherEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.CartVoucherConnector }, { type: i3.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC12b3VjaGVyLmVmZmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29yZS9zdG9yZS9lZmZlY3RzL2NhcnQtdm91Y2hlci5lZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBVyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsYUFBYSxFQUNiLGtCQUFrQixHQUNuQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBYyxJQUFJLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDeEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0QsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7OztBQUcvQyxNQUFNLE9BQU8sa0JBQWtCO0lBRzdCLFlBQ1UsUUFBaUIsRUFDakIsb0JBQTBDLEVBQzFDLGNBQW9DO1FBRnBDLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxtQkFBYyxHQUFkLGNBQWMsQ0FBc0I7UUFMcEMsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQVF6QyxvQkFBZSxHQUlYLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2hCLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFDcEMsR0FBRyxDQUFDLENBQUMsTUFBa0MsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUMzRCxRQUFRLENBQUMsQ0FBQyxP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SUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQ3JCLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFDN0MsV0FBVyxDQUNaLENBQUM7SUFDSixDQUFDOzsrR0FuR1Usa0JBQWtCO21IQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFEOUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIGluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aW9ucywgY3JlYXRlRWZmZWN0LCBvZlR5cGUgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7XG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgTG9nZ2VyU2VydmljZSxcbiAgbm9ybWFsaXplSHR0cEVycm9yLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENhcnRWb3VjaGVyQ29ubmVjdG9yIH0gZnJvbSAnLi4vLi4vY29ubmVjdG9ycy92b3VjaGVyL2NhcnQtdm91Y2hlci5jb25uZWN0b3InO1xuaW1wb3J0IHsgQ2FydEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2luZGV4JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENhcnRWb3VjaGVyRWZmZWN0cyB7XG4gIHByb3RlY3RlZCBsb2dnZXIgPSBpbmplY3QoTG9nZ2VyU2VydmljZSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zJDogQWN0aW9ucyxcbiAgICBwcml2YXRlIGNhcnRWb3VjaGVyQ29ubmVjdG9yOiBDYXJ0Vm91Y2hlckNvbm5lY3RvcixcbiAgICBwcml2YXRlIG1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZVxuICApIHt9XG5cbiAgYWRkQ2FydFZvdWNoZXIkOiBPYnNlcnZhYmxlPFxuICAgIHwgQ2FydEFjdGlvbnMuQ2FydFZvdWNoZXJBY3Rpb25cbiAgICB8IENhcnRBY3Rpb25zLkxvYWRDYXJ0XG4gICAgfCBDYXJ0QWN0aW9ucy5DYXJ0UHJvY2Vzc2VzRGVjcmVtZW50XG4gID4gPSBjcmVhdGVFZmZlY3QoKCkgPT5cbiAgICB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICBvZlR5cGUoQ2FydEFjdGlvbnMuQ0FSVF9BRERfVk9VQ0hFUiksXG4gICAgICBtYXAoKGFjdGlvbjogQ2FydEFjdGlvbnMuQ2FydEFkZFZvdWNoZXIpID0+IGFjdGlvbi5wYXlsb2FkKSxcbiAgICAgIG1lcmdlTWFwKChwYXlsb2FkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhcnRWb3VjaGVyQ29ubmVjdG9yXG4gICAgICAgICAgLmFkZChwYXlsb2FkLnVzZXJJZCwgcGF5bG9hZC5jYXJ0SWQsIHBheWxvYWQudm91Y2hlcklkKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zaG93R2xvYmFsTWVzc2FnZShcbiAgICAgICAgICAgICAgICAndm91Y2hlci5hcHBseVZvdWNoZXJTdWNjZXNzJyxcbiAgICAgICAgICAgICAgICBwYXlsb2FkLnZvdWNoZXJJZCxcbiAgICAgICAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9DT05GSVJNQVRJT05cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDYXJ0QWN0aW9ucy5DYXJ0QWRkVm91Y2hlclN1Y2Nlc3Moe1xuICAgICAgICAgICAgICAgIC4uLnBheWxvYWQsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgICAgICAgICAgZnJvbShbXG4gICAgICAgICAgICAgICAgbmV3IENhcnRBY3Rpb25zLkNhcnRBZGRWb3VjaGVyRmFpbCh7XG4gICAgICAgICAgICAgICAgICAuLi5wYXlsb2FkLFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvciwgdGhpcy5sb2dnZXIpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG5ldyBDYXJ0QWN0aW9ucy5DYXJ0UHJvY2Vzc2VzRGVjcmVtZW50KHBheWxvYWQuY2FydElkKSxcbiAgICAgICAgICAgICAgICBuZXcgQ2FydEFjdGlvbnMuTG9hZENhcnQoe1xuICAgICAgICAgICAgICAgICAgdXNlcklkOiBwYXlsb2FkLnVzZXJJZCxcbiAgICAgICAgICAgICAgICAgIGNhcnRJZDogcGF5bG9hZC5jYXJ0SWQsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKVxuICApO1xuXG4gIHJlbW92ZUNhcnRWb3VjaGVyJDogT2JzZXJ2YWJsZTxcbiAgICBDYXJ0QWN0aW9ucy5DYXJ0Vm91Y2hlckFjdGlvbiB8IENhcnRBY3Rpb25zLkxvYWRDYXJ0XG4gID4gPSBjcmVhdGVFZmZlY3QoKCkgPT5cbiAgICB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICBvZlR5cGUoQ2FydEFjdGlvbnMuQ0FSVF9SRU1PVkVfVk9VQ0hFUiksXG4gICAgICBtYXAoKGFjdGlvbjogQ2FydEFjdGlvbnMuQ2FydFJlbW92ZVZvdWNoZXIpID0+IGFjdGlvbi5wYXlsb2FkKSxcbiAgICAgIG1lcmdlTWFwKChwYXlsb2FkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhcnRWb3VjaGVyQ29ubmVjdG9yXG4gICAgICAgICAgLnJlbW92ZShwYXlsb2FkLnVzZXJJZCwgcGF5bG9hZC5jYXJ0SWQsIHBheWxvYWQudm91Y2hlcklkKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zaG93R2xvYmFsTWVzc2FnZShcbiAgICAgICAgICAgICAgICAndm91Y2hlci5yZW1vdmVWb3VjaGVyU3VjY2VzcycsXG4gICAgICAgICAgICAgICAgcGF5bG9hZC52b3VjaGVySWQsXG4gICAgICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfSU5GT1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXR1cm4gbmV3IENhcnRBY3Rpb25zLkNhcnRSZW1vdmVWb3VjaGVyU3VjY2Vzcyh7XG4gICAgICAgICAgICAgICAgdXNlcklkOiBwYXlsb2FkLnVzZXJJZCxcbiAgICAgICAgICAgICAgICBjYXJ0SWQ6IHBheWxvYWQuY2FydElkLFxuICAgICAgICAgICAgICAgIHZvdWNoZXJJZDogcGF5bG9hZC52b3VjaGVySWQsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgICAgICAgICAgZnJvbShbXG4gICAgICAgICAgICAgICAgbmV3IENhcnRBY3Rpb25zLkNhcnRSZW1vdmVWb3VjaGVyRmFpbCh7XG4gICAgICAgICAgICAgICAgICBlcnJvcjogbm9ybWFsaXplSHR0cEVycm9yKGVycm9yLCB0aGlzLmxvZ2dlciksXG4gICAgICAgICAgICAgICAgICBjYXJ0SWQ6IHBheWxvYWQuY2FydElkLFxuICAgICAgICAgICAgICAgICAgdXNlcklkOiBwYXlsb2FkLnVzZXJJZCxcbiAgICAgICAgICAgICAgICAgIHZvdWNoZXJJZDogcGF5bG9hZC52b3VjaGVySWQsXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbmV3IENhcnRBY3Rpb25zLkxvYWRDYXJ0KHtcbiAgICAgICAgICAgICAgICAgIHVzZXJJZDogcGF5bG9hZC51c2VySWQsXG4gICAgICAgICAgICAgICAgICBjYXJ0SWQ6IHBheWxvYWQuY2FydElkLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICB9KVxuICAgIClcbiAgKTtcblxuICBwcml2YXRlIHNob3dHbG9iYWxNZXNzYWdlKFxuICAgIHRleHQ6IHN0cmluZyxcbiAgICBwYXJhbTogc3RyaW5nLFxuICAgIG1lc3NhZ2VUeXBlOiBHbG9iYWxNZXNzYWdlVHlwZVxuICApIHtcbiAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgIHsga2V5OiB0ZXh0LCBwYXJhbXM6IHsgdm91Y2hlckNvZGU6IHBhcmFtIH0gfSxcbiAgICAgIG1lc3NhZ2VUeXBlXG4gICAgKTtcbiAgfVxufVxuIl19