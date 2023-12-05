import { ElementRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';
import { BreakpointService } from '../../../../layout/breakpoint/breakpoint.service';
import * as i0 from "@angular/core";
export declare class ProductFacetNavigationComponent {
    protected breakpointService: BreakpointService;
    iconTypes: typeof ICON_TYPE;
    /**
     * We delay the removal of DOM so that animations can finish playing before the
     * DOM is removed. Removing the DOM, as hidding is not enough to stop elements
     * to be focused.
     */
    protected CLOSE_DELAY: number;
    /**
     * Used to open the facet navigation in a dialog. The usage of the dialog depends
     * on the availability of the trigger element, which is driven by CSS.
     *
     * The reference is also used to refocus the trigger after the dialog is closed.
     */
    trigger: ElementRef<HTMLElement>;
    protected open$: BehaviorSubject<boolean>;
    /**
     * Emits the open state that indicates whether the facet list should be rendered.
     * This is either done instantly, or after the user triggers this by using the trigger
     * button. This driven by the visiibility of the trigger, so that the CSS drives
     * the behaviour. This can differ per breakpoint.
     *
     * There's a configurable delay for the closed state, so that the DOM is not removed
     * before some CSS animations are done.
     */
    isOpen$: Observable<boolean>;
    /**
     * Emits the active state that indicates whether the facet list is activated. Activation
     * is related to the css, so that a animation or transition can visualize opening/closing
     * the list (i.e. dialog).
     */
    isActive$: Observable<boolean>;
    constructor(breakpointService: BreakpointService);
    launch(): void;
    close(): void;
    /**
     * Indicates that the facet navigation should be open explicitely by a trigger.
     * This is fully controlled by CSS, where the trigger button can be hidden
     * (display:none) for certain screen sizes.
     */
    get hasTrigger(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductFacetNavigationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductFacetNavigationComponent, "cx-product-facet-navigation", never, {}, {}, never, never, false, never>;
}
