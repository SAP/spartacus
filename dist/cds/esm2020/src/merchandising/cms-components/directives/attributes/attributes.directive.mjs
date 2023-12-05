/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, Input, } from '@angular/core';
import * as i0 from "@angular/core";
export class AttributesDirective {
    set cxAttributesNamePrefix(attributesNamePrefix) {
        this._attributesNamePrefix = attributesNamePrefix;
    }
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    ngOnChanges() {
        if (this.cxAttributes) {
            for (const attributeName in this.cxAttributes) {
                if (this.cxAttributes.hasOwnProperty(attributeName)) {
                    const attributeValue = this.cxAttributes[attributeName];
                    if (attributeValue) {
                        const _attributeName = this._attributesNamePrefix
                            ? `${this._attributesNamePrefix}-${attributeName}`
                            : attributeName;
                        this.renderer.setAttribute(this.elementRef.nativeElement, _attributeName, attributeValue);
                    }
                }
            }
        }
    }
}
AttributesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AttributesDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
AttributesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: AttributesDirective, selector: "[cxAttributes]", inputs: { cxAttributes: "cxAttributes", cxAttributesNamePrefix: "cxAttributesNamePrefix" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AttributesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxAttributes]',
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { cxAttributes: [{
                type: Input
            }], cxAttributesNamePrefix: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlcy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2Nkcy9zcmMvbWVyY2hhbmRpc2luZy9jbXMtY29tcG9uZW50cy9kaXJlY3RpdmVzL2F0dHJpYnV0ZXMvYXR0cmlidXRlcy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBRVQsS0FBSyxHQUdOLE1BQU0sZUFBZSxDQUFDOztBQUt2QixNQUFNLE9BQU8sbUJBQW1CO0lBSTlCLElBQWEsc0JBQXNCLENBQUMsb0JBQTRCO1FBQzlELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxvQkFBb0IsQ0FBQztJQUNwRCxDQUFDO0lBRUQsWUFBb0IsUUFBbUIsRUFBVSxVQUFzQjtRQUFuRCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7SUFFM0UsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixLQUFLLE1BQU0sYUFBYSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQzdDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQUU7b0JBQ25ELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3hELElBQUksY0FBYyxFQUFFO3dCQUNsQixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMscUJBQXFCOzRCQUMvQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMscUJBQXFCLElBQUksYUFBYSxFQUFFOzRCQUNsRCxDQUFDLENBQUMsYUFBYSxDQUFDO3dCQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQzdCLGNBQWMsRUFDZCxjQUFjLENBQ2YsQ0FBQztxQkFDSDtpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDOztnSEE1QlUsbUJBQW1CO29HQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFIL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUMzQjt5SEFFVSxZQUFZO3NCQUFwQixLQUFLO2dCQUdPLHNCQUFzQjtzQkFBbEMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2N4QXR0cmlidXRlc10nLFxufSlcbmV4cG9ydCBjbGFzcyBBdHRyaWJ1dGVzRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgY3hBdHRyaWJ1dGVzOiB7IFthdHRyaWJ1dGU6IHN0cmluZ106IGFueSB9O1xuXG4gIHByaXZhdGUgX2F0dHJpYnV0ZXNOYW1lUHJlZml4OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNldCBjeEF0dHJpYnV0ZXNOYW1lUHJlZml4KGF0dHJpYnV0ZXNOYW1lUHJlZml4OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9hdHRyaWJ1dGVzTmFtZVByZWZpeCA9IGF0dHJpYnV0ZXNOYW1lUHJlZml4O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3hBdHRyaWJ1dGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IGF0dHJpYnV0ZU5hbWUgaW4gdGhpcy5jeEF0dHJpYnV0ZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuY3hBdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGF0dHJpYnV0ZU5hbWUpKSB7XG4gICAgICAgICAgY29uc3QgYXR0cmlidXRlVmFsdWUgPSB0aGlzLmN4QXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXTtcbiAgICAgICAgICBpZiAoYXR0cmlidXRlVmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IF9hdHRyaWJ1dGVOYW1lID0gdGhpcy5fYXR0cmlidXRlc05hbWVQcmVmaXhcbiAgICAgICAgICAgICAgPyBgJHt0aGlzLl9hdHRyaWJ1dGVzTmFtZVByZWZpeH0tJHthdHRyaWJ1dGVOYW1lfWBcbiAgICAgICAgICAgICAgOiBhdHRyaWJ1dGVOYW1lO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgICBfYXR0cmlidXRlTmFtZSxcbiAgICAgICAgICAgICAgYXR0cmlidXRlVmFsdWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=