/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, } from '@angular/core';
import { THEME_CONTEXT_ID } from '@spartacus/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class ThemeService {
    constructor(config, rendererFactory) {
        this.config = config;
        this.rendererFactory = rendererFactory;
    }
    /**
     * This function is to be called for the root component that is
     * bootstrapped.
     */
    init(rootComponent) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
        this.rootComponent = rootComponent;
        // Theme value is a string. It is put in the generic multi-value
        // property of the SiteContextConfig. So the array's first item
        // is the theme value.
        this.setTheme(this.config.context?.[THEME_CONTEXT_ID]?.[0]);
    }
    setTheme(theme) {
        if (theme) {
            const element = this.rootComponent.location.nativeElement;
            // remove the old theme
            this.renderer.removeClass(element, this.existingTheme);
            // add the new theme
            this.renderer.addClass(element, theme);
            this.existingTheme = theme;
        }
    }
}
ThemeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ThemeService, deps: [{ token: i1.SiteContextConfig }, { token: i0.RendererFactory2 }], target: i0.ɵɵFactoryTarget.Injectable });
ThemeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ThemeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ThemeService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.SiteContextConfig }, { type: i0.RendererFactory2 }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L3RoZW1lL3RoZW1lLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFFTCxVQUFVLEdBR1gsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFxQixnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFHdEUsTUFBTSxPQUFPLFlBQVk7SUFLdkIsWUFDWSxNQUF5QixFQUN6QixlQUFpQztRQURqQyxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUN6QixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7SUFDMUMsQ0FBQztJQUVKOzs7T0FHRztJQUNILElBQUksQ0FBQyxhQUFnQztRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxnRUFBZ0U7UUFDaEUsK0RBQStEO1FBQy9ELHNCQUFzQjtRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUF5QjtRQUNoQyxJQUFJLEtBQUssRUFBRTtZQUNULE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztZQUMxRCx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN2RCxvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7eUdBaENVLFlBQVk7NkdBQVosWUFBWSxjQURDLE1BQU07MkZBQ25CLFlBQVk7a0JBRHhCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLFxuICBJbmplY3RhYmxlLFxuICBSZW5kZXJlcjIsXG4gIFJlbmRlcmVyRmFjdG9yeTIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2l0ZUNvbnRleHRDb25maWcsIFRIRU1FX0NPTlRFWFRfSUQgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFRoZW1lU2VydmljZSB7XG4gIHByb3RlY3RlZCByb290Q29tcG9uZW50OiBDb21wb25lbnRSZWY8YW55PjtcbiAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjI7XG4gIHByb3RlY3RlZCBleGlzdGluZ1RoZW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogU2l0ZUNvbnRleHRDb25maWcsXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MlxuICApIHt9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgdG8gYmUgY2FsbGVkIGZvciB0aGUgcm9vdCBjb21wb25lbnQgdGhhdCBpc1xuICAgKiBib290c3RyYXBwZWQuXG4gICAqL1xuICBpbml0KHJvb3RDb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlciA9IHRoaXMucmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpO1xuICAgIHRoaXMucm9vdENvbXBvbmVudCA9IHJvb3RDb21wb25lbnQ7XG4gICAgLy8gVGhlbWUgdmFsdWUgaXMgYSBzdHJpbmcuIEl0IGlzIHB1dCBpbiB0aGUgZ2VuZXJpYyBtdWx0aS12YWx1ZVxuICAgIC8vIHByb3BlcnR5IG9mIHRoZSBTaXRlQ29udGV4dENvbmZpZy4gU28gdGhlIGFycmF5J3MgZmlyc3QgaXRlbVxuICAgIC8vIGlzIHRoZSB0aGVtZSB2YWx1ZS5cbiAgICB0aGlzLnNldFRoZW1lKHRoaXMuY29uZmlnLmNvbnRleHQ/LltUSEVNRV9DT05URVhUX0lEXT8uWzBdKTtcbiAgfVxuXG4gIHNldFRoZW1lKHRoZW1lOiBzdHJpbmcgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAodGhlbWUpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnJvb3RDb21wb25lbnQubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcbiAgICAgIC8vIHJlbW92ZSB0aGUgb2xkIHRoZW1lXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGVsZW1lbnQsIHRoaXMuZXhpc3RpbmdUaGVtZSk7XG4gICAgICAvLyBhZGQgdGhlIG5ldyB0aGVtZVxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhlbGVtZW50LCB0aGVtZSk7XG4gICAgICB0aGlzLmV4aXN0aW5nVGhlbWUgPSB0aGVtZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==