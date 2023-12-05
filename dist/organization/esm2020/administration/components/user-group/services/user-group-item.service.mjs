/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
import * as i1 from "./current-user-group.service";
import * as i2 from "@spartacus/core";
import * as i3 from "../form/user-group-form.service";
import * as i4 from "@spartacus/organization/administration/core";
export class UserGroupItemService extends ItemService {
    constructor(currentItemService, routingService, formService, userGroupService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.userGroupService = userGroupService;
    }
    load(code) {
        this.userGroupService.load(code);
        return this.userGroupService.get(code);
    }
    update(code, value) {
        this.userGroupService.update(code, value);
        return this.userGroupService.getLoadingStatus(value.uid ?? '');
    }
    delete(code) {
        this.launchList();
        this.userGroupService.delete(code);
        return this.userGroupService.getLoadingStatus(code);
    }
    create(value) {
        this.userGroupService.create(value);
        return this.userGroupService.getLoadingStatus(value.uid ?? '');
    }
    getDetailsRoute() {
        return 'orgUserGroupDetails';
    }
    launchList() {
        this.routingService.go({
            cxRoute: 'orgUserGroup',
        });
    }
}
UserGroupItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupItemService, deps: [{ token: i1.CurrentUserGroupService }, { token: i2.RoutingService }, { token: i3.UserGroupFormService }, { token: i4.UserGroupService }], target: i0.ɵɵFactoryTarget.Injectable });
UserGroupItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CurrentUserGroupService }, { type: i2.RoutingService }, { type: i3.UserGroupFormService }, { type: i4.UserGroupService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC1pdGVtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci1ncm91cC9zZXJ2aWNlcy91c2VyLWdyb3VwLWl0ZW0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVEzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQU94RCxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsV0FBc0I7SUFDOUQsWUFDWSxrQkFBMkMsRUFDM0MsY0FBOEIsRUFDOUIsV0FBaUMsRUFDakMsZ0JBQWtDO1FBRTVDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFMN0MsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF5QjtRQUMzQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQXNCO1FBQ2pDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFHOUMsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFZO1FBQ2YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELE1BQU0sQ0FDSixJQUFZLEVBQ1osS0FBZ0I7UUFFaEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVk7UUFDakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVTLE1BQU0sQ0FDZCxLQUFnQjtRQUVoQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVTLGVBQWU7UUFDdkIsT0FBTyxxQkFBcUIsQ0FBQztJQUMvQixDQUFDO0lBRVMsVUFBVTtRQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQztZQUNyQixPQUFPLEVBQUUsY0FBYztTQUN4QixDQUFDLENBQUM7SUFDTCxDQUFDOztpSEE1Q1Usb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGluZ1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgT3JnYW5pemF0aW9uSXRlbVN0YXR1cyxcbiAgVXNlckdyb3VwLFxuICBVc2VyR3JvdXBTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyR3JvdXBGb3JtU2VydmljZSB9IGZyb20gJy4uL2Zvcm0vdXNlci1ncm91cC1mb3JtLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJHcm91cFNlcnZpY2UgfSBmcm9tICcuL2N1cnJlbnQtdXNlci1ncm91cC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVzZXJHcm91cEl0ZW1TZXJ2aWNlIGV4dGVuZHMgSXRlbVNlcnZpY2U8VXNlckdyb3VwPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjdXJyZW50SXRlbVNlcnZpY2U6IEN1cnJlbnRVc2VyR3JvdXBTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGZvcm1TZXJ2aWNlOiBVc2VyR3JvdXBGb3JtU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdXNlckdyb3VwU2VydmljZTogVXNlckdyb3VwU2VydmljZVxuICApIHtcbiAgICBzdXBlcihjdXJyZW50SXRlbVNlcnZpY2UsIHJvdXRpbmdTZXJ2aWNlLCBmb3JtU2VydmljZSk7XG4gIH1cblxuICBsb2FkKGNvZGU6IHN0cmluZyk6IE9ic2VydmFibGU8VXNlckdyb3VwPiB7XG4gICAgdGhpcy51c2VyR3JvdXBTZXJ2aWNlLmxvYWQoY29kZSk7XG4gICAgcmV0dXJuIHRoaXMudXNlckdyb3VwU2VydmljZS5nZXQoY29kZSk7XG4gIH1cblxuICB1cGRhdGUoXG4gICAgY29kZTogc3RyaW5nLFxuICAgIHZhbHVlOiBVc2VyR3JvdXBcbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPFVzZXJHcm91cD4+IHtcbiAgICB0aGlzLnVzZXJHcm91cFNlcnZpY2UudXBkYXRlKGNvZGUsIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy51c2VyR3JvdXBTZXJ2aWNlLmdldExvYWRpbmdTdGF0dXModmFsdWUudWlkID8/ICcnKTtcbiAgfVxuXG4gIGRlbGV0ZShjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8VXNlckdyb3VwPj4ge1xuICAgIHRoaXMubGF1bmNoTGlzdCgpO1xuICAgIHRoaXMudXNlckdyb3VwU2VydmljZS5kZWxldGUoY29kZSk7XG4gICAgcmV0dXJuIHRoaXMudXNlckdyb3VwU2VydmljZS5nZXRMb2FkaW5nU3RhdHVzKGNvZGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZShcbiAgICB2YWx1ZTogVXNlckdyb3VwXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxVc2VyR3JvdXA+PiB7XG4gICAgdGhpcy51c2VyR3JvdXBTZXJ2aWNlLmNyZWF0ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMudXNlckdyb3VwU2VydmljZS5nZXRMb2FkaW5nU3RhdHVzKHZhbHVlLnVpZCA/PyAnJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0RGV0YWlsc1JvdXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdvcmdVc2VyR3JvdXBEZXRhaWxzJztcbiAgfVxuXG4gIHByb3RlY3RlZCBsYXVuY2hMaXN0KCkge1xuICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oe1xuICAgICAgY3hSb3V0ZTogJ29yZ1VzZXJHcm91cCcsXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==