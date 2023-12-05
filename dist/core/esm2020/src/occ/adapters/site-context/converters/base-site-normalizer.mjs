/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class BaseSiteNormalizer {
    constructor() {
        // Intentional empty constructor
    }
    convert(source, target) {
        if (target === undefined) {
            target = { ...source };
        }
        // We take the first store as the base store.
        target.baseStore = source.stores?.[0];
        delete target.stores;
        return target;
    }
}
BaseSiteNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseSiteNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
BaseSiteNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseSiteNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseSiteNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1zaXRlLW5vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvc2l0ZS1jb250ZXh0L2NvbnZlcnRlcnMvYmFzZS1zaXRlLW5vcm1hbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTTNDLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0I7UUFDRSxnQ0FBZ0M7SUFDbEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxNQUFvQixFQUFFLE1BQWlCO1FBQzdDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixNQUFNLEdBQUcsRUFBRSxHQUFJLE1BQWMsRUFBYyxDQUFDO1NBQzdDO1FBRUQsNkNBQTZDO1FBQzdDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUVyQixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzsrR0FmVSxrQkFBa0I7bUhBQWxCLGtCQUFrQixjQURMLE1BQU07MkZBQ25CLGtCQUFrQjtrQkFEOUIsVUFBVTttQkFBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlU2l0ZSB9IGZyb20gJy4uLy4uLy4uLy4uL21vZGVsL21pc2MubW9kZWwnO1xuaW1wb3J0IHsgQ29udmVydGVyIH0gZnJvbSAnLi4vLi4vLi4vLi4vdXRpbC9jb252ZXJ0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBPY2MgfSBmcm9tICcuLi8uLi8uLi9vY2MtbW9kZWxzL29jYy5tb2RlbHMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEJhc2VTaXRlTm9ybWFsaXplciBpbXBsZW1lbnRzIENvbnZlcnRlcjxPY2MuQmFzZVNpdGUsIEJhc2VTaXRlPiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIEludGVudGlvbmFsIGVtcHR5IGNvbnN0cnVjdG9yXG4gIH1cblxuICBjb252ZXJ0KHNvdXJjZTogT2NjLkJhc2VTaXRlLCB0YXJnZXQ/OiBCYXNlU2l0ZSk6IEJhc2VTaXRlIHtcbiAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldCA9IHsgLi4uKHNvdXJjZSBhcyBhbnkpIH0gYXMgQmFzZVNpdGU7XG4gICAgfVxuXG4gICAgLy8gV2UgdGFrZSB0aGUgZmlyc3Qgc3RvcmUgYXMgdGhlIGJhc2Ugc3RvcmUuXG4gICAgdGFyZ2V0LmJhc2VTdG9yZSA9IHNvdXJjZS5zdG9yZXM/LlswXTtcbiAgICBkZWxldGUgdGFyZ2V0LnN0b3JlcztcblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbn1cbiJdfQ==