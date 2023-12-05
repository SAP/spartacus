import { AfterViewInit, ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { LockFocusConfig } from '../keyboard-focus.model';
import { TrapFocusDirective } from '../trap/trap-focus.directive';
import { LockFocusService } from './lock-focus.service';
import * as i0 from "@angular/core";
/**
 * Directive that adds persistence for focussed element in case
 * the elements are being rebuild. This happens often when change
 * detection kicks in because of new data set from the backend.
 */
export declare class LockFocusDirective extends TrapFocusDirective implements OnInit, AfterViewInit {
    protected elementRef: ElementRef;
    protected service: LockFocusService;
    protected renderer: Renderer2;
    protected defaultConfig: LockFocusConfig;
    protected config: LockFocusConfig;
    /**
     * Indicates that the host is configured to use locking. This is available as a
     * CSS class `focus-lock`.
     */
    shouldLock: boolean | undefined;
    /**
     * Indicates that the host is locked. This is available as a CSS class `is-locked`.
     */
    isLocked: boolean;
    /**
     * Emits an event when the host is unlocked.
     */
    unlock: EventEmitter<boolean>;
    /**
     * When the user selects enter or space, the focusable childs are
     * unlocked, which means that the tabindex is set to 0.
     */
    handleEnter(event: KeyboardEvent): void;
    /**
     * In case any of the children elements is touched by the mouse,
     * we unlock the group to not break the mouse-experience.
     */
    handleClick(event: UIEvent): void;
    constructor(elementRef: ElementRef, service: LockFocusService, renderer: Renderer2);
    protected lockFocus(): void;
    protected unlockFocus(event?: UIEvent): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    handleFocus(event?: KeyboardEvent): void;
    handleEscape(event: KeyboardEvent): void;
    /**
     * When the handleFocus is called without an actual event, it's coming from Autofocus.
     * In this case we unlock the focusable children in case there's a focusable child that
     * was unlocked before.
     *
     * We keep this private to not polute the API.
     */
    private shouldUnlockAfterAutofocus;
    /**
     * Add the tabindex attribute to the focusable children elements
     */
    protected addTabindexToChildren(i?: number): void;
    /**
     * Utility method, returns all focusable children for the host element.
     *
     * We keep this private to not polute the API.
     */
    private get hasFocusableChildren();
    /**
     * Returns the focusable children of the host element. If the host element
     * is configured to be locked, the query is restricted to child elements
     * with a tabindex !== `-1`.
     *
     * We keep this private to not polute the API.
     */
    private get focusable();
    static ɵfac: i0.ɵɵFactoryDeclaration<LockFocusDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<LockFocusDirective, never, never, {}, { "unlock": "unlock"; }, never, never, false, never>;
}
