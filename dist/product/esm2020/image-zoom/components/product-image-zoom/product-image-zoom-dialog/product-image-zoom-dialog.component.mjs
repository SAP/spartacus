/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostListener, Input, } from '@angular/core';
import { ICON_TYPE, } from '@spartacus/storefront';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "../product-image-zoom-view/product-image-zoom-view.component";
import * as i3 from "@spartacus/core";
export class ProductImageZoomDialogComponent {
    handleClick(event) {
        // Close on click outside the dialog window
        if (event.target.tagName === this.el.nativeElement.tagName) {
            this.close('Cross click');
        }
    }
    constructor(launchDialogService, el) {
        this.launchDialogService = launchDialogService;
        this.el = el;
        this.iconType = ICON_TYPE;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
    }
    close(reason = '') {
        this.launchDialogService.closeDialog(reason);
    }
}
ProductImageZoomDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomDialogComponent, deps: [{ token: i1.LaunchDialogService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
ProductImageZoomDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProductImageZoomDialogComponent, selector: "cx-product-image-zoom-dialog", inputs: { galleryIndex: "galleryIndex" }, host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<div class=\"cx-image-zoom-dialog\" [cxFocus]=\"focusConfig\">\n  <div class=\"cx-dialog-content\">\n    <div class=\"cx-dialog-header\">\n      <button\n        type=\"button\"\n        class=\"close\"\n        [attr.aria-label]=\"'productImageZoomDialog.close' | cxTranslate\"\n        (click)=\"close('cross click')\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconType.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n    <div class=\"cx-dialog-body\">\n      <cx-product-image-zoom-view\n        [galleryIndex]=\"galleryIndex\"\n      ></cx-product-image-zoom-view>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: i2.ProductImageZoomViewComponent, selector: "cx-product-image-zoom-view", inputs: ["galleryIndex"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProductImageZoomDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-image-zoom-dialog', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-image-zoom-dialog\" [cxFocus]=\"focusConfig\">\n  <div class=\"cx-dialog-content\">\n    <div class=\"cx-dialog-header\">\n      <button\n        type=\"button\"\n        class=\"close\"\n        [attr.aria-label]=\"'productImageZoomDialog.close' | cxTranslate\"\n        (click)=\"close('cross click')\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconType.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n    <div class=\"cx-dialog-body\">\n      <cx-product-image-zoom-view\n        [galleryIndex]=\"galleryIndex\"\n      ></cx-product-image-zoom-view>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i0.ElementRef }]; }, propDecorators: { galleryIndex: [{
                type: Input
            }], handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbWFnZS16b29tLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC9pbWFnZS16b29tL2NvbXBvbmVudHMvcHJvZHVjdC1pbWFnZS16b29tL3Byb2R1Y3QtaW1hZ2Utem9vbS1kaWFsb2cvcHJvZHVjdC1pbWFnZS16b29tLWRpYWxvZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC9pbWFnZS16b29tL2NvbXBvbmVudHMvcHJvZHVjdC1pbWFnZS16b29tL3Byb2R1Y3QtaW1hZ2Utem9vbS1kaWFsb2cvcHJvZHVjdC1pbWFnZS16b29tLWRpYWxvZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsWUFBWSxFQUNaLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsU0FBUyxHQUVWLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBTy9CLE1BQU0sT0FBTywrQkFBK0I7SUFhMUMsV0FBVyxDQUFDLEtBQWM7UUFDeEIsMkNBQTJDO1FBQzNDLElBQUssS0FBSyxDQUFDLE1BQWMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFO1lBQ25FLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQsWUFDWSxtQkFBd0MsRUFDeEMsRUFBYztRQURkLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQXJCMUIsYUFBUSxHQUFHLFNBQVMsQ0FBQztRQUVyQixnQkFBVyxHQUFnQjtZQUN6QixJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxJQUFJO1lBQ1gsU0FBUyxFQUFFLFFBQVE7WUFDbkIsYUFBYSxFQUFFLElBQUk7U0FDcEIsQ0FBQztJQWVDLENBQUM7SUFFSixLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUU7UUFDZixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7OzRIQTNCVSwrQkFBK0I7Z0hBQS9CLCtCQUErQix1S0N4QjVDLDZvQkFxQkE7MkZER2EsK0JBQStCO2tCQUwzQyxTQUFTOytCQUNFLDhCQUE4QixtQkFFdkIsdUJBQXVCLENBQUMsTUFBTTttSUFZdEMsWUFBWTtzQkFBcEIsS0FBSztnQkFHTixXQUFXO3NCQURWLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBGb2N1c0NvbmZpZyxcbiAgSUNPTl9UWVBFLFxuICBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1wcm9kdWN0LWltYWdlLXpvb20tZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICdwcm9kdWN0LWltYWdlLXpvb20tZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RJbWFnZVpvb21EaWFsb2dDb21wb25lbnQge1xuICBpY29uVHlwZSA9IElDT05fVFlQRTtcblxuICBmb2N1c0NvbmZpZzogRm9jdXNDb25maWcgPSB7XG4gICAgdHJhcDogdHJ1ZSxcbiAgICBibG9jazogdHJ1ZSxcbiAgICBhdXRvZm9jdXM6ICdidXR0b24nLFxuICAgIGZvY3VzT25Fc2NhcGU6IHRydWUsXG4gIH07XG5cbiAgQElucHV0KCkgZ2FsbGVyeUluZGV4OiBudW1iZXI7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBoYW5kbGVDbGljayhldmVudDogVUlFdmVudCk6IHZvaWQge1xuICAgIC8vIENsb3NlIG9uIGNsaWNrIG91dHNpZGUgdGhlIGRpYWxvZyB3aW5kb3dcbiAgICBpZiAoKGV2ZW50LnRhcmdldCBhcyBhbnkpLnRhZ05hbWUgPT09IHRoaXMuZWwubmF0aXZlRWxlbWVudC50YWdOYW1lKSB7XG4gICAgICB0aGlzLmNsb3NlKCdDcm9zcyBjbGljaycpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBsYXVuY2hEaWFsb2dTZXJ2aWNlOiBMYXVuY2hEaWFsb2dTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBlbDogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgY2xvc2UocmVhc29uID0gJycpOiB2b2lkIHtcbiAgICB0aGlzLmxhdW5jaERpYWxvZ1NlcnZpY2UuY2xvc2VEaWFsb2cocmVhc29uKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImN4LWltYWdlLXpvb20tZGlhbG9nXCIgW2N4Rm9jdXNdPVwiZm9jdXNDb25maWdcIj5cbiAgPGRpdiBjbGFzcz1cImN4LWRpYWxvZy1jb250ZW50XCI+XG4gICAgPGRpdiBjbGFzcz1cImN4LWRpYWxvZy1oZWFkZXJcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzPVwiY2xvc2VcIlxuICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidwcm9kdWN0SW1hZ2Vab29tRGlhbG9nLmNsb3NlJyB8IGN4VHJhbnNsYXRlXCJcbiAgICAgICAgKGNsaWNrKT1cImNsb3NlKCdjcm9zcyBjbGljaycpXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGUuQ0xPU0VcIj48L2N4LWljb24+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjeC1kaWFsb2ctYm9keVwiPlxuICAgICAgPGN4LXByb2R1Y3QtaW1hZ2Utem9vbS12aWV3XG4gICAgICAgIFtnYWxsZXJ5SW5kZXhdPVwiZ2FsbGVyeUluZGV4XCJcbiAgICAgID48L2N4LXByb2R1Y3QtaW1hZ2Utem9vbS12aWV3PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19