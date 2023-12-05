import { AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { EscapeFocusDirective } from '../escape/escape-focus.directive';
import { AutoFocusConfig } from '../keyboard-focus.model';
import { AutoFocusService } from './auto-focus.service';
import * as i0 from "@angular/core";
/**
 * Directive that focus the first nested _focusable_ element based on state and configuration:
 *
 * 1. focusable element that was left in a focused state (aka _persisted_ focus)
 * 2. focusable element selected by configured CSS selector (i.e. 'button[type=submit]')
 * 3. focusable element marked with the native HTML5 `autofocus` attribute
 * 4. first focusable element
 * 5. the host element, in case the configured CSS selector is `:host`.
 *
 * Example configurations:
 *
 * `<div cxAutoFocus>[...]</div>`
 *
 * `<div [cxAutoFocus]="{autofocus: false}">[...]</div>`
 *
 * `<div [cxAutoFocus]="{autofocus: 'button.active'}">[...]</div>`
 *
 * `<div [cxAutoFocus]="{autofocus: ':host'}">[...]</div>`
 *
 * When your element is added dynamically (ie. by using an *ngIf or after a DOM change), the
 * focus can be refreshed by using the refreshFocus configuration.
 */
export declare class AutoFocusDirective extends EscapeFocusDirective implements AfterViewInit, OnChanges {
    protected elementRef: ElementRef;
    protected service: AutoFocusService;
    /** The AutoFocusDirective will be using autofocus by default  */
    protected defaultConfig: AutoFocusConfig;
    protected config: AutoFocusConfig;
    constructor(elementRef: ElementRef, service: AutoFocusService);
    /**
     * Focus the element explicitly if it was focussed before.
     */
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Mimic the focus without setting the actual focus on the host. The first
     * focusable child element will be focussed.
     */
    handleFocus(event?: KeyboardEvent): void;
    /**
     * Helper function to get the first focusable child element
     */
    protected get hasPersistedFocus(): boolean;
    /**
     * Helper function to indicate whether we should use autofocus for the
     * child elements.
     */
    protected get shouldAutofocus(): boolean;
    /**
     * Helper function to get the first focusable child element.
     *
     * We keep this private to not pollute the API.
     */
    private get firstFocusable();
    static ɵfac: i0.ɵɵFactoryDeclaration<AutoFocusDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AutoFocusDirective, never, never, {}, {}, never, never, false, never>;
}
