/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
import * as i1 from "./current-permission.service";
import * as i2 from "@spartacus/core";
import * as i3 from "../form/permission-form.service";
import * as i4 from "@spartacus/organization/administration/core";
export class PermissionItemService extends ItemService {
    constructor(currentItemService, routingService, formService, permissionService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.permissionService = permissionService;
    }
    load(code) {
        this.permissionService.loadPermission(code);
        return this.permissionService.get(code);
    }
    update(code, value) {
        this.permissionService.update(code, value);
        return this.permissionService.getLoadingStatus(value.code ?? '');
    }
    create(value) {
        this.permissionService.create(value);
        return this.permissionService.getLoadingStatus(value.code ?? '');
    }
    getDetailsRoute() {
        return 'orgPurchaseLimitDetails';
    }
}
PermissionItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionItemService, deps: [{ token: i1.CurrentPermissionService }, { token: i2.RoutingService }, { token: i3.PermissionFormService }, { token: i4.PermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CurrentPermissionService }, { type: i2.RoutingService }, { type: i3.PermissionFormService }, { type: i4.PermissionService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi1pdGVtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvcGVybWlzc2lvbi9zZXJ2aWNlcy9wZXJtaXNzaW9uLWl0ZW0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVEzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQU94RCxNQUFNLE9BQU8scUJBQXNCLFNBQVEsV0FBdUI7SUFDaEUsWUFDWSxrQkFBNEMsRUFDNUMsY0FBOEIsRUFDOUIsV0FBa0MsRUFDbEMsaUJBQW9DO1FBRTlDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFMN0MsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUEwQjtRQUM1QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1FBQ2xDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFHaEQsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFZO1FBQ2YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELE1BQU0sQ0FDSixJQUFZLEVBQ1osS0FBaUI7UUFFakIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0MsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRVMsTUFBTSxDQUNkLEtBQWlCO1FBRWpCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRVMsZUFBZTtRQUN2QixPQUFPLHlCQUF5QixDQUFDO0lBQ25DLENBQUM7O2tIQWhDVSxxQkFBcUI7c0hBQXJCLHFCQUFxQixjQUZwQixNQUFNOzJGQUVQLHFCQUFxQjtrQkFIakMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBPcmdhbml6YXRpb25JdGVtU3RhdHVzLFxuICBQZXJtaXNzaW9uLFxuICBQZXJtaXNzaW9uU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGVybWlzc2lvbkZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vZm9ybS9wZXJtaXNzaW9uLWZvcm0uc2VydmljZSc7XG5pbXBvcnQgeyBDdXJyZW50UGVybWlzc2lvblNlcnZpY2UgfSBmcm9tICcuL2N1cnJlbnQtcGVybWlzc2lvbi5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFBlcm1pc3Npb25JdGVtU2VydmljZSBleHRlbmRzIEl0ZW1TZXJ2aWNlPFBlcm1pc3Npb24+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRJdGVtU2VydmljZTogQ3VycmVudFBlcm1pc3Npb25TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGZvcm1TZXJ2aWNlOiBQZXJtaXNzaW9uRm9ybVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHBlcm1pc3Npb25TZXJ2aWNlOiBQZXJtaXNzaW9uU2VydmljZVxuICApIHtcbiAgICBzdXBlcihjdXJyZW50SXRlbVNlcnZpY2UsIHJvdXRpbmdTZXJ2aWNlLCBmb3JtU2VydmljZSk7XG4gIH1cblxuICBsb2FkKGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8UGVybWlzc2lvbj4ge1xuICAgIHRoaXMucGVybWlzc2lvblNlcnZpY2UubG9hZFBlcm1pc3Npb24oY29kZSk7XG4gICAgcmV0dXJuIHRoaXMucGVybWlzc2lvblNlcnZpY2UuZ2V0KGNvZGUpO1xuICB9XG5cbiAgdXBkYXRlKFxuICAgIGNvZGU6IHN0cmluZyxcbiAgICB2YWx1ZTogUGVybWlzc2lvblxuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8UGVybWlzc2lvbj4+IHtcbiAgICB0aGlzLnBlcm1pc3Npb25TZXJ2aWNlLnVwZGF0ZShjb2RlLCB2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMucGVybWlzc2lvblNlcnZpY2UuZ2V0TG9hZGluZ1N0YXR1cyh2YWx1ZS5jb2RlID8/ICcnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGUoXG4gICAgdmFsdWU6IFBlcm1pc3Npb25cbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPFBlcm1pc3Npb24+PiB7XG4gICAgdGhpcy5wZXJtaXNzaW9uU2VydmljZS5jcmVhdGUodmFsdWUpO1xuICAgIHJldHVybiB0aGlzLnBlcm1pc3Npb25TZXJ2aWNlLmdldExvYWRpbmdTdGF0dXModmFsdWUuY29kZSA/PyAnJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RGV0YWlsc1JvdXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdvcmdQdXJjaGFzZUxpbWl0RGV0YWlscyc7XG4gIH1cbn1cbiJdfQ==