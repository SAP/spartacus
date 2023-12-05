/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ICON_TYPE } from '../../misc/icon/index';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./../../../layout/header/hamburger-menu/hamburger-menu.service";
import * as i3 from "@spartacus/core";
import * as i4 from "@angular/common";
import * as i5 from "../../misc/icon/icon.component";
import * as i6 from "../../../shared/components/generic-link/generic-link.component";
export class NavigationUIComponent {
    onResize() {
        this.resize.next(undefined);
    }
    constructor(router, renderer, elemRef, hamburgerMenuService, winRef) {
        this.router = router;
        this.renderer = renderer;
        this.elemRef = elemRef;
        this.hamburgerMenuService = hamburgerMenuService;
        this.winRef = winRef;
        /**
         * the icon type that will be used for navigation nodes
         * with children.
         */
        this.iconType = ICON_TYPE;
        /**
         * Indicates whether the navigation should support flyout.
         * If flyout is set to true, the
         * nested child navigation nodes will only appear on hover or focus.
         */
        this.flyout = true;
        this.isOpen = false;
        this.openNodes = [];
        this.subscriptions = new Subscription();
        this.resize = new EventEmitter();
        this.subscriptions.add(this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => this.clear()));
        this.subscriptions.add(this.resize.pipe(debounceTime(50)).subscribe(() => {
            this.alignWrappersToRightIfStickOut();
        }));
    }
    /**
     * During initialization of this component, we will check the resetMenuOnClose flag and attach a menu reset listener if needed.
     */
    ngOnInit() {
        if (this.resetMenuOnClose) {
            this.resetOnMenuCollapse();
        }
    }
    /**
     * This method performs the action of resetting the menu (close all sub menus and return to main options)
     * when the menu is closed.
     */
    resetOnMenuCollapse() {
        this.subscriptions.add(this.hamburgerMenuService?.isExpanded
            .pipe(distinctUntilChanged(), filter(Boolean))
            .subscribe(() => {
            this.reinitializeMenu();
        }));
    }
    closeIfClickedTheSameLink(navNode) {
        if (typeof navNode.url === 'string' &&
            this.winRef.nativeWindow?.location.href.includes(navNode.url)) {
            this.elemRef.nativeElement
                .querySelectorAll('li.is-open:not(.back), li.is-opened')
                .forEach((el) => {
                this.renderer.removeClass(el, 'is-open');
                this.renderer.removeClass(el, 'is-opened');
            });
            this.reinitializeMenu();
            this.hamburgerMenuService.toggle();
        }
    }
    /**
     * This method performs the actions required to reset the state of the menu and reset any visual components.
     */
    reinitializeMenu() {
        if (this.openNodes?.length > 0) {
            this.clear();
            this.renderer.removeClass(this.elemRef.nativeElement, 'is-open');
        }
    }
    ariaCollapseNodes() {
        this.openNodes.forEach((parentNode) => {
            Array.from(parentNode.children)
                .filter((childNode) => childNode?.tagName === 'BUTTON')
                .forEach((childNode) => {
                this.renderer.setAttribute(childNode, 'aria-expanded', 'false');
            });
        });
    }
    toggleOpen(event) {
        if (event.type === 'keydown') {
            event.preventDefault();
        }
        this.ariaCollapseNodes();
        const node = event.currentTarget;
        const parentNode = node.parentNode;
        if (this.openNodes.includes(parentNode)) {
            if (event.type === 'keydown') {
                this.back();
            }
            else {
                this.openNodes = this.openNodes.filter((n) => n !== parentNode);
                this.renderer.removeClass(parentNode, 'is-open');
            }
        }
        else {
            this.openNodes.push(parentNode);
            this.renderer.setAttribute(node, 'aria-expanded', 'true');
        }
        this.updateClasses();
        event.stopImmediatePropagation();
        event.stopPropagation();
    }
    back() {
        if (this.openNodes[this.openNodes.length - 1]) {
            this.renderer.removeClass(this.openNodes[this.openNodes.length - 1], 'is-open');
            this.openNodes.pop();
            this.updateClasses();
        }
    }
    clear() {
        this.openNodes = [];
        this.updateClasses();
    }
    onMouseEnter(event) {
        this.alignWrapperToRightIfStickOut(event.currentTarget);
        this.focusAfterPreviousClicked(event);
    }
    getTotalDepth(node, depth = 0) {
        if (node.children && node.children.length > 0) {
            return Math.max(...node.children.map((n) => this.getTotalDepth(n, depth + 1)));
        }
        else {
            return depth;
        }
    }
    getColumnCount(length) {
        return Math.round(length / (this.wrapAfter || length));
    }
    focusAfterPreviousClicked(event) {
        const target = ((event.target || event.relatedTarget));
        if (target.ownerDocument.activeElement?.matches('nav[tabindex]') &&
            target.parentElement?.matches('.flyout')) {
            target.focus();
        }
        return target.ownerDocument;
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    alignWrapperToRightIfStickOut(node) {
        const wrapper = node.querySelector('.wrapper');
        const body = node.closest('body');
        if (wrapper) {
            this.renderer.removeStyle(wrapper, 'margin-left');
            if (wrapper.offsetLeft + wrapper.offsetWidth >
                body.offsetLeft + body.offsetWidth) {
                this.renderer.setStyle(wrapper, 'margin-left', `${node.offsetWidth - wrapper.offsetWidth}px`);
            }
        }
    }
    alignWrappersToRightIfStickOut() {
        const navs = this.elemRef.nativeElement.childNodes;
        Array.from(navs)
            .filter((node) => node.tagName === 'LI')
            .forEach((nav) => this.alignWrapperToRightIfStickOut(nav));
    }
    updateClasses() {
        this.openNodes.forEach((node, i) => {
            if (i + 1 < this.openNodes.length) {
                this.renderer.addClass(node, 'is-opened');
                this.renderer.removeClass(node, 'is-open');
            }
            else {
                this.renderer.removeClass(node, 'is-opened');
                this.renderer.addClass(node, 'is-open');
            }
        });
        this.isOpen = this.openNodes.length > 0;
    }
}
NavigationUIComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NavigationUIComponent, deps: [{ token: i1.Router }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i2.HamburgerMenuService }, { token: i3.WindowRef }], target: i0.ɵɵFactoryTarget.Component });
NavigationUIComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: NavigationUIComponent, selector: "cx-navigation-ui", inputs: { node: "node", wrapAfter: "wrapAfter", resetMenuOnClose: "resetMenuOnClose", navAriaLabel: "navAriaLabel", flyout: "flyout", isOpen: "isOpen" }, host: { listeners: { "window:resize": "onResize()" }, properties: { "class.flyout": "this.flyout", "class.is-open": "this.isOpen" } }, ngImport: i0, template: "<nav [attr.aria-label]=\"navAriaLabel\">\n  <ul>\n    <li\n      *ngIf=\"flyout && (node?.children?.length ?? 0) > 1\"\n      class=\"back is-open\"\n    >\n      <button (click)=\"back()\">\n        <cx-icon [type]=\"iconType.CARET_LEFT\"></cx-icon>\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </li>\n\n    <ng-container *ngFor=\"let child of node?.children\">\n      <ng-container *ngTemplateOutlet=\"nav; context: { node: child, depth: 0 }\">\n      </ng-container>\n    </ng-container>\n  </ul>\n</nav>\n<!-- we generate links in a recursive manner -->\n\n<ng-template #nav let-node=\"node\" let-depth=\"depth\">\n  <li>\n    <cx-generic-link\n      *ngIf=\"\n        node.url && (!node.children || node.children?.length === 0);\n        else heading\n      \"\n      [url]=\"node.url\"\n      [target]=\"node.target\"\n      [style]=\"node.styleAttributes\"\n      [class]=\"node.styleClasses\"\n      (click)=\"closeIfClickedTheSameLink(node)\"\n    >\n      {{ node.title }}\n    </cx-generic-link>\n\n    <ng-template #heading>\n      <ng-container *ngIf=\"flyout && node.children?.length > 0; else title\">\n        <cx-generic-link\n          *ngIf=\"node.url\"\n          [url]=\"node.url\"\n          [target]=\"node.target\"\n          (click)=\"closeIfClickedTheSameLink(node)\"\n        >\n          {{ node.title }}\n        </cx-generic-link>\n        <button\n          [attr.tabindex]=\"depth < 1 ? 0 : -1\"\n          [attr.aria-haspopup]=\"true\"\n          [attr.aria-expanded]=\"false\"\n          [attr.aria-label]=\"node.title\"\n          (click)=\"toggleOpen($any($event))\"\n          (mouseenter)=\"onMouseEnter($event)\"\n          (keydown.space)=\"toggleOpen($any($event))\"\n          (keydown.esc)=\"back()\"\n        >\n          <ng-container *ngIf=\"!node.url\">\n            {{ node.title }}\n          </ng-container>\n          <cx-icon [type]=\"iconType.CARET_DOWN\"></cx-icon>\n        </button>\n      </ng-container>\n      <ng-template #title>\n        <span *ngIf=\"node.title\" [attr.tabindex]=\"-1\">\n          {{ node.title }}\n        </span>\n      </ng-template>\n    </ng-template>\n\n    <!-- we add a wrapper to allow for better layout handling in CSS -->\n    <div class=\"wrapper\" *ngIf=\"node.children && node.children.length > 0\">\n      <ul\n        class=\"childs\"\n        [attr.depth]=\"getTotalDepth(node)\"\n        [attr.wrap-after]=\"node.children.length > wrapAfter ? wrapAfter : null\"\n        [attr.columns]=\"getColumnCount(node.children.length)\"\n      >\n        <ng-container *ngFor=\"let child of node.children\">\n          <ng-container\n            *ngTemplateOutlet=\"nav; context: { node: child, depth: depth + 1 }\"\n          >\n          </ng-container>\n        </ng-container>\n      </ul>\n    </div>\n  </li>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i5.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i6.GenericLinkComponent, selector: "cx-generic-link", inputs: ["url", "target", "id", "class", "style", "title"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NavigationUIComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-navigation-ui', changeDetection: ChangeDetectionStrategy.OnPush, template: "<nav [attr.aria-label]=\"navAriaLabel\">\n  <ul>\n    <li\n      *ngIf=\"flyout && (node?.children?.length ?? 0) > 1\"\n      class=\"back is-open\"\n    >\n      <button (click)=\"back()\">\n        <cx-icon [type]=\"iconType.CARET_LEFT\"></cx-icon>\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </li>\n\n    <ng-container *ngFor=\"let child of node?.children\">\n      <ng-container *ngTemplateOutlet=\"nav; context: { node: child, depth: 0 }\">\n      </ng-container>\n    </ng-container>\n  </ul>\n</nav>\n<!-- we generate links in a recursive manner -->\n\n<ng-template #nav let-node=\"node\" let-depth=\"depth\">\n  <li>\n    <cx-generic-link\n      *ngIf=\"\n        node.url && (!node.children || node.children?.length === 0);\n        else heading\n      \"\n      [url]=\"node.url\"\n      [target]=\"node.target\"\n      [style]=\"node.styleAttributes\"\n      [class]=\"node.styleClasses\"\n      (click)=\"closeIfClickedTheSameLink(node)\"\n    >\n      {{ node.title }}\n    </cx-generic-link>\n\n    <ng-template #heading>\n      <ng-container *ngIf=\"flyout && node.children?.length > 0; else title\">\n        <cx-generic-link\n          *ngIf=\"node.url\"\n          [url]=\"node.url\"\n          [target]=\"node.target\"\n          (click)=\"closeIfClickedTheSameLink(node)\"\n        >\n          {{ node.title }}\n        </cx-generic-link>\n        <button\n          [attr.tabindex]=\"depth < 1 ? 0 : -1\"\n          [attr.aria-haspopup]=\"true\"\n          [attr.aria-expanded]=\"false\"\n          [attr.aria-label]=\"node.title\"\n          (click)=\"toggleOpen($any($event))\"\n          (mouseenter)=\"onMouseEnter($event)\"\n          (keydown.space)=\"toggleOpen($any($event))\"\n          (keydown.esc)=\"back()\"\n        >\n          <ng-container *ngIf=\"!node.url\">\n            {{ node.title }}\n          </ng-container>\n          <cx-icon [type]=\"iconType.CARET_DOWN\"></cx-icon>\n        </button>\n      </ng-container>\n      <ng-template #title>\n        <span *ngIf=\"node.title\" [attr.tabindex]=\"-1\">\n          {{ node.title }}\n        </span>\n      </ng-template>\n    </ng-template>\n\n    <!-- we add a wrapper to allow for better layout handling in CSS -->\n    <div class=\"wrapper\" *ngIf=\"node.children && node.children.length > 0\">\n      <ul\n        class=\"childs\"\n        [attr.depth]=\"getTotalDepth(node)\"\n        [attr.wrap-after]=\"node.children.length > wrapAfter ? wrapAfter : null\"\n        [attr.columns]=\"getColumnCount(node.children.length)\"\n      >\n        <ng-container *ngFor=\"let child of node.children\">\n          <ng-container\n            *ngTemplateOutlet=\"nav; context: { node: child, depth: depth + 1 }\"\n          >\n          </ng-container>\n        </ng-container>\n      </ul>\n    </div>\n  </li>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i2.HamburgerMenuService }, { type: i3.WindowRef }]; }, propDecorators: { node: [{
                type: Input
            }], wrapAfter: [{
                type: Input
            }], resetMenuOnClose: [{
                type: Input
            }], navAriaLabel: [{
                type: Input
            }], flyout: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.flyout']
            }], isOpen: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.is-open']
            }], onResize: [{
                type: HostListener,
                args: ['window:resize']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi11aS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLXVpLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uL25hdmlnYXRpb24tdWkuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssR0FJTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Ozs7QUFTbEQsTUFBTSxPQUFPLHFCQUFxQjtJQXFDaEMsUUFBUTtRQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxZQUNVLE1BQWMsRUFDZCxRQUFtQixFQUNuQixPQUFtQixFQUNqQixvQkFBMEMsRUFDMUMsTUFBaUI7UUFKbkIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNqQix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLFdBQU0sR0FBTixNQUFNLENBQVc7UUE3QjdCOzs7V0FHRztRQUNILGFBQVEsR0FBRyxTQUFTLENBQUM7UUFFckI7Ozs7V0FJRztRQUNtQyxXQUFNLEdBQUcsSUFBSSxDQUFDO1FBRWIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUU5QyxjQUFTLEdBQWtCLEVBQUUsQ0FBQztRQUM5QixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbkMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFjbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTthQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssWUFBWSxhQUFhLENBQUMsQ0FBQzthQUN2RCxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQ2pDLENBQUM7UUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNoRCxJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILG1CQUFtQjtRQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FDcEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLFVBQVU7YUFDbEMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzdDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ0osQ0FBQztJQUVELHlCQUF5QixDQUFDLE9BQXVCO1FBQy9DLElBQ0UsT0FBTyxPQUFPLENBQUMsR0FBRyxLQUFLLFFBQVE7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUM3RDtZQUNBLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYTtpQkFDdkIsZ0JBQWdCLENBQUMscUNBQXFDLENBQUM7aUJBQ3ZELE9BQU8sQ0FBQyxDQUFDLEVBQU8sRUFBRSxFQUFFO2dCQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUM3QyxDQUFDLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNwQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQjtRQUNkLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQztJQUVTLGlCQUFpQjtRQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ3BDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztpQkFDNUIsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxLQUFLLFFBQVEsQ0FBQztpQkFDdEQsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbEUsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBYztRQUN2QixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzVCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN4QjtRQUNELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sSUFBSSxHQUFnQixLQUFLLENBQUMsYUFBYSxDQUFDO1FBQzlDLE1BQU0sVUFBVSxHQUFnQixJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2hELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkMsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2I7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDbEQ7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMzRDtRQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNqQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQ3pDLFNBQVMsQ0FDVixDQUFDO1lBQ0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWlCO1FBQzVCLElBQUksQ0FBQyw2QkFBNkIsQ0FBYyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBb0IsRUFBRSxLQUFLLEdBQUcsQ0FBQztRQUMzQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FDYixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDOUQsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVELGNBQWMsQ0FBQyxNQUFjO1FBQzNCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELHlCQUF5QixDQUFDLEtBQWlCO1FBQ3pDLE1BQU0sTUFBTSxHQUE2QixDQUN2QyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUN0QyxDQUFDO1FBQ0YsSUFDRSxNQUFNLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDO1lBQzVELE1BQU0sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUN4QztZQUNBLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjtRQUNELE9BQU8sTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUVPLDZCQUE2QixDQUFDLElBQWlCO1FBQ3JELE1BQU0sT0FBTyxHQUFnQixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVELE1BQU0sSUFBSSxHQUFnQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ2xELElBQ0UsT0FBTyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsV0FBVztnQkFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUNsQztnQkFDQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDcEIsT0FBTyxFQUNQLGFBQWEsRUFDYixHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsSUFBSSxDQUM5QyxDQUFDO2FBQ0g7U0FDRjtJQUNILENBQUM7SUFFTyw4QkFBOEI7UUFDcEMsTUFBTSxJQUFJLEdBQW1CLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUNuRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNiLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUM7YUFDdkMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRU8sYUFBYTtRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3pDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMxQyxDQUFDOztrSEEzT1UscUJBQXFCO3NHQUFyQixxQkFBcUIseVZDL0JsQywweEZBdUZBOzJGRHhEYSxxQkFBcUI7a0JBTGpDLFNBQVM7K0JBQ0Usa0JBQWtCLG1CQUVYLHVCQUF1QixDQUFDLE1BQU07eU1BTXRDLElBQUk7c0JBQVosS0FBSztnQkFLRyxTQUFTO3NCQUFqQixLQUFLO2dCQUtHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQVlnQyxNQUFNO3NCQUEzQyxLQUFLOztzQkFBSSxXQUFXO3VCQUFDLGNBQWM7Z0JBRUcsTUFBTTtzQkFBNUMsS0FBSzs7c0JBQUksV0FBVzt1QkFBQyxlQUFlO2dCQU9yQyxRQUFRO3NCQURQLFlBQVk7dUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElDT05fVFlQRSB9IGZyb20gJy4uLy4uL21pc2MvaWNvbi9pbmRleCc7XG5pbXBvcnQgeyBIYW1idXJnZXJNZW51U2VydmljZSB9IGZyb20gJy4vLi4vLi4vLi4vbGF5b3V0L2hlYWRlci9oYW1idXJnZXItbWVudS9oYW1idXJnZXItbWVudS5zZXJ2aWNlJztcbmltcG9ydCB7IE5hdmlnYXRpb25Ob2RlIH0gZnJvbSAnLi9uYXZpZ2F0aW9uLW5vZGUubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1uYXZpZ2F0aW9uLXVpJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25hdmlnYXRpb24tdWkuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblVJQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVGhlIG5hdmlnYXRpb24gbm9kZSB0byByZW5kZXIuXG4gICAqL1xuICBASW5wdXQoKSBub2RlOiBOYXZpZ2F0aW9uTm9kZSB8IG51bGw7XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgY2hpbGQgbm9kZXMgdGhhdCBtdXN0IGJlIHdyYXBwZWQuXG4gICAqL1xuICBASW5wdXQoKSB3cmFwQWZ0ZXI6IG51bWJlcjtcblxuICAvKipcbiAgICogRmxhZyBpbmRpY2F0ZXMgd2hldGhlciB0byByZXNldCB0aGUgc3RhdGUgb2YgbWVudSBuYXZpZ2F0aW9uIChpZS4gQ29sbGFwc2UgYWxsIHN1Ym1lbnVzKSB3aGVuIHRoZSBtZW51IGlzIGNsb3NlZC5cbiAgICovXG4gIEBJbnB1dCgpIHJlc2V0TWVudU9uQ2xvc2U6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgQElucHV0KCkgbmF2QXJpYUxhYmVsOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkO1xuICAvKipcbiAgICogdGhlIGljb24gdHlwZSB0aGF0IHdpbGwgYmUgdXNlZCBmb3IgbmF2aWdhdGlvbiBub2Rlc1xuICAgKiB3aXRoIGNoaWxkcmVuLlxuICAgKi9cbiAgaWNvblR5cGUgPSBJQ09OX1RZUEU7XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBuYXZpZ2F0aW9uIHNob3VsZCBzdXBwb3J0IGZseW91dC5cbiAgICogSWYgZmx5b3V0IGlzIHNldCB0byB0cnVlLCB0aGVcbiAgICogbmVzdGVkIGNoaWxkIG5hdmlnYXRpb24gbm9kZXMgd2lsbCBvbmx5IGFwcGVhciBvbiBob3ZlciBvciBmb2N1cy5cbiAgICovXG4gIEBJbnB1dCgpIEBIb3N0QmluZGluZygnY2xhc3MuZmx5b3V0JykgZmx5b3V0ID0gdHJ1ZTtcblxuICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLmlzLW9wZW4nKSBpc09wZW4gPSBmYWxzZTtcblxuICBwcml2YXRlIG9wZW5Ob2RlczogSFRNTEVsZW1lbnRbXSA9IFtdO1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByaXZhdGUgcmVzaXplID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICBvblJlc2l6ZSgpIHtcbiAgICB0aGlzLnJlc2l6ZS5uZXh0KHVuZGVmaW5lZCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsZW1SZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIGhhbWJ1cmdlck1lbnVTZXJ2aWNlOiBIYW1idXJnZXJNZW51U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgd2luUmVmOiBXaW5kb3dSZWZcbiAgKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMucm91dGVyLmV2ZW50c1xuICAgICAgICAucGlwZShmaWx0ZXIoKGV2ZW50KSA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xlYXIoKSlcbiAgICApO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5hZGQoXG4gICAgICB0aGlzLnJlc2l6ZS5waXBlKGRlYm91bmNlVGltZSg1MCkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYWxpZ25XcmFwcGVyc1RvUmlnaHRJZlN0aWNrT3V0KCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRHVyaW5nIGluaXRpYWxpemF0aW9uIG9mIHRoaXMgY29tcG9uZW50LCB3ZSB3aWxsIGNoZWNrIHRoZSByZXNldE1lbnVPbkNsb3NlIGZsYWcgYW5kIGF0dGFjaCBhIG1lbnUgcmVzZXQgbGlzdGVuZXIgaWYgbmVlZGVkLlxuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMucmVzZXRNZW51T25DbG9zZSkge1xuICAgICAgdGhpcy5yZXNldE9uTWVudUNvbGxhcHNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHBlcmZvcm1zIHRoZSBhY3Rpb24gb2YgcmVzZXR0aW5nIHRoZSBtZW51IChjbG9zZSBhbGwgc3ViIG1lbnVzIGFuZCByZXR1cm4gdG8gbWFpbiBvcHRpb25zKVxuICAgKiB3aGVuIHRoZSBtZW51IGlzIGNsb3NlZC5cbiAgICovXG4gIHJlc2V0T25NZW51Q29sbGFwc2UoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMuaGFtYnVyZ2VyTWVudVNlcnZpY2U/LmlzRXhwYW5kZWRcbiAgICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgZmlsdGVyKEJvb2xlYW4pKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnJlaW5pdGlhbGl6ZU1lbnUoKTtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgY2xvc2VJZkNsaWNrZWRUaGVTYW1lTGluayhuYXZOb2RlOiBOYXZpZ2F0aW9uTm9kZSk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiBuYXZOb2RlLnVybCA9PT0gJ3N0cmluZycgJiZcbiAgICAgIHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdz8ubG9jYXRpb24uaHJlZi5pbmNsdWRlcyhuYXZOb2RlLnVybClcbiAgICApIHtcbiAgICAgIHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50XG4gICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdsaS5pcy1vcGVuOm5vdCguYmFjayksIGxpLmlzLW9wZW5lZCcpXG4gICAgICAgIC5mb3JFYWNoKChlbDogYW55KSA9PiB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhlbCwgJ2lzLW9wZW4nKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGVsLCAnaXMtb3BlbmVkJyk7XG4gICAgICAgIH0pO1xuICAgICAgdGhpcy5yZWluaXRpYWxpemVNZW51KCk7XG4gICAgICB0aGlzLmhhbWJ1cmdlck1lbnVTZXJ2aWNlLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBwZXJmb3JtcyB0aGUgYWN0aW9ucyByZXF1aXJlZCB0byByZXNldCB0aGUgc3RhdGUgb2YgdGhlIG1lbnUgYW5kIHJlc2V0IGFueSB2aXN1YWwgY29tcG9uZW50cy5cbiAgICovXG4gIHJlaW5pdGlhbGl6ZU1lbnUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMub3Blbk5vZGVzPy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LCAnaXMtb3BlbicpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhcmlhQ29sbGFwc2VOb2RlcygpOiB2b2lkIHtcbiAgICB0aGlzLm9wZW5Ob2Rlcy5mb3JFYWNoKChwYXJlbnROb2RlKSA9PiB7XG4gICAgICBBcnJheS5mcm9tKHBhcmVudE5vZGUuY2hpbGRyZW4pXG4gICAgICAgIC5maWx0ZXIoKGNoaWxkTm9kZSkgPT4gY2hpbGROb2RlPy50YWdOYW1lID09PSAnQlVUVE9OJylcbiAgICAgICAgLmZvckVhY2goKGNoaWxkTm9kZSkgPT4ge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGNoaWxkTm9kZSwgJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGVPcGVuKGV2ZW50OiBVSUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgdGhpcy5hcmlhQ29sbGFwc2VOb2RlcygpO1xuICAgIGNvbnN0IG5vZGUgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICBjb25zdCBwYXJlbnROb2RlID0gPEhUTUxFbGVtZW50Pm5vZGUucGFyZW50Tm9kZTtcbiAgICBpZiAodGhpcy5vcGVuTm9kZXMuaW5jbHVkZXMocGFyZW50Tm9kZSkpIHtcbiAgICAgIGlmIChldmVudC50eXBlID09PSAna2V5ZG93bicpIHtcbiAgICAgICAgdGhpcy5iYWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wZW5Ob2RlcyA9IHRoaXMub3Blbk5vZGVzLmZpbHRlcigobikgPT4gbiAhPT0gcGFyZW50Tm9kZSk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MocGFyZW50Tm9kZSwgJ2lzLW9wZW4nKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuTm9kZXMucHVzaChwYXJlbnROb2RlKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKG5vZGUsICdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUNsYXNzZXMoKTtcblxuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgYmFjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcGVuTm9kZXNbdGhpcy5vcGVuTm9kZXMubGVuZ3RoIC0gMV0pIHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoXG4gICAgICAgIHRoaXMub3Blbk5vZGVzW3RoaXMub3Blbk5vZGVzLmxlbmd0aCAtIDFdLFxuICAgICAgICAnaXMtb3BlbidcbiAgICAgICk7XG4gICAgICB0aGlzLm9wZW5Ob2Rlcy5wb3AoKTtcbiAgICAgIHRoaXMudXBkYXRlQ2xhc3NlcygpO1xuICAgIH1cbiAgfVxuXG4gIGNsZWFyKCk6IHZvaWQge1xuICAgIHRoaXMub3Blbk5vZGVzID0gW107XG4gICAgdGhpcy51cGRhdGVDbGFzc2VzKCk7XG4gIH1cblxuICBvbk1vdXNlRW50ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLmFsaWduV3JhcHBlclRvUmlnaHRJZlN0aWNrT3V0KDxIVE1MRWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICB0aGlzLmZvY3VzQWZ0ZXJQcmV2aW91c0NsaWNrZWQoZXZlbnQpO1xuICB9XG5cbiAgZ2V0VG90YWxEZXB0aChub2RlOiBOYXZpZ2F0aW9uTm9kZSwgZGVwdGggPSAwKTogbnVtYmVyIHtcbiAgICBpZiAobm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBNYXRoLm1heChcbiAgICAgICAgLi4ubm9kZS5jaGlsZHJlbi5tYXAoKG4pID0+IHRoaXMuZ2V0VG90YWxEZXB0aChuLCBkZXB0aCArIDEpKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRlcHRoO1xuICAgIH1cbiAgfVxuXG4gIGdldENvbHVtbkNvdW50KGxlbmd0aDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChsZW5ndGggLyAodGhpcy53cmFwQWZ0ZXIgfHwgbGVuZ3RoKSk7XG4gIH1cblxuICBmb2N1c0FmdGVyUHJldmlvdXNDbGlja2VkKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgY29uc3QgdGFyZ2V0OiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD4oXG4gICAgICAoZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnJlbGF0ZWRUYXJnZXQpXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICB0YXJnZXQub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50Py5tYXRjaGVzKCduYXZbdGFiaW5kZXhdJykgJiZcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50Py5tYXRjaGVzKCcuZmx5b3V0JylcbiAgICApIHtcbiAgICAgIHRhcmdldC5mb2N1cygpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0Lm93bmVyRG9jdW1lbnQ7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb25zKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFsaWduV3JhcHBlclRvUmlnaHRJZlN0aWNrT3V0KG5vZGU6IEhUTUxFbGVtZW50KSB7XG4gICAgY29uc3Qgd3JhcHBlciA9IDxIVE1MRWxlbWVudD5ub2RlLnF1ZXJ5U2VsZWN0b3IoJy53cmFwcGVyJyk7XG4gICAgY29uc3QgYm9keSA9IDxIVE1MRWxlbWVudD5ub2RlLmNsb3Nlc3QoJ2JvZHknKTtcbiAgICBpZiAod3JhcHBlcikge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZSh3cmFwcGVyLCAnbWFyZ2luLWxlZnQnKTtcbiAgICAgIGlmIChcbiAgICAgICAgd3JhcHBlci5vZmZzZXRMZWZ0ICsgd3JhcHBlci5vZmZzZXRXaWR0aCA+XG4gICAgICAgIGJvZHkub2Zmc2V0TGVmdCArIGJvZHkub2Zmc2V0V2lkdGhcbiAgICAgICkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICAgIHdyYXBwZXIsXG4gICAgICAgICAgJ21hcmdpbi1sZWZ0JyxcbiAgICAgICAgICBgJHtub2RlLm9mZnNldFdpZHRoIC0gd3JhcHBlci5vZmZzZXRXaWR0aH1weGBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFsaWduV3JhcHBlcnNUb1JpZ2h0SWZTdGlja091dCgpIHtcbiAgICBjb25zdCBuYXZzID0gPEhUTUxDb2xsZWN0aW9uPnRoaXMuZWxlbVJlZi5uYXRpdmVFbGVtZW50LmNoaWxkTm9kZXM7XG4gICAgQXJyYXkuZnJvbShuYXZzKVxuICAgICAgLmZpbHRlcigobm9kZSkgPT4gbm9kZS50YWdOYW1lID09PSAnTEknKVxuICAgICAgLmZvckVhY2goKG5hdikgPT4gdGhpcy5hbGlnbldyYXBwZXJUb1JpZ2h0SWZTdGlja091dCg8SFRNTEVsZW1lbnQ+bmF2KSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNsYXNzZXMoKTogdm9pZCB7XG4gICAgdGhpcy5vcGVuTm9kZXMuZm9yRWFjaCgobm9kZSwgaSkgPT4ge1xuICAgICAgaWYgKGkgKyAxIDwgdGhpcy5vcGVuTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mobm9kZSwgJ2lzLW9wZW5lZCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKG5vZGUsICdpcy1vcGVuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKG5vZGUsICdpcy1vcGVuZWQnKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhub2RlLCAnaXMtb3BlbicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5pc09wZW4gPSB0aGlzLm9wZW5Ob2Rlcy5sZW5ndGggPiAwO1xuICB9XG59XG4iLCI8bmF2IFthdHRyLmFyaWEtbGFiZWxdPVwibmF2QXJpYUxhYmVsXCI+XG4gIDx1bD5cbiAgICA8bGlcbiAgICAgICpuZ0lmPVwiZmx5b3V0ICYmIChub2RlPy5jaGlsZHJlbj8ubGVuZ3RoID8/IDApID4gMVwiXG4gICAgICBjbGFzcz1cImJhY2sgaXMtb3BlblwiXG4gICAgPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiYmFjaygpXCI+XG4gICAgICAgIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlLkNBUkVUX0xFRlRcIj48L2N4LWljb24+XG4gICAgICAgIHt7ICdjb21tb24uYmFjaycgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9saT5cblxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkIG9mIG5vZGU/LmNoaWxkcmVuXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibmF2OyBjb250ZXh0OiB7IG5vZGU6IGNoaWxkLCBkZXB0aDogMCB9XCI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC91bD5cbjwvbmF2PlxuPCEtLSB3ZSBnZW5lcmF0ZSBsaW5rcyBpbiBhIHJlY3Vyc2l2ZSBtYW5uZXIgLS0+XG5cbjxuZy10ZW1wbGF0ZSAjbmF2IGxldC1ub2RlPVwibm9kZVwiIGxldC1kZXB0aD1cImRlcHRoXCI+XG4gIDxsaT5cbiAgICA8Y3gtZ2VuZXJpYy1saW5rXG4gICAgICAqbmdJZj1cIlxuICAgICAgICBub2RlLnVybCAmJiAoIW5vZGUuY2hpbGRyZW4gfHwgbm9kZS5jaGlsZHJlbj8ubGVuZ3RoID09PSAwKTtcbiAgICAgICAgZWxzZSBoZWFkaW5nXG4gICAgICBcIlxuICAgICAgW3VybF09XCJub2RlLnVybFwiXG4gICAgICBbdGFyZ2V0XT1cIm5vZGUudGFyZ2V0XCJcbiAgICAgIFtzdHlsZV09XCJub2RlLnN0eWxlQXR0cmlidXRlc1wiXG4gICAgICBbY2xhc3NdPVwibm9kZS5zdHlsZUNsYXNzZXNcIlxuICAgICAgKGNsaWNrKT1cImNsb3NlSWZDbGlja2VkVGhlU2FtZUxpbmsobm9kZSlcIlxuICAgID5cbiAgICAgIHt7IG5vZGUudGl0bGUgfX1cbiAgICA8L2N4LWdlbmVyaWMtbGluaz5cblxuICAgIDxuZy10ZW1wbGF0ZSAjaGVhZGluZz5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJmbHlvdXQgJiYgbm9kZS5jaGlsZHJlbj8ubGVuZ3RoID4gMDsgZWxzZSB0aXRsZVwiPlxuICAgICAgICA8Y3gtZ2VuZXJpYy1saW5rXG4gICAgICAgICAgKm5nSWY9XCJub2RlLnVybFwiXG4gICAgICAgICAgW3VybF09XCJub2RlLnVybFwiXG4gICAgICAgICAgW3RhcmdldF09XCJub2RlLnRhcmdldFwiXG4gICAgICAgICAgKGNsaWNrKT1cImNsb3NlSWZDbGlja2VkVGhlU2FtZUxpbmsobm9kZSlcIlxuICAgICAgICA+XG4gICAgICAgICAge3sgbm9kZS50aXRsZSB9fVxuICAgICAgICA8L2N4LWdlbmVyaWMtbGluaz5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImRlcHRoIDwgMSA/IDAgOiAtMVwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1oYXNwb3B1cF09XCJ0cnVlXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cImZhbHNlXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIm5vZGUudGl0bGVcIlxuICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVPcGVuKCRhbnkoJGV2ZW50KSlcIlxuICAgICAgICAgIChtb3VzZWVudGVyKT1cIm9uTW91c2VFbnRlcigkZXZlbnQpXCJcbiAgICAgICAgICAoa2V5ZG93bi5zcGFjZSk9XCJ0b2dnbGVPcGVuKCRhbnkoJGV2ZW50KSlcIlxuICAgICAgICAgIChrZXlkb3duLmVzYyk9XCJiYWNrKClcIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFub2RlLnVybFwiPlxuICAgICAgICAgICAge3sgbm9kZS50aXRsZSB9fVxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlLkNBUkVUX0RPV05cIj48L2N4LWljb24+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctdGVtcGxhdGUgI3RpdGxlPlxuICAgICAgICA8c3BhbiAqbmdJZj1cIm5vZGUudGl0bGVcIiBbYXR0ci50YWJpbmRleF09XCItMVwiPlxuICAgICAgICAgIHt7IG5vZGUudGl0bGUgfX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPCEtLSB3ZSBhZGQgYSB3cmFwcGVyIHRvIGFsbG93IGZvciBiZXR0ZXIgbGF5b3V0IGhhbmRsaW5nIGluIENTUyAtLT5cbiAgICA8ZGl2IGNsYXNzPVwid3JhcHBlclwiICpuZ0lmPVwibm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDBcIj5cbiAgICAgIDx1bFxuICAgICAgICBjbGFzcz1cImNoaWxkc1wiXG4gICAgICAgIFthdHRyLmRlcHRoXT1cImdldFRvdGFsRGVwdGgobm9kZSlcIlxuICAgICAgICBbYXR0ci53cmFwLWFmdGVyXT1cIm5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gd3JhcEFmdGVyID8gd3JhcEFmdGVyIDogbnVsbFwiXG4gICAgICAgIFthdHRyLmNvbHVtbnNdPVwiZ2V0Q29sdW1uQ291bnQobm9kZS5jaGlsZHJlbi5sZW5ndGgpXCJcbiAgICAgID5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlblwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwibmF2OyBjb250ZXh0OiB7IG5vZGU6IGNoaWxkLCBkZXB0aDogZGVwdGggKyAxIH1cIlxuICAgICAgICAgID5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICA8L2xpPlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==