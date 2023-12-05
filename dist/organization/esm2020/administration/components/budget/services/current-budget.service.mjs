/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { CurrentItemService } from '../../shared/current-item.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/organization/administration/core";
export class CurrentBudgetService extends CurrentItemService {
    constructor(routingService, budgetService) {
        super(routingService);
        this.routingService = routingService;
        this.budgetService = budgetService;
    }
    getDetailsRoute() {
        return 'orgBudgetDetails';
    }
    getParamKey() {
        return ROUTE_PARAMS.budgetCode;
    }
    getItem(code) {
        return this.budgetService.get(code);
    }
    getError(code) {
        return this.budgetService.getErrorState(code);
    }
}
CurrentBudgetService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentBudgetService, deps: [{ token: i1.RoutingService }, { token: i2.BudgetService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentBudgetService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentBudgetService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentBudgetService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i2.BudgetService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVudC1idWRnZXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy9idWRnZXQvc2VydmljZXMvY3VycmVudC1idWRnZXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU0zQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFFM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFLdkUsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGtCQUEwQjtJQUNsRSxZQUNZLGNBQThCLEVBQzlCLGFBQTRCO1FBRXRDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUhaLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUd4QyxDQUFDO0lBRVMsZUFBZTtRQUN2QixPQUFPLGtCQUFrQixDQUFDO0lBQzVCLENBQUM7SUFFUyxXQUFXO1FBQ25CLE9BQU8sWUFBWSxDQUFDLFVBQVUsQ0FBQztJQUNqQyxDQUFDO0lBRVMsT0FBTyxDQUFDLElBQVk7UUFDNUIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQVk7UUFDbkIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDOztpSEF0QlUsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGluZ1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQnVkZ2V0LFxuICBCdWRnZXRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IFJPVVRFX1BBUkFNUyB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ3VycmVudEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2N1cnJlbnQtaXRlbS5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEN1cnJlbnRCdWRnZXRTZXJ2aWNlIGV4dGVuZHMgQ3VycmVudEl0ZW1TZXJ2aWNlPEJ1ZGdldD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBidWRnZXRTZXJ2aWNlOiBCdWRnZXRTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHJvdXRpbmdTZXJ2aWNlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXREZXRhaWxzUm91dGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ29yZ0J1ZGdldERldGFpbHMnO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFBhcmFtS2V5KCkge1xuICAgIHJldHVybiBST1VURV9QQVJBTVMuYnVkZ2V0Q29kZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRJdGVtKGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8QnVkZ2V0PiB7XG4gICAgcmV0dXJuIHRoaXMuYnVkZ2V0U2VydmljZS5nZXQoY29kZSk7XG4gIH1cblxuICBnZXRFcnJvcihjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5idWRnZXRTZXJ2aWNlLmdldEVycm9yU3RhdGUoY29kZSk7XG4gIH1cbn1cbiJdfQ==