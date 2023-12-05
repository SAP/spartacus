import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRef } from '@spartacus/core';
import { ICON_TYPE } from '../../misc/icon/index';
import { HamburgerMenuService } from './../../../layout/header/hamburger-menu/hamburger-menu.service';
import { NavigationNode } from './navigation-node.model';
import * as i0 from "@angular/core";
export declare class NavigationUIComponent implements OnInit, OnDestroy {
    private router;
    private renderer;
    private elemRef;
    protected hamburgerMenuService: HamburgerMenuService;
    protected winRef: WindowRef;
    /**
     * The navigation node to render.
     */
    node: NavigationNode | null;
    /**
     * The number of child nodes that must be wrapped.
     */
    wrapAfter: number;
    /**
     * Flag indicates whether to reset the state of menu navigation (ie. Collapse all submenus) when the menu is closed.
     */
    resetMenuOnClose: boolean | undefined;
    navAriaLabel: string | null | undefined;
    /**
     * the icon type that will be used for navigation nodes
     * with children.
     */
    iconType: typeof ICON_TYPE;
    /**
     * Indicates whether the navigation should support flyout.
     * If flyout is set to true, the
     * nested child navigation nodes will only appear on hover or focus.
     */
    flyout: boolean;
    isOpen: boolean;
    private openNodes;
    private subscriptions;
    private resize;
    onResize(): void;
    constructor(router: Router, renderer: Renderer2, elemRef: ElementRef, hamburgerMenuService: HamburgerMenuService, winRef: WindowRef);
    /**
     * During initialization of this component, we will check the resetMenuOnClose flag and attach a menu reset listener if needed.
     */
    ngOnInit(): void;
    /**
     * This method performs the action of resetting the menu (close all sub menus and return to main options)
     * when the menu is closed.
     */
    resetOnMenuCollapse(): void;
    closeIfClickedTheSameLink(navNode: NavigationNode): void;
    /**
     * This method performs the actions required to reset the state of the menu and reset any visual components.
     */
    reinitializeMenu(): void;
    protected ariaCollapseNodes(): void;
    toggleOpen(event: UIEvent): void;
    back(): void;
    clear(): void;
    onMouseEnter(event: MouseEvent): void;
    getTotalDepth(node: NavigationNode, depth?: number): number;
    getColumnCount(length: number): number;
    focusAfterPreviousClicked(event: MouseEvent): Document;
    ngOnDestroy(): void;
    private alignWrapperToRightIfStickOut;
    private alignWrappersToRightIfStickOut;
    private updateClasses;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationUIComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavigationUIComponent, "cx-navigation-ui", never, { "node": "node"; "wrapAfter": "wrapAfter"; "resetMenuOnClose": "resetMenuOnClose"; "navAriaLabel": "navAriaLabel"; "flyout": "flyout"; "isOpen": "isOpen"; }, {}, never, never, false, never>;
}
