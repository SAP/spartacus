import { ElementRef, AfterViewInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { FormConfig } from '../../../config/form-config';
import * as i0 from "@angular/core";
/**
 * Directive to bind a PasswordVisibilityToggleDirective to a password input field. This
 * toggle while alternate the appearance of the input between dots and plain text.
 */
export declare class PasswordVisibilityToggleDirective implements AfterViewInit {
    protected winRef: WindowRef;
    protected config: FormConfig;
    protected elementRef: ElementRef;
    protected viewContainerRef: ViewContainerRef;
    protected changeDetectorRef: ChangeDetectorRef;
    protected inputWrapper: HTMLElement | null;
    constructor(winRef: WindowRef, config: FormConfig, elementRef: ElementRef, viewContainerRef: ViewContainerRef, changeDetectorRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    protected insertComponent(): void;
    /**
     * We need to wrap the input element in a div to be able to position the toggle button in the right place.
     */
    protected wrapInput(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PasswordVisibilityToggleDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<PasswordVisibilityToggleDirective, "[cxPasswordVisibilitySwitch][type=\"password\"]", never, {}, {}, never, never, false, never>;
}
