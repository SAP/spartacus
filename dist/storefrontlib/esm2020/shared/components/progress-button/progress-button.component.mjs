/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/core";
export class ProgressButtonComponent {
    constructor() {
        this.ariaLabel = '';
        this.class = '';
        this.disabled = false;
        this.loading = false;
        this.clickEvent = new EventEmitter();
        // Intentional empty constructor
    }
}
ProgressButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProgressButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ProgressButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProgressButtonComponent, selector: "cx-progress-button", inputs: { ariaLabel: "ariaLabel", class: "class", disabled: "disabled", loading: "loading" }, outputs: { clickEvent: "clickEvent" }, ngImport: i0, template: "<button\n  (click)=\"clickEvent.emit()\"\n  [attr.aria-label]=\"ariaLabel\"\n  [disabled]=\"disabled || loading\"\n  [ngClass]=\"class\"\n  class=\"btn btn-primary\"\n>\n  <div class=\"cx-progress-button-container\">\n    <div *ngIf=\"loading\" class=\"loader-container\">\n      <div class=\"loader\">{{ 'spinner.loading' | cxTranslate }}</div>\n    </div>\n    <ng-content></ng-content>\n  </div>\n</button>\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProgressButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-progress-button', template: "<button\n  (click)=\"clickEvent.emit()\"\n  [attr.aria-label]=\"ariaLabel\"\n  [disabled]=\"disabled || loading\"\n  [ngClass]=\"class\"\n  class=\"btn btn-primary\"\n>\n  <div class=\"cx-progress-button-container\">\n    <div *ngIf=\"loading\" class=\"loader-container\">\n      <div class=\"loader\">{{ 'spinner.loading' | cxTranslate }}</div>\n    </div>\n    <ng-content></ng-content>\n  </div>\n</button>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { ariaLabel: [{
                type: Input
            }], class: [{
                type: Input
            }], disabled: [{
                type: Input
            }], loading: [{
                type: Input
            }], clickEvent: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvcHJvZ3Jlc3MtYnV0dG9uL3Byb2dyZXNzLWJ1dHRvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3Byb2dyZXNzLWJ1dHRvbi9wcm9ncmVzcy1idXR0b24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFLdkUsTUFBTSxPQUFPLHVCQUF1QjtJQWdCbEM7UUFkQSxjQUFTLEdBQVcsRUFBRSxDQUFDO1FBR3ZCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFHbkIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUcxQixZQUFPLEdBQVksS0FBSyxDQUFDO1FBR3pCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBR3BDLGdDQUFnQztJQUNsQyxDQUFDOztvSEFsQlUsdUJBQXVCO3dHQUF2Qix1QkFBdUIsK0xDWHBDLDZaQWNBOzJGREhhLHVCQUF1QjtrQkFKbkMsU0FBUzsrQkFDRSxvQkFBb0I7MEVBSzlCLFNBQVM7c0JBRFIsS0FBSztnQkFJTixLQUFLO3NCQURKLEtBQUs7Z0JBSU4sUUFBUTtzQkFEUCxLQUFLO2dCQUlOLE9BQU87c0JBRE4sS0FBSztnQkFJTixVQUFVO3NCQURULE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtcHJvZ3Jlc3MtYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2dyZXNzLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQnV0dG9uQ29tcG9uZW50IHtcbiAgQElucHV0KClcbiAgYXJpYUxhYmVsOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICBjbGFzczogc3RyaW5nID0gJyc7XG5cbiAgQElucHV0KClcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpXG4gIGNsaWNrRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgY29uc3RydWN0b3JcbiAgfVxufVxuIiwiPGJ1dHRvblxuICAoY2xpY2spPVwiY2xpY2tFdmVudC5lbWl0KClcIlxuICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiXG4gIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBsb2FkaW5nXCJcbiAgW25nQ2xhc3NdPVwiY2xhc3NcIlxuICBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiXG4+XG4gIDxkaXYgY2xhc3M9XCJjeC1wcm9ncmVzcy1idXR0b24tY29udGFpbmVyXCI+XG4gICAgPGRpdiAqbmdJZj1cImxvYWRpbmdcIiBjbGFzcz1cImxvYWRlci1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJsb2FkZXJcIj57eyAnc3Bpbm5lci5sb2FkaW5nJyB8IGN4VHJhbnNsYXRlIH19PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbjwvYnV0dG9uPlxuIl19