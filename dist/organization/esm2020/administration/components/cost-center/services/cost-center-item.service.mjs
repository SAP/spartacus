/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
import * as i1 from "./current-cost-center.service";
import * as i2 from "@spartacus/core";
import * as i3 from "../form/cost-center-form.service";
import * as i4 from "@spartacus/organization/administration/core";
export class CostCenterItemService extends ItemService {
    constructor(currentItemService, routingService, formService, costCenterService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.costCenterService = costCenterService;
    }
    load(code) {
        this.costCenterService.load(code);
        return this.costCenterService.get(code);
    }
    update(code, value) {
        this.costCenterService.update(code, value);
        return this.costCenterService.getLoadingStatus(value.code ?? '');
    }
    create(value) {
        this.costCenterService.create(value);
        return this.costCenterService.getLoadingStatus(value.code ?? '');
    }
    getDetailsRoute() {
        return 'orgCostCenterDetails';
    }
}
CostCenterItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterItemService, deps: [{ token: i1.CurrentCostCenterService }, { token: i2.RoutingService }, { token: i3.CostCenterFormService }, { token: i4.CostCenterService }], target: i0.ɵɵFactoryTarget.Injectable });
CostCenterItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CurrentCostCenterService }, { type: i2.RoutingService }, { type: i3.CostCenterFormService }, { type: i4.CostCenterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zdC1jZW50ZXItaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL2Nvc3QtY2VudGVyL3NlcnZpY2VzL2Nvc3QtY2VudGVyLWl0ZW0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8zQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQU94RCxNQUFNLE9BQU8scUJBQXNCLFNBQVEsV0FBdUI7SUFDaEUsWUFDWSxrQkFBNEMsRUFDNUMsY0FBOEIsRUFDOUIsV0FBa0MsRUFDbEMsaUJBQW9DO1FBRTlDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFMN0MsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUEwQjtRQUM1QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1FBQ2xDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFHaEQsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFZO1FBQ2YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELE1BQU0sQ0FDSixJQUFZLEVBQ1osS0FBaUI7UUFFakIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0MsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRVMsTUFBTSxDQUNkLEtBQWlCO1FBRWpCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRVMsZUFBZTtRQUN2QixPQUFPLHNCQUFzQixDQUFDO0lBQ2hDLENBQUM7O2tIQWhDVSxxQkFBcUI7c0hBQXJCLHFCQUFxQixjQUZwQixNQUFNOzJGQUVQLHFCQUFxQjtrQkFIakMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3N0Q2VudGVyLCBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBDb3N0Q2VudGVyU2VydmljZSxcbiAgT3JnYW5pemF0aW9uSXRlbVN0YXR1cyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29zdENlbnRlckZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vZm9ybS9jb3N0LWNlbnRlci1mb3JtLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3VycmVudENvc3RDZW50ZXJTZXJ2aWNlIH0gZnJvbSAnLi9jdXJyZW50LWNvc3QtY2VudGVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29zdENlbnRlckl0ZW1TZXJ2aWNlIGV4dGVuZHMgSXRlbVNlcnZpY2U8Q29zdENlbnRlcj4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY3VycmVudEl0ZW1TZXJ2aWNlOiBDdXJyZW50Q29zdENlbnRlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZm9ybVNlcnZpY2U6IENvc3RDZW50ZXJGb3JtU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29zdENlbnRlclNlcnZpY2U6IENvc3RDZW50ZXJTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGN1cnJlbnRJdGVtU2VydmljZSwgcm91dGluZ1NlcnZpY2UsIGZvcm1TZXJ2aWNlKTtcbiAgfVxuXG4gIGxvYWQoY29kZTogc3RyaW5nKTogT2JzZXJ2YWJsZTxDb3N0Q2VudGVyPiB7XG4gICAgdGhpcy5jb3N0Q2VudGVyU2VydmljZS5sb2FkKGNvZGUpO1xuICAgIHJldHVybiB0aGlzLmNvc3RDZW50ZXJTZXJ2aWNlLmdldChjb2RlKTtcbiAgfVxuXG4gIHVwZGF0ZShcbiAgICBjb2RlOiBzdHJpbmcsXG4gICAgdmFsdWU6IENvc3RDZW50ZXJcbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPENvc3RDZW50ZXI+PiB7XG4gICAgdGhpcy5jb3N0Q2VudGVyU2VydmljZS51cGRhdGUoY29kZSwgdmFsdWUpO1xuICAgIHJldHVybiB0aGlzLmNvc3RDZW50ZXJTZXJ2aWNlLmdldExvYWRpbmdTdGF0dXModmFsdWUuY29kZSA/PyAnJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlKFxuICAgIHZhbHVlOiBDb3N0Q2VudGVyXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxDb3N0Q2VudGVyPj4ge1xuICAgIHRoaXMuY29zdENlbnRlclNlcnZpY2UuY3JlYXRlKHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy5jb3N0Q2VudGVyU2VydmljZS5nZXRMb2FkaW5nU3RhdHVzKHZhbHVlLmNvZGUgPz8gJycpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldERldGFpbHNSb3V0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnb3JnQ29zdENlbnRlckRldGFpbHMnO1xuICB9XG59XG4iXX0=