/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive } from '@angular/core';
import { VisibleFocusDirective } from '../visible/visible-focus.directive';
import * as i0 from "@angular/core";
import * as i1 from "../base/base-focus.service";
// { selector: '[cxBlockFocus]' }
export class BlockFocusDirective extends VisibleFocusDirective {
    constructor(elementRef, service) {
        super(elementRef, service);
        this.elementRef = elementRef;
        this.service = service;
        this.defaultConfig = { block: true };
        // @Input('cxBlockFocus')
        this.config = {};
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.config.block) {
            this.tabindex = -1;
        }
    }
}
BlockFocusDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BlockFocusDirective, deps: [{ token: i0.ElementRef }, { token: i1.BaseFocusService }], target: i0.ɵɵFactoryTarget.Directive });
BlockFocusDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: BlockFocusDirective, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BlockFocusDirective, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i1.BaseFocusService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2stZm9jdXMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvYTExeS9rZXlib2FyZC1mb2N1cy9ibG9jay9ibG9jay1mb2N1cy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQXNCLE1BQU0sZUFBZSxDQUFDO0FBRzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7QUFHM0UsaUNBQWlDO0FBQ2pDLE1BQU0sT0FBTyxtQkFDWCxTQUFRLHFCQUFxQjtJQVE3QixZQUNZLFVBQXNCLEVBQ3RCLE9BQXlCO1FBRW5DLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFIakIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQVAzQixrQkFBYSxHQUFxQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUU1RCx5QkFBeUI7UUFDZixXQUFNLEdBQXFCLEVBQUUsQ0FBQztJQU94QyxDQUFDO0lBRUQsUUFBUTtRQUNOLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDOztnSEFyQlUsbUJBQW1CO29HQUFuQixtQkFBbUI7MkZBQW5CLG1CQUFtQjtrQkFGL0IsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlRm9jdXNTZXJ2aWNlIH0gZnJvbSAnLi4vYmFzZS9iYXNlLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQmxvY2tGb2N1c0NvbmZpZyB9IGZyb20gJy4uL2tleWJvYXJkLWZvY3VzLm1vZGVsJztcbmltcG9ydCB7IFZpc2libGVGb2N1c0RpcmVjdGl2ZSB9IGZyb20gJy4uL3Zpc2libGUvdmlzaWJsZS1mb2N1cy5kaXJlY3RpdmUnO1xuXG5ARGlyZWN0aXZlKClcbi8vIHsgc2VsZWN0b3I6ICdbY3hCbG9ja0ZvY3VzXScgfVxuZXhwb3J0IGNsYXNzIEJsb2NrRm9jdXNEaXJlY3RpdmVcbiAgZXh0ZW5kcyBWaXNpYmxlRm9jdXNEaXJlY3RpdmVcbiAgaW1wbGVtZW50cyBPbkluaXRcbntcbiAgcHJvdGVjdGVkIGRlZmF1bHRDb25maWc6IEJsb2NrRm9jdXNDb25maWcgPSB7IGJsb2NrOiB0cnVlIH07XG5cbiAgLy8gQElucHV0KCdjeEJsb2NrRm9jdXMnKVxuICBwcm90ZWN0ZWQgY29uZmlnOiBCbG9ja0ZvY3VzQ29uZmlnID0ge307XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHNlcnZpY2U6IEJhc2VGb2N1c1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZiwgc2VydmljZSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIGlmICh0aGlzLmNvbmZpZy5ibG9jaykge1xuICAgICAgdGhpcy50YWJpbmRleCA9IC0xO1xuICAgIH1cbiAgfVxufVxuIl19