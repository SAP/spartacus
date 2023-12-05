/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadStatus, } from '@spartacus/organization/administration/core';
import { EMPTY } from 'rxjs';
import { filter, first, switchMap, take } from 'rxjs/operators';
import { CellComponent } from '../table/cell.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "../item.service";
import * as i3 from "../message/services/message.service";
import * as i4 from "../list/list.service";
import * as i5 from "@angular/common";
export class AssignCellComponent extends CellComponent {
    constructor(outlet, organizationItemService, messageService, organizationSubListService) {
        super(outlet);
        this.outlet = outlet;
        this.organizationItemService = organizationItemService;
        this.messageService = messageService;
        this.organizationSubListService = organizationSubListService;
    }
    get isAssigned() {
        return this.item?.selected;
    }
    toggleAssign() {
        const isAssigned = this.isAssigned;
        this.organizationItemService.key$
            .pipe(first(), switchMap((key) => isAssigned
            ? this.unassign?.(key, this.link)
            : this.assign(key, this.link)), take(1), filter((data) => data.status === LoadStatus.SUCCESS))
            .subscribe((data) => this.notify(data.item, isAssigned ? 'unassigned' : 'assigned'));
    }
    assign(key, linkKey) {
        return (this.organizationSubListService.assign?.(key, linkKey) ?? EMPTY);
    }
    unassign(key, linkKey) {
        return (this.organizationSubListService.unassign?.(key, linkKey) ?? EMPTY);
    }
    /**
     * Returns the key for the linked object.
     *
     * At the moment, we're using a generic approach to assign objects,
     * but the object do not have a normalized shape. Therefor, we need
     * to evaluate the context to return the right key for the associated
     * item.
     */
    get link() {
        return (this.outlet.context.code ??
            this.outlet.context.customerId ??
            this.outlet.context.uid);
    }
    notify(item, state) {
        this.messageService.add({
            message: {
                key: `${this.organizationSubListService.viewType}.${state}`,
                params: {
                    item,
                },
            },
        });
    }
}
AssignCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AssignCellComponent, deps: [{ token: i1.OutletContextData }, { token: i2.ItemService }, { token: i3.MessageService }, { token: i4.ListService }], target: i0.ɵɵFactoryTarget.Component });
AssignCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AssignCellComponent, selector: "cx-org-assign-cell", usesInheritance: true, ngImport: i0, template: `
    <button type="button" *ngIf="hasItem" (click)="toggleAssign()" class="link">
      {{ isAssigned ? 'unassign' : 'assign' }}
    </button>
  `, isInline: true, dependencies: [{ kind: "directive", type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AssignCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-org-assign-cell',
                    template: `
    <button type="button" *ngIf="hasItem" (click)="toggleAssign()" class="link">
      {{ isAssigned ? 'unassign' : 'assign' }}
    </button>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }, { type: i2.ItemService }, { type: i3.MessageService }, { type: i4.ListService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduLWNlbGwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9zdWItbGlzdC9hc3NpZ24tY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUNMLFVBQVUsR0FFWCxNQUFNLDZDQUE2QyxDQUFDO0FBS3JELE9BQU8sRUFBRSxLQUFLLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDekMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBS2hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7OztBQVl4RCxNQUFNLE9BQU8sbUJBQXdDLFNBQVEsYUFBYTtJQUN4RSxZQUNZLE1BQWlELEVBQ2pELHVCQUF1QyxFQUN2QyxjQUE4QixFQUM5QiwwQkFBMEM7UUFFcEQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBTEosV0FBTSxHQUFOLE1BQU0sQ0FBMkM7UUFDakQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUFnQjtRQUN2QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUFnQjtJQUd0RCxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBUSxJQUFJLENBQUMsSUFBWSxFQUFFLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBRUQsWUFBWTtRQUNWLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbkMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUk7YUFDOUIsSUFBSSxDQUNILEtBQUssRUFBRSxFQUNQLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ2hCLFVBQVU7WUFDUixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2hDLEVBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLE1BQU0sQ0FDSixDQUFDLElBQStCLEVBQUUsRUFBRSxDQUNsQyxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVUsQ0FBQyxPQUFPLENBQ3JDLENBQ0Y7YUFDQSxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUMvRCxDQUFDO0lBQ04sQ0FBQztJQUVTLE1BQU0sQ0FDZCxHQUFXLEVBQ1gsT0FBZTtRQUVmLE9BQU8sQ0FDSixJQUFJLENBQUMsMEJBQWdELENBQUMsTUFBTSxFQUFFLENBQzdELEdBQUcsRUFDSCxPQUFPLENBQ1IsSUFBSSxLQUFLLENBQ1gsQ0FBQztJQUNKLENBQUM7SUFFUyxRQUFRLENBQ2hCLEdBQVcsRUFDWCxPQUFlO1FBRWYsT0FBTyxDQUNKLElBQUksQ0FBQywwQkFBZ0QsQ0FBQyxRQUFRLEVBQUUsQ0FDL0QsR0FBRyxFQUNILE9BQU8sQ0FDUixJQUFJLEtBQUssQ0FDWCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFjLElBQUk7UUFDaEIsT0FBTyxDQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVTtZQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ3hCLENBQUM7SUFDSixDQUFDO0lBRVMsTUFBTSxDQUFDLElBQVMsRUFBRSxLQUFhO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO1lBQ3RCLE9BQU8sRUFBRTtnQkFDUCxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMsUUFBUSxJQUFJLEtBQUssRUFBRTtnQkFDM0QsTUFBTSxFQUFFO29CQUNOLElBQUk7aUJBQ0w7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7O2dIQXBGVSxtQkFBbUI7b0dBQW5CLG1CQUFtQixpRkFQcEI7Ozs7R0FJVDsyRkFHVSxtQkFBbUI7a0JBVC9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsUUFBUSxFQUFFOzs7O0dBSVQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgTG9hZFN0YXR1cyxcbiAgT3JnYW5pemF0aW9uSXRlbVN0YXR1cyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29yZSc7XG5pbXBvcnQge1xuICBPdXRsZXRDb250ZXh0RGF0YSxcbiAgVGFibGVEYXRhT3V0bGV0Q29udGV4dCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEVNUFRZLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGZpcnN0LCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gJy4uL2l0ZW0uc2VydmljZSc7XG5pbXBvcnQgeyBMaXN0U2VydmljZSB9IGZyb20gJy4uL2xpc3QvbGlzdC5zZXJ2aWNlJztcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vbWVzc2FnZS9zZXJ2aWNlcy9tZXNzYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmFzZUl0ZW0gfSBmcm9tICcuLi9vcmdhbml6YXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQ2VsbENvbXBvbmVudCB9IGZyb20gJy4uL3RhYmxlL2NlbGwuY29tcG9uZW50JztcbmltcG9ydCB7IFN1Ykxpc3RTZXJ2aWNlIH0gZnJvbSAnLi9zdWItbGlzdC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtb3JnLWFzc2lnbi1jZWxsJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAqbmdJZj1cImhhc0l0ZW1cIiAoY2xpY2spPVwidG9nZ2xlQXNzaWduKClcIiBjbGFzcz1cImxpbmtcIj5cbiAgICAgIHt7IGlzQXNzaWduZWQgPyAndW5hc3NpZ24nIDogJ2Fzc2lnbicgfX1cbiAgICA8L2J1dHRvbj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFzc2lnbkNlbGxDb21wb25lbnQ8VCBleHRlbmRzIEJhc2VJdGVtPiBleHRlbmRzIENlbGxDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgb3V0bGV0OiBPdXRsZXRDb250ZXh0RGF0YTxUYWJsZURhdGFPdXRsZXRDb250ZXh0PixcbiAgICBwcm90ZWN0ZWQgb3JnYW5pemF0aW9uSXRlbVNlcnZpY2U6IEl0ZW1TZXJ2aWNlPFQ+LFxuICAgIHByb3RlY3RlZCBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIG9yZ2FuaXphdGlvblN1Ykxpc3RTZXJ2aWNlOiBMaXN0U2VydmljZTxUPlxuICApIHtcbiAgICBzdXBlcihvdXRsZXQpO1xuICB9XG5cbiAgZ2V0IGlzQXNzaWduZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLml0ZW0gYXMgYW55KT8uc2VsZWN0ZWQ7XG4gIH1cblxuICB0b2dnbGVBc3NpZ24oKSB7XG4gICAgY29uc3QgaXNBc3NpZ25lZCA9IHRoaXMuaXNBc3NpZ25lZDtcbiAgICB0aGlzLm9yZ2FuaXphdGlvbkl0ZW1TZXJ2aWNlLmtleSRcbiAgICAgIC5waXBlKFxuICAgICAgICBmaXJzdCgpLFxuICAgICAgICBzd2l0Y2hNYXAoKGtleSkgPT5cbiAgICAgICAgICBpc0Fzc2lnbmVkXG4gICAgICAgICAgICA/IHRoaXMudW5hc3NpZ24/LihrZXksIHRoaXMubGluaylcbiAgICAgICAgICAgIDogdGhpcy5hc3NpZ24oa2V5LCB0aGlzLmxpbmspXG4gICAgICAgICksXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIGZpbHRlcihcbiAgICAgICAgICAoZGF0YTogT3JnYW5pemF0aW9uSXRlbVN0YXR1czxUPikgPT5cbiAgICAgICAgICAgIGRhdGEuc3RhdHVzID09PSBMb2FkU3RhdHVzLlNVQ0NFU1NcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT5cbiAgICAgICAgdGhpcy5ub3RpZnkoZGF0YS5pdGVtLCBpc0Fzc2lnbmVkID8gJ3VuYXNzaWduZWQnIDogJ2Fzc2lnbmVkJylcbiAgICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXNzaWduKFxuICAgIGtleTogc3RyaW5nLFxuICAgIGxpbmtLZXk6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8VD4+IHtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMub3JnYW5pemF0aW9uU3ViTGlzdFNlcnZpY2UgYXMgU3ViTGlzdFNlcnZpY2U8VD4pLmFzc2lnbj8uKFxuICAgICAgICBrZXksXG4gICAgICAgIGxpbmtLZXlcbiAgICAgICkgPz8gRU1QVFlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIHVuYXNzaWduKFxuICAgIGtleTogc3RyaW5nLFxuICAgIGxpbmtLZXk6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPE9yZ2FuaXphdGlvbkl0ZW1TdGF0dXM8VD4+IHtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMub3JnYW5pemF0aW9uU3ViTGlzdFNlcnZpY2UgYXMgU3ViTGlzdFNlcnZpY2U8VD4pLnVuYXNzaWduPy4oXG4gICAgICAgIGtleSxcbiAgICAgICAgbGlua0tleVxuICAgICAgKSA/PyBFTVBUWVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUga2V5IGZvciB0aGUgbGlua2VkIG9iamVjdC5cbiAgICpcbiAgICogQXQgdGhlIG1vbWVudCwgd2UncmUgdXNpbmcgYSBnZW5lcmljIGFwcHJvYWNoIHRvIGFzc2lnbiBvYmplY3RzLFxuICAgKiBidXQgdGhlIG9iamVjdCBkbyBub3QgaGF2ZSBhIG5vcm1hbGl6ZWQgc2hhcGUuIFRoZXJlZm9yLCB3ZSBuZWVkXG4gICAqIHRvIGV2YWx1YXRlIHRoZSBjb250ZXh0IHRvIHJldHVybiB0aGUgcmlnaHQga2V5IGZvciB0aGUgYXNzb2NpYXRlZFxuICAgKiBpdGVtLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldCBsaW5rKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMub3V0bGV0LmNvbnRleHQuY29kZSA/P1xuICAgICAgdGhpcy5vdXRsZXQuY29udGV4dC5jdXN0b21lcklkID8/XG4gICAgICB0aGlzLm91dGxldC5jb250ZXh0LnVpZFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbm90aWZ5KGl0ZW06IGFueSwgc3RhdGU6IHN0cmluZykge1xuICAgIHRoaXMubWVzc2FnZVNlcnZpY2UuYWRkKHtcbiAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAga2V5OiBgJHt0aGlzLm9yZ2FuaXphdGlvblN1Ykxpc3RTZXJ2aWNlLnZpZXdUeXBlfS4ke3N0YXRlfWAsXG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIGl0ZW0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG4iXX0=