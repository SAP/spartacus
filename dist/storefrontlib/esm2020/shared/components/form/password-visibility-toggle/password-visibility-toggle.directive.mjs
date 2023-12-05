/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, } from '@angular/core';
import { PasswordVisibilityToggleComponent } from './password-visibility-toggle.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../../../config/form-config";
/**
 * Directive to bind a PasswordVisibilityToggleDirective to a password input field. This
 * toggle while alternate the appearance of the input between dots and plain text.
 */
export class PasswordVisibilityToggleDirective {
    constructor(winRef, config, elementRef, viewContainerRef, changeDetectorRef) {
        this.winRef = winRef;
        this.config = config;
        this.elementRef = elementRef;
        this.viewContainerRef = viewContainerRef;
        this.changeDetectorRef = changeDetectorRef;
    }
    ngAfterViewInit() {
        if (this.config.form?.passwordVisibilityToggle) {
            this.wrapInput();
            this.insertComponent();
            this.changeDetectorRef.detectChanges();
        }
    }
    insertComponent() {
        const component = this.viewContainerRef.createComponent(PasswordVisibilityToggleComponent);
        component.instance.inputElement = this.elementRef.nativeElement;
        this.inputWrapper?.appendChild(component.location.nativeElement);
    }
    /**
     * We need to wrap the input element in a div to be able to position the toggle button in the right place.
     */
    wrapInput() {
        const input = this.elementRef.nativeElement;
        const parent = input.parentNode;
        this.inputWrapper = this.winRef.document.createElement('div');
        this.inputWrapper.setAttribute('class', 'cx-password-input-wrapper');
        // set the wrapper as child (instead of the element)
        parent.replaceChild(this.inputWrapper, input);
        this.inputWrapper.appendChild(input);
    }
}
PasswordVisibilityToggleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PasswordVisibilityToggleDirective, deps: [{ token: i1.WindowRef }, { token: i2.FormConfig }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
PasswordVisibilityToggleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: PasswordVisibilityToggleDirective, selector: "[cxPasswordVisibilitySwitch][type=\"password\"]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PasswordVisibilityToggleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxPasswordVisibilitySwitch][type="password"]',
                }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }, { type: i2.FormConfig }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtdmlzaWJpbGl0eS10b2dnbGUuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9mb3JtL3Bhc3N3b3JkLXZpc2liaWxpdHktdG9nZ2xlL3Bhc3N3b3JkLXZpc2liaWxpdHktdG9nZ2xlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUNMLFNBQVMsR0FLVixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7OztBQUUzRjs7O0dBR0c7QUFJSCxNQUFNLE9BQU8saUNBQWlDO0lBRzVDLFlBQ1ksTUFBaUIsRUFDakIsTUFBa0IsRUFDbEIsVUFBc0IsRUFDdEIsZ0JBQWtDLEVBQ2xDLGlCQUFvQztRQUpwQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFDbEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFDN0MsQ0FBQztJQUVKLGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQzlDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hDO0lBQ0gsQ0FBQztJQUVTLGVBQWU7UUFDdkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FDckQsaUNBQWlDLENBQ2xDLENBQUM7UUFDRixTQUFTLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUNoRSxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7T0FFRztJQUNPLFNBQVM7UUFDakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDNUMsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztRQUVoQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUVyRSxvREFBb0Q7UUFDcEQsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7OzhIQXhDVSxpQ0FBaUM7a0hBQWpDLGlDQUFpQzsyRkFBakMsaUNBQWlDO2tCQUg3QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwrQ0FBK0M7aUJBQzFEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBBZnRlclZpZXdJbml0LFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbmZpZyB9IGZyb20gJy4uLy4uLy4uL2NvbmZpZy9mb3JtLWNvbmZpZyc7XG5pbXBvcnQgeyBQYXNzd29yZFZpc2liaWxpdHlUb2dnbGVDb21wb25lbnQgfSBmcm9tICcuL3Bhc3N3b3JkLXZpc2liaWxpdHktdG9nZ2xlLmNvbXBvbmVudCc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGJpbmQgYSBQYXNzd29yZFZpc2liaWxpdHlUb2dnbGVEaXJlY3RpdmUgdG8gYSBwYXNzd29yZCBpbnB1dCBmaWVsZC4gVGhpc1xuICogdG9nZ2xlIHdoaWxlIGFsdGVybmF0ZSB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgaW5wdXQgYmV0d2VlbiBkb3RzIGFuZCBwbGFpbiB0ZXh0LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY3hQYXNzd29yZFZpc2liaWxpdHlTd2l0Y2hdW3R5cGU9XCJwYXNzd29yZFwiXScsXG59KVxuZXhwb3J0IGNsYXNzIFBhc3N3b3JkVmlzaWJpbGl0eVRvZ2dsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBwcm90ZWN0ZWQgaW5wdXRXcmFwcGVyOiBIVE1MRWxlbWVudCB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmLFxuICAgIHByb3RlY3RlZCBjb25maWc6IEZvcm1Db25maWcsXG4gICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJvdGVjdGVkIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbmZpZy5mb3JtPy5wYXNzd29yZFZpc2liaWxpdHlUb2dnbGUpIHtcbiAgICAgIHRoaXMud3JhcElucHV0KCk7XG4gICAgICB0aGlzLmluc2VydENvbXBvbmVudCgpO1xuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGluc2VydENvbXBvbmVudCgpOiB2b2lkIHtcbiAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KFxuICAgICAgUGFzc3dvcmRWaXNpYmlsaXR5VG9nZ2xlQ29tcG9uZW50XG4gICAgKTtcbiAgICBjb21wb25lbnQuaW5zdGFuY2UuaW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5pbnB1dFdyYXBwZXI/LmFwcGVuZENoaWxkKGNvbXBvbmVudC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXZSBuZWVkIHRvIHdyYXAgdGhlIGlucHV0IGVsZW1lbnQgaW4gYSBkaXYgdG8gYmUgYWJsZSB0byBwb3NpdGlvbiB0aGUgdG9nZ2xlIGJ1dHRvbiBpbiB0aGUgcmlnaHQgcGxhY2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgd3JhcElucHV0KCk6IHZvaWQge1xuICAgIGNvbnN0IGlucHV0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgcGFyZW50ID0gaW5wdXQucGFyZW50Tm9kZTtcblxuICAgIHRoaXMuaW5wdXRXcmFwcGVyID0gdGhpcy53aW5SZWYuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5pbnB1dFdyYXBwZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjeC1wYXNzd29yZC1pbnB1dC13cmFwcGVyJyk7XG5cbiAgICAvLyBzZXQgdGhlIHdyYXBwZXIgYXMgY2hpbGQgKGluc3RlYWQgb2YgdGhlIGVsZW1lbnQpXG4gICAgcGFyZW50LnJlcGxhY2VDaGlsZCh0aGlzLmlucHV0V3JhcHBlciwgaW5wdXQpO1xuICAgIHRoaXMuaW5wdXRXcmFwcGVyLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgfVxufVxuIl19