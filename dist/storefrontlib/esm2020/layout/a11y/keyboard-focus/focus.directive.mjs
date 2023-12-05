/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, Input } from '@angular/core';
import { LockFocusDirective } from './lock/lock-focus.directive';
import * as i0 from "@angular/core";
import * as i1 from "./services/keyboard-focus.service";
export class FocusDirective extends LockFocusDirective {
    constructor(elementRef, service, renderer) {
        super(elementRef, service, renderer);
        this.elementRef = elementRef;
        this.service = service;
        this.renderer = renderer;
        this.defaultConfig = {};
        this.config = {};
    }
}
FocusDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FocusDirective, deps: [{ token: i0.ElementRef }, { token: i1.KeyboardFocusService }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
FocusDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: FocusDirective, selector: "[cxFocus]", inputs: { config: ["cxFocus", "config"] }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FocusDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxFocus]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.KeyboardFocusService }, { type: i0.Renderer2 }]; }, propDecorators: { config: [{
                type: Input,
                args: ['cxFocus']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvYTExeS9rZXlib2FyZC1mb2N1cy9mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQWMsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXhFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7QUFNakUsTUFBTSxPQUFPLGNBQWUsU0FBUSxrQkFBa0I7SUFLcEQsWUFDWSxVQUFzQixFQUN0QixPQUE2QixFQUM3QixRQUFtQjtRQUU3QixLQUFLLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUozQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQXNCO1FBQzdCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFQckIsa0JBQWEsR0FBZ0IsRUFBRSxDQUFDO1FBRXhCLFdBQU0sR0FBZ0IsRUFBRSxDQUFDO0lBUTNDLENBQUM7OzJHQVhVLGNBQWM7K0ZBQWQsY0FBYzsyRkFBZCxjQUFjO2tCQUgxQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO2lCQUN0Qjs0SkFJbUIsTUFBTTtzQkFBdkIsS0FBSzt1QkFBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb2N1c0NvbmZpZyB9IGZyb20gJy4va2V5Ym9hcmQtZm9jdXMubW9kZWwnO1xuaW1wb3J0IHsgTG9ja0ZvY3VzRGlyZWN0aXZlIH0gZnJvbSAnLi9sb2NrL2xvY2stZm9jdXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IEtleWJvYXJkRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9rZXlib2FyZC1mb2N1cy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2N4Rm9jdXNdJyxcbn0pXG5leHBvcnQgY2xhc3MgRm9jdXNEaXJlY3RpdmUgZXh0ZW5kcyBMb2NrRm9jdXNEaXJlY3RpdmUge1xuICBwcm90ZWN0ZWQgZGVmYXVsdENvbmZpZzogRm9jdXNDb25maWcgPSB7fTtcblxuICBASW5wdXQoJ2N4Rm9jdXMnKSBjb25maWc6IEZvY3VzQ29uZmlnID0ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHNlcnZpY2U6IEtleWJvYXJkRm9jdXNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsIHNlcnZpY2UsIHJlbmRlcmVyKTtcbiAgfVxufVxuIl19