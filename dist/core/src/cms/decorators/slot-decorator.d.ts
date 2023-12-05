import { Renderer2 } from '@angular/core';
import { ContentSlotData } from '../model/content-slot-data.model';
import * as i0 from "@angular/core";
export declare abstract class SlotDecorator {
    /**
     * Add attributes to CMS Slot element dynamically
     * @param element: CMS slot element
     * @param renderer
     * @param slot: CMS slot data
     */
    abstract decorate(element: Element, renderer: Renderer2, slot?: ContentSlotData): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SlotDecorator, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SlotDecorator>;
}
