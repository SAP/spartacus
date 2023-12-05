/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { FormUtils } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./current-item.service";
import * as i2 from "@spartacus/core";
import * as i3 from "./form/form.service";
/**
 * Provides CRUD operations for all organization entities.
 *
 * This base class simplifies the various entity implementation, and ensures a consistent
 * component implementation.
 */
export class ItemService {
    constructor(currentItemService, routingService, formService) {
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.key$ = this.currentItemService.key$;
        this.current$ = this.currentItemService.item$;
        this.isInEditMode$ = new BehaviorSubject(false);
        /**
         * Returns the current business unit code.
         *
         * The current unit is driven by the route parameter.
         */
        this.unit$ = this.currentItemService.b2bUnit$;
        this.error$ = this.key$.pipe(switchMap((key) => this.currentItemService.getError(key)));
    }
    save(form, key) {
        if (form.invalid) {
            form.markAllAsTouched();
            FormUtils.deepUpdateValueAndValidity(form);
            return EMPTY;
        }
        else {
            /**
             * This assignment is needed to re-use form value after `form.disable()` call
             * In some cases value was converted by `form.disable()` into empty object
             */
            const formValue = form.value;
            form.disable();
            return key ? this.update(key, formValue) : this.create(formValue);
        }
    }
    getForm(item) {
        return this.formService.getForm(item);
    }
    /**
     * Launches the detailed route for the given item item.
     */
    launchDetails(item) {
        const cxRoute = this.getDetailsRoute();
        const params = this.buildRouteParams(item);
        if (cxRoute && item && Object.keys(item).length > 0) {
            this.routingService.go({ cxRoute, params });
        }
    }
    /**
     * Returns the route parameters that are used when launching the
     * details page. The route parameters default to the actual item,
     * but can be further populated in implementations.
     *
     * Customized route parameters are useful in case the actual item
     * doesn't match the expected route parameters. You can manipulate
     * the parameter data.
     */
    buildRouteParams(item) {
        return item;
    }
    getRouterParam(key) {
        return this.currentItemService.getRouterParam(key);
    }
    /**
     * Sets to true when the user is on the entity item form page
     */
    setEditMode(isInEdit) {
        this.isInEditMode$.next(isInEdit);
    }
}
ItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemService, deps: [{ token: i1.CurrentItemService }, { token: i2.RoutingService }, { token: i3.FormService }], target: i0.ɵɵFactoryTarget.Injectable });
ItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.CurrentItemService }, { type: i2.RoutingService }, { type: i3.FormService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9pdGVtLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFJM0M7Ozs7O0dBS0c7QUFFSCxNQUFNLE9BQWdCLFdBQVc7SUFDL0IsWUFDWSxrQkFBeUMsRUFDekMsY0FBOEIsRUFDOUIsV0FBMkI7UUFGM0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF1QjtRQUN6QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBR3ZDLFNBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO1FBQ3BDLGFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDO1FBRXpDLGtCQUFhLEdBQXdCLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBRXpFOzs7O1dBSUc7UUFDSCxVQUFLLEdBQXVCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUM7UUFFN0QsV0FBTSxHQUF3QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDMUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQzFELENBQUM7SUFoQkMsQ0FBQztJQWtCSixJQUFJLENBQ0YsSUFBc0IsRUFDdEIsR0FBWTtRQUVaLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixTQUFTLENBQUMsMEJBQTBCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNO1lBQ0w7OztlQUdHO1lBQ0gsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFZixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkU7SUFDSCxDQUFDO0lBNkJELE9BQU8sQ0FBQyxJQUFRO1FBQ2QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxhQUFhLENBQUMsSUFBUTtRQUNwQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNPLGdCQUFnQixDQUFDLElBQVE7UUFDakMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsY0FBYyxDQUFDLEdBQVc7UUFDeEIsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVcsQ0FBQyxRQUFpQjtRQUMxQixJQUFJLENBQUMsYUFBMEMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7d0dBM0dtQixXQUFXOzRHQUFYLFdBQVc7MkZBQVgsV0FBVztrQkFEaEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPcmdhbml6YXRpb25JdGVtU3RhdHVzIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQgeyBGb3JtVXRpbHMgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ3VycmVudEl0ZW1TZXJ2aWNlIH0gZnJvbSAnLi9jdXJyZW50LWl0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBGb3JtU2VydmljZSB9IGZyb20gJy4vZm9ybS9mb3JtLnNlcnZpY2UnO1xuXG4vKipcbiAqIFByb3ZpZGVzIENSVUQgb3BlcmF0aW9ucyBmb3IgYWxsIG9yZ2FuaXphdGlvbiBlbnRpdGllcy5cbiAqXG4gKiBUaGlzIGJhc2UgY2xhc3Mgc2ltcGxpZmllcyB0aGUgdmFyaW91cyBlbnRpdHkgaW1wbGVtZW50YXRpb24sIGFuZCBlbnN1cmVzIGEgY29uc2lzdGVudFxuICogY29tcG9uZW50IGltcGxlbWVudGF0aW9uLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSXRlbVNlcnZpY2U8VD4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY3VycmVudEl0ZW1TZXJ2aWNlOiBDdXJyZW50SXRlbVNlcnZpY2U8VD4sXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZm9ybVNlcnZpY2U6IEZvcm1TZXJ2aWNlPFQ+XG4gICkge31cblxuICBrZXkkID0gdGhpcy5jdXJyZW50SXRlbVNlcnZpY2Uua2V5JDtcbiAgY3VycmVudCQgPSB0aGlzLmN1cnJlbnRJdGVtU2VydmljZS5pdGVtJDtcblxuICBpc0luRWRpdE1vZGUkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgYnVzaW5lc3MgdW5pdCBjb2RlLlxuICAgKlxuICAgKiBUaGUgY3VycmVudCB1bml0IGlzIGRyaXZlbiBieSB0aGUgcm91dGUgcGFyYW1ldGVyLlxuICAgKi9cbiAgdW5pdCQ6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuY3VycmVudEl0ZW1TZXJ2aWNlLmIyYlVuaXQkO1xuXG4gIGVycm9yJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXMua2V5JC5waXBlKFxuICAgIHN3aXRjaE1hcCgoa2V5KSA9PiB0aGlzLmN1cnJlbnRJdGVtU2VydmljZS5nZXRFcnJvcihrZXkpKVxuICApO1xuXG4gIHNhdmUoXG4gICAgZm9ybTogVW50eXBlZEZvcm1Hcm91cCxcbiAgICBrZXk/OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxPcmdhbml6YXRpb25JdGVtU3RhdHVzPFQ+PiB7XG4gICAgaWYgKGZvcm0uaW52YWxpZCkge1xuICAgICAgZm9ybS5tYXJrQWxsQXNUb3VjaGVkKCk7XG4gICAgICBGb3JtVXRpbHMuZGVlcFVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoZm9ybSk7XG4gICAgICByZXR1cm4gRU1QVFk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qKlxuICAgICAgICogVGhpcyBhc3NpZ25tZW50IGlzIG5lZWRlZCB0byByZS11c2UgZm9ybSB2YWx1ZSBhZnRlciBgZm9ybS5kaXNhYmxlKClgIGNhbGxcbiAgICAgICAqIEluIHNvbWUgY2FzZXMgdmFsdWUgd2FzIGNvbnZlcnRlZCBieSBgZm9ybS5kaXNhYmxlKClgIGludG8gZW1wdHkgb2JqZWN0XG4gICAgICAgKi9cbiAgICAgIGNvbnN0IGZvcm1WYWx1ZSA9IGZvcm0udmFsdWU7XG4gICAgICBmb3JtLmRpc2FibGUoKTtcblxuICAgICAgcmV0dXJuIGtleSA/IHRoaXMudXBkYXRlKGtleSwgZm9ybVZhbHVlKSA6IHRoaXMuY3JlYXRlKGZvcm1WYWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYW4gaXRlbS5cbiAgICovXG4gIGRlbGV0ZT8oXG4gICAga2V5OiBzdHJpbmcsXG4gICAgYWRkaXRpb25hbFBhcmFtPzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxUPj47XG4gIC8qKlxuICAgKiBMb2FkcyBhbiBpdGVtLlxuICAgKi9cbiAgYWJzdHJhY3QgbG9hZCguLi5wYXJhbXM6IGFueVtdKTogT2JzZXJ2YWJsZTxUPjtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpdGVtLlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNyZWF0ZSh2YWx1ZTogVCk6IE9ic2VydmFibGU8T3JnYW5pemF0aW9uSXRlbVN0YXR1czxUPj47XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYW4gZXhpc3RpbmcgaXRlbS5cbiAgICovXG4gIGFic3RyYWN0IHVwZGF0ZShrZXk6IHN0cmluZywgdmFsdWU6IFQpOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8VD4+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBkZXRhaWxlZCBjeFJvdXRlIGZvciB0aGUgb3JnYW5pemF0aW9uIGl0ZW0uXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0RGV0YWlsc1JvdXRlKCk6IHN0cmluZztcblxuICBnZXRGb3JtKGl0ZW0/OiBUKTogVW50eXBlZEZvcm1Hcm91cCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLmZvcm1TZXJ2aWNlLmdldEZvcm0oaXRlbSk7XG4gIH1cblxuICAvKipcbiAgICogTGF1bmNoZXMgdGhlIGRldGFpbGVkIHJvdXRlIGZvciB0aGUgZ2l2ZW4gaXRlbSBpdGVtLlxuICAgKi9cbiAgbGF1bmNoRGV0YWlscyhpdGVtPzogVCk6IHZvaWQge1xuICAgIGNvbnN0IGN4Um91dGUgPSB0aGlzLmdldERldGFpbHNSb3V0ZSgpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuYnVpbGRSb3V0ZVBhcmFtcyhpdGVtKTtcbiAgICBpZiAoY3hSb3V0ZSAmJiBpdGVtICYmIE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuZ28oeyBjeFJvdXRlLCBwYXJhbXMgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHJvdXRlIHBhcmFtZXRlcnMgdGhhdCBhcmUgdXNlZCB3aGVuIGxhdW5jaGluZyB0aGVcbiAgICogZGV0YWlscyBwYWdlLiBUaGUgcm91dGUgcGFyYW1ldGVycyBkZWZhdWx0IHRvIHRoZSBhY3R1YWwgaXRlbSxcbiAgICogYnV0IGNhbiBiZSBmdXJ0aGVyIHBvcHVsYXRlZCBpbiBpbXBsZW1lbnRhdGlvbnMuXG4gICAqXG4gICAqIEN1c3RvbWl6ZWQgcm91dGUgcGFyYW1ldGVycyBhcmUgdXNlZnVsIGluIGNhc2UgdGhlIGFjdHVhbCBpdGVtXG4gICAqIGRvZXNuJ3QgbWF0Y2ggdGhlIGV4cGVjdGVkIHJvdXRlIHBhcmFtZXRlcnMuIFlvdSBjYW4gbWFuaXB1bGF0ZVxuICAgKiB0aGUgcGFyYW1ldGVyIGRhdGEuXG4gICAqL1xuICBwcm90ZWN0ZWQgYnVpbGRSb3V0ZVBhcmFtcyhpdGVtPzogVCk6IGFueSB7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cblxuICBnZXRSb3V0ZXJQYXJhbShrZXk6IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEl0ZW1TZXJ2aWNlLmdldFJvdXRlclBhcmFtKGtleSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0byB0cnVlIHdoZW4gdGhlIHVzZXIgaXMgb24gdGhlIGVudGl0eSBpdGVtIGZvcm0gcGFnZVxuICAgKi9cbiAgc2V0RWRpdE1vZGUoaXNJbkVkaXQ6IGJvb2xlYW4pIHtcbiAgICAodGhpcy5pc0luRWRpdE1vZGUkIGFzIEJlaGF2aW9yU3ViamVjdDxib29sZWFuPikubmV4dChpc0luRWRpdCk7XG4gIH1cbn1cbiJdfQ==