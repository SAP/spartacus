/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { AVOID_STACKED_OUTLETS, OutletPosition } from './outlet.model';
import * as i0 from "@angular/core";
export class OutletService {
    constructor() {
        this.templatesRefs = {
            [OutletPosition.BEFORE]: new Map(),
            [OutletPosition.REPLACE]: new Map(),
            [OutletPosition.AFTER]: new Map(),
        };
    }
    /**
     * @param templateOrFactory A `ComponentFactory` that inserts a component dynamically.
     */
    add(outlet, templateOrFactory, position = OutletPosition.REPLACE) {
        const store = this.templatesRefs[position];
        if (store) {
            const existing = store.get(outlet) || [];
            const newValue = existing.concat([templateOrFactory]);
            store.set(outlet, newValue);
        }
    }
    /**
     *
     * Returns a single object or multiple objects for the given outlet reference,
     * depending on the `stacked` argument.
     *
     * @param outlet The outlet reference
     * @param position the outlet position, `OutletPosition.before`, `OutletPosition.AFTER` or `OutletPosition.REPLACE`
     * @param stacked Indicates whether an array of outlet components is returned
     */
    get(outlet, position = OutletPosition.REPLACE, stacked = AVOID_STACKED_OUTLETS) {
        const store = this.templatesRefs[position] ||
            this.templatesRefs[OutletPosition.REPLACE];
        const templateRef = store.get(outlet);
        if (templateRef && !stacked) {
            return templateRef[0];
        }
        return templateRef;
    }
    remove(outlet, position = OutletPosition.REPLACE, value) {
        const store = this.templatesRefs[position] ||
            this.templatesRefs[OutletPosition.REPLACE];
        this.removeValueOrAll(store, outlet, value);
    }
    removeValueOrAll(store, outlet, value) {
        if (!value && store.has(outlet)) {
            store.delete(outlet);
        }
        else if (value && store.has(outlet)) {
            let existing = store.get(outlet);
            existing = existing?.filter((val) => val !== value);
            if (existing) {
                store.set(outlet, existing);
            }
        }
    }
}
OutletService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OutletService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGV0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvb3V0bGV0L291dGxldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQW9CLFVBQVUsRUFBZSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBS3ZFLE1BQU0sT0FBTyxhQUFhO0lBSDFCO1FBSVUsa0JBQWEsR0FBRztZQUN0QixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEdBQUcsRUFBZTtZQUMvQyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEdBQUcsRUFBZTtZQUNoRCxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLEdBQUcsRUFBZTtTQUMvQyxDQUFDO0tBNEZIO0lBdEVDOztPQUVHO0lBQ0gsR0FBRyxDQUNELE1BQWMsRUFDZCxpQkFBb0IsRUFDcEIsV0FBMkIsY0FBYyxDQUFDLE9BQU87UUFFakQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLEtBQUssRUFBRTtZQUNULE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3pDLE1BQU0sUUFBUSxHQUFRLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDM0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLENBQ0QsTUFBYyxFQUNkLFdBQTJCLGNBQWMsQ0FBQyxPQUFPLEVBQ2pELE9BQU8sR0FBRyxxQkFBcUI7UUFFL0IsTUFBTSxLQUFLLEdBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFN0MsTUFBTSxXQUFXLEdBQW9CLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkQsSUFBSSxXQUFXLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDM0IsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkI7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTSxDQUNKLE1BQWMsRUFDZCxXQUEyQixjQUFjLENBQUMsT0FBTyxFQUNqRCxLQUFTO1FBRVQsTUFBTSxLQUFLLEdBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVTLGdCQUFnQixDQUN4QixLQUF1QixFQUN2QixNQUFjLEVBQ2QsS0FBUztRQUVULElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMvQixLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3RCO2FBQU0sSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyQyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWpDLFFBQVEsR0FBRyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUM7WUFFcEQsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDN0I7U0FDRjtJQUNILENBQUM7OzBHQWhHVSxhQUFhOzhHQUFiLGFBQWEsY0FGWixNQUFNOzJGQUVQLGFBQWE7a0JBSHpCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeSwgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFWT0lEX1NUQUNLRURfT1VUTEVUUywgT3V0bGV0UG9zaXRpb24gfSBmcm9tICcuL291dGxldC5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBPdXRsZXRTZXJ2aWNlPFQgPSBUZW1wbGF0ZVJlZjxhbnk+IHwgQ29tcG9uZW50RmFjdG9yeTxhbnk+PiB7XG4gIHByaXZhdGUgdGVtcGxhdGVzUmVmcyA9IHtcbiAgICBbT3V0bGV0UG9zaXRpb24uQkVGT1JFXTogbmV3IE1hcDxzdHJpbmcsIFRbXT4oKSxcbiAgICBbT3V0bGV0UG9zaXRpb24uUkVQTEFDRV06IG5ldyBNYXA8c3RyaW5nLCBUW10+KCksXG4gICAgW091dGxldFBvc2l0aW9uLkFGVEVSXTogbmV3IE1hcDxzdHJpbmcsIFRbXT4oKSxcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhIHRlbXBsYXRlIG9yIENvbXBvbmVudEZhY3RvcnksIHNvIHRoYXQgVUkgb3V0bGV0cyBjYW4gYmUgcmVwbGFjZWQgZHluYW1pY2FsbHkuXG4gICAqIFRoZSBVSSBwb3NpdGlvbiB3aGVyZSB0aGlzIHRlbXBsYXRlIG9yIENvbXBvbmVudEZhY3RvcnkgaXMgaW5zZXJ0ZWQgaXMgZ2l2ZW4gYnkgYVxuICAgKiBzdHJpbmcgcmVmZXJlbmNlIChjYWxsZWQgYG91dGxldGApIGFuZCBvcHRpb25hbCBgT3V0bGV0UG9zaXRpb25gLiBUaGUgYE91dGxldFBvc2l0aW9uYFxuICAgKiBpcyBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyLCBvciByZXBsYWNlcyB0aGUgZW50aXJlIFVJLlxuICAgKlxuICAgKiBAcGFyYW0gb3V0bGV0IHRoZSBVSSBsb2NhdGlvbiByZXByZXNlbnRlZCBieSBhIHN0cmluZ1xuICAgKiBAcGFyYW0gdGVtcGxhdGUgdGhlIGBUZW1wbGF0ZVJlZmAgdGhhdCB3aWxsIGJlIHVzZWQgdG8gaW5zZXJ0IFVJXG4gICAqIEBwYXJhbSBwb3NpdGlvbiB0aGUgYE91dGxldFBvc2l0aW9uYCBpbiB0aGUgVUlcbiAgICovXG4gIGFkZChvdXRsZXQ6IHN0cmluZywgdGVtcGxhdGU6IFQsIHBvc2l0aW9uPzogT3V0bGV0UG9zaXRpb24pOiB2b2lkO1xuICAvKipcbiAgICogQHBhcmFtIGZhY3RvcnkgVGhlIGBDb21wb25lbnRGYWN0b3J5YCB0aGF0IHdpbGwgYmUgZHluYW1pY2FsbHkgYWRkZWQgdG8gdGhlIG91dGxldCBVSVxuICAgKi9cbiAgYWRkKFxuICAgIG91dGxldDogc3RyaW5nLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvdW5pZmllZC1zaWduYXR1cmVzXG4gICAgZmFjdG9yeTogVCxcbiAgICBwb3NpdGlvbj86IE91dGxldFBvc2l0aW9uXG4gICk6IHZvaWQ7XG4gIC8qKlxuICAgKiBAcGFyYW0gdGVtcGxhdGVPckZhY3RvcnkgQSBgQ29tcG9uZW50RmFjdG9yeWAgdGhhdCBpbnNlcnRzIGEgY29tcG9uZW50IGR5bmFtaWNhbGx5LlxuICAgKi9cbiAgYWRkKFxuICAgIG91dGxldDogc3RyaW5nLFxuICAgIHRlbXBsYXRlT3JGYWN0b3J5OiBULFxuICAgIHBvc2l0aW9uOiBPdXRsZXRQb3NpdGlvbiA9IE91dGxldFBvc2l0aW9uLlJFUExBQ0VcbiAgKTogdm9pZCB7XG4gICAgY29uc3Qgc3RvcmUgPSB0aGlzLnRlbXBsYXRlc1JlZnNbcG9zaXRpb25dO1xuICAgIGlmIChzdG9yZSkge1xuICAgICAgY29uc3QgZXhpc3RpbmcgPSBzdG9yZS5nZXQob3V0bGV0KSB8fCBbXTtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlOiBUW10gPSBleGlzdGluZy5jb25jYXQoW3RlbXBsYXRlT3JGYWN0b3J5XSk7XG4gICAgICBzdG9yZS5zZXQob3V0bGV0LCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIFJldHVybnMgYSBzaW5nbGUgb2JqZWN0IG9yIG11bHRpcGxlIG9iamVjdHMgZm9yIHRoZSBnaXZlbiBvdXRsZXQgcmVmZXJlbmNlLFxuICAgKiBkZXBlbmRpbmcgb24gdGhlIGBzdGFja2VkYCBhcmd1bWVudC5cbiAgICpcbiAgICogQHBhcmFtIG91dGxldCBUaGUgb3V0bGV0IHJlZmVyZW5jZVxuICAgKiBAcGFyYW0gcG9zaXRpb24gdGhlIG91dGxldCBwb3NpdGlvbiwgYE91dGxldFBvc2l0aW9uLmJlZm9yZWAsIGBPdXRsZXRQb3NpdGlvbi5BRlRFUmAgb3IgYE91dGxldFBvc2l0aW9uLlJFUExBQ0VgXG4gICAqIEBwYXJhbSBzdGFja2VkIEluZGljYXRlcyB3aGV0aGVyIGFuIGFycmF5IG9mIG91dGxldCBjb21wb25lbnRzIGlzIHJldHVybmVkXG4gICAqL1xuICBnZXQoXG4gICAgb3V0bGV0OiBzdHJpbmcsXG4gICAgcG9zaXRpb246IE91dGxldFBvc2l0aW9uID0gT3V0bGV0UG9zaXRpb24uUkVQTEFDRSxcbiAgICBzdGFja2VkID0gQVZPSURfU1RBQ0tFRF9PVVRMRVRTXG4gICk6IFRbXSB8IFQgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHN0b3JlID1cbiAgICAgIHRoaXMudGVtcGxhdGVzUmVmc1twb3NpdGlvbl0gfHxcbiAgICAgIHRoaXMudGVtcGxhdGVzUmVmc1tPdXRsZXRQb3NpdGlvbi5SRVBMQUNFXTtcblxuICAgIGNvbnN0IHRlbXBsYXRlUmVmOiBUW10gfCB1bmRlZmluZWQgPSBzdG9yZS5nZXQob3V0bGV0KTtcbiAgICBpZiAodGVtcGxhdGVSZWYgJiYgIXN0YWNrZWQpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZVJlZlswXTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbXBsYXRlUmVmO1xuICB9XG5cbiAgcmVtb3ZlKFxuICAgIG91dGxldDogc3RyaW5nLFxuICAgIHBvc2l0aW9uOiBPdXRsZXRQb3NpdGlvbiA9IE91dGxldFBvc2l0aW9uLlJFUExBQ0UsXG4gICAgdmFsdWU/OiBUXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHN0b3JlID1cbiAgICAgIHRoaXMudGVtcGxhdGVzUmVmc1twb3NpdGlvbl0gfHxcbiAgICAgIHRoaXMudGVtcGxhdGVzUmVmc1tPdXRsZXRQb3NpdGlvbi5SRVBMQUNFXTtcblxuICAgIHRoaXMucmVtb3ZlVmFsdWVPckFsbChzdG9yZSwgb3V0bGV0LCB2YWx1ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVtb3ZlVmFsdWVPckFsbChcbiAgICBzdG9yZTogTWFwPHN0cmluZywgVFtdPixcbiAgICBvdXRsZXQ6IHN0cmluZyxcbiAgICB2YWx1ZT86IFRcbiAgKTogdm9pZCB7XG4gICAgaWYgKCF2YWx1ZSAmJiBzdG9yZS5oYXMob3V0bGV0KSkge1xuICAgICAgc3RvcmUuZGVsZXRlKG91dGxldCk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSAmJiBzdG9yZS5oYXMob3V0bGV0KSkge1xuICAgICAgbGV0IGV4aXN0aW5nID0gc3RvcmUuZ2V0KG91dGxldCk7XG5cbiAgICAgIGV4aXN0aW5nID0gZXhpc3Rpbmc/LmZpbHRlcigodmFsKSA9PiB2YWwgIT09IHZhbHVlKTtcblxuICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgIHN0b3JlLnNldChvdXRsZXQsIGV4aXN0aW5nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==