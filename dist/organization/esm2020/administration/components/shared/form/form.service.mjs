/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class FormService {
    getForm(item) {
        if (this.form && !!item) {
            this.patchData(item);
            return this.form;
        }
        if (!this.form) {
            this.build(item);
        }
        // while we should be able to reset with initial value, this doesn't always work
        // hence, we're patching afterwards.
        this.form?.reset();
        this.form?.enable();
        this.patchData(item);
        return this.form;
    }
    patchData(item) {
        this.toggleFreeze(item);
        this.form?.patchValue({ ...this.defaultValue, ...item });
    }
    toggleFreeze(item) {
        if (this.form?.enabled && item?.active === false) {
            this.form.disable();
        }
        if (this.form?.disabled && item?.active === true) {
            this.form.enable();
        }
    }
    /**
     * returns the default form value.
     */
    get defaultValue() {
        return {};
    }
}
FormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9mb3JtL2Zvcm0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFnQixXQUFXO0lBUS9CLE9BQU8sQ0FBQyxJQUFRO1FBQ2QsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEI7UUFFRCxnRkFBZ0Y7UUFDaEYsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFFbkIsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRVMsU0FBUyxDQUFDLElBQVE7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVPLFlBQVksQ0FBQyxJQUFRO1FBQzNCLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLElBQUssSUFBaUIsRUFBRSxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDckI7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxJQUFLLElBQWlCLEVBQUUsTUFBTSxLQUFLLElBQUksRUFBRTtZQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUNEOztPQUVHO0lBQ0gsSUFBYyxZQUFZO1FBQ3hCLE9BQU8sRUFBTyxDQUFDO0lBQ2pCLENBQUM7O3dHQTdDbUIsV0FBVzs0R0FBWCxXQUFXOzJGQUFYLFdBQVc7a0JBRGhDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQmFzZUl0ZW0gfSBmcm9tICcuLi9vcmdhbml6YXRpb24ubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRm9ybVNlcnZpY2U8VD4ge1xuICBwcm90ZWN0ZWQgZm9ybTogVW50eXBlZEZvcm1Hcm91cCB8IG51bGw7XG5cbiAgLyoqXG4gICAqIEJ1aWxkcyB0aGUgZm9ybSBzdHJ1Y3R1cmUuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgYnVpbGQoaXRlbT86IFQpOiB2b2lkO1xuXG4gIGdldEZvcm0oaXRlbT86IFQpOiBVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuZm9ybSAmJiAhIWl0ZW0pIHtcbiAgICAgIHRoaXMucGF0Y2hEYXRhKGl0ZW0pO1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZm9ybSkge1xuICAgICAgdGhpcy5idWlsZChpdGVtKTtcbiAgICB9XG5cbiAgICAvLyB3aGlsZSB3ZSBzaG91bGQgYmUgYWJsZSB0byByZXNldCB3aXRoIGluaXRpYWwgdmFsdWUsIHRoaXMgZG9lc24ndCBhbHdheXMgd29ya1xuICAgIC8vIGhlbmNlLCB3ZSdyZSBwYXRjaGluZyBhZnRlcndhcmRzLlxuICAgIHRoaXMuZm9ybT8ucmVzZXQoKTtcblxuICAgIHRoaXMuZm9ybT8uZW5hYmxlKCk7XG4gICAgdGhpcy5wYXRjaERhdGEoaXRlbSk7XG4gICAgcmV0dXJuIHRoaXMuZm9ybTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXRjaERhdGEoaXRlbT86IFQpOiB2b2lkIHtcbiAgICB0aGlzLnRvZ2dsZUZyZWV6ZShpdGVtKTtcbiAgICB0aGlzLmZvcm0/LnBhdGNoVmFsdWUoeyAuLi50aGlzLmRlZmF1bHRWYWx1ZSwgLi4uaXRlbSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlRnJlZXplKGl0ZW0/OiBUKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZm9ybT8uZW5hYmxlZCAmJiAoaXRlbSBhcyBCYXNlSXRlbSk/LmFjdGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZm9ybS5kaXNhYmxlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmZvcm0/LmRpc2FibGVkICYmIChpdGVtIGFzIEJhc2VJdGVtKT8uYWN0aXZlID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmZvcm0uZW5hYmxlKCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiByZXR1cm5zIHRoZSBkZWZhdWx0IGZvcm0gdmFsdWUuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0IGRlZmF1bHRWYWx1ZSgpOiBUIHtcbiAgICByZXR1cm4ge30gYXMgVDtcbiAgfVxufVxuIl19