/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { isNotNullable } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class OutletRendererService {
    constructor() {
        this.outletRefs = new BehaviorSubject(new Map());
    }
    /**
     * Dynamically render the templates in the specified array
     *
     * @param outlet
     */
    render(outlet) {
        if (this.outletRefs.value.size !== 0) {
            this.outletRefs.value.get(outlet)?.render();
        }
    }
    /**
     * Register outlet to be available to render dynamically
     *
     * @param cxOutlet
     * @param context
     */
    register(cxOutlet, context) {
        this.outletRefs.next(this.outletRefs.value.set(cxOutlet, context));
    }
    /**
     * Returns map of outlets
     *
     */
    getOutletRef(outlet) {
        return this.outletRefs.asObservable().pipe(map((val) => val.get(outlet)), filter(isNotNullable));
    }
}
OutletRendererService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletRendererService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OutletRendererService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletRendererService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OutletRendererService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGV0LXJlbmRlcmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvb3V0bGV0L291dGxldC1yZW5kZXJlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBTTdDLE1BQU0sT0FBTyxxQkFBcUI7SUFIbEM7UUFJVSxlQUFVLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxHQUFHLEVBQTJCLENBQUMsQ0FBQztLQWdDOUU7SUE5QkM7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxNQUFjO1FBQ25CLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxRQUFRLENBQUMsUUFBZ0IsRUFBRSxPQUF3QjtRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNEOzs7T0FHRztJQUNILFlBQVksQ0FBQyxNQUFjO1FBQ3pCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQ3hDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUM3QixNQUFNLENBQUMsYUFBYSxDQUFDLENBQ3RCLENBQUM7SUFDSixDQUFDOztrSEFoQ1UscUJBQXFCO3NIQUFyQixxQkFBcUIsY0FGcEIsTUFBTTsyRkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNOb3ROdWxsYWJsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT3V0bGV0RGlyZWN0aXZlIH0gZnJvbSAnLi9vdXRsZXQuZGlyZWN0aXZlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE91dGxldFJlbmRlcmVyU2VydmljZSB7XG4gIHByaXZhdGUgb3V0bGV0UmVmcyA9IG5ldyBCZWhhdmlvclN1YmplY3QobmV3IE1hcDxzdHJpbmcsIE91dGxldERpcmVjdGl2ZT4oKSk7XG5cbiAgLyoqXG4gICAqIER5bmFtaWNhbGx5IHJlbmRlciB0aGUgdGVtcGxhdGVzIGluIHRoZSBzcGVjaWZpZWQgYXJyYXlcbiAgICpcbiAgICogQHBhcmFtIG91dGxldFxuICAgKi9cbiAgcmVuZGVyKG91dGxldDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3V0bGV0UmVmcy52YWx1ZS5zaXplICE9PSAwKSB7XG4gICAgICB0aGlzLm91dGxldFJlZnMudmFsdWUuZ2V0KG91dGxldCk/LnJlbmRlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBvdXRsZXQgdG8gYmUgYXZhaWxhYmxlIHRvIHJlbmRlciBkeW5hbWljYWxseVxuICAgKlxuICAgKiBAcGFyYW0gY3hPdXRsZXRcbiAgICogQHBhcmFtIGNvbnRleHRcbiAgICovXG4gIHJlZ2lzdGVyKGN4T3V0bGV0OiBzdHJpbmcsIGNvbnRleHQ6IE91dGxldERpcmVjdGl2ZSk6IHZvaWQge1xuICAgIHRoaXMub3V0bGV0UmVmcy5uZXh0KHRoaXMub3V0bGV0UmVmcy52YWx1ZS5zZXQoY3hPdXRsZXQsIGNvbnRleHQpKTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBtYXAgb2Ygb3V0bGV0c1xuICAgKlxuICAgKi9cbiAgZ2V0T3V0bGV0UmVmKG91dGxldDogc3RyaW5nKTogT2JzZXJ2YWJsZTxPdXRsZXREaXJlY3RpdmU+IHtcbiAgICByZXR1cm4gdGhpcy5vdXRsZXRSZWZzLmFzT2JzZXJ2YWJsZSgpLnBpcGUoXG4gICAgICBtYXAoKHZhbCkgPT4gdmFsLmdldChvdXRsZXQpKSxcbiAgICAgIGZpbHRlcihpc05vdE51bGxhYmxlKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==