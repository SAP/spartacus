/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, Input, } from '@angular/core';
import * as i0 from "@angular/core";
export class NgSelectA11yDirective {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    ngAfterViewInit() {
        const divCombobox = this.elementRef.nativeElement.querySelector('[role="combobox"]');
        const ariaLabel = this.cxNgSelectA11y.ariaLabel;
        const elementId = this.elementRef.nativeElement.id;
        const ariaControls = this.cxNgSelectA11y.ariaControls ?? elementId;
        if (ariaLabel) {
            this.renderer.setAttribute(divCombobox, 'aria-label', ariaLabel);
        }
        if (ariaControls) {
            this.renderer.setAttribute(divCombobox, 'aria-controls', ariaControls);
        }
    }
}
NgSelectA11yDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NgSelectA11yDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
NgSelectA11yDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: NgSelectA11yDirective, selector: "[cxNgSelectA11y]", inputs: { cxNgSelectA11y: "cxNgSelectA11y" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NgSelectA11yDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxNgSelectA11y]',
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { cxNgSelectA11y: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctc2VsZWN0LWExMXkuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9uZy1zZWxlY3QtYTExeS9uZy1zZWxlY3QtYTExeS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFFTCxTQUFTLEVBRVQsS0FBSyxHQUVOLE1BQU0sZUFBZSxDQUFDOztBQUt2QixNQUFNLE9BQU8scUJBQXFCO0lBUWhDLFlBQW9CLFFBQW1CLEVBQVUsVUFBc0I7UUFBbkQsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0lBRTNFLGVBQWU7UUFDYixNQUFNLFdBQVcsR0FDZixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVuRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztRQUNoRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUM7UUFDbkQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLElBQUksU0FBUyxDQUFDO1FBRW5FLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNsRTtRQUVELElBQUksWUFBWSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDeEU7SUFDSCxDQUFDOztrSEF6QlUscUJBQXFCO3NHQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFIakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2lCQUM3Qjt5SEFPVSxjQUFjO3NCQUF0QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgUmVuZGVyZXIyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2N4TmdTZWxlY3RBMTF5XScsXG59KVxuZXhwb3J0IGNsYXNzIE5nU2VsZWN0QTExeURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAvKipcbiAgICogVXNlIGRpcmVjdGl2ZSB0byBiaW5kIGFyaWEgYXR0cmlidXRlIHRvIGlubmVyIGVsZW1lbnQgb2Ygbmctc2VsZWN0XG4gICAqIEFuZ3VsYXIgY29tcG9uZW50IGZvciBhY2Nlc3NpYmlsaXR5IGNvbXBsaWFuY2UuIElmIG5nLXNlbGVjdCBjb250cm9scyBpdHNlbGZcbiAgICogYXJpYUNvbnRyb2xzIGlzIG5vdCBuZWVkZWQsIGluc3RlYWQgYmluZCBhIHNwZWNpZmljIGlkIHRvIHRoZSA8bmctc2VsZWN0PiBlbGVtZW50LlxuICAgKi9cbiAgQElucHV0KCkgY3hOZ1NlbGVjdEExMXk6IHsgYXJpYUxhYmVsPzogc3RyaW5nOyBhcmlhQ29udHJvbHM/OiBzdHJpbmcgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZGl2Q29tYm9ib3ggPVxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignW3JvbGU9XCJjb21ib2JveFwiXScpO1xuXG4gICAgY29uc3QgYXJpYUxhYmVsID0gdGhpcy5jeE5nU2VsZWN0QTExeS5hcmlhTGFiZWw7XG4gICAgY29uc3QgZWxlbWVudElkID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaWQ7XG4gICAgY29uc3QgYXJpYUNvbnRyb2xzID0gdGhpcy5jeE5nU2VsZWN0QTExeS5hcmlhQ29udHJvbHMgPz8gZWxlbWVudElkO1xuXG4gICAgaWYgKGFyaWFMYWJlbCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoZGl2Q29tYm9ib3gsICdhcmlhLWxhYmVsJywgYXJpYUxhYmVsKTtcbiAgICB9XG5cbiAgICBpZiAoYXJpYUNvbnRyb2xzKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShkaXZDb21ib2JveCwgJ2FyaWEtY29udHJvbHMnLCBhcmlhQ29udHJvbHMpO1xuICAgIH1cbiAgfVxufVxuIl19