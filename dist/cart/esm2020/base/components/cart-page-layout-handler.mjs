/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { isEmpty } from '@spartacus/cart/base/core';
import { combineLatest, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/cart/base/core";
export class CartPageLayoutHandler {
    constructor(activeCartService, selectiveCartService, cartConfig) {
        this.activeCartService = activeCartService;
        this.selectiveCartService = selectiveCartService;
        this.cartConfig = cartConfig;
    }
    handle(slots$, pageTemplate, section) {
        if (pageTemplate === 'CartPageTemplate' && !section) {
            return combineLatest([
                slots$,
                this.activeCartService.getActive(),
                this.getSelectiveCart(),
                this.activeCartService.getLoading(),
            ]).pipe(map(([slots, cart, selectiveCart, loadingCart]) => {
                const exclude = (arr, args) => arr.filter((item) => args.every((arg) => arg !== item));
                return isEmpty(cart) && loadingCart
                    ? exclude(slots, [
                        'TopContent',
                        'CenterRightContentSlot',
                        'EmptyCartMiddleContent',
                    ])
                    : cart.totalItems
                        ? exclude(slots, ['EmptyCartMiddleContent'])
                        : selectiveCart?.totalItems
                            ? exclude(slots, [
                                'EmptyCartMiddleContent',
                                'CenterRightContentSlot',
                            ])
                            : exclude(slots, ['TopContent', 'CenterRightContentSlot']);
            }));
        }
        return slots$;
    }
    getSelectiveCart() {
        return this.cartConfig.isSelectiveCartEnabled()
            ? this.selectiveCartService.getCart().pipe(startWith(null))
            : of({});
    }
}
CartPageLayoutHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPageLayoutHandler, deps: [{ token: i1.ActiveCartFacade }, { token: i1.SelectiveCartFacade }, { token: i2.CartConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
CartPageLayoutHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPageLayoutHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartPageLayoutHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i1.SelectiveCartFacade }, { type: i2.CartConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1wYWdlLWxheW91dC1oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL2NhcnQtcGFnZS1sYXlvdXQtaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXFCLE9BQU8sRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBT3ZFLE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFLaEQsTUFBTSxPQUFPLHFCQUFxQjtJQUNoQyxZQUNZLGlCQUFtQyxFQUNuQyxvQkFBeUMsRUFDekMsVUFBNkI7UUFGN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLGVBQVUsR0FBVixVQUFVLENBQW1CO0lBQ3RDLENBQUM7SUFFSixNQUFNLENBQ0osTUFBNEIsRUFDNUIsWUFBcUIsRUFDckIsT0FBZ0I7UUFFaEIsSUFBSSxZQUFZLEtBQUssa0JBQWtCLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkQsT0FBTyxhQUFhLENBQUM7Z0JBQ25CLE1BQU07Z0JBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFO2FBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFO2dCQUNoRCxNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQWEsRUFBRSxJQUFjLEVBQUUsRUFBRSxDQUNoRCxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVztvQkFDakMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7d0JBQ2IsWUFBWTt3QkFDWix3QkFBd0I7d0JBQ3hCLHdCQUF3QjtxQkFDekIsQ0FBQztvQkFDSixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVU7d0JBQ2pCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsd0JBQXdCLENBQUMsQ0FBQzt3QkFDNUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxVQUFVOzRCQUMzQixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQ0FDYix3QkFBd0I7Z0NBQ3hCLHdCQUF3Qjs2QkFDekIsQ0FBQzs0QkFDSixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLFlBQVksRUFBRSx3QkFBd0IsQ0FBQyxDQUFDLENBQUM7WUFDL0QsQ0FBQyxDQUFDLENBQ0gsQ0FBQztTQUNIO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVTLGdCQUFnQjtRQUN4QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUU7WUFDN0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBVSxDQUFDLENBQUM7SUFDckIsQ0FBQzs7a0hBOUNVLHFCQUFxQjtzSEFBckIscUJBQXFCLGNBRnBCLE1BQU07MkZBRVAscUJBQXFCO2tCQUhqQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhcnRDb25maWdTZXJ2aWNlLCBpc0VtcHR5IH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2UvY29yZSc7XG5pbXBvcnQge1xuICBBY3RpdmVDYXJ0RmFjYWRlLFxuICBDYXJ0LFxuICBTZWxlY3RpdmVDYXJ0RmFjYWRlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IFBhZ2VMYXlvdXRIYW5kbGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENhcnRQYWdlTGF5b3V0SGFuZGxlciBpbXBsZW1lbnRzIFBhZ2VMYXlvdXRIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRTZXJ2aWNlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCBzZWxlY3RpdmVDYXJ0U2VydmljZTogU2VsZWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY2FydENvbmZpZzogQ2FydENvbmZpZ1NlcnZpY2VcbiAgKSB7fVxuXG4gIGhhbmRsZShcbiAgICBzbG90cyQ6IE9ic2VydmFibGU8c3RyaW5nW10+LFxuICAgIHBhZ2VUZW1wbGF0ZT86IHN0cmluZyxcbiAgICBzZWN0aW9uPzogc3RyaW5nXG4gICkge1xuICAgIGlmIChwYWdlVGVtcGxhdGUgPT09ICdDYXJ0UGFnZVRlbXBsYXRlJyAmJiAhc2VjdGlvbikge1xuICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgICBzbG90cyQsXG4gICAgICAgIHRoaXMuYWN0aXZlQ2FydFNlcnZpY2UuZ2V0QWN0aXZlKCksXG4gICAgICAgIHRoaXMuZ2V0U2VsZWN0aXZlQ2FydCgpLFxuICAgICAgICB0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlLmdldExvYWRpbmcoKSxcbiAgICAgIF0pLnBpcGUoXG4gICAgICAgIG1hcCgoW3Nsb3RzLCBjYXJ0LCBzZWxlY3RpdmVDYXJ0LCBsb2FkaW5nQ2FydF0pID0+IHtcbiAgICAgICAgICBjb25zdCBleGNsdWRlID0gKGFycjogc3RyaW5nW10sIGFyZ3M6IHN0cmluZ1tdKSA9PlxuICAgICAgICAgICAgYXJyLmZpbHRlcigoaXRlbSkgPT4gYXJncy5ldmVyeSgoYXJnKSA9PiBhcmcgIT09IGl0ZW0pKTtcbiAgICAgICAgICByZXR1cm4gaXNFbXB0eShjYXJ0KSAmJiBsb2FkaW5nQ2FydFxuICAgICAgICAgICAgPyBleGNsdWRlKHNsb3RzLCBbXG4gICAgICAgICAgICAgICAgJ1RvcENvbnRlbnQnLFxuICAgICAgICAgICAgICAgICdDZW50ZXJSaWdodENvbnRlbnRTbG90JyxcbiAgICAgICAgICAgICAgICAnRW1wdHlDYXJ0TWlkZGxlQ29udGVudCcsXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICA6IGNhcnQudG90YWxJdGVtc1xuICAgICAgICAgICAgPyBleGNsdWRlKHNsb3RzLCBbJ0VtcHR5Q2FydE1pZGRsZUNvbnRlbnQnXSlcbiAgICAgICAgICAgIDogc2VsZWN0aXZlQ2FydD8udG90YWxJdGVtc1xuICAgICAgICAgICAgPyBleGNsdWRlKHNsb3RzLCBbXG4gICAgICAgICAgICAgICAgJ0VtcHR5Q2FydE1pZGRsZUNvbnRlbnQnLFxuICAgICAgICAgICAgICAgICdDZW50ZXJSaWdodENvbnRlbnRTbG90JyxcbiAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIDogZXhjbHVkZShzbG90cywgWydUb3BDb250ZW50JywgJ0NlbnRlclJpZ2h0Q29udGVudFNsb3QnXSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gc2xvdHMkO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFNlbGVjdGl2ZUNhcnQoKTogT2JzZXJ2YWJsZTxDYXJ0IHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLmNhcnRDb25maWcuaXNTZWxlY3RpdmVDYXJ0RW5hYmxlZCgpXG4gICAgICA/IHRoaXMuc2VsZWN0aXZlQ2FydFNlcnZpY2UuZ2V0Q2FydCgpLnBpcGUoc3RhcnRXaXRoKG51bGwpKVxuICAgICAgOiBvZih7fSBhcyBDYXJ0KTtcbiAgfVxufVxuIl19