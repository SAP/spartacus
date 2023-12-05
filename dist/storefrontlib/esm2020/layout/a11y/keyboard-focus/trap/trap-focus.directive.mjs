/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, HostListener } from '@angular/core';
import { TabFocusDirective } from '../tab/tab-focus.directive';
import * as i0 from "@angular/core";
import * as i1 from "./trap-focus.service";
/**
 * Directive that keeps the focus inside the focusable child elements,
 * also known as a _focus trap_.
 */
export class TrapFocusDirective extends TabFocusDirective {
    constructor(elementRef, service) {
        super(elementRef, service);
        this.elementRef = elementRef;
        this.service = service;
        this.defaultConfig = { trap: true };
        // @Input('cxTrapFocus')
        this.config = {};
        this.handleTrapDown = (event) => {
            if (!!this.config.trap) {
                this.moveFocus(event, 1 /* MOVE_FOCUS.NEXT */);
            }
        };
        this.handleTrapUp = (event) => {
            if (!!this.config.trap) {
                this.moveFocus(event, -1 /* MOVE_FOCUS.PREV */);
            }
        };
    }
    /**
     * Moves the focus of the element reference up or down, depending on the increment.
     * The focus of the element is trapped to avoid it from going out of the group.
     *
     * @param event UIEvent that is used to get the target element. The event is blocked
     *   from standard execution and further bubbling.
     * @param increment indicates whether the next or previous is focussed.
     */
    moveFocus(event, increment) {
        if (this.service.hasFocusableChildren(this.host)) {
            this.service.moveFocus(this.host, this.config, increment, event);
        }
    }
}
TrapFocusDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrapFocusDirective, deps: [{ token: i0.ElementRef }, { token: i1.TrapFocusService }], target: i0.ɵɵFactoryTarget.Directive });
TrapFocusDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: TrapFocusDirective, host: { listeners: { "keydown.arrowdown": "handleTrapDown($event)", "keydown.tab": "handleTrapDown($event)", "keydown.arrowup": "handleTrapUp($event)", "keydown.shift.tab": "handleTrapUp($event)" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrapFocusDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.TrapFocusService }]; }, propDecorators: { handleTrapDown: [{
                type: HostListener,
                args: ['keydown.arrowdown', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.tab', ['$event']]
            }], handleTrapUp: [{
                type: HostListener,
                args: ['keydown.arrowup', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.shift.tab', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhcC1mb2N1cy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL3RyYXAvdHJhcC1mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRTVFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7QUFHL0Q7OztHQUdHO0FBRUgsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGlCQUFpQjtJQXNCdkQsWUFDWSxVQUFzQixFQUN0QixPQUF5QjtRQUVuQyxLQUFLLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBSGpCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUF2QjNCLGtCQUFhLEdBQW9CLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1FBRTFELHdCQUF3QjtRQUNkLFdBQU0sR0FBb0IsRUFBRSxDQUFDO1FBSXZDLG1CQUFjLEdBQUcsQ0FBQyxLQUFvQixFQUFFLEVBQUU7WUFDeEMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSywwQkFBa0IsQ0FBQzthQUN4QztRQUNILENBQUMsQ0FBQztRQUlGLGlCQUFZLEdBQUcsQ0FBQyxLQUFvQixFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSywyQkFBa0IsQ0FBQzthQUN4QztRQUNILENBQUMsQ0FBQztJQU9GLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ08sU0FBUyxDQUFDLEtBQWMsRUFBRSxTQUFpQjtRQUNuRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUNwQixJQUFJLENBQUMsSUFBSSxFQUNULElBQUksQ0FBQyxNQUFNLEVBQ1gsU0FBUyxFQUNULEtBQWdCLENBQ2pCLENBQUM7U0FDSDtJQUNILENBQUM7OytHQTlDVSxrQkFBa0I7bUdBQWxCLGtCQUFrQjsyRkFBbEIsa0JBQWtCO2tCQUQ5QixTQUFTO2dJQVNSLGNBQWM7c0JBRmIsWUFBWTt1QkFBQyxtQkFBbUIsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7c0JBQzVDLFlBQVk7dUJBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVN2QyxZQUFZO3NCQUZYLFlBQVk7dUJBQUMsaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUM7O3NCQUMxQyxZQUFZO3VCQUFDLG1CQUFtQixFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTU9WRV9GT0NVUywgVHJhcEZvY3VzQ29uZmlnIH0gZnJvbSAnLi4va2V5Ym9hcmQtZm9jdXMubW9kZWwnO1xuaW1wb3J0IHsgVGFiRm9jdXNEaXJlY3RpdmUgfSBmcm9tICcuLi90YWIvdGFiLWZvY3VzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUcmFwRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi90cmFwLWZvY3VzLnNlcnZpY2UnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB0aGF0IGtlZXBzIHRoZSBmb2N1cyBpbnNpZGUgdGhlIGZvY3VzYWJsZSBjaGlsZCBlbGVtZW50cyxcbiAqIGFsc28ga25vd24gYXMgYSBfZm9jdXMgdHJhcF8uXG4gKi9cbkBEaXJlY3RpdmUoKSAvLyBzZWxlY3RvcjogJ1tjeFRyYXBGb2N1c10nXG5leHBvcnQgY2xhc3MgVHJhcEZvY3VzRGlyZWN0aXZlIGV4dGVuZHMgVGFiRm9jdXNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcm90ZWN0ZWQgZGVmYXVsdENvbmZpZzogVHJhcEZvY3VzQ29uZmlnID0geyB0cmFwOiB0cnVlIH07XG5cbiAgLy8gQElucHV0KCdjeFRyYXBGb2N1cycpXG4gIHByb3RlY3RlZCBjb25maWc6IFRyYXBGb2N1c0NvbmZpZyA9IHt9O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uYXJyb3dkb3duJywgWyckZXZlbnQnXSlcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi50YWInLCBbJyRldmVudCddKVxuICBoYW5kbGVUcmFwRG93biA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIGlmICghIXRoaXMuY29uZmlnLnRyYXApIHtcbiAgICAgIHRoaXMubW92ZUZvY3VzKGV2ZW50LCBNT1ZFX0ZPQ1VTLk5FWFQpO1xuICAgIH1cbiAgfTtcblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmFycm93dXAnLCBbJyRldmVudCddKVxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLnNoaWZ0LnRhYicsIFsnJGV2ZW50J10pXG4gIGhhbmRsZVRyYXBVcCA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIGlmICghIXRoaXMuY29uZmlnLnRyYXApIHtcbiAgICAgIHRoaXMubW92ZUZvY3VzKGV2ZW50LCBNT1ZFX0ZPQ1VTLlBSRVYpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgc2VydmljZTogVHJhcEZvY3VzU2VydmljZVxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBzZXJ2aWNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyB0aGUgZm9jdXMgb2YgdGhlIGVsZW1lbnQgcmVmZXJlbmNlIHVwIG9yIGRvd24sIGRlcGVuZGluZyBvbiB0aGUgaW5jcmVtZW50LlxuICAgKiBUaGUgZm9jdXMgb2YgdGhlIGVsZW1lbnQgaXMgdHJhcHBlZCB0byBhdm9pZCBpdCBmcm9tIGdvaW5nIG91dCBvZiB0aGUgZ3JvdXAuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudCBVSUV2ZW50IHRoYXQgaXMgdXNlZCB0byBnZXQgdGhlIHRhcmdldCBlbGVtZW50LiBUaGUgZXZlbnQgaXMgYmxvY2tlZFxuICAgKiAgIGZyb20gc3RhbmRhcmQgZXhlY3V0aW9uIGFuZCBmdXJ0aGVyIGJ1YmJsaW5nLlxuICAgKiBAcGFyYW0gaW5jcmVtZW50IGluZGljYXRlcyB3aGV0aGVyIHRoZSBuZXh0IG9yIHByZXZpb3VzIGlzIGZvY3Vzc2VkLlxuICAgKi9cbiAgcHJvdGVjdGVkIG1vdmVGb2N1cyhldmVudDogVUlFdmVudCwgaW5jcmVtZW50OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5zZXJ2aWNlLmhhc0ZvY3VzYWJsZUNoaWxkcmVuKHRoaXMuaG9zdCkpIHtcbiAgICAgIHRoaXMuc2VydmljZS5tb3ZlRm9jdXMoXG4gICAgICAgIHRoaXMuaG9zdCxcbiAgICAgICAgdGhpcy5jb25maWcsXG4gICAgICAgIGluY3JlbWVudCxcbiAgICAgICAgZXZlbnQgYXMgVUlFdmVudFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==