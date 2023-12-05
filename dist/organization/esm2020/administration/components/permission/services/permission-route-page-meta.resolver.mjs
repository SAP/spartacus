/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { DefaultRoutePageMetaResolver, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./current-permission.service";
export class PermissionRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    constructor(translation, currentItemService) {
        super(translation);
        this.currentItemService = currentItemService;
    }
    getParams() {
        return this.currentItemService.item$;
    }
}
PermissionRoutePageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionRoutePageMetaResolver, deps: [{ token: i1.TranslationService }, { token: i2.CurrentPermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionRoutePageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionRoutePageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionRoutePageMetaResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }, { type: i2.CurrentPermissionService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVybWlzc2lvbi1yb3V0ZS1wYWdlLW1ldGEucmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvcGVybWlzc2lvbi9zZXJ2aWNlcy9wZXJtaXNzaW9uLXJvdXRlLXBhZ2UtbWV0YS5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQ0wsNEJBQTRCLEdBRTdCLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFNekIsTUFBTSxPQUFPLCtCQUFnQyxTQUFRLDRCQUE0QjtJQUMvRSxZQUNFLFdBQStCLEVBQ3JCLGtCQUE0QztRQUV0RCxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFGVCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQTBCO0lBR3hELENBQUM7SUFFUyxTQUFTO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQztJQUN2QyxDQUFDOzs0SEFWVSwrQkFBK0I7Z0lBQS9CLCtCQUErQixjQURsQixNQUFNOzJGQUNuQiwrQkFBK0I7a0JBRDNDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRGVmYXVsdFJvdXRlUGFnZU1ldGFSZXNvbHZlcixcbiAgVHJhbnNsYXRpb25TZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUGVybWlzc2lvbiB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ3VycmVudFBlcm1pc3Npb25TZXJ2aWNlIH0gZnJvbSAnLi9jdXJyZW50LXBlcm1pc3Npb24uc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvblJvdXRlUGFnZU1ldGFSZXNvbHZlciBleHRlbmRzIERlZmF1bHRSb3V0ZVBhZ2VNZXRhUmVzb2x2ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICB0cmFuc2xhdGlvbjogVHJhbnNsYXRpb25TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjdXJyZW50SXRlbVNlcnZpY2U6IEN1cnJlbnRQZXJtaXNzaW9uU2VydmljZVxuICApIHtcbiAgICBzdXBlcih0cmFuc2xhdGlvbik7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0UGFyYW1zKCk6IE9ic2VydmFibGU8UGVybWlzc2lvbiB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRJdGVtU2VydmljZS5pdGVtJDtcbiAgfVxufVxuIl19