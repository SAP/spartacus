import { Renderer2 } from '@angular/core';
import { ComponentDecorator, ContentSlotComponentData } from '@spartacus/core';
import { SmartEditService } from '../services/smart-edit.service';
import * as i0 from "@angular/core";
export declare class SmartEditComponentDecorator extends ComponentDecorator {
    protected smartEditService: SmartEditService;
    constructor(smartEditService: SmartEditService);
    decorate(element: Element, renderer: Renderer2, component: ContentSlotComponentData): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SmartEditComponentDecorator, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SmartEditComponentDecorator>;
}
