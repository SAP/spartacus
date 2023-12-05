import { ElementRef, Renderer2 } from '@angular/core';
import { FocusConfig } from './keyboard-focus.model';
import { LockFocusDirective } from './lock/lock-focus.directive';
import { KeyboardFocusService } from './services/keyboard-focus.service';
import * as i0 from "@angular/core";
export declare class FocusDirective extends LockFocusDirective {
    protected elementRef: ElementRef;
    protected service: KeyboardFocusService;
    protected renderer: Renderer2;
    protected defaultConfig: FocusConfig;
    config: FocusConfig;
    constructor(elementRef: ElementRef, service: KeyboardFocusService, renderer: Renderer2);
    static ɵfac: i0.ɵɵFactoryDeclaration<FocusDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<FocusDirective, "[cxFocus]", never, { "config": "cxFocus"; }, {}, never, never, false, never>;
}
