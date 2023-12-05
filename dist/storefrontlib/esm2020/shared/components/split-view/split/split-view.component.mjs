/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostBinding, Input, } from '@angular/core';
import { Subscription } from 'rxjs';
import { SplitViewService } from '../split-view.service';
import * as i0 from "@angular/core";
import * as i1 from "../split-view.service";
import * as i2 from "../../../../layout/breakpoint/breakpoint.service";
/**
 * The split-view component supports an unlimited number of nested views. The component
 * is a host to those view components and doesn't add any restrictions to it's content;
 * content is projected as-is.
 *
 * ```html
 * <cx-split-view>
 *   <cx-view></cx-view>
 *   <cx-view></cx-view>
 *   <any-wrapper>
 *     <cx-view></cx-view>
 *   </any-wrapper>
 * </cx-split-view>
 * ```
 *
 * The split view component is only concerned with tracking the underlying _visible_
 * view components, so that the `lastVisibleView` can be updated accordingly. The actual
 * visibility of views is controlled by CSS. To allow for maximum flexibility, the CSS
 * implementation is using CSS variables. The `lastVisibleView` is bind to the
 * `--cx-active-view` on the host, so that all descendants views will inherit the
 * property conveniently.
 */
export class SplitViewComponent {
    /**
     * Sets the default hide mode for views. This mode is useful in case views are dynamically being created,
     * for example when they are created by router components.
     *
     * The mode defaults to true, unless this is the first view; the first view is never hidden.
     */
    set hideMode(mode) {
        this.splitService.defaultHideMode = mode;
    }
    constructor(splitService, breakpointService, elementRef) {
        this.splitService = splitService;
        this.breakpointService = breakpointService;
        this.elementRef = elementRef;
        this.subscription = new Subscription();
        /**
         * Indicates the last visible view in the range of views that is visible. This
         * is bind to a css variable `--cx-active-view` so that the experience
         * can be fully controlled by css.
         */
        this.lastVisibleView = 1;
    }
    ngOnInit() {
        this.subscription.add(this.splitService
            .getActiveView()
            .subscribe((lastVisible) => (this.lastVisibleView = lastVisible + 1)));
        this.subscription.add(this.breakpointService.breakpoint$.subscribe(() => {
            this.splitService.updateSplitView(this.splitViewCount);
        }));
    }
    /**
     * Returns the maximum number of views per split-view. The number is based on the
     * CSS custom property `--cx-max-views`.
     */
    get splitViewCount() {
        return Number(getComputedStyle(this.elementRef.nativeElement).getPropertyValue('--cx-max-views'));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
SplitViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SplitViewComponent, deps: [{ token: i1.SplitViewService }, { token: i2.BreakpointService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
SplitViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SplitViewComponent, selector: "cx-split-view", inputs: { hideMode: "hideMode" }, host: { properties: { "style.--cx-active-view": "this.lastVisibleView", "attr.active-view": "this.lastVisibleView" } }, providers: [SplitViewService], ngImport: i0, template: "<ng-content></ng-content>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SplitViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-split-view', changeDetection: ChangeDetectionStrategy.OnPush, providers: [SplitViewService], template: "<ng-content></ng-content>\n" }]
        }], ctorParameters: function () { return [{ type: i1.SplitViewService }, { type: i2.BreakpointService }, { type: i0.ElementRef }]; }, propDecorators: { hideMode: [{
                type: Input
            }], lastVisibleView: [{
                type: HostBinding,
                args: ['style.--cx-active-view']
            }, {
                type: HostBinding,
                args: ['attr.active-view']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3NwbGl0LXZpZXcvc3BsaXQvc3BsaXQtdmlldy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3NwbGl0LXZpZXcvc3BsaXQvc3BsaXQtdmlldy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsV0FBVyxFQUNYLEtBQUssR0FHTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXBDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7O0FBRXpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFPSCxNQUFNLE9BQU8sa0JBQWtCO0lBRzdCOzs7OztPQUtHO0lBQ0gsSUFDSSxRQUFRLENBQUMsSUFBYTtRQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDM0MsQ0FBQztJQVdELFlBQ1ksWUFBOEIsRUFDOUIsaUJBQW9DLEVBQ3BDLFVBQXNCO1FBRnRCLGlCQUFZLEdBQVosWUFBWSxDQUFrQjtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLGVBQVUsR0FBVixVQUFVLENBQVk7UUF6QjFCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQWExQzs7OztXQUlHO1FBR0gsb0JBQWUsR0FBRyxDQUFDLENBQUM7SUFNakIsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLFlBQVk7YUFDZCxhQUFhLEVBQUU7YUFDZixTQUFTLENBQ1IsQ0FBQyxXQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUNsRSxDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQWMsY0FBYztRQUMxQixPQUFPLE1BQU0sQ0FDWCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLGdCQUFnQixDQUM5RCxnQkFBZ0IsQ0FDakIsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7OytHQTFEVSxrQkFBa0I7bUdBQWxCLGtCQUFrQixrTUFGbEIsQ0FBQyxnQkFBZ0IsQ0FBQywwQkM3Qy9CLDZCQUNBOzJGRDhDYSxrQkFBa0I7a0JBTjlCLFNBQVM7K0JBQ0UsZUFBZSxtQkFFUix1QkFBdUIsQ0FBQyxNQUFNLGFBQ3BDLENBQUMsZ0JBQWdCLENBQUM7Z0tBWXpCLFFBQVE7c0JBRFgsS0FBSztnQkFZTixlQUFlO3NCQUZkLFdBQVc7dUJBQUMsd0JBQXdCOztzQkFDcEMsV0FBVzt1QkFBQyxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQnJlYWtwb2ludFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9sYXlvdXQvYnJlYWtwb2ludC9icmVha3BvaW50LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3BsaXRWaWV3U2VydmljZSB9IGZyb20gJy4uL3NwbGl0LXZpZXcuc2VydmljZSc7XG5cbi8qKlxuICogVGhlIHNwbGl0LXZpZXcgY29tcG9uZW50IHN1cHBvcnRzIGFuIHVubGltaXRlZCBudW1iZXIgb2YgbmVzdGVkIHZpZXdzLiBUaGUgY29tcG9uZW50XG4gKiBpcyBhIGhvc3QgdG8gdGhvc2UgdmlldyBjb21wb25lbnRzIGFuZCBkb2Vzbid0IGFkZCBhbnkgcmVzdHJpY3Rpb25zIHRvIGl0J3MgY29udGVudDtcbiAqIGNvbnRlbnQgaXMgcHJvamVjdGVkIGFzLWlzLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxjeC1zcGxpdC12aWV3PlxuICogICA8Y3gtdmlldz48L2N4LXZpZXc+XG4gKiAgIDxjeC12aWV3PjwvY3gtdmlldz5cbiAqICAgPGFueS13cmFwcGVyPlxuICogICAgIDxjeC12aWV3PjwvY3gtdmlldz5cbiAqICAgPC9hbnktd3JhcHBlcj5cbiAqIDwvY3gtc3BsaXQtdmlldz5cbiAqIGBgYFxuICpcbiAqIFRoZSBzcGxpdCB2aWV3IGNvbXBvbmVudCBpcyBvbmx5IGNvbmNlcm5lZCB3aXRoIHRyYWNraW5nIHRoZSB1bmRlcmx5aW5nIF92aXNpYmxlX1xuICogdmlldyBjb21wb25lbnRzLCBzbyB0aGF0IHRoZSBgbGFzdFZpc2libGVWaWV3YCBjYW4gYmUgdXBkYXRlZCBhY2NvcmRpbmdseS4gVGhlIGFjdHVhbFxuICogdmlzaWJpbGl0eSBvZiB2aWV3cyBpcyBjb250cm9sbGVkIGJ5IENTUy4gVG8gYWxsb3cgZm9yIG1heGltdW0gZmxleGliaWxpdHksIHRoZSBDU1NcbiAqIGltcGxlbWVudGF0aW9uIGlzIHVzaW5nIENTUyB2YXJpYWJsZXMuIFRoZSBgbGFzdFZpc2libGVWaWV3YCBpcyBiaW5kIHRvIHRoZVxuICogYC0tY3gtYWN0aXZlLXZpZXdgIG9uIHRoZSBob3N0LCBzbyB0aGF0IGFsbCBkZXNjZW5kYW50cyB2aWV3cyB3aWxsIGluaGVyaXQgdGhlXG4gKiBwcm9wZXJ0eSBjb252ZW5pZW50bHkuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXNwbGl0LXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vc3BsaXQtdmlldy5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBwcm92aWRlcnM6IFtTcGxpdFZpZXdTZXJ2aWNlXSxcbn0pXG5leHBvcnQgY2xhc3MgU3BsaXRWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAvKipcbiAgICogU2V0cyB0aGUgZGVmYXVsdCBoaWRlIG1vZGUgZm9yIHZpZXdzLiBUaGlzIG1vZGUgaXMgdXNlZnVsIGluIGNhc2Ugdmlld3MgYXJlIGR5bmFtaWNhbGx5IGJlaW5nIGNyZWF0ZWQsXG4gICAqIGZvciBleGFtcGxlIHdoZW4gdGhleSBhcmUgY3JlYXRlZCBieSByb3V0ZXIgY29tcG9uZW50cy5cbiAgICpcbiAgICogVGhlIG1vZGUgZGVmYXVsdHMgdG8gdHJ1ZSwgdW5sZXNzIHRoaXMgaXMgdGhlIGZpcnN0IHZpZXc7IHRoZSBmaXJzdCB2aWV3IGlzIG5ldmVyIGhpZGRlbi5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlTW9kZShtb2RlOiBib29sZWFuKSB7XG4gICAgdGhpcy5zcGxpdFNlcnZpY2UuZGVmYXVsdEhpZGVNb2RlID0gbW9kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhlIGxhc3QgdmlzaWJsZSB2aWV3IGluIHRoZSByYW5nZSBvZiB2aWV3cyB0aGF0IGlzIHZpc2libGUuIFRoaXNcbiAgICogaXMgYmluZCB0byBhIGNzcyB2YXJpYWJsZSBgLS1jeC1hY3RpdmUtdmlld2Agc28gdGhhdCB0aGUgZXhwZXJpZW5jZVxuICAgKiBjYW4gYmUgZnVsbHkgY29udHJvbGxlZCBieSBjc3MuXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLi0tY3gtYWN0aXZlLXZpZXcnKVxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYWN0aXZlLXZpZXcnKVxuICBsYXN0VmlzaWJsZVZpZXcgPSAxO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBzcGxpdFNlcnZpY2U6IFNwbGl0Vmlld1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGJyZWFrcG9pbnRTZXJ2aWNlOiBCcmVha3BvaW50U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5zcGxpdFNlcnZpY2VcbiAgICAgICAgLmdldEFjdGl2ZVZpZXcoKVxuICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgIChsYXN0VmlzaWJsZTogbnVtYmVyKSA9PiAodGhpcy5sYXN0VmlzaWJsZVZpZXcgPSBsYXN0VmlzaWJsZSArIDEpXG4gICAgICAgIClcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuYnJlYWtwb2ludFNlcnZpY2UuYnJlYWtwb2ludCQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5zcGxpdFNlcnZpY2UudXBkYXRlU3BsaXRWaWV3KHRoaXMuc3BsaXRWaWV3Q291bnQpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG1heGltdW0gbnVtYmVyIG9mIHZpZXdzIHBlciBzcGxpdC12aWV3LiBUaGUgbnVtYmVyIGlzIGJhc2VkIG9uIHRoZVxuICAgKiBDU1MgY3VzdG9tIHByb3BlcnR5IGAtLWN4LW1heC12aWV3c2AuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0IHNwbGl0Vmlld0NvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE51bWJlcihcbiAgICAgIGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoXG4gICAgICAgICctLWN4LW1heC12aWV3cydcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuIl19