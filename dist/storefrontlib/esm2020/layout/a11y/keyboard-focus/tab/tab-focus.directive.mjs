/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, HostListener } from '@angular/core';
import { AutoFocusDirective } from '../autofocus/auto-focus.directive';
import * as i0 from "@angular/core";
import * as i1 from "./tab-focus.service";
/**
 * Directive to move the focus of ("locked") child elements. This is useful
 * for a nested list of tabs, carousel slides or any group of elements that
 * requires horizontal navigation.
 */
export class TabFocusDirective extends AutoFocusDirective {
    handleNextTab(event) {
        if (this.config?.tab) {
            this.service.moveTab(this.host, this.config, 1 /* MOVE_FOCUS.NEXT */, event);
        }
    }
    handlePreviousTab(event) {
        if (this.config?.tab) {
            this.service.moveTab(this.host, this.config, -1 /* MOVE_FOCUS.PREV */, event);
        }
    }
    constructor(elementRef, service) {
        super(elementRef, service);
        this.elementRef = elementRef;
        this.service = service;
        /** `tab` defaults to true if the directive `cxTabFocus` is used. */
        this.defaultConfig = { tab: true };
        // @Input('cxTabFocus')
        this.config = {};
    }
}
TabFocusDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TabFocusDirective, deps: [{ token: i0.ElementRef }, { token: i1.TabFocusService }], target: i0.ɵɵFactoryTarget.Directive });
TabFocusDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: TabFocusDirective, host: { listeners: { "keydown.arrowRight": "handleNextTab($event)", "keydown.arrowLeft": "handlePreviousTab($event)" } }, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TabFocusDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.TabFocusService }]; }, propDecorators: { handleNextTab: [{
                type: HostListener,
                args: ['keydown.arrowRight', ['$event']]
            }], handlePreviousTab: [{
                type: HostListener,
                args: ['keydown.arrowLeft', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWZvY3VzLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvbGF5b3V0L2ExMXkva2V5Ym9hcmQtZm9jdXMvdGFiL3RhYi1mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7QUFJdkU7Ozs7R0FJRztBQUVILE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxrQkFBa0I7SUFRdkQsYUFBYSxDQUFDLEtBQW9CO1FBQ2hDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSwyQkFBbUIsS0FBSyxDQUFDLENBQUM7U0FDdEU7SUFDSCxDQUFDO0lBR0QsaUJBQWlCLENBQUMsS0FBb0I7UUFDcEMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLDRCQUFtQixLQUFLLENBQUMsQ0FBQztTQUN0RTtJQUNILENBQUM7SUFFRCxZQUNZLFVBQXNCLEVBQ3RCLE9BQXdCO1FBRWxDLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFIakIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQXRCcEMsb0VBQW9FO1FBQzFELGtCQUFhLEdBQW1CLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDO1FBRXhELHVCQUF1QjtRQUNiLFdBQU0sR0FBbUIsRUFBRSxDQUFDO0lBcUJ0QyxDQUFDOzs4R0ExQlUsaUJBQWlCO2tHQUFqQixpQkFBaUI7MkZBQWpCLGlCQUFpQjtrQkFEN0IsU0FBUzsrSEFTUixhQUFhO3NCQURaLFlBQVk7dUJBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBUTlDLGlCQUFpQjtzQkFEaEIsWUFBWTt1QkFBQyxtQkFBbUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBdXRvRm9jdXNEaXJlY3RpdmUgfSBmcm9tICcuLi9hdXRvZm9jdXMvYXV0by1mb2N1cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTU9WRV9GT0NVUywgVGFiRm9jdXNDb25maWcgfSBmcm9tICcuLi9rZXlib2FyZC1mb2N1cy5tb2RlbCc7XG5pbXBvcnQgeyBUYWJGb2N1c1NlcnZpY2UgfSBmcm9tICcuL3RhYi1mb2N1cy5zZXJ2aWNlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gbW92ZSB0aGUgZm9jdXMgb2YgKFwibG9ja2VkXCIpIGNoaWxkIGVsZW1lbnRzLiBUaGlzIGlzIHVzZWZ1bFxuICogZm9yIGEgbmVzdGVkIGxpc3Qgb2YgdGFicywgY2Fyb3VzZWwgc2xpZGVzIG9yIGFueSBncm91cCBvZiBlbGVtZW50cyB0aGF0XG4gKiByZXF1aXJlcyBob3Jpem9udGFsIG5hdmlnYXRpb24uXG4gKi9cbkBEaXJlY3RpdmUoKSAvLyBzZWxlY3RvcjogJ1tjeFRhYkZvY3VzXSdcbmV4cG9ydCBjbGFzcyBUYWJGb2N1c0RpcmVjdGl2ZSBleHRlbmRzIEF1dG9Gb2N1c0RpcmVjdGl2ZSB7XG4gIC8qKiBgdGFiYCBkZWZhdWx0cyB0byB0cnVlIGlmIHRoZSBkaXJlY3RpdmUgYGN4VGFiRm9jdXNgIGlzIHVzZWQuICovXG4gIHByb3RlY3RlZCBkZWZhdWx0Q29uZmlnOiBUYWJGb2N1c0NvbmZpZyA9IHsgdGFiOiB0cnVlIH07XG5cbiAgLy8gQElucHV0KCdjeFRhYkZvY3VzJylcbiAgcHJvdGVjdGVkIGNvbmZpZzogVGFiRm9jdXNDb25maWcgPSB7fTtcblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmFycm93UmlnaHQnLCBbJyRldmVudCddKVxuICBoYW5kbGVOZXh0VGFiKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKHRoaXMuY29uZmlnPy50YWIpIHtcbiAgICAgIHRoaXMuc2VydmljZS5tb3ZlVGFiKHRoaXMuaG9zdCwgdGhpcy5jb25maWcsIE1PVkVfRk9DVVMuTkVYVCwgZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uYXJyb3dMZWZ0JywgWyckZXZlbnQnXSlcbiAgaGFuZGxlUHJldmlvdXNUYWIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICBpZiAodGhpcy5jb25maWc/LnRhYikge1xuICAgICAgdGhpcy5zZXJ2aWNlLm1vdmVUYWIodGhpcy5ob3N0LCB0aGlzLmNvbmZpZywgTU9WRV9GT0NVUy5QUkVWLCBldmVudCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHNlcnZpY2U6IFRhYkZvY3VzU2VydmljZVxuICApIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLCBzZXJ2aWNlKTtcbiAgfVxufVxuIl19