/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { completedValues, cancelledValues, } from './order-detail-items/order-consigned-entries/order-consigned-entries.model';
import * as i0 from "@angular/core";
export class MyAccountV2OrderConsignmentsService {
    getGroupedConsignments(order, pickup) {
        const consignments = pickup
            ? order.consignments?.filter((consignment) => consignment.deliveryPointOfService !== undefined)
            : order.consignments?.filter((consignment) => consignment.deliveryPointOfService === undefined);
        return this.groupConsignments(consignments);
    }
    getUnconsignedEntries(order, pickup) {
        if (order.replenishmentOrderCode) {
            return [];
        }
        return pickup
            ? order.unconsignedEntries?.filter((entry) => entry.deliveryPointOfService !== undefined)
            : order.unconsignedEntries?.filter((entry) => entry.deliveryPointOfService === undefined);
    }
    groupConsignments(consignments) {
        const grouped = consignments?.reduce((result, current) => {
            const key = this.getStatusGroupKey(current.status || '');
            result[key] = result[key] || [];
            result[key].push(current);
            return result;
        }, {});
        return grouped
            ? [...(grouped[1] || []), ...(grouped[0] || []), ...(grouped[-1] || [])]
            : undefined;
    }
    /**
     * complete: 0
     * processing: 1
     * cancel: -1
     */
    getStatusGroupKey(status) {
        if (completedValues.includes(status)) {
            return 0;
        }
        if (cancelledValues.includes(status)) {
            return -1;
        }
        return 1;
    }
}
MyAccountV2OrderConsignmentsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderConsignmentsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MyAccountV2OrderConsignmentsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderConsignmentsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2OrderConsignmentsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktYWNjb3VudC12Mi1vcmRlci1jb25zaWdubWVudHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL29yZGVyLWRldGFpbHMvbXktYWNjb3VudC12Mi1vcmRlci1jb25zaWdubWVudHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLGVBQWUsR0FDaEIsTUFBTSw0RUFBNEUsQ0FBQzs7QUFLcEYsTUFBTSxPQUFPLG1DQUFtQztJQUM5QyxzQkFBc0IsQ0FDcEIsS0FBWSxFQUNaLE1BQWU7UUFFZixNQUFNLFlBQVksR0FBRyxNQUFNO1lBQ3pCLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FDeEIsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsS0FBSyxTQUFTLENBQ2xFO1lBQ0gsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUN4QixDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLHNCQUFzQixLQUFLLFNBQVMsQ0FDbEUsQ0FBQztRQUVOLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxxQkFBcUIsQ0FDbkIsS0FBWSxFQUNaLE1BQWU7UUFFZixJQUFLLEtBQTRCLENBQUMsc0JBQXNCLEVBQUU7WUFDeEQsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELE9BQU8sTUFBTTtZQUNYLENBQUMsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUM5QixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLHNCQUFzQixLQUFLLFNBQVMsQ0FDdEQ7WUFDSCxDQUFDLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FDOUIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsS0FBSyxTQUFTLENBQ3RELENBQUM7SUFDUixDQUFDO0lBRVMsaUJBQWlCLENBQ3pCLFlBQXVDO1FBRXZDLE1BQU0sT0FBTyxHQUFHLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUU7WUFDdkQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQixPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLEVBQUUsRUFBc0MsQ0FBQyxDQUFDO1FBRTNDLE9BQU8sT0FBTztZQUNaLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDeEUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLGlCQUFpQixDQUFDLE1BQWM7UUFDeEMsSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxDQUFDO1NBQ1Y7UUFDRCxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUNYO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDOztnSUE1RFUsbUNBQW1DO29JQUFuQyxtQ0FBbUMsY0FGbEMsTUFBTTsyRkFFUCxtQ0FBbUM7a0JBSC9DLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJFbnRyeSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgT3JkZXIsIENvbnNpZ25tZW50LCBSZXBsZW5pc2htZW50T3JkZXIgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHtcbiAgY29tcGxldGVkVmFsdWVzLFxuICBjYW5jZWxsZWRWYWx1ZXMsXG59IGZyb20gJy4vb3JkZXItZGV0YWlsLWl0ZW1zL29yZGVyLWNvbnNpZ25lZC1lbnRyaWVzL29yZGVyLWNvbnNpZ25lZC1lbnRyaWVzLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE15QWNjb3VudFYyT3JkZXJDb25zaWdubWVudHNTZXJ2aWNlIHtcbiAgZ2V0R3JvdXBlZENvbnNpZ25tZW50cyhcbiAgICBvcmRlcjogT3JkZXIsXG4gICAgcGlja3VwOiBib29sZWFuXG4gICk6IENvbnNpZ25tZW50W10gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGNvbnNpZ25tZW50cyA9IHBpY2t1cFxuICAgICAgPyBvcmRlci5jb25zaWdubWVudHM/LmZpbHRlcihcbiAgICAgICAgICAoY29uc2lnbm1lbnQpID0+IGNvbnNpZ25tZW50LmRlbGl2ZXJ5UG9pbnRPZlNlcnZpY2UgIT09IHVuZGVmaW5lZFxuICAgICAgICApXG4gICAgICA6IG9yZGVyLmNvbnNpZ25tZW50cz8uZmlsdGVyKFxuICAgICAgICAgIChjb25zaWdubWVudCkgPT4gY29uc2lnbm1lbnQuZGVsaXZlcnlQb2ludE9mU2VydmljZSA9PT0gdW5kZWZpbmVkXG4gICAgICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5ncm91cENvbnNpZ25tZW50cyhjb25zaWdubWVudHMpO1xuICB9XG5cbiAgZ2V0VW5jb25zaWduZWRFbnRyaWVzKFxuICAgIG9yZGVyOiBPcmRlcixcbiAgICBwaWNrdXA6IGJvb2xlYW5cbiAgKTogT3JkZXJFbnRyeVtdIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoKG9yZGVyIGFzIFJlcGxlbmlzaG1lbnRPcmRlcikucmVwbGVuaXNobWVudE9yZGVyQ29kZSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICByZXR1cm4gcGlja3VwXG4gICAgICA/IG9yZGVyLnVuY29uc2lnbmVkRW50cmllcz8uZmlsdGVyKFxuICAgICAgICAgIChlbnRyeSkgPT4gZW50cnkuZGVsaXZlcnlQb2ludE9mU2VydmljZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgIClcbiAgICAgIDogb3JkZXIudW5jb25zaWduZWRFbnRyaWVzPy5maWx0ZXIoXG4gICAgICAgICAgKGVudHJ5KSA9PiBlbnRyeS5kZWxpdmVyeVBvaW50T2ZTZXJ2aWNlID09PSB1bmRlZmluZWRcbiAgICAgICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBncm91cENvbnNpZ25tZW50cyhcbiAgICBjb25zaWdubWVudHM6IENvbnNpZ25tZW50W10gfCB1bmRlZmluZWRcbiAgKTogQ29uc2lnbm1lbnRbXSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZ3JvdXBlZCA9IGNvbnNpZ25tZW50cz8ucmVkdWNlKChyZXN1bHQsIGN1cnJlbnQpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IHRoaXMuZ2V0U3RhdHVzR3JvdXBLZXkoY3VycmVudC5zdGF0dXMgfHwgJycpO1xuICAgICAgcmVzdWx0W2tleV0gPSByZXN1bHRba2V5XSB8fCBbXTtcbiAgICAgIHJlc3VsdFtrZXldLnB1c2goY3VycmVudCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIHt9IGFzIHsgW2tleTogc3RyaW5nXTogQ29uc2lnbm1lbnRbXSB9KTtcblxuICAgIHJldHVybiBncm91cGVkXG4gICAgICA/IFsuLi4oZ3JvdXBlZFsxXSB8fCBbXSksIC4uLihncm91cGVkWzBdIHx8IFtdKSwgLi4uKGdyb3VwZWRbLTFdIHx8IFtdKV1cbiAgICAgIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbXBsZXRlOiAwXG4gICAqIHByb2Nlc3Npbmc6IDFcbiAgICogY2FuY2VsOiAtMVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFN0YXR1c0dyb3VwS2V5KHN0YXR1czogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBpZiAoY29tcGxldGVkVmFsdWVzLmluY2x1ZGVzKHN0YXR1cykpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAoY2FuY2VsbGVkVmFsdWVzLmluY2x1ZGVzKHN0YXR1cykpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgcmV0dXJuIDE7XG4gIH1cbn1cbiJdfQ==