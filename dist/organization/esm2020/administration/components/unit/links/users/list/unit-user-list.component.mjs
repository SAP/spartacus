/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import { of } from 'rxjs';
import { ListService } from '../../../../shared/list/list.service';
import { UnitUserListService } from '../services/unit-user-list.service';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/current-unit.service";
import * as i2 from "@spartacus/organization/administration/core";
import * as i3 from "@angular/common";
import * as i4 from "@angular/router";
import * as i5 from "../../../../shared/sub-list/sub-list.component";
import * as i6 from "../../../../shared/detail/disable-info/disable-info.component";
import * as i7 from "@spartacus/core";
export class UnitUserListComponent {
    constructor(currentUnitService, b2bUserService) {
        this.currentUnitService = currentUnitService;
        this.b2bUserService = b2bUserService;
        this.routerKey = ROUTE_PARAMS.userCode;
        this.unit$ = this.currentUnitService
            ? this.currentUnitService.item$
            : of({ active: true });
        this.isUpdatingUserAllowed = this.b2bUserService.isUpdatingUserAllowed();
    }
}
UnitUserListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListComponent, deps: [{ token: i1.CurrentUnitService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Component });
UnitUserListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitUserListComponent, selector: "cx-org-unit-user-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UnitUserListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list key=\"customerId\" [routerKey]=\"routerKey\" [showHint]=\"true\">\n  <a\n    *ngIf=\"isUpdatingUserAllowed\"\n    actions\n    class=\"link\"\n    routerLink=\"create\"\n    [class.disabled]=\"!(unit$ | async)?.active\"\n  >\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgUnitUsers\"\n    [displayInfoConfig]=\"{\n      disabledCreate: true,\n      disabledEnable: false,\n      disabledEdit: false\n    }\"\n  >\n  </cx-org-disable-info>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i5.SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "component", type: i6.DisableInfoComponent, selector: "cx-org-disable-info", inputs: ["i18nRoot", "displayInfoConfig", "displayCustomInfo"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i7.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-user-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UnitUserListService,
                        },
                    ], template: "<cx-org-sub-list key=\"customerId\" [routerKey]=\"routerKey\" [showHint]=\"true\">\n  <a\n    *ngIf=\"isUpdatingUserAllowed\"\n    actions\n    class=\"link\"\n    routerLink=\"create\"\n    [class.disabled]=\"!(unit$ | async)?.active\"\n  >\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgUnitUsers\"\n    [displayInfoConfig]=\"{\n      disabledCreate: true,\n      disabledEnable: false,\n      disabledEdit: false\n    }\"\n  >\n  </cx-org-disable-info>\n</cx-org-sub-list>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentUnitService }, { type: i2.B2BUserService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC11c2VyLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3VuaXQvbGlua3MvdXNlcnMvbGlzdC91bml0LXVzZXItbGlzdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saW5rcy91c2Vycy9saXN0L3VuaXQtdXNlci1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5FLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQztBQUMzRSxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUVuRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7Ozs7O0FBZXpFLE1BQU0sT0FBTyxxQkFBcUI7SUFTaEMsWUFDWSxrQkFBc0MsRUFDdEMsY0FBOEI7UUFEOUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFWMUMsY0FBUyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7UUFFbEMsVUFBSyxHQUFvQyxJQUFJLENBQUMsa0JBQWtCO1lBQzlELENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSztZQUMvQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFekIsMEJBQXFCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBS2pFLENBQUM7O2tIQVpPLHFCQUFxQjtzR0FBckIscUJBQXFCLDZGQVByQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLFdBQVc7WUFDcEIsV0FBVyxFQUFFLG1CQUFtQjtTQUNqQztLQUNGLDBCQ3pCSCw0aEJBcUJBOzJGRE1hLHFCQUFxQjtrQkFaakMsU0FBUzsrQkFDRSx1QkFBdUIsbUJBRWhCLHVCQUF1QixDQUFDLE1BQU0sUUFDekMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsYUFDdkI7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLFdBQVc7NEJBQ3BCLFdBQVcsRUFBRSxtQkFBbUI7eUJBQ2pDO3FCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQjJCVW5pdCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBST1VURV9QQVJBTVMgfSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMaXN0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9saXN0L2xpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBDdXJyZW50VW5pdFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9jdXJyZW50LXVuaXQuc2VydmljZSc7XG5pbXBvcnQgeyBVbml0VXNlckxpc3RTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdW5pdC11c2VyLWxpc3Quc2VydmljZSc7XG5pbXBvcnQgeyBCMkJVc2VyU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctdW5pdC11c2VyLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vdW5pdC11c2VyLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgaG9zdDogeyBjbGFzczogJ2NvbnRlbnQtd3JhcHBlcicgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTGlzdFNlcnZpY2UsXG4gICAgICB1c2VFeGlzdGluZzogVW5pdFVzZXJMaXN0U2VydmljZSxcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBVbml0VXNlckxpc3RDb21wb25lbnQge1xuICByb3V0ZXJLZXkgPSBST1VURV9QQVJBTVMudXNlckNvZGU7XG5cbiAgdW5pdCQ6IE9ic2VydmFibGU8QjJCVW5pdCB8IHVuZGVmaW5lZD4gPSB0aGlzLmN1cnJlbnRVbml0U2VydmljZVxuICAgID8gdGhpcy5jdXJyZW50VW5pdFNlcnZpY2UuaXRlbSRcbiAgICA6IG9mKHsgYWN0aXZlOiB0cnVlIH0pO1xuXG4gIGlzVXBkYXRpbmdVc2VyQWxsb3dlZCA9IHRoaXMuYjJiVXNlclNlcnZpY2UuaXNVcGRhdGluZ1VzZXJBbGxvd2VkKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRVbml0U2VydmljZTogQ3VycmVudFVuaXRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBiMmJVc2VyU2VydmljZTogQjJCVXNlclNlcnZpY2VcbiAgKSB7fVxufVxuIiwiPGN4LW9yZy1zdWItbGlzdCBrZXk9XCJjdXN0b21lcklkXCIgW3JvdXRlcktleV09XCJyb3V0ZXJLZXlcIiBbc2hvd0hpbnRdPVwidHJ1ZVwiPlxuICA8YVxuICAgICpuZ0lmPVwiaXNVcGRhdGluZ1VzZXJBbGxvd2VkXCJcbiAgICBhY3Rpb25zXG4gICAgY2xhc3M9XCJsaW5rXCJcbiAgICByb3V0ZXJMaW5rPVwiY3JlYXRlXCJcbiAgICBbY2xhc3MuZGlzYWJsZWRdPVwiISh1bml0JCB8IGFzeW5jKT8uYWN0aXZlXCJcbiAgPlxuICAgIHt7ICdvcmdhbml6YXRpb24uY3JlYXRlJyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvYT5cbiAgPGN4LW9yZy1kaXNhYmxlLWluZm9cbiAgICBpbmZvXG4gICAgaTE4blJvb3Q9XCJvcmdVbml0VXNlcnNcIlxuICAgIFtkaXNwbGF5SW5mb0NvbmZpZ109XCJ7XG4gICAgICBkaXNhYmxlZENyZWF0ZTogdHJ1ZSxcbiAgICAgIGRpc2FibGVkRW5hYmxlOiBmYWxzZSxcbiAgICAgIGRpc2FibGVkRWRpdDogZmFsc2VcbiAgICB9XCJcbiAgPlxuICA8L2N4LW9yZy1kaXNhYmxlLWluZm8+XG48L2N4LW9yZy1zdWItbGlzdD5cbiJdfQ==