/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { BaseFocusService } from '../base/base-focus.service';
import { FOCUS_GROUP_ATTR } from '../keyboard-focus.model';
import * as i0 from "@angular/core";
const GLOBAL_GROUP = '_g_';
/**
 * Shared service to persist the focus for an element or a group
 * of elements. The persisted element focus can be used to persist
 * the focus for a DOM tree, so that the focus remains after a repaint
 * or reoccurs when a DOM tree is "unlocked".
 */
export class PersistFocusService extends BaseFocusService {
    constructor() {
        super(...arguments);
        // this is going to fail as we have sub services. They will al have their own map.
        // We must bring this to a singleton map.
        this.focus = new Map();
    }
    get(group) {
        return this.focus.get(group || GLOBAL_GROUP);
    }
    /**
     * Persist the keyboard focus state for the given key. The focus is stored globally
     * or for the given group.
     */
    set(key, group) {
        if (key) {
            this.focus.set(group || GLOBAL_GROUP, key);
        }
    }
    /**
     * Clears the persisted keyboard focus state globally or for the given group.
     */
    clear(group) {
        this.focus.delete(group || GLOBAL_GROUP);
    }
    /**
     * Returns the group for the host element based on the configured group or
     * by the `data-cx-focus-group` attribute stored on the host.
     */
    getPersistenceGroup(host, config) {
        return config?.group ? config.group : host?.getAttribute(FOCUS_GROUP_ATTR);
    }
}
PersistFocusService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersistFocusService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
PersistFocusService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersistFocusService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PersistFocusService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc2lzdC1mb2N1cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvYTExeS9rZXlib2FyZC1mb2N1cy9wZXJzaXN0L3BlcnNpc3QtZm9jdXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQXNCLE1BQU0seUJBQXlCLENBQUM7O0FBRS9FLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQztBQUUzQjs7Ozs7R0FLRztBQUlILE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxnQkFBZ0I7SUFIekQ7O1FBSUUsa0ZBQWtGO1FBQ2xGLHlDQUF5QztRQUMvQixVQUFLLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7S0FpQzdDO0lBL0JDLEdBQUcsQ0FBQyxLQUFxQjtRQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxZQUFZLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsR0FBRyxDQUFDLEdBQXVCLEVBQUUsS0FBcUI7UUFDaEQsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLEtBQWM7UUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLFlBQVksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxtQkFBbUIsQ0FDakIsSUFBb0MsRUFDcEMsTUFBMkI7UUFFM0IsT0FBTyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDN0UsQ0FBQzs7Z0hBbkNVLG1CQUFtQjtvSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhc2VGb2N1c1NlcnZpY2UgfSBmcm9tICcuLi9iYXNlL2Jhc2UtZm9jdXMuc2VydmljZSc7XG5pbXBvcnQgeyBGT0NVU19HUk9VUF9BVFRSLCBQZXJzaXN0Rm9jdXNDb25maWcgfSBmcm9tICcuLi9rZXlib2FyZC1mb2N1cy5tb2RlbCc7XG5cbmNvbnN0IEdMT0JBTF9HUk9VUCA9ICdfZ18nO1xuXG4vKipcbiAqIFNoYXJlZCBzZXJ2aWNlIHRvIHBlcnNpc3QgdGhlIGZvY3VzIGZvciBhbiBlbGVtZW50IG9yIGEgZ3JvdXBcbiAqIG9mIGVsZW1lbnRzLiBUaGUgcGVyc2lzdGVkIGVsZW1lbnQgZm9jdXMgY2FuIGJlIHVzZWQgdG8gcGVyc2lzdFxuICogdGhlIGZvY3VzIGZvciBhIERPTSB0cmVlLCBzbyB0aGF0IHRoZSBmb2N1cyByZW1haW5zIGFmdGVyIGEgcmVwYWludFxuICogb3IgcmVvY2N1cnMgd2hlbiBhIERPTSB0cmVlIGlzIFwidW5sb2NrZWRcIi5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFBlcnNpc3RGb2N1c1NlcnZpY2UgZXh0ZW5kcyBCYXNlRm9jdXNTZXJ2aWNlIHtcbiAgLy8gdGhpcyBpcyBnb2luZyB0byBmYWlsIGFzIHdlIGhhdmUgc3ViIHNlcnZpY2VzLiBUaGV5IHdpbGwgYWwgaGF2ZSB0aGVpciBvd24gbWFwLlxuICAvLyBXZSBtdXN0IGJyaW5nIHRoaXMgdG8gYSBzaW5nbGV0b24gbWFwLlxuICBwcm90ZWN0ZWQgZm9jdXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4gIGdldChncm91cD86IHN0cmluZyB8IG51bGwpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmZvY3VzLmdldChncm91cCB8fCBHTE9CQUxfR1JPVVApO1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcnNpc3QgdGhlIGtleWJvYXJkIGZvY3VzIHN0YXRlIGZvciB0aGUgZ2l2ZW4ga2V5LiBUaGUgZm9jdXMgaXMgc3RvcmVkIGdsb2JhbGx5XG4gICAqIG9yIGZvciB0aGUgZ2l2ZW4gZ3JvdXAuXG4gICAqL1xuICBzZXQoa2V5OiBzdHJpbmcgfCB1bmRlZmluZWQsIGdyb3VwPzogc3RyaW5nIHwgbnVsbCkge1xuICAgIGlmIChrZXkpIHtcbiAgICAgIHRoaXMuZm9jdXMuc2V0KGdyb3VwIHx8IEdMT0JBTF9HUk9VUCwga2V5KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBwZXJzaXN0ZWQga2V5Ym9hcmQgZm9jdXMgc3RhdGUgZ2xvYmFsbHkgb3IgZm9yIHRoZSBnaXZlbiBncm91cC5cbiAgICovXG4gIGNsZWFyKGdyb3VwPzogc3RyaW5nKSB7XG4gICAgdGhpcy5mb2N1cy5kZWxldGUoZ3JvdXAgfHwgR0xPQkFMX0dST1VQKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBncm91cCBmb3IgdGhlIGhvc3QgZWxlbWVudCBiYXNlZCBvbiB0aGUgY29uZmlndXJlZCBncm91cCBvclxuICAgKiBieSB0aGUgYGRhdGEtY3gtZm9jdXMtZ3JvdXBgIGF0dHJpYnV0ZSBzdG9yZWQgb24gdGhlIGhvc3QuXG4gICAqL1xuICBnZXRQZXJzaXN0ZW5jZUdyb3VwKFxuICAgIGhvc3Q6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkIHwgbnVsbCxcbiAgICBjb25maWc/OiBQZXJzaXN0Rm9jdXNDb25maWdcbiAgKTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIGNvbmZpZz8uZ3JvdXAgPyBjb25maWcuZ3JvdXAgOiBob3N0Py5nZXRBdHRyaWJ1dGUoRk9DVVNfR1JPVVBfQVRUUik7XG4gIH1cbn1cbiJdfQ==