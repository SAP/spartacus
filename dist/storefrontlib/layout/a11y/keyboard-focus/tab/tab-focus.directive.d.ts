import { ElementRef } from '@angular/core';
import { AutoFocusDirective } from '../autofocus/auto-focus.directive';
import { TabFocusConfig } from '../keyboard-focus.model';
import { TabFocusService } from './tab-focus.service';
import * as i0 from "@angular/core";
/**
 * Directive to move the focus of ("locked") child elements. This is useful
 * for a nested list of tabs, carousel slides or any group of elements that
 * requires horizontal navigation.
 */
export declare class TabFocusDirective extends AutoFocusDirective {
    protected elementRef: ElementRef;
    protected service: TabFocusService;
    /** `tab` defaults to true if the directive `cxTabFocus` is used. */
    protected defaultConfig: TabFocusConfig;
    protected config: TabFocusConfig;
    handleNextTab(event: KeyboardEvent): void;
    handlePreviousTab(event: KeyboardEvent): void;
    constructor(elementRef: ElementRef, service: TabFocusService);
    static ɵfac: i0.ɵɵFactoryDeclaration<TabFocusDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TabFocusDirective, never, never, {}, {}, never, never, false, never>;
}
