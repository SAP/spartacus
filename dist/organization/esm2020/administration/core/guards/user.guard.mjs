/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../services";
import * as i3 from "@angular/router";
export class UserGuard {
    constructor(globalMessageService, b2bUserService, semanticPathService, router) {
        this.globalMessageService = globalMessageService;
        this.b2bUserService = b2bUserService;
        this.semanticPathService = semanticPathService;
        this.router = router;
    }
    canActivate() {
        const isUpdatingUserAllowed = this.b2bUserService.isUpdatingUserAllowed();
        if (!isUpdatingUserAllowed) {
            this.globalMessageService.add({ key: 'organization.notification.notExist' }, GlobalMessageType.MSG_TYPE_WARNING);
            return this.router.parseUrl(this.semanticPathService.get('organization') ?? '');
        }
        return isUpdatingUserAllowed;
    }
}
UserGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGuard, deps: [{ token: i1.GlobalMessageService }, { token: i2.B2BUserService }, { token: i1.SemanticPathService }, { token: i3.Router }], target: i0.ɵɵFactoryTarget.Injectable });
UserGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGuard });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGuard, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.GlobalMessageService }, { type: i2.B2BUserService }, { type: i1.SemanticPathService }, { type: i3.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZS9ndWFyZHMvdXNlci5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBRUwsaUJBQWlCLEdBRWxCLE1BQU0saUJBQWlCLENBQUM7Ozs7O0FBSXpCLE1BQU0sT0FBTyxTQUFTO0lBQ3BCLFlBQ1ksb0JBQTBDLEVBQzFDLGNBQThCLEVBQzlCLG1CQUF3QyxFQUN4QyxNQUFjO1FBSGQseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQ3ZCLENBQUM7SUFFSixXQUFXO1FBQ1QsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDMUUsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzFCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCLEVBQUUsR0FBRyxFQUFFLG9DQUFvQyxFQUFFLEVBQzdDLGlCQUFpQixDQUFDLGdCQUFnQixDQUNuQyxDQUFDO1lBQ0YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FDekIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQ25ELENBQUM7U0FDSDtRQUNELE9BQU8scUJBQXFCLENBQUM7SUFDL0IsQ0FBQzs7c0dBcEJVLFNBQVM7MEdBQVQsU0FBUzsyRkFBVCxTQUFTO2tCQURyQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUsIFJvdXRlciwgVXJsVHJlZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIFNlbWFudGljUGF0aFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBCMkJVc2VyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYjJiVXNlclNlcnZpY2U6IEIyQlVzZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzZW1hbnRpY1BhdGhTZXJ2aWNlOiBTZW1hbnRpY1BhdGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlclxuICApIHt9XG5cbiAgY2FuQWN0aXZhdGUoKTogYm9vbGVhbiB8IFVybFRyZWUge1xuICAgIGNvbnN0IGlzVXBkYXRpbmdVc2VyQWxsb3dlZCA9IHRoaXMuYjJiVXNlclNlcnZpY2UuaXNVcGRhdGluZ1VzZXJBbGxvd2VkKCk7XG4gICAgaWYgKCFpc1VwZGF0aW5nVXNlckFsbG93ZWQpIHtcbiAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICB7IGtleTogJ29yZ2FuaXphdGlvbi5ub3RpZmljYXRpb24ubm90RXhpc3QnIH0sXG4gICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX1dBUk5JTkdcbiAgICAgICk7XG4gICAgICByZXR1cm4gdGhpcy5yb3V0ZXIucGFyc2VVcmwoXG4gICAgICAgIHRoaXMuc2VtYW50aWNQYXRoU2VydmljZS5nZXQoJ29yZ2FuaXphdGlvbicpID8/ICcnXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gaXNVcGRhdGluZ1VzZXJBbGxvd2VkO1xuICB9XG59XG4iXX0=