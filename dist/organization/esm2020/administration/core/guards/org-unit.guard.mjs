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
export class OrgUnitGuard {
    constructor(globalMessageService, orgUnitService, semanticPathService, router) {
        this.globalMessageService = globalMessageService;
        this.orgUnitService = orgUnitService;
        this.semanticPathService = semanticPathService;
        this.router = router;
    }
    canActivate() {
        const isUpdatingUnitAllowed = this.orgUnitService.isUpdatingUnitAllowed();
        if (!isUpdatingUnitAllowed) {
            this.globalMessageService.add({ key: 'organization.notification.notExist' }, GlobalMessageType.MSG_TYPE_WARNING);
            return this.router.parseUrl(this.semanticPathService.get('organization') ?? '');
        }
        return isUpdatingUnitAllowed;
    }
}
OrgUnitGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrgUnitGuard, deps: [{ token: i1.GlobalMessageService }, { token: i2.OrgUnitService }, { token: i1.SemanticPathService }, { token: i3.Router }], target: i0.ɵɵFactoryTarget.Injectable });
OrgUnitGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrgUnitGuard });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrgUnitGuard, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.GlobalMessageService }, { type: i2.OrgUnitService }, { type: i1.SemanticPathService }, { type: i3.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JnLXVuaXQuZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUvZ3VhcmRzL29yZy11bml0Lmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFFTCxpQkFBaUIsR0FFbEIsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFJekIsTUFBTSxPQUFPLFlBQVk7SUFDdkIsWUFDWSxvQkFBMEMsRUFDMUMsY0FBOEIsRUFDOUIsbUJBQXdDLEVBQ3hDLE1BQWM7UUFIZCx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDdkIsQ0FBQztJQUVKLFdBQVc7UUFDVCxNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMxRSxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0IsRUFBRSxHQUFHLEVBQUUsb0NBQW9DLEVBQUUsRUFDN0MsaUJBQWlCLENBQUMsZ0JBQWdCLENBQ25DLENBQUM7WUFDRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUN6QixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FDbkQsQ0FBQztTQUNIO1FBQ0QsT0FBTyxxQkFBcUIsQ0FBQztJQUMvQixDQUFDOzt5R0FwQlUsWUFBWTs2R0FBWixZQUFZOzJGQUFaLFlBQVk7a0JBRHhCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIFVybFRyZWUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBTZW1hbnRpY1BhdGhTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT3JnVW5pdFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcmdVbml0R3VhcmQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvcmdVbml0U2VydmljZTogT3JnVW5pdFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHNlbWFudGljUGF0aFNlcnZpY2U6IFNlbWFudGljUGF0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyXG4gICkge31cblxuICBjYW5BY3RpdmF0ZSgpOiBib29sZWFuIHwgVXJsVHJlZSB7XG4gICAgY29uc3QgaXNVcGRhdGluZ1VuaXRBbGxvd2VkID0gdGhpcy5vcmdVbml0U2VydmljZS5pc1VwZGF0aW5nVW5pdEFsbG93ZWQoKTtcbiAgICBpZiAoIWlzVXBkYXRpbmdVbml0QWxsb3dlZCkge1xuICAgICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICAgIHsga2V5OiAnb3JnYW5pemF0aW9uLm5vdGlmaWNhdGlvbi5ub3RFeGlzdCcgfSxcbiAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfV0FSTklOR1xuICAgICAgKTtcbiAgICAgIHJldHVybiB0aGlzLnJvdXRlci5wYXJzZVVybChcbiAgICAgICAgdGhpcy5zZW1hbnRpY1BhdGhTZXJ2aWNlLmdldCgnb3JnYW5pemF0aW9uJykgPz8gJydcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBpc1VwZGF0aW5nVW5pdEFsbG93ZWQ7XG4gIH1cbn1cbiJdfQ==