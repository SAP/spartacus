import { ElementRef, OnInit } from '@angular/core';
import { BaseFocusService } from '../base/base-focus.service';
import { BlockFocusConfig } from '../keyboard-focus.model';
import { VisibleFocusDirective } from '../visible/visible-focus.directive';
import * as i0 from "@angular/core";
export declare class BlockFocusDirective extends VisibleFocusDirective implements OnInit {
    protected elementRef: ElementRef;
    protected service: BaseFocusService;
    protected defaultConfig: BlockFocusConfig;
    protected config: BlockFocusConfig;
    constructor(elementRef: ElementRef, service: BaseFocusService);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BlockFocusDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<BlockFocusDirective, never, never, {}, {}, never, never, false, never>;
}
