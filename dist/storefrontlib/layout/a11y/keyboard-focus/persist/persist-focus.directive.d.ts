import { AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { BlockFocusDirective } from '../block/block-focus.directive';
import { PersistFocusConfig } from '../keyboard-focus.model';
import { PersistFocusService } from './persist-focus.service';
import * as i0 from "@angular/core";
/**
 * Directive that provides persistence of the focused state. This is useful
 * when a group of focusable elements got refocused or even recreated. That
 * happens often when the DOM is constructed with an `*ngIf` or `*ngFor`.
 *
 * The focus state is based on a configured _key_, which can be passed in the
 * config input, either by using a string primitive or `PersistFocusConfig.key`:
 *
 * ```html
 * <button cxPersistFocus="myKey"></button>
 * <button cxFocus="myKey"></button>
 * <button [cxFocus]="{{key:'myKey'}"></button>
 * ```
 *
 * The focus state can be part of a focus _group_, so that the state is shared
 * and remember for the given group. In order to detect the persistence for a
 * given element, we store the persistence key as a data attribute (`data-cx-focus`):
 *
 * ```html
 * <button data-cx-focus="myKey"></button>
 * ```
 *
 * Other keyboard focus directives can read the key to understand whether the element
 * should retrieve focus.
 *
 */
export declare class PersistFocusDirective extends BlockFocusDirective implements OnInit, AfterViewInit {
    protected elementRef: ElementRef;
    protected service: PersistFocusService;
    protected defaultConfig: PersistFocusConfig;
    /**
     * The persistence key can be passed directly or through the `FocusConfig.key`.
     * While this could be considered a global key, the likeliness of conflicts
     * is very small since the key is cleared when the focus is changed.
     */
    protected config: PersistFocusConfig;
    /**
     * The persistence key is maintained in an element attribute for other
     * implementations. This is needed to ensure that we can resolve the focus
     * state in case of a repaint.
     */
    attr: string | undefined;
    handleFocus(event?: KeyboardEvent): void;
    constructor(elementRef: ElementRef, service: PersistFocusService);
    ngOnInit(): void;
    protected setDefaultConfiguration(): void;
    /**
     * Focus the element explicitly if it was focused before.
     */
    ngAfterViewInit(): void;
    protected get isPersisted(): boolean;
    /**
     * Returns the key for the host element, which is used to persist the
     * focus state. This is useful in cases where the DOM is rebuild.
     */
    protected get key(): string | undefined;
    /**
     * returns the persistence group (if any) for the focusable elements.
     */
    protected get group(): string | null | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<PersistFocusDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PersistFocusDirective, never, never, {}, {}, never, never, false, never>;
}
