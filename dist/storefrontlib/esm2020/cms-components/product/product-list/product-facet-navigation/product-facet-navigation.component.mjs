/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, ViewChild, } from '@angular/core';
import { asapScheduler, BehaviorSubject, interval, of } from 'rxjs';
import { delayWhen, observeOn, switchMap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import * as i0 from "@angular/core";
import * as i1 from "../../../../layout/breakpoint/breakpoint.service";
import * as i2 from "@angular/common";
import * as i3 from "./facet-list/facet-list.component";
import * as i4 from "./active-facets/active-facets.component";
import * as i5 from "../../../misc/icon/icon.component";
import * as i6 from "@spartacus/core";
export class ProductFacetNavigationComponent {
    constructor(breakpointService) {
        this.breakpointService = breakpointService;
        this.iconTypes = ICON_TYPE;
        /**
         * We delay the removal of DOM so that animations can finish playing before the
         * DOM is removed. Removing the DOM, as hidding is not enough to stop elements
         * to be focused.
         */
        this.CLOSE_DELAY = 300;
        this.open$ = new BehaviorSubject(false);
        /**
         * Emits the open state that indicates whether the facet list should be rendered.
         * This is either done instantly, or after the user triggers this by using the trigger
         * button. This driven by the visiibility of the trigger, so that the CSS drives
         * the behaviour. This can differ per breakpoint.
         *
         * There's a configurable delay for the closed state, so that the DOM is not removed
         * before some CSS animations are done.
         */
        this.isOpen$ = this.breakpointService.breakpoint$.pipe(
        // deffer emitting a new value to the next micro-task to ensure that the `hasTrigger`
        // method represents the actual UI state.
        observeOn(asapScheduler), switchMap(() => (this.hasTrigger ? this.open$ : of(true))), delayWhen((launched) => interval(launched ? 0 : this.CLOSE_DELAY)));
        /**
         * Emits the active state that indicates whether the facet list is activated. Activation
         * is related to the css, so that a animation or transition can visualize opening/closing
         * the list (i.e. dialog).
         */
        this.isActive$ = this.open$.pipe(
        // deffer emitting a new value to the next micro-task to ensure the active class is
        //  applied after the DOM is created
        observeOn(asapScheduler));
    }
    launch() {
        this.open$.next(true);
    }
    close() {
        this.open$.next(false);
        this.trigger.nativeElement.focus();
    }
    /**
     * Indicates that the facet navigation should be open explicitely by a trigger.
     * This is fully controlled by CSS, where the trigger button can be hidden
     * (display:none) for certain screen sizes.
     */
    get hasTrigger() {
        return this.trigger.nativeElement.offsetParent !== null;
    }
}
ProductFacetNavigationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductFacetNavigationComponent, deps: [{ token: i1.BreakpointService }], target: i0.ɵɵFactoryTarget.Component });
ProductFacetNavigationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductFacetNavigationComponent, selector: "cx-product-facet-navigation", viewQueries: [{ propertyName: "trigger", first: true, predicate: ["trigger"], descendants: true }], ngImport: i0, template: "<button\n  #trigger\n  class=\"btn btn-secondary btn-block dialog-trigger\"\n  (click)=\"launch()\"\n>\n  <cx-icon [type]=\"iconTypes.FILTER\"></cx-icon>\n  {{ 'productList.filterBy.label' | cxTranslate }}\n</button>\n\n<cx-active-facets></cx-active-facets>\n\n<cx-facet-list\n  *ngIf=\"isOpen$ | async\"\n  [isDialog]=\"hasTrigger\"\n  (closeList)=\"close()\"\n  [class.active]=\"isActive$ | async\"\n  [class.dialog]=\"hasTrigger\"\n></cx-facet-list>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.FacetListComponent, selector: "cx-facet-list", inputs: ["isDialog"], outputs: ["closeList"] }, { kind: "component", type: i4.ActiveFacetsComponent, selector: "cx-active-facets", inputs: ["closeIcon"] }, { kind: "component", type: i5.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i6.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductFacetNavigationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-facet-navigation', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  #trigger\n  class=\"btn btn-secondary btn-block dialog-trigger\"\n  (click)=\"launch()\"\n>\n  <cx-icon [type]=\"iconTypes.FILTER\"></cx-icon>\n  {{ 'productList.filterBy.label' | cxTranslate }}\n</button>\n\n<cx-active-facets></cx-active-facets>\n\n<cx-facet-list\n  *ngIf=\"isOpen$ | async\"\n  [isDialog]=\"hasTrigger\"\n  (closeList)=\"close()\"\n  [class.active]=\"isActive$ | async\"\n  [class.dialog]=\"hasTrigger\"\n></cx-facet-list>\n" }]
        }], ctorParameters: function () { return [{ type: i1.BreakpointService }]; }, propDecorators: { trigger: [{
                type: ViewChild,
                args: ['trigger']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1mYWNldC1uYXZpZ2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvcHJvZHVjdC9wcm9kdWN0LWxpc3QvcHJvZHVjdC1mYWNldC1uYXZpZ2F0aW9uL3Byb2R1Y3QtZmFjZXQtbmF2aWdhdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL3Byb2R1Y3QvcHJvZHVjdC1saXN0L3Byb2R1Y3QtZmFjZXQtbmF2aWdhdGlvbi9wcm9kdWN0LWZhY2V0LW5hdmlnYXRpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7Ozs7Ozs7QUFRNUUsTUFBTSxPQUFPLCtCQUErQjtJQWdEMUMsWUFBc0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUEvQzFELGNBQVMsR0FBRyxTQUFTLENBQUM7UUFFdEI7Ozs7V0FJRztRQUNPLGdCQUFXLEdBQUcsR0FBRyxDQUFDO1FBVWxCLFVBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3Qzs7Ozs7Ozs7V0FRRztRQUNILFlBQU8sR0FBd0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJO1FBQ3BFLHFGQUFxRjtRQUNyRix5Q0FBeUM7UUFDekMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUN4QixTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUMxRCxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQ25FLENBQUM7UUFFRjs7OztXQUlHO1FBQ0gsY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtRQUN6QixtRkFBbUY7UUFDbkYsb0NBQW9DO1FBQ3BDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FDekIsQ0FBQztJQUUyRCxDQUFDO0lBRTlELE1BQU07UUFDSixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDO0lBQzFELENBQUM7OzRIQWxFVSwrQkFBK0I7Z0hBQS9CLCtCQUErQix1S0N0QjVDLHdjQWtCQTsyRkRJYSwrQkFBK0I7a0JBTDNDLFNBQVM7K0JBQ0UsNkJBQTZCLG1CQUV0Qix1QkFBdUIsQ0FBQyxNQUFNO3dHQWtCekIsT0FBTztzQkFBNUIsU0FBUzt1QkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGFzYXBTY2hlZHVsZXIsIEJlaGF2aW9yU3ViamVjdCwgaW50ZXJ2YWwsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheVdoZW4sIG9ic2VydmVPbiwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSUNPTl9UWVBFIH0gZnJvbSAnLi4vLi4vLi4vLi4vY21zLWNvbXBvbmVudHMvbWlzYy9pY29uL2ljb24ubW9kZWwnO1xuaW1wb3J0IHsgQnJlYWtwb2ludFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9sYXlvdXQvYnJlYWtwb2ludC9icmVha3BvaW50LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1wcm9kdWN0LWZhY2V0LW5hdmlnYXRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvZHVjdC1mYWNldC1uYXZpZ2F0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RGYWNldE5hdmlnYXRpb25Db21wb25lbnQge1xuICBpY29uVHlwZXMgPSBJQ09OX1RZUEU7XG5cbiAgLyoqXG4gICAqIFdlIGRlbGF5IHRoZSByZW1vdmFsIG9mIERPTSBzbyB0aGF0IGFuaW1hdGlvbnMgY2FuIGZpbmlzaCBwbGF5aW5nIGJlZm9yZSB0aGVcbiAgICogRE9NIGlzIHJlbW92ZWQuIFJlbW92aW5nIHRoZSBET00sIGFzIGhpZGRpbmcgaXMgbm90IGVub3VnaCB0byBzdG9wIGVsZW1lbnRzXG4gICAqIHRvIGJlIGZvY3VzZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgQ0xPU0VfREVMQVkgPSAzMDA7XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gb3BlbiB0aGUgZmFjZXQgbmF2aWdhdGlvbiBpbiBhIGRpYWxvZy4gVGhlIHVzYWdlIG9mIHRoZSBkaWFsb2cgZGVwZW5kc1xuICAgKiBvbiB0aGUgYXZhaWxhYmlsaXR5IG9mIHRoZSB0cmlnZ2VyIGVsZW1lbnQsIHdoaWNoIGlzIGRyaXZlbiBieSBDU1MuXG4gICAqXG4gICAqIFRoZSByZWZlcmVuY2UgaXMgYWxzbyB1c2VkIHRvIHJlZm9jdXMgdGhlIHRyaWdnZXIgYWZ0ZXIgdGhlIGRpYWxvZyBpcyBjbG9zZWQuXG4gICAqL1xuICBAVmlld0NoaWxkKCd0cmlnZ2VyJykgdHJpZ2dlcjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgcHJvdGVjdGVkIG9wZW4kID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHRoZSBvcGVuIHN0YXRlIHRoYXQgaW5kaWNhdGVzIHdoZXRoZXIgdGhlIGZhY2V0IGxpc3Qgc2hvdWxkIGJlIHJlbmRlcmVkLlxuICAgKiBUaGlzIGlzIGVpdGhlciBkb25lIGluc3RhbnRseSwgb3IgYWZ0ZXIgdGhlIHVzZXIgdHJpZ2dlcnMgdGhpcyBieSB1c2luZyB0aGUgdHJpZ2dlclxuICAgKiBidXR0b24uIFRoaXMgZHJpdmVuIGJ5IHRoZSB2aXNpaWJpbGl0eSBvZiB0aGUgdHJpZ2dlciwgc28gdGhhdCB0aGUgQ1NTIGRyaXZlc1xuICAgKiB0aGUgYmVoYXZpb3VyLiBUaGlzIGNhbiBkaWZmZXIgcGVyIGJyZWFrcG9pbnQuXG4gICAqXG4gICAqIFRoZXJlJ3MgYSBjb25maWd1cmFibGUgZGVsYXkgZm9yIHRoZSBjbG9zZWQgc3RhdGUsIHNvIHRoYXQgdGhlIERPTSBpcyBub3QgcmVtb3ZlZFxuICAgKiBiZWZvcmUgc29tZSBDU1MgYW5pbWF0aW9ucyBhcmUgZG9uZS5cbiAgICovXG4gIGlzT3BlbiQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLmJyZWFrcG9pbnRTZXJ2aWNlLmJyZWFrcG9pbnQkLnBpcGUoXG4gICAgLy8gZGVmZmVyIGVtaXR0aW5nIGEgbmV3IHZhbHVlIHRvIHRoZSBuZXh0IG1pY3JvLXRhc2sgdG8gZW5zdXJlIHRoYXQgdGhlIGBoYXNUcmlnZ2VyYFxuICAgIC8vIG1ldGhvZCByZXByZXNlbnRzIHRoZSBhY3R1YWwgVUkgc3RhdGUuXG4gICAgb2JzZXJ2ZU9uKGFzYXBTY2hlZHVsZXIpLFxuICAgIHN3aXRjaE1hcCgoKSA9PiAodGhpcy5oYXNUcmlnZ2VyID8gdGhpcy5vcGVuJCA6IG9mKHRydWUpKSksXG4gICAgZGVsYXlXaGVuKChsYXVuY2hlZCkgPT4gaW50ZXJ2YWwobGF1bmNoZWQgPyAwIDogdGhpcy5DTE9TRV9ERUxBWSkpXG4gICk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIHRoZSBhY3RpdmUgc3RhdGUgdGhhdCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgZmFjZXQgbGlzdCBpcyBhY3RpdmF0ZWQuIEFjdGl2YXRpb25cbiAgICogaXMgcmVsYXRlZCB0byB0aGUgY3NzLCBzbyB0aGF0IGEgYW5pbWF0aW9uIG9yIHRyYW5zaXRpb24gY2FuIHZpc3VhbGl6ZSBvcGVuaW5nL2Nsb3NpbmdcbiAgICogdGhlIGxpc3QgKGkuZS4gZGlhbG9nKS5cbiAgICovXG4gIGlzQWN0aXZlJCA9IHRoaXMub3BlbiQucGlwZShcbiAgICAvLyBkZWZmZXIgZW1pdHRpbmcgYSBuZXcgdmFsdWUgdG8gdGhlIG5leHQgbWljcm8tdGFzayB0byBlbnN1cmUgdGhlIGFjdGl2ZSBjbGFzcyBpc1xuICAgIC8vICBhcHBsaWVkIGFmdGVyIHRoZSBET00gaXMgY3JlYXRlZFxuICAgIG9ic2VydmVPbihhc2FwU2NoZWR1bGVyKVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBicmVha3BvaW50U2VydmljZTogQnJlYWtwb2ludFNlcnZpY2UpIHt9XG5cbiAgbGF1bmNoKCkge1xuICAgIHRoaXMub3BlbiQubmV4dCh0cnVlKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMub3BlbiQubmV4dChmYWxzZSk7XG4gICAgdGhpcy50cmlnZ2VyLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGUgZmFjZXQgbmF2aWdhdGlvbiBzaG91bGQgYmUgb3BlbiBleHBsaWNpdGVseSBieSBhIHRyaWdnZXIuXG4gICAqIFRoaXMgaXMgZnVsbHkgY29udHJvbGxlZCBieSBDU1MsIHdoZXJlIHRoZSB0cmlnZ2VyIGJ1dHRvbiBjYW4gYmUgaGlkZGVuXG4gICAqIChkaXNwbGF5Om5vbmUpIGZvciBjZXJ0YWluIHNjcmVlbiBzaXplcy5cbiAgICovXG4gIGdldCBoYXNUcmlnZ2VyKCkge1xuICAgIHJldHVybiB0aGlzLnRyaWdnZXIubmF0aXZlRWxlbWVudC5vZmZzZXRQYXJlbnQgIT09IG51bGw7XG4gIH1cbn1cbiIsIjxidXR0b25cbiAgI3RyaWdnZXJcbiAgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tYmxvY2sgZGlhbG9nLXRyaWdnZXJcIlxuICAoY2xpY2spPVwibGF1bmNoKClcIlxuPlxuICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZXMuRklMVEVSXCI+PC9jeC1pY29uPlxuICB7eyAncHJvZHVjdExpc3QuZmlsdGVyQnkubGFiZWwnIHwgY3hUcmFuc2xhdGUgfX1cbjwvYnV0dG9uPlxuXG48Y3gtYWN0aXZlLWZhY2V0cz48L2N4LWFjdGl2ZS1mYWNldHM+XG5cbjxjeC1mYWNldC1saXN0XG4gICpuZ0lmPVwiaXNPcGVuJCB8IGFzeW5jXCJcbiAgW2lzRGlhbG9nXT1cImhhc1RyaWdnZXJcIlxuICAoY2xvc2VMaXN0KT1cImNsb3NlKClcIlxuICBbY2xhc3MuYWN0aXZlXT1cImlzQWN0aXZlJCB8IGFzeW5jXCJcbiAgW2NsYXNzLmRpYWxvZ109XCJoYXNUcmlnZ2VyXCJcbj48L2N4LWZhY2V0LWxpc3Q+XG4iXX0=