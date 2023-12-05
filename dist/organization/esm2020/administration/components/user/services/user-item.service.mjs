/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ItemService } from '../../shared/item.service';
import * as i0 from "@angular/core";
import * as i1 from "./current-user.service";
import * as i2 from "@spartacus/core";
import * as i3 from "../form/user-form.service";
import * as i4 from "@spartacus/organization/administration/core";
export class UserItemService extends ItemService {
    constructor(currentItemService, routingService, formService, userService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.userService = userService;
    }
    load(code) {
        this.userService.load(code);
        return this.userService.get(code);
    }
    update(code, value) {
        delete value.approvers;
        this.userService.update(code, value);
        return this.userService.getLoadingStatus(code);
    }
    create(value) {
        this.userService.create(value);
        return this.userService.getLoadingStatus(value.uid ?? '');
    }
    getDetailsRoute() {
        return 'orgUserDetails';
    }
    // @override to avoid errors while creation
    launchDetails(item) {
        if (item.customerId !== null) {
            super.launchDetails(item);
        }
    }
}
UserItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserItemService, deps: [{ token: i1.CurrentUserService }, { token: i2.RoutingService }, { token: i3.UserFormService }, { token: i4.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UserItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CurrentUserService }, { type: i2.RoutingService }, { type: i3.UserFormService }, { type: i4.B2BUserService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1pdGVtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci9zZXJ2aWNlcy91c2VyLWl0ZW0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8zQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQU94RCxNQUFNLE9BQU8sZUFBZ0IsU0FBUSxXQUFvQjtJQUN2RCxZQUNZLGtCQUFzQyxFQUN0QyxjQUE4QixFQUM5QixXQUE0QixFQUM1QixXQUEyQjtRQUVyQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBTDdDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7SUFHdkMsQ0FBQztJQUVELElBQUksQ0FBQyxJQUFZO1FBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsTUFBTSxDQUNKLElBQVksRUFDWixLQUFjO1FBRWQsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVTLE1BQU0sQ0FDZCxLQUFjO1FBRWQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVTLGVBQWU7UUFDdkIsT0FBTyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0lBRUQsMkNBQTJDO0lBQzNDLGFBQWEsQ0FBQyxJQUFhO1FBQ3pCLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDNUIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7OzRHQXhDVSxlQUFlO2dIQUFmLGVBQWUsY0FGZCxNQUFNOzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQjJCVXNlciwgUm91dGluZ1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQjJCVXNlclNlcnZpY2UsXG4gIE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXMsXG59IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvaXRlbS5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJGb3JtU2VydmljZSB9IGZyb20gJy4uL2Zvcm0vdXNlci1mb3JtLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi9jdXJyZW50LXVzZXIuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVc2VySXRlbVNlcnZpY2UgZXh0ZW5kcyBJdGVtU2VydmljZTxCMkJVc2VyPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjdXJyZW50SXRlbVNlcnZpY2U6IEN1cnJlbnRVc2VyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBmb3JtU2VydmljZTogVXNlckZvcm1TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VyU2VydmljZTogQjJCVXNlclNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoY3VycmVudEl0ZW1TZXJ2aWNlLCByb3V0aW5nU2VydmljZSwgZm9ybVNlcnZpY2UpO1xuICB9XG5cbiAgbG9hZChjb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEIyQlVzZXI+IHtcbiAgICB0aGlzLnVzZXJTZXJ2aWNlLmxvYWQoY29kZSk7XG4gICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2UuZ2V0KGNvZGUpO1xuICB9XG5cbiAgdXBkYXRlKFxuICAgIGNvZGU6IHN0cmluZyxcbiAgICB2YWx1ZTogQjJCVXNlclxuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8QjJCVXNlcj4+IHtcbiAgICBkZWxldGUgdmFsdWUuYXBwcm92ZXJzO1xuICAgIHRoaXMudXNlclNlcnZpY2UudXBkYXRlKGNvZGUsIHZhbHVlKTtcbiAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5nZXRMb2FkaW5nU3RhdHVzKGNvZGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZShcbiAgICB2YWx1ZTogQjJCVXNlclxuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8QjJCVXNlcj4+IHtcbiAgICB0aGlzLnVzZXJTZXJ2aWNlLmNyZWF0ZSh2YWx1ZSk7XG4gICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2UuZ2V0TG9hZGluZ1N0YXR1cyh2YWx1ZS51aWQgPz8gJycpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldERldGFpbHNSb3V0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiAnb3JnVXNlckRldGFpbHMnO1xuICB9XG5cbiAgLy8gQG92ZXJyaWRlIHRvIGF2b2lkIGVycm9ycyB3aGlsZSBjcmVhdGlvblxuICBsYXVuY2hEZXRhaWxzKGl0ZW06IEIyQlVzZXIpOiB2b2lkIHtcbiAgICBpZiAoaXRlbS5jdXN0b21lcklkICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5sYXVuY2hEZXRhaWxzKGl0ZW0pO1xuICAgIH1cbiAgfVxufVxuIl19