/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { DefaultRoutePageMetaResolver, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./current-user-group.service";
export class UserGroupRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    constructor(translation, currentItemService) {
        super(translation);
        this.currentItemService = currentItemService;
    }
    getParams() {
        return this.currentItemService.item$;
    }
}
UserGroupRoutePageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupRoutePageMetaResolver, deps: [{ token: i1.TranslationService }, { token: i2.CurrentUserGroupService }], target: i0.ɵɵFactoryTarget.Injectable });
UserGroupRoutePageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupRoutePageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupRoutePageMetaResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }, { type: i2.CurrentUserGroupService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1ncm91cC1yb3V0ZS1wYWdlLW1ldGEucmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdXNlci1ncm91cC9zZXJ2aWNlcy91c2VyLWdyb3VwLXJvdXRlLXBhZ2UtbWV0YS5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsNEJBQTRCLEdBRTdCLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFNekIsTUFBTSxPQUFPLDhCQUErQixTQUFRLDRCQUE0QjtJQUM5RSxZQUNFLFdBQStCLEVBQ3JCLGtCQUEyQztRQUVyRCxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFGVCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXlCO0lBR3ZELENBQUM7SUFFUyxTQUFTO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQztJQUN2QyxDQUFDOzsySEFWVSw4QkFBOEI7K0hBQTlCLDhCQUE4QixjQURqQixNQUFNOzJGQUNuQiw4QkFBOEI7a0JBRDFDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRGVmYXVsdFJvdXRlUGFnZU1ldGFSZXNvbHZlcixcbiAgVHJhbnNsYXRpb25TZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgVXNlckdyb3VwIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDdXJyZW50VXNlckdyb3VwU2VydmljZSB9IGZyb20gJy4vY3VycmVudC11c2VyLWdyb3VwLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFVzZXJHcm91cFJvdXRlUGFnZU1ldGFSZXNvbHZlciBleHRlbmRzIERlZmF1bHRSb3V0ZVBhZ2VNZXRhUmVzb2x2ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICB0cmFuc2xhdGlvbjogVHJhbnNsYXRpb25TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjdXJyZW50SXRlbVNlcnZpY2U6IEN1cnJlbnRVc2VyR3JvdXBTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKHRyYW5zbGF0aW9uKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRQYXJhbXMoKTogT2JzZXJ2YWJsZTxVc2VyR3JvdXAgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50SXRlbVNlcnZpY2UuaXRlbSQ7XG4gIH1cbn1cbiJdfQ==