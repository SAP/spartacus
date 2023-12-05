/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import * as i0 from "@angular/core";
import * as i1 from "../../../../cms-components/misc/icon/icon.component";
import * as i2 from "@spartacus/core";
export class PasswordVisibilityToggleComponent {
    constructor() {
        this.showState = {
            icon: ICON_TYPE.EYE_SLASH,
            inputType: 'text',
            ariaLabel: 'passwordVisibility.hidePassword',
        };
        this.hideState = {
            icon: ICON_TYPE.EYE,
            inputType: 'password',
            ariaLabel: 'passwordVisibility.showPassword',
        };
        this.state = this.hideState;
    }
    /**
     * Toggle the visibility of the text of the input field.
     */
    toggle() {
        this.state =
            this.state === this.hideState ? this.showState : this.hideState;
        this.inputElement.setAttribute('type', this.state.inputType);
    }
}
PasswordVisibilityToggleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PasswordVisibilityToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
PasswordVisibilityToggleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PasswordVisibilityToggleComponent, selector: "cx-password-visibility-toggle", inputs: { inputElement: "inputElement" }, ngImport: i0, template: "<button\n  type=\"button\"\n  (click)=\"toggle()\"\n  [attr.aria-label]=\"state.ariaLabel | cxTranslate\"\n>\n  <span aria-hidden=\"true\">\n    <cx-icon [type]=\"state.icon\"></cx-icon>\n  </span>\n</button>\n", dependencies: [{ kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PasswordVisibilityToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-password-visibility-toggle', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  type=\"button\"\n  (click)=\"toggle()\"\n  [attr.aria-label]=\"state.ariaLabel | cxTranslate\"\n>\n  <span aria-hidden=\"true\">\n    <cx-icon [type]=\"state.icon\"></cx-icon>\n  </span>\n</button>\n" }]
        }], propDecorators: { inputElement: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtdmlzaWJpbGl0eS10b2dnbGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9mb3JtL3Bhc3N3b3JkLXZpc2liaWxpdHktdG9nZ2xlL3Bhc3N3b3JkLXZpc2liaWxpdHktdG9nZ2xlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvZm9ybS9wYXNzd29yZC12aXNpYmlsaXR5LXRvZ2dsZS9wYXNzd29yZC12aXNpYmlsaXR5LXRvZ2dsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlEQUFpRCxDQUFDOzs7O0FBUTVFLE1BQU0sT0FBTyxpQ0FBaUM7SUFMOUM7UUFNWSxjQUFTLEdBQXVCO1lBQ3hDLElBQUksRUFBRSxTQUFTLENBQUMsU0FBUztZQUN6QixTQUFTLEVBQUUsTUFBTTtZQUNqQixTQUFTLEVBQUUsaUNBQWlDO1NBQzdDLENBQUM7UUFDUSxjQUFTLEdBQXVCO1lBQ3hDLElBQUksRUFBRSxTQUFTLENBQUMsR0FBRztZQUNuQixTQUFTLEVBQUUsVUFBVTtZQUNyQixTQUFTLEVBQUUsaUNBQWlDO1NBQzdDLENBQUM7UUFLRixVQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQVV4QjtJQVJDOztPQUVHO0lBQ0gsTUFBTTtRQUNKLElBQUksQ0FBQyxLQUFLO1lBQ1IsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7OzhIQXhCVSxpQ0FBaUM7a0hBQWpDLGlDQUFpQywrR0NmOUMsb05BU0E7MkZETWEsaUNBQWlDO2tCQUw3QyxTQUFTOytCQUNFLCtCQUErQixtQkFFeEIsdUJBQXVCLENBQUMsTUFBTTs4QkFlL0MsWUFBWTtzQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElDT05fVFlQRSB9IGZyb20gJy4uLy4uLy4uLy4uL2Ntcy1jb21wb25lbnRzL21pc2MvaWNvbi9pY29uLm1vZGVsJztcbmltcG9ydCB7IFBhc3N3b3JkSW5wdXRTdGF0ZSB9IGZyb20gJy4vcGFzc3dvcmQtaW5wdXQtdmlzaWJpbGl0eS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXBhc3N3b3JkLXZpc2liaWxpdHktdG9nZ2xlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3Bhc3N3b3JkLXZpc2liaWxpdHktdG9nZ2xlLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZUNvbXBvbmVudCB7XG4gIHByb3RlY3RlZCBzaG93U3RhdGU6IFBhc3N3b3JkSW5wdXRTdGF0ZSA9IHtcbiAgICBpY29uOiBJQ09OX1RZUEUuRVlFX1NMQVNILFxuICAgIGlucHV0VHlwZTogJ3RleHQnLFxuICAgIGFyaWFMYWJlbDogJ3Bhc3N3b3JkVmlzaWJpbGl0eS5oaWRlUGFzc3dvcmQnLFxuICB9O1xuICBwcm90ZWN0ZWQgaGlkZVN0YXRlOiBQYXNzd29yZElucHV0U3RhdGUgPSB7XG4gICAgaWNvbjogSUNPTl9UWVBFLkVZRSxcbiAgICBpbnB1dFR5cGU6ICdwYXNzd29yZCcsXG4gICAgYXJpYUxhYmVsOiAncGFzc3dvcmRWaXNpYmlsaXR5LnNob3dQYXNzd29yZCcsXG4gIH07XG5cbiAgQElucHV0KClcbiAgaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gIHN0YXRlID0gdGhpcy5oaWRlU3RhdGU7XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgdGV4dCBvZiB0aGUgaW5wdXQgZmllbGQuXG4gICAqL1xuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5zdGF0ZSA9XG4gICAgICB0aGlzLnN0YXRlID09PSB0aGlzLmhpZGVTdGF0ZSA/IHRoaXMuc2hvd1N0YXRlIDogdGhpcy5oaWRlU3RhdGU7XG4gICAgdGhpcy5pbnB1dEVsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgdGhpcy5zdGF0ZS5pbnB1dFR5cGUpO1xuICB9XG59XG4iLCI8YnV0dG9uXG4gIHR5cGU9XCJidXR0b25cIlxuICAoY2xpY2spPVwidG9nZ2xlKClcIlxuICBbYXR0ci5hcmlhLWxhYmVsXT1cInN0YXRlLmFyaWFMYWJlbCB8IGN4VHJhbnNsYXRlXCJcbj5cbiAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgPGN4LWljb24gW3R5cGVdPVwic3RhdGUuaWNvblwiPjwvY3gtaWNvbj5cbiAgPC9zcGFuPlxuPC9idXR0b24+XG4iXX0=