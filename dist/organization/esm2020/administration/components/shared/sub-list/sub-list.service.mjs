/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { TableLayout, } from '@spartacus/storefront';
import { EMPTY } from 'rxjs';
import { ListService } from '../list/list.service';
import * as i0 from "@angular/core";
export class SubListService extends ListService {
    constructor() {
        super(...arguments);
        /**
         * The default table structure for sub lists is only showing tables with vertical layout.
         */
        this.defaultTableStructure = {
            options: { layout: TableLayout.VERTICAL },
        };
        /**
         * @override This sub list will show 3 items.
         */
        this.ghostData = { values: new Array(3) };
    }
    // TODO: abstract
    assign(_key, ..._args) {
        return EMPTY;
    }
    unassign(_key, ..._args) {
        return EMPTY;
    }
    /**
     * As we can't filter with the backend API, we do this client side.
     */
    filterSelected(list) {
        if (!list) {
            return list;
        }
        const { pagination, sorts, values } = list;
        return {
            pagination,
            sorts,
            values: values.filter((value) => value.selected),
        };
    }
}
SubListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SubListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
SubListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SubListService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SubListService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9zaGFyZWQvc3ViLWxpc3Qvc3ViLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBRUwsV0FBVyxHQUNaLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLEtBQUssRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7O0FBSW5ELE1BQU0sT0FBZ0IsY0FFcEIsU0FBUSxXQUFjO0lBSHhCOztRQUlFOztXQUVHO1FBQ08sMEJBQXFCLEdBQWlDO1lBQzlELE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFO1NBQzFDLENBQUM7UUFFRjs7V0FFRztRQUNPLGNBQVMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBc0IsQ0FBQztLQWdDcEU7SUE5QkMsaUJBQWlCO0lBQ2pCLE1BQU0sQ0FBRSxJQUFZLEVBQUUsR0FBRyxLQUFVO1FBQ2pDLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFFBQVEsQ0FDTixJQUFZLEVBQ1osR0FBRyxLQUFVO1FBRWIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDTyxjQUFjLENBQ3RCLElBQWtDO1FBRWxDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsTUFBTSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBRTNDLE9BQU87WUFDTCxVQUFVO1lBQ1YsS0FBSztZQUNMLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1NBQ2pELENBQUM7SUFDSixDQUFDOzsyR0E1Q21CLGNBQWM7K0dBQWQsY0FBYzsyRkFBZCxjQUFjO2tCQURuQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRW50aXRpZXNNb2RlbCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25JdGVtU3RhdHVzIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQge1xuICBSZXNwb25zaXZlVGFibGVDb25maWd1cmF0aW9uLFxuICBUYWJsZUxheW91dCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEVNUFRZLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMaXN0U2VydmljZSB9IGZyb20gJy4uL2xpc3QvbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IEJhc2VJdGVtIH0gZnJvbSAnLi4vb3JnYW5pemF0aW9uLm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN1Ykxpc3RTZXJ2aWNlPFxuICBUIGV4dGVuZHMgQmFzZUl0ZW1cbj4gZXh0ZW5kcyBMaXN0U2VydmljZTxUPiB7XG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCB0YWJsZSBzdHJ1Y3R1cmUgZm9yIHN1YiBsaXN0cyBpcyBvbmx5IHNob3dpbmcgdGFibGVzIHdpdGggdmVydGljYWwgbGF5b3V0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGRlZmF1bHRUYWJsZVN0cnVjdHVyZTogUmVzcG9uc2l2ZVRhYmxlQ29uZmlndXJhdGlvbiA9IHtcbiAgICBvcHRpb25zOiB7IGxheW91dDogVGFibGVMYXlvdXQuVkVSVElDQUwgfSxcbiAgfTtcblxuICAvKipcbiAgICogQG92ZXJyaWRlIFRoaXMgc3ViIGxpc3Qgd2lsbCBzaG93IDMgaXRlbXMuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2hvc3REYXRhID0geyB2YWx1ZXM6IG5ldyBBcnJheSgzKSB9IGFzIEVudGl0aWVzTW9kZWw8VD47XG5cbiAgLy8gVE9ETzogYWJzdHJhY3RcbiAgYXNzaWduPyhfa2V5OiBzdHJpbmcsIC4uLl9hcmdzOiBhbnkpOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8VD4+IHtcbiAgICByZXR1cm4gRU1QVFk7XG4gIH1cblxuICB1bmFzc2lnbj8oXG4gICAgX2tleTogc3RyaW5nLFxuICAgIC4uLl9hcmdzOiBhbnlcbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPFQ+PiB7XG4gICAgcmV0dXJuIEVNUFRZO1xuICB9XG5cbiAgLyoqXG4gICAqIEFzIHdlIGNhbid0IGZpbHRlciB3aXRoIHRoZSBiYWNrZW5kIEFQSSwgd2UgZG8gdGhpcyBjbGllbnQgc2lkZS5cbiAgICovXG4gIHByb3RlY3RlZCBmaWx0ZXJTZWxlY3RlZChcbiAgICBsaXN0OiBFbnRpdGllc01vZGVsPFQ+IHwgdW5kZWZpbmVkXG4gICk6IEVudGl0aWVzTW9kZWw8VD4gfCB1bmRlZmluZWQge1xuICAgIGlmICghbGlzdCkge1xuICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuXG4gICAgY29uc3QgeyBwYWdpbmF0aW9uLCBzb3J0cywgdmFsdWVzIH0gPSBsaXN0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZ2luYXRpb24sXG4gICAgICBzb3J0cyxcbiAgICAgIHZhbHVlczogdmFsdWVzLmZpbHRlcigodmFsdWUpID0+IHZhbHVlLnNlbGVjdGVkKSxcbiAgICB9O1xuICB9XG59XG4iXX0=