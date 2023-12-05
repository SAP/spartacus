/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { EventEmitter, Injectable } from '@angular/core';
import { combineLatest, concat, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class VisualPickingProductFilterService {
    constructor() {
        this._filter = '';
        this.filter$ = new EventEmitter();
        /**
         * The set of fields in product objects to perform matching against.
         */
        this.fieldsToMatch = ['code', 'name'];
        // Intentional empty constructor
    }
    /**
     * The current filter value.
     * @param filter The filter value to apply.
     */
    set filter(filterStr) {
        if (this._filter === filterStr) {
            return;
        }
        this._filter = filterStr;
        this.filter$.emit(filterStr);
    }
    get filter() {
        return this._filter;
    }
    applyFilter(filterToApply, unfilteredProductReferences) {
        filterToApply = filterToApply.toLowerCase();
        const filteredProductReferences = unfilteredProductReferences.filter((productReference) => {
            const product = productReference.target;
            return this.fieldsToMatch.some((field) => {
                const fieldValue = product[field];
                return (fieldValue !== undefined &&
                    fieldValue.toLowerCase().indexOf(filterToApply) !== -1);
            });
        });
        return filteredProductReferences;
    }
    /**
     * Returns an Observable that produces a ProductReference[] each time the filter is updated or the set of product references to filter changes.
     * @param unfilteredProductReferences$ An Observable that returns the unfiltered ProductReference[] to apply filtering to.
     * @returns An Observable that produces a ProductReference[] each time the filter is updated or the set of product references to filter changes.
     */
    getFilteredProducts(unfilteredProductReferences$) {
        return combineLatest([
            concat(of(''), this.filter$),
            unfilteredProductReferences$,
        ]).pipe(filter(([filterStr, productReferences]) => filterStr !== undefined && productReferences !== undefined), map(([filterToApply, productReferences]) => this.applyFilter(filterToApply, productReferences)));
    }
}
VisualPickingProductFilterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
VisualPickingProductFilterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualPickingProductFilterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXBpY2tpbmctcHJvZHVjdC1maWx0ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvZXBkLXZpc3VhbGl6YXRpb24vY29tcG9uZW50cy92aXN1YWwtcGlja2luZy92aXN1YWwtcGlja2luZy10YWIvcHJvZHVjdC1maWx0ZXIvdmlzdWFsLXBpY2tpbmctcHJvZHVjdC1maWx0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBSzdDLE1BQU0sT0FBTyxpQ0FBaUM7SUFDNUM7UUFrQlEsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUU3Qzs7V0FFRztRQUNPLGtCQUFhLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUF2QnpDLGdDQUFnQztJQUNsQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBVyxNQUFNLENBQUMsU0FBaUI7UUFDakMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtZQUM5QixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ0QsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFTUyxXQUFXLENBQ25CLGFBQXFCLEVBQ3JCLDJCQUErQztRQUUvQyxhQUFhLEdBQUcsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVDLE1BQU0seUJBQXlCLEdBQUcsMkJBQTJCLENBQUMsTUFBTSxDQUNsRSxDQUFDLGdCQUFnQixFQUFFLEVBQUU7WUFDbkIsTUFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsTUFBaUIsQ0FBQztZQUNuRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZDLE1BQU0sVUFBVSxHQUFJLE9BQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0MsT0FBTyxDQUNMLFVBQVUsS0FBSyxTQUFTO29CQUN4QixVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUN2RCxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQ0YsQ0FBQztRQUNGLE9BQU8seUJBQXlCLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxtQkFBbUIsQ0FDeEIsNEJBQTREO1FBRTVELE9BQU8sYUFBYSxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUM1Qiw0QkFBNEI7U0FDN0IsQ0FBQyxDQUFDLElBQUksQ0FDTCxNQUFNLENBQ0osQ0FBQyxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsQ0FDakMsU0FBUyxLQUFLLFNBQVMsSUFBSSxpQkFBaUIsS0FBSyxTQUFTLENBQzdELEVBQ0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsRUFBRSxFQUFFLENBQ3pDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLENBQ25ELENBQ0YsQ0FBQztJQUNKLENBQUM7OzhIQW5FVSxpQ0FBaUM7a0lBQWpDLGlDQUFpQyxjQUZoQyxNQUFNOzJGQUVQLGlDQUFpQztrQkFIN0MsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2R1Y3QsIFByb2R1Y3RSZWZlcmVuY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgY29uY2F0LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBWaXN1YWxQaWNraW5nUHJvZHVjdEZpbHRlclNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IGZpbHRlciB2YWx1ZS5cbiAgICogQHBhcmFtIGZpbHRlciBUaGUgZmlsdGVyIHZhbHVlIHRvIGFwcGx5LlxuICAgKi9cbiAgcHVibGljIHNldCBmaWx0ZXIoZmlsdGVyU3RyOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fZmlsdGVyID09PSBmaWx0ZXJTdHIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZmlsdGVyID0gZmlsdGVyU3RyO1xuICAgIHRoaXMuZmlsdGVyJC5lbWl0KGZpbHRlclN0cik7XG4gIH1cbiAgcHVibGljIGdldCBmaWx0ZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsdGVyO1xuICB9XG4gIHByaXZhdGUgX2ZpbHRlcjogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgZmlsdGVyJCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIC8qKlxuICAgKiBUaGUgc2V0IG9mIGZpZWxkcyBpbiBwcm9kdWN0IG9iamVjdHMgdG8gcGVyZm9ybSBtYXRjaGluZyBhZ2FpbnN0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGZpZWxkc1RvTWF0Y2ggPSBbJ2NvZGUnLCAnbmFtZSddO1xuXG4gIHByb3RlY3RlZCBhcHBseUZpbHRlcihcbiAgICBmaWx0ZXJUb0FwcGx5OiBzdHJpbmcsXG4gICAgdW5maWx0ZXJlZFByb2R1Y3RSZWZlcmVuY2VzOiBQcm9kdWN0UmVmZXJlbmNlW11cbiAgKTogUHJvZHVjdFJlZmVyZW5jZVtdIHtcbiAgICBmaWx0ZXJUb0FwcGx5ID0gZmlsdGVyVG9BcHBseS50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGZpbHRlcmVkUHJvZHVjdFJlZmVyZW5jZXMgPSB1bmZpbHRlcmVkUHJvZHVjdFJlZmVyZW5jZXMuZmlsdGVyKFxuICAgICAgKHByb2R1Y3RSZWZlcmVuY2UpID0+IHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9IHByb2R1Y3RSZWZlcmVuY2UudGFyZ2V0IGFzIFByb2R1Y3Q7XG4gICAgICAgIHJldHVybiB0aGlzLmZpZWxkc1RvTWF0Y2guc29tZSgoZmllbGQpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWVsZFZhbHVlID0gKHByb2R1Y3QgYXMgYW55KVtmaWVsZF07XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGZpZWxkVmFsdWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgZmllbGRWYWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVG9BcHBseSkgIT09IC0xXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcbiAgICByZXR1cm4gZmlsdGVyZWRQcm9kdWN0UmVmZXJlbmNlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIE9ic2VydmFibGUgdGhhdCBwcm9kdWNlcyBhIFByb2R1Y3RSZWZlcmVuY2VbXSBlYWNoIHRpbWUgdGhlIGZpbHRlciBpcyB1cGRhdGVkIG9yIHRoZSBzZXQgb2YgcHJvZHVjdCByZWZlcmVuY2VzIHRvIGZpbHRlciBjaGFuZ2VzLlxuICAgKiBAcGFyYW0gdW5maWx0ZXJlZFByb2R1Y3RSZWZlcmVuY2VzJCBBbiBPYnNlcnZhYmxlIHRoYXQgcmV0dXJucyB0aGUgdW5maWx0ZXJlZCBQcm9kdWN0UmVmZXJlbmNlW10gdG8gYXBwbHkgZmlsdGVyaW5nIHRvLlxuICAgKiBAcmV0dXJucyBBbiBPYnNlcnZhYmxlIHRoYXQgcHJvZHVjZXMgYSBQcm9kdWN0UmVmZXJlbmNlW10gZWFjaCB0aW1lIHRoZSBmaWx0ZXIgaXMgdXBkYXRlZCBvciB0aGUgc2V0IG9mIHByb2R1Y3QgcmVmZXJlbmNlcyB0byBmaWx0ZXIgY2hhbmdlcy5cbiAgICovXG4gIHB1YmxpYyBnZXRGaWx0ZXJlZFByb2R1Y3RzKFxuICAgIHVuZmlsdGVyZWRQcm9kdWN0UmVmZXJlbmNlcyQ6IE9ic2VydmFibGU8UHJvZHVjdFJlZmVyZW5jZVtdPlxuICApOiBPYnNlcnZhYmxlPFByb2R1Y3RSZWZlcmVuY2VbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIGNvbmNhdChvZignJyksIHRoaXMuZmlsdGVyJCksXG4gICAgICB1bmZpbHRlcmVkUHJvZHVjdFJlZmVyZW5jZXMkLFxuICAgIF0pLnBpcGUoXG4gICAgICBmaWx0ZXIoXG4gICAgICAgIChbZmlsdGVyU3RyLCBwcm9kdWN0UmVmZXJlbmNlc10pID0+XG4gICAgICAgICAgZmlsdGVyU3RyICE9PSB1bmRlZmluZWQgJiYgcHJvZHVjdFJlZmVyZW5jZXMgIT09IHVuZGVmaW5lZFxuICAgICAgKSxcbiAgICAgIG1hcCgoW2ZpbHRlclRvQXBwbHksIHByb2R1Y3RSZWZlcmVuY2VzXSkgPT5cbiAgICAgICAgdGhpcy5hcHBseUZpbHRlcihmaWx0ZXJUb0FwcGx5LCBwcm9kdWN0UmVmZXJlbmNlcylcbiAgICAgIClcbiAgICApO1xuICB9XG59XG4iXX0=