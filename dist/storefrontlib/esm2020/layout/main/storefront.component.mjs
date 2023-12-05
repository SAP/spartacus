/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, HostBinding, HostListener, ViewChild, } from '@angular/core';
import { SkipLinkComponent } from '../a11y/skip-link/index';
import { StorefrontOutlets } from './storefront-outlets.model';
import * as i0 from "@angular/core";
import * as i1 from "../header/hamburger-menu/hamburger-menu.service";
import * as i2 from "@spartacus/core";
import * as i3 from "../a11y/keyboard-focus/index";
import * as i4 from "@angular/router";
import * as i5 from "../../cms-components/misc/global-message/global-message.component";
import * as i6 from "../../cms-structure/outlet/outlet.directive";
import * as i7 from "../../cms-structure/page/page-layout/page-layout.component";
import * as i8 from "../../cms-structure/page/page-layout/page-template.directive";
import * as i9 from "../../cms-structure/page/slot/page-slot.component";
import * as i10 from "../a11y/keyboard-focus/focus.directive";
import * as i11 from "../a11y/skip-link/directive/skip-link.directive";
import * as i12 from "@angular/common";
export class StorefrontComponent {
    handleEscape(event) {
        this.keyboardFocusService.handleEscape(this.elementRef.nativeElement, this.keyboardFocusConfig, event);
    }
    constructor(hamburgerMenuService, routingService, elementRef, keyboardFocusService) {
        this.hamburgerMenuService = hamburgerMenuService;
        this.routingService = routingService;
        this.elementRef = elementRef;
        this.keyboardFocusService = keyboardFocusService;
        this.isExpanded$ = this.hamburgerMenuService.isExpanded;
        this.StorefrontOutlets = StorefrontOutlets;
        this.role = 'presentation';
        // required by esc focus
        this.tabindex = '0';
        this.keyboardFocusConfig = {
            focusOnEscape: true,
            focusOnDoubleEscape: true,
        };
    }
    ngOnInit() {
        this.navigateSubscription = this.routingService
            .isNavigating()
            .subscribe((val) => {
            this.startNavigating = val === true;
            this.stopNavigating = val === false;
        });
    }
    collapseMenuIfClickOutside(event) {
        const element = event.target;
        if (element.nodeName.toLowerCase() === 'header' &&
            element.className.includes('is-expanded')) {
            this.collapseMenu();
        }
    }
    collapseMenu() {
        this.hamburgerMenuService.toggle(true);
    }
    ngOnDestroy() {
        if (this.navigateSubscription) {
            this.navigateSubscription.unsubscribe();
        }
    }
}
StorefrontComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StorefrontComponent, deps: [{ token: i1.HamburgerMenuService }, { token: i2.RoutingService }, { token: i0.ElementRef }, { token: i3.KeyboardFocusService }], target: i0.ɵɵFactoryTarget.Component });
StorefrontComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StorefrontComponent, selector: "cx-storefront", host: { listeners: { "keydown.escape": "handleEscape($event)" }, properties: { "class.start-navigating": "this.startNavigating", "class.stop-navigating": "this.stopNavigating", "attr.role": "this.role", "tabindex": "this.tabindex" } }, viewQueries: [{ propertyName: "child", first: true, predicate: SkipLinkComponent, descendants: true }], ngImport: i0, template: "<ng-template [cxOutlet]=\"StorefrontOutlets.STOREFRONT\" cxPageTemplateStyle>\n  <ng-template cxOutlet=\"cx-header\">\n    <header\n      id=\"cx-header\"\n      cxSkipLink=\"cx-header\"\n      [cxFocus]=\"{ disableMouseFocus: true }\"\n      [class.is-expanded]=\"isExpanded$ | async\"\n      (keydown.escape)=\"collapseMenu()\"\n      (click)=\"collapseMenuIfClickOutside($event)\"\n    >\n      <cx-page-layout section=\"header\"></cx-page-layout>\n      <cx-page-layout section=\"navigation\"></cx-page-layout>\n    </header>\n    <cx-page-slot position=\"BottomHeaderSlot\"></cx-page-slot>\n    <cx-global-message\n      aria-atomic=\"true\"\n      aria-live=\"assertive\"\n    ></cx-global-message>\n  </ng-template>\n\n  <main cxSkipLink=\"cx-main\" [cxFocus]=\"{ disableMouseFocus: true }\">\n    <router-outlet></router-outlet>\n  </main>\n\n  <ng-template cxOutlet=\"cx-footer\">\n    <footer cxSkipLink=\"cx-footer\" [cxFocus]=\"{ disableMouseFocus: true }\">\n      <cx-page-layout section=\"footer\"></cx-page-layout>\n    </footer>\n  </ng-template>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "component", type: i5.GlobalMessageComponent, selector: "cx-global-message" }, { kind: "directive", type: i6.OutletDirective, selector: "[cxOutlet]", inputs: ["cxOutlet", "cxOutletContext", "cxOutletDefer", "cxComponentRef"], outputs: ["loaded", "cxComponentRefChange"] }, { kind: "component", type: i7.PageLayoutComponent, selector: "cx-page-layout", inputs: ["section"] }, { kind: "directive", type: i8.PageTemplateDirective, selector: "[cxPageTemplateStyle]", inputs: ["cxPageTemplateStyle"] }, { kind: "component", type: i9.PageSlotComponent, selector: "cx-page-slot,[cx-page-slot]", inputs: ["position", "class", "isPageFold", "hasComponents"] }, { kind: "directive", type: i10.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i11.SkipLinkDirective, selector: "[cxSkipLink]", inputs: ["cxSkipLink"] }, { kind: "pipe", type: i12.AsyncPipe, name: "async" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StorefrontComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-storefront', template: "<ng-template [cxOutlet]=\"StorefrontOutlets.STOREFRONT\" cxPageTemplateStyle>\n  <ng-template cxOutlet=\"cx-header\">\n    <header\n      id=\"cx-header\"\n      cxSkipLink=\"cx-header\"\n      [cxFocus]=\"{ disableMouseFocus: true }\"\n      [class.is-expanded]=\"isExpanded$ | async\"\n      (keydown.escape)=\"collapseMenu()\"\n      (click)=\"collapseMenuIfClickOutside($event)\"\n    >\n      <cx-page-layout section=\"header\"></cx-page-layout>\n      <cx-page-layout section=\"navigation\"></cx-page-layout>\n    </header>\n    <cx-page-slot position=\"BottomHeaderSlot\"></cx-page-slot>\n    <cx-global-message\n      aria-atomic=\"true\"\n      aria-live=\"assertive\"\n    ></cx-global-message>\n  </ng-template>\n\n  <main cxSkipLink=\"cx-main\" [cxFocus]=\"{ disableMouseFocus: true }\">\n    <router-outlet></router-outlet>\n  </main>\n\n  <ng-template cxOutlet=\"cx-footer\">\n    <footer cxSkipLink=\"cx-footer\" [cxFocus]=\"{ disableMouseFocus: true }\">\n      <cx-page-layout section=\"footer\"></cx-page-layout>\n    </footer>\n  </ng-template>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.HamburgerMenuService }, { type: i2.RoutingService }, { type: i0.ElementRef }, { type: i3.KeyboardFocusService }]; }, propDecorators: { startNavigating: [{
                type: HostBinding,
                args: ['class.start-navigating']
            }], stopNavigating: [{
                type: HostBinding,
                args: ['class.stop-navigating']
            }], role: [{
                type: HostBinding,
                args: ['attr.role']
            }], tabindex: [{
                type: HostBinding,
                args: ['tabindex']
            }], child: [{
                type: ViewChild,
                args: [SkipLinkComponent]
            }], handleEscape: [{
                type: HostListener,
                args: ['keydown.escape', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVmcm9udC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9tYWluL3N0b3JlZnJvbnQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvbWFpbi9zdG9yZWZyb250LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUVULFdBQVcsRUFDWCxZQUFZLEVBR1osU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBT3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTVELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7Ozs7Ozs7OztBQU0vRCxNQUFNLE9BQU8sbUJBQW1CO0lBcUI5QixZQUFZLENBQUMsS0FBb0I7UUFDL0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FDcEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQzdCLElBQUksQ0FBQyxtQkFBbUIsRUFDeEIsS0FBSyxDQUNOLENBQUM7SUFDSixDQUFDO0lBRUQsWUFDVSxvQkFBMEMsRUFDMUMsY0FBOEIsRUFDNUIsVUFBbUMsRUFDbkMsb0JBQTBDO1FBSDVDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzVCLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUEvQnRELGdCQUFXLEdBQXdCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUM7UUFFL0Qsc0JBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFJckIsU0FBSSxHQUFHLGNBQWMsQ0FBQztRQUVoRCx3QkFBd0I7UUFDQyxhQUFRLEdBQUcsR0FBRyxDQUFDO1FBSWhDLHdCQUFtQixHQUFnQjtZQUN6QyxhQUFhLEVBQUUsSUFBSTtZQUNuQixtQkFBbUIsRUFBRSxJQUFJO1NBQzFCLENBQUM7SUFnQkMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGNBQWM7YUFDNUMsWUFBWSxFQUFFO2FBQ2QsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLEtBQUssSUFBSSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxLQUFLLEtBQUssQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwwQkFBMEIsQ0FBQyxLQUFVO1FBQ25DLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFDRSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVE7WUFDM0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQ3pDO1lBQ0EsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUVELFlBQVk7UUFDVixJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDN0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQzs7Z0hBL0RVLG1CQUFtQjtvR0FBbkIsbUJBQW1CLHdVQWFuQixpQkFBaUIsZ0RDMUM5QiwyakNBOEJBOzJGRERhLG1CQUFtQjtrQkFKL0IsU0FBUzsrQkFDRSxlQUFlO29NQVNjLGVBQWU7c0JBQXJELFdBQVc7dUJBQUMsd0JBQXdCO2dCQUNDLGNBQWM7c0JBQW5ELFdBQVc7dUJBQUMsdUJBQXVCO2dCQUNWLElBQUk7c0JBQTdCLFdBQVc7dUJBQUMsV0FBVztnQkFHQyxRQUFRO3NCQUFoQyxXQUFXO3VCQUFDLFVBQVU7Z0JBRU8sS0FBSztzQkFBbEMsU0FBUzt1QkFBQyxpQkFBaUI7Z0JBUTVCLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIEZvY3VzQ29uZmlnLFxuICBLZXlib2FyZEZvY3VzU2VydmljZSxcbn0gZnJvbSAnLi4vYTExeS9rZXlib2FyZC1mb2N1cy9pbmRleCc7XG5pbXBvcnQgeyBTa2lwTGlua0NvbXBvbmVudCB9IGZyb20gJy4uL2ExMXkvc2tpcC1saW5rL2luZGV4JztcbmltcG9ydCB7IEhhbWJ1cmdlck1lbnVTZXJ2aWNlIH0gZnJvbSAnLi4vaGVhZGVyL2hhbWJ1cmdlci1tZW51L2hhbWJ1cmdlci1tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcmVmcm9udE91dGxldHMgfSBmcm9tICcuL3N0b3JlZnJvbnQtb3V0bGV0cy5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXN0b3JlZnJvbnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vc3RvcmVmcm9udC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlZnJvbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIG5hdmlnYXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIGlzRXhwYW5kZWQkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5oYW1idXJnZXJNZW51U2VydmljZS5pc0V4cGFuZGVkO1xuXG4gIHJlYWRvbmx5IFN0b3JlZnJvbnRPdXRsZXRzID0gU3RvcmVmcm9udE91dGxldHM7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zdGFydC1uYXZpZ2F0aW5nJykgc3RhcnROYXZpZ2F0aW5nOiBib29sZWFuO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnN0b3AtbmF2aWdhdGluZycpIHN0b3BOYXZpZ2F0aW5nOiBib29sZWFuO1xuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpIHJvbGUgPSAncHJlc2VudGF0aW9uJztcblxuICAvLyByZXF1aXJlZCBieSBlc2MgZm9jdXNcbiAgQEhvc3RCaW5kaW5nKCd0YWJpbmRleCcpIHRhYmluZGV4ID0gJzAnO1xuXG4gIEBWaWV3Q2hpbGQoU2tpcExpbmtDb21wb25lbnQpIGNoaWxkOiBTa2lwTGlua0NvbXBvbmVudDtcblxuICBwcml2YXRlIGtleWJvYXJkRm9jdXNDb25maWc6IEZvY3VzQ29uZmlnID0ge1xuICAgIGZvY3VzT25Fc2NhcGU6IHRydWUsXG4gICAgZm9jdXNPbkRvdWJsZUVzY2FwZTogdHJ1ZSxcbiAgfTtcblxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVzY2FwZScsIFsnJGV2ZW50J10pXG4gIGhhbmRsZUVzY2FwZShldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIHRoaXMua2V5Ym9hcmRGb2N1c1NlcnZpY2UuaGFuZGxlRXNjYXBlKFxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICB0aGlzLmtleWJvYXJkRm9jdXNDb25maWcsXG4gICAgICBldmVudFxuICAgICk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGhhbWJ1cmdlck1lbnVTZXJ2aWNlOiBIYW1idXJnZXJNZW51U2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJvdGVjdGVkIGtleWJvYXJkRm9jdXNTZXJ2aWNlOiBLZXlib2FyZEZvY3VzU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5uYXZpZ2F0ZVN1YnNjcmlwdGlvbiA9IHRoaXMucm91dGluZ1NlcnZpY2VcbiAgICAgIC5pc05hdmlnYXRpbmcoKVxuICAgICAgLnN1YnNjcmliZSgodmFsKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhcnROYXZpZ2F0aW5nID0gdmFsID09PSB0cnVlO1xuICAgICAgICB0aGlzLnN0b3BOYXZpZ2F0aW5nID0gdmFsID09PSBmYWxzZTtcbiAgICAgIH0pO1xuICB9XG5cbiAgY29sbGFwc2VNZW51SWZDbGlja091dHNpZGUoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgaWYgKFxuICAgICAgZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaGVhZGVyJyAmJlxuICAgICAgZWxlbWVudC5jbGFzc05hbWUuaW5jbHVkZXMoJ2lzLWV4cGFuZGVkJylcbiAgICApIHtcbiAgICAgIHRoaXMuY29sbGFwc2VNZW51KCk7XG4gICAgfVxuICB9XG5cbiAgY29sbGFwc2VNZW51KCk6IHZvaWQge1xuICAgIHRoaXMuaGFtYnVyZ2VyTWVudVNlcnZpY2UudG9nZ2xlKHRydWUpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubmF2aWdhdGVTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMubmF2aWdhdGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxuZy10ZW1wbGF0ZSBbY3hPdXRsZXRdPVwiU3RvcmVmcm9udE91dGxldHMuU1RPUkVGUk9OVFwiIGN4UGFnZVRlbXBsYXRlU3R5bGU+XG4gIDxuZy10ZW1wbGF0ZSBjeE91dGxldD1cImN4LWhlYWRlclwiPlxuICAgIDxoZWFkZXJcbiAgICAgIGlkPVwiY3gtaGVhZGVyXCJcbiAgICAgIGN4U2tpcExpbms9XCJjeC1oZWFkZXJcIlxuICAgICAgW2N4Rm9jdXNdPVwieyBkaXNhYmxlTW91c2VGb2N1czogdHJ1ZSB9XCJcbiAgICAgIFtjbGFzcy5pcy1leHBhbmRlZF09XCJpc0V4cGFuZGVkJCB8IGFzeW5jXCJcbiAgICAgIChrZXlkb3duLmVzY2FwZSk9XCJjb2xsYXBzZU1lbnUoKVwiXG4gICAgICAoY2xpY2spPVwiY29sbGFwc2VNZW51SWZDbGlja091dHNpZGUoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPGN4LXBhZ2UtbGF5b3V0IHNlY3Rpb249XCJoZWFkZXJcIj48L2N4LXBhZ2UtbGF5b3V0PlxuICAgICAgPGN4LXBhZ2UtbGF5b3V0IHNlY3Rpb249XCJuYXZpZ2F0aW9uXCI+PC9jeC1wYWdlLWxheW91dD5cbiAgICA8L2hlYWRlcj5cbiAgICA8Y3gtcGFnZS1zbG90IHBvc2l0aW9uPVwiQm90dG9tSGVhZGVyU2xvdFwiPjwvY3gtcGFnZS1zbG90PlxuICAgIDxjeC1nbG9iYWwtbWVzc2FnZVxuICAgICAgYXJpYS1hdG9taWM9XCJ0cnVlXCJcbiAgICAgIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiXG4gICAgPjwvY3gtZ2xvYmFsLW1lc3NhZ2U+XG4gIDwvbmctdGVtcGxhdGU+XG5cbiAgPG1haW4gY3hTa2lwTGluaz1cImN4LW1haW5cIiBbY3hGb2N1c109XCJ7IGRpc2FibGVNb3VzZUZvY3VzOiB0cnVlIH1cIj5cbiAgICA8cm91dGVyLW91dGxldD48L3JvdXRlci1vdXRsZXQ+XG4gIDwvbWFpbj5cblxuICA8bmctdGVtcGxhdGUgY3hPdXRsZXQ9XCJjeC1mb290ZXJcIj5cbiAgICA8Zm9vdGVyIGN4U2tpcExpbms9XCJjeC1mb290ZXJcIiBbY3hGb2N1c109XCJ7IGRpc2FibGVNb3VzZUZvY3VzOiB0cnVlIH1cIj5cbiAgICAgIDxjeC1wYWdlLWxheW91dCBzZWN0aW9uPVwiZm9vdGVyXCI+PC9jeC1wYWdlLWxheW91dD5cbiAgICA8L2Zvb3Rlcj5cbiAgPC9uZy10ZW1wbGF0ZT5cbjwvbmctdGVtcGxhdGU+XG4iXX0=