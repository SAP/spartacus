import { ElementRef } from '@angular/core';
import { FocusConfig } from '../../../layout/a11y/keyboard-focus/keyboard-focus.model';
import { PopoverEvent } from './popover.model';
import * as i0 from "@angular/core";
export declare class PopoverService {
    /**
     * For a11y improvements method returns different `FocusConfig`
     * based on which event popover was triggered.
     */
    getFocusConfig(event: PopoverEvent, appendToBody: boolean): FocusConfig;
    setFocusOnElement(element: ElementRef, focusConfig: FocusConfig, appendToBody?: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PopoverService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PopoverService>;
}
