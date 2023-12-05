/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class DisableInfoService {
    isItemDisabled(item) {
        return item?.active === false;
    }
    isParentDisabled(item) {
        return ((item.orgUnit || item.unit || item.parentOrgUnit)?.active === false &&
            !this.isRootUnit(item));
    }
    isRootUnit(item) {
        return Boolean(item?.uid &&
            item?.name &&
            !item?.orgUnit &&
            !item?.unit &&
            (!item?.parentOrgUnit || item?.uid === item?.parentOrgUnit));
    }
}
DisableInfoService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DisableInfoService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DisableInfoService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DisableInfoService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DisableInfoService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZS1pbmZvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL2RldGFpbC9kaXNhYmxlLWluZm8vZGlzYWJsZS1pbmZvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTzNDLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsY0FBYyxDQUFDLElBQU87UUFDcEIsT0FBTyxJQUFJLEVBQUUsTUFBTSxLQUFLLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsSUFBTztRQUN0QixPQUFPLENBQ0wsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE1BQU0sS0FBSyxLQUFLO1lBQ25FLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FDdkIsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBYTtRQUN0QixPQUFPLE9BQU8sQ0FDWixJQUFJLEVBQUUsR0FBRztZQUNQLElBQUksRUFBRSxJQUFJO1lBQ1YsQ0FBRSxJQUFVLEVBQUUsT0FBTztZQUNyQixDQUFFLElBQVUsRUFBRSxJQUFJO1lBQ2xCLENBQUMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxJQUFJLElBQUksRUFBRSxHQUFHLEtBQUssSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUM5RCxDQUFDO0lBQ0osQ0FBQzs7K0dBcEJVLGtCQUFrQjttSEFBbEIsa0JBQWtCLGNBRmpCLE1BQU07MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEIyQlVuaXQgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQmFzZUl0ZW0gfSBmcm9tICcuLi8uLi9vcmdhbml6YXRpb24ubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRGlzYWJsZUluZm9TZXJ2aWNlPFQgZXh0ZW5kcyBCYXNlSXRlbT4ge1xuICBpc0l0ZW1EaXNhYmxlZChpdGVtOiBUKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGl0ZW0/LmFjdGl2ZSA9PT0gZmFsc2U7XG4gIH1cblxuICBpc1BhcmVudERpc2FibGVkKGl0ZW06IFQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGl0ZW0ub3JnVW5pdCB8fCBpdGVtLnVuaXQgfHwgaXRlbS5wYXJlbnRPcmdVbml0KT8uYWN0aXZlID09PSBmYWxzZSAmJlxuICAgICAgIXRoaXMuaXNSb290VW5pdChpdGVtKVxuICAgICk7XG4gIH1cblxuICBpc1Jvb3RVbml0KGl0ZW06IEIyQlVuaXQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gQm9vbGVhbihcbiAgICAgIGl0ZW0/LnVpZCAmJlxuICAgICAgICBpdGVtPy5uYW1lICYmXG4gICAgICAgICEoaXRlbSBhcyBUKT8ub3JnVW5pdCAmJlxuICAgICAgICAhKGl0ZW0gYXMgVCk/LnVuaXQgJiZcbiAgICAgICAgKCFpdGVtPy5wYXJlbnRPcmdVbml0IHx8IGl0ZW0/LnVpZCA9PT0gaXRlbT8ucGFyZW50T3JnVW5pdClcbiAgICApO1xuICB9XG59XG4iXX0=