/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { BaseMessageComponent } from '../base-message.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/storefront";
import * as i3 from "@spartacus/core";
export class NotificationMessageComponent extends BaseMessageComponent {
    constructor() {
        super(...arguments);
        this.closeIcon = ICON_TYPE.CLOSE;
    }
}
NotificationMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotificationMessageComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
NotificationMessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: NotificationMessageComponent, selector: "cx-org-notification", usesInheritance: true, ngImport: i0, template: "<div\n  class=\"inner\"\n  [cxFocus]=\"{ autofocus: true, focusOnEscape: true }\"\n  (esc)=\"close()\"\n>\n  <cx-icon *ngIf=\"messageIcon\" [type]=\"messageIcon\"></cx-icon>\n  <p>{{ message | cxTranslate }}</p>\n  <button class=\"close\" (click)=\"close()\" type=\"button\">\n    <cx-icon [type]=\"closeIcon\"></cx-icon>\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i2.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotificationMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-notification', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"inner\"\n  [cxFocus]=\"{ autofocus: true, focusOnEscape: true }\"\n  (esc)=\"close()\"\n>\n  <cx-icon *ngIf=\"messageIcon\" [type]=\"messageIcon\"></cx-icon>\n  <p>{{ message | cxTranslate }}</p>\n  <button class=\"close\" (click)=\"close()\" type=\"button\">\n    <cx-icon [type]=\"closeIcon\"></cx-icon>\n  </button>\n</div>\n" }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLW1lc3NhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9tZXNzYWdlL25vdGlmaWNhdGlvbi9ub3RpZmljYXRpb24tbWVzc2FnZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL21lc3NhZ2Uvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi1tZXNzYWdlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7QUFPakUsTUFBTSxPQUFPLDRCQUE2QixTQUFRLG9CQUFvQjtJQUx0RTs7UUFNRSxjQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztLQUM3Qjs7eUhBRlksNEJBQTRCOzZHQUE1Qiw0QkFBNEIsa0ZDZnpDLDBWQVdBOzJGRElhLDRCQUE0QjtrQkFMeEMsU0FBUzsrQkFDRSxxQkFBcUIsbUJBRWQsdUJBQXVCLENBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElDT05fVFlQRSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBCYXNlTWVzc2FnZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtbWVzc2FnZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctbm90aWZpY2F0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25vdGlmaWNhdGlvbi1tZXNzYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbk1lc3NhZ2VDb21wb25lbnQgZXh0ZW5kcyBCYXNlTWVzc2FnZUNvbXBvbmVudCB7XG4gIGNsb3NlSWNvbiA9IElDT05fVFlQRS5DTE9TRTtcbn1cbiIsIjxkaXZcbiAgY2xhc3M9XCJpbm5lclwiXG4gIFtjeEZvY3VzXT1cInsgYXV0b2ZvY3VzOiB0cnVlLCBmb2N1c09uRXNjYXBlOiB0cnVlIH1cIlxuICAoZXNjKT1cImNsb3NlKClcIlxuPlxuICA8Y3gtaWNvbiAqbmdJZj1cIm1lc3NhZ2VJY29uXCIgW3R5cGVdPVwibWVzc2FnZUljb25cIj48L2N4LWljb24+XG4gIDxwPnt7IG1lc3NhZ2UgfCBjeFRyYW5zbGF0ZSB9fTwvcD5cbiAgPGJ1dHRvbiBjbGFzcz1cImNsb3NlXCIgKGNsaWNrKT1cImNsb3NlKClcIiB0eXBlPVwiYnV0dG9uXCI+XG4gICAgPGN4LWljb24gW3R5cGVdPVwiY2xvc2VJY29uXCI+PC9jeC1pY29uPlxuICA8L2J1dHRvbj5cbjwvZGl2PlxuIl19