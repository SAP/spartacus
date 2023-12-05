/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, ViewChild, } from '@angular/core';
import { ORDER_ENTRIES_CONTEXT, } from '@spartacus/cart/base/root';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/core";
export class ImportOrderEntriesComponent {
    constructor(launchDialogService, contextService) {
        this.launchDialogService = launchDialogService;
        this.contextService = contextService;
        this.subscription = new Subscription();
        this.orderEntriesContext$ = this.contextService.get(ORDER_ENTRIES_CONTEXT);
    }
    openDialog(orderEntriesContext) {
        this.launchDialogService.openDialogAndSubscribe("IMPORT_TO_CART" /* LAUNCH_CALLER.IMPORT_TO_CART */, this.element, { orderEntriesContext });
    }
}
ImportOrderEntriesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportOrderEntriesComponent, deps: [{ token: i1.LaunchDialogService }, { token: i1.ContextService }], target: i0.ɵɵFactoryTarget.Component });
ImportOrderEntriesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ImportOrderEntriesComponent, selector: "cx-import-order-entries", viewQueries: [{ propertyName: "element", first: true, predicate: ["open"], descendants: true }], ngImport: i0, template: "<button\n  *ngIf=\"orderEntriesContext$ | async as orderEntriesContext\"\n  class=\"btn btn-tertiary cx-import-btn\"\n  (click)=\"openDialog(orderEntriesContext)\"\n>\n  {{ 'importEntries.importProducts' | cxTranslate }}\n</button>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ImportOrderEntriesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-import-order-entries', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  *ngIf=\"orderEntriesContext$ | async as orderEntriesContext\"\n  class=\"btn btn-tertiary cx-import-btn\"\n  (click)=\"openDialog(orderEntriesContext)\"\n>\n  {{ 'importEntries.importProducts' | cxTranslate }}\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i1.ContextService }]; }, propDecorators: { element: [{
                type: ViewChild,
                args: ['open']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1wb3J0LW9yZGVyLWVudHJpZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvaW1wb3J0LWV4cG9ydC9jb21wb25lbnRzL2ltcG9ydC10by1jYXJ0L2ltcG9ydC1lbnRyaWVzL2ltcG9ydC1vcmRlci1lbnRyaWVzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2ltcG9ydC1leHBvcnQvY29tcG9uZW50cy9pbXBvcnQtdG8tY2FydC9pbXBvcnQtZW50cmllcy9pbXBvcnQtb3JkZXItZW50cmllcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFFTCxxQkFBcUIsR0FDdEIsTUFBTSwyQkFBMkIsQ0FBQztBQU1uQyxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQU9oRCxNQUFNLE9BQU8sMkJBQTJCO0lBSXRDLFlBQ1ksbUJBQXdDLEVBQ3hDLGNBQThCO1FBRDlCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBTGhDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQVE1Qyx5QkFBb0IsR0FDbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQXNCLHFCQUFxQixDQUFDLENBQUM7SUFIbkUsQ0FBQztJQUtKLFVBQVUsQ0FBQyxtQkFBd0M7UUFDakQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHNCQUFzQixzREFFN0MsSUFBSSxDQUFDLE9BQU8sRUFDWixFQUFFLG1CQUFtQixFQUFFLENBQ3hCLENBQUM7SUFDSixDQUFDOzt3SEFsQlUsMkJBQTJCOzRHQUEzQiwyQkFBMkIsZ0tDNUJ4QywyT0FPQTsyRkRxQmEsMkJBQTJCO2tCQUx2QyxTQUFTOytCQUNFLHlCQUF5QixtQkFFbEIsdUJBQXVCLENBQUMsTUFBTTt1SUFJNUIsT0FBTztzQkFBekIsU0FBUzt1QkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIE9yZGVyRW50cmllc0NvbnRleHQsXG4gIE9SREVSX0VOVFJJRVNfQ09OVEVYVCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBDb250ZXh0U2VydmljZSxcbiAgTGF1bmNoRGlhbG9nU2VydmljZSxcbiAgTEFVTkNIX0NBTExFUixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1pbXBvcnQtb3JkZXItZW50cmllcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9pbXBvcnQtb3JkZXItZW50cmllcy5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBJbXBvcnRPcmRlckVudHJpZXNDb21wb25lbnQge1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBAVmlld0NoaWxkKCdvcGVuJykgZWxlbWVudDogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbGF1bmNoRGlhbG9nU2VydmljZTogTGF1bmNoRGlhbG9nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udGV4dFNlcnZpY2U6IENvbnRleHRTZXJ2aWNlXG4gICkge31cblxuICBvcmRlckVudHJpZXNDb250ZXh0JDogT2JzZXJ2YWJsZTxPcmRlckVudHJpZXNDb250ZXh0IHwgdW5kZWZpbmVkPiA9XG4gICAgdGhpcy5jb250ZXh0U2VydmljZS5nZXQ8T3JkZXJFbnRyaWVzQ29udGV4dD4oT1JERVJfRU5UUklFU19DT05URVhUKTtcblxuICBvcGVuRGlhbG9nKG9yZGVyRW50cmllc0NvbnRleHQ6IE9yZGVyRW50cmllc0NvbnRleHQpOiB2b2lkIHtcbiAgICB0aGlzLmxhdW5jaERpYWxvZ1NlcnZpY2Uub3BlbkRpYWxvZ0FuZFN1YnNjcmliZShcbiAgICAgIExBVU5DSF9DQUxMRVIuSU1QT1JUX1RPX0NBUlQsXG4gICAgICB0aGlzLmVsZW1lbnQsXG4gICAgICB7IG9yZGVyRW50cmllc0NvbnRleHQgfVxuICAgICk7XG4gIH1cbn1cbiIsIjxidXR0b25cbiAgKm5nSWY9XCJvcmRlckVudHJpZXNDb250ZXh0JCB8IGFzeW5jIGFzIG9yZGVyRW50cmllc0NvbnRleHRcIlxuICBjbGFzcz1cImJ0biBidG4tdGVydGlhcnkgY3gtaW1wb3J0LWJ0blwiXG4gIChjbGljayk9XCJvcGVuRGlhbG9nKG9yZGVyRW50cmllc0NvbnRleHQpXCJcbj5cbiAge3sgJ2ltcG9ydEVudHJpZXMuaW1wb3J0UHJvZHVjdHMnIHwgY3hUcmFuc2xhdGUgfX1cbjwvYnV0dG9uPlxuIl19