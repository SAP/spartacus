import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class NgSelectA11yDirective implements AfterViewInit {
    private renderer;
    private elementRef;
    /**
     * Use directive to bind aria attribute to inner element of ng-select
     * Angular component for accessibility compliance. If ng-select controls itself
     * ariaControls is not needed, instead bind a specific id to the <ng-select> element.
     */
    cxNgSelectA11y: {
        ariaLabel?: string;
        ariaControls?: string;
    };
    constructor(renderer: Renderer2, elementRef: ElementRef);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgSelectA11yDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgSelectA11yDirective, "[cxNgSelectA11y]", never, { "cxNgSelectA11y": "cxNgSelectA11y"; }, {}, never, never, false, never>;
}
