/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { CART_WISH_LIST_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export class WishListFacade {
}
WishListFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
WishListFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: WishListFacade,
        feature: CART_WISH_LIST_CORE_FEATURE,
        methods: [
            'createWishList',
            'getWishList',
            'loadWishList',
            'addEntry',
            'removeEntry',
            'getWishListLoading',
        ],
        async: true,
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: WishListFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: WishListFacade,
                        feature: CART_WISH_LIST_CORE_FEATURE,
                        methods: [
                            'createWishList',
                            'getWishList',
                            'loadWishList',
                            'addEntry',
                            'removeEntry',
                            'getWishListLoading',
                        ],
                        async: true,
                    }),
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lzaC1saXN0LmZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L3dpc2gtbGlzdC9yb290L2ZhY2FkZS93aXNoLWxpc3QuZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFtQjlELE1BQU0sT0FBZ0IsY0FBYzs7MkdBQWQsY0FBYzsrR0FBZCxjQUFjLGNBaEJ0QixNQUFNLGNBQ04sR0FBRyxFQUFFLENBQ2YsYUFBYSxDQUFDO1FBQ1osTUFBTSxFQUFFLGNBQWM7UUFDdEIsT0FBTyxFQUFFLDJCQUEyQjtRQUNwQyxPQUFPLEVBQUU7WUFDUCxnQkFBZ0I7WUFDaEIsYUFBYTtZQUNiLGNBQWM7WUFDZCxVQUFVO1lBQ1YsYUFBYTtZQUNiLG9CQUFvQjtTQUNyQjtRQUNELEtBQUssRUFBRSxJQUFJO0tBQ1osQ0FBQzsyRkFFZ0IsY0FBYztrQkFqQm5DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07b0JBQ2xCLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FDZixhQUFhLENBQUM7d0JBQ1osTUFBTSxnQkFBZ0I7d0JBQ3RCLE9BQU8sRUFBRSwyQkFBMkI7d0JBQ3BDLE9BQU8sRUFBRTs0QkFDUCxnQkFBZ0I7NEJBQ2hCLGFBQWE7NEJBQ2IsY0FBYzs0QkFDZCxVQUFVOzRCQUNWLGFBQWE7NEJBQ2Isb0JBQW9CO3lCQUNyQjt3QkFDRCxLQUFLLEVBQUUsSUFBSTtxQkFDWixDQUFDO2lCQUNMIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FydCwgT3JkZXJFbnRyeSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgZmFjYWRlRmFjdG9yeSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDQVJUX1dJU0hfTElTVF9DT1JFX0ZFQVRVUkUgfSBmcm9tICcuLi9mZWF0dXJlLW5hbWUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRmFjdG9yeTogKCkgPT5cbiAgICBmYWNhZGVGYWN0b3J5KHtcbiAgICAgIGZhY2FkZTogV2lzaExpc3RGYWNhZGUsXG4gICAgICBmZWF0dXJlOiBDQVJUX1dJU0hfTElTVF9DT1JFX0ZFQVRVUkUsXG4gICAgICBtZXRob2RzOiBbXG4gICAgICAgICdjcmVhdGVXaXNoTGlzdCcsXG4gICAgICAgICdnZXRXaXNoTGlzdCcsXG4gICAgICAgICdsb2FkV2lzaExpc3QnLFxuICAgICAgICAnYWRkRW50cnknLFxuICAgICAgICAncmVtb3ZlRW50cnknLFxuICAgICAgICAnZ2V0V2lzaExpc3RMb2FkaW5nJyxcbiAgICAgIF0sXG4gICAgICBhc3luYzogdHJ1ZSxcbiAgICB9KSxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgV2lzaExpc3RGYWNhZGUge1xuICBhYnN0cmFjdCBjcmVhdGVXaXNoTGlzdChcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBuYW1lPzogc3RyaW5nLFxuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nXG4gICk6IHZvaWQ7XG5cbiAgYWJzdHJhY3QgZ2V0V2lzaExpc3QoKTogT2JzZXJ2YWJsZTxDYXJ0PjtcblxuICBhYnN0cmFjdCBsb2FkV2lzaExpc3QodXNlcklkOiBzdHJpbmcsIGN1c3RvbWVySWQ6IHN0cmluZyk6IHZvaWQ7XG5cbiAgYWJzdHJhY3QgYWRkRW50cnkocHJvZHVjdENvZGU6IHN0cmluZyk6IHZvaWQ7XG5cbiAgYWJzdHJhY3QgcmVtb3ZlRW50cnkoZW50cnk6IE9yZGVyRW50cnkpOiB2b2lkO1xuXG4gIGFic3RyYWN0IGdldFdpc2hMaXN0TG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xufVxuIl19