/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, HostBinding, Input, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./base-focus.service";
/**
 * Abstract directive that provides a common interface for all focus directives:
 * - Block Focus
 * - Persist Focus
 * - Escape Focus
 * - Auto Focus
 * - Tab Focus
 * - Trap Focus
 * - Lock Focus
 */
export class BaseFocusDirective {
    constructor(elementRef, service) {
        this.elementRef = elementRef;
        this.service = service;
        /**
         * A default config can be provided for each directive if a specific focus directive
         * is used directly. i.e. `<div cxAutoFocus></div>`
         */
        this.defaultConfig = {};
    }
    ngOnInit() {
        this.setDefaultConfiguration();
        this.requiredTabindex = -1;
    }
    // empty, but sub classes might have an implementation
    ngOnChanges(_changes) {
        // Intentional empty method
    }
    /**
     * Override the (input) config if it undefined or an empty string, with the
     * `defaultConfig`. The `defaultConfig` might be specified for each directive
     * differently. If a specific directive is used (i.e. `cxAutoFocus`), the
     * specific (inherited) defaultConfig will be used.
     */
    setDefaultConfiguration() {
        if ((!this.config || this.config === '') && this.defaultConfig) {
            this.config = this.defaultConfig;
        }
    }
    /**
     * Helper method to return the host element for the directive
     * given by the `elementRef`.
     */
    get host() {
        return this.elementRef.nativeElement;
    }
    /**
     * Force a tabindex on the host element if it is _required_ to make the element
     * focusable. If the element is focusable by nature or by a given tabindex, the
     * `tabindex` is not applied.
     *
     * Buttons, active links, etc. do no need an explicit tabindex to receive focus.
     */
    set requiredTabindex(tabindex) {
        if (this.requiresExplicitTabIndex) {
            this.tabindex = tabindex;
        }
    }
    /**
     * Returns true if the host element does not have a tabindex defined
     * and it also doesn't get focus by browsers nature (i.e. button or
     * active link).
     */
    get requiresExplicitTabIndex() {
        return (this.tabindex === undefined &&
            ['button', 'input', 'select', 'textarea'].indexOf(this.host.tagName.toLowerCase()) === -1 &&
            !(this.host.tagName === 'A' &&
                (this.host.hasAttribute('href') ||
                    this.host.hasAttribute('routerlink') ||
                    this.host.getAttribute('ng-reflect-router-link'))));
    }
}
BaseFocusDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseFocusDirective, deps: [{ token: i0.ElementRef }, { token: i1.BaseFocusService }], target: i0.ɵɵFactoryTarget.Directive });
BaseFocusDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: BaseFocusDirective, inputs: { tabindex: "tabindex" }, host: { properties: { "attr.tabindex": "this.tabindex" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseFocusDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.BaseFocusService }]; }, propDecorators: { tabindex: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['attr.tabindex']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1mb2N1cy5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9hMTF5L2tleWJvYXJkLWZvY3VzL2Jhc2UvYmFzZS1mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBRVQsV0FBVyxFQUNYLEtBQUssR0FJTixNQUFNLGVBQWUsQ0FBQzs7O0FBSXZCOzs7Ozs7Ozs7R0FTRztBQUVILE1BQU0sT0FBZ0Isa0JBQWtCO0lBZXRDLFlBQ1ksVUFBbUMsRUFDbkMsT0FBeUI7UUFEekIsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUFDbkMsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFWckM7OztXQUdHO1FBQ08sa0JBQWEsR0FBb0IsRUFBRSxDQUFDO0lBTzNDLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxzREFBc0Q7SUFDdEQsV0FBVyxDQUFDLFFBQXVCO1FBQ2pDLDJCQUEyQjtJQUM3QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDTyx1QkFBdUI7UUFDL0IsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDOUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQWMsSUFBSTtRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxJQUFjLGdCQUFnQixDQUFDLFFBQWdCO1FBQzdDLElBQUksSUFBSSxDQUFDLHdCQUF3QixFQUFFO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFjLHdCQUF3QjtRQUNwQyxPQUFPLENBQ0wsSUFBSSxDQUFDLFFBQVEsS0FBSyxTQUFTO1lBQzNCLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FDaEMsS0FBSyxDQUFDLENBQUM7WUFDUixDQUFDLENBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssR0FBRztnQkFDekIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7b0JBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztvQkFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUNwRCxDQUNGLENBQUM7SUFDSixDQUFDOzsrR0FqRm1CLGtCQUFrQjttR0FBbEIsa0JBQWtCOzJGQUFsQixrQkFBa0I7a0JBRHZDLFNBQVM7Z0lBYytCLFFBQVE7c0JBQTlDLEtBQUs7O3NCQUFJLFdBQVc7dUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgU2ltcGxlQ2hhbmdlcyxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlRm9jdXNDb25maWcgfSBmcm9tICcuLi9rZXlib2FyZC1mb2N1cy5tb2RlbCc7XG5pbXBvcnQgeyBCYXNlRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLWZvY3VzLnNlcnZpY2UnO1xuXG4vKipcbiAqIEFic3RyYWN0IGRpcmVjdGl2ZSB0aGF0IHByb3ZpZGVzIGEgY29tbW9uIGludGVyZmFjZSBmb3IgYWxsIGZvY3VzIGRpcmVjdGl2ZXM6XG4gKiAtIEJsb2NrIEZvY3VzXG4gKiAtIFBlcnNpc3QgRm9jdXNcbiAqIC0gRXNjYXBlIEZvY3VzXG4gKiAtIEF1dG8gRm9jdXNcbiAqIC0gVGFiIEZvY3VzXG4gKiAtIFRyYXAgRm9jdXNcbiAqIC0gTG9jayBGb2N1c1xuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlRm9jdXNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIC8qKlxuICAgKiBPcHRpb25hbCBjb25maWd1cmF0aW9uIGZvciB0aGUgZm9jdXMgZGlyZWN0aXZlIGRyaXZlcyB0aGUgYmVoYXZpb3VyIG9mIHRoZSBrZXlib2FyZFxuICAgKiBmb2N1cyBkaXJlY3RpdmUuXG4gICAqL1xuICBwcm90ZWN0ZWQgY29uZmlnOiBCYXNlRm9jdXNDb25maWc7XG5cbiAgLyoqXG4gICAqIEEgZGVmYXVsdCBjb25maWcgY2FuIGJlIHByb3ZpZGVkIGZvciBlYWNoIGRpcmVjdGl2ZSBpZiBhIHNwZWNpZmljIGZvY3VzIGRpcmVjdGl2ZVxuICAgKiBpcyB1c2VkIGRpcmVjdGx5LiBpLmUuIGA8ZGl2IGN4QXV0b0ZvY3VzPjwvZGl2PmBcbiAgICovXG4gIHByb3RlY3RlZCBkZWZhdWx0Q29uZmlnOiBCYXNlRm9jdXNDb25maWcgPSB7fTtcblxuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2F0dHIudGFiaW5kZXgnKSB0YWJpbmRleDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcm90ZWN0ZWQgc2VydmljZTogQmFzZUZvY3VzU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXREZWZhdWx0Q29uZmlndXJhdGlvbigpO1xuICAgIHRoaXMucmVxdWlyZWRUYWJpbmRleCA9IC0xO1xuICB9XG5cbiAgLy8gZW1wdHksIGJ1dCBzdWIgY2xhc3NlcyBtaWdodCBoYXZlIGFuIGltcGxlbWVudGF0aW9uXG4gIG5nT25DaGFuZ2VzKF9jaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgLy8gSW50ZW50aW9uYWwgZW1wdHkgbWV0aG9kXG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGUgdGhlIChpbnB1dCkgY29uZmlnIGlmIGl0IHVuZGVmaW5lZCBvciBhbiBlbXB0eSBzdHJpbmcsIHdpdGggdGhlXG4gICAqIGBkZWZhdWx0Q29uZmlnYC4gVGhlIGBkZWZhdWx0Q29uZmlnYCBtaWdodCBiZSBzcGVjaWZpZWQgZm9yIGVhY2ggZGlyZWN0aXZlXG4gICAqIGRpZmZlcmVudGx5LiBJZiBhIHNwZWNpZmljIGRpcmVjdGl2ZSBpcyB1c2VkIChpLmUuIGBjeEF1dG9Gb2N1c2ApLCB0aGVcbiAgICogc3BlY2lmaWMgKGluaGVyaXRlZCkgZGVmYXVsdENvbmZpZyB3aWxsIGJlIHVzZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgc2V0RGVmYXVsdENvbmZpZ3VyYXRpb24oKTogdm9pZCB7XG4gICAgaWYgKCghdGhpcy5jb25maWcgfHwgdGhpcy5jb25maWcgPT09ICcnKSAmJiB0aGlzLmRlZmF1bHRDb25maWcpIHtcbiAgICAgIHRoaXMuY29uZmlnID0gdGhpcy5kZWZhdWx0Q29uZmlnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIZWxwZXIgbWV0aG9kIHRvIHJldHVybiB0aGUgaG9zdCBlbGVtZW50IGZvciB0aGUgZGlyZWN0aXZlXG4gICAqIGdpdmVuIGJ5IHRoZSBgZWxlbWVudFJlZmAuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0IGhvc3QoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjZSBhIHRhYmluZGV4IG9uIHRoZSBob3N0IGVsZW1lbnQgaWYgaXQgaXMgX3JlcXVpcmVkXyB0byBtYWtlIHRoZSBlbGVtZW50XG4gICAqIGZvY3VzYWJsZS4gSWYgdGhlIGVsZW1lbnQgaXMgZm9jdXNhYmxlIGJ5IG5hdHVyZSBvciBieSBhIGdpdmVuIHRhYmluZGV4LCB0aGVcbiAgICogYHRhYmluZGV4YCBpcyBub3QgYXBwbGllZC5cbiAgICpcbiAgICogQnV0dG9ucywgYWN0aXZlIGxpbmtzLCBldGMuIGRvIG5vIG5lZWQgYW4gZXhwbGljaXQgdGFiaW5kZXggdG8gcmVjZWl2ZSBmb2N1cy5cbiAgICovXG4gIHByb3RlY3RlZCBzZXQgcmVxdWlyZWRUYWJpbmRleCh0YWJpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucmVxdWlyZXNFeHBsaWNpdFRhYkluZGV4KSB7XG4gICAgICB0aGlzLnRhYmluZGV4ID0gdGFiaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaG9zdCBlbGVtZW50IGRvZXMgbm90IGhhdmUgYSB0YWJpbmRleCBkZWZpbmVkXG4gICAqIGFuZCBpdCBhbHNvIGRvZXNuJ3QgZ2V0IGZvY3VzIGJ5IGJyb3dzZXJzIG5hdHVyZSAoaS5lLiBidXR0b24gb3JcbiAgICogYWN0aXZlIGxpbmspLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldCByZXF1aXJlc0V4cGxpY2l0VGFiSW5kZXgoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMudGFiaW5kZXggPT09IHVuZGVmaW5lZCAmJlxuICAgICAgWydidXR0b24nLCAnaW5wdXQnLCAnc2VsZWN0JywgJ3RleHRhcmVhJ10uaW5kZXhPZihcbiAgICAgICAgdGhpcy5ob3N0LnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICAgICAgKSA9PT0gLTEgJiZcbiAgICAgICEoXG4gICAgICAgIHRoaXMuaG9zdC50YWdOYW1lID09PSAnQScgJiZcbiAgICAgICAgKHRoaXMuaG9zdC5oYXNBdHRyaWJ1dGUoJ2hyZWYnKSB8fFxuICAgICAgICAgIHRoaXMuaG9zdC5oYXNBdHRyaWJ1dGUoJ3JvdXRlcmxpbmsnKSB8fFxuICAgICAgICAgIHRoaXMuaG9zdC5nZXRBdHRyaWJ1dGUoJ25nLXJlZmxlY3Qtcm91dGVyLWxpbmsnKSlcbiAgICAgIClcbiAgICApO1xuICB9XG59XG4iXX0=