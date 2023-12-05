import { Renderer2 } from '@angular/core';
import { ContentSlotData, SlotDecorator } from '@spartacus/core';
import { SmartEditService } from '../services/smart-edit.service';
import * as i0 from "@angular/core";
export declare class SmartEditSlotDecorator extends SlotDecorator {
    protected smartEditService: SmartEditService;
    constructor(smartEditService: SmartEditService);
    decorate(element: Element, renderer: Renderer2, slot: ContentSlotData): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SmartEditSlotDecorator, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SmartEditSlotDecorator>;
}
