/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { UnitItemService } from '../../../services/unit-item.service';
import * as i0 from "@angular/core";
import * as i1 from "./current-unit-child.service";
import * as i2 from "@spartacus/core";
import * as i3 from "../../../form/unit-form.service";
import * as i4 from "@spartacus/organization/administration/core";
export class UnitChildItemService extends UnitItemService {
    constructor(currentItemService, routingService, formService, unitService) {
        super(currentItemService, routingService, formService, unitService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.unitService = unitService;
    }
    save(form, key) {
        // we enable the parentOrgUnit temporarily so that the underlying
        // save method can read the complete form.value.
        form.get('parentOrgUnit')?.enable();
        return super.save(form, key);
    }
    /**
     * @override
     * Returns 'unitDetails'
     */
    getDetailsRoute() {
        return 'orgUnitChildren';
    }
    buildRouteParams(item) {
        return { uid: item.parentOrgUnit?.uid };
    }
}
UnitChildItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildItemService, deps: [{ token: i1.CurrentUnitChildService }, { token: i2.RoutingService }, { token: i3.UnitFormService }, { token: i4.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitChildItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CurrentUnitChildService }, { type: i2.RoutingService }, { type: i3.UnitFormService }, { type: i4.OrgUnitService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1jaGlsZC1pdGVtLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvdW5pdC9saW5rcy9jaGlsZHJlbi9jcmVhdGUvdW5pdC1jaGlsZC1pdGVtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFTM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOzs7Ozs7QUFNdEUsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGVBQWU7SUFDdkQsWUFDWSxrQkFBMkMsRUFDM0MsY0FBOEIsRUFDOUIsV0FBNEIsRUFDNUIsV0FBMkI7UUFFckMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFMMUQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF5QjtRQUMzQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtJQUd2QyxDQUFDO0lBRUQsSUFBSSxDQUNGLElBQXNCLEVBQ3RCLEdBQVk7UUFFWixpRUFBaUU7UUFDakUsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDcEMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sZUFBZTtRQUN2QixPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFFUyxnQkFBZ0IsQ0FBQyxJQUFhO1FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUMxQyxDQUFDOztpSEE5QlUsb0JBQW9CO3FIQUFwQixvQkFBb0IsY0FGbkIsTUFBTTsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEIyQlVuaXQsIFJvdXRpbmdTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXMsXG4gIE9yZ1VuaXRTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVuaXRGb3JtU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2Zvcm0vdW5pdC1mb3JtLnNlcnZpY2UnO1xuaW1wb3J0IHsgVW5pdEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvdW5pdC1pdGVtLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3VycmVudFVuaXRDaGlsZFNlcnZpY2UgfSBmcm9tICcuL2N1cnJlbnQtdW5pdC1jaGlsZC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRDaGlsZEl0ZW1TZXJ2aWNlIGV4dGVuZHMgVW5pdEl0ZW1TZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRJdGVtU2VydmljZTogQ3VycmVudFVuaXRDaGlsZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZm9ybVNlcnZpY2U6IFVuaXRGb3JtU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdW5pdFNlcnZpY2U6IE9yZ1VuaXRTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGN1cnJlbnRJdGVtU2VydmljZSwgcm91dGluZ1NlcnZpY2UsIGZvcm1TZXJ2aWNlLCB1bml0U2VydmljZSk7XG4gIH1cblxuICBzYXZlKFxuICAgIGZvcm06IFVudHlwZWRGb3JtR3JvdXAsXG4gICAga2V5Pzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxCMkJVbml0Pj4ge1xuICAgIC8vIHdlIGVuYWJsZSB0aGUgcGFyZW50T3JnVW5pdCB0ZW1wb3JhcmlseSBzbyB0aGF0IHRoZSB1bmRlcmx5aW5nXG4gICAgLy8gc2F2ZSBtZXRob2QgY2FuIHJlYWQgdGhlIGNvbXBsZXRlIGZvcm0udmFsdWUuXG4gICAgZm9ybS5nZXQoJ3BhcmVudE9yZ1VuaXQnKT8uZW5hYmxlKCk7XG4gICAgcmV0dXJuIHN1cGVyLnNhdmUoZm9ybSwga2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICogUmV0dXJucyAndW5pdERldGFpbHMnXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0RGV0YWlsc1JvdXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuICdvcmdVbml0Q2hpbGRyZW4nO1xuICB9XG5cbiAgcHJvdGVjdGVkIGJ1aWxkUm91dGVQYXJhbXMoaXRlbTogQjJCVW5pdCkge1xuICAgIHJldHVybiB7IHVpZDogaXRlbS5wYXJlbnRPcmdVbml0Py51aWQgfTtcbiAgfVxufVxuIl19