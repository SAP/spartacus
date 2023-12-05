/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, Output, } from '@angular/core';
import { ICON_TYPE } from '../../../cms-components/misc/index';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../../cms-components/misc/icon/icon.component";
import * as i3 from "@spartacus/core";
/**
 * Star rating component can be used to view existing ratings as well
 * as create new ratings. The component can be used for any ratings.
 */
export class StarRatingComponent {
    constructor() {
        this.initialRate = 0;
        this.icon = ICON_TYPE.STAR;
        /**
         * The rating component can be used in disabled mode,
         * so that the interaction is not provided.
         *
         * Defaults to true.
         */
        this.disabled = true;
        /**
         * The rating is used to color the rating stars. It can have a
         * precise number. The rating number is used for a CSS custom property
         * (AKA css variable) value. The actually coloring is done in CSS.
         */
        this.rating = this.initialRate;
        /**
         * Emits the given rating when the user clicks on a star.
         */
        // eslint-disable-next-line @angular-eslint/no-output-native
        this.change = new EventEmitter();
    }
    setRate(value) {
        if (this.disabled) {
            return;
        }
        this.rating = value;
    }
    reset() {
        if (this.disabled) {
            return;
        }
        this.rating = this.initialRate ?? 0;
    }
    saveRate(rating) {
        if (this.disabled) {
            return;
        }
        this.initialRate = rating;
        this.setRate(rating);
        this.change.emit(rating);
    }
}
StarRatingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StarRatingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
StarRatingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StarRatingComponent, selector: "cx-star-rating", inputs: { disabled: "disabled", rating: "rating" }, outputs: { change: "change" }, host: { listeners: { "mouseout": "reset()" }, properties: { "attr.disabled": "this.disabled", "style.--star-fill": "this.rating" } }, ngImport: i0, template: "<cx-icon\n  *ngFor=\"let i of [1, 2, 3, 4, 5]\"\n  [type]=\"icon\"\n  class=\"star\"\n  (mouseover)=\"setRate(i)\"\n  (click)=\"saveRate(i)\"\n  (keydown.space)=\"saveRate(i)\"\n  [attr.tabindex]=\"disabled ? null : 0\"\n  role=\"button\"\n  attr.aria-label=\"{{ 'productReview.addRate' | cxTranslate: { count: i } }}\"\n></cx-icon>\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i2.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StarRatingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-star-rating', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-icon\n  *ngFor=\"let i of [1, 2, 3, 4, 5]\"\n  [type]=\"icon\"\n  class=\"star\"\n  (mouseover)=\"setRate(i)\"\n  (click)=\"saveRate(i)\"\n  (keydown.space)=\"saveRate(i)\"\n  [attr.tabindex]=\"disabled ? null : 0\"\n  role=\"button\"\n  attr.aria-label=\"{{ 'productReview.addRate' | cxTranslate: { count: i } }}\"\n></cx-icon>\n" }]
        }], propDecorators: { disabled: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.disabled']
            }], rating: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['style.--star-fill']
            }], change: [{
                type: Output
            }], reset: [{
                type: HostListener,
                args: ['mouseout']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rhci1yYXRpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9zdGFyLXJhdGluZy9zdGFyLXJhdGluZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3N0YXItcmF0aW5nL3N0YXItcmF0aW5nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7QUFFL0Q7OztHQUdHO0FBTUgsTUFBTSxPQUFPLG1CQUFtQjtJQUxoQztRQU1ZLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRTFCLFNBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBRXRCOzs7OztXQUtHO1FBQ29DLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFFdkQ7Ozs7V0FJRztRQUdILFdBQU0sR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRWxDOztXQUVHO1FBQ0gsNERBQTREO1FBQ2xELFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0tBeUIvQztJQXZCQyxPQUFPLENBQUMsS0FBYTtRQUNuQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUdELEtBQUs7UUFDSCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQWM7UUFDckIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Z0hBbERVLG1CQUFtQjtvR0FBbkIsbUJBQW1CLCtRQzFCaEMsZ1ZBV0E7MkZEZWEsbUJBQW1CO2tCQUwvQixTQUFTOytCQUNFLGdCQUFnQixtQkFFVCx1QkFBdUIsQ0FBQyxNQUFNOzhCQWFSLFFBQVE7c0JBQTlDLEtBQUs7O3NCQUFJLFdBQVc7dUJBQUMsZUFBZTtnQkFTckMsTUFBTTtzQkFGTCxLQUFLOztzQkFDTCxXQUFXO3VCQUFDLG1CQUFtQjtnQkFPdEIsTUFBTTtzQkFBZixNQUFNO2dCQVVQLEtBQUs7c0JBREosWUFBWTt1QkFBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElDT05fVFlQRSB9IGZyb20gJy4uLy4uLy4uL2Ntcy1jb21wb25lbnRzL21pc2MvaW5kZXgnO1xuXG4vKipcbiAqIFN0YXIgcmF0aW5nIGNvbXBvbmVudCBjYW4gYmUgdXNlZCB0byB2aWV3IGV4aXN0aW5nIHJhdGluZ3MgYXMgd2VsbFxuICogYXMgY3JlYXRlIG5ldyByYXRpbmdzLiBUaGUgY29tcG9uZW50IGNhbiBiZSB1c2VkIGZvciBhbnkgcmF0aW5ncy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtc3Rhci1yYXRpbmcnLFxuICB0ZW1wbGF0ZVVybDogJy4vc3Rhci1yYXRpbmcuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgU3RhclJhdGluZ0NvbXBvbmVudCB7XG4gIHByb3RlY3RlZCBpbml0aWFsUmF0ZSA9IDA7XG5cbiAgaWNvbiA9IElDT05fVFlQRS5TVEFSO1xuXG4gIC8qKlxuICAgKiBUaGUgcmF0aW5nIGNvbXBvbmVudCBjYW4gYmUgdXNlZCBpbiBkaXNhYmxlZCBtb2RlLFxuICAgKiBzbyB0aGF0IHRoZSBpbnRlcmFjdGlvbiBpcyBub3QgcHJvdmlkZWQuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIHRydWUuXG4gICAqL1xuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2F0dHIuZGlzYWJsZWQnKSBkaXNhYmxlZCA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSByYXRpbmcgaXMgdXNlZCB0byBjb2xvciB0aGUgcmF0aW5nIHN0YXJzLiBJdCBjYW4gaGF2ZSBhXG4gICAqIHByZWNpc2UgbnVtYmVyLiBUaGUgcmF0aW5nIG51bWJlciBpcyB1c2VkIGZvciBhIENTUyBjdXN0b20gcHJvcGVydHlcbiAgICogKEFLQSBjc3MgdmFyaWFibGUpIHZhbHVlLiBUaGUgYWN0dWFsbHkgY29sb3JpbmcgaXMgZG9uZSBpbiBDU1MuXG4gICAqL1xuICBASW5wdXQoKVxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLi0tc3Rhci1maWxsJylcbiAgcmF0aW5nOiBudW1iZXIgPSB0aGlzLmluaXRpYWxSYXRlO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB0aGUgZ2l2ZW4gcmF0aW5nIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIGEgc3Rhci5cbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8tb3V0cHV0LW5hdGl2ZVxuICBAT3V0cHV0KCkgY2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgc2V0UmF0ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yYXRpbmcgPSB2YWx1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3V0JylcbiAgcmVzZXQoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yYXRpbmcgPSB0aGlzLmluaXRpYWxSYXRlID8/IDA7XG4gIH1cblxuICBzYXZlUmF0ZShyYXRpbmc6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaW5pdGlhbFJhdGUgPSByYXRpbmc7XG4gICAgdGhpcy5zZXRSYXRlKHJhdGluZyk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChyYXRpbmcpO1xuICB9XG59XG4iLCI8Y3gtaWNvblxuICAqbmdGb3I9XCJsZXQgaSBvZiBbMSwgMiwgMywgNCwgNV1cIlxuICBbdHlwZV09XCJpY29uXCJcbiAgY2xhc3M9XCJzdGFyXCJcbiAgKG1vdXNlb3Zlcik9XCJzZXRSYXRlKGkpXCJcbiAgKGNsaWNrKT1cInNhdmVSYXRlKGkpXCJcbiAgKGtleWRvd24uc3BhY2UpPVwic2F2ZVJhdGUoaSlcIlxuICBbYXR0ci50YWJpbmRleF09XCJkaXNhYmxlZCA/IG51bGwgOiAwXCJcbiAgcm9sZT1cImJ1dHRvblwiXG4gIGF0dHIuYXJpYS1sYWJlbD1cInt7ICdwcm9kdWN0UmV2aWV3LmFkZFJhdGUnIHwgY3hUcmFuc2xhdGU6IHsgY291bnQ6IGkgfSB9fVwiXG4+PC9jeC1pY29uPlxuIl19