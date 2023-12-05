/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { DefaultRoutePageMetaResolver, } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./current-cost-center.service";
export class CostCenterRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    constructor(translation, currentItemService) {
        super(translation);
        this.currentItemService = currentItemService;
    }
    getParams() {
        return this.currentItemService.item$;
    }
}
CostCenterRoutePageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterRoutePageMetaResolver, deps: [{ token: i1.TranslationService }, { token: i2.CurrentCostCenterService }], target: i0.ɵɵFactoryTarget.Injectable });
CostCenterRoutePageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterRoutePageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterRoutePageMetaResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }, { type: i2.CurrentCostCenterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29zdC1jZW50ZXItcm91dGUtcGFnZS1tZXRhLnJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL2Nvc3QtY2VudGVyL3NlcnZpY2VzL2Nvc3QtY2VudGVyLXJvdXRlLXBhZ2UtbWV0YS5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBRUwsNEJBQTRCLEdBRTdCLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFLekIsTUFBTSxPQUFPLCtCQUFnQyxTQUFRLDRCQUE0QjtJQUMvRSxZQUNFLFdBQStCLEVBQ3JCLGtCQUE0QztRQUV0RCxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFGVCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQTBCO0lBR3hELENBQUM7SUFFUyxTQUFTO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQztJQUN2QyxDQUFDOzs0SEFWVSwrQkFBK0I7Z0lBQS9CLCtCQUErQixjQURsQixNQUFNOzJGQUNuQiwrQkFBK0I7a0JBRDNDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29zdENlbnRlcixcbiAgRGVmYXVsdFJvdXRlUGFnZU1ldGFSZXNvbHZlcixcbiAgVHJhbnNsYXRpb25TZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ3VycmVudENvc3RDZW50ZXJTZXJ2aWNlIH0gZnJvbSAnLi9jdXJyZW50LWNvc3QtY2VudGVyLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIENvc3RDZW50ZXJSb3V0ZVBhZ2VNZXRhUmVzb2x2ZXIgZXh0ZW5kcyBEZWZhdWx0Um91dGVQYWdlTWV0YVJlc29sdmVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY3VycmVudEl0ZW1TZXJ2aWNlOiBDdXJyZW50Q29zdENlbnRlclNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIodHJhbnNsYXRpb24pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFBhcmFtcygpOiBPYnNlcnZhYmxlPENvc3RDZW50ZXIgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50SXRlbVNlcnZpY2UuaXRlbSQ7XG4gIH1cbn1cbiJdfQ==