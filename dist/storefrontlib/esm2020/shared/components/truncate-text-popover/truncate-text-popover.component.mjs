/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../popover/popover.directive";
import * as i3 from "@spartacus/core";
import * as i4 from "./truncate.pipe";
export class TruncateTextPopoverComponent {
    constructor() {
        /**
         * The maximum length of the characters after which the text will be truncated
         */
        this.charactersLimit = 100;
    }
    get isTruncated() {
        return this.content.length > +this.charactersLimit;
    }
}
TruncateTextPopoverComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncateTextPopoverComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TruncateTextPopoverComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: TruncateTextPopoverComponent, selector: "cx-truncate-text-popover", inputs: { content: "content", charactersLimit: "charactersLimit", customClass: "customClass" }, ngImport: i0, template: "<ng-container>\n  <ng-container>\n    <span class=\"truncated-text\" [ngClass]=\"customClass\">\n      {{ content | cxTruncate: [charactersLimit] }}\n    </span>\n  </ng-container>\n\n  <ng-template #fullText>\n    {{ content }}\n  </ng-template>\n\n  <button\n    *ngIf=\"isTruncated\"\n    [cxPopover]=\"fullText\"\n    [cxPopoverOptions]=\"{\n      placement: 'auto',\n      appendToBody: true,\n      displayCloseButton: true\n    }\"\n    class=\"ml-1 link cx-action-link\"\n  >\n    {{ 'common.more' | cxTranslate }}\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.PopoverDirective, selector: "[cxPopover]", inputs: ["cxPopover", "cxPopoverOptions"], outputs: ["openPopover", "closePopover"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i4.TruncatePipe, name: "cxTruncate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TruncateTextPopoverComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-truncate-text-popover', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container>\n  <ng-container>\n    <span class=\"truncated-text\" [ngClass]=\"customClass\">\n      {{ content | cxTruncate: [charactersLimit] }}\n    </span>\n  </ng-container>\n\n  <ng-template #fullText>\n    {{ content }}\n  </ng-template>\n\n  <button\n    *ngIf=\"isTruncated\"\n    [cxPopover]=\"fullText\"\n    [cxPopoverOptions]=\"{\n      placement: 'auto',\n      appendToBody: true,\n      displayCloseButton: true\n    }\"\n    class=\"ml-1 link cx-action-link\"\n  >\n    {{ 'common.more' | cxTranslate }}\n  </button>\n</ng-container>\n" }]
        }], propDecorators: { content: [{
                type: Input
            }], charactersLimit: [{
                type: Input
            }], customClass: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1bmNhdGUtdGV4dC1wb3BvdmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvdHJ1bmNhdGUtdGV4dC1wb3BvdmVyL3RydW5jYXRlLXRleHQtcG9wb3Zlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL3NoYXJlZC9jb21wb25lbnRzL3RydW5jYXRlLXRleHQtcG9wb3Zlci90cnVuY2F0ZS10ZXh0LXBvcG92ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFPMUUsTUFBTSxPQUFPLDRCQUE0QjtJQUx6QztRQVdFOztXQUVHO1FBQ00sb0JBQWUsR0FBVyxHQUFHLENBQUM7S0FPeEM7SUFIQyxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNyRCxDQUFDOzt5SEFmVSw0QkFBNEI7NkdBQTVCLDRCQUE0QixnS0NiekMsNGlCQXdCQTsyRkRYYSw0QkFBNEI7a0JBTHhDLFNBQVM7K0JBQ0UsMEJBQTBCLG1CQUVuQix1QkFBdUIsQ0FBQyxNQUFNOzhCQU10QyxPQUFPO3NCQUFmLEtBQUs7Z0JBS0csZUFBZTtzQkFBdkIsS0FBSztnQkFFRyxXQUFXO3NCQUFuQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtdHJ1bmNhdGUtdGV4dC1wb3BvdmVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RydW5jYXRlLXRleHQtcG9wb3Zlci5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBUcnVuY2F0ZVRleHRQb3BvdmVyQ29tcG9uZW50IHtcbiAgLyoqXG4gICAqIFN0cmluZyB0byBiZSByZW5kZXJlZCBpbnNpZGUgcG9wb3ZlciB3cmFwcGVyIGNvbXBvbmVudC5cbiAgICovXG4gIEBJbnB1dCgpIGNvbnRlbnQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIG1heGltdW0gbGVuZ3RoIG9mIHRoZSBjaGFyYWN0ZXJzIGFmdGVyIHdoaWNoIHRoZSB0ZXh0IHdpbGwgYmUgdHJ1bmNhdGVkXG4gICAqL1xuICBASW5wdXQoKSBjaGFyYWN0ZXJzTGltaXQ6IG51bWJlciA9IDEwMDtcblxuICBASW5wdXQoKSBjdXN0b21DbGFzcz86IHN0cmluZztcblxuICBnZXQgaXNUcnVuY2F0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29udGVudC5sZW5ndGggPiArdGhpcy5jaGFyYWN0ZXJzTGltaXQ7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXI+XG4gIDxuZy1jb250YWluZXI+XG4gICAgPHNwYW4gY2xhc3M9XCJ0cnVuY2F0ZWQtdGV4dFwiIFtuZ0NsYXNzXT1cImN1c3RvbUNsYXNzXCI+XG4gICAgICB7eyBjb250ZW50IHwgY3hUcnVuY2F0ZTogW2NoYXJhY3RlcnNMaW1pdF0gfX1cbiAgICA8L3NwYW4+XG4gIDwvbmctY29udGFpbmVyPlxuXG4gIDxuZy10ZW1wbGF0ZSAjZnVsbFRleHQ+XG4gICAge3sgY29udGVudCB9fVxuICA8L25nLXRlbXBsYXRlPlxuXG4gIDxidXR0b25cbiAgICAqbmdJZj1cImlzVHJ1bmNhdGVkXCJcbiAgICBbY3hQb3BvdmVyXT1cImZ1bGxUZXh0XCJcbiAgICBbY3hQb3BvdmVyT3B0aW9uc109XCJ7XG4gICAgICBwbGFjZW1lbnQ6ICdhdXRvJyxcbiAgICAgIGFwcGVuZFRvQm9keTogdHJ1ZSxcbiAgICAgIGRpc3BsYXlDbG9zZUJ1dHRvbjogdHJ1ZVxuICAgIH1cIlxuICAgIGNsYXNzPVwibWwtMSBsaW5rIGN4LWFjdGlvbi1saW5rXCJcbiAgPlxuICAgIHt7ICdjb21tb24ubW9yZScgfCBjeFRyYW5zbGF0ZSB9fVxuICA8L2J1dHRvbj5cbjwvbmctY29udGFpbmVyPlxuIl19