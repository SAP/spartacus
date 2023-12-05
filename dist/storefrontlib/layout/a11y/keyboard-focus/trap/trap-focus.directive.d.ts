import { ElementRef, OnInit } from '@angular/core';
import { TrapFocusConfig } from '../keyboard-focus.model';
import { TabFocusDirective } from '../tab/tab-focus.directive';
import { TrapFocusService } from './trap-focus.service';
import * as i0 from "@angular/core";
/**
 * Directive that keeps the focus inside the focusable child elements,
 * also known as a _focus trap_.
 */
export declare class TrapFocusDirective extends TabFocusDirective implements OnInit {
    protected elementRef: ElementRef;
    protected service: TrapFocusService;
    protected defaultConfig: TrapFocusConfig;
    protected config: TrapFocusConfig;
    handleTrapDown: (event: KeyboardEvent) => void;
    handleTrapUp: (event: KeyboardEvent) => void;
    constructor(elementRef: ElementRef, service: TrapFocusService);
    /**
     * Moves the focus of the element reference up or down, depending on the increment.
     * The focus of the element is trapped to avoid it from going out of the group.
     *
     * @param event UIEvent that is used to get the target element. The event is blocked
     *   from standard execution and further bubbling.
     * @param increment indicates whether the next or previous is focussed.
     */
    protected moveFocus(event: UIEvent, increment: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TrapFocusDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TrapFocusDirective, never, never, {}, {}, never, never, false, never>;
}
