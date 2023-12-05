/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
export class VisualViewerToolbarButtonComponent {
    constructor() {
        this.text = '';
        this.disabled = false;
        this.checked = false;
    }
}
VisualViewerToolbarButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerToolbarButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
VisualViewerToolbarButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: VisualViewerToolbarButtonComponent, selector: "cx-epd-visualization-viewer-toolbar-button", inputs: { text: "text", iconLibraryClass: "iconLibraryClass", iconClass: "iconClass", disabled: "disabled", checked: "checked" }, ngImport: i0, template: "<button\n  class=\"btn btn-link\"\n  type=\"submit\"\n  [disabled]=\"disabled\"\n  [class.checked]=\"checked\"\n  [attr.aria-checked]=\"checked\"\n>\n  <div class=\"buttonVBox\">\n    <cx-icon class=\"{{ iconLibraryClass }} {{ iconClass }}\"></cx-icon>\n    <span class=\"buttonText\">{{ text }}</span>\n  </div>\n</button>\n", dependencies: [{ kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VisualViewerToolbarButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-epd-visualization-viewer-toolbar-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  class=\"btn btn-link\"\n  type=\"submit\"\n  [disabled]=\"disabled\"\n  [class.checked]=\"checked\"\n  [attr.aria-checked]=\"checked\"\n>\n  <div class=\"buttonVBox\">\n    <cx-icon class=\"{{ iconLibraryClass }} {{ iconClass }}\"></cx-icon>\n    <span class=\"buttonText\">{{ text }}</span>\n  </div>\n</button>\n" }]
        }], propDecorators: { text: [{
                type: Input
            }], iconLibraryClass: [{
                type: Input
            }], iconClass: [{
                type: Input
            }], disabled: [{
                type: Input
            }], checked: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzdWFsLXZpZXdlci10b29sYmFyLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvdmlzdWFsLXZpZXdlci90b29sYmFyL3Zpc3VhbC12aWV3ZXItdG9vbGJhci1idXR0b24vdmlzdWFsLXZpZXdlci10b29sYmFyLWJ1dHRvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2VwZC12aXN1YWxpemF0aW9uL2NvbXBvbmVudHMvdmlzdWFsLXZpZXdlci90b29sYmFyL3Zpc3VhbC12aWV3ZXItdG9vbGJhci1idXR0b24vdmlzdWFsLXZpZXdlci10b29sYmFyLWJ1dHRvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU8xRSxNQUFNLE9BQU8sa0NBQWtDO0lBTC9DO1FBTVcsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUdWLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsWUFBTyxHQUFHLEtBQUssQ0FBQztLQUMxQjs7K0hBTlksa0NBQWtDO21IQUFsQyxrQ0FBa0Msb05DYi9DLHVVQVlBOzJGRENhLGtDQUFrQztrQkFMOUMsU0FBUzsrQkFDRSw0Q0FBNEMsbUJBRXJDLHVCQUF1QixDQUFDLE1BQU07OEJBR3RDLElBQUk7c0JBQVosS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWVwZC12aXN1YWxpemF0aW9uLXZpZXdlci10b29sYmFyLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi92aXN1YWwtdmlld2VyLXRvb2xiYXItYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFZpc3VhbFZpZXdlclRvb2xiYXJCdXR0b25Db21wb25lbnQge1xuICBASW5wdXQoKSB0ZXh0ID0gJyc7XG4gIEBJbnB1dCgpIGljb25MaWJyYXJ5Q2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgaWNvbkNsYXNzOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGNoZWNrZWQgPSBmYWxzZTtcbn1cbiIsIjxidXR0b25cbiAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIlxuICB0eXBlPVwic3VibWl0XCJcbiAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgW2NsYXNzLmNoZWNrZWRdPVwiY2hlY2tlZFwiXG4gIFthdHRyLmFyaWEtY2hlY2tlZF09XCJjaGVja2VkXCJcbj5cbiAgPGRpdiBjbGFzcz1cImJ1dHRvblZCb3hcIj5cbiAgICA8Y3gtaWNvbiBjbGFzcz1cInt7IGljb25MaWJyYXJ5Q2xhc3MgfX0ge3sgaWNvbkNsYXNzIH19XCI+PC9jeC1pY29uPlxuICAgIDxzcGFuIGNsYXNzPVwiYnV0dG9uVGV4dFwiPnt7IHRleHQgfX08L3NwYW4+XG4gIDwvZGl2PlxuPC9idXR0b24+XG4iXX0=