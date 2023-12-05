import { ElementRef, TemplateRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Renderer2, ChangeDetectorRef, EventEmitter, OnInit } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Subject } from 'rxjs';
import { FocusConfig } from '../../../layout/a11y/keyboard-focus/keyboard-focus.model';
import { PopoverComponent } from './popover.component';
import { PopoverEvent, PopoverOptions } from './popover.model';
import { PopoverService } from './popover.service';
import * as i0 from "@angular/core";
/**
 * Directive to bind popover with any DOM element.
 */
export declare class PopoverDirective implements OnInit {
    protected element: ElementRef;
    protected viewContainer: ViewContainerRef;
    protected componentFactoryResolver: ComponentFactoryResolver;
    protected renderer: Renderer2;
    protected changeDetectorRef: ChangeDetectorRef;
    protected popoverService: PopoverService;
    protected winRef: WindowRef;
    /**
     * Template or string to be rendered inside popover wrapper component.
     */
    cxPopover: string | TemplateRef<any>;
    /**
     * Options set for popover component.
     */
    cxPopoverOptions?: PopoverOptions;
    /**
     * An event emitted when the popover is opened.
     */
    openPopover: EventEmitter<void>;
    /**
     * An event emitted when the popover is closed.
     */
    closePopover: EventEmitter<void>;
    /**
     * Flag used to inform about current state of popover component.
     * Popover is closed by default, so value is set to false.
     */
    isOpen: boolean;
    /**
     * Popover component instance.
     */
    popoverContainer: ComponentRef<PopoverComponent>;
    /**
     * Configuration for a11y improvements.
     */
    focusConfig: FocusConfig;
    /**
     * Subject which emits specific type of `PopoverEvent`.
     */
    eventSubject: Subject<PopoverEvent>;
    /**
     * Listen events fired on element binded to popover directive.
     *
     * Based on event type some a11y improvements can be made.
     * For example if popover was opened by `space` or `enter` key
     * dedicated `FocusConfig` can be set to autofocus first
     * focusable element in popover container.
     */
    handlePress(event: KeyboardEvent): void;
    handleTab(): void;
    handleEscape(): void;
    handleClick(event: MouseEvent): void;
    protected openTriggerEvents: PopoverEvent[];
    protected focusPopoverTriggerEvents: PopoverEvent[];
    protected closeTriggerEvents: PopoverEvent[];
    protected focusDirectiveTriggerEvents: PopoverEvent[];
    /**
     * Method performs open action for popover component.
     */
    open(event: PopoverEvent): void;
    /**
     * Method performs close action for popover component.
     */
    close(): void;
    /**
     * Method subscribes for events emitted by popover component
     * and based on event performs specific action.
     */
    handlePopoverEvents(): void;
    /**
     * Method creates instance and pass parameters to popover component.
     */
    renderPopover(): void;
    ngOnInit(): void;
    constructor(element: ElementRef, viewContainer: ViewContainerRef, componentFactoryResolver: ComponentFactoryResolver, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, popoverService: PopoverService, winRef: WindowRef);
    static ɵfac: i0.ɵɵFactoryDeclaration<PopoverDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PopoverDirective, "[cxPopover]", never, { "cxPopover": "cxPopover"; "cxPopoverOptions": "cxPopoverOptions"; }, { "openPopover": "openPopover"; "closePopover": "closePopover"; }, never, never, false, never>;
}
