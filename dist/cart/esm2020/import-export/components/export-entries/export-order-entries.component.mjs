/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ORDER_ENTRIES_CONTEXT, } from '@spartacus/cart/base/root';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./export-order-entries-to-csv.service";
import * as i2 from "@spartacus/storefront";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/core";
export class ExportOrderEntriesComponent {
    constructor(exportEntriesService, contextService) {
        this.exportEntriesService = exportEntriesService;
        this.contextService = contextService;
        this.styles = 'container';
        this.orderEntriesContext$ = this.contextService.get(ORDER_ENTRIES_CONTEXT);
        this.entries$ = this.orderEntriesContext$.pipe(switchMap((orderEntriesContext) => orderEntriesContext?.getEntries?.() ?? of(undefined)));
    }
    exportCsv(entries) {
        this.exportEntriesService.downloadCsv(entries);
    }
}
ExportOrderEntriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExportOrderEntriesComponent, deps: [{ token: i1.ExportOrderEntriesToCsvService }, { token: i2.ContextService }], target: i0.ɵɵFactoryTarget.Component });
ExportOrderEntriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ExportOrderEntriesComponent, selector: "cx-export-order-entries", host: { properties: { "class": "this.styles" } }, ngImport: i0, template: "<button\n  *ngIf=\"(entries$ | async)?.length > 0 && (entries$ | async) as entries\"\n  class=\"btn btn-tertiary cx-export-btn\"\n  (click)=\"exportCsv(entries)\"\n>\n  {{ 'exportEntries.exportProductToCsv' | cxTranslate }}\n</button>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ExportOrderEntriesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-export-order-entries', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  *ngIf=\"(entries$ | async)?.length > 0 && (entries$ | async) as entries\"\n  class=\"btn btn-tertiary cx-export-btn\"\n  (click)=\"exportCsv(entries)\"\n>\n  {{ 'exportEntries.exportProductToCsv' | cxTranslate }}\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ExportOrderEntriesToCsvService }, { type: i2.ContextService }]; }, propDecorators: { styles: [{
                type: HostBinding,
                args: ['class']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwb3J0LW9yZGVyLWVudHJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvaW1wb3J0LWV4cG9ydC9jb21wb25lbnRzL2V4cG9ydC1lbnRyaWVzL2V4cG9ydC1vcmRlci1lbnRyaWVzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2ltcG9ydC1leHBvcnQvY29tcG9uZW50cy9leHBvcnQtZW50cmllcy9leHBvcnQtb3JkZXItZW50cmllcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUdMLHFCQUFxQixHQUN0QixNQUFNLDJCQUEyQixDQUFDO0FBRW5DLE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFRM0MsTUFBTSxPQUFPLDJCQUEyQjtJQUd0QyxZQUNZLG9CQUFvRCxFQUNwRCxjQUE4QjtRQUQ5Qix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQWdDO1FBQ3BELG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUpwQixXQUFNLEdBQUcsV0FBVyxDQUFDO1FBT2pDLHlCQUFvQixHQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBc0IscUJBQXFCLENBQUMsQ0FBQztRQUV0RSxhQUFRLEdBQ04sSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FDNUIsU0FBUyxDQUNQLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUN0QixtQkFBbUIsRUFBRSxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FDdkQsQ0FDRixDQUFDO0lBWEQsQ0FBQztJQWFKLFNBQVMsQ0FBQyxPQUFxQjtRQUM3QixJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7O3dIQXJCVSwyQkFBMkI7NEdBQTNCLDJCQUEyQixpSEN0QnhDLDhPQU9BOzJGRGVhLDJCQUEyQjtrQkFMdkMsU0FBUzsrQkFDRSx5QkFBeUIsbUJBRWxCLHVCQUF1QixDQUFDLE1BQU07a0pBR3pCLE1BQU07c0JBQTNCLFdBQVc7dUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBPcmRlckVudHJpZXNDb250ZXh0LFxuICBPcmRlckVudHJ5LFxuICBPUkRFUl9FTlRSSUVTX0NPTlRFWFQsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgQ29udGV4dFNlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEV4cG9ydE9yZGVyRW50cmllc1RvQ3N2U2VydmljZSB9IGZyb20gJy4vZXhwb3J0LW9yZGVyLWVudHJpZXMtdG8tY3N2LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1leHBvcnQtb3JkZXItZW50cmllcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9leHBvcnQtb3JkZXItZW50cmllcy5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBFeHBvcnRPcmRlckVudHJpZXNDb21wb25lbnQge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgc3R5bGVzID0gJ2NvbnRhaW5lcic7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGV4cG9ydEVudHJpZXNTZXJ2aWNlOiBFeHBvcnRPcmRlckVudHJpZXNUb0NzdlNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnRleHRTZXJ2aWNlOiBDb250ZXh0U2VydmljZVxuICApIHt9XG5cbiAgcHJvdGVjdGVkIG9yZGVyRW50cmllc0NvbnRleHQkOiBPYnNlcnZhYmxlPE9yZGVyRW50cmllc0NvbnRleHQgfCB1bmRlZmluZWQ+ID1cbiAgICB0aGlzLmNvbnRleHRTZXJ2aWNlLmdldDxPcmRlckVudHJpZXNDb250ZXh0PihPUkRFUl9FTlRSSUVTX0NPTlRFWFQpO1xuXG4gIGVudHJpZXMkOiBPYnNlcnZhYmxlPE9yZGVyRW50cnlbXSB8IHVuZGVmaW5lZD4gPVxuICAgIHRoaXMub3JkZXJFbnRyaWVzQ29udGV4dCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChcbiAgICAgICAgKG9yZGVyRW50cmllc0NvbnRleHQpID0+XG4gICAgICAgICAgb3JkZXJFbnRyaWVzQ29udGV4dD8uZ2V0RW50cmllcz8uKCkgPz8gb2YodW5kZWZpbmVkKVxuICAgICAgKVxuICAgICk7XG5cbiAgZXhwb3J0Q3N2KGVudHJpZXM6IE9yZGVyRW50cnlbXSk6IHZvaWQge1xuICAgIHRoaXMuZXhwb3J0RW50cmllc1NlcnZpY2UuZG93bmxvYWRDc3YoZW50cmllcyk7XG4gIH1cbn1cbiIsIjxidXR0b25cbiAgKm5nSWY9XCIoZW50cmllcyQgfCBhc3luYyk/Lmxlbmd0aCA+IDAgJiYgKGVudHJpZXMkIHwgYXN5bmMpIGFzIGVudHJpZXNcIlxuICBjbGFzcz1cImJ0biBidG4tdGVydGlhcnkgY3gtZXhwb3J0LWJ0blwiXG4gIChjbGljayk9XCJleHBvcnRDc3YoZW50cmllcylcIlxuPlxuICB7eyAnZXhwb3J0RW50cmllcy5leHBvcnRQcm9kdWN0VG9Dc3YnIHwgY3hUcmFuc2xhdGUgfX1cbjwvYnV0dG9uPlxuIl19