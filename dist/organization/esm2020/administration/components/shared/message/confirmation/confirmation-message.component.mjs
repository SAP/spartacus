/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID, } from '@angular/core';
import { BaseMessageComponent } from '../base-message.component';
import * as i0 from "@angular/core";
import * as i1 from "../message.model";
import * as i2 from "../services/message.service";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/storefront";
import * as i5 from "@spartacus/core";
/**
 * Renders a confirmation message and cancel/confirm button in the message component.
 */
export class ConfirmationMessageComponent extends BaseMessageComponent {
    constructor(data, platformId, messageService) {
        super(data, platformId);
        this.data = data;
        this.platformId = platformId;
        this.messageService = messageService;
        this.cancelText = {
            key: 'organization.confirmation.cancel',
        };
        this.confirmText = {
            key: 'organization.confirmation.confirm',
        };
    }
    ngOnInit() {
        super.ngOnInit();
        this.cancelText = this.messageData.cancel ?? this.cancelText;
        this.confirmText = this.messageData.confirm ?? this.confirmText;
    }
    /**
     * Emits a confirmation event to the data events.
     *
     * The original author of the event message or other parties can observe
     * the event data.
     */
    confirm() {
        this.data.events?.next({ confirm: true });
    }
}
ConfirmationMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfirmationMessageComponent, deps: [{ token: i1.MessageData }, { token: PLATFORM_ID }, { token: i2.MessageService }], target: i0.ɵɵFactoryTarget.Component });
ConfirmationMessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfirmationMessageComponent, selector: "cx-org-confirmation", usesInheritance: true, ngImport: i0, template: "<div class=\"inner\" [cxFocus]=\"{ focusOnEscape: true }\" (esc)=\"close()\">\n  <p class=\"messageTitle\" *ngIf=\"messageTitle\">\n    {{ messageTitle | cxTranslate }}\n  </p>\n  <div class=\"message\">\n    <cx-icon *ngIf=\"messageIcon\" [type]=\"messageIcon\"></cx-icon>\n    <p>\n      {{ message | cxTranslate }}\n    </p>\n  </div>\n  <div class=\"actions\" [cxFocus]=\"{ autofocus: 'button.primary' }\">\n    <button class=\"button cancel\" (click)=\"close()\">\n      {{ cancelText | cxTranslate }}\n    </button>\n\n    <button class=\"button primary confirm\" (click)=\"confirm()\">\n      {{ confirmText | cxTranslate }}\n    </button>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i4.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i5.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfirmationMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-confirmation', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"inner\" [cxFocus]=\"{ focusOnEscape: true }\" (esc)=\"close()\">\n  <p class=\"messageTitle\" *ngIf=\"messageTitle\">\n    {{ messageTitle | cxTranslate }}\n  </p>\n  <div class=\"message\">\n    <cx-icon *ngIf=\"messageIcon\" [type]=\"messageIcon\"></cx-icon>\n    <p>\n      {{ message | cxTranslate }}\n    </p>\n  </div>\n  <div class=\"actions\" [cxFocus]=\"{ autofocus: 'button.primary' }\">\n    <button class=\"button cancel\" (click)=\"close()\">\n      {{ cancelText | cxTranslate }}\n    </button>\n\n    <button class=\"button primary confirm\" (click)=\"confirm()\">\n      {{ confirmText | cxTranslate }}\n    </button>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.MessageData }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i2.MessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uLW1lc3NhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL3NoYXJlZC9tZXNzYWdlL2NvbmZpcm1hdGlvbi9jb25maXJtYXRpb24tbWVzc2FnZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvc2hhcmVkL21lc3NhZ2UvY29uZmlybWF0aW9uL2NvbmZpcm1hdGlvbi1tZXNzYWdlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxNQUFNLEVBRU4sV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7Ozs7O0FBS2pFOztHQUVHO0FBTUgsTUFBTSxPQUFPLDRCQUNYLFNBQVEsb0JBQW9CO0lBVTVCLFlBQ1ksSUFBMEMsRUFDckIsVUFBZSxFQUNwQyxjQUE4QjtRQUV4QyxLQUFLLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBSmQsU0FBSSxHQUFKLElBQUksQ0FBc0M7UUFDckIsZUFBVSxHQUFWLFVBQVUsQ0FBSztRQUNwQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFWMUMsZUFBVSxHQUFpQjtZQUN6QixHQUFHLEVBQUUsa0NBQWtDO1NBQ3hDLENBQUM7UUFDRixnQkFBVyxHQUFpQjtZQUMxQixHQUFHLEVBQUUsbUNBQW1DO1NBQ3pDLENBQUM7SUFRRixDQUFDO0lBRUQsUUFBUTtRQUNOLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ2xFLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNILE9BQU87UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDOzt5SEFoQ1UsNEJBQTRCLDZDQWE3QixXQUFXOzZHQWJWLDRCQUE0QixrRkMzQnpDLDRwQkFvQkE7MkZET2EsNEJBQTRCO2tCQUx4QyxTQUFTOytCQUNFLHFCQUFxQixtQkFFZCx1QkFBdUIsQ0FBQyxNQUFNOzswQkFlNUMsTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBPbkluaXQsXG4gIFBMQVRGT1JNX0lELFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0YWJsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBCYXNlTWVzc2FnZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtbWVzc2FnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZURhdGEgfSBmcm9tICcuLi9tZXNzYWdlLm1vZGVsJztcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbWVzc2FnZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpcm1hdGlvbk1lc3NhZ2VEYXRhIH0gZnJvbSAnLi9jb25maXJtYXRpb24tbWVzc2FnZS5tb2RlbCc7XG5cbi8qKlxuICogUmVuZGVycyBhIGNvbmZpcm1hdGlvbiBtZXNzYWdlIGFuZCBjYW5jZWwvY29uZmlybSBidXR0b24gaW4gdGhlIG1lc3NhZ2UgY29tcG9uZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1vcmctY29uZmlybWF0aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpcm1hdGlvbi1tZXNzYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1hdGlvbk1lc3NhZ2VDb21wb25lbnRcbiAgZXh0ZW5kcyBCYXNlTWVzc2FnZUNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdFxue1xuICBjYW5jZWxUZXh0OiBUcmFuc2xhdGFibGUgPSB7XG4gICAga2V5OiAnb3JnYW5pemF0aW9uLmNvbmZpcm1hdGlvbi5jYW5jZWwnLFxuICB9O1xuICBjb25maXJtVGV4dDogVHJhbnNsYXRhYmxlID0ge1xuICAgIGtleTogJ29yZ2FuaXphdGlvbi5jb25maXJtYXRpb24uY29uZmlybScsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGRhdGE6IE1lc3NhZ2VEYXRhPENvbmZpcm1hdGlvbk1lc3NhZ2VEYXRhPixcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcm90ZWN0ZWQgcGxhdGZvcm1JZDogYW55LFxuICAgIHByb3RlY3RlZCBtZXNzYWdlU2VydmljZTogTWVzc2FnZVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoZGF0YSwgcGxhdGZvcm1JZCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIHRoaXMuY2FuY2VsVGV4dCA9IHRoaXMubWVzc2FnZURhdGEuY2FuY2VsID8/IHRoaXMuY2FuY2VsVGV4dDtcbiAgICB0aGlzLmNvbmZpcm1UZXh0ID0gdGhpcy5tZXNzYWdlRGF0YS5jb25maXJtID8/IHRoaXMuY29uZmlybVRleHQ7XG4gIH1cbiAgLyoqXG4gICAqIEVtaXRzIGEgY29uZmlybWF0aW9uIGV2ZW50IHRvIHRoZSBkYXRhIGV2ZW50cy5cbiAgICpcbiAgICogVGhlIG9yaWdpbmFsIGF1dGhvciBvZiB0aGUgZXZlbnQgbWVzc2FnZSBvciBvdGhlciBwYXJ0aWVzIGNhbiBvYnNlcnZlXG4gICAqIHRoZSBldmVudCBkYXRhLlxuICAgKi9cbiAgY29uZmlybSgpIHtcbiAgICB0aGlzLmRhdGEuZXZlbnRzPy5uZXh0KHsgY29uZmlybTogdHJ1ZSB9KTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImlubmVyXCIgW2N4Rm9jdXNdPVwieyBmb2N1c09uRXNjYXBlOiB0cnVlIH1cIiAoZXNjKT1cImNsb3NlKClcIj5cbiAgPHAgY2xhc3M9XCJtZXNzYWdlVGl0bGVcIiAqbmdJZj1cIm1lc3NhZ2VUaXRsZVwiPlxuICAgIHt7IG1lc3NhZ2VUaXRsZSB8IGN4VHJhbnNsYXRlIH19XG4gIDwvcD5cbiAgPGRpdiBjbGFzcz1cIm1lc3NhZ2VcIj5cbiAgICA8Y3gtaWNvbiAqbmdJZj1cIm1lc3NhZ2VJY29uXCIgW3R5cGVdPVwibWVzc2FnZUljb25cIj48L2N4LWljb24+XG4gICAgPHA+XG4gICAgICB7eyBtZXNzYWdlIHwgY3hUcmFuc2xhdGUgfX1cbiAgICA8L3A+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiYWN0aW9uc1wiIFtjeEZvY3VzXT1cInsgYXV0b2ZvY3VzOiAnYnV0dG9uLnByaW1hcnknIH1cIj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGNhbmNlbFwiIChjbGljayk9XCJjbG9zZSgpXCI+XG4gICAgICB7eyBjYW5jZWxUZXh0IHwgY3hUcmFuc2xhdGUgfX1cbiAgICA8L2J1dHRvbj5cblxuICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gcHJpbWFyeSBjb25maXJtXCIgKGNsaWNrKT1cImNvbmZpcm0oKVwiPlxuICAgICAge3sgY29uZmlybVRleHQgfCBjeFRyYW5zbGF0ZSB9fVxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19