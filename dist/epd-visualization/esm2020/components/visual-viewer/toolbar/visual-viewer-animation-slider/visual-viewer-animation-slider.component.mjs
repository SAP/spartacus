/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input, Output, ViewChild, } from '@angular/core';
import { VisualViewerAnimationSliderService } from './visual-viewer-animation-slider.service';
import * as i0 from "@angular/core";
import * as i1 from "./visual-viewer-animation-slider.service";
import * as i2 from "@spartacus/core";
export class VisualViewerAnimationSliderComponent {
    constructor(visualViewerAnimationSliderService) {
        this.visualViewerAnimationSliderService = visualViewerAnimationSliderService;
        this.valueChange = this.visualViewerAnimationSliderService.valueChange;
        this.initializedChange = this.visualViewerAnimationSliderService.initializedChange;
    }
    ngAfterViewInit() {
        this.visualViewerAnimationSliderService.initialize();
    }
    set hidden(hidden) {
        this.visualViewerAnimationSliderService.hidden = hidden;
    }
    get hidden() {
        return this.visualViewerAnimationSliderService.hidden;
    }
    set value(value) {
        this.visualViewerAnimationSliderService.value = value;
    }
    get value() {
        return this.visualViewerAnimationSliderService.value;
    }
    get position() {
        return this.visualViewerAnimationSliderService.position;
    }
    set disabled(disabled) {
        this.visualViewerAnimationSliderService.disabled = disabled;
    }
    get disabled() {
        return this.visualViewerAnimationSliderService.disabled;
    }
    get initialized() {
        return this.visualViewerAnimationSliderService.initialized;
    }
    set barElement(barElement) {
        this.visualViewerAnimationSliderService.barElement = barElement;
    }
    set handleElement(handleElement) {
        this.visualViewerAnimationSliderService.handleElement = handleElement;
    }
}
VisualViewerAnimationSliderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerAnimationSliderComponent, deps: [{ token: i1.VisualViewerAnimationSliderService }], target: i0.ɵɵFactoryTarget.Component });
VisualViewerAnimationSliderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: VisualViewerAnimationSliderComponent, selector: "cx-epd-visualization-animation-slider", inputs: { hidden: "hidden", value: "value", disabled: "disabled" }, outputs: { valueChange: "valueChange", initializedChange: "initializedChange" }, providers: [VisualViewerAnimationSliderService], viewQueries: [{ propertyName: "barElement", first: true, predicate: ["bar"], descendants: true }, { propertyName: "handleElement", first: true, predicate: ["handle"], descendants: true }], ngImport: i0, template: "<div\n  class=\"cx-epd-visualization-animation-slider\"\n  [class.disabled]=\"disabled ? true : undefined\"\n>\n  <div class=\"cx-epd-visualization-animation-slider-wrapper\">\n    <span\n      cxVisualViewerAnimationSliderElement\n      #bar\n      class=\"\n        cx-epd-visualization-animation-slider-span\n        cx-epd-visualization-animation-slider-bar-wrapper\n      \"\n    >\n      <span\n        class=\"\n          cx-epd-visualization-animation-slider-span\n          cx-epd-visualization-animation-slider-bar\n        \"\n      ></span>\n    </span>\n\n    <span\n      cxVisualViewerAnimationSliderHandle\n      #handle\n      class=\"\n        cx-epd-visualization-animation-slider-span\n        cx-epd-visualization-animation-slider-pointer\n      \"\n      [style.left]=\"(position | cxNumeric: '1.0-0') + 'px'\"\n      [attr.role]=\"\n        'epdVisualization.visualViewer.toolbar.visualViewerAnimationSlider.role'\n          | cxTranslate\n      \"\n      [attr.aria-label]=\"\n        'epdVisualization.visualViewer.toolbar.visualViewerAnimationSlider.label'\n          | cxTranslate\n      \"\n      [attr.aria-valuenow]=\"value * 100 | cxNumeric: '1.0-0'\"\n      [attr.aria-valuemin]=\"'0'\"\n      [attr.aria-valuemax]=\"'100'\"\n      [attr.tabindex]=\"disabled ? null : 0\"\n    ></span>\n  </div>\n</div>\n", dependencies: [{ kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxNumericPipe, name: "cxNumeric" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerAnimationSliderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-epd-visualization-animation-slider', providers: [VisualViewerAnimationSliderService], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"cx-epd-visualization-animation-slider\"\n  [class.disabled]=\"disabled ? true : undefined\"\n>\n  <div class=\"cx-epd-visualization-animation-slider-wrapper\">\n    <span\n      cxVisualViewerAnimationSliderElement\n      #bar\n      class=\"\n        cx-epd-visualization-animation-slider-span\n        cx-epd-visualization-animation-slider-bar-wrapper\n      \"\n    >\n      <span\n        class=\"\n          cx-epd-visualization-animation-slider-span\n          cx-epd-visualization-animation-slider-bar\n        \"\n      ></span>\n    </span>\n\n    <span\n      cxVisualViewerAnimationSliderHandle\n      #handle\n      class=\"\n        cx-epd-visualization-animation-slider-span\n        cx-epd-visualization-animation-slider-pointer\n      \"\n      [style.left]=\"(position | cxNumeric: '1.0-0') + 'px'\"\n      [attr.role]=\"\n        'epdVisualization.visualViewer.toolbar.visualViewerAnimationSlider.role'\n          | cxTranslate\n      \"\n      [attr.aria-label]=\"\n        'epdVisualization.visualViewer.toolbar.visualViewerAnimationSlider.label'\n          | cxTranslate\n      \"\n      [attr.aria-valuenow]=\"value * 100 | cxNumeric: '1.0-0'\"\n      [attr.aria-valuemin]=\"'0'\"\n      [attr.aria-valuemax]=\"'100'\"\n      [attr.tabindex]=\"disabled ? null : 0\"\n    ></span>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.VisualViewerAnimationSliderService }]; }, propDecorators: { hidden: [{
                type: Input
            }], value: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], disabled: [{
                type: Input
            }], initializedChange: [{
                type: Output
            }], barElement: [{
                type: ViewChild,
                args: ['bar']
            }], handleElement: [{
                type: ViewChild,
                args: ['handle']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXZpZXdlci1hbmltYXRpb24tc2xpZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvZXBkLXZpc3VhbGl6YXRpb24vY29tcG9uZW50cy92aXN1YWwtdmlld2VyL3Rvb2xiYXIvdmlzdWFsLXZpZXdlci1hbmltYXRpb24tc2xpZGVyL3Zpc3VhbC12aWV3ZXItYW5pbWF0aW9uLXNsaWRlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvdmlzdWFsLXZpZXdlci90b29sYmFyL3Zpc3VhbC12aWV3ZXItYW5pbWF0aW9uLXNsaWRlci92aXN1YWwtdmlld2VyLWFuaW1hdGlvbi1zbGlkZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUdULEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7O0FBUTlGLE1BQU0sT0FBTyxvQ0FBb0M7SUFDL0MsWUFDWSxrQ0FBc0U7UUFBdEUsdUNBQWtDLEdBQWxDLGtDQUFrQyxDQUFvQztRQXVCbEYsZ0JBQVcsR0FBRyxJQUFJLENBQUMsa0NBQWtDLENBQUMsV0FBVyxDQUFDO1FBa0JsRSxzQkFBaUIsR0FDZixJQUFJLENBQUMsa0NBQWtDLENBQUMsaUJBQWlCLENBQUM7SUF6Q3pELENBQUM7SUFFSixlQUFlO1FBQ2IsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRCxJQUNJLE1BQU0sQ0FBQyxNQUFlO1FBQ3hCLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQzFELENBQUM7SUFDRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxNQUFNLENBQUM7SUFDeEQsQ0FBQztJQUVELElBQ0ksS0FBSyxDQUFDLEtBQWE7UUFDckIsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDeEQsQ0FBQztJQUNELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLGtDQUFrQyxDQUFDLEtBQUssQ0FBQztJQUN2RCxDQUFDO0lBSUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsa0NBQWtDLENBQUMsUUFBUSxDQUFDO0lBQzFELENBQUM7SUFFRCxJQUNJLFFBQVEsQ0FBQyxRQUFpQjtRQUM1QixJQUFJLENBQUMsa0NBQWtDLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUM5RCxDQUFDO0lBQ0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsa0NBQWtDLENBQUMsUUFBUSxDQUFDO0lBQzFELENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxXQUFXLENBQUM7SUFDN0QsQ0FBQztJQUtELElBQ0ksVUFBVSxDQUFDLFVBQXNCO1FBQ25DLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ2xFLENBQUM7SUFFRCxJQUNJLGFBQWEsQ0FBQyxhQUF5QjtRQUN6QyxJQUFJLENBQUMsa0NBQWtDLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUN4RSxDQUFDOztpSUF0RFUsb0NBQW9DO3FIQUFwQyxvQ0FBb0MscU5BSHBDLENBQUMsa0NBQWtDLENBQUMsdU5DckJqRCwyekNBNENBOzJGRHBCYSxvQ0FBb0M7a0JBTmhELFNBQVM7K0JBQ0UsdUNBQXVDLGFBRXRDLENBQUMsa0NBQWtDLENBQUMsbUJBQzlCLHVCQUF1QixDQUFDLE1BQU07eUhBWTNDLE1BQU07c0JBRFQsS0FBSztnQkFTRixLQUFLO3NCQURSLEtBQUs7Z0JBUU4sV0FBVztzQkFEVixNQUFNO2dCQVFILFFBQVE7c0JBRFgsS0FBSztnQkFZTixpQkFBaUI7c0JBRGhCLE1BQU07Z0JBS0gsVUFBVTtzQkFEYixTQUFTO3VCQUFDLEtBQUs7Z0JBTVosYUFBYTtzQkFEaEIsU0FBUzt1QkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmlzdWFsVmlld2VyQW5pbWF0aW9uU2xpZGVyU2VydmljZSB9IGZyb20gJy4vdmlzdWFsLXZpZXdlci1hbmltYXRpb24tc2xpZGVyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1lcGQtdmlzdWFsaXphdGlvbi1hbmltYXRpb24tc2xpZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Zpc3VhbC12aWV3ZXItYW5pbWF0aW9uLXNsaWRlci5jb21wb25lbnQuaHRtbCcsXG4gIHByb3ZpZGVyczogW1Zpc3VhbFZpZXdlckFuaW1hdGlvblNsaWRlclNlcnZpY2VdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVmlzdWFsVmlld2VyQW5pbWF0aW9uU2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB2aXN1YWxWaWV3ZXJBbmltYXRpb25TbGlkZXJTZXJ2aWNlOiBWaXN1YWxWaWV3ZXJBbmltYXRpb25TbGlkZXJTZXJ2aWNlXG4gICkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy52aXN1YWxWaWV3ZXJBbmltYXRpb25TbGlkZXJTZXJ2aWNlLmluaXRpYWxpemUoKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBoaWRkZW4oaGlkZGVuOiBib29sZWFuKSB7XG4gICAgdGhpcy52aXN1YWxWaWV3ZXJBbmltYXRpb25TbGlkZXJTZXJ2aWNlLmhpZGRlbiA9IGhpZGRlbjtcbiAgfVxuICBnZXQgaGlkZGVuKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnZpc3VhbFZpZXdlckFuaW1hdGlvblNsaWRlclNlcnZpY2UuaGlkZGVuO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLnZpc3VhbFZpZXdlckFuaW1hdGlvblNsaWRlclNlcnZpY2UudmFsdWUgPSB2YWx1ZTtcbiAgfVxuICBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy52aXN1YWxWaWV3ZXJBbmltYXRpb25TbGlkZXJTZXJ2aWNlLnZhbHVlO1xuICB9XG4gIEBPdXRwdXQoKVxuICB2YWx1ZUNoYW5nZSA9IHRoaXMudmlzdWFsVmlld2VyQW5pbWF0aW9uU2xpZGVyU2VydmljZS52YWx1ZUNoYW5nZTtcblxuICBnZXQgcG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy52aXN1YWxWaWV3ZXJBbmltYXRpb25TbGlkZXJTZXJ2aWNlLnBvc2l0aW9uO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy52aXN1YWxWaWV3ZXJBbmltYXRpb25TbGlkZXJTZXJ2aWNlLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnZpc3VhbFZpZXdlckFuaW1hdGlvblNsaWRlclNlcnZpY2UuZGlzYWJsZWQ7XG4gIH1cblxuICBnZXQgaW5pdGlhbGl6ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudmlzdWFsVmlld2VyQW5pbWF0aW9uU2xpZGVyU2VydmljZS5pbml0aWFsaXplZDtcbiAgfVxuICBAT3V0cHV0KClcbiAgaW5pdGlhbGl6ZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9XG4gICAgdGhpcy52aXN1YWxWaWV3ZXJBbmltYXRpb25TbGlkZXJTZXJ2aWNlLmluaXRpYWxpemVkQ2hhbmdlO1xuXG4gIEBWaWV3Q2hpbGQoJ2JhcicpXG4gIHNldCBiYXJFbGVtZW50KGJhckVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLnZpc3VhbFZpZXdlckFuaW1hdGlvblNsaWRlclNlcnZpY2UuYmFyRWxlbWVudCA9IGJhckVsZW1lbnQ7XG4gIH1cblxuICBAVmlld0NoaWxkKCdoYW5kbGUnKVxuICBzZXQgaGFuZGxlRWxlbWVudChoYW5kbGVFbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy52aXN1YWxWaWV3ZXJBbmltYXRpb25TbGlkZXJTZXJ2aWNlLmhhbmRsZUVsZW1lbnQgPSBoYW5kbGVFbGVtZW50O1xuICB9XG59XG4iLCI8ZGl2XG4gIGNsYXNzPVwiY3gtZXBkLXZpc3VhbGl6YXRpb24tYW5pbWF0aW9uLXNsaWRlclwiXG4gIFtjbGFzcy5kaXNhYmxlZF09XCJkaXNhYmxlZCA/IHRydWUgOiB1bmRlZmluZWRcIlxuPlxuICA8ZGl2IGNsYXNzPVwiY3gtZXBkLXZpc3VhbGl6YXRpb24tYW5pbWF0aW9uLXNsaWRlci13cmFwcGVyXCI+XG4gICAgPHNwYW5cbiAgICAgIGN4VmlzdWFsVmlld2VyQW5pbWF0aW9uU2xpZGVyRWxlbWVudFxuICAgICAgI2JhclxuICAgICAgY2xhc3M9XCJcbiAgICAgICAgY3gtZXBkLXZpc3VhbGl6YXRpb24tYW5pbWF0aW9uLXNsaWRlci1zcGFuXG4gICAgICAgIGN4LWVwZC12aXN1YWxpemF0aW9uLWFuaW1hdGlvbi1zbGlkZXItYmFyLXdyYXBwZXJcbiAgICAgIFwiXG4gICAgPlxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3M9XCJcbiAgICAgICAgICBjeC1lcGQtdmlzdWFsaXphdGlvbi1hbmltYXRpb24tc2xpZGVyLXNwYW5cbiAgICAgICAgICBjeC1lcGQtdmlzdWFsaXphdGlvbi1hbmltYXRpb24tc2xpZGVyLWJhclxuICAgICAgICBcIlxuICAgICAgPjwvc3Bhbj5cbiAgICA8L3NwYW4+XG5cbiAgICA8c3BhblxuICAgICAgY3hWaXN1YWxWaWV3ZXJBbmltYXRpb25TbGlkZXJIYW5kbGVcbiAgICAgICNoYW5kbGVcbiAgICAgIGNsYXNzPVwiXG4gICAgICAgIGN4LWVwZC12aXN1YWxpemF0aW9uLWFuaW1hdGlvbi1zbGlkZXItc3BhblxuICAgICAgICBjeC1lcGQtdmlzdWFsaXphdGlvbi1hbmltYXRpb24tc2xpZGVyLXBvaW50ZXJcbiAgICAgIFwiXG4gICAgICBbc3R5bGUubGVmdF09XCIocG9zaXRpb24gfCBjeE51bWVyaWM6ICcxLjAtMCcpICsgJ3B4J1wiXG4gICAgICBbYXR0ci5yb2xlXT1cIlxuICAgICAgICAnZXBkVmlzdWFsaXphdGlvbi52aXN1YWxWaWV3ZXIudG9vbGJhci52aXN1YWxWaWV3ZXJBbmltYXRpb25TbGlkZXIucm9sZSdcbiAgICAgICAgICB8IGN4VHJhbnNsYXRlXG4gICAgICBcIlxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJcbiAgICAgICAgJ2VwZFZpc3VhbGl6YXRpb24udmlzdWFsVmlld2VyLnRvb2xiYXIudmlzdWFsVmlld2VyQW5pbWF0aW9uU2xpZGVyLmxhYmVsJ1xuICAgICAgICAgIHwgY3hUcmFuc2xhdGVcbiAgICAgIFwiXG4gICAgICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cInZhbHVlICogMTAwIHwgY3hOdW1lcmljOiAnMS4wLTAnXCJcbiAgICAgIFthdHRyLmFyaWEtdmFsdWVtaW5dPVwiJzAnXCJcbiAgICAgIFthdHRyLmFyaWEtdmFsdWVtYXhdPVwiJzEwMCdcIlxuICAgICAgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgPyBudWxsIDogMFwiXG4gICAgPjwvc3Bhbj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==